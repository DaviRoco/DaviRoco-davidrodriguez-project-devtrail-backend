'use client';

import React from 'react';
import './about.css';
import Image from 'next/image';
import AboutImg from '../../assets/profile.jpeg';
import Info from './Info';
const About = () => {
  return (
    <div>
      <section className="about section" id="about">
        <h2 className="section-title">About Me</h2>
        <span className="section-subtitle">Intro</span>

        <div className="about-container container grid">
          <Image src={AboutImg} alt="" className="about-img"></Image>
          <div className="about-data">
            <Info></Info>

            <p className="about-description">
              I specialize in both client-side and server-side development,
              creating full-stack solutions using the latest and greatest tech
              stacks. I thrive in collaborative, agile environments and bring a
              strong focus on clean, testable code and continuous learning. With
              a strong focus on teamwork, I believe that collaboration unlocks
              greater achievements and drives success in every project.
              Let&apos;s create something world-changing.
            </p>

            <a
              href="/David Rodríguez Coto - Resume 2024.pdf"
              download
              className="button button--flex"
            >
              Download CV
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 15V21M19 21L17 19M19 21L21 19M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H14M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19M19 9V11M9 17H13M9 13H15M9 9H10"
                  stroke="#000000"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
