import axios from 'axios';
import { Skills } from '../types/types';

let cachedSkills: Skills[] | null = null;

export class SkillsService {
  private static skillsApiUrl = '/api/skills';

  public static async getAllSkills(): Promise<Skills[]> {
    if (cachedSkills) {
      return cachedSkills;
    }

    try {
      const response = await axios.get<Skills[]>(this.skillsApiUrl);
      cachedSkills = response.data;
      return cachedSkills;
    } catch (error) {
      throw error;
    }
  }
}
