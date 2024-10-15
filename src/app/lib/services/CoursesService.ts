import Courses from '../entities/Courses';
import CoursesRepository from '../repositories/CoursesRespository';
import SkillsFiller from '../utils/SkillsFiller';

export class CoursesService {
  private coursesRepository: CoursesRepository;
  private skillsFiller: SkillsFiller<Courses>;

  constructor(coursesRepository: CoursesRepository) {
    this.coursesRepository = coursesRepository;
    this.skillsFiller = new SkillsFiller();
  }

  async getAllCourses(): Promise<Omit<Courses, 'skills'>[] | null> {
    const coursesData = await this.coursesRepository.getAllCourses();
    if (!coursesData || coursesData.length === 0) {
      return null;
    }
    return this.skillsFiller.getObjectsWithSkills(coursesData);
  }

  async getCourseByName(name: string): Promise<Omit<Courses, 'skills'> | null> {
    const courseData = await this.coursesRepository.getCoursesByName(name);
    if (!courseData) {
      return null;
    }
    return this.skillsFiller.getObjectWithSkills(courseData);
  }

  async getCourseByID(id: string): Promise<Omit<Courses, 'skills'> | null> {
    const courseData = await this.coursesRepository.getCoursesByID(id);
    if (!courseData) {
      return null;
    }
    return this.skillsFiller.getObjectWithSkills(courseData);
  }
}
