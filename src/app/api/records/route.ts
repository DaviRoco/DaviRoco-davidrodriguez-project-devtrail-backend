import { NextResponse } from 'next/server';
import RecordsController from '../../lib/controllers/RecordsController';

/**
 * Handles GET requests for records.
 *
 * This function processes the incoming request, validates query parameters,
 * and fetches records based on the provided parameters. It supports
 * fetching records by ID or type. If no ID is provided, it fetches all records of the specified type.
 *
 * @param {Request} req - The incoming request object.
 * @returns {Promise<Response>} - A promise that resolves to the response object.
 *
 * @throws {Error} - If an error occurs while fetching records.
 *
 * Query Parameters:
 * - `id` (optional): The ID of the record to fetch.
 * - `type` (required): The type of the record to fetch (e.g., 'education', 'experience').
 *
 * Response:
 * - 200: Successfully fetched the records.
 * - 400: Invalid query parameters were provided.
 * - 500: An error occurred while fetching records.
 */

const recordHandlers = {
  education: {
    getByID: RecordsController.getEducationalRecordByID,
    getAll: RecordsController.getAllEducationalRecords,
  },
  experience: {
    getByID: RecordsController.getExperienceRecordByID,
    getAll: RecordsController.getAllExperienceRecords,
  },
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const validParams = ['id', 'type'];
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

  const id = searchParams.get('id');
  const type = (searchParams.get('type') as keyof typeof recordHandlers) || '';

  if (!(type in recordHandlers)) {
    return NextResponse.json(
      { message: 'Invalid record type provided' },
      { status: 400 },
    );
  }

  try {
    const handler = recordHandlers[type];
    const response = id ? await handler.getByID(id) : await handler.getAll();

    return NextResponse.json(response.body, { status: response.status });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        message: 'An error occurred while fetching certifications.',
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}
