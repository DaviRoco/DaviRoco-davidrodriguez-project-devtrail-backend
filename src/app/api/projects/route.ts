import { NextResponse } from 'next/server';
import ProjectsController from '../../lib/controllers/ProjectsController';

/**
 * Handles GET requests for projects.
 *
 * This function processes the incoming request, validates query parameters,
 * and fetches projects based on the provided parameters. It supports
 * fetching projects by name or ID. If no parameters are provided, it fetches all projects.
 *
 * @param {Request} req - The incoming request object.
 * @returns {Promise<Response>} - A promise that resolves to the response object.
 *
 * @throws {Error} - If an error occurs while fetching projects.
 *
 * Query Parameters:
 * - `name` (optional): The name of the project to fetch.
 * - `id` (optional): The ID of the project to fetch.
 *
 * Response:
 * - 200: Successfully fetched the projects.
 * - 400: Invalid query parameters were provided.
 * - 500: An error occurred while fetching projects.
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
      response = await ProjectsController.getProjectByName(name);
    } else if (id) {
      response = await ProjectsController.getProjectByID(id);
    } else {
      response = await ProjectsController.getAllProjects();
    }

    return NextResponse.json(response.body, { status: response.status });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        message: 'An error occurred while fetching projects.',
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}
