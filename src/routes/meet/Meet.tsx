import { useState } from 'react';
import { Link } from 'react-router-dom';
import DiveDifficulty from '../../components/DiveDifficulty';
import DiveScore from '../../components/DiveScore';
import Button from '@mui/material/Button';
import { DiveTypes } from '../../constants/DiveTypes';
import { calculateDivePoints, calculateDiverTotals } from '../../utils/regularMeetCalculations';
import { loadRegularMeet, saveRegularMeet } from '../../services/regularMeetStorage';
import type { JudgeScores, MeetDiver } from '../../models/RegularMeet';
import { getMeetDivePositions } from '../../utils/meetScoring';
import ScoresheetDialog from './ScoresheetDialog';
import './Meet.css';

function Meet() {
    const [meet, setMeet] = useState(loadRegularMeet);
    const [activePositionIndex, setActivePositionIndex] = useState(0);
    const [saveFailed, setSaveFailed] = useState(false);
    const [isScoresheetOpen, setIsScoresheetOpen] = useState(false);
    const positions = getMeetDivePositions(meet.divers);
    const activePosition = positions[activePositionIndex];
    const activeDiver = activePosition
        ? meet.divers.find(({ id }) => id === activePosition.diverId)
        : undefined;
    const activeDive = activeDiver?.schedule[activePosition?.roundIndex ?? -1] ?? null;

    const updateActiveDive = (changes: { difficulty?: number; judgeScores?: JudgeScores }) => {
        if (!activeDiver || !activePosition || !activeDive) {
            return;
        }

        const updatedDiver: MeetDiver = {
            ...activeDiver,
            schedule: activeDiver.schedule.map((dive, index) => (
                index === activePosition.roundIndex && dive ? { ...dive, ...changes } : dive
            )),
        };
        const nextMeet = {
            ...meet,
            divers: meet.divers.map((diver) => diver.id === updatedDiver.id ? updatedDiver : diver),
        };

        setMeet(nextMeet);
        setSaveFailed(!saveRegularMeet(nextMeet));
    };

    const updateJudgeScore = (index: number, value: number | number[]) => {
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

    const catalogDive = DiveTypes[activeDive.catalogKey];
    const calculatedDive = calculateDiverTotals(activeDiver)[activePosition.roundIndex];
    const divePoints = calculateDivePoints(activeDive);

    return (
        <main className="meet-page">
            <header className="meet-page__header">
                <p className="meet-page__eyebrow">Regular Meet · Dive {activePositionIndex + 1} of {positions.length}</p>
                <h1>{activeDiver.name}</h1>
                <p className={`meet-page__affiliation ${activeDiver.isHome ? 'meet-page__affiliation--home' : ''}`}>
                    {activeDiver.isHome ? 'Home team' : 'Away team'}
                </p>
            </header>

            <section className="meet-page__dive-info" aria-label="Active dive">
                <p>Round {activePosition.roundIndex + 1} of 6</p>
                <h2>{activeDive.catalogKey.toUpperCase()}</h2>
                <p>{catalogDive.name}, {String(catalogDive.style)}</p>
            </section>

            <section className="meet-page__scoring" aria-label="Dive scoring">
                <DiveDifficulty
                    value={activeDive.difficulty}
                    onChange={(difficulty) => updateActiveDive({ difficulty })}
                />
                {activeDive.judgeScores.map((score, index) => (
                    <DiveScore
                        key={index}
                        id={`meet-judge-score-${index + 1}`}
                        title={`Judge ${index + 1}`}
                        value={score}
                        onChange={(_event, value) => updateJudgeScore(index, value)}
                    />
                ))}
            </section>

            <section className="meet-page__totals" aria-label="Dive totals">
                <p><span>Dive points</span><strong>{divePoints.toFixed(2)}</strong></p>
                <p><span>Running total</span><strong>{(calculatedDive?.cumulativeTotal ?? 0).toFixed(2)}</strong></p>
            </section>

            {saveFailed && <p className="meet-page__save-error" role="alert">Scores could not be saved in this browser.</p>}

            <nav className="meet-page__navigation" aria-label="Meet navigation">
                <button
                    disabled={activePositionIndex === 0}
                    onClick={() => setActivePositionIndex((index) => Math.max(0, index - 1))}
                    type="button"
                >
                    Previous dive
                </button>
                {activePositionIndex === positions.length - 1 ? (
                    <Link className="meet-page__results-link" to="/results">View results</Link>
                ) : (
                    <button
                        onClick={() => setActivePositionIndex((index) => Math.min(positions.length - 1, index + 1))}
                        type="button"
                    >
                        Next dive
                    </button>
                )}
            </nav>
            <Button
                className="meet-page__scoresheet-button"
                onClick={() => setIsScoresheetOpen(true)}
                sx={{ mt: 2 }}
                variant="outlined"
            >
                View scoresheet
            </Button>
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