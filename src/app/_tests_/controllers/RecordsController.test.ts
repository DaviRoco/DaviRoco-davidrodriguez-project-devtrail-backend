/**
 * @fileoverview Unit tests for the RecordsController.
 * 
 * This file contains unit tests for the RecordsController, which is responsible for handling
 * requests related to experience and educational records. The tests cover the following functionalities:
 * 
 * - getAllExperienceRecords: Retrieves all experience records.
 * - getAllEducationalRecords: Retrieves all educational records.
 * - getExperienceRecordByID: Retrieves a specific experience record by its ID.
 * - getEducationalRecordByID: Retrieves a specific educational record by its ID.
 * 
 * The tests use Jest to mock the RecordsService and verify the behavior of the controller methods,
 * ensuring that appropriate responses are returned under various conditions, including success,
 * no records found, and error scenarios.
 * 
 * @module RecordsControllerTest
*/

import { RecordsService } from '../../lib/services/RecordsService';
import RecordsController from '../../lib/controllers/RecordsController';

jest.mock('../../lib/services/RecordsService');

describe('Records Controller', () => {
  const mockExperienceRecords = [
    {
      id: '1',
      startDate: new Date('2021-01-01'),
      endDate: new Date('2021-01-31'),
      description: 'Software Developer Intern',
      companyName: 'Company A',
      title: 'Software Developer Intern',
      location: 'Remote',
      skills: [
        {
          id: '1',
          name: 'Typescript',
          description: 'Programming Language',
          level: 'High',
        },
        {
          id: '2',
          name: 'C#',
          description: 'Programming Language',
          level: 'Mid',
        },
      ],
    },
    {
      id: '2',
      startDate: new Date('2021-02-01'),
      endDate: new Date('2021-02-28'),
      description: 'Software Developer Intern',
      companyName: 'Company B',
      title: 'Software Developer Intern',
      location: 'Remote',
      skills: [
        {
          id: '1',
          name: 'Typescript',
          description: 'Programming Language',
          level: 'High',
        },
        {
          id: '2',
          name: 'C#',
          description: 'Programming Language',
          level: 'Mid',
        },
      ],
    },
  ];

  const mockEducationRecords = [
    {
      id: '1',
      startDate: new Date('2017-09-01'),
      endDate: new Date('2021-05-31'),
      description: 'Bachelor of Science in Computer Science',
      name: 'University of Example',
      degree: 'Bachelor of Science',
      location: 'Example City',
      skills: [
        {
          id: '1',
          name: 'Typescript',
          description: 'Programming Language',
          level: 'High',
        },
        {
          id: '2',
          name: 'C#',
          description: 'Programming Language',
          level: 'Mid',
        },
      ],
    },
    {
      id: '2',
      startDate: new Date('2021-09-01'),
      endDate: new Date('2023-05-31'),
      description: 'Master of Science in Computer Science',
      name: 'University of Example',
      degree: 'Master of Science',
      location: 'Example City',
      skills: [
        {
          id: '1',
          name: 'Typescript',
          description: 'Programming Language',
          level: 'High',
        },
        {
          id: '2',
          name: 'C#',
          description: 'Programming Language',
          level: 'Mid',
        },
      ],
    },
  ];

  describe('getAllExperienceRecords', () => {
    test('It should return all experience records on success.', async () => {
      (
        RecordsService.prototype.getAllExperienceRecords as jest.Mock
      ).mockResolvedValue(mockExperienceRecords);

      const result = await RecordsController.getAllExperienceRecords();

      expect(result.status).toBe(200);
      expect(result.body).toEqual(mockExperienceRecords);
    });

    test('It should return a message if no experience records are found.', async () => {
      (
        RecordsService.prototype.getAllExperienceRecords as jest.Mock
      ).mockResolvedValue(null);

      const result = await RecordsController.getAllExperienceRecords();

      expect(result.status).toBe(200);
      expect(result.body).toBe('No Experience records fetched');
    });

    test('It should handle errors', async () => {
      (
        RecordsService.prototype.getAllExperienceRecords as jest.Mock
      ).mockRejectedValue(new Error('Test'));

      const result = await RecordsController.getAllExperienceRecords();

      expect(result.status).toBe(500);
      expect(result.body).toBe(
        'Failed to retrieve experience records - Error: Test',
      );
    });
  });

  describe('getAllEducationalRecords', () => {
    test('It should return all educational records on success.', async () => {
      (
        RecordsService.prototype.getAllEducationalRecords as jest.Mock
      ).mockResolvedValue(mockEducationRecords);

      const result = await RecordsController.getAllEducationalRecords();

      expect(result.status).toBe(200);
      expect(result.body).toEqual(mockEducationRecords);
    });

    test('It should return a message if no educational records are found.', async () => {
      (
        RecordsService.prototype.getAllEducationalRecords as jest.Mock
      ).mockResolvedValue(null);

      const result = await RecordsController.getAllEducationalRecords();

      expect(result.status).toBe(200);
      expect(result.body).toBe('No Educational records fetched');
    });

    test('It should handle errors', async () => {
      (
        RecordsService.prototype.getAllEducationalRecords as jest.Mock
      ).mockRejectedValue(new Error('Test'));

      const result = await RecordsController.getAllEducationalRecords();

      expect(result.status).toBe(500);
      expect(result.body).toBe(
        'Failed to retrieve educational records - Error: Test',
      );
    });
  });

  describe('getExperienceRecordByID', () => {
    const mockExperienceRecord = mockExperienceRecords[0];

    test('It should return the specified experience record with given ID on success.', async () => {
      const testID = '1';

      (
        RecordsService.prototype.getExperienceRecordByID as jest.Mock
      ).mockResolvedValue(mockExperienceRecord);

      const result = await RecordsController.getExperienceRecordByID(testID);

      expect(result.status).toBe(200);
      expect(result.body).toEqual(mockExperienceRecord);
    });

    test('It should return a message if no experience record is found with the given ID.', async () => {
      const testID = '3';

      (
        RecordsService.prototype.getExperienceRecordByID as jest.Mock
      ).mockResolvedValue(null);

      const result = await RecordsController.getExperienceRecordByID(testID);

      expect(result.status).toBe(200);
      expect(result.body).toBe(
        `No Experience record fetched with ID: ${testID}`,
      );
    });

    test('It should handle errors when no ID parameter is specified', async () => {
      (
        RecordsService.prototype.getExperienceRecordByID as jest.Mock
      ).mockRejectedValue(
        new Error(`Failed to retrieve experience record with ID: ${null}`),
      );

      const result = await RecordsController.getExperienceRecordByID('');

      expect(result.status).toBe(400);
      expect(result.body).toBe('ID is required and should be a string.');
    });

    test('It should handle errors', async () => {
      const testID = '1';

      (
        RecordsService.prototype.getExperienceRecordByID as jest.Mock
      ).mockRejectedValue(new Error('Test'));

      const result = await RecordsController.getExperienceRecordByID(testID);

      expect(result.status).toBe(500);
      expect(result.body).toBe(
        `Failed to retrieve experience record with ID: ${testID} - Error: Test`,
      );
    });
  });

  describe('getEducationalRecordByID', () => {
    const mockEducationalRecord = mockEducationRecords[0];

    test('It should return the specified educational record with given ID on success.', async () => {
      const testID = '1';

      (
        RecordsService.prototype.getEducationalRecordByID as jest.Mock
      ).mockResolvedValue(mockEducationalRecord);

      const result = await RecordsController.getEducationalRecordByID(testID);

      expect(result.status).toBe(200);
      expect(result.body).toEqual(mockEducationalRecord);
    });

    test('It should return a message if no educational record is found with the given ID.', async () => {
      const testID = '3';

      (
        RecordsService.prototype.getEducationalRecordByID as jest.Mock
      ).mockResolvedValue(null);

      const result = await RecordsController.getEducationalRecordByID(testID);

      expect(result.status).toBe(200);
      expect(result.body).toBe(
        'No Educational record fetched with ID: ' + testID,
      );
    });

    test('It should handle errors when no ID parameter is specified', async () => {
      (
        RecordsService.prototype.getEducationalRecordByID as jest.Mock
      ).mockRejectedValue(
        new Error('Failed to retrieve educational record with ID: ' + null),
      );

      const result = await RecordsController.getEducationalRecordByID('');

      expect(result.status).toBe(400);
      expect(result.body).toBe('ID is required and should be a string.');
    });

    test('It should handle errors', async () => {
      const testID = '1';

      (
        RecordsService.prototype.getEducationalRecordByID as jest.Mock
      ).mockRejectedValue(new Error('Test'));

      const result = await RecordsController.getEducationalRecordByID(testID);

      expect(result.status).toBe(500);
      expect(result.body).toBe(
        `Failed to retrieve educational record with ID: ${testID} - Error: Test`,
      );
    });
  });
});
