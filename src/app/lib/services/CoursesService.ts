import Courses from "../entities/Courses";
import { CoursesRepository } from "../repositories/CoursesRespository";
import SkillsRepository from "../repositories/SkillsRepository";

export class CoursesService {
  private coursesRepository: CoursesRepository;
  private skillsRepository: SkillsRepository;

  constructor(
    coursesRepository: CoursesRepository,
    skillsRepository: SkillsRepository,
  ) {
    this.coursesRepository = coursesRepository;
    this.skillsRepository = skillsRepository;
  }

  async getAllCourses(): Promise<Courses[] | null> {
    const coursesData = await this.coursesRepository.getAllCourses();
    return this.getCoursesWithSkills(coursesData);
  }

  async getProjectsByName(name: string): Promise<Courses | null> {
    const courseData = await this.coursesRepository.getCoursesByName(name);
    return this.getCourseWithSkills(courseData);
  }

  async getProjectsByID(id: string): Promise<Courses | null> {
    const courseData = await this.coursesRepository.getCoursesByID(id);
    return this.getCourseWithSkills(courseData);
  }

  private async getCourseWithSkills(
    courseData: Courses | null,
  ): Promise<Courses | null> {
    if (courseData) {
      const skillIds = courseData.skills;
      const skillsArray = await this.skillsRepository.getSkillsByID(skillIds);

      return new Courses(
        courseData.id,
        courseData.name,
        courseData.code,
        courseData.description,
        courseData.institution,
        skillsArray,
      );
    }

    return null;
  }

  private async getCoursesWithSkills(
    courses: Courses[] | null,
  ): Promise<Courses[] | null> {
    if (courses?.length) {
      const courseResult: Courses[] = [];

      for (const course of courses) {
        const skillIds = course.skills;

        const skillsArray = await this.skillsRepository.getSkillsByID(skillIds);

        const result = new Courses(
          course.id,
          course.name,
          course.code,
          course.description,
          course.institution,
          skillsArray,
        );

        courseResult.push(result);
      }

      return courseResult;
    }

    return null;
  }
}
