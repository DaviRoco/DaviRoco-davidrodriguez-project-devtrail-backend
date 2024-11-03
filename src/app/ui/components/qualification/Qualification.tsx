'use client';
import React, { useCallback, useEffect, useState } from 'react';
import './qualification.css';
import { QualificationService } from '../../services/QualificationService';
import {
  Certifications,
  EducationalRecords,
  type ExperienceRecords,
} from '../../types/types';
const Qualification = () => {
  const [toggleState, setToggleState] = useState(1);
  const [experienceRecords, setExperienceRecords] = useState<
    ExperienceRecords[]
  >([]);

  const [educationalRecords, setEducationalRecords] = useState<
    EducationalRecords[]
  >([]);

  const [certifications, setCertifications] = useState<Certifications[]>([]);

  const [toggleModal, setToggleModal] = useState('0');

  const toggleModalRecords = (index: string) => {
    setToggleModal(index);
  };

  const fetchExperienceRecords = useCallback(async () => {
    try {
      const response = await QualificationService.getAllExperienceRecords();
      const sortedResponse = response.sort(
        (a, b) =>
          new Date(b._endDate).getTime() - new Date(a._endDate).getTime(),
      );
      setExperienceRecords(sortedResponse);
    } catch (error) {
      console.error('Error fetching experience records:', error);
    }
  }, []);

  const fetchEducationalRecords = useCallback(async () => {
    try {
      const response = await QualificationService.getAllEducationalRecords();
      const sortedResponse = response.sort(
        (a, b) =>
          new Date(b._endDate).getTime() - new Date(a._endDate).getTime(),
      );
      setEducationalRecords(sortedResponse);
    } catch (error) {
      console.error('Error fetching educational records:', error);
    }
  }, []);

  const fetchCertifications = useCallback(async () => {
    try {
      const response = await QualificationService.getAllCertifications();
      setCertifications(response);
    } catch (error) {
      console.error('Error fetching certifications:', error);
    }
  }, []);

  const toggleTab = (index: number) => {
    setToggleState(index);
  };

  useEffect(() => {
    fetchExperienceRecords();
    fetchEducationalRecords();
    fetchCertifications();
  }, [fetchExperienceRecords, fetchEducationalRecords, fetchCertifications]);

  return (
    <section className="qualification section" id="qualification">
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
            <i className="uil uil-briefcase-alt qualification-icon"></i>
            Experience
          </div>
          <div
            className={
              toggleState === 2
                ? 'qualification-button qualification-active button--flex'
                : 'qualification-button button--flex'
            }
            onClick={() => toggleTab(2)}
          >
            <i className="uil uil-graduation-cap qualification-icon"></i>
            Education
          </div>
          <div
            className={
              toggleState === 3
                ? 'qualification-button qualification-active button--flex'
                : 'qualification-button button--flex'
            }
            onClick={() => toggleTab(3)}
          >
            <i className="uil uil-award qualification-icon"></i>
            Certifications
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
            {experienceRecords.map((record, index) =>
              index % 2 === 0 ? (
                <div key={index} className="qualification-data">
                  <div>
                    <h3 className="qualification-title">{record._title}</h3>
                    <span className="qualification-subtitle">
                      {record._companyName}
                    </span>
                    <div className="qualification-more-details">
                      <span
                        className="qualification-more-button"
                        onClick={() => toggleModalRecords(record._id)}
                      >
                        More Details
                        <i className="uil uil-plus-circle qualification-button-icon"></i>
                      </span>
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
                    <h3 className="qualification-title">{record._title}</h3>
                    <span className="qualification-subtitle">
                      {record._companyName}
                    </span>
                    <div className="qualification-more-details">
                      <span
                        className="qualification-more-button"
                        onClick={() => toggleModalRecords(record._id)}
                      >
                        More Details
                        <i className="uil uil-plus-circle qualification-button-icon"></i>
                      </span>
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
            {educationalRecords.map((record, index) =>
              index % 2 === 0 ? (
                <div key={index} className="qualification-data">
                  <div></div>

                  <div>
                    <span className="qualification-rounder"></span>
                    <span className="qualification-line"></span>
                  </div>

                  <div>
                    <h3 className="qualification-title">{record._degree}</h3>
                    <span className="qualification-subtitle">
                      {record._institutionName}
                    </span>
                    <div className="qualification-more-details">
                      <span
                        className="qualification-more-button"
                        onClick={() => toggleModalRecords(record._id)}
                      >
                        More Details
                        <i className="uil uil-plus-circle qualification-button-icon"></i>
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div key={index} className="qualification-data">
                  <div>
                    <h3 className="qualification-title">{record._degree}</h3>
                    <span className="qualification-subtitle">
                      {record._institutionName}
                    </span>
                    <div className="qualification-more-details">
                      <span
                        className="qualification-more-button"
                        onClick={() => toggleModalRecords(record._id)}
                      >
                        More Details
                        <i className="uil uil-plus-circle qualification-button-icon"></i>
                      </span>
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

          <div
            className={
              toggleState === 3
                ? 'qualification-content qualification-content-active'
                : 'qualification-content'
            }
          >
            {certifications.map((certification, index) =>
              index % 2 === 0 ? (
                <div key={index} className="qualification-data">
                  <div>
                    <h3 className="qualification-title">
                      {certification._name}
                    </h3>
                    <span className="qualification-subtitle">
                      {certification._institution}
                    </span>
                    <div className="qualification-more-details">
                      <span
                        className="qualification-more-button"
                        onClick={() => toggleModalRecords(certification._id)}
                      >
                        More Details
                        <i className="uil uil-plus-circle qualification-button-icon"></i>
                      </span>
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
                    <h3 className="qualification-title">
                      {certification._name}
                    </h3>
                    <span className="qualification-subtitle">
                      {certification._institution}
                    </span>
                    <div className="qualification-more-details">
                      <span
                        className="qualification-more-button"
                        onClick={() => toggleModalRecords(certification._id)}
                      >
                        More Details
                        <i className="uil uil-plus-circle qualification-button-icon"></i>
                      </span>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
      {experienceRecords.map((record) => (
        <div
          key={record._id}
          className={
            toggleModal === record._id
              ? 'qualification-modal active-modal'
              : 'qualification-modal'
          }
        >
          <div className="qualification-modal-content">
            <i
              onClick={() => toggleModalRecords('0')}
              className="uil uil-times qualification-modal-close"
            ></i>

            <h3 className="qualification-modal-title">{record._title}</h3>
            <ul className="qualification-modal-services grid">
              {record._description.split(' || ').map((item, index) => (
                <li key={index} className="qualification-modal-project">
                  <i className="uil uil-briefcase qualification-modal-icon"></i>
                  <p className="qualification-modal-info">{item}</p>
                </li>
              ))}
            </ul>
            <br />
            <ul className="qualification-modal-services grid">
              <li className="qualification-modal-project">
                <h3 className="qualification-modal-subtitle">
                  <i className="uil uil-calendar-alt qualification-modal-extra-icon"></i>
                  Duration
                </h3>
                <p className="qualification-modal-info">
                  {new Date(record._startDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                  })}
                  {' - '}
                  {new Date(record._endDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </p>
              </li>

              <li className="qualification-modal-project">
                <h3 className="qualification-modal-subtitle">
                  <i className="uil uil-lightbulb-alt qualification-modal-extra-icon"></i>
                  Skills
                </h3>
                <p className="qualification-modal-info">
                  {record._skills.map((skill) => skill._name).join(', ')}
                </p>
              </li>

              <li className="qualification-modal-project">
                <h3 className="qualification-modal-subtitle">
                  <i className="uil uil-map-marker qualification-modal-extra-icon"></i>
                  Location
                </h3>
                <p className="qualification-modal-info">{record._location}</p>
              </li>
            </ul>
          </div>
        </div>
      ))}
      {educationalRecords.map((record) => (
        <div
          key={record._id}
          className={
            toggleModal === record._id
              ? 'qualification-modal active-modal'
              : 'qualification-modal'
          }
        >
          <div className="qualification-modal-content">
            <i
              onClick={() => toggleModalRecords('0')}
              className="uil uil-times qualification-modal-close"
            ></i>

            <h3 className="qualification-modal-title">{record._degree}</h3>
            <ul className="qualification-modal-services grid">
              {record._description.split(' || ').map((item, index) => (
                <li key={index} className="qualification-modal-project">
                  <i className="uil uil-graduation-cap qualification-modal-icon"></i>
                  <p className="qualification-modal-info">{item}</p>
                </li>
              ))}
            </ul>
            <br />
            <ul className="qualification-modal-services grid">
              <li className="qualification-modal-project">
                <h3 className="qualification-modal-subtitle">
                  <i className="uil uil-calendar-alt qualification-modal-extra-icon"></i>
                  Duration
                </h3>
                <p className="qualification-modal-info">
                  {new Date(record._startDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                  })}
                  {' - '}
                  {new Date(record._endDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </p>
              </li>

              <li className="qualification-modal-project">
                <h3 className="qualification-modal-subtitle">
                  <i className="uil uil-lightbulb-alt qualification-modal-extra-icon"></i>
                  Skills
                </h3>
                <p className="qualification-modal-info">
                  {record._skills.map((skill) => skill._name).join(', ')}
                </p>
              </li>

              <li className="qualification-modal-project">
                <h3 className="qualification-modal-subtitle">
                  <i className="uil uil-map-marker qualification-modal-extra-icon"></i>
                  Location
                </h3>
                <p className="qualification-modal-info">{record._location}</p>
              </li>
            </ul>
          </div>
        </div>
      ))}
      {certifications.map((certification) => (
        <div
          key={certification._id}
          className={
            toggleModal === certification._id
              ? 'qualification-modal active-modal'
              : 'qualification-modal'
          }
        >
          <div className="qualification-modal-content">
            <i
              onClick={() => toggleModalRecords('0')}
              className="uil uil-times qualification-modal-close"
            ></i>

            <h3 className="qualification-modal-title">{certification._name}</h3>
            <ul className="qualification-modal-services grid">
              <li className="qualification-modal-project">
                <h3 className="qualification-modal-subtitle">
                  <i className="uil uil-file-check qualification-modal-extra-icon"></i>
                  Credential ID
                </h3>
                <p className="qualification-modal-info">
                  {certification._credentialID}
                </p>
              </li>
              <li className="qualification-modal-project">
                <h3 className="qualification-modal-subtitle">
                  <i className="uil uil-calendar-alt qualification-modal-extra-icon"></i>
                  Issued
                </h3>
                <p className="qualification-modal-info">
                  {new Date(certification._date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </p>
              </li>

              <li className="qualification-modal-project">
                <h3 className="qualification-modal-subtitle">
                  <i className="uil uil-lightbulb-alt qualification-modal-extra-icon"></i>
                  Skills
                </h3>
                <p className="qualification-modal-info">
                  {certification._skills.map((skill) => skill._name).join(', ')}
                </p>
              </li>

              <li className="qualification-modal-project">
                <h3 className="qualification-modal-subtitle">
                  <i className="uil uil-globe qualification-modal-extra-icon"></i>
                  URL
                </h3>
                <p className="qualification-modal-info">{certification._url}</p>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Qualification;
