import { RecordsRepository } from "../repositories/RecordsRepository";
import ExperienceRecords from "../entities/ExperienceRecords";
import EducationalRecords from "../entities/EducationalRecords";
import SkillsFiller from "./utils/SkillsFiller";

export class RecordsService {
  private recordsRepository: RecordsRepository;
  private type: string;

  constructor(recordsRepository: RecordsRepository, type: string) {
    this.recordsRepository = recordsRepository;
    this.type = type;
  }

  private getSkillsFillerForExperience(): SkillsFiller<ExperienceRecords> {
    if (this.type !== "experience") {
      throw new Error("Invalid method for experience record type.");
    }
    return new SkillsFiller<ExperienceRecords>();
  }

  private getSkillsFillerForEducation(): SkillsFiller<EducationalRecords> {
    if (this.type !== "education") {
      throw new Error("Invalid method for education record type.");
    }
    return new SkillsFiller<EducationalRecords>();
  }

  async getAllExperienceRecords(): Promise<
    Omit<ExperienceRecords, "skills">[] | null
  > {
    const skillsFiller = this.getSkillsFillerForExperience();
    const recordsData = await this.recordsRepository.getAllExperienceRecords();
    return skillsFiller.getObjectsWithSkills(recordsData);
  }

  async getAllEducationalRecords(): Promise<
    Omit<EducationalRecords, "skills">[] | null
  > {
    const skillsFiller = this.getSkillsFillerForEducation();
    const recordsData = await this.recordsRepository.getAllEducationalRecords();
    return skillsFiller.getObjectsWithSkills(recordsData);
  }

  async getExperienceRecordByID(
    id: string,
  ): Promise<Omit<ExperienceRecords, "skills"> | null> {
    const skillsFiller = this.getSkillsFillerForExperience();
    const recordData = await this.recordsRepository.getExperienceRecordByID(id);
    return skillsFiller.getObjectWithSkills(recordData);
  }

  async getEducationalRecordByID(
    id: string,
  ): Promise<Omit<EducationalRecords, "skills"> | null> {
    const skillsFiller = this.getSkillsFillerForEducation();
    const recordData =
      await this.recordsRepository.getEducationalRecordByID(id);
    return skillsFiller.getObjectWithSkills(recordData);
  }
}
