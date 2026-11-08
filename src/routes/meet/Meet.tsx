import { useState } from 'react';
import { Link } from 'react-router-dom';
import DiveDifficulty from '../../components/DiveDifficulty';
import DiveScore from '../../components/DiveScore';
import Button from '@mui/material/Button';
import { DiveTypes } from '../../constants/DiveTypes';
import { MAX_MEET_ROUNDS } from '../../models/RegularMeet';
import { calculateDivePoints, calculateDiverTotals } from '../../utils/regularMeetCalculations';
import { loadRegularMeet, saveRegularMeet } from '../../services/regularMeetStorage';
import type { JudgeScores, MeetDive, MeetDiver } from '../../models/RegularMeet';
import { createStableId } from '../../utils/createStableId';
import { getMeetDivePositions } from '../../utils/meetScoring';
import ScoresheetDialog from './ScoresheetDialog';
import './Meet.css';

function Meet() {
    const [meet, setMeet] = useState(loadRegularMeet);
    const [saveFailed, setSaveFailed] = useState(false);
    const [isScoresheetOpen, setIsScoresheetOpen] = useState(false);
    const positions = getMeetDivePositions(meet.divers);
    const savedPositionIndex = meet.currentPosition
        ? positions.findIndex((position) => (
            position.diverId === meet.currentPosition?.diverId
            && position.roundIndex === meet.currentPosition?.roundIndex
        ))
        : -1;
    const activePositionIndex = savedPositionIndex >= 0 ? savedPositionIndex : 0;
    const activePosition = positions[activePositionIndex];
    const activeDiver = activePosition
        ? meet.divers.find(({ id }) => id === activePosition.diverId)
        : undefined;
    const activeDive: MeetDive | null = activeDiver && activePosition
        ? activeDiver.schedule[activePosition.roundIndex] ?? {
            id: `manual-${activeDiver.id}-${activePosition.roundIndex}`,
            catalogKey: null,
            difficulty: 1.2,
            judgeScores: [0, 0, 0],
        }
        : null;

    const commitDiver = (updatedDiver: MeetDiver) => {
        const nextMeet = {
            ...meet,
            started: true,
            currentPosition: activePosition,
            divers: meet.divers.map((diver) => diver.id === updatedDiver.id ? updatedDiver : diver),
        };

        setMeet(nextMeet);
        setSaveFailed(!saveRegularMeet(nextMeet));
    };

    const updateActiveDive = (changes: { difficulty?: number; judgeScores?: JudgeScores }) => {
        if (!activeDiver || !activePosition || !activeDive) {
            return;
        }

        const roundIndex = activePosition.roundIndex;
        const existingDive = activeDiver.schedule[roundIndex];
        const diveToUpdate = existingDive ?? {
            ...activeDive,
            id: createStableId(),
            catalogKey: null,
        };
        const updatedDiver: MeetDiver = {
            ...activeDiver,
            schedule: Array.from({ length: MAX_MEET_ROUNDS }, (_, index) => (
                index === roundIndex
                    ? { ...diveToUpdate, ...changes }
                    : activeDiver.schedule[index] ?? null
            )),
        };

        commitDiver(updatedDiver);
    };

    const moveToPosition = (requestedIndex: number) => {
        if (positions.length === 0) {
            return;
        }

        let nextMeet = meet;
        const roundIndex = activePosition?.roundIndex;
        if (activeDiver && roundIndex !== undefined && activeDive
            && activeDiver.schedule[roundIndex] == null) {
            const manualDive: MeetDive = {
                ...activeDive,
                id: createStableId(),
                catalogKey: null,
            };
            const updatedDiver: MeetDiver = {
                ...activeDiver,
                schedule: Array.from({ length: MAX_MEET_ROUNDS }, (_, index) => (
                    index === roundIndex ? manualDive : activeDiver.schedule[index] ?? null
                )),
            };
            nextMeet = {
                ...nextMeet,
                divers: nextMeet.divers.map((diver) => diver.id === updatedDiver.id ? updatedDiver : diver),
            };
        }

        const nextIndex = Math.max(0, Math.min(positions.length - 1, requestedIndex));
        nextMeet = {
            ...nextMeet,
            started: true,
            currentPosition: positions[nextIndex] ?? null,
        };
        setMeet(nextMeet);
        setSaveFailed(!saveRegularMeet(nextMeet));
    };

    const updateScore = (index: number, value: number | number[]) => {
        if (!activeDive) {
            return;
        }

        const score = Array.isArray(value) ? value[0] : value;
        if (score === undefined) {
            return;
        }

        const judgeScores = [...activeDive.judgeScores] as JudgeScores;
        judgeScores[index] = score;
        updateActiveDive({ judgeScores });
    };

    if (!activePosition || !activeDiver || !activeDive) {
        return (
            <main className="meet-page">
                <p className="meet-page__eyebrow">Regular Meet</p>
                <h1>Scoring</h1>
                <p>No scheduled dives are available.</p>
                <Link to="/divers">Return to diver setup</Link>
            </main>
        );
    }

    const catalogDive = activeDive.catalogKey === null ? null : DiveTypes[activeDive.catalogKey];
    const calculatedDive = calculateDiverTotals(activeDiver)[activePosition.roundIndex];
    const divePoints = calculateDivePoints(activeDive);

    return (
        <main className="meet-page">
            <header className="meet-page__header">
                <p className="meet-page__eyebrow">Regular Meet · Dive {activePositionIndex + 1} of {positions.length}</p>
                <div className="meet-page__diver-identity">
                    <h1>{activeDiver.name}</h1>
                    <p className={`meet-page__affiliation ${activeDiver.isHome ? 'meet-page__affiliation--home' : ''}`}>
                        {activeDiver.isHome ? 'Home team' : 'Away team'}
                    </p>
                </div>
            </header>

            <section className="meet-page__dive-info" aria-label="Active dive">
                <p>Round {activePosition.roundIndex + 1} of 6</p>
                <h2 className="meet-page__dive-title">
                    {catalogDive
                        ? `${activeDive.catalogKey?.toUpperCase()} - ${catalogDive.name}, ${String(catalogDive.style)} (DD ${activeDive.difficulty.toFixed(1)})`
                        : `Manual dive (DD ${activeDive.difficulty.toFixed(1)})`}
                </h2>
            </section>

            <section className="meet-page__scoring" aria-label="Dive scoring">
                <DiveDifficulty
                    value={activeDive.difficulty}
                    onChange={(difficulty) => updateActiveDive({ difficulty })}
                />
                {activeDive.judgeScores.map((score, index) => (
                    <DiveScore
                        key={index}
                        id={`meet-score-${index + 1}`}
                        title={`Score ${index + 1}`}
                        value={score}
                        onChange={(_event, value) => updateScore(index, value)}
                    />
                ))}
            </section>

            <section className="meet-page__totals" aria-label="Dive totals">
                <p><span>Dive score</span><strong>{divePoints.toFixed(2)}</strong></p>
                <p><span>Running total</span><strong>{(calculatedDive?.cumulativeTotal ?? 0).toFixed(2)}</strong></p>
            </section>

            {saveFailed && <p className="meet-page__save-error" role="alert">Scores could not be saved in this browser.</p>}

            <nav className="meet-page__navigation" aria-label="Meet navigation">
                <button
                        className="meet-page__previous-control"
                        disabled={activePositionIndex === 0}
                    onClick={() => moveToPosition(activePositionIndex - 1)}
                    type="button"
                >
                    Previous dive
                </button>
                <Button
                    className="meet-page__scoresheet-button"
                    onClick={() => {
                        moveToPosition(activePositionIndex);
                        setIsScoresheetOpen(true);
                    }}
                    variant="outlined"
                >
                    View scoresheet
                </Button>
                {activePositionIndex === positions.length - 1 ? (
                        <Link
                            className="meet-page__results-link meet-page__forward-control"
                            onClick={() => moveToPosition(activePositionIndex)}
                            to="/results"
                        >
                            View results
                        </Link>
                ) : (
                    <button
                        className="meet-page__forward-control"
                        onClick={() => moveToPosition(activePositionIndex + 1)}
                        type="button"
                    >
                        Next dive
                    </button>
                )}
            </nav>
            {isScoresheetOpen && (
                <ScoresheetDialog
                    divers={meet.divers}
                    initialDiverId={activeDiver.id}
                    onClose={() => setIsScoresheetOpen(false)}
                />
            )}
        </main>
    );
}

export default Meet;