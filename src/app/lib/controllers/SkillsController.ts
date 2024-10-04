import SkillsService from "../services/SkillsService";
import SkillsRepository from "../repositories/SkillsRepository";
import Skills from "../entities/Skills";
import ResponseData from "../constants/api/ResponseData";
const skillsRepository = new SkillsRepository();
const skillsService = new SkillsService(skillsRepository);

export const getAllSkills = async (): Promise<
  ResponseData<Skills[]> | ResponseData<string>
> => {
  try {
    const skills = await skillsService.getAllSkills();
    return new ResponseData(200, skills);
  } catch (error) {
    console.error(error);
    return new ResponseData(500, "Failed to retrieve skills");
  }
};

export const getSkillByName = async (
  name: string | null,
): Promise<ResponseData<Skills | null> | ResponseData<string>> => {
  if (!name || typeof name !== "string") {
    return new ResponseData(400, "Name is required and should be a string.");
  }

  try {
    const skill = await skillsService.getSkillByName(name);
    if (skill) {
      return new ResponseData(200, skill);
    } else {
      return new ResponseData(200, "No Skill fetched with name: " + name);
    }
  } catch (error) {
    console.error(error);
    return new ResponseData(
      500,
      "Failed to retrieve skill with name. Name: " + name + " is not defined",
    );
  }
};

export const getSkillByID = async (
  id: string | null,
): Promise<ResponseData<Skills | null> | ResponseData<string>> => {
  if (!id || typeof id !== "string") {
    return new ResponseData(400, "ID is required and should be a string.");
  }

  try {
    const skill = await skillsService.getSkillByID(id);
    if (skill) {
      return new ResponseData(200, skill);
    } else {
      return new ResponseData(200, "No Skill fetched with ID: " + id);
    }
  } catch (error) {
    console.error(error);
    return new ResponseData(
      500,
      "Failed to retrieve skill with ID. ID: " + id + " is not defined",
    );
  }
};

const SkillsController = {
  getAllSkills,
  getSkillByName,
  getSkillByID,
};

export default SkillsController;
