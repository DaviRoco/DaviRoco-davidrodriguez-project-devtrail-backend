import Skills from '../entities/Skills';
import SkillsRepository from '../repositories/SkillsRepository';

interface HasSkills {
  skills: Skills[];
}

class SkillsFiller<T extends HasSkills> {
  private skillsRepository: SkillsRepository;

  constructor() {
    this.skillsRepository = new SkillsRepository();
  }

  public async getObjectWithSkills(
    objectData: T | null,
  ): Promise<Omit<T, 'skills'> | null> {
    if (objectData) {
      const skillIds = objectData.skills as unknown as Skills[];
      const skillsArray = await this.skillsRepository.getSkillsByID(skillIds);
      const result = {
        ...objectData,
        _skills: skillsArray,
      } as T;
      return result;
    }

    return null;
  }

  public async getObjectsWithSkills(
    objects: T[] | null,
  ): Promise<Omit<T, 'skills'>[] | null> {
    if (objects?.length) {
      const objectResult: Omit<T, 'skills'>[] = await Promise.all(
        objects.map(async (object) => {
          const skillIds = object.skills;
          const skillsArray =
            await this.skillsRepository.getSkillsByID(skillIds);

          const result = {
            ...object,
            _skills: skillsArray,
          };

          return result;
        }),
      );

      return objectResult;
    }

    return null;
  }
}

export default SkillsFiller;
