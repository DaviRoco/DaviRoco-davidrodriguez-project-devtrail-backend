import ProjectsRepository from '../repositories/ProjectsRepository';
import Projects from '../entities/Projects';
import SkillsFiller from '../utils/SkillsFiller';

export class ProjectsService {
  private projectsRepository: ProjectsRepository;
  private skillsFiller: SkillsFiller<Projects>;

  constructor(projecstRepository: ProjectsRepository) {
    this.projectsRepository = projecstRepository;
    this.skillsFiller = new SkillsFiller();
  }

  async getAllProjects(): Promise<Omit<Projects, 'skills'>[] | null> {
    const projectsData = await this.projectsRepository.getAllProjects();
    if (!projectsData || projectsData.length === 0) {
      return null;
    }
    return this.skillsFiller.getObjectsWithSkills(projectsData);
  }

  async getProjectByName(
    name: string,
  ): Promise<Omit<Projects, 'skills'> | null> {
    const projectData = await this.projectsRepository.getProjectsByName(name);
    if (!projectData) {
      return null;
    }
    return this.skillsFiller.getObjectWithSkills(projectData);
  }

  async getProjectByID(id: string): Promise<Omit<Projects, 'skills'> | null> {
    const projectData = await this.projectsRepository.getProjectsByID(id);
    if (!projectData) {
      return null;
    }
    return this.skillsFiller.getObjectWithSkills(projectData);
  }
}
