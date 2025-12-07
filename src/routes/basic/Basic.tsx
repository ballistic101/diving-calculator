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
        mt: 2,
        mb: 3,
        alignItems: 'center',
        pl: { xs: 0.5, sm: 2 },
        pr: { xs: 0.5, sm: 2 },
        pt: 1
    } as const;

    const DiveSumStyle = {
        pt: 1,
        pb: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: "rgba(250, 188, 42, 1)"
    } as const;

    const DiveFinalStyle = {
        ml: 1,
        pt: 1,
        pb: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: "rgba(255, 92, 127, 0.8)"
    } as const;

    const finalRounded = Math.round(diveStats.final * 1000) / 1000;
    return (
        <>
        <div>
            <p>Welcome to the basic version of the app. This is a quick
            calculator that does not depend on a team being defined.</p>
        </div>
        <Box sx={DiveBoxScoreStyle}>
            <Box sx={DiveSumStyle}>Sum: <span className="dive-value">{diveStats.sum}</span></Box>
            <Box sx={DiveFinalStyle}>Final Score: <span className="dive-value">{finalRounded}</span></Box>
        </Box>

        <Dive identifier={identifier} dive={diveStats} onChange={setStats} />
        </>
    );
}

export default Basic;