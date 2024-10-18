import React, { useCallback, useEffect, useState } from 'react';
import { AboutService } from '../../services/AboutService';
import { ExperienceRecords } from '../../types/types';

const Info = () => {
  const [experienceData, setExperienceData] = useState<{
    records: ExperienceRecords[];
    totalExperience: string;
  }>({
    records: [],
    totalExperience: '',
  });

  const [projectsCount, setProjectsCount] = useState<number>(0);

  const calculateTotalExperience = useCallback(
    (records: ExperienceRecords[]): string => {
      let totalYears = 0;
      let totalMonths = 0;

      records.forEach((record) => {
        const startDate = new Date(record._startDate);
        const endDate = record._endDate
          ? new Date(record._endDate)
          : new Date();

        let years = endDate.getFullYear() - startDate.getFullYear();
        let months = endDate.getMonth() - startDate.getMonth();

        if (months < 0) {
          years -= 1;
          months += 12;
        }

        totalYears += years;
        totalMonths += months;
      });

      totalYears += Math.floor(totalMonths / 12);
      totalMonths = totalMonths % 12;

      return `${totalYears} year(s) and ${totalMonths} month(s)`;
    },
    [],
  );

  const fetchExperienceRecords = async () => {
    try {
      const records = await AboutService.getAllExperienceRecords();
      const totalExperience = calculateTotalExperience(records);
      setExperienceData({ records, totalExperience });
    } catch (error) {
      console.error('Error fetching experience records:', error);
    }
  };

  const fetchProjectsCount = async () => {
    try {
      const count = await AboutService.getAllProjectsCount();
      setProjectsCount(count);
    } catch (error) {
      console.error('Error fetching projects count:', error);
    }
  };

  useEffect(() => {
    fetchExperienceRecords();
    fetchProjectsCount();
  });

  return (
    <div>
      <div className="about-info grid">
        <div className="about-box">
          <h3 className="about-title">Experience</h3>
          <span className="about-subtitle">
            {experienceData.totalExperience} of Working Experience
          </span>
        </div>

        <div className="about-box">
          <h3 className="about-title">Completed</h3>
          <span className="about-subtitle">{projectsCount} + Projects</span>
        </div>

        <div className="about-box">
          <h3 className="about-title"></h3>
          <span className="about-subtitle"></span>
        </div>
      </div>
    </div>
  );
};

export default Info;
