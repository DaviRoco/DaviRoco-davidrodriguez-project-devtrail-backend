/**
 * CoursesController module.
 *
 * This module provides functions to interact with the courses service and retrieve course data.
 *
 * @module CoursesController
 */

import { CoursesService } from '../services/CoursesService';
import CoursesRepository from '../repositories/CoursesRespository';
import ResponseData from '../constants/api/ResponseData';
import Courses from '../entities/Courses';
import ApiResponseBuilder from '../utils/ApiResponseBuilder';

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
  ResponseData<Courses[] | string>
> => {
  try {
    const courses = (await coursesService.getAllCourses()) as Courses[];
    if (courses?.length) {
      return ApiResponseBuilder.createSuccessResponse(courses);
    } else {
      return ApiResponseBuilder.createSuccessResponse('No Courses fetched');
    }
  } catch (error) {
    return ApiResponseBuilder.createErrorResponse(
      error as Error,
      'Failed to retrieve courses',
    );
  }
};

/**
 * Retrieves
 *
 * @param {string | null} name - The name of the course to retrieve. Must be a non-null string.
 * @returns {Promise<ResponseData<Courses | null> | ResponseData<string>>} - A promise that resolves to a ResponseData object containing either the course data or an error message.
 *
 * @throws {Error} - Throws an error if the retrieval process fails.
 */
export const getCourseByName = async (
  name: string,
): Promise<ResponseData<Courses | string>> => {
  const validationError = ApiResponseBuilder.validateString(name, 'Name');
  if (validationError) {
    return validationError;
  }

  try {
    const course = (await coursesService.getCourseByName(name)) as Courses;
    if (course) {
      return ApiResponseBuilder.createSuccessResponse(course);
    } else {
      return ApiResponseBuilder.createSuccessResponse(
        `No Course fetched with name: ${name}`,
      );
    }
  } catch (error) {
    return ApiResponseBuilder.createErrorResponse(
      error as Error,
      `Failed to retrieve course with name. Name: ${name}`,
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
export const getCourseByID = async (
  id: string,
): Promise<ResponseData<Courses | string>> => {
  const validationError = ApiResponseBuilder.validateString(id, 'ID');
  if (validationError) {
    return validationError;
  }

  try {
    const course = (await coursesService.getCourseByID(id)) as Courses;
    if (course) {
      return ApiResponseBuilder.createSuccessResponse(course);
    } else {
      return ApiResponseBuilder.createSuccessResponse(
        `No Course fetched with ID: ${id}`,
      );
    }
  } catch (error) {
    return ApiResponseBuilder.createErrorResponse(
      error as Error,
      `Failed to retrieve course with ID. ID: ${id}`,
    );
  }
};

const CoursesController = {
  getAllCourses,
  getCourseByName,
  getCourseByID,
};

export default CoursesController;
