import axios from 'axios';
import { ExperienceRecords } from '../types/types';

let cachedRecords: ExperienceRecords[] | null = null;

export class AboutService {
    private static apiUrl = '/api/records?type=experience';

    public static async getAllExperienceRecords(): Promise<ExperienceRecords[]> {
      if (cachedRecords) {
        return cachedRecords;
      }
  
      try {
        const response = await axios.get<ExperienceRecords[]>(this.apiUrl);
        cachedRecords = response.data;
        return cachedRecords;
      } catch (error) {
        console.error('Error fetching experience records:', error);
        throw error;
      }
    }
}