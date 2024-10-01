import { CoursesService } from "../services/CoursesService";
import { CoursesRepository } from "../repositories/CoursesRespository";
import SkillsRepository from "../repositories/SkillsRepository";
import ResponseData from "../constants/api/ResponseData";
import Courses from "../entities/Courses";

const coursesRepository = new CoursesRepository();
const skillsRepository = new SkillsRepository();
const coursesService = new CoursesService(coursesRepository, skillsRepository);

export const getAllCourses = async (): Promise<
  ResponseData<Courses[]> | ResponseData<string>
> => {
  try {
    const courses = await coursesService.getAllCourses();
    if (courses?.length) {
      return new ResponseData(200, courses);
    } else {
      return new ResponseData(200, "No Courses fetched");
    }
  } catch (error) {
    console.error(error);
    return new ResponseData(500, "Failed to retrieve courses");
  }
};

export const getCoursesByName = async (
  name: string | null,
): Promise<ResponseData<Courses | null> | ResponseData<string>> => {
  if (!name || typeof name !== "string") {
    return new ResponseData(400, "Name is required and should be a string.");
  }

  try {
    const course = await coursesService.getProjectsByName(name);
    if (course) {
      return new ResponseData(200, course);
    } else {
      return new ResponseData(200, "No Course fetched with name: " + name);
    }
  } catch (error) {
    console.error(error);
    return new ResponseData(
      500,
      "Failed to retrieve course with name. Name: " + name + " is not defined",
    );
  }
};

export const getCoursesByID = async (
  id: string | null,
): Promise<ResponseData<Courses | null> | ResponseData<string>> => {
  if (!id || typeof id !== "string") {
    return new ResponseData(400, "ID is required and should be a string.");
  }

  try {
    const course = await coursesService.getProjectsByID(id);
    if (course) {
      return new ResponseData(200, course);
    } else {
      return new ResponseData(200, "No Course fetched with ID: " + id);
    }
  } catch (error) {
    console.error(error);
    return new ResponseData(
      500,
      "Failed to retrieve course with ID. ID: " + id + " is not defined",
    );
  }
};

const CoursesController = {
  getAllCourses,
  getCoursesByName,
  getCoursesByID,
};

export default CoursesController;
