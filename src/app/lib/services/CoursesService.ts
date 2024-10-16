import Courses from '../entities/Courses';
import CoursesRepository from '../repositories/CoursesRespository';
import SkillsFiller from '../utils/SkillsFiller';

/**
 * Service class for handling operations related to courses.
 */
export class CoursesService {
  private coursesRepository: CoursesRepository;
  private skillsFiller: SkillsFiller<Courses>;

  /**
   * Constructs a new instance of the CoursesService.
   *
   * @param {coursesRepository} - The repository used to manage courses data.
   */
  constructor(coursesRepository: CoursesRepository) {
    this.coursesRepository = coursesRepository;
    this.skillsFiller = new SkillsFiller();
  }

  /**
   * Retrieves all courses from the repository.
   *
   * @returns {Promise<Omit<Courses, 'skills'>[] | null>}  A promise that resolves to an array of courses without skills or null if no courses are found.
   */
  async getAllCourses(): Promise<Omit<Courses, 'skills'>[] | null> {
    const coursesData = await this.coursesRepository.getAllCourses();
    if (!coursesData || coursesData.length === 0) {
      return null;
    }
    return this.skillsFiller.getObjectsWithSkills(coursesData);
  }

  /**
   * Retrieves a course by its name with its skills omitted.
   *
   * @param name - The name of the course to retrieve.
   * @returns A promise that resolves to the course without skills or null if the course is not found.
   */
  async getCourseByName(name: string): Promise<Omit<Courses, 'skills'> | null> {
    const courseData = await this.coursesRepository.getCourseByName(name);
    if (!courseData) {
      return null;
    }
    return this.skillsFiller.getObjectWithSkills(courseData);
  }

  /**
   * Retrieves a course by its ID with its skills omitted.
   *
   * @param id - The ID of the course to retrieve.
   * @returns A promise that resolves to the course without skills or null if the course is not found.
   */
  async getCourseByID(id: string): Promise<Omit<Courses, 'skills'> | null> {
    const courseData = await this.coursesRepository.getCourseByID(id);
    if (!courseData) {
      return null;
    }
    return this.skillsFiller.getObjectWithSkills(courseData);
  }
}
