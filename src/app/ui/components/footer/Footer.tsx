import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container container">
        <h1 className="footer-title">David</h1>

        <ul className="footer-list">
          <li>
            <a href="#about" className="footer-link">
              About
            </a>
          </li>
          <li>
            <a href="#services" className="footer-link">
              Services
            </a>
          </li>
          <li>
            <a href="#qualification" className="footer-link">
              Qualification
            </a>
          </li>
        </ul>

        <div className="footer-social">
          <a
            href="https://www.linkedin.com/in/david-rodriguez-coto"
            className="footer-social-link"
            target="_blank"
          >
            <i className="bx bxl-linkedin"></i>
          </a>

          <a
            href="https://github.com/DaviRoco"
            className="footer-social-link"
            target="_blank"
          >
            <i className="bx bxl-github"></i>
          </a>
        </div>

        <span className="footer-copy">
          &#169; 2024 David Rodríguez Coto. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
