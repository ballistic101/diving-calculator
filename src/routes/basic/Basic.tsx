import './Basic.css';
import DiveScores from '@components/DiveScores';
import DiveDifficulty from '@components/DiveDifficulty';

function Basic() {

    return (
        <>
        <div>
            <p>Welcome to the basic version of the app. This is a quick
            calculator that does not depend on a team being defined.</p>
        </div>
        <DiveDifficulty />
        <DiveScores />
        </>
    );
}

export default Basic;