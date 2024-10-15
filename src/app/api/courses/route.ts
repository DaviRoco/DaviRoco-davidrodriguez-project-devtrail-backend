import { NextResponse } from 'next/server';
import CoursesController from '../../lib/controllers/CoursesController';

/**
 * Handles GET requests for courses.
 *
 * This function processes the incoming request, validates query parameters,
 * and fetches courses based on the provided parameters. It supports
 * fetching courses by name or ID. If no parameters are provided, it fetches all courses.
 *
 * @param {Request} req - The incoming request object.
 * @returns {Promise<Response>} - A promise that resolves to the response object.
 *
 * @throws {Error} - If an error occurs while fetching courses.
 *
 * Query Parameters:
 * - `name` (optional): The name of the course to fetch.
 * - `id` (optional): The ID of the course to fetch.
 *
 * Response:
 * - 200: Successfully fetched the courses.
 * - 400: Invalid query parameters were provided.
 * - 500: An error occurred while fetching courses.
 */

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const validParams = ['name', 'id'];
  const invalidParams: string[] = [];

  searchParams.forEach((_, key) => {
    if (!validParams.includes(key)) {
      invalidParams.push(key);
    }
  });

  if (invalidParams.length > 0) {
    return NextResponse.json(
      {
        message: `Invalid query parameters: ${invalidParams.join(', ')}`,
      },
      { status: 400 },
    );
  }

  const name = searchParams.get('name');
  const id = searchParams.get('id');

  try {
    let response;

    if (name) {
      response = await CoursesController.getCourseByName(name);
    } else if (id) {
      response = await CoursesController.getCourseByID(id);
    } else {
      response = await CoursesController.getAllCourses();
    }

    return NextResponse.json(response.body, { status: response.status });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        message: 'An error occurred while fetching courses.',
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}
