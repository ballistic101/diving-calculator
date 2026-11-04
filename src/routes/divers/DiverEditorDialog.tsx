import { useState } from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import { MAX_MEET_ROUNDS } from '../../models/RegularMeet';
import type { MeetDive } from '../../models/RegularMeet';
import DiverScheduleEditor from './DiverScheduleEditor';

interface DiverEditorDialogProps {
    initialName?: string;
    initialIsHome?: boolean;
    initialSchedule?: Array<MeetDive | null>;
    defaultName: string;
    onCancel: () => void;
    onSave: (name: string, isHome: boolean, schedule: Array<MeetDive | null>) => void;
}

function DiverEditorDialog({
    initialName,
    initialIsHome = false,
    initialSchedule,
    defaultName,
    onCancel,
    onSave,
}: DiverEditorDialogProps) {
    const [name, setName] = useState(initialName ?? defaultName);
    const [isHome, setIsHome] = useState(initialIsHome);
    const [schedule, setSchedule] = useState<Array<MeetDive | null>>(() => (
        Array.from({ length: MAX_MEET_ROUNDS }, (_, index) => initialSchedule?.[index] ?? null)
    ));

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmedName = name.trim();
        if (trimmedName) {
            onSave(trimmedName, isHome, schedule);
        }
    };

    return (
        <Dialog open onClose={onCancel} fullWidth maxWidth="sm">
            <form onSubmit={handleSubmit}>
                <DialogTitle>{initialName === undefined ? 'Add diver' : 'Edit diver'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        fullWidth
                        label="Diver name"
                        margin="normal"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isHome}
                                onChange={(event) => setIsHome(event.target.checked)}
                            />
                        }
                        label="Home team"
                    />
                    <DiverScheduleEditor schedule={schedule} onChange={setSchedule} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button type="submit" variant="contained" disabled={!name.trim()}>
                        Save diver
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default DiverEditorDialog;