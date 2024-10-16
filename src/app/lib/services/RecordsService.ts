import RecordsRepository from '../repositories/RecordsRepository';
import ExperienceRecords from '../entities/ExperienceRecords';
import EducationalRecords from '../entities/EducationalRecords';
import SkillsFiller from '../utils/SkillsFiller';

export class RecordsService {
  private recordsRepository: RecordsRepository;
  private type: string;

  /**
   * Creates a new instance of the RecordsService.
   *
   * @param {RecordsRepository} recordsRepository - The repository used for accessing records.
   * @param {string} type - The type of records being managed.
   */
  constructor(recordsRepository: RecordsRepository, type: string) {
    this.recordsRepository = recordsRepository;
    this.type = type;
  }

  /**
   * Retrieves a `SkillsFiller` instance specifically for `ExperienceRecords`.
   *
   * @returns {SkillsFiller<ExperienceRecords>} An instance of `SkillsFiller` for `ExperienceRecords`.
   * @throws {Error} If the `type` is not 'experience'.
   */
  private getSkillsFillerForExperience(): SkillsFiller<ExperienceRecords> {
    if (this.type !== 'experience') {
      throw new Error('Invalid method for experience record type.');
    }
    return new SkillsFiller<ExperienceRecords>();
  }

  /**
   * Retrieves a `SkillsFiller` instance specifically for `EducationalRecords`.
   * This method should only be called when the record type is 'education'.
   *
   * @returns {SkillsFiller<EducationalRecords>} A `SkillsFiller` instance for `EducationalRecords`.
   * @throws {Error} If the `type` is not 'education'.
   */
  private getSkillsFillerForEducation(): SkillsFiller<EducationalRecords> {
    if (this.type !== 'education') {
      throw new Error('Invalid method for education record type.');
    }
    return new SkillsFiller<EducationalRecords>();
  }

  /**
   * Retrieves all experience records from the repository, omitting the 'skills' field.
   *
   * @returns {Promise<Omit<ExperienceRecords, 'skills'>[] | null>} A promise that resolves to an array of experience records without the 'skills' field, or null if no records are found.
   */
  async getAllExperienceRecords(): Promise<
    Omit<ExperienceRecords, 'skills'>[] | null
  > {
    const skillsFiller = this.getSkillsFillerForExperience();
    const recordsData = await this.recordsRepository.getAllExperienceRecords();
    if (!recordsData || recordsData.length === 0) {
      return null;
    }
    return skillsFiller.getObjectsWithSkills(recordsData);
  }

  /**
   * Retrieves all educational records from the repository, omitting the 'skills' field.
   *
   * @returns {Promise<Omit<EducationalRecords, 'skills'>[] | null>} A promise that resolves to an array of educational records without the 'skills' field, or null if no records are found.
   */
  async getAllEducationalRecords(): Promise<
    Omit<EducationalRecords, 'skills'>[] | null
  > {
    const skillsFiller = this.getSkillsFillerForEducation();
    const recordsData = await this.recordsRepository.getAllEducationalRecords();
    if (!recordsData || recordsData.length === 0) {
      return null;
    }
    return skillsFiller.getObjectsWithSkills(recordsData);
  }

  /**
   * Retrieves an experience record by its ID.
   *
   * @param id - The unique identifier of the experience record.
   * @returns A promise that resolves to the experience record without the 'skills' field, or null if no record is found.
   */
  async getExperienceRecordByID(
    id: string,
  ): Promise<Omit<ExperienceRecords, 'skills'> | null> {
    const skillsFiller = this.getSkillsFillerForExperience();
    const recordData = await this.recordsRepository.getExperienceRecordByID(id);
    if (!recordData) {
      return null;
    }
    return skillsFiller.getObjectWithSkills(recordData);
  }

  /**
   * Retrieves an educational record by its ID.
   *
   * @param id - The unique identifier of the educational record.
   * @returns A promise that resolves to the educational record without the 'skills' field,
   *          or null if no record is found.
   */
  async getEducationalRecordByID(
    id: string,
  ): Promise<Omit<EducationalRecords, 'skills'> | null> {
    const skillsFiller = this.getSkillsFillerForEducation();
    const recordData =
      await this.recordsRepository.getEducationalRecordByID(id);
    if (!recordData) {
      return null;
    }
    return skillsFiller.getObjectWithSkills(recordData);
  }
}
