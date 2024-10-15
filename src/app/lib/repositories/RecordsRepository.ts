import { db } from '../../firebase';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  DocumentData,
} from 'firebase/firestore';
import ExperienceRecords from '../entities/ExperienceRecords';
import EducationalRecords from '../entities/EducationalRecords';
import { CollectionReference } from 'firebase/firestore';

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

class RecordsRepository {
  private type: string;
  private recordsCollection!: CollectionReference;

  constructor(type: string) {
    this.type = type;
    this.recordTypeHandler();
  }

  recordTypeHandler(): void {
    if (this.type === 'experience') {
      this.recordsCollection = collection(db, 'experience');
    } else if (this.type === 'education') {
      this.recordsCollection = collection(db, 'education');
    } else {
      throw new Error('Invalid record type provided.');
    }
  }

  private validateAndMapExperienceRecord(
    docData: DocumentData,
    id: string,
  ): ExperienceRecords {
    const {
      startDate,
      endDate,
      description,
      skills,
      companyName,
      title,
      location,
    } = docData;

    if (
      !startDate ||
      !endDate ||
      !description ||
      !skills ||
      !companyName ||
      !title ||
      !location
    ) {
      throw new Error(
        `Experience record with ID ${id} is missing mandatory fields.`,
      );
    }

    return new ExperienceRecords(
      id,
      startDate.toDate(),
      endDate.toDate(),
      description,
      skills,
      companyName,
      title,
      location,
    );
  }

  private validateAndMapEducationalRecord(
    docData: DocumentData,
    id: string,
  ): EducationalRecords {
    const {
      startDate,
      endDate,
      description,
      skills,
      institutionName,
      degree,
      location,
    } = docData;

    if (
      !startDate ||
      !endDate ||
      !description ||
      !skills ||
      !institutionName ||
      !degree
    ) {
      throw new Error(
        `Educational record with ID ${id} is missing mandatory fields.`,
      );
    }

    return new EducationalRecords(
      id,
      startDate.toDate(),
      endDate.toDate(),
      description,
      skills,
      institutionName,
      degree,
      location,
    );
  }

  async getAllExperienceRecords(): Promise<ExperienceRecords[]> {
    const recordsSnapshot = await getDocs(this.recordsCollection);

    return recordsSnapshot.docs.map((doc) =>
      this.validateAndMapExperienceRecord(doc.data(), doc.id),
    );
  }

  async getAllEducationalRecords(): Promise<EducationalRecords[]> {
    const recordsSnapshot = await getDocs(this.recordsCollection);

    return recordsSnapshot.docs.map((doc) =>
      this.validateAndMapEducationalRecord(doc.data(), doc.id),
    );
  }

  async getExperienceRecordByID(id: string): Promise<ExperienceRecords | null> {
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid ID provided. ID must be a non-empty string.');
    }

    const record = doc(this.recordsCollection, id);
    const recordSnapshot = await getDoc(record);

    if (!recordSnapshot.exists()) {
      return null;
    }

    return this.validateAndMapExperienceRecord(
      recordSnapshot.data(),
      recordSnapshot.id,
    );
  }

  async getEducationalRecordByID(
    id: string,
  ): Promise<EducationalRecords | null> {
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid ID provided. ID must be a non-empty string.');
    }

    const record = doc(this.recordsCollection, id);
    const recordSnapshot = await getDoc(record);

    if (!recordSnapshot.exists()) {
      return null;
    }

    return this.validateAndMapEducationalRecord(
      recordSnapshot.data(),
      recordSnapshot.id,
    );
  }
}

export default RecordsRepository;
