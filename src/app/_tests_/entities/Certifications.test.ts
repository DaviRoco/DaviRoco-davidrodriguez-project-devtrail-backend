import Certifications from '../../lib/entities/Certifications';
import { KnowledgeLevelEnumerations } from '../../lib/constants/enumerations/KnowledgeLevelsEnumerations';
import Skills from '../../lib/entities/Skills';

describe('Certifications Entity', () => {
  test('It should create a new Certifications object', () => {
    const skill = new Skills(
      '1',
      'JavaScript',
      'A programming language that conforms to the ECMAScript specification.',
      KnowledgeLevelEnumerations.High,
    );
    const certification = new Certifications(
      '1',
      'Certification',
      'institutionName',
      new Date('2021-07-01'),
      'credentialId',
      'https://www.example.com',
      [skill],
    );

    expect(certification).toBeDefined();
    expect(certification.id).toBe('1');
    expect(certification.name).toBe('Certification');
    expect(certification.institution).toBe('institutionName');
    expect(certification.date).toEqual(new Date('2021-07-01'));
    expect(certification.credentialID).toBe('credentialId');
    expect(certification.url).toBe('https://www.example.com');
    expect(certification.skills).toEqual([skill]);
  });
});
