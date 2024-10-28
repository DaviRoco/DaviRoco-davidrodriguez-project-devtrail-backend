'use client';
import React, { useState, useEffect } from 'react';
import './header.css';
const Header = () => {
  const [toggle, showMenu] = useState(false);
  const [activeNav, setActiveNav] = useState('#home');
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.header');
      if (header) {
        if (window.scrollY >= 80) {
          header.classList.add('scroll-header');
        } else {
          header.classList.remove('scroll-header');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="header">
      <nav className="nav container">
        <a href="#" className="nav-logo">
          David
        </a>
        <div className={toggle ? 'nav-menu show-menu' : 'nav-menu'}>
          <ul className="nav-list grid">
            <li className="nav-item">
              <a
                href="#home"
                onClick={() => setActiveNav('#home')}
                className={
                  activeNav === '#home' ? 'nav-link active-link' : 'nav-link'
                }
              >
                <i className="uil uil-estate nav-icon"></i> Home
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#about"
                onClick={() => setActiveNav('#about')}
                className={
                  activeNav === '#about' ? 'nav-link active-link' : 'nav-link'
                }
              >
                <i className="uil uil-user nav-icon"></i> About
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#skills"
                onClick={() => setActiveNav('#skills')}
                className={
                  activeNav === '#skills' ? 'nav-link active-link' : 'nav-link'
                }
              >
                <i className="uil uil-file-alt nav-icon"></i> Skills
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#services"
                onClick={() => setActiveNav('#services')}
                className={
                  activeNav === '#services'
                    ? 'nav-link active-link'
                    : 'nav-link'
                }
              >
                <i className="uil uil-briefcase-alt nav-icon"></i> Services
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#portfolio"
                onClick={() => setActiveNav('#portfolio')}
                className={
                  activeNav === '#portfolio'
                    ? 'nav-link active-link'
                    : 'nav-link'
                }
              >
                <i className="uil uil-scenery nav-icon"></i> Portfolio
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#contact"
                onClick={() => setActiveNav('#contact')}
                className={
                  activeNav === '#contact' ? 'nav-link active-link' : 'nav-link'
                }
              >
                <i className="uil uil-message nav-icon"></i> Contact Me
              </a>
            </li>
          </ul>
          <i
            className="uil uil-times nav-close"
            onClick={() => showMenu(!toggle)}
          ></i>
        </div>
        <div className="nav-toggle" onClick={() => showMenu(!toggle)}>
          <i className="uil uil-apps"></i>
        </div>
      </nav>
    </header>
  );
};

export default Header;
