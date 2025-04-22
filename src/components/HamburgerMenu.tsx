// HamburgerMenu.tsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
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
          <NavLink to="/" onClick={toggleMenu} className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
          <NavLink to="/basic" onClick={toggleMenu} className={({ isActive }) => isActive ? 'active' : ''}>Basic Calculator</NavLink>
          <NavLink to="/dive-types" onClick={toggleMenu} className={({ isActive }) => isActive ? 'active' : ''}>Dive Difficulties</NavLink>
        </nav>
      </div>

      {isOpen && <div className="backdrop" onClick={toggleMenu} />}
    </div>
  );
};

export default HamburgerMenu;
