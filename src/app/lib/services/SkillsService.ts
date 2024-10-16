import SkillsRepository from '../repositories/SkillsRepository';
import Skills from '../entities/Skills';

export class SkillsService {
  private skillsRepository: SkillsRepository;

  /**
   * Constructs an instance of the SkillsService.
   *
   * @param {SkillsRepository} skillsRepository - The repository instance used for managing skills data.
   */
  constructor(skillsRepository: SkillsRepository) {
    this.skillsRepository = skillsRepository;
  }

  /**
   * Retrieves all skills from the repository.
   *
   * @returns {Promise<Skills[] | null>} A promise that resolves to an array of skills if available, or null if no skills are found.
   */
  async getAllSkills(): Promise<Skills[] | null> {
    const skillsData = await this.skillsRepository.getAllSkills();
    if (!skillsData || skillsData.length === 0) {
      return null;
    }
    return skillsData;
  }

  /**
   * Retrieves a skill by its name.
   *
   * @param name - The name of the skill to retrieve.
   * @returns A promise that resolves to the skill data if found, or null if not found.
   */
  async getSkillByName(name: string): Promise<Skills | null> {
    const skillData = await this.skillsRepository.getSkillByName(name);
    if (!skillData) {
      return null;
    }
    return skillData;
  }

  /**
   * Retrieves a skill by its ID.
   *
   * @param id - The unique identifier of the skill.
   * @returns A promise that resolves to the skill data if found, otherwise null.
   */
  async getSkillByID(id: string): Promise<Skills | null> {
    const skillData = await this.skillsRepository.getSkillByID(id);
    if (!skillData) {
      return null;
    }
    return skillData;
  }
}

export default SkillsService;
