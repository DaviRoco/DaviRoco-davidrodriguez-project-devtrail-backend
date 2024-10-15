import CoursesRepository from '../../lib/repositories/CoursesRespository';
import { getDocs, getDoc } from 'firebase/firestore';
import Courses from '../../lib/entities/Courses';

jest.mock('firebase/firestore', () => ({
  initializeApp: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  getDocs: jest.fn(),
  getDoc: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  doc: jest.fn(),
}));

describe('Courses Repository', () => {
  let repository: CoursesRepository;

  const mockCourses = [
    {
      id: '1',
      name: 'JavaScript',
      code: 'JS',
      description:
        'A programming language that conforms to the ECMAScript specification.',
      institution: 'Udemy',
      skills: [
        {
          id: '1',
          name: 'JavaScript',
          description:
            'A programming language that conforms to the ECMAScript specification.',
          level: 'High',
        },
      ],
    },
    {
      id: '2',
      name: 'TypeScript',
      code: 'TS',
      description: 'A strict syntactical superset of JavaScript.',
      institution: 'Udemy',
      skills: [
        {
          id: '2',
          name: 'TypeScript',
          description: 'A strict syntactical superset of JavaScript.',
          level: 'High',
        },
      ],
    },
  ];

  beforeEach(() => {
    repository = new CoursesRepository();
    jest.resetAllMocks();
  });

  describe('getCourses', () => {
    test('It should retrieve all courses.', async () => {
      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: mockCourses.map((course) => ({
          id: course.id,
          data: () => course,
        })),
      });

      const courses = await repository.getAllCourses();
      expect(courses.length).toBe(2);
      expect(courses[0].name).toBe('JavaScript');
      expect(courses[1].name).toBe('TypeScript');
    });

    test('It should handle errors when mandatory fields are missing.', async () => {
      const incompleteCourses = [
        {
          id: '1',
          name: '',
          code: 'JS',
          description:
            'A programming language that conforms to the ECMAScript specification.',
          institution: 'Udemy',
          skills: [
            {
              id: '1',
              name: 'JavaScript',
              description:
                'A programming language that conforms to the ECMAScript specification.',
              level: 'High',
            },
          ],
        },
        {
          id: '2',
          name: 'TypeScript',
          code: '',
          description: 'A strict syntactical superset of JavaScript.',
          institution: 'Udemy',
          skills: [
            {
              id: '2',
              name: 'TypeScript',
              description: 'A strict syntactical superset of JavaScript.',
              level: 'High',
            },
          ],
        },
      ];

      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: incompleteCourses.map((course) => ({
          id: course.id,
          data: () => course,
        })),
      });

      await expect(repository.getAllCourses()).rejects.toThrow();
    });
  });

  describe('getCourseByName', () => {
    test('It should retrieve a course by name.', async () => {
      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: [
          {
            id: '1',
            data: () => mockCourses[0],
          },
        ],
      });

      const course = await repository.getCourseByName('JavaScript');
      expect(course).toBeInstanceOf(Courses);
      expect(course?.name).toBe('JavaScript');
    });

    test('It should handle errors when mandatory fields are missing.', async () => {
      const incompleteCourses = [
        {
          id: '1',
          name: '',
          code: 'JS',
          description:
            'A programming language that conforms to the ECMAScript specification.',
          institution: 'Udemy',
          skills: [
            {
              id: '1',
              name: 'JavaScript',
              description:
                'A programming language that conforms to the ECMAScript specification.',
              level: 'High',
            },
          ],
        },
        {
          id: '2',
          name: 'TypeScript',
          code: '',
          description: 'A strict syntactical superset of JavaScript.',
          institution: 'Udemy',
          skills: [
            {
              id: '2',
              name: 'TypeScript',
              description: 'A strict syntactical superset of JavaScript.',
              level: 'High',
            },
          ],
        },
      ];

      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: incompleteCourses.map((course) => ({
          id: course.id,
          data: () => course,
        })),
      });

      await expect(repository.getCourseByName('JavaScript')).rejects.toThrow();
    });

    test('It should return null if no course is found.', async () => {
      (getDocs as jest.Mock).mockResolvedValueOnce({
        empty: true,
        docs: [],
      });

      const course = await repository.getCourseByName('JavaScript');
      expect(course).toBeNull();
    });

    test('It should handle errors when name is invalid.', async () => {
      await expect(repository.getCourseByName('')).rejects.toThrow();
    });
  });

  describe('getCourseByID', () => {
    test('It should retrieve a course by ID.', async () => {
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => true,
        id: '1',
        data: () => mockCourses[0],
      });

      const course = await repository.getCourseByID('1');
      expect(course).toBeInstanceOf(Courses);
      expect(course?.id).toBe('1');
    });

    test('It should handle errors when mandatory fields are missing.', async () => {
      const incompleteCourse = {
        id: '1',
        name: '',
        code: 'JS',
        description:
          'A programming language that conforms to the ECMAScript specification.',
        institution: '',
        skills: [
          {
            id: '1',
            name: 'JavaScript',
            description:
              'A programming language that conforms to the ECMAScript specification.',
            level: 'High',
          },
        ],
      };

      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => true,
        id: '1',
        data: () => incompleteCourse,
      });

      await expect(repository.getCourseByID('1')).rejects.toThrow(
        'Course with ID 1 is missing mandatory fields.',
      );
    });

    test('It should return null if no course is found.', async () => {
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => false,
        docs: [],
      });

      const course = await repository.getCourseByID('1');
      expect(course).toBeNull();
    });

    test('It should handle errors when ID is invalid.', async () => {
      await expect(repository.getCourseByID('')).rejects.toThrow();
    });
  });
});
