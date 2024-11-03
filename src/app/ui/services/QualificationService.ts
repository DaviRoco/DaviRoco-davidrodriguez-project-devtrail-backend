import axios from "axios";
import { Certifications, ExperienceRecords } from "../types/types";
import { EducationalRecords } from "../types/types";

let cachedExperienceRecords: ExperienceRecords[] | null = null;
let cachedEducationalRecords: EducationalRecords[] | null = null;
let cachedCertifications: Certifications[] | null = null;

export class QualificationService {
    private static experienceRecordsApiUrl = '/api/records?type=experience';
    private static educationalRecordsApiUrl = '/api/records?type=education';

    public static async getAllExperienceRecords(): Promise<ExperienceRecords[]> {
        if(cachedExperienceRecords) {
            return cachedExperienceRecords;
        }

        try {
            const response = await axios.get<ExperienceRecords[]>(this.experienceRecordsApiUrl);
            cachedExperienceRecords = response.data;
            return cachedExperienceRecords;
        } catch (error) {
            throw error;
        }
    }

    public static async getAllEducationalRecords(): Promise<EducationalRecords[]> {
        if(cachedEducationalRecords) {
            return cachedEducationalRecords;
        }

        try {
            const response = await axios.get<EducationalRecords[]>(this.educationalRecordsApiUrl);
            cachedEducationalRecords = response.data;
            return cachedEducationalRecords;
        } catch (error) {
            throw error;
        }
    }

    public static async getAllCertifications(): Promise<Certifications[]> {
        if(cachedCertifications) {
            return cachedCertifications;
        }
        
        try {
            const response = await axios.get<Certifications[]>('/api/certifications');
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}