import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { DiveTypes } from '../../constants/DiveTypes';
import { MAX_MEET_ROUNDS } from '../../models/RegularMeet';
import type { MeetDive } from '../../models/RegularMeet';
import { createStableId } from '../../utils/createStableId';
import { moveScheduleSlot } from '../../utils/meetRoster';
import './DiverScheduleEditor.css';

interface DiverScheduleEditorProps {
    schedule: Array<MeetDive | null>;
    onChange: (schedule: Array<MeetDive | null>) => void;
}

function DiverScheduleEditor({ schedule, onChange }: DiverScheduleEditorProps) {
    const [query, setQuery] = useState('');
    const normalizedQuery = query.trim().toLowerCase();
    const results = normalizedQuery
        ? Object.entries(DiveTypes)
            .filter(([key, dive]) => key.includes(normalizedQuery) || String(dive.number).includes(normalizedQuery))
            .slice(0, 8)
        : [];

    const addDive = (catalogKey: string) => {
        const catalogDive = DiveTypes[catalogKey];
        const emptySlot = schedule.findIndex((dive) => dive === null);
        if (!catalogDive || emptySlot === -1) {
            return;
        }

        const nextSchedule = [...schedule];
        nextSchedule[emptySlot] = {
            id: createStableId(),
            catalogKey,
            difficulty: catalogDive.difficulty,
            judgeScores: [0, 0, 0],
        };
        onChange(nextSchedule);
        setQuery('');
    };

    const removeDive = (index: number) => {
        const nextSchedule = [...schedule];
        nextSchedule[index] = null;
        onChange(nextSchedule);
    };

    return (
        <section className="diver-schedule" aria-labelledby="schedule-title">
            <h3 id="schedule-title">Dive schedule</h3>
            <TextField
                fullWidth
                label="Search dive number"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                disabled={schedule.every((dive) => dive !== null)}
                size="small"
            />
            {normalizedQuery && (
                <ul className="diver-schedule__search-results" role="listbox" aria-label="Matching dives">
                    {results.length === 0 ? (
                        <li className="diver-schedule__no-results">No matching dives</li>
                    ) : results.map(([key, dive]) => (
                        <li key={key}>
                            <button
                                aria-label={`Add ${key}, ${dive.name}, difficulty ${dive.difficulty.toFixed(1)}`}
                                className="diver-schedule__result"
                                onClick={() => addDive(key)}
                                role="option"
                                type="button"
                                aria-selected="false"
                            >
                                <strong>{key.toUpperCase()}</strong>
                                <span>{dive.name}, {String(dive.style)}</span>
                                <span>DD {dive.difficulty.toFixed(1)}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            <ol className="diver-schedule__rounds">
                {schedule.slice(0, MAX_MEET_ROUNDS).map((dive, index) => {
                    const catalogDive = dive ? DiveTypes[dive.catalogKey] : null;
                    return (
                        <li className="diver-schedule__round" key={dive?.id ?? `round-${index}`}>
                            <span className="diver-schedule__round-label">Round {index + 1}</span>
                            {dive && catalogDive ? (
                                <div className="diver-schedule__dive">
                                    <span>
                                        <strong>{dive.catalogKey.toUpperCase()}</strong>
                                        <span className="diver-schedule__description">
                                            {catalogDive.name}, {String(catalogDive.style)}
                                        </span>
                                    </span>
                                    <span className="diver-schedule__difficulty">DD {dive.difficulty.toFixed(1)}</span>
                                    <div className="diver-schedule__actions">
                                        <button
                                            aria-label={`Move round ${index + 1} dive up`}
                                            disabled={index === 0}
                                            onClick={() => onChange(moveScheduleSlot(schedule, index, -1))}
                                            type="button"
                                        >
                                            Up
                                        </button>
                                        <button
                                            aria-label={`Move round ${index + 1} dive down`}
                                            disabled={index === MAX_MEET_ROUNDS - 1}
                                            onClick={() => onChange(moveScheduleSlot(schedule, index, 1))}
                                            type="button"
                                        >
                                            Down
                                        </button>
                                        <button
                                            aria-label={`Remove round ${index + 1} dive`}
                                            onClick={() => removeDive(index)}
                                            type="button"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <span className="diver-schedule__empty">No dive selected</span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </section>
    );
}

export default DiverScheduleEditor;