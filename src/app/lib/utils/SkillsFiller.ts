import Skills from '../entities/Skills';
import SkillsRepository from '../repositories/SkillsRepository';

interface HasSkills {
  skills: Skills[];
}

class SkillsFiller<T extends HasSkills> {
  private skillsRepository: SkillsRepository;

  /**
   * Constructs an instance of the SkillsFiller class.
   * Initializes the skills repository by creating a new instance of SkillsRepository.
   */
  constructor() {
    this.skillsRepository = new SkillsRepository();
  }

  /**
   * Retrieves an object with its associated skills populated.
   *
   * @template T - The type of the object.
   * @param {T | null} objectData - The object data which contains skill IDs.
   * @returns {Promise<Omit<T, 'skills'> | null>} - A promise that resolves to the object with populated skills or null if the input is null.
   */
  public async getObjectWithSkills(
    objectData: T | null,
  ): Promise<Omit<T, 'skills'> | null> {
    if (objectData) {
      const skillIds = objectData.skills as unknown as Skills[];
      const skillsArray = await this.skillsRepository.getSkillsByIDs(skillIds);
      const result = {
        ...objectData,
        _skills: skillsArray,
      } as T;
      return result;
    }

    return null;
  }

  /**
   * Retrieves objects with their associated skills populated.
   *
   * @template T - The type of the objects being processed.
   * @param {T[] | null} objects - An array of objects or null.
   * @returns {Promise<Omit<T, 'skills'>[] | null>} A promise that resolves to an array of objects with their skills populated, or null if the input is null.
   */
  public async getObjectsWithSkills(
    objects: T[] | null,
  ): Promise<Omit<T, 'skills'>[] | null> {
    if (objects?.length) {
      const objectResult: Omit<T, 'skills'>[] = await Promise.all(
        objects.map(async (object) => {
          const skillIds = object.skills;
          const skillsArray =
            await this.skillsRepository.getSkillsByIDs(skillIds);

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
