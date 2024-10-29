import axios from "axios";
import { Projects } from "../types/types";

let cachedProjects: Projects[] | null = null;

export class PortfolioService {
    private static projectsApiUrl = '/api/projects';

    public static async getAllProjects(): Promise<Projects[]> {
        if(cachedProjects) {
            return cachedProjects;
        }

        try {
            const response = await axios.get<Projects[]>(this.projectsApiUrl);
            cachedProjects = response.data;
            return cachedProjects;
        } catch (error) {
            throw error;
        }
    }
}