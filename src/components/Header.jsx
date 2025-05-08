import React, { useEffect, useState } from 'react';
import '../css/Header.css'; // External stylesheet

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="header">
      <div className="top-bar">
        {/* Logo */}
        {/* <div className="logo">Logo</div> */}

        {/* Desktop navigation */}
        <div className="desktop-nav">
          <nav className="nav-links">
            <a href="#">About</a>
            <a href="#">News</a>
            <a href="#">Services</a>
            <a href="#">Our Team</a>
            <a href="#">Make Enquiry</a>
          </nav>
        </div>

        {/* Right side */}
        <div className="right-side">
          <button className="contact-btn">
            Contact us <span className="arrow">→</span>
          </button>

          <button
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav-links">
          <a href="#">About</a>
          <a href="#">News</a>
          <a href="#">Services</a>
          <a href="#">Our Team</a>
          <a href="#">Make Enquiry</a>
        </nav>
      </div>
    </header>
  );
}
