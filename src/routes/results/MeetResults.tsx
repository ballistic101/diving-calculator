import { Link } from 'react-router-dom';
import { DiveTypes } from '../../constants/DiveTypes';
import { MAX_MEET_ROUNDS } from '../../models/RegularMeet';
import { loadRegularMeet } from '../../services/regularMeetStorage';
import { calculateDiverTotals } from '../../utils/regularMeetCalculations';
import './MeetResults.css';

function MeetResults() {
    const meet = loadRegularMeet();

    return (
        <main className="meet-results">
            <header className="meet-results__header">
                <p className="meet-results__eyebrow">Regular Meet</p>
                <h1>Results</h1>
            </header>
            {meet.divers.length === 0 ? (
                <p>No diver results are available.</p>
            ) : (
                <div className="meet-results__divers">
                    {meet.divers.map((diver) => {
                        const totals = calculateDiverTotals(diver);
                        const finalTotal = [...totals].reverse().find((round) => round !== null)?.cumulativeTotal ?? 0;

                        return (
                            <section className="meet-results__diver" key={diver.id}>
                                <div className="meet-results__diver-heading">
                                    <div>
                                        <h2>{diver.name}</h2>
                                        <p>{diver.isHome ? 'Home team' : 'Away team'}</p>
                                    </div>
                                    <p className="meet-results__final-total">
                                        <span>Final total</span>
                                        <strong>{finalTotal.toFixed(2)}</strong>
                                    </p>
                                </div>
                                <div className="meet-results__table-wrap">
                                    <table>
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
                                                const dive = diver.schedule[roundIndex] ?? null;
                                                const roundTotals = totals[roundIndex];
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
                                                                <td>{(roundTotals?.points ?? 0).toFixed(2)}</td>
                                                                <td>{(roundTotals?.cumulativeTotal ?? 0).toFixed(2)}</td>
                                                            </>
                                                        ) : (
                                                            <td className="meet-results__empty" colSpan={7}>No dive</td>
                                                        )}
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        );
                    })}
                </div>
            )}
            <Link className="meet-results__back" to="/meet">Back to scoring</Link>
        </main>
    );
}

export default MeetResults;