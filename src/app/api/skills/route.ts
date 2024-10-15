import { NextResponse } from 'next/server';
import SkillsControllers from '../../lib/controllers/SkillsController';

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
      response = await SkillsControllers.getSkillByName(name);
    } else if (id) {
      response = await SkillsControllers.getSkillByID(id);
    } else {
      response = await SkillsControllers.getAllSkills();
    }

    return NextResponse.json(response.body, { status: response.status });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        message: 'An error occurred while fetching skills.',
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}
