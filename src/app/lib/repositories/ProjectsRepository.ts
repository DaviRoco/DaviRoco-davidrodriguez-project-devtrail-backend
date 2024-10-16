/**
 * @file ProjectsRepository.ts
 * @description Repository class for managing projects in the Firestore database.
 */

import { db } from '../../firebase';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  where,
  query,
  DocumentData,
} from 'firebase/firestore';
import Projects from '../entities/Projects';

const projectsCollection = collection(db, 'projects');

class ProjectsRepository {
  /**
   * Validates and maps Firestore document data to a Projects entity.
   * @param {DocumentData} docData - The Firestore document data.
   * @param {string} id - The document ID.
   * @returns {Projects} The mapped Projects entity.
   * @throws {Error} If mandatory fields are missing in the document data.
   */
  private validateAndMapProject(docData: DocumentData, id: string): Projects {
    const { name, startDate, endDate, description, url, skills } = docData;

    if (!name || !startDate || !endDate || !description || !url || !skills) {
      throw new Error(`Project with ID ${id} is missing mandatory fields.`);
    }

    return new Projects(
      id,
      name,
      startDate.toDate(),
      endDate.toDate(),
      description,
      url,
      skills,
    );
  }

  /**
   * Retrieves all projects from the projects collection.
   *
   * @returns {Promise<Projects[]>} A promise that resolves to an array of Projects.
   *
   * @throws {Error} Will throw an error if the retrieval or mapping of projects fails.
   */
  async getAllProjects(): Promise<Projects[]> {
    const projectsSnapshot = await getDocs(projectsCollection);

    return projectsSnapshot.docs.map((doc) =>
      this.validateAndMapProject(doc.data(), doc.id),
    );
  }

  /**
   * Retrieves a project by its name from the projects collection.
   *
   * @param {string} name - The name of the project to retrieve. Must be a non-empty string.
   * @returns {Promise<Projects | null>} A promise that resolves to the project if found, or null if no project matches the given name.
   * @throws {Error} If the provided name is invalid (not a non-empty string).
   */
  async getProjectByName(name: string): Promise<Projects | null> {
    if (!name || typeof name !== 'string') {
      throw new Error(
        'Invalid name provided. Name must be a non-empty string.',
      );
    }

    const projectMatchingName = query(
      projectsCollection,
      where('name', '==', name),
    );

    const querySnapshot = await getDocs(projectMatchingName);

    if (querySnapshot.empty) {
      return null;
    }

    return this.validateAndMapProject(
      querySnapshot.docs[0].data(),
      querySnapshot.docs[0].id,
    );
  }

  /**
   * Retrieves a project by its ID from the projects collection.
   *
   * @param {string} id - The ID of the project to retrieve. Must be a non-empty string.
   * @returns {Promise<Projects | null>} A promise that resolves to the project if found, or null if not found.
   * @throws {Error} If the provided ID is invalid (not a non-empty string).
   */
  async getProjectByID(id: string): Promise<Projects | null> {
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid ID provided. ID must be a non-empty string.');
    }

    const projectDoc = doc(projectsCollection, id);
    const docSnapshot = await getDoc(projectDoc);

    if (!docSnapshot.exists()) {
      return null;
    }

    return this.validateAndMapProject(docSnapshot.data(), docSnapshot.id);
  }
}

export default ProjectsRepository;
