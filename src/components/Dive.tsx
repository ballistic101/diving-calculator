import DiveDifficulty from "./DiveDifficulty";
import DiveScores from "./DiveScores";
import { DiveStats } from "@models/DiveStats";

interface Props {
    id: number;
    dive: DiveStats;
    onChange: (id: number, dive: DiveStats) => void;
}

function Dive({id, dive, onChange}: Props) {

    const handleDifficultyChange = (newValue: number) => {
        const newDive: DiveStats = {
            difficulty: newValue,
            score1: dive.score1,
            score2: dive.score2,
            score3: dive.score3,
            sum: dive.sum,
            final: newValue * dive.sum
        }
        onChange(id, newDive);
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
        onChange(id, newDive);
    }

    return (
        <div className="Dive">
            <DiveDifficulty value={dive.difficulty} onChange={handleDifficultyChange} />
            <DiveScores onChange={handleScoreChange} />
        </div>
    );
}

export default Dive;