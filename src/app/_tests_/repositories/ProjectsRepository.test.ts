import { getDocs, getDoc, Timestamp } from 'firebase/firestore';
import ProjectsRepository from '../../lib/repositories/ProjectsRepository';

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
  Timestamp: {
    fromDate: (date: Date) => ({
      toDate: () => date,
    }),
  },
}));

describe('Projects Repository', () => {
  let repository: ProjectsRepository;

  const mockProjects = [
    {
      id: '1',
      name: 'Project 1',
      startDate: Timestamp.fromDate(new Date('2021-01-01')),
      endDate: Timestamp.fromDate(new Date('2021-02-01')),
      description: 'Description 1',
      url: 'https://example.com',
      skills: [
        {
          id: '1',
          name: 'Skill 1',
          description: 'Description 1',
          level: 'High',
        },
        {
          id: '2',
          name: 'Skill 2',
          description: 'Description 2',
          level: 'Medium',
        },
      ],
    },
    {
      id: '2',
      name: 'Project 2',
      startDate: Timestamp.fromDate(new Date('2021-03-01')),
      endDate: Timestamp.fromDate(new Date('2021-04-01')),
      description: 'Description 2',
      url: 'https://example.com',
      skills: [
        {
          id: '3',
          name: 'Skill 3',
          description: 'Description 3',
          level: 'Low',
        },
        {
          id: '4',
          name: 'Skill 4',
          description: 'Description 4',
          level: 'High',
        },
      ],
    },
  ];

  beforeEach(() => {
    repository = new ProjectsRepository();
    jest.resetAllMocks();
  });

  describe('getAllProjects', () => {
    test('It should retrieve all projects.', async () => {
      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: mockProjects.map((project) => ({
          id: project.id,
          data: () => project,
        })),
      });

      repository = new ProjectsRepository();
      const projects = await repository.getAllProjects();
      expect(projects.length).toBe(2);
      expect(projects[0].name).toBe('Project 1');
      expect(projects[1].name).toBe('Project 2');
    });

    test('It should handle errors when mandatory fields are missing.', async () => {
      const incompleteProjects = [
        {
          id: '1',
          name: '',
          startDate: Timestamp.fromDate(new Date('2021-01-01')),
          endDate: Timestamp.fromDate(new Date('2021-02-01')),
          description: 'Description 1',
          url: 'https://example.com',
          skills: [
            {
              id: '1',
              name: 'Skill 1',
              description: 'Description 1',
              level: 'High',
            },
            {
              id: '2',
              name: 'Skill 2',
              description: 'Description 2',
              level: 'Medium',
            },
          ],
        },
        {
          id: '2',
          name: 'Project 2',
          startDate: Timestamp.fromDate(new Date('2021-03-01')),
          endDate: Timestamp.fromDate(new Date('2021-04-01')),
          description: 'Description 2',
          url: 'https://example.com',
          skills: [
            {
              id: '3',
              name: 'Skill 3',
              description: 'Description 3',
              level: 'Low',
            },
            {
              id: '4',
              name: 'Skill 4',
              description: 'Description 4',
              level: 'High',
            },
          ],
        },
      ];

      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: incompleteProjects.map((project) => ({
          id: project.id,
          data: () => project,
        })),
      });

      repository = new ProjectsRepository();
      await expect(repository.getAllProjects()).rejects.toThrow(
        'Project with ID 1 is missing mandatory fields.',
      );
    });
  });

  describe('getProjectsByName', () => {
    test('It should retrieve the project with the specified name.', async () => {
      const testName = 'Project 2';
      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: [
          {
            id: '2',
            data: () => ({
              id: '2',
              name: 'Project 2',
              startDate: Timestamp.fromDate(new Date('2021-03-01')),
              endDate: Timestamp.fromDate(new Date('2021-04-01')),
              description: 'Description 2',
              url: 'https://example.com',
              skills: [
                {
                  id: '3',
                  name: 'Skill 3',
                  description: 'Description 3',
                  level: 'Low',
                },
                {
                  id: '4',
                  name: 'Skill 4',
                  description: 'Description 4',
                  level: 'High',
                },
              ],
            }),
          },
        ],
      });

      const project = await repository.getProjectsByName(testName);
      expect(project?.name).toBe('Project 2');
    });

    test('It should return null if no project with the specified name is found.', async () => {
      const testName = 'Project 3';
      (getDocs as jest.Mock).mockResolvedValueOnce({
        empty: true,
        docs: [],
      });

      const project = await repository.getProjectsByName(testName);
      expect(project).toBeNull();
    });

    test('It should handle errors when an invalid name is provided.', async () => {
      const testName = '';

      await expect(repository.getProjectsByName(testName)).rejects.toThrow(
        'Invalid name provided. Name must be a non-empty string.',
      );
    });

    test('It should handle errors when mandatory fields are missing.', async () => {
      const testName = 'Project 2';
      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: [
          {
            id: '2',
            data: () => ({
              id: '2',
              name: 'Project 2',
              startDate: Timestamp.fromDate(new Date('2021-03-01')),
              endDate: Timestamp.fromDate(new Date('2021-04-01')),
              description: '',
              url: '',
              skills: [
                {
                  id: '3',
                  name: 'Skill 3',
                  description: 'Description 3',
                  level: 'Low',
                },
                {
                  id: '4',
                  name: 'Skill 4',
                  description: 'Description 4',
                  level: '',
                },
              ],
            }),
          },
        ],
      });

      await expect(repository.getProjectsByName(testName)).rejects.toThrow(
        'Project with name Project 2 is missing mandatory fields.',
      );
    });
  });

  describe('getProjectByID', () => {
    test('It should retrieve the project with the specified ID.', async () => {
      const testID = '1';
      (getDoc as jest.Mock).mockResolvedValueOnce({
        id: testID,
        exists: () => true,
        data: () => ({
          id: '1',
          name: 'Project 1',
          startDate: Timestamp.fromDate(new Date('2021-01-01')),
          endDate: Timestamp.fromDate(new Date('2021-02-01')),
          description: 'Description 1',
          url: 'https://example.com',
          skills: [
            {
              id: '1',
              name: 'Skill 1',
              description: 'Description 1',
              level: 'High',
            },
            {
              id: '2',
              name: 'Skill 2',
              description: 'Description 2',
              level: 'Medium',
            },
          ],
        }),
      });

      const project = await repository.getProjectsByID(testID);
      expect(project?.name).toBe('Project 1');
    });

    test('It should return null if no project with the specified ID is found.', async () => {
      const testID = '3';
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => false,
        id: testID,
        data: () => null,
      });

      const project = await repository.getProjectsByID(testID);
      expect(project).toBeNull();
    });

    test('It should handle errors when an invalid ID is provided.', async () => {
      const testID = '';

      await expect(repository.getProjectsByID(testID)).rejects.toThrow(
        'Invalid ID provided. ID must be a non-empty string.',
      );
    });

    test('It should handle errors when mandatory fields are missing.', async () => {
      const testID = '1';
      (getDoc as jest.Mock).mockResolvedValueOnce({
        id: testID,
        exists: () => true,
        data: () => ({
          id: '1',
          name: '',
          startDate: Timestamp.fromDate(new Date('2021-01-01')),
          endDate: Timestamp.fromDate(new Date('2021-02-01')),
          description: 'Description 1',
          url: 'https://example.com',
          skills: [
            {
              id: '1',
              name: 'Skill 1',
              description: 'Description 1',
              level: 'High',
            },
            {
              id: '2',
              name: 'Skill 2',
              description: 'Description 2',
              level: 'Medium',
            },
          ],
        }),
      });

      await expect(repository.getProjectsByID(testID)).rejects.toThrow(
        'Project with ID 1 is missing mandatory fields.',
      );
    });
  });
});
