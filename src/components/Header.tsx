import "./Header.css";

interface HeaderProps {
  onMenuClick: () => void;
}

function Header({onMenuClick}: HeaderProps) {


    return (
        <div>
            <div className="header">
                <div className="hamburger-icon" onClick={onMenuClick}>
                    <span />
                    <span />
                    <span />
                 </div>
                <h1>Diving Calculator</h1>
            </div>
        </div>
    );
}

export default Header;
