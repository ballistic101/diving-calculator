import "./Header.css";
import HamburgerMenu from './HamburgerMenu';

function Header() {

    return (
        <div>
            <HamburgerMenu />
            <div className="header">
                <h1>Diving Calculator</h1>
            </div>
        </div>
    );
}

export default Header;
