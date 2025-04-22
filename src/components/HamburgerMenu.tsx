// HamburgerMenu.tsx
import React, { useState } from 'react';
import './HamburgerMenu.css';

const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="hamburger-container">
      <div className="hamburger-icon" onClick={toggleMenu}>
        <span />
        <span />
        <span />
      </div>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <nav>
          <a href="/" onClick={toggleMenu}>Home</a>
          <a href="/basic" onClick={toggleMenu}>Basic Calculator</a>
          <a href="/dive-types" onClick={toggleMenu}>Dive Difficulties</a>
        </nav>
      </div>

      {isOpen && <div className="backdrop" onClick={toggleMenu} />}
    </div>
  );
};

export default HamburgerMenu;
