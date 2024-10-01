import { ProjectsRepository } from "../repositories/ProjectsRepository";
import Projects from "../entities/Projects";
import SkillsRepository from "../repositories/SkillsRepository";

export class ProjectsService {
  private projectsRepository: ProjectsRepository;
  private skillsRepository: SkillsRepository;

  constructor(
    projecstRepository: ProjectsRepository,
    skillsRepository: SkillsRepository,
  ) {
    this.projectsRepository = projecstRepository;
    this.skillsRepository = skillsRepository;
  }

  async getAllProjects(): Promise<Projects[] | null> {
    const projectsData = await this.projectsRepository.getAllProjects();
    return this.getProjectsWithSkills(projectsData);
  }

  async getProjectsByName(name: string): Promise<Projects | null> {
    const projectData = await this.projectsRepository.getProjectsByName(name);
    return this.getProjectWithSkills(projectData);
  }

  async getProjectsByID(id: string): Promise<Projects | null> {
    const projectData = await this.projectsRepository.getProjectsByID(id);
    return this.getProjectWithSkills(projectData);
  }

  private async getProjectWithSkills(
    projectData: Projects | null,
  ): Promise<Projects | null> {
    if (projectData) {
      const skillIds = projectData.skills;
      const skillsArray = await this.skillsRepository.getSkillsByID(skillIds);

      return new Projects(
        projectData.id,
        projectData.name,
        projectData.startDate,
        projectData.endDate,
        projectData.description,
        projectData.url,
        skillsArray,
      );
    }

    return null;
  }

  private async getProjectsWithSkills(
    projects: Projects[] | null,
  ): Promise<Projects[] | null> {
    if (projects?.length) {
      const projectResult: Projects[] = [];

      for (const project of projects) {
        const skillIds = project.skills;

        const skillsArray = await this.skillsRepository.getSkillsByID(skillIds);

        const result = new Projects(
          project.id,
          project.name,
          project.startDate,
          project.endDate,
          project.description,
          project.url,
          skillsArray,
        );

        projectResult.push(result);
      }

      return projectResult;
    }

    return null;
  }
}
