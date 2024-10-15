/**
 * @fileoverview Unit tests for the ProjectsService class.
 * 
 * This file contains unit tests for the ProjectsService, responsible for 
 * managing project-related data and interacting with the ProjectsRepository 
 * and SkillsRepository to retrieve and process project and skills information.
 * 
 * The tests validate the functionality of the service methods, ensuring they 
 * handle the data correctly, interact with the repositories as expected, and 
 * return the appropriate results based on various scenarios.
 * 
 * The tests cover the following methods:
 * 
 * - **getAllProjects**: Retrieves all projects from the repository.
 * - **getProjectByName**: Retrieves a project by its name.
 * - **getProjectByID**: Retrieves a project by its ID.
 * 
 * Each test verifies the following aspects:
 * - Successful retrieval of projects.
 * - Correct handling of skills associated with projects.
 * - Proper handling of scenarios where projects or skills are missing or invalid.
 * - Accurate return values based on the provided inputs, including cases where no data is found.
 * 
 * The tests utilize Jest to mock repository dependencies, ensuring isolated and 
 * focused unit testing without needing to interact with the actual database.
 * 
 * @module ProjectsServiceTest
 */

import { ProjectsService } from '../../lib/services/ProjectsService';
import ProjectsRepository from '../../lib/repositories/ProjectsRepository';
import Projects from '../../lib/entities/Projects';
import Skills from '../../lib/entities/Skills';
import { KnowledgeLevelEnumerations } from '../../lib/constants/enumerations/KnowledgeLevelsEnumerations';
import SkillsRepository from '../../lib/repositories/SkillsRepository';

jest.mock('../../lib/repositories/ProjectsRepository');
jest.mock('../../lib/repositories/SkillsRepository');

describe('Projects Service', () => {
  let projectsService: ProjectsService;
  let projectsRepository: jest.Mocked<ProjectsRepository>;
  let skillsRepository: jest.Mocked<SkillsRepository>;

  beforeEach(() => {
    projectsRepository =
      new ProjectsRepository() as jest.Mocked<ProjectsRepository>;
    projectsService = new ProjectsService(projectsRepository);
    skillsRepository = new SkillsRepository() as jest.Mocked<SkillsRepository>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockProjects = [
    new Projects(
      '1',
      'Project 1',
      new Date('2021-01-01'),
      new Date('2021-01-02'),
      'Description of Project 1',
      'url1',
      [
        new Skills(
          '1',
          'TypeScript',
          'Strong in TypeScript',
          KnowledgeLevelEnumerations.High,
        ),
        new Skills(
          '2',
          'JavaScript',
          'Experienced in JavaScript',
          KnowledgeLevelEnumerations.Mid,
        ),
      ],
    ),
    new Projects(
      '2',
      'Project 2',
      new Date('2021-01-01'),
      new Date('2021-01-02'),
      'Description of Project 2',
      'url2',
      [
        new Skills(
          '1',
          'TypeScript',
          'Strong in TypeScript',
          KnowledgeLevelEnumerations.High,
        ),
        new Skills(
          '2',
          'JavaScript',
          'Experienced in JavaScript',
          KnowledgeLevelEnumerations.Mid,
        ),
      ],
    ),
  ];

  const mockProjectObjects = [
    {
      _id: mockProjects[0].id,
      _name: mockProjects[0].name,
      _startDate: mockProjects[0].startDate,
      _endDate: mockProjects[0].endDate,
      _description: mockProjects[0].description,
      _url: mockProjects[0].url,
    } as Omit<Projects, 'skills'>,
    {
      _id: mockProjects[1].id,
      _name: mockProjects[1].name,
      _startDate: mockProjects[1].startDate,
      _endDate: mockProjects[1].endDate,
      _description: mockProjects[1].description,
      _url: mockProjects[1].url,
    } as Omit<Projects, 'skills'>,
  ];

  describe('getAllProjects', () => {
    test('It should return all projects when repository returns projects', async () => {
      skillsRepository.getSkillsByIDs = jest.fn().mockResolvedValue([
        {
          id: '1',
          name: 'JavaScript',
          description:
            'A programming language that conforms to the ECMAScript specification.',
          knowledgeLevel: KnowledgeLevelEnumerations.High,
        },
        {
          id: '2',
          name: 'TypeScript',
          description: 'A strict syntactical superset of JavaScript.',
          knowledgeLevel: KnowledgeLevelEnumerations.High,
        },
      ]);
      projectsRepository.getAllProjects.mockResolvedValue(mockProjects);

      const result = await projectsService.getAllProjects();

      expect(result).toEqual(mockProjectObjects);
      expect(projectsRepository.getAllProjects).toHaveBeenCalledTimes(1);
    });

    test('It should return null when repository returns no projects', async () => {
      projectsRepository.getAllProjects.mockResolvedValue([]);

      const result = await projectsService.getAllProjects();

      expect(result).toBeNull();
      expect(projectsRepository.getAllProjects).toHaveBeenCalledTimes(1);
    });
  });

  describe('getProjectByName', () => {
    test('It should return the project when the repository returns it by name', async () => {
      const testName = 'Project 1';
      skillsRepository.getSkillsByIDs = jest.fn().mockResolvedValue([
        {
          id: '1',
          name: 'JavaScript',
          description:
            'A programming language that conforms to the ECMAScript specification.',
          knowledgeLevel: KnowledgeLevelEnumerations.High,
        },
        {
          id: '2',
          name: 'TypeScript',
          description: 'A strict syntactical superset of JavaScript.',
          knowledgeLevel: KnowledgeLevelEnumerations.High,
        },
      ]);
      projectsRepository.getProjectByName.mockResolvedValue(mockProjects[0]);

      const result = await projectsService.getProjectByName(testName);

      expect(result).toEqual(mockProjectObjects[0]);
      expect(projectsRepository.getProjectByName).toHaveBeenCalledTimes(1);
    });

    test('It should return null when the repository returns no project', async () => {
      const testName = 'Project 3';
      projectsRepository.getProjectByName.mockResolvedValue(null);

      const result = await projectsService.getProjectByName(testName);

      expect(result).toBeNull();
      expect(projectsRepository.getProjectByName).toHaveBeenCalledTimes(1);
    });
  });

  describe('getProjectByID', () => {
    test('It should return the project when the repository returns it by ID', async () => {
      const testID = '2';
      skillsRepository.getSkillsByIDs = jest.fn().mockResolvedValue([
        {
          id: '1',
          name: 'JavaScript',
          description:
            'A programming language that conforms to the ECMAScript specification.',
          knowledgeLevel: KnowledgeLevelEnumerations.High,
        },
        {
          id: '2',
          name: 'TypeScript',
          description: 'A strict syntactical superset of JavaScript.',
          knowledgeLevel: KnowledgeLevelEnumerations.High,
        },
      ]);
      projectsRepository.getProjectByID.mockResolvedValue(mockProjects[1]);

      const result = await projectsService.getProjectByID(testID);

      expect(result).toEqual(mockProjectObjects[1]);
      expect(projectsRepository.getProjectByID).toHaveBeenCalledTimes(1);
    });

    test('It should return null when the repository returns no project', async () => {
      const testID = '3';
      projectsRepository.getProjectByID.mockResolvedValue(null);

      const result = await projectsService.getProjectByID(testID);

      expect(result).toBeNull();
      expect(projectsRepository.getProjectByID).toHaveBeenCalledTimes(1);
    });
  });
});
