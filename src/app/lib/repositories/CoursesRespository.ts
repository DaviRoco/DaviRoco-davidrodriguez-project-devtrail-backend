/**
 * @file CoursesRepository.ts
 * @description Repository class for managing courses in the Firestore database.
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
import Courses from '../entities/Courses';

const coursesCollection = collection(db, 'courses');

class CoursesRepository {
  /**
   * Validates and maps Firestore document data to a Courses entity.
   * @param {DocumentData} docData - The Firestore document data.
   * @param {string} id - The document ID.
   * @returns {Courses} The mapped Courses entity.
   * @throws {Error} If mandatory fields are missing in the document data.
   */
  private validateAndMapCourse(docData: DocumentData, id: string): Courses {
    const { name, code, description, institution, skills } = docData;

    if (!name || !code || !description || !institution || !skills) {
      throw new Error(`Course with ID ${id} is missing mandatory fields.`);
    }

    return new Courses(id, name, code, description, institution, skills);
  }

  /**
   * Retrieves all courses from the Firestore database.
   * @returns {Promise<Courses[]>} A promise that resolves to an array of Courses entities.
   */
  async getAllCourses(): Promise<Courses[]> {
    const coursesSnapshot = await getDocs(coursesCollection);
    return coursesSnapshot.docs.map((doc) =>
      this.validateAndMapCourse(doc.data(), doc.id),
    );
  }

  /**
   * Retrieves a course by its name from the Firestore database.
   * @param {string} name - The name of the course.
   * @returns {Promise<Courses | null>} A promise that resolves to the Courses entity or null if not found.
   * @throws {Error} If the provided name is invalid.
   */
  async getCourseByName(name: string): Promise<Courses | null> {
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

  /**
   * Retrieves a course by its ID from the Firestore database.
   * @param {string} id - The ID of the course.
   * @returns {Promise<Courses | null>} A promise that resolves to the Courses entity or null if not found.
   * @throws {Error} If the provided ID is invalid.
   */
  async getCourseByID(id: string): Promise<Courses | null> {
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
