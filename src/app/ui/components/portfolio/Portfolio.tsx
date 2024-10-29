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
            <h3 className="portfolio-name">{project._name}</h3>
            <p className="portfolio-description">
              <i className="uil uil-calendar-alt qualification-calendar-icon"></i>{' '}
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
            <p className="portfolio-description">
              <i className="uil uil-lightbulb qualification-calendar-icon"></i>{' '}
              Skills: {project._skills.map((skill) => skill._name).join(', ')}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Portfolio;
