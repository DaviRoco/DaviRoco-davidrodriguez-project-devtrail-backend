/**
 * @fileoverview Unit tests for the SkillsRepository class.
 *
 * This file contains unit tests for the SkillsRepository, which is responsible
 * for interacting with the Firebase Firestore to manage skill records.
 * The tests validate the functionality of the repository methods, ensuring they
 * correctly retrieve, handle errors, and validate the data related to skills.
 *
 * The tests cover the following methods:
 *
 * - **getAllSkills**: Retrieves all skills from Firestore.
 * - **getSkillByName**: Retrieves a skill by its name.
 * - **getSkillByID**: Retrieves a skill by its ID.
 * - **getSkillsByIDs**: Retrieves multiple skills by their IDs.
 * - **getAllFrontEndSkills**: Retrieves all front-end skills.
 * - **getAllBackEndSkills**: Retrieves all back-end skills.
 *
 * Each test verifies the following aspects:
 * - Successful retrieval of skills.
 * - Proper handling of scenarios when mandatory fields are missing or invalid.
 * - Accurate return values based on the provided inputs.
 *
 * The tests utilize mocking to isolate the repository's functionality from the
 * Firestore implementation, allowing for focused unit testing.
 *
 * @module SkillsRepositoryTest
 */

import SkillsRepository from '../../lib/repositories/SkillsRepository';
import { KnowledgeLevelEnumerations } from '../../lib/constants/enumerations/KnowledgeLevelsEnumerations';
import { getDocs, getDoc } from 'firebase/firestore';
import Skills from '../../lib/entities/Skills';

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

