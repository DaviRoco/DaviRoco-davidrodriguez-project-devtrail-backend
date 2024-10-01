import { ProjectsRepository } from "../repositories/ProjectsRepository";
import Projects from "../entities/Projects";

export class ProjectsService {
  private projectsRepository: ProjectsRepository;

  constructor(projecstRepository: ProjectsRepository) {
    this.projectsRepository = projecstRepository;
  }

  async getAllProjects(): Promise<Projects[]> {
    return await this.projectsRepository.getAllProjects();
  }

  async getProjectsByName(name: string): Promise<Projects | null> {
    return await this.projectsRepository.getProjectsByName(name);
  }

  async getProjectsByID(id: string): Promise<Projects | null> {
    return await this.projectsRepository.getProjectsByID(id);
  }
}
