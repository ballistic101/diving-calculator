import Box from '@mui/material/Box';
import DiveScore from './DiveScore';

const boxDiveScoreStyle = {
    display: "grid",
    gridTemplateColumns: 'repeat(2, 1fr)',
    m: 2,
    border: 1,
    borderRadius: 2,
    width: "80%"
} as const;

function DiveScores() {

    return (
        <Box sx={boxDiveScoreStyle}>
            <DiveScore id="div-score-1" title="Dive Score 1" />
            <DiveScore id="div-score-2" title="Dive Score 2" />
            <DiveScore id="div-score-3" title="Dive Score 3" />
        </Box>
    );
}

export default DiveScores;