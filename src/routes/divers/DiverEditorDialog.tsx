import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
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
                    <FormControl fullWidth margin="normal" sx={{ maxWidth: '24rem' }}>
                        <FormLabel id="team-affiliation-label">Team affiliation</FormLabel>
                        <ToggleButtonGroup
                            aria-labelledby="team-affiliation-label"
                            exclusive
                            fullWidth
                            onChange={(_event, value: string | null) => {
                                if (value !== null) {
                                    setIsHome(value === 'home');
                                }
                            }}
                            size="small"
                            sx={{
                                mt: 0.75,
                                gap: 0.75,
                                '& .MuiToggleButtonGroup-grouped': {
                                    flex: 1,
                                    minWidth: 0,
                                    border: '1px solid #78909a !important',
                                    borderRadius: '4px !important',
                                },
                                '& .MuiToggleButton-root': {
                                    minHeight: '2.75rem',
                                    px: 1,
                                    color: '#234879',
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    whiteSpace: 'nowrap',
                                },
                                '& .MuiToggleButton-root.Mui-selected': {
                                    borderColor: '#355fa3',
                                    backgroundColor: '#355fa3',
                                    color: '#fff',
                                },
                                '& .MuiToggleButton-root.Mui-selected:hover': {
                                    backgroundColor: '#284b83',
                                },
                            }}
                            value={isHome ? 'home' : 'away'}
                        >
                            <ToggleButton value="home">Home team</ToggleButton>
                            <ToggleButton value="away">Away team</ToggleButton>
                        </ToggleButtonGroup>
                    </FormControl>
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