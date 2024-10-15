import Projects from '../../lib/entities/Projects';
import { KnowledgeLevelEnumerations } from '../../lib/constants/enumerations/KnowledgeLevelsEnumerations';
import Skills from '../../lib/entities/Skills';

describe('Projects Entity', () => {
  test('It should create a new Projects object', () => {
    const skill = new Skills(
      '1',
      'JavaScript',
      'A programming language that conforms to the ECMAScript specification.',
      KnowledgeLevelEnumerations.High,
    );
    const project = new Projects(
      '1',
      'Project',
      new Date('2021-07-01'),
      new Date('2021-07-01'),
      'A project',
      'https://www.example.com',
      [skill],
    );

    expect(project).toBeDefined();
    expect(project.id).toBe('1');
    expect(project.name).toBe('Project');
    expect(project.startDate).toEqual(new Date('2021-07-01'));
    expect(project.endDate).toEqual(new Date('2021-07-01'));
    expect(project.description).toBe('A project');
    expect(project.skills).toEqual([skill]);
    expect(project.url).toBe('https://www.example.com');
  });
});
