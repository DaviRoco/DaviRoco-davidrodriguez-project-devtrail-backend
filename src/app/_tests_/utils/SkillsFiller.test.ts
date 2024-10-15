import SkillsFiller from '../../lib/utils/SkillsFiller';
import SkillsRepository from '../../lib/repositories/SkillsRepository';
import Skills from '../../lib/entities/Skills';
import { KnowledgeLevelEnumerations } from '../../lib/constants/enumerations/KnowledgeLevelsEnumerations';
import Projects from '../../lib/entities/Projects';

jest.mock('../../lib/repositories/SkillsRepository');

describe('SkillsFiller', () => {
  let skillsFiller: SkillsFiller<Projects>;
  let mockSkillsRepository: jest.Mocked<SkillsRepository>;

  beforeEach(() => {
    mockSkillsRepository =
      new SkillsRepository() as jest.Mocked<SkillsRepository>;
    skillsFiller = new SkillsFiller();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  const mockProjects = [
    new Projects(
      '1',
      'Project 1',
      new Date('2021-01-01'),
      new Date('2021-01-02'),
      'Description of Project 1',
      'url1',
      [
        new Skills(
          '1',
          'TypeScript',
          'Strong in TypeScript',
          KnowledgeLevelEnumerations.High,
        ),
        new Skills(
          '2',
          'JavaScript',
          'Experienced in JavaScript',
          KnowledgeLevelEnumerations.Mid,
        ),
      ],
    ),
    new Projects(
      '2',
      'Project 2',
      new Date('2021-01-01'),
      new Date('2021-01-02'),
      'Description of Project 2',
      'url2',
      [
        new Skills(
          '1',
          'TypeScript',
          'Strong in TypeScript',
          KnowledgeLevelEnumerations.High,
        ),
        new Skills(
          '2',
          'JavaScript',
          'Experienced in JavaScript',
          KnowledgeLevelEnumerations.Mid,
        ),
      ],
    ),
  ];

  const mockProjectObjects = [
    {
      _id: mockProjects[0].id,
      _name: mockProjects[0].name,
      _startDate: mockProjects[0].startDate,
      _endDate: mockProjects[0].endDate,
      _description: mockProjects[0].description,
      _url: mockProjects[0].url,
    } as Omit<Projects, 'skills'>,
    {
      _id: mockProjects[1].id,
      _name: mockProjects[1].name,
      _startDate: mockProjects[1].startDate,
      _endDate: mockProjects[1].endDate,
      _description: mockProjects[1].description,
      _url: mockProjects[1].url,
    } as Omit<Projects, 'skills'>,
  ];

  describe('getObjectWithSkills', () => {
    test('it should return an object with skills when object data is provided', async () => {
      const mockSkills = [
        new Skills(
          '1',
          'TypeScript',
          'Strong in TypeScript',
          KnowledgeLevelEnumerations.High,
        ),
        new Skills(
          '2',
          'JavaScript',
          'Experienced in JavaScript',
          KnowledgeLevelEnumerations.Mid,
        ),
      ];

      mockSkillsRepository.getSkillsByIDs = jest
        .fn()
        .mockResolvedValue(mockSkills);

      const result = await skillsFiller.getObjectWithSkills(mockProjects[0]);

      expect(result).toEqual({
        ...mockProjectObjects[0],
      });
    });

    it('should return null when objectData is null', async () => {
      const result = await skillsFiller.getObjectWithSkills(null);

      expect(result).toBeNull();
    });
  });

  describe('getObjectsWithSkills', () => {
    it('should return an array of objects with skills when objects are provided', async () => {
      const mockSkills1 = [
        new Skills(
          '1',
          'TypeScript',
          'Strong in TypeScript',
          KnowledgeLevelEnumerations.High,
        ),
        new Skills(
          '2',
          'JavaScript',
          'Experienced in JavaScript',
          KnowledgeLevelEnumerations.Mid,
        ),
      ];
      const mockSkills2 = [
        new Skills(
          '3',
          'Java',
          'Strong in Java',
          KnowledgeLevelEnumerations.High,
        ),
      ];
      mockSkillsRepository.getSkillsByIDs = jest
        .fn()
        .mockImplementation((ids) => {
          if (ids.includes(1) || ids.includes(2))
            return Promise.resolve(mockSkills1);
          if (ids.includes(3)) return Promise.resolve(mockSkills2);
          return Promise.resolve([]);
        });

      const result = await skillsFiller.getObjectsWithSkills(mockProjects);

      expect(result).toEqual([
        { ...mockProjectObjects[0] },
        { ...mockProjectObjects[1] },
      ]);
    });

    it('should return null when objects are null or empty', async () => {
      const result1 = await skillsFiller.getObjectsWithSkills(null);
      const result2 = await skillsFiller.getObjectsWithSkills([]);

      expect(result1).toBeNull();
      expect(result2).toBeNull();
    });
  });
});
