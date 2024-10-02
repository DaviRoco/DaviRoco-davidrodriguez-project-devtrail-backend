import { CoursesService } from "../services/CoursesService";
import { CoursesRepository } from "../repositories/CoursesRespository";
import ResponseData from "../constants/api/ResponseData";
import Courses from "../entities/Courses";

const coursesRepository = new CoursesRepository();
const coursesService = new CoursesService(coursesRepository);

/**
 * Retrieves all courses from the courses service.
 *
 * @returns {Promise<ResponseData<Courses[]> | ResponseData<string>>}
 * A promise that resolves to a ResponseData object containing either an array of courses or a message indicating no courses were fetched.
 *
 * @throws Will return a ResponseData object with a status code of 500 and an error message if the retrieval fails.
 */
export const getAllCourses = async (): Promise<
  ResponseData<Courses[]> | ResponseData<string>
> => {
  try {
    const courses = (await coursesService.getAllCourses()) as Courses[];
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

/**
 * Retrieves courses by their name.
 *
 * @param {string | null} name - The name of the course to retrieve. Must be a non-null string.
 * @returns {Promise<ResponseData<Courses | null> | ResponseData<string>>} - A promise that resolves to a ResponseData object containing either the course data or an error message.
 *
 * @throws {Error} - Throws an error if the retrieval process fails.
 */
export const getCoursesByName = async (
  name: string | null,
): Promise<ResponseData<Courses | null> | ResponseData<string>> => {
  if (!name || typeof name !== "string") {
    return new ResponseData(400, "Name is required and should be a string.");
  }

  try {
    const course = (await coursesService.getProjectsByName(name)) as Courses;
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

/**
 * Retrieves courses by their ID.
 *
 * @param {string | null} id - The ID of the course to retrieve. Must be a non-null string.
 * @returns {Promise<ResponseData<Courses | null> | ResponseData<string>>} - A promise that resolves to a ResponseData object containing either the course data or an error message.
 *
 * @throws {Error} - Throws an error if the retrieval process fails.
 */
export const getCoursesByID = async (
  id: string | null,
): Promise<ResponseData<Courses | null> | ResponseData<string>> => {
  if (!id || typeof id !== "string") {
    return new ResponseData(400, "ID is required and should be a string.");
  }

  try {
    const course = (await coursesService.getProjectsByID(id)) as Courses;
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
