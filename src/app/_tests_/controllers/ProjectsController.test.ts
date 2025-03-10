/**
 * @fileoverview Unit tests for the ProjectsController.
 *
 * This file contains unit tests for the ProjectsController, which is responsible for handling
 * project-related requests. The tests cover the following functionalities:
 *
 * - getAllProjects: Retrieves all projects from the database.
 * - getProjectByName: Retrieves a project by its name.
 * - getProjectByID: Retrieves a project by its ID.
 *
 * The tests use Jest to mock the ProjectsService and verify the behavior of the controller methods,
 * ensuring that appropriate responses are returned under various conditions, including success,
 * no results found, and error scenarios.
 *
 * @module ProjectsControllerTest
 */

import ProjectsController from '../../lib/controllers/ProjectsController';
import { ProjectsService } from '../../lib/services/ProjectsService';

jest.mock('../../lib/services/ProjectsService');

describe('Projects Controller', () => {
  const mockProjects = [
    {
      id: '1',
      name: 'Project 1',
      startDate: new Date('2021-01-01'),
      endDate: new Date('2021-01-31'),
      description: 'Project 1 Description',
      url: 'www.project1.com',
      skills: [
        {
          id: '1',
          name: 'Typescript',
          description: 'Programming Language',
          level: 'High',
        },
        {
          id: '2',
          name: 'C#',
          description: 'Programming Language',
          level: 'Mid',
        },
      ],
    },
  ];

  describe('getAllProjects', () => {
    test('It should return all projects on success.', async () => {
      (ProjectsService.prototype.getAllProjects as jest.Mock).mockResolvedValue(
        mockProjects,
      );

      const result = await ProjectsController.getAllProjects();

      expect(result.status).toBe(200);
      expect(result.body).toEqual(mockProjects);
    });

    test('It should return a message if no projects are fetched.', async () => {
      (ProjectsService.prototype.getAllProjects as jest.Mock).mockResolvedValue(
        null,
      );

      const result = await ProjectsController.getAllProjects();

      expect(result.status).toBe(200);
      expect(result.body).toBe('No Projects fetched');
    });

    test('It should handle errors', async () => {
      (ProjectsService.prototype.getAllProjects as jest.Mock).mockRejectedValue(
        new Error('Test'),
      );

      const result = await ProjectsController.getAllProjects();

      expect(result.status).toBe(500);
      expect(result.body).toBe('Failed to retrieve projects - Error: Test');
    });
  });

  describe('getProjectByName', () => {
    const mockProject = mockProjects[0];
    test('It should return the specified project with given name on success.', async () => {
      const testName = 'Project 1';

      (
        ProjectsService.prototype.getProjectByName as jest.Mock
      ).mockResolvedValue(mockProject);

      const result = await ProjectsController.getProjectByName(testName);

      expect(result.status).toBe(200);
      expect(result.body).toEqual(mockProject);
    });

    test('It should return a message if no project is found with the given name.', async () => {
      const testName = 'Project 2';

      (
        ProjectsService.prototype.getProjectByName as jest.Mock
      ).mockResolvedValue(null);

      const result = await ProjectsController.getProjectByName(testName);

      expect(result.status).toBe(200);
      expect(result.body).toBe('No Project fetched with name: ' + testName);
    });

    test('It should handle errors when no name parameter is specified', async () => {
      (
        ProjectsService.prototype.getProjectByName as jest.Mock
      ).mockRejectedValue(
        new Error(`Failed to retrieve project with name. Name: ${null}`),
      );

      const result = await ProjectsController.getProjectByName('');

      expect(result.status).toBe(400);
      expect(result.body).toBe('Name is required and should be a string.');
    });

    test('It should handle errors', async () => {
      const testName = 'Project 1';

      (
        ProjectsService.prototype.getProjectByName as jest.Mock
      ).mockRejectedValue(new Error('Test'));

      const result = await ProjectsController.getProjectByName(testName);

      expect(result.status).toBe(500);
      expect(result.body).toBe(
        `Failed to retrieve project with name. Name: ${testName} - Error: Test`,
      );
    });
  });

  describe('getProjectByID', () => {
    const mockProject = mockProjects[0];
    test('It should return the specified project with given id on success.', async () => {
      const testID = '1';

      (ProjectsService.prototype.getProjectByID as jest.Mock).mockResolvedValue(
        mockProject,
      );

      const result = await ProjectsController.getProjectByID(testID);

      expect(result.status).toBe(200);
      expect(result.body).toEqual(mockProject);
    });

    test('It should return a message if no project is found with the given id.', async () => {
      const testID = '2';

      (ProjectsService.prototype.getProjectByID as jest.Mock).mockResolvedValue(
        null,
      );

      const result = await ProjectsController.getProjectByID(testID);

      expect(result.status).toBe(200);
      expect(result.body).toBe('No Project fetched with ID: ' + testID);
    });

    test('It should handle errors when no id parameter is specified', async () => {
      (ProjectsService.prototype.getProjectByID as jest.Mock).mockRejectedValue(
        new Error(`Failed to retrieve project with ID: ${null}`),
      );

      const result = await ProjectsController.getProjectByID('');

      expect(result.status).toBe(400);
      expect(result.body).toBe('ID is required and should be a string.');
    });

    test('It should handle errors', async () => {
      const testID = '1';

      (ProjectsService.prototype.getProjectByID as jest.Mock).mockRejectedValue(
        new Error('Test'),
      );

      const result = await ProjectsController.getProjectByID(testID);

      expect(result.status).toBe(500);
      expect(result.body).toBe(
        `Failed to retrieve project with ID. ID: ${testID} - Error: Test`,
      );
    });
  });
});
