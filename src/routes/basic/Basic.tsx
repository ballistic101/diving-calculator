import './Basic.css';
import Box from '@mui/material/Box';
import { useState } from 'react';
import Dive from '../../components/Dive';
import { DiveStats } from "../../models/DiveStats";

function Basic() {

    const [diveStats, setDiveStats] = useState<DiveStats>({difficulty: 1.5, score1: 0.0, score2: 0.0, score3: 0.0, sum: 0.0, final: 0.0});

    const setStats = (_id: number, dive: DiveStats) => {
        setDiveStats(dive);
    }

    const identifier = 1;

    const DiveBoxScoreStyle = {
        display: "grid",
        gridTemplateColumns: 'repeat(2, 1fr)',
        m: 2,
        mb: 3,
        pl: 2,
        pr: 2,
        pt: 1
    } as const;

    const DiveSumStyle = {
        pl: 2,
        pr: 2,
        pt: 1,
        pb: 1,
        mr: 2,
        bgcolor: "rgb(238, 219, 94)"
    } as const;

    const DiveFinalStyle = {
        ml: 2,
        pl: 2,
        pr: 2,
        pt: 1,
        pb: 1,
        bgcolor: "rgb(234, 157, 157)"
    } as const;

    const finalRounded = Math.round(diveStats.final * 1000) / 1000;
    return (
        <>
        <div>
            <p>Welcome to the basic version of the app. This is a quick
            calculator that does not depend on a team being defined.</p>
        </div>
        <Dive identifier={identifier} dive={diveStats} onChange={setStats} />
        <Box sx={DiveBoxScoreStyle}>
            <Box sx={DiveSumStyle}>Sum: <span className="dive-value">{diveStats.sum}</span></Box>
            <Box sx={DiveFinalStyle}>Final Score: <span className="dive-value">{finalRounded}</span></Box>
        </Box>
        </>
    );
}

export default Basic;