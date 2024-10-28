'use client';
import React, { useEffect, useState } from 'react';
import './scrollup.css';

const ScrollUp = ({ scrollThreshold = 560 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY >= scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollThreshold]);

  return (
    <a href="#" className={`scrollup ${isVisible ? 'show-scroll' : ''}`}>
      <i className="uil uil-arrow-up scrollup-icon"></i>
    </a>
  );
};

export default ScrollUp;
