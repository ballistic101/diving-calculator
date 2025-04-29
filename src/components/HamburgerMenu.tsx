// HamburgerMenu.tsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './HamburgerMenu.css';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

function HamburgerMenu({isOpen, onClose}: HamburgerMenuProps) {

  return (
    <div className="hamburger-container">
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={onClose}>←</button>
        <nav>
          <NavLink to="/" onClick={onClose} className={({ isActive }) => isOpen ? 'active' : ''}>Home</NavLink>
          <NavLink to="/basic" onClick={onClose} className={({ isActive }) => isOpen ? 'active' : ''}>Basic Calculator</NavLink>
          <NavLink to="/dive-types" onClick={onClose} className={({ isActive }) => isOpen ? 'active' : ''}>Dive Difficulties</NavLink>
        </nav>
      </div>

      {isOpen && <div className="backdrop" onClick={onClose} />}
    </div>
  );
};

export default HamburgerMenu;
