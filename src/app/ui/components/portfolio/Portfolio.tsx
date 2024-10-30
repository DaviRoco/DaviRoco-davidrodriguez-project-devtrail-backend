'use client';
import React, { useCallback, useEffect, useState } from 'react';
import './portfolio.css';
import { PortfolioService } from '../../services/PortfolioService';
import { Projects } from '../../types/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const Portfolio = () => {
  const [projects, setProjects] = useState<Projects[]>([]);
  const [toggleState, setToggleState] = useState('0');

  const toggleTab = (index: string) => {
    setToggleState(index);
  };
  const fetchProjects = useCallback(async () => {
    try {
      const response = await PortfolioService.getAllProjects();
      const sortedResponse = response.sort(
        (a, b) =>
          new Date(b._endDate).getTime() - new Date(a._endDate).getTime(),
      );
      setProjects(sortedResponse);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <section className="portfolio container section" id="portfolio">
      <h2 className="section-title">Portfolio</h2>
      <span className="section-subtitle">All of my Personal Projects</span>

      <Swiper
        loop={true}
        grabCursor={true}
        spaceBetween={24}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          576: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 48,
          },
        }}
        modules={[Pagination]}
        className="portfolio-container"
      >
        {projects.map((project) => (
          <SwiperSlide className="portfolio-card" key={project._id}>
            <h3 className="portfolio-name">
              {project._name}
              <i className="uil uil-github portfolio-button-name-icon"></i>
            </h3>
            <p className="portfolio-description">
              <span
                className="portfolio-button"
                onClick={() => toggleTab(project._id)}
              >
                View More
                <i className="uil uil-arrow-right portfolio-button-icon"></i>
              </span>
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
      {projects.map((project) => (
        <div
          key={project._id}
          className={
            toggleState === project._id
              ? 'portfolio-modal active-modal'
              : 'portfolio-modal'
          }
        >
          <div className="portfolio-modal-content">
            <i
              onClick={() => toggleTab('0')}
              className="uil uil-times portfolio-modal-close"
            ></i>

            <h3 className="portfolio-modal-title">{project._name}</h3>
            <p className="portfolio-modal-description">
              {project._description}
            </p>

            <ul className="portfolio-modal-projects grid">
              <li className="portfolio-modal-project">
                <i className="uil uil-calendar-alt portfolio-modal-icon"></i>
                <p className="portfolio-modal-info">
                  {new Date(project._startDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                  })}
                  {' - '}
                  {new Date(project._endDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </p>
              </li>
              <li className="portfolio-modal-project">
                <i className="uil uil-lightbulb-alt portfolio-modal-icon"></i>
                <p className="portfolio-modal-info">
                  {project._skills.map((skill) => skill._name).join(', ')}
                </p>
              </li>
              <li className="portfolio-modal-project">
                <i className="uil uil-globe portfolio-modal-icon"></i>
                <p className="portfolio-modal-info">
                  {project._url != 'N/A' ? (
                    <a
                      href={project._url}
                      target="_blank"
                      rel="noreferrer"
                      className="portfolio-modal-link"
                    >
                      {project._url}
                    </a>
                  ) : (
                    project._url
                  )}
                </p>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Portfolio;
