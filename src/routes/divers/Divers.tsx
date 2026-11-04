import './Divers.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Add from '@mui/icons-material/Add';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    closestCenter,
    useSensor,
    useSensors,
    type DragEndEvent,
} from '@dnd-kit/core';
import {
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { MeetDiver } from '../../models/RegularMeet';
import { loadRegularMeet, saveRegularMeet } from '../../services/regularMeetStorage';
import { createStableId } from '../../utils/createStableId';
import { getNextDiverName, moveDiverToIndex } from '../../utils/meetRoster';
import DiverEditorDialog from './DiverEditorDialog';

interface SortableDiverRowProps {
    diver: MeetDiver;
    onEdit: () => void;
    onRemove: () => void;
}

function SortableDiverRow({ diver, onEdit, onRemove }: SortableDiverRowProps) {
    const {
        attributes,
        isDragging,
        listeners,
        setActivatorNodeRef,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: diver.id });

    return (
        <li
            className={`divers-page__row ${diver.isHome ? 'divers-page__row--home' : 'divers-page__row--away'} ${isDragging ? 'divers-page__row--dragging' : ''}`}
            ref={setNodeRef}
            style={{ transform: CSS.Transform.toString(transform), transition }}
        >
            <button
                {...attributes}
                {...listeners}
                aria-label={`Reorder ${diver.name}`}
                className="divers-page__drag-handle"
                ref={setActivatorNodeRef}
                title="Drag to reorder"
                type="button"
            >
                <span aria-hidden="true" className="divers-page__grip-icon" />
            </button>
            <span className="divers-page__name">{diver.name}</span>
            <span className="divers-page__affiliation">
                {diver.isHome ? 'Home' : 'Away'} team
            </span>
            <div className="divers-page__row-actions">
                <Tooltip title="Edit diver">
                    <IconButton
                        aria-label={`Edit ${diver.name}`}
                        className="divers-page__icon-button divers-page__icon-button--edit"
                        onClick={onEdit}
                    >
                        <EditOutlined fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Remove diver">
                    <IconButton
                        aria-label={`Remove ${diver.name}`}
                        className="divers-page__icon-button divers-page__icon-button--remove"
                        onClick={onRemove}
                    >
                        <DeleteOutlined fontSize="small" />
                    </IconButton>
                </Tooltip>
            </div>
        </li>
    );
}

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

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    );

    const handleDragEnd = ({ active, over }: DragEndEvent) => {
        if (!over || active.id === over.id) {
            return;
        }

        const sourceIndex = meet.divers.findIndex(({ id }) => id === active.id);
        const destinationIndex = meet.divers.findIndex(({ id }) => id === over.id);
        const divers = moveDiverToIndex(meet.divers, sourceIndex, destinationIndex);
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
                        <Tooltip title="Add diver">
                            <IconButton
                            aria-label="Add diver"
                            className="divers-page__add-button"
                            onClick={() => setIsAddingDiver(true)}
                            >
                                <Add />
                            </IconButton>
                        </Tooltip>
                    </div>
                    {meet.divers.length === 0 ? (
                        <p className="divers-page__empty">No divers have been added.</p>
                    ) : (
                        <DndContext
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                            sensors={sensors}
                        >
                            <SortableContext
                                items={meet.divers.map(({ id }) => id)}
                                strategy={verticalListSortingStrategy}
                            >
                                <ol className="divers-page__list">
                                    {meet.divers.map((diver) => (
                                        <SortableDiverRow
                                            diver={diver}
                                            key={diver.id}
                                            onEdit={() => setEditingDiver(diver)}
                                            onRemove={() => removeDiver(diver)}
                                        />
                                    ))}
                                </ol>
                            </SortableContext>
                        </DndContext>
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