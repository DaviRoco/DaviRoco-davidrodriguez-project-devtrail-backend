import { NextResponse } from 'next/server';
import CertificationsController from '../../lib/controllers/CertificationsController';

/**
 * Handles GET requests for certifications.
 *
 * This function processes the incoming request, validates query parameters,
 * and fetches certifications based on the provided parameters. It supports
 * fetching certifications by name, ID, or institution. If no parameters are
 * provided, it fetches all certifications.
 *
 * @param {Request} req - The incoming request object.
 * @returns {Promise<Response>} - A promise that resolves to the response object.
 *
 * @throws {Error} - If an error occurs while fetching certifications.
 *
 * Query Parameters:
 * - `name` (optional): The name of the certification to fetch.
 * - `id` (optional): The ID of the certification to fetch.
 * - `institution` (optional): The institution of the certifications to fetch.
 *
 * Response:
 * - 200: Successfully fetched the certifications.
 * - 400: Invalid query parameters were provided.
 * - 500: An error occurred while fetching certifications.
 */

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const validParams = ['name', 'id', 'institution'];
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
  const institution = searchParams.get('institution');
  try {
    let response;

    if (name) {
      response = await CertificationsController.getCertificationByName(name);
    } else if (id) {
      response = await CertificationsController.getCertificationByID(id);
    } else if (institution) {
      response =
        await CertificationsController.getCertificationsByInstitution(
          institution,
        );
    } else {
      response = await CertificationsController.getAllCertifications();
    }

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
