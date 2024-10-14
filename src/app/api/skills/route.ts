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
  if (name) {
    const response = await SkillsControllers.getSkillByName(name);
    return NextResponse.json(response.body, { status: response.status });
  }

  const id = searchParams.get('id');
  if (id) {
    const response = await SkillsControllers.getSkillByID(id);
    return NextResponse.json(response.body, { status: response.status });
  }

  const response = await SkillsControllers.getAllSkills();
  return NextResponse.json(response.body, { status: response.status });
}
