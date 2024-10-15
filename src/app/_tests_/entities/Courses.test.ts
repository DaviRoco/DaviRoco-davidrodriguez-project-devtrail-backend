import Courses from '../../lib/entities/Courses';
import { KnowledgeLevelEnumerations } from '../../lib/constants/enumerations/KnowledgeLevelsEnumerations';
import Skills from '../../lib/entities/Skills';

describe('Courses Entity', () => {
  test('It should create a new Courses object', () => {
    const skill = new Skills(
      '1',
      'JavaScript',
      'A programming language that conforms to the ECMAScript specification.',
      KnowledgeLevelEnumerations.High,
    );
    const course = new Courses(
      '1',
      'Course',
      'code',
      'A course',
      'institutionName',
      [skill],
    );

    expect(course).toBeDefined();
    expect(course.id).toBe('1');
    expect(course.name).toBe('Course');
    expect(course.code).toBe('code');
    expect(course.description).toBe('A course');
    expect(course.institution).toBe('institutionName');
    expect(course.skills).toEqual([skill]);
  });
});