describe('Skills Repository', () => {
  let repository: SkillsRepository;

  const mockSkills = [
    {
      id: '1',
      name: 'JavaScript',
      description:
        'A programming language that conforms to the ECMAScript specification.',
      level: KnowledgeLevelEnumerations.High,
    },
    {
      id: '2',
      name: 'TypeScript',
      description: 'A strict syntactical superset of JavaScript.',
      level: KnowledgeLevelEnumerations.High,
    },
  ];

  beforeEach(() => {
    repository = new SkillsRepository();
    jest.resetAllMocks();
  });

  describe('getSkills', () => {
    test('It should retrieve all skills.', async () => {
      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: mockSkills.map((skill) => ({
          id: skill.id,
          data: () => skill,
        })),
      });

      const skills = await repository.getAllSkills();
      expect(skills?.length).toBe(2);

      if (skills) {
        expect(skills[0].name).toBe('JavaScript');
        expect(skills[1].name).toBe('TypeScript');
      }
    });

    test('It should handle errors when mandatory fields are missing.', async () => {
      const incompleteSkills = [
        {
          id: '1',
          name: '',
          description: 'Programming Language',
          level: KnowledgeLevelEnumerations.High,
        },
        {
          id: '',
          name: 'C#',
          description: 'Programming Language',
          level: KnowledgeLevelEnumerations.High,
        },
      ];

      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: incompleteSkills.map((skill) => ({
          id: skill.id,
          data: () => skill,
        })),
      });

      await expect(repository.getAllSkills()).rejects.toThrow(
        new Error('Skill with ID 1 is missing mandatory fields.'),
      );
    });

    test('It should handle errors when no skills are available.', async () => {
      (getDocs as jest.Mock).mockResolvedValueOnce({
        empty: true,
        docs: [],
      });

      const skills = await repository.getAllSkills();
      expect(skills).toBeNull();
    });
  });

  describe('getSkillByName', () => {
    test('It should retrieve the skill with the specified name.', async () => {
      const testName = 'C#';
      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: [
          {
            id: '2',
            data: () => ({
              id: '2',
              name: 'C#',
              description: 'Programming Language',
              level: KnowledgeLevelEnumerations.Mid,
            }),
          },
        ],
      });

      const skill = await repository.getSkillByName(testName);
      expect(skill).toBeDefined();
      expect(skill?.name).toBe('C#');
    });

    test('It should handle errors when name is a non-empty string', async () => {
      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: [
          {
            id: '2',
            data: () => ({
              id: '2',
              name: 'C#',
              description: 'Programming Language',
              level: KnowledgeLevelEnumerations.Mid,
            }),
          },
        ],
      });

      await expect(repository.getSkillByName('')).rejects.toThrow(
        new Error('Invalid name provided. Name must be a non-empty string.'),
      );
    });

    test('It should retrieve no skills when the name does not match any available skills', async () => {
      const testName = 'Java';
      (getDocs as jest.Mock).mockResolvedValueOnce({
        empty: true,
        docs: [],
      });

      const skill = await repository.getSkillByName(testName);
      expect(skill).toBeNull();
    });

    test('It should handle errors when mandatory fields are missing.', async () => {
      const testName = 'C#';
      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: [
          {
            id: '2',
            data: () => ({
              id: '2',
              name: 'C#',
              description: 'Programming Language',
              level: '',
            }),
          },
        ],
      });

      await expect(repository.getSkillByName(testName)).rejects.toThrow(
        new Error(`Skill with ID 2 is missing mandatory fields.`),
      );
    });
  });

  describe('getSkillByID', () => {
    test('It should retrieve the skill with the specified ID.', async () => {
      const testID = '2';
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => true,
        id: '2',
        data: () => ({
          id: '2',
          name: 'C#',
          description: 'Programming Language',
          level: KnowledgeLevelEnumerations.Mid,
        }),
      });

      const skill = await repository.getSkillByID(testID);

      expect(skill).toBeDefined();
      expect(skill?.name).toBe('C#');
      expect(skill?.description).toBe('Programming Language');
      expect(skill?.level).toBe(KnowledgeLevelEnumerations.Mid);
    });

    test('It should handle errors when ID is a non-empty string', async () => {
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => true,
        id: '2',
        data: () => ({
          id: '2',
          name: 'C#',
          description: 'Programming Language',
          level: KnowledgeLevelEnumerations.Mid,
        }),
      });

      await expect(repository.getSkillByID('')).rejects.toThrow(
        new Error('Invalid ID provided. ID must be a non-empty string.'),
      );
    });

    test('It should retrieve no skills when the name does not match any available skills', async () => {
      const testID = '3';
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => false,
        id: '',
        data: () => ({}),
      });

      const skill = await repository.getSkillByID(testID);
      expect(skill).toBeNull();
    });

    test('It should handle errors when mandatory fields are missing.', async () => {
      const testID = '2';
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => true,
        id: '2',
        data: () => ({
          id: '2',
          name: '',
          description: 'Programming Language',
          level: '',
        }),
      });

      await expect(repository.getSkillByID(testID)).rejects.toThrow(
        new Error(`Skill with ID ${testID} is missing mandatory fields.`),
      );
    });
  });

  describe('getSkillByID', () => {
    const testSkillIDs = [
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
    ];
    test('It should retrieve the skills with the specified IDs.', async () => {
      (getDocs as jest.Mock).mockResolvedValueOnce(
        testSkillIDs.map((skill) => ({
          id: skill.id,
          data: () => skill,
        })),
      );
      const skills = await repository.getSkillsByIDs(testSkillIDs);

      expect(skills.length).toBe(2);
      expect(skills[0].name).toBe('JavaScript');
      expect(skills[1].name).toBe('TypeScript');
    });

    test('It should handle errors when IDs are non-empty strings.', async () => {
      const invalidTestIDs = [
        new Skills(
          '',
          'JavaScript',
          'A programming language that conforms to the ECMAScript specification.',
          KnowledgeLevelEnumerations.High,
        ),
        new Skills(
          '',
          'TypeScript',
          'A strict syntactical superset of JavaScript.',
          KnowledgeLevelEnumerations.High,
        ),
      ];
      (getDocs as jest.Mock).mockResolvedValueOnce(null);

      await expect(repository.getSkillsByIDs(invalidTestIDs)).rejects.toThrow(
        new Error('Skills are non-existent.'),
      );
    });
  });
});
