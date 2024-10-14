import { KnowledgeLevelEnumerations } from '../../lib/constants/enumerations/KnowledgeLevelsEnumerations';
import Records from '../../lib/entities/Records';
import Skills from '../../lib/entities/Skills';

describe('Records Entity', () => {
  test('It should create a new Records object', () => {
    const skill = new Skills(
      '1',
      'JavaScript',
      'A programming language that conforms to the ECMAScript specification.',
      KnowledgeLevelEnumerations.High,
    );
    const records = new Records(
      '1',
      new Date('2021-07-01'),
      new Date('2021-07-01'),
      'A record',
      [skill],
      'Location',
    );

    expect(records).toBeDefined();
    expect(records.id).toBe('1');
    expect(records.startDate).toEqual(new Date('2021-07-01'));
    expect(records.endDate).toEqual(new Date('2021-07-01'));
    expect(records.description).toBe('A record');
    expect(records.skills).toEqual([skill]);
    expect(records.location).toBe('Location');
  });
});
