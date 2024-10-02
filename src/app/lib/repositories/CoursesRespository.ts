import { db } from "../../firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  where,
  query,
} from "firebase/firestore";
import Courses from "../entities/Courses";

const coursesCollection = collection(db, "courses");
/**
 * The `CoursesRepository` class provides methods to interact with the courses collection.
 * It allows retrieving all courses, as well as retrieving courses by name or ID.
 *
 * @class CoursesRepository
 * @method getAllCourses - Retrieves all courses from the courses collection.
 * @method getCoursesByName - Retrieves a course by its name from the courses collection.
 * @method getCoursesByID - Retrieves a course by its ID from the courses collection.
 */
export class CoursesRepository {
  async getAllCourses(): Promise<Courses[]> {
    const coursesSnapshot = await getDocs(coursesCollection);
    const courses = coursesSnapshot.docs.map((doc) => {
      const data = doc.data();

      if (
        !data.name ||
        !data.code ||
        !data.description ||
        !data.institution ||
        !data.skills
      ) {
        throw new Error(
          `Course with ID ${doc.id} is missing mandatory fields.`,
        );
      }

      return new Courses(
        doc.id,
        data.name,
        data.code,
        data.description,
        data.institution,
        data.skills,
      );
    });

    return courses;
  }

  async getCoursesByName(name: string): Promise<Courses | null> {
    if (!name || typeof name !== "string") {
      throw new Error(
        "Invalid name provided. Name must be a non-empty string.",
      );
    }

    const courseMatchingName = query(
      coursesCollection,
      where("name", "==", name),
    );

    const querySnapshot = await getDocs(courseMatchingName);

    if (querySnapshot.empty) {
      return null;
    }

    const docSnapshot = querySnapshot.docs[0];
    const docData = docSnapshot.data();

    if (
      !docData.name ||
      !docData.code ||
      !docData.description ||
      !docData.institution ||
      !docData.skills
    ) {
      throw new Error(`Course with name ${name} is missing mandatory fields.`);
    }

    const course = new Courses(
      docSnapshot.id,
      docData.name,
      docData.code,
      docData.description,
      docData.institution,
      docData.skills,
    );

    return course;
  }

  async getCoursesByID(id: string): Promise<Courses | null> {
    if (!id || typeof id !== "string") {
      throw new Error("Invalid ID provided. ID must be a non-empty string.");
    }

    const courseDoc = doc(coursesCollection, id);
    const docSnapshot = await getDoc(courseDoc);

    if (!docSnapshot.exists()) {
      return null;
    }

    const docData = docSnapshot.data();

    if (
      !docData.name ||
      !docData.code ||
      !docData.description ||
      !docData.institution ||
      !docData.skills
    ) {
      throw new Error(`Course with ID ${id} is missing mandatory fields.`);
    }

    const course = new Courses(
      docSnapshot.id,
      docData.name,
      docData.code,
      docData.description,
      docData.institution,
      docData.skills,
    );

    return course;
  }
}
