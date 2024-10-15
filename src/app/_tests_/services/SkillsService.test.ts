/**
 * @fileoverview Unit tests for the SkillsService class.
 *
 * This file contains unit tests for the SkillsService, responsible for
 * managing skill-related data and interacting with the SkillsRepository
 * to retrieve and process skills.
 *
 * The tests validate the functionality of the service methods, ensuring they
 * handle the data correctly, interact with the repository as expected, and
 * return the appropriate results based on various scenarios.
 *
 * The tests cover the following methods:
 *
 * - **getAllSkills**: Retrieves all skills from the repository.
 * - **getSkillByName**: Retrieves a skill by its name.
 * - **getSkillByID**: Retrieves a skill by its ID.
 *
 * Each test verifies the following aspects:
 * - Successful retrieval of skills.
 * - Proper handling of scenarios where skills are missing or invalid.
 * - Accurate return values based on the provided inputs, including cases where no data is found.
 *
 * The tests utilize Jest to mock repository dependencies, ensuring isolated and
 * focused unit testing without needing to interact with the actual database.
 *
 * @module SkillsServiceTest
 */

import { SkillsService } from '../../lib/services/SkillsService';
import SkillsRepository from '../../lib/repositories/SkillsRepository';
import Skills from '../../lib/entities/Skills';
import { KnowledgeLevelEnumerations } from '../../lib/constants/enumerations/KnowledgeLevelsEnumerations';

jest.mock('../../lib/repositories/SkillsRepository');

describe('Skills Service', () => {
  let skillsService: SkillsService;
  let skillsRepository: jest.Mocked<SkillsRepository>;

  beforeEach(() => {
    skillsRepository = new SkillsRepository() as jest.Mocked<SkillsRepository>;
    skillsService = new SkillsService(skillsRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

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

  describe('getAllSkills', () => {
    test('It should return all skills when repository returns skills', async () => {
      skillsRepository.getAllSkills.mockResolvedValue(mockSkills);

      const result = await skillsService.getAllSkills();

      expect(result).toEqual(mockSkills);
      expect(skillsRepository.getAllSkills).toHaveBeenCalledTimes(1);
    });

    test('It should return an empty array when repository returns an empty array', async () => {
      skillsRepository.getAllSkills.mockResolvedValue(null);

      const result = await skillsService.getAllSkills();

      expect(result).toBeNull();
      expect(skillsRepository.getAllSkills).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSkillByName', () => {
    test('It should return the skills when the repository returns it by name', async () => {
      const testName = 'TypeScript';
      skillsRepository.getSkillByName.mockResolvedValue(mockSkills[0]);

      const result = await skillsService.getSkillByName(testName);

      expect(result).toEqual(mockSkills[0]);
      expect(skillsRepository.getSkillByName).toHaveBeenCalledTimes(1);
    });

    test('It should return undefined when the repository does not return a skill', async () => {
      const testName = 'Java';
      skillsRepository.getSkillByName.mockResolvedValue(null);

      const result = await skillsService.getSkillByName(testName);

      expect(result).toBeNull();
      expect(skillsRepository.getSkillByName).toHaveBeenCalledTimes(1);
    });
  });
  describe('getSkillByName', () => {
    test('It should return the skills when the repository returns it by ID', async () => {
      const testID = '2';
      skillsRepository.getSkillByID.mockResolvedValue(mockSkills[1]);

      const result = await skillsService.getSkillByID(testID);

      expect(result).toEqual(mockSkills[1]);
      expect(skillsRepository.getSkillByID).toHaveBeenCalledTimes(1);
    });

    test('It should return undefined when the repository does not return a skill', async () => {
      const testID = '3';
      skillsRepository.getSkillByID.mockResolvedValue(null);

      const result = await skillsService.getSkillByID(testID);

      expect(result).toBeNull();
      expect(skillsRepository.getSkillByID).toHaveBeenCalledTimes(1);
    });
  });
});
