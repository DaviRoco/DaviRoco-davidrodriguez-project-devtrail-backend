import { CoursesService } from '../../lib/services/CoursesService';
import CoursesController from '../../lib/controllers/CoursesController';

jest.mock('../../lib/services/CoursesService');

describe('Courses Controller', () => {
  const mockCourses = [
    {
      id: '1',
      name: 'Course 1',
      code: 'C1',
      description: 'Course 1 Description',
      institution: 'Institution 1',
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

  describe('getAllCourses', () => {
    test('It should return all courses on success.', async () => {
      (CoursesService.prototype.getAllCourses as jest.Mock).mockResolvedValue(
        mockCourses,
      );

      const result = await CoursesController.getAllCourses();

      expect(result.status).toBe(200);
      expect(result.body).toEqual(mockCourses);
    });

    test('It should return a message if no courses are found.', async () => {
      (CoursesService.prototype.getAllCourses as jest.Mock).mockResolvedValue(
        null,
      );

      const result = await CoursesController.getAllCourses();

      expect(result.status).toBe(200);
      expect(result.body).toBe('No Courses fetched');
    });

    test('It should handle errors', async () => {
      (CoursesService.prototype.getAllCourses as jest.Mock).mockRejectedValue(
        new Error('Test'),
      );

      const result = await CoursesController.getAllCourses();

      expect(result.status).toBe(500);
      expect(result.body).toBe('Failed to retrieve courses - Error: Test');
    });
  });

  describe('getCourseByName', () => {
    const mockCourse = mockCourses[0];
    test('It should return the specified course with given name on success.', async () => {
      const testName = 'Course 1';

      (CoursesService.prototype.getCourseByName as jest.Mock).mockResolvedValue(
        mockCourse,
      );

      const result = await CoursesController.getCourseByName(testName);

      expect(result.status).toBe(200);
      expect(result.body).toEqual(mockCourse);
    });

    test('It should return a message if no course is found with given name.', async () => {
      const testName = 'Course 2';

      (CoursesService.prototype.getCourseByName as jest.Mock).mockResolvedValue(
        null,
      );

      const result = await CoursesController.getCourseByName(testName);

      expect(result.status).toBe(200);
      expect(result.body).toBe('No Course fetched with name: ' + testName);
    });

    test('It should handle errors when no name parameter is specified', async () => {
      (CoursesService.prototype.getCourseByName as jest.Mock).mockRejectedValue(
        new Error('Failed to retrieve course with name: ' + null),
      );

      const result = await CoursesController.getCourseByName(null);

      expect(result.status).toBe(400);
      expect(result.body).toBe('Name is required and should be a string.');
    });

    test('It should handle errors', async () => {
      const testName = 'Course 1';
      (CoursesService.prototype.getCourseByName as jest.Mock).mockRejectedValue(
        new Error('Test'),
      );

      const result = await CoursesController.getCourseByName(testName);

      expect(result.status).toBe(500);
      expect(result.body).toBe(
        'Failed to retrieve course with name. Name: ' +
          testName +
          ' - Error: Test',
      );
    });
  });

  describe('getCourseByID', () => {
    const mockCourse = mockCourses[0];
    test('It should return the specified course with given ID on success.', async () => {
      const testID = '1';

      (CoursesService.prototype.getCourseByID as jest.Mock).mockResolvedValue(
        mockCourse,
      );

      const result = await CoursesController.getCourseByID(testID);

      expect(result.status).toBe(200);
      expect(result.body).toEqual(mockCourse);
    });

    test('It should return a message if no course is found with given ID.', async () => {
      const testID = '2';

      (CoursesService.prototype.getCourseByID as jest.Mock).mockResolvedValue(
        null,
      );

      const result = await CoursesController.getCourseByID(testID);

      expect(result.status).toBe(200);
      expect(result.body).toBe('No Course fetched with ID: ' + testID);
    });

    test('It should handle errors when no id parameter is specified', async () => {
      (CoursesService.prototype.getCourseByID as jest.Mock).mockRejectedValue(
        new Error('Failed to retrieve course with id: ' + null),
      );

      const result = await CoursesController.getCourseByID(null);

      expect(result.status).toBe(400);
      expect(result.body).toBe('ID is required and should be a string.');
    });

    test('It should handle errors', async () => {
      const testID = '1';
      (CoursesService.prototype.getCourseByID as jest.Mock).mockRejectedValue(
        new Error('Test'),
      );

      const result = await CoursesController.getCourseByID(testID);

      expect(result.status).toBe(500);
      expect(result.body).toBe(
        'Failed to retrieve course with ID. ID: ' + testID + ' - Error: Test',
      );
    });
  });
});
