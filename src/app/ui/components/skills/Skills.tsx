'use client';
import React, { useCallback, useEffect, useState } from 'react';
import './skills.css';
import { SkillsService } from '../../services/SkillsService';
import type { Skills } from '../../types/types';

const Skills = () => {
  const [skills, setSkills] = useState<Skills[]>([]);

  const fetchSkills = useCallback(async () => {
    try {
      const skills = await SkillsService.getAllSkills();
      const sortedSkills = skills.sort((a, b) =>
        a._name.localeCompare(b._name),
      );
      setSkills(sortedSkills);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  }, []);

  const splitIntoGroups = (arr: Skills[], chunkSize: number) => {
    const groups = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      groups.push(arr.slice(i, i + chunkSize));
    }
    return groups;
  };

  const skillGroups = splitIntoGroups(skills, 8);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  return (
    <section className="skills section" id="skills">
      <h2 className="section-title">Skills</h2>
      <span className="section-subtitle">My Technical Full-Stack level</span>

      <div className="skills-container container grid">
        {skillGroups.map((group, groupIndex) => (
          <div className="skills-content" key={groupIndex}>
            <div className="skills-box">
              <div className="skills-group">
                {group.map((skill) => (
                  <div className="skills-data" key={skill._id}>
                    <i
                      className="bx bx-badge-check"
                      aria-label="Check icon"
                    ></i>
                    <div>
                      <h3 className="skills-name">{skill._name}</h3>
                      <span className="skills-level">
                        {skill._level || 'N/A'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
