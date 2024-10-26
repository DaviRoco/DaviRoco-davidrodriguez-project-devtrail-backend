'use client';
import React, { useCallback, useEffect, useState } from 'react';
import './qualification.css';
import { QualificationService } from '../../services/QualificationService';
import { EducationalRecords, type ExperienceRecords } from '../../types/types';
const Qualification = () => {
  const [toggleState, setToggleState] = useState(1);
  const [experienceRecords, setExperienceRecords] = useState<
    ExperienceRecords[]
  >([]);

  const [educationalRecords, setEducationalRecords] = useState<
    EducationalRecords[]
  >([]);

  const fetchExperienceRecords = useCallback(async () => {
    try {
      const response = await QualificationService.getAllExperienceRecords();
      setExperienceRecords(response);
    } catch (error) {
      console.error('Error fetching experience records:', error);
    }
  }, []);

  const fetchEducationalRecords = useCallback(async () => {
    try {
      const response = await QualificationService.getAllEducationalRecords();
      setEducationalRecords(response);
    } catch (error) {
      console.error('Error fetching educational records:', error);
    }
  }, []);

  const toggleTab = (index: number) => {
    setToggleState(index);
  };

  useEffect(() => {
    fetchExperienceRecords();
    fetchEducationalRecords();
  }, [fetchExperienceRecords, fetchEducationalRecords]);

  return (
    <section className="qualification section">
      <h2 className="section-title">Qualification</h2>
      <span className="section-subtitle">My Personal Journey</span>

      <div className="qualification-container container">
        <div className="qualification-tabs">
          <div
            className={
              toggleState === 1
                ? 'qualification-button qualification-active button--flex'
                : 'qualification-button button--flex'
            }
            onClick={() => toggleTab(1)}
          >
            <i className="uil uil-graduation-cap qualification-icon"></i>
            Education
          </div>

          <div
            className={
              toggleState === 2
                ? 'qualification-button qualification-active button--flex'
                : 'qualification-button button--flex'
            }
            onClick={() => toggleTab(2)}
          >
            <i className="uil uil-briefcase-alt qualification-icon"></i>
            Experience
          </div>
        </div>

        <div className="qualification-sections">
          <div
            className={
              toggleState === 1
                ? 'qualification-content qualification-content-active'
                : 'qualification-content'
            }
          >
            {educationalRecords.map((record, index) =>
              index % 2 === 0 ? (
                <div key={index} className="qualification-data">
                  <div>
                    <h3 className="qualification-title">{record._degree}</h3>
                    <span className="qualification-subtitle">
                      {record._institutionName} - {record._location}
                    </span>
                    <div className="qualification-calendar">
                      <i className="uil uil-calendar-alt"></i>
                      {new Date(record._startDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                      })}
                      {' - '}
                      {new Date(record._endDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                      })}
                    </div>
                  </div>

                  <div>
                    <span className="qualification-rounder"></span>
                    <span className="qualification-line"></span>
                  </div>
                </div>
              ) : (
                <div key={index} className="qualification-data">
                  <div></div>

                  <div>
                    <span className="qualification-rounder"></span>
                    <span className="qualification-line"></span>
                  </div>

                  <div>
                    <h3 className="qualification-title">{record._degree}</h3>
                    <span className="qualification-subtitle">
                      {record._institutionName} - {record._location}
                    </span>
                    <div className="qualification-calendar">
                      <i className="uil uil-calendar-alt"></i>
                      {new Date(record._startDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                      })}
                      {' - '}
                      {new Date(record._endDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                      })}
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>

          <div
            className={
              toggleState === 2
                ? 'qualification-content qualification-content-active'
                : 'qualification-content'
            }
          >
            {experienceRecords.map((record, index) =>
              index % 2 === 0 ? (
                <div key={index} className="qualification-data">
                  <div></div>

                  <div>
                    <span className="qualification-rounder"></span>
                    <span className="qualification-line"></span>
                  </div>

                  <div>
                    <h3 className="qualification-title">{record._title}</h3>
                    <span className="qualification-subtitle">
                      {record._companyName} - {record._location}
                    </span>
                    <div className="qualification-calendar">
                      <i className="uil uil-calendar-alt qualification-calendar-icon"></i>
                      {new Date(record._startDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                      })}
                      {' - '}
                      {new Date(record._endDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div key={index} className="qualification-data">
                  <div>
                    <h3 className="qualification-title">{record._title}</h3>
                    <span className="qualification-subtitle">
                      {record._companyName} - {record._location}
                    </span>
                    <div className="qualification-calendar">
                      <i className="uil uil-calendar-alt qualification-calendar-icon"></i>
                      {new Date(record._startDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                      })}
                      {' - '}
                      {new Date(record._endDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                      })}
                    </div>
                  </div>

                  <div>
                    <span className="qualification-rounder"></span>
                    <span className="qualification-line"></span>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Qualification;
