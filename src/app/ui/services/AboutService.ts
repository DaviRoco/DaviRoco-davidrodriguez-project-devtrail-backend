import axios from 'axios';
import { ExperienceRecords, Projects } from '../types/types';

let cachedRecords: ExperienceRecords[] | null = null;
let cachedProjectCount: number | null = null;

export class AboutService {
  private static experienceRecordsapiUrl = '/api/records?type=experience';
  private static ProjectsapiUrl = '/api/projects';

  public static async getAllExperienceRecords(): Promise<ExperienceRecords[]> {
    if (cachedRecords) {
      return cachedRecords;
    }

    try {
      const response = await axios.get<ExperienceRecords[]>(
        this.experienceRecordsapiUrl,
      );
      cachedRecords = response.data;
      return cachedRecords;
    } catch (error) {
      throw error;
    }
  }

  public static async getAllProjectsCount(): Promise<number> {
    if (cachedProjectCount) {
      return cachedProjectCount;
    }

    try {
      const response = await axios.get<Projects[]>(this.ProjectsapiUrl);
      cachedProjectCount = response.data.length;
      return cachedProjectCount;
    } catch (error) {
      throw error;
    }
  }
}
