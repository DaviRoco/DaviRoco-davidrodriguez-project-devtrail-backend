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
import Courses from '../entities/Courses';

const coursesCollection = collection(db, 'courses');
/**
 * The `CoursesRepository` class provides methods to interact with the courses collection.
 * It allows retrieving all courses, as well as retrieving courses by name or ID.
 *
 * @class CoursesRepository
 * @method getAllCourses - Retrieves all courses from the courses collection.
 * @method getCoursesByName - Retrieves a course by its name from the courses collection.
 * @method getCoursesByID - Retrieves a course by its ID from the courses collection.
 */
class CoursesRepository {
  private validateAndMapCourse(docData: DocumentData, id: string): Courses {
    const { name, code, description, institution, skills } = docData;

    if (!name || !code || !description || !institution || !skills) {
      throw new Error(`Course with ID ${id} is missing mandatory fields.`);
    }

    return new Courses(id, name, code, description, institution, skills);
  }

  async getAllCourses(): Promise<Courses[]> {
    const coursesSnapshot = await getDocs(coursesCollection);
    return coursesSnapshot.docs.map((doc) =>
      this.validateAndMapCourse(doc.data(), doc.id),
    );
  }

  async getCoursesByName(name: string): Promise<Courses | null> {
    if (!name || typeof name !== 'string') {
      throw new Error(
        'Invalid name provided. Name must be a non-empty string.',
      );
    }

    const courseMatchingName = query(
      coursesCollection,
      where('name', '==', name),
    );

    const querySnapshot = await getDocs(courseMatchingName);

    if (querySnapshot.empty) {
      return null;
    }

    return this.validateAndMapCourse(
      querySnapshot.docs[0].data(),
      querySnapshot.docs[0].id,
    );
  }

  async getCoursesByID(id: string): Promise<Courses | null> {
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid ID provided. ID must be a non-empty string.');
    }

    const courseDoc = doc(coursesCollection, id);
    const docSnapshot = await getDoc(courseDoc);

    if (!docSnapshot.exists()) {
      return null;
    }

    return this.validateAndMapCourse(docSnapshot.data(), docSnapshot.id);
  }
}

export default CoursesRepository;
