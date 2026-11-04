import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DiveTypes } from '../../constants/DiveTypes';
import { MAX_MEET_ROUNDS } from '../../models/RegularMeet';
import type { MeetDiver } from '../../models/RegularMeet';
import { calculateDiverTotals } from '../../utils/regularMeetCalculations';
import './ScoresheetDialog.css';

interface ScoresheetDialogProps {
    divers: MeetDiver[];
    initialDiverId: string;
    onClose: () => void;
}

function ScoresheetDialog({ divers, initialDiverId, onClose }: ScoresheetDialogProps) {
    const [selectedDiverId, setSelectedDiverId] = useState(initialDiverId);
    const selectedDiver = divers.find(({ id }) => id === selectedDiverId) ?? divers[0];

    if (!selectedDiver) {
        return null;
    }

    const totals = calculateDiverTotals(selectedDiver);

    return (
        <Dialog open onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>Scoresheet</DialogTitle>
            <DialogContent>
                <label className="scoresheet__diver-select">
                    Diver
                    <select
                        value={selectedDiver.id}
                        onChange={(event) => setSelectedDiverId(event.target.value)}
                    >
                        {divers.map((diver) => (
                            <option key={diver.id} value={diver.id}>{diver.name}</option>
                        ))}
                    </select>
                </label>
                <p className="scoresheet__affiliation">
                    {selectedDiver.isHome ? 'Home team' : 'Away team'}
                </p>
                <div className="scoresheet__table-wrap">
                    <table className="scoresheet__table">
                        <thead>
                            <tr>
                                <th scope="col">Round</th>
                                <th scope="col">Dive</th>
                                <th scope="col">DD</th>
                                <th scope="col">Judge 1</th>
                                <th scope="col">Judge 2</th>
                                <th scope="col">Judge 3</th>
                                <th scope="col">Points</th>
                                <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: MAX_MEET_ROUNDS }, (_, roundIndex) => {
                                const dive = selectedDiver.schedule[roundIndex] ?? null;
                                const totalsForRound = totals[roundIndex];
                                const catalogDive = dive ? DiveTypes[dive.catalogKey] : null;

                                return (
                                    <tr key={roundIndex}>
                                        <th scope="row">{roundIndex + 1}</th>
                                        {dive && catalogDive ? (
                                            <>
                                                <td>{dive.catalogKey.toUpperCase()} · {catalogDive.name}</td>
                                                <td>{dive.difficulty.toFixed(1)}</td>
                                                {dive.judgeScores.map((score, index) => (
                                                    <td key={index}>{score.toFixed(1)}</td>
                                                ))}
                                                <td>{(totalsForRound?.points ?? 0).toFixed(2)}</td>
                                                <td>{(totalsForRound?.cumulativeTotal ?? 0).toFixed(2)}</td>
                                            </>
                                        ) : (
                                            <td className="scoresheet__empty" colSpan={7}>No dive</td>
                                        )}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ScoresheetDialog;