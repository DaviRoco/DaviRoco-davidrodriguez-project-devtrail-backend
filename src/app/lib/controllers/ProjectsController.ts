import { ProjectsService } from '../services/ProjectsService';
import ProjectsRepository from '../repositories/ProjectsRepository';
import ResponseData from '../constants/api/ResponseData';
import Projects from '../entities/Projects';

const projectsRepository = new ProjectsRepository();
const projectsService = new ProjectsService(projectsRepository);

export const getAllProjects = async (): Promise<
  ResponseData<Projects[]> | ResponseData<string>
> => {
  try {
    const projects = (await projectsService.getAllProjects()) as Projects[];
    if (!projects) {
      return new ResponseData(200, 'No Projects fetched');
    }
    return new ResponseData(200, projects);
  } catch (error) {
    return new ResponseData(500, 'Failed to retrieve projects - ' + error);
  }
};

export const getProjectsByName = async (
  name: string | null,
): Promise<ResponseData<Projects | null> | ResponseData<string>> => {
  if (!name || typeof name !== 'string') {
    return new ResponseData(400, 'Name is required and should be a string.');
  }

  try {
    const project = (await projectsService.getProjectsByName(name)) as Projects;
    if (project) {
      return new ResponseData(200, project);
    } else {
      return new ResponseData(200, 'No Project fetched with name: ' + name);
    }
  } catch (error) {
    return new ResponseData(
      500,
      'Failed to retrieve project with name. Name: ' + name + ' - ' + error,
    );
  }
};

export const getProjectsByID = async (
  id: string | null,
): Promise<ResponseData<Projects | null> | ResponseData<string>> => {
  if (!id || typeof id !== 'string') {
    return new ResponseData(400, 'ID is required and should be a string.');
  }

  try {
    const project = (await projectsService.getProjectsByID(id)) as Projects;
    if (project) {
      return new ResponseData(200, project);
    } else {
      return new ResponseData(200, 'No Project fetched with ID: ' + id);
    }
  } catch (error) {
    return new ResponseData(
      500,
      'Failed to retrieve project with ID. ID: ' + id + ' - ' + error,
    );
  }
};

const ProjectsController = {
  getAllProjects,
  getProjectsByName,
  getProjectsByID,
};

export default ProjectsController;
