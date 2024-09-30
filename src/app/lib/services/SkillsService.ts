import { SkillsRepository } from "../repositories/SkillsRepository";
import Skills from "../entities/Skills";

export class SkillsService {
  private skillsRepository: SkillsRepository;

  constructor(skillsRepository: SkillsRepository) {
    this.skillsRepository = skillsRepository;
  }
  async getAllSkills(): Promise<Skills[]> {
    return await this.skillsRepository.getAllSkills();
  }

  async getSkillsByName(name: string): Promise<Skills | null> {
    return await this.skillsRepository.getSkillsByName(name);
  }

  async getSkillsByID(id: string): Promise<Skills | null> {
    return await this.skillsRepository.getSkillsByID(id);
  }
}

export default SkillsService;
