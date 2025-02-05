import Box from '@mui/material/Box';
import DiveDifficulty from "./DiveDifficulty";
import DiveScores from "./DiveScores";
import { DiveStats } from "../models/DiveStats";

interface Props {
    identifier: number;
    dive: DiveStats;
    onChange: (id: number, dive: DiveStats) => void;
}

function Dive({identifier, dive, onChange}: Props) {

    const handleDifficultyChange = (newValue: number) => {
        const newDive: DiveStats = {
            difficulty: newValue,
            score1: dive.score1,
            score2: dive.score2,
            score3: dive.score3,
            sum: dive.sum,
            final: newValue * dive.sum
        }
        onChange(identifier, newDive);
    };

    const handleScoreChange = (score1: number, score2: number, score3: number, sum: number) => {
        const newDive: DiveStats = {
            difficulty: dive.difficulty,
            score1: score1,
            score2: score2,
            score3: score3,
            sum: sum,
            final: dive.difficulty * sum
        }
        onChange(identifier, newDive);
    }

    const boxDiveStyle = {
        display: "grid",
        gridTemplateColumns: '1fr',
        mt: 2,
        mb: 2,
        border: 1,
        borderRadius: 2,
        borderColor: 'rgb(53, 95, 163)',
        boxShadow: 3,
        bgcolor: 'rgb(215, 214, 229, 0.2)',
        pl: 2,
        pr: 2,
        pt: 3
    } as const;

    return (
        <Box sx={boxDiveStyle}>
            <DiveDifficulty value={dive.difficulty} onChange={handleDifficultyChange} />
            <DiveScores onChange={handleScoreChange} />
        </Box>
    );
}

export default Dive;