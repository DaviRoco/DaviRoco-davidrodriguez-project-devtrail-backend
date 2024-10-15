import SkillsRepository from '../repositories/SkillsRepository';
import Skills from '../entities/Skills';

export class SkillsService {
  private skillsRepository: SkillsRepository;

  constructor(skillsRepository: SkillsRepository) {
    this.skillsRepository = skillsRepository;
  }
  async getAllSkills(): Promise<Skills[] | null> {
    const skillsData = await this.skillsRepository.getAllSkills();
    if (!skillsData || skillsData.length === 0) {
      return null;
    }
    return skillsData;
  }

  async getSkillByName(name: string): Promise<Skills | null> {
    const skillData = await this.skillsRepository.getSkillByName(name);
    if (!skillData) {
      return null;
    }
    return skillData;
  }

  async getSkillByID(id: string): Promise<Skills | null> {
    const skillData = await this.skillsRepository.getSkillByID(id);
    if (!skillData) {
      return null;
    }
    return skillData;
  }
}

export default SkillsService;
