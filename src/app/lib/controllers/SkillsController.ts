import SkillsService from '../services/SkillsService';
import SkillsRepository from '../repositories/SkillsRepository';
import Skills from '../entities/Skills';
import ResponseData from '../constants/api/ResponseData';
import ApiResponseBuilder from '../utils/ApiResponseBuilder';

const skillsRepository = new SkillsRepository();
const skillsService = new SkillsService(skillsRepository);

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

const SkillsController = {
  getAllSkills,
  getSkillByName,
  getSkillByID,
};

export default SkillsController;
