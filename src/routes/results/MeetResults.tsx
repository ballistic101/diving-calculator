import { Link } from 'react-router-dom';
import HorizontalScrollTable from '../../components/HorizontalScrollTable';
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
                                    <div className="meet-results__identity">
                                        <h2>{diver.name}</h2>
                                        <p className={`meet-results__affiliation ${diver.isHome ? 'meet-results__affiliation--home' : 'meet-results__affiliation--away'}`}>
                                            {diver.isHome ? 'Home team' : 'Away team'}
                                        </p>
                                    </div>
                                    <p className="meet-results__final-total">
                                        <span>Final total</span>
                                        <strong>{finalTotal.toFixed(2)}</strong>
                                    </p>
                                </div>
                                <HorizontalScrollTable
                                    ariaLabel={`${diver.name} results`}
                                    className="meet-results__table-wrap"
                                >
                                    <table>
                                        <thead>
                                            <tr>
                                                <th scope="col">Round</th>
                                                <th scope="col">Dive</th>
                                                <th scope="col">DD</th>
                                                <th scope="col">Score 1</th>
                                                <th scope="col">Score 2</th>
                                                <th scope="col">Score 3</th>
                                                <th scope="col">Points</th>
                                                <th scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array.from({ length: MAX_MEET_ROUNDS }, (_, roundIndex) => {
                                                const dive = diver.schedule[roundIndex] ?? null;
                                                const roundTotals = totals[roundIndex];
                                                const catalogDive = dive?.catalogKey ? DiveTypes[dive.catalogKey] : null;

                                                return (
                                                    <tr key={roundIndex}>
                                                        <th scope="row">{roundIndex + 1}</th>
                                                        {dive ? (
                                                            <>
                                                                <td>
                                                                    {catalogDive
                                                                        ? `${dive.catalogKey?.toUpperCase()} · ${catalogDive.name}`
                                                                        : 'Manual dive'}
                                                                </td>
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
                                </HorizontalScrollTable>
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