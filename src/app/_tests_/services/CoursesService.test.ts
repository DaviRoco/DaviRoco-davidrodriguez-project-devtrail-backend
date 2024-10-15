import { CoursesService } from '../../lib/services/CoursesService';
import CoursesRepository from '../../lib/repositories/CoursesRespository';
import Courses from '../../lib/entities/Courses';
import Skills from '../../lib/entities/Skills';
import { KnowledgeLevelEnumerations } from '../../lib/constants/enumerations/KnowledgeLevelsEnumerations';
import SkillsRepository from '../../lib/repositories/SkillsRepository';

jest.mock('../../lib/repositories/CoursesRespository');
jest.mock('../../lib/repositories/SkillsRepository');

describe('Courses Service', () => {
  let coursesService: CoursesService;
  let coursesRepository: jest.Mocked<CoursesRepository>;
  let skillsRepository: jest.Mocked<SkillsRepository>;

  beforeEach(() => {
    coursesRepository =
      new CoursesRepository() as jest.Mocked<CoursesRepository>;
    coursesService = new CoursesService(coursesRepository);
    skillsRepository = new SkillsRepository() as jest.Mocked<SkillsRepository>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockCourses = [
    new Courses(
      '1',
      'Course 1',
      'Code 1',
      'Description of Course 1',
      'Institution 1',
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
    new Courses(
      '2',
      'Course 2',
      'Code 2',
      'Description of Course 2',
      'Institution 2',
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

  const mockCoursesObjects = [
    {
      _id: mockCourses[0].id,
      _name: mockCourses[0].name,
      _code: mockCourses[0].code,
      _description: mockCourses[0].description,
      _institution: mockCourses[0].institution,
    },
    {
      _id: mockCourses[1].id,
      _name: mockCourses[1].name,
      _code: mockCourses[1].code,
      _description: mockCourses[1].description,
      _institution: mockCourses[1].institution,
    },
  ];

  describe('getAllCourses', () => {
    test('It should return all courses when repository returns courses', async () => {
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
      coursesRepository.getAllCourses.mockResolvedValue(mockCourses);

      const result = await coursesService.getAllCourses();

      expect(result).toEqual(mockCoursesObjects);
      expect(coursesRepository.getAllCourses).toHaveBeenCalledTimes(1);
    });

    test('It should return null when repository returns no courses', async () => {
      coursesRepository.getAllCourses.mockResolvedValue([]);

      const result = await coursesService.getAllCourses();

      expect(result).toBeNull();
      expect(coursesRepository.getAllCourses).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCourseByName', () => {
    test('It should return the course when the repository returns it by name', async () => {
      const testName = 'Course 1';
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
      coursesRepository.getCourseByName.mockResolvedValue(mockCourses[0]);

      const result = await coursesService.getCourseByName(testName);

      expect(result).toEqual(mockCoursesObjects[0]);
      expect(coursesRepository.getCourseByName).toHaveBeenCalledTimes(1);
    });

    test('It should return null when the repository returns no course by name', async () => {
      const testName = 'Course 3';
      coursesRepository.getCourseByName.mockResolvedValue(null);

      const result = await coursesService.getCourseByName(testName);

      expect(result).toBeNull();
      expect(coursesRepository.getCourseByName).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCourseByID', () => {
    test('It should return the course when the repository returns it by ID', async () => {
      const testID = '2';
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
      coursesRepository.getCourseByID.mockResolvedValue(mockCourses[1]);

      const result = await coursesService.getCourseByID(testID);

      expect(result).toEqual(mockCoursesObjects[1]);
      expect(coursesRepository.getCourseByID).toHaveBeenCalledTimes(1);
    });

    test('It should return null when the repository returns no course by ID', async () => {
      const testID = '3';
      coursesRepository.getCourseByID.mockResolvedValue(null);

      const result = await coursesService.getCourseByID(testID);

      expect(result).toBeNull();
      expect(coursesRepository.getCourseByID).toHaveBeenCalledTimes(1);
    });
  });
});
