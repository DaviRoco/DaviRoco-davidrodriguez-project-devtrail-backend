/**
 * SkillsController module.
 *
 * This module provides functions to interact with the skills service and retrieve skill records.
 *
 * @module SkillsController
 */

import SkillsService from '../services/SkillsService';
import SkillsRepository from '../repositories/SkillsRepository';
import Skills from '../entities/Skills';
import ResponseData from '../constants/api/ResponseData';
import ApiResponseBuilder from '../utils/ApiResponseBuilder';

const skillsRepository = new SkillsRepository();
const skillsService = new SkillsService(skillsRepository);

/**
 * Retrieves all skill records.
 *
 * @returns {Promise<ResponseData<Skills[] | string>>}
 * - A promise that resolves to a ResponseData object containing either the skill records data or an error message.
 *
 * @throws {Error} If there is an issue retrieving the skill records.
 */

export const getAllSkills = async (): Promise<
  ResponseData<Skills[] | string>
> => {
  try {
    const skills = await skillsService.getAllSkills();
    if (!skills) {
      return ApiResponseBuilder.createSuccessResponse('No Skills fetched');
    }
    return ApiResponseBuilder.createSuccessResponse(skills);
  } catch (error) {
    return ApiResponseBuilder.createErrorResponse(
      error as Error,
      'Failed to retrieve skills',
    );
  }
};

/**
 * Retrieves a skill record by name.
 *
 * @param {string} name - The name of the skill to retrieve.
 * @returns {Promise<ResponseData<Skills | string>>}
 * - A promise that resolves to a ResponseData object containing either the skill data or an error message.
 *
 * @throws {Error} If there is an issue retrieving the skill record.
 */
export const getSkillByName = async (
  name: string,
): Promise<ResponseData<Skills | string>> => {
  const validationError = ApiResponseBuilder.validateString(name, 'Name');
  if (validationError) {
    return validationError;
  }

  try {
    const skill = await skillsService.getSkillByName(name);
    if (skill) {
      return ApiResponseBuilder.createSuccessResponse(skill);
    } else {
      return ApiResponseBuilder.createSuccessResponse(
        `No Skill fetched with name: ${name}`,
      );
    }
  } catch (error) {
    return ApiResponseBuilder.createErrorResponse(
      error as Error,
      `Failed to retrieve skill with name. Name: ${name}`,
    );
  }
};

/**
 * Retrieves a skill record by ID.
 *
 * @param {string} id - The ID of the skill to retrieve.
 * @returns {Promise<ResponseData<Skills | string>>}
 * - A promise that resolves to a ResponseData object containing either the skill data or an error message.
 *
 * @throws {Error} If there is an issue retrieving the skill record.
 */
export const getSkillByID = async (
  id: string,
): Promise<ResponseData<Skills | string>> => {
  const validationError = ApiResponseBuilder.validateString(id, 'ID');
  if (validationError) {
    return validationError;
  }

  try {
    const skill = await skillsService.getSkillByID(id);
    if (skill) {
      return ApiResponseBuilder.createSuccessResponse(skill);
    } else {
      return ApiResponseBuilder.createSuccessResponse(
        `No Skill fetched with ID: ${id}`,
      );
    }
  } catch (error) {
    return ApiResponseBuilder.createErrorResponse(
      error as Error,
      `Failed to retrieve skill with ID. ID: ${id}`,
    );
  }
};

/**
 * Retrieves all front-end skills.
 *
 * @returns {Promise<ResponseData<Skills[] | string>>} A promise that resolves to a ResponseData object containing either an array of Skills or a string message.
 *
 * @throws Will return an error response if the retrieval of front-end skills fails.
 */
export const getAllFrontEndSkills = async (): Promise<
  ResponseData<Skills[] | string>
> => {
  try {
    const frontEndSkills = await skillsService.getAllFrontEndSkills();
    if (!frontEndSkills) {
      return ApiResponseBuilder.createSuccessResponse(
        'No Front-End Skills fetched',
      );
    }
    return ApiResponseBuilder.createSuccessResponse(frontEndSkills);
  } catch (error) {
    return ApiResponseBuilder.createErrorResponse(
      error as Error,
      'Failed to retrieve front-end skills',
    );
  }
};

/**
 * Retrieves all back-end skills.
 *
 * @returns {Promise<ResponseData<Skills[] | string>>} A promise that resolves to a response containing either an array of back-end skills or a message indicating no skills were fetched.
 *
 * @throws {Error} If there is an error while retrieving the back-end skills, an error response is returned.
 */
export const getAllBackEndSkills = async (): Promise<
  ResponseData<Skills[] | string>
> => {
  try {
    const backEndSkills = await skillsService.getAllBackEndSkills();
    if (!backEndSkills) {
      return ApiResponseBuilder.createSuccessResponse(
        'No Back-End Skills fetched',
      );
    }
    return ApiResponseBuilder.createSuccessResponse(backEndSkills);
  } catch (error) {
    return ApiResponseBuilder.createErrorResponse(
      error as Error,
      'Failed to retrieve back-end skills',
    );
  }
};

const SkillsController = {
  getAllSkills,
  getSkillByName,
  getSkillByID,
  getAllFrontEndSkills,
  getAllBackEndSkills,
};

export default SkillsController;
