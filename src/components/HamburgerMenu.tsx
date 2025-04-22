import React, { useState } from 'react';
import './HamburgerMenu.css';

const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="hamburger-container">
      <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span />
        <span />
        <span />
      </div>

      <nav className={`menu ${isOpen ? 'show' : ''}`}>
        <a href="/" onClick={toggleMenu}>Home</a>
        <a href="#basic" onClick={toggleMenu}>Calculator</a>
        <a href="#dive-types" onClick={toggleMenu}>Diving Difficulties</a>
      </nav>
    </div>
  );
};

export default HamburgerMenu;
