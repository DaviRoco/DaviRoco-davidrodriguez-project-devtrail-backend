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

  async getSkillByName(name: string): Promise<Skills | null> {
    return await this.skillsRepository.getSkillByName(name);
  }

  async getSkillByID(id: string): Promise<Skills | null> {
    return await this.skillsRepository.getSkillByID(id);
  }
}

export default SkillsService;
