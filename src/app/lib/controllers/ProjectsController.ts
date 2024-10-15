/**
 * ProjectsController module.
 *
 * This module provides functions to interact with the projects service and retrieve project data.
 *
 * @module ProjectsController
 */

import { ProjectsService } from '../services/ProjectsService';
import ProjectsRepository from '../repositories/ProjectsRepository';
import ResponseData from '../constants/api/ResponseData';
import Projects from '../entities/Projects';
import ApiResponseBuilder from '../utils/ApiResponseBuilder';

const projectsRepository = new ProjectsRepository();
const projectsService = new ProjectsService(projectsRepository);

/**
 * Retrieves all projects.
 *
 * @returns {Promise<ResponseData<Projects[] | string>>}
 * - A promise that resolves to a ResponseData object containing either the projects data or an error message.
 *
 * @throws {Error} If there is an issue retrieving the projects.
 */
export const getAllProjects = async (): Promise<
  ResponseData<Projects[] | string>
> => {
  try {
    const projects = (await projectsService.getAllProjects()) as Projects[];
    if (!projects) {
      return ApiResponseBuilder.createSuccessResponse('No Projects fetched');
    }
    return ApiResponseBuilder.createSuccessResponse(projects);
  } catch (error) {
    return ApiResponseBuilder.createErrorResponse(
      error as Error,
      'Failed to retrieve projects',
    );
  }
};

/**
 * Retrieves a project by name.
 *
 * @param {string} name - The name of the project to retrieve. Must be a non-null string.
 * @returns {Promise<ResponseData<Projects | string>>}
 * - A promise that resolves to a ResponseData object containing either the project data or an error message.
 *
 * @throws {Error} If there is an issue retrieving the project.
 */
export const getProjectByName = async (
  name: string,
): Promise<ResponseData<Projects | string>> => {
  const validationError = ApiResponseBuilder.validateString(name, 'Name');
  if (validationError) {
    return validationError;
  }

  try {
    const project = (await projectsService.getProjectByName(name)) as Projects;
    if (project) {
      return ApiResponseBuilder.createSuccessResponse(project);
    } else {
      return ApiResponseBuilder.createSuccessResponse(
        `No Project fetched with name: ${name}`,
      );
    }
  } catch (error) {
    return ApiResponseBuilder.createErrorResponse(
      error as Error,
      `Failed to retrieve project with name. Name: ${name}`,
    );
  }
};

/**
 * Retrieves a project by ID.
 *
 * @param {string} id - The ID of the project to retrieve. Must be a non-null string.
 * @returns {Promise<ResponseData<Projects | string>>}
 * - A promise that resolves to a ResponseData object containing either the project data or an error message.
 *
 * @throws {Error} If there is an issue retrieving the project.
 */
export const getProjectByID = async (
  id: string,
): Promise<ResponseData<Projects | string>> => {
  const validationError = ApiResponseBuilder.validateString(id, 'ID');
  if (validationError) {
    return validationError;
  }

  try {
    const project = (await projectsService.getProjectByID(id)) as Projects;
    if (project) {
      return ApiResponseBuilder.createSuccessResponse(project);
    } else {
      return ApiResponseBuilder.createSuccessResponse(
        `No Project fetched with ID: ${id}`,
      );
    }
  } catch (error) {
    return ApiResponseBuilder.createErrorResponse(
      error as Error,
      `Failed to retrieve project with ID. ID: ${id}`,
    );
  }
};

const ProjectsController = {
  getAllProjects,
  getProjectByName,
  getProjectByID,
};

export default ProjectsController;
