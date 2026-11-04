import './Divers.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { MeetDiver } from '../../models/RegularMeet';
import { loadRegularMeet, saveRegularMeet } from '../../services/regularMeetStorage';
import { createStableId } from '../../utils/createStableId';
import { getNextDiverName, moveDiver } from '../../utils/meetRoster';
import DiverEditorDialog from './DiverEditorDialog';

function Divers() {
    const navigate = useNavigate();
    const [meet, setMeet] = useState(loadRegularMeet);
    const [editingDiver, setEditingDiver] = useState<MeetDiver | null>(null);
    const [isAddingDiver, setIsAddingDiver] = useState(false);
    const [saveFailed, setSaveFailed] = useState(false);

    const commitDivers = (divers: MeetDiver[]) => {
        const nextMeet = { ...meet, divers };
        setMeet(nextMeet);
        setSaveFailed(!saveRegularMeet(nextMeet));
    };

    const saveDiver = (name: string, isHome: boolean, schedule: MeetDiver['schedule']) => {
        const updatedDiver: MeetDiver = editingDiver
            ? { ...editingDiver, name, isHome, schedule }
            : { id: createStableId(), name, isHome, schedule };
        const divers = editingDiver
            ? meet.divers.map((diver) => diver.id === editingDiver.id ? updatedDiver : diver)
            : [...meet.divers, updatedDiver];
        commitDivers(divers);
        setEditingDiver(null);
        setIsAddingDiver(false);
    };

    const removeDiver = (diver: MeetDiver) => {
        if (window.confirm(`Delete ${diver.name} and their scheduled dives?`)) {
            commitDivers(meet.divers.filter(({ id }) => id !== diver.id));
        }
    };

    const reorderDiver = (index: number, offset: -1 | 1) => {
        const divers = moveDiver(meet.divers, index, offset);
        if (divers !== meet.divers) {
            commitDivers(divers);
        }
    };

    const editorOpen = isAddingDiver || editingDiver !== null;
    const hasScheduledDives = meet.divers.some((diver) => diver.schedule.some((dive) => dive !== null));

    return (
        <main className="divers-page">
            <header className="divers-page__header">
                <p className="divers-page__eyebrow">Meet setup</p>
                <h1>Regular Meet</h1>
            </header>
            <section className="divers-page__roster" aria-labelledby="roster-title">
                <div>
                    <div className="divers-page__roster-heading">
                        <h2 id="roster-title">Divers</h2>
                        <button
                            className="divers-page__add-button"
                            onClick={() => setIsAddingDiver(true)}
                            type="button"
                        >
                            Add diver
                        </button>
                    </div>
                    {meet.divers.length === 0 ? (
                        <p className="divers-page__empty">No divers have been added.</p>
                    ) : (
                        <ol className="divers-page__list">
                            {meet.divers.map((diver, index) => (
                                <li
                                    className={`divers-page__row ${diver.isHome ? 'divers-page__row--home' : 'divers-page__row--away'}`}
                                    key={diver.id}
                                >
                                    <span className="divers-page__name">{diver.name}</span>
                                    <span className="divers-page__affiliation">
                                        {diver.isHome ? 'Home' : 'Away'} team
                                    </span>
                                    <div className="divers-page__row-actions">
                                        <button
                                            aria-label={`Move ${diver.name} up`}
                                            className="divers-page__edit-button"
                                            disabled={index === 0}
                                            onClick={() => reorderDiver(index, -1)}
                                            type="button"
                                        >
                                            Up
                                        </button>
                                        <button
                                            aria-label={`Move ${diver.name} down`}
                                            className="divers-page__edit-button"
                                            disabled={index === meet.divers.length - 1}
                                            onClick={() => reorderDiver(index, 1)}
                                            type="button"
                                        >
                                            Down
                                        </button>
                                        <button
                                            className="divers-page__edit-button"
                                            onClick={() => setEditingDiver(diver)}
                                            type="button"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="divers-page__remove-button"
                                            onClick={() => removeDiver(diver)}
                                            type="button"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    )}
                </div>
            </section>
            <section className="divers-page__start" aria-label="Start meet">
                <button
                    className="divers-page__start-button"
                    disabled={!hasScheduledDives}
                    onClick={() => navigate('/meet')}
                    type="button"
                >
                    Start meet
                </button>
                {!hasScheduledDives && (
                    <p>Add at least one scheduled dive to start the meet.</p>
                )}
            </section>
            {saveFailed && (
                <p className="divers-page__save-error" role="alert">
                    Changes are visible now but could not be saved in this browser.
                </p>
            )}
            {editorOpen && (
                <DiverEditorDialog
                    key={editingDiver?.id ?? 'new-diver'}
                    initialName={editingDiver?.name}
                    initialIsHome={editingDiver?.isHome}
                    initialSchedule={editingDiver?.schedule}
                    defaultName={getNextDiverName(meet.divers)}
                    onCancel={() => {
                        setEditingDiver(null);
                        setIsAddingDiver(false);
                    }}
                    onSave={saveDiver}
                />
            )}
        </main>
    );
}

export default Divers;