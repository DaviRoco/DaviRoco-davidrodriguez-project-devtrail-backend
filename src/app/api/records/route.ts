import { NextResponse } from 'next/server';
import RecordsController from '../../lib/controllers/RecordsController';

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
  const type = searchParams.get('type') as keyof typeof recordHandlers || '';

  if (!(type in recordHandlers)) {
    return NextResponse.json(
      { message: 'Invalid record type provided' },
      { status: 400 }
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
