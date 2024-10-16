import ProjectsRepository from '../repositories/ProjectsRepository';
import Projects from '../entities/Projects';
import SkillsFiller from '../utils/SkillsFiller';

/**
 * Service class for handling operations related to projects.
 */
export class ProjectsService {
  private projectsRepository: ProjectsRepository;
  private skillsFiller: SkillsFiller<Projects>;

  /**
   * Constructs a new instance of the ProjectsService.
   * @param {projectsRepository} - The repository for accessing project data.
   */
  constructor(projecstRepository: ProjectsRepository) {
    this.projectsRepository = projecstRepository;
    this.skillsFiller = new SkillsFiller();
  }

  /**
   * Retrieves all projects from the repository.
   * @returns A promise that resolves to an array of projects without skills or null if no projects are found.
   */
  async getAllProjects(): Promise<Omit<Projects, 'skills'>[] | null> {
    const projectsData = await this.projectsRepository.getAllProjects();
    if (!projectsData || projectsData.length === 0) {
      return null;
    }
    return this.skillsFiller.getObjectsWithSkills(projectsData);
  }

  /**
   * Retrieves a project by its name without its skills.
   * @param name - The name of the project.
   * @returns A promise that resolves to the project without skills or null if the project is not found.
   */
  async getProjectByName(
    name: string,
  ): Promise<Omit<Projects, 'skills'> | null> {
    const projectData = await this.projectsRepository.getProjectByName(name);
    if (!projectData) {
      return null;
    }
    return this.skillsFiller.getObjectWithSkills(projectData);
  }

  /**
   * Retrieves a project by its ID without its skills.
   * @param id - The ID of the project.
   * @returns A promise that resolves to the project without skills or null if the project is not found.
   */
  async getProjectByID(id: string): Promise<Omit<Projects, 'skills'> | null> {
    const projectData = await this.projectsRepository.getProjectByID(id);
    if (!projectData) {
      return null;
    }
    return this.skillsFiller.getObjectWithSkills(projectData);
  }
}
