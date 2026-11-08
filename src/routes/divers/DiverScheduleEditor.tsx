import Autocomplete from '@mui/material/Autocomplete';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
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
import { DiveTypes } from '../../constants/DiveTypes';
import { MAX_MEET_ROUNDS } from '../../models/RegularMeet';
import type { MeetDive } from '../../models/RegularMeet';
import { createStableId } from '../../utils/createStableId';
import { moveScheduleSlotToIndex } from '../../utils/meetRoster';
import './DiverScheduleEditor.css';

interface DiverScheduleEditorProps {
    schedule: Array<MeetDive | null>;
    onChange: (schedule: Array<MeetDive | null>) => void;
}

interface CatalogDiveOption {
    catalogKey: string;
    number: number;
    name: string;
    style: string;
    difficulty: number;
}

const catalogDiveOptions: CatalogDiveOption[] = Object.entries(DiveTypes)
    .map(([catalogKey, dive]) => ({
        catalogKey,
        number: dive.number,
        name: dive.name,
        style: String(dive.style),
        difficulty: dive.difficulty,
    }))
    .sort((left, right) => left.number - right.number || left.catalogKey.localeCompare(right.catalogKey));

function getDiveLabel(option: CatalogDiveOption): string {
    return `${option.catalogKey.toUpperCase()} · ${option.name}, ${option.style}`;
}

interface SortableScheduleRoundProps {
    index: number;
    dive: MeetDive | null;
    onSelectDive: (option: CatalogDiveOption | null) => void;
    onRemoveDive: () => void;
}

function SortableScheduleRound({ index, dive, onSelectDive, onRemoveDive }: SortableScheduleRoundProps) {
    const roundId = `schedule-round-${index}`;
    const {
        attributes,
        isDragging,
        listeners,
        setActivatorNodeRef,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: roundId });
    const selectedOption = dive?.catalogKey
        ? catalogDiveOptions.find((option) => option.catalogKey === dive.catalogKey) ?? null
        : null;

    return (
        <li
            className={`diver-schedule__round ${isDragging ? 'diver-schedule__round--dragging' : ''}`}
            ref={setNodeRef}
            style={{ transform: CSS.Transform.toString(transform), transition }}
        >
            <div className="diver-schedule__round-position">
                <button
                    {...attributes}
                    {...listeners}
                    aria-label={`Reorder round ${index + 1}`}
                    className="divers-page__drag-handle diver-schedule__drag-handle"
                    ref={setActivatorNodeRef}
                    title="Drag to reorder"
                    type="button"
                >
                    <span aria-hidden="true" className="divers-page__grip-icon" />
                </button>
                <span className="diver-schedule__round-label">Round {index + 1}</span>
            </div>
            <div className="diver-schedule__selection">
                <Autocomplete
                    disableClearable={Boolean(dive)}
                    fullWidth
                    getOptionLabel={getDiveLabel}
                    isOptionEqualToValue={(option, value) => option.catalogKey === value.catalogKey}
                    noOptionsText="No matching dives"
                    onChange={(_event, option) => onSelectDive(option)}
                    options={catalogDiveOptions}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder={dive?.catalogKey === null ? 'Manual dive' : 'No dives selected'}
                            slotProps={{
                                ...params.slotProps,
                                htmlInput: {
                                    ...params.slotProps.htmlInput,
                                    'aria-label': `Round ${index + 1} dive`,
                                },
                            }}
                            size="small"
                        />
                    )}
                    renderOption={(props, option) => {
                        const { key, ...optionProps } = props;
                        return (
                            <li key={key} {...optionProps}>
                                <strong>{option.catalogKey.toUpperCase()}</strong>
                                {' - '}
                                <span>{option.name}, {option.style} · DD {option.difficulty.toFixed(1)}</span>
                            </li>
                        );
                    }}
                    size="small"
                    value={selectedOption}
                />
                {dive && <span className="diver-schedule__difficulty">DD {dive.difficulty.toFixed(1)}</span>}
            </div>
            <div className="diver-schedule__round-action">
                {dive ? (
                    <Tooltip title={`Remove round ${index + 1} dive`}>
                        <IconButton
                            aria-label={`Remove round ${index + 1} dive`}
                            className="diver-schedule__remove-button"
                            onClick={onRemoveDive}
                        >
                            <DeleteOutlined fontSize="small" />
                        </IconButton>
                    </Tooltip>
                ) : <span aria-hidden="true" />}
            </div>
        </li>
    );
}

function DiverScheduleEditor({ schedule, onChange }: DiverScheduleEditorProps) {
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    );
    const roundIds = Array.from({ length: MAX_MEET_ROUNDS }, (_, index) => `schedule-round-${index}`);

    const setDive = (index: number, option: CatalogDiveOption | null) => {
        const existingDive = schedule[index];
        const sameDive = existingDive?.catalogKey === option?.catalogKey;
        const nextSchedule = [...schedule];
        nextSchedule[index] = option ? {
            id: existingDive?.id ?? createStableId(),
            catalogKey: option.catalogKey,
            difficulty: sameDive && existingDive ? existingDive.difficulty : option.difficulty,
            judgeScores: sameDive && existingDive ? existingDive.judgeScores : [0, 0, 0],
        } : null;
        onChange(nextSchedule);
    };

    const removeDive = (index: number) => {
        const nextSchedule = [...schedule];
        nextSchedule[index] = null;
        onChange(nextSchedule);
    };

    const handleDragEnd = ({ active, over }: DragEndEvent) => {
        if (!over || active.id === over.id) {
            return;
        }

        const sourceIndex = roundIds.indexOf(String(active.id));
        const destinationIndex = roundIds.indexOf(String(over.id));
        const nextSchedule = moveScheduleSlotToIndex(schedule, sourceIndex, destinationIndex);
        if (nextSchedule !== schedule) {
            onChange(nextSchedule);
        }
    };

    return (
        <section className="diver-schedule" aria-labelledby="schedule-title">
            <h3 id="schedule-title">Dive schedule</h3>
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
                <SortableContext items={roundIds} strategy={verticalListSortingStrategy}>
                    <ol className="diver-schedule__rounds">
                        {Array.from({ length: MAX_MEET_ROUNDS }, (_, index) => (
                            <SortableScheduleRound
                                dive={schedule[index] ?? null}
                                index={index}
                                key={roundIds[index]}
                                onRemoveDive={() => removeDive(index)}
                                onSelectDive={(option) => setDive(index, option)}
                            />
                        ))}
                    </ol>
                </SortableContext>
            </DndContext>
        </section>
    );
}

export default DiverScheduleEditor;