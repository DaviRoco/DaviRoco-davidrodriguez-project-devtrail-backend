import { NextResponse } from 'next/server';
import CertificationsController from '../../lib/controllers/CertificationsController';

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
