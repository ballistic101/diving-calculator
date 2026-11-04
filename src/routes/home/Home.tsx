
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <main className="home-page">
            <p className="home-page__eyebrow">Diving Calculator</p>
            <h1>Choose a scoring mode</h1>
            <p className="home-page__description">Set up a regular meet or score an individual dive.</p>
            <nav className="home-page__actions" aria-label="Scoring modes">
                <Link className="home-page__action home-page__action--primary" to="/divers">
                    Regular Meet
                </Link>
                <Link className="home-page__action" to="/basic">
                    Basic Calculator
                </Link>
            </nav>
        </main>
    );
}

export default Home;