import { useState} from 'react';
import Box from '@mui/material/Box';
import DiveScore from './DiveScore';

interface Props {
    onChange: (score1: number, score2: number, score3: number, sum: number) => void;
 }

function DiveScores({onChange}: Props) {

    const [diveScore1, setDiveScore1] = useState<number>(0.0);
    const [diveScore2, setDiveScore2] = useState<number>(0.0);
    const [diveScore3, setDiveScore3] = useState<number>(0.0);

    const handleChange1 = (_event: Event, newValue: number | number[]) => {
        let value = Array.isArray(newValue) ? newValue[0] : newValue;
        setDiveScore1(value);
        onChange(value, diveScore2, diveScore3, value + diveScore2 + diveScore3);
    }

    const handleChange2 = (_event: Event, newValue: number | number[]) => {
        let value = Array.isArray(newValue) ? newValue[0] : newValue;
        setDiveScore2(value);
        onChange(diveScore1, value, diveScore3, diveScore1 + value + diveScore3);
    }

    const handleChange3 = (_event: Event, newValue: number | number[]) => {
        let value = Array.isArray(newValue) ? newValue[0] : newValue;
        setDiveScore3(value);
        onChange(diveScore1, diveScore2, value, diveScore1 + diveScore2 + value);
    }

    const boxDiveScoreStyle = {
        m: 2,
    } as const;

    return (
        <Box sx={boxDiveScoreStyle}>
            <DiveScore id="div-score-1" title="Dive Score 1" value={diveScore1} onChange={handleChange1} />
            <DiveScore id="div-score-2" title="Dive Score 2" value={diveScore2} onChange={handleChange2} />
            <DiveScore id="div-score-3" title="Dive Score 3" value={diveScore3} onChange={handleChange3} />
        </Box>
    );
}

export default DiveScores;