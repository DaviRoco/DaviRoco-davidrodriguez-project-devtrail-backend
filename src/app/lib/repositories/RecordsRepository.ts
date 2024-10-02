import { db } from "../../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import ExperienceRecords from "../entities/ExperienceRecords";
import EducationalRecords from "../entities/EducationalRecords";
import { CollectionReference } from "firebase/firestore";

/**
 * The `RecordsRepository` class provides methods to interact with the experience and education records collections.
 * It allows retrieving all records, as well as retrieving records by ID.
 *
 * @class RecordsRepository
 * @method getAllExperienceRecords - Retrieves all experience records from the experience collection.
 * @method getAllEducationalRecords - Retrieves all educational records from the education collection.
 * @method getExperienceRecordById - Retrieves an experience record by its ID from the experience collection.
 * @method getEducationalRecordById - Retrieves an educational record by its ID from the education collection.
 */

export class RecordsRepository {
  private type: string;
  private recordsCollection!: CollectionReference;

  constructor(type: string) {
    this.type = type;
    this.recordTypeHandler();
  }

  recordTypeHandler(): void {
    if (this.type === "experience") {
      this.recordsCollection = collection(db, "experience");
    } else if (this.type === "education") {
      this.recordsCollection = collection(db, "education");
    } else {
      throw new Error("Invalid record type provided.");
    }
  }

  async getAllExperienceRecords(): Promise<ExperienceRecords[]> {
    const recordsSnapshot = await getDocs(this.recordsCollection);
    const records = recordsSnapshot.docs.map((doc) => {
      const data = doc.data();

      if (
        !data.startDate ||
        !data.endDate ||
        !data.description ||
        !data.skills ||
        !data.companyName ||
        !data.title ||
        !data.location
      ) {
        throw new Error(
          `Experience record with ID ${doc.id} is missing mandatory fields.`,
        );
      }

      return new ExperienceRecords(
        doc.id,
        data.startDate.toDate(),
        data.endDate.toDate(),
        data.description,
        data.skills,
        data.companyName,
        data.title,
        data.location,
      );
    });

    return records;
  }

  async getAllEducationalRecords(): Promise<EducationalRecords[]> {
    const recordsSnapshot = await getDocs(this.recordsCollection);
    const records = recordsSnapshot.docs.map((doc) => {
      const data = doc.data();

      if (
        !data.startDate ||
        !data.endDate ||
        !data.description ||
        !data.skills ||
        !data.name ||
        !data.degree
      ) {
        throw new Error(
          `Educational record with ID ${doc.id} is missing mandatory fields.`,
        );
      }

      return new EducationalRecords(
        doc.id,
        data.startDate.toDate(),
        data.endDate.toDate(),
        data.description,
        data.skills,
        data.name,
        data.degree,
      );
    });

    return records;
  }

  async getExperienceRecordById(id: string): Promise<ExperienceRecords | null> {
    if (!id || typeof id !== "string") {
      throw new Error("Invalid ID provided. ID must be a non-empty string.");
    }

    const record = doc(this.recordsCollection, id);
    const recordSnapshot = await getDoc(record);

    if (!recordSnapshot.exists()) {
      return null;
    }

    const data = recordSnapshot.data();

    if (
      !data.startDate ||
      !data.endDate ||
      !data.description ||
      !data.skills ||
      !data.companyName ||
      !data.title ||
      !data.location
    ) {
      throw new Error(
        `Experience record with ID ${id} is missing mandatory fields.`,
      );
    }

    return new ExperienceRecords(
      recordSnapshot.id,
      data.startDate.toDate(),
      data.endDate.toDate(),
      data.description,
      data.skills,
      data.companyName,
      data.title,
      data.location,
    );
  }

  async getEducationalRecordById(
    id: string,
  ): Promise<EducationalRecords | null> {
    if (!id || typeof id !== "string") {
      throw new Error("Invalid ID provided. ID must be a non-empty string.");
    }

    const record = doc(this.recordsCollection, id);
    const recordSnapshot = await getDoc(record);

    if (!recordSnapshot.exists()) {
      return null;
    }

    const data = recordSnapshot.data();

    if (
      !data.startDate ||
      !data.endDate ||
      !data.description ||
      !data.skills ||
      !data.name ||
      !data.degree
    ) {
      throw new Error(
        `Educational record with ID ${id} is missing mandatory fields.`,
      );
    }

    return new EducationalRecords(
      recordSnapshot.id,
      data.startDate.toDate(),
      data.endDate.toDate(),
      data.description,
      data.skills,
      data.name,
      data.degree,
    );
  }
}
