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

  async getAllProjects(): Promise<Projects[]> {
    const projectsSnapshot = await getDocs(projectsCollection);

    return projectsSnapshot.docs.map((doc) =>
      this.validateAndMapProject(doc.data(), doc.id),
    );
  }

  async getProjectsByName(name: string): Promise<Projects | null> {
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

  async getProjectsByID(id: string): Promise<Projects | null> {
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
