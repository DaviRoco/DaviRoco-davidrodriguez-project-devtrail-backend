import { db } from '../../firebase';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  where,
  query,
} from 'firebase/firestore';
import Projects from '../entities/Projects';

const projectsCollection = collection(db, 'projects');

export class ProjectsRepository {
  async getAllProjects(): Promise<Projects[]> {
    const projectsSnapshot = await getDocs(projectsCollection);
    const projects = projectsSnapshot.docs.map((doc) => {
      const data = doc.data();

      if (
        !data.name ||
        !data.startDate ||
        !data.endDate ||
        !data.description ||
        !data.url ||
        !data.skills
      ) {
        throw new Error(
          `Project with ID ${doc.id} is missing mandatory fields.`,
        );
      }

      return new Projects(
        doc.id,
        data.name,
        data.startDate.toDate(),
        data.endDate.toDate(),
        data.description,
        data.url,
        data.skills,
      );
    });

    return projects;
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

    const docSnapshot = querySnapshot.docs[0];
    const docData = docSnapshot.data();

    if (
      !docData.name ||
      !docData.startDate ||
      !docData.endDate ||
      !docData.description ||
      !docData.url ||
      !docData.skills
    ) {
      throw new Error(`Project with name ${name} is missing mandatory fields.`);
    }

    const project = new Projects(
      docSnapshot.id,
      docData.name,
      docData.startDate.toDate(),
      docData.endDate.toDate(),
      docData.description,
      docData.url,
      docData.skills,
    );

    return project;
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

    const docData = docSnapshot.data();

    if (
      !docData.name ||
      !docData.startDate ||
      !docData.endDate ||
      !docData.description ||
      !docData.url ||
      !docData.skills
    ) {
      throw new Error(`Project with ID ${id} is missing mandatory fields.`);
    }

    const project = new Projects(
      docSnapshot.id,
      docData.name,
      docData.startDate.toDate(),
      docData.endDate.toDate(),
      docData.description,
      docData.url,
      docData.skills,
    );

    return project;
  }
}

export default ProjectsRepository;
