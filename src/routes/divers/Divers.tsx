import './Divers.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Add from '@mui/icons-material/Add';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
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
import type { MeetDiver, RegularMeet } from '../../models/RegularMeet';
import { loadRegularMeet, saveRegularMeet } from '../../services/regularMeetStorage';
import { createStableId } from '../../utils/createStableId';
import { getMeetDivePositions, resetMeetProgress } from '../../utils/meetScoring';
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
            <div className="divers-page__identity">
                <span className="divers-page__name">{diver.name}</span>
                <span className="divers-page__affiliation">
                    {diver.isHome ? 'Home' : 'Away'} team
                </span>
            </div>
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
    const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);

    const commitMeet = (nextMeet: RegularMeet) => {
        setMeet(nextMeet);
        setSaveFailed(!saveRegularMeet(nextMeet));
    };

    const commitDivers = (divers: MeetDiver[]) => {
        commitMeet({ ...meet, divers });
    };

    const startOrContinueMeet = () => {
        if (!meet.started) {
            commitMeet({
                ...meet,
                started: true,
                currentPosition: getMeetDivePositions(meet.divers)[0] ?? null,
            });
        }

        navigate('/meet');
    };

    const resetMeet = () => {
        commitMeet(resetMeetProgress(meet));
        setIsResetDialogOpen(false);
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
    const hasDivers = meet.divers.length > 0;

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
                    disabled={!hasDivers}
                    onClick={startOrContinueMeet}
                    type="button"
                >
                    {meet.started ? 'Continue meet' : 'Start meet'}
                </button>
                {meet.started && (
                    <button
                        className="divers-page__reset-button"
                        onClick={() => setIsResetDialogOpen(true)}
                        type="button"
                    >
                        Reset meet
                    </button>
                )}
                {!hasDivers && !meet.started && (
                    <p>Add at least one diver to start the meet.</p>
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
            {isResetDialogOpen && (
                <Dialog
                    aria-labelledby="reset-meet-title"
                    open
                    onClose={() => setIsResetDialogOpen(false)}
                >
                    <DialogTitle id="reset-meet-title">Are you sure?</DialogTitle>
                    <DialogContent>
                        Reset the meet scores and return to setup? Dive selections and difficulty values will be kept.
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setIsResetDialogOpen(false)}>Cancel</Button>
                        <Button
                            className="divers-page__reset-confirm"
                            onClick={resetMeet}
                            variant="contained"
                        >
                            Reset meet
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </main>
    );
}

export default Divers;