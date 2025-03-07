/**
 * @fileoverview Unit tests for the RecordsService class.
 *
 * This file contains unit tests for the RecordsService, responsible for
 * managing record-related data and interacting with the RecordsRepository
 * and SkillsRepository to retrieve and process experience and educational records.
 *
 * The tests validate the functionality of the service methods, ensuring they
 * handle the data correctly, interact with the repositories as expected, and
 * return the appropriate results based on various scenarios.
 *
 * The tests cover the following methods:
 *
 * - **getAllExperienceRecords**: Retrieves all experience records from the repository.
 * - **getAllEducationalRecords**: Retrieves all educational records from the repository.
 * - **getExperienceRecordByID**: Retrieves an experience record by its ID.
 * - **getEducationalRecordByID**: Retrieves an educational record by its ID.
 *
 * Each test verifies the following aspects:
 * - Successful retrieval of records.
 * - Correct handling of skills associated with records.
 * - Proper handling of scenarios where records or skills are missing or invalid.
 * - Accurate return values based on the provided inputs, including cases where no data is found.
 *
 * The tests utilize Jest to mock repository dependencies, ensuring isolated and
 * focused unit testing without needing to interact with the actual database.
 *
 * @module RecordsServiceTest
 */

import { RecordsService } from '../../lib/services/RecordsService';
import RecordsRepository from '../../lib/repositories/RecordsRepository';
import ExperienceRecords from '../../lib/entities/ExperienceRecords';
import EducationalRecords from '../../lib/entities/EducationalRecords';
import { KnowledgeLevelEnumerations } from '../../lib/constants/enumerations/KnowledgeLevelsEnumerations';
import Skills from '../../lib/entities/Skills';
import SkillsRepository from '../../lib/repositories/SkillsRepository';

jest.mock('../../lib/repositories/RecordsRepository');
jest.mock('../../lib/repositories/SkillsRepository');

describe('Records Service', () => {
  let recordsService: RecordsService;
  let recordsRepository: jest.Mocked<RecordsRepository>;
  let skillsRepository: jest.Mocked<SkillsRepository>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockExperienceRecords = [
    new ExperienceRecords(
      '1',
      new Date('2021-01-01'),
      new Date('2021-12-31'),
      'A description of the experience record.',
      [
        new Skills(
          '1',
          'JavaScript',
          'A programming language that conforms to the ECMAScript specification.',
          KnowledgeLevelEnumerations.High,
        ),
        new Skills(
          '2',
          'TypeScript',
          'A strict syntactical superset of JavaScript.',
          KnowledgeLevelEnumerations.High,
        ),
      ],
      'Company Name',
      'Job Title',
      'Location',
    ),
    new ExperienceRecords(
      '2',
      new Date('2021-01-01'),
      new Date('2021-12-31'),
      'A description of the experience record.',
      [
        new Skills(
          '1',
          'JavaScript',
          'A programming language that conforms to the ECMAScript specification.',
          KnowledgeLevelEnumerations.High,
        ),
        new Skills(
          '2',
          'TypeScript',
          'A strict syntactical superset of JavaScript.',
          KnowledgeLevelEnumerations.High,
        ),
      ],
      'Company Name',
      'Job Title',
      'Location',
    ),
  ];

  const mockEducationalRecords = [
    new EducationalRecords(
      '1',
      new Date('2021-01-01'),
      new Date('2021-12-31'),
      'A description of the educational record.',
      [
        new Skills(
          '1',
          'JavaScript',
          'A programming language that conforms to the ECMAScript specification.',
          KnowledgeLevelEnumerations.High,
        ),
        new Skills(
          '2',
          'TypeScript',
          'A strict syntactical superset of JavaScript.',
          KnowledgeLevelEnumerations.High,
        ),
      ],
      'University Name',
      'Degree',
      'Location',
    ),
    new EducationalRecords(
      '2',
      new Date('2021-01-01'),
      new Date('2021-12-31'),
      'A description of the educational record.',
      [
        new Skills(
          '1',
          'JavaScript',
          'A programming language that conforms to the ECMAScript specification.',
          KnowledgeLevelEnumerations.High,
        ),
        new Skills(
          '2',
          'TypeScript',
          'A strict syntactical superset of JavaScript.',
          KnowledgeLevelEnumerations.High,
        ),
      ],
      'University Name',
      'Degree',
      'Location',
    ),
  ];

  const mockExperienceObjects = [
    {
      _companyName: mockExperienceRecords[0]._companyName,
      _title: mockExperienceRecords[0]._title,
      _id: mockExperienceRecords[0]._id,
      _startDate: mockExperienceRecords[0]._startDate,
      _endDate: mockExperienceRecords[0]._endDate,
      _description: mockExperienceRecords[0]._description,
      _location: mockExperienceRecords[0]._location,
    } as Omit<ExperienceRecords, 'skills'>,
    {
      _companyName: mockExperienceRecords[1]._companyName,
      _title: mockExperienceRecords[1]._title,
      _id: mockExperienceRecords[1]._id,
      _startDate: mockExperienceRecords[1]._startDate,
      _endDate: mockExperienceRecords[1]._endDate,
      _description: mockExperienceRecords[1]._description,
      _location: mockExperienceRecords[1]._location,
    } as Omit<ExperienceRecords, 'skills'>,
  ];

  const mockEducationalObjects = [
    {
      _institutionName: mockEducationalRecords[0]._institutionName,
      _degree: mockEducationalRecords[0]._degree,
      _id: mockEducationalRecords[0]._id,
      _startDate: mockEducationalRecords[0]._startDate,
      _endDate: mockEducationalRecords[0]._endDate,
      _description: mockEducationalRecords[0]._description,
      _location: mockEducationalRecords[0]._location,
    } as Omit<EducationalRecords, 'skills'>,
    {
      _institutionName: mockEducationalRecords[1]._institutionName,
      _degree: mockEducationalRecords[1]._degree,
      _id: mockEducationalRecords[1]._id,
      _startDate: mockEducationalRecords[1]._startDate,
      _endDate: mockEducationalRecords[1]._endDate,
      _description: mockEducationalRecords[1]._description,
      _location: mockEducationalRecords[1]._location,
    } as Omit<EducationalRecords, 'skills'>,
  ];

  describe('getAllExperienceRecords', () => {
    test('It should return all experience records when repository returns records', async () => {
      skillsRepository =
        new SkillsRepository() as jest.Mocked<SkillsRepository>;
      recordsRepository = new RecordsRepository(
        'experience',
      ) as jest.Mocked<RecordsRepository>;
      recordsService = new RecordsService(recordsRepository, 'experience');

      skillsRepository.getSkillsByIDs = jest.fn().mockResolvedValue([
        {
          id: '1',
          name: 'JavaScript',
          description:
            'A programming language that conforms to the ECMAScript specification.',
          knowledgeLevel: KnowledgeLevelEnumerations.High,
        },
        {
          id: '2',
          name: 'TypeScript',
          description: 'A strict syntactical superset of JavaScript.',
          knowledgeLevel: KnowledgeLevelEnumerations.High,
        },
      ]);

      recordsRepository.getAllExperienceRecords.mockResolvedValue(
        mockExperienceRecords,
      );

      const result = await recordsService.getAllExperienceRecords();

      expect(result).toEqual(mockExperienceObjects);
      expect(recordsRepository.getAllExperienceRecords).toHaveBeenCalledTimes(
        1,
      );
    });

    test('It should throw an error when the type is not experience', async () => {
      recordsRepository = new RecordsRepository(
        'education',
      ) as jest.Mocked<RecordsRepository>;
      recordsService = new RecordsService(recordsRepository, 'education');

      expect(() => recordsService.getAllExperienceRecords()).rejects.toThrow(
        'Invalid method for experience record type.',
      );
    });

    test('It should return null when repository returns no records', async () => {
      recordsRepository = new RecordsRepository(
        'experience',
      ) as jest.Mocked<RecordsRepository>;
      recordsService = new RecordsService(recordsRepository, 'experience');

      recordsRepository.getAllExperienceRecords.mockResolvedValue([]);

      const result = await recordsService.getAllExperienceRecords();

      expect(result).toBeNull();
      expect(recordsRepository.getAllExperienceRecords).toHaveBeenCalledTimes(
        1,
      );
    });
  });

  describe('getAllEducationalRecords', () => {
    test('It should return all educational records when repository returns records', async () => {
      skillsRepository =
        new SkillsRepository() as jest.Mocked<SkillsRepository>;
      recordsRepository = new RecordsRepository(
        'education',
      ) as jest.Mocked<RecordsRepository>;
      recordsService = new RecordsService(recordsRepository, 'education');

      skillsRepository.getSkillsByIDs = jest.fn().mockResolvedValue([
        {
          id: '1',
          name: 'JavaScript',
          description:
            'A programming language that conforms to the ECMAScript specification.',
          knowledgeLevel: KnowledgeLevelEnumerations.High,
        },
        {
          id: '2',
          name: 'TypeScript',
          description: 'A strict syntactical superset of JavaScript.',
          knowledgeLevel: KnowledgeLevelEnumerations.High,
        },
      ]);

      recordsRepository.getAllEducationalRecords.mockResolvedValue(
        mockEducationalRecords,
      );

      const result = await recordsService.getAllEducationalRecords();

      expect(result).toEqual(mockEducationalObjects);
      expect(recordsRepository.getAllEducationalRecords).toHaveBeenCalledTimes(
        1,
      );
    });

    test('It should throw an error when the type is not education', async () => {
      recordsRepository = new RecordsRepository(
        'experience',
      ) as jest.Mocked<RecordsRepository>;
      recordsService = new RecordsService(recordsRepository, 'experience');

      expect(() => recordsService.getAllEducationalRecords()).rejects.toThrow(
        'Invalid method for education record type.',
      );
    });

    test('It should return null when repository returns no records', async () => {
      recordsRepository = new RecordsRepository(
        'education',
      ) as jest.Mocked<RecordsRepository>;
      recordsService = new RecordsService(recordsRepository, 'education');

      recordsRepository.getAllEducationalRecords.mockResolvedValue([]);

      const result = await recordsService.getAllEducationalRecords();

      expect(result).toBeNull();
      expect(recordsRepository.getAllEducationalRecords).toHaveBeenCalledTimes(
        1,
      );
    });
  });

  describe('getExperienceRecordByID', () => {
    test('It should return the experience record when repository returns record by ID', async () => {
      skillsRepository =
        new SkillsRepository() as jest.Mocked<SkillsRepository>;
      recordsRepository = new RecordsRepository(
        'experience',
      ) as jest.Mocked<RecordsRepository>;
      recordsService = new RecordsService(recordsRepository, 'experience');

      skillsRepository.getSkillsByIDs = jest.fn().mockResolvedValue([
        {
          id: '1',
          name: 'JavaScript',
          description:
            'A programming language that conforms to the ECMAScript specification.',
          knowledgeLevel: KnowledgeLevelEnumerations.High,
        },
        {
          id: '2',
          name: 'TypeScript',
          description: 'A strict syntactical superset of JavaScript.',
          knowledgeLevel: KnowledgeLevelEnumerations.High,
        },
      ]);

      recordsRepository.getExperienceRecordByID.mockResolvedValue(
        mockExperienceRecords[0],
      );

      const result = await recordsService.getExperienceRecordByID('1');

      expect(result).toEqual(mockExperienceObjects[0]);
      expect(recordsRepository.getExperienceRecordByID).toHaveBeenCalledTimes(
        1,
      );
    });

    test('It should throw an error when the type is not experience', async () => {
      recordsRepository = new RecordsRepository(
        'education',
      ) as jest.Mocked<RecordsRepository>;
      recordsService = new RecordsService(recordsRepository, 'education');

      expect(() => recordsService.getExperienceRecordByID('1')).rejects.toThrow(
        'Invalid method for experience record type.',
      );
    });

    test('It should return null when repository returns no record', async () => {
      recordsRepository = new RecordsRepository(
        'experience',
      ) as jest.Mocked<RecordsRepository>;
      recordsService = new RecordsService(recordsRepository, 'experience');

      recordsRepository.getExperienceRecordByID.mockResolvedValue(null);

      const result = await recordsService.getExperienceRecordByID('1');

      expect(result).toBeNull();
      expect(recordsRepository.getExperienceRecordByID).toHaveBeenCalledTimes(
        1,
      );
    });
  });

  describe('getEducationalRecordByID', () => {
    test('It should return the educational record when repository returns record by ID', async () => {
      skillsRepository =
        new SkillsRepository() as jest.Mocked<SkillsRepository>;
      recordsRepository = new RecordsRepository(
        'education',
      ) as jest.Mocked<RecordsRepository>;
      recordsService = new RecordsService(recordsRepository, 'education');

      skillsRepository.getSkillsByIDs = jest.fn().mockResolvedValue([
        {
          id: '1',
          name: 'JavaScript',
          description:
            'A programming language that conforms to the ECMAScript specification.',
          knowledgeLevel: KnowledgeLevelEnumerations.High,
        },
        {
          id: '2',
          name: 'TypeScript',
          description: 'A strict syntactical superset of JavaScript.',
          knowledgeLevel: KnowledgeLevelEnumerations.High,
        },
      ]);

      recordsRepository.getEducationalRecordByID.mockResolvedValue(
        mockEducationalRecords[0],
      );

      const result = await recordsService.getEducationalRecordByID('1');

      expect(result).toEqual(mockEducationalObjects[0]);
      expect(recordsRepository.getEducationalRecordByID).toHaveBeenCalledTimes(
        1,
      );
    });

    test('It should throw an error when the type is not education', async () => {
      recordsRepository = new RecordsRepository(
        'experience',
      ) as jest.Mocked<RecordsRepository>;
      recordsService = new RecordsService(recordsRepository, 'experience');

      expect(() =>
        recordsService.getEducationalRecordByID('1'),
      ).rejects.toThrow('Invalid method for education record type.');
    });

    test('It should return null when repository returns no record', async () => {
      recordsRepository = new RecordsRepository(
        'education',
      ) as jest.Mocked<RecordsRepository>;
      recordsService = new RecordsService(recordsRepository, 'education');

      recordsRepository.getEducationalRecordByID.mockResolvedValue(null);

      const result = await recordsService.getEducationalRecordByID('1');

      expect(result).toBeNull();
      expect(recordsRepository.getEducationalRecordByID).toHaveBeenCalledTimes(
        1,
      );
    });
  });
});
