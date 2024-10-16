/**
 * @file RecordsRepository.ts
 * @description Repository class for managing experience and educational records in the Firestore database.
 */

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

class RecordsRepository {
  private type: string;
  private recordsCollection!: CollectionReference;

  /**
   * Initializes a new instance of the RecordsRepository class.
   * @param {string} type - The type of records to manage ('experience' or 'education').
   * @throws {Error} If an invalid record type is provided.
   */
  constructor(type: string) {
    this.type = type;
    this.recordTypeHandler();
  }

  /**
   * Sets the Firestore collection reference based on the record type.
   * @throws {Error} If an invalid record type is provided.
   */
  recordTypeHandler(): void {
    if (this.type === 'experience') {
      this.recordsCollection = collection(db, 'experience');
    } else if (this.type === 'education') {
      this.recordsCollection = collection(db, 'education');
    } else {
      throw new Error('Invalid record type provided.');
    }
  }

  /**
   * Validates and maps Firestore document data to an ExperienceRecords entity.
   * @param {DocumentData} docData - The Firestore document data.
   * @param {string} id - The document ID.
   * @returns {ExperienceRecords} The mapped ExperienceRecords entity.
   * @throws {Error} If mandatory fields are missing in the document data.
   */
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

  /**
   * Validates and maps Firestore document data to an EducationalRecords entity.
   * @param {DocumentData} docData - The Firestore document data.
   * @param {string} id - The document ID.
   * @returns {EducationalRecords} The mapped EducationalRecords entity.
   * @throws {Error} If mandatory fields are missing in the document data.
   */
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

  /**
   * Retrieves all experience records from the Firestore collection.
   * @returns {Promise<ExperienceRecords[]>} A promise that resolves to an array of ExperienceRecords.
   * @throws {Error} Will throw an error if the retrieval or mapping of records fails.
   */
  async getAllExperienceRecords(): Promise<ExperienceRecords[]> {
    const recordsSnapshot = await getDocs(this.recordsCollection);

    return recordsSnapshot.docs.map((doc) =>
      this.validateAndMapExperienceRecord(doc.data(), doc.id),
    );
  }

  /**
   * Retrieves all educational records from the Firestore collection.
   * @returns {Promise<EducationalRecords[]>} A promise that resolves to an array of EducationalRecords.
   * @throws {Error} Will throw an error if the retrieval or mapping of records fails.
   */
  async getAllEducationalRecords(): Promise<EducationalRecords[]> {
    const recordsSnapshot = await getDocs(this.recordsCollection);

    return recordsSnapshot.docs.map((doc) =>
      this.validateAndMapEducationalRecord(doc.data(), doc.id),
    );
  }

  /**
   * Retrieves an experience record by its ID from the Firestore collection.
   * @param {string} id - The ID of the experience record.
   * @returns {Promise<ExperienceRecords | null>} A promise that resolves to the ExperienceRecords entity or null if not found.
   * @throws {Error} If the ID is invalid or the retrieval fails.
   */
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

  /**
   * Retrieves an educational record by its ID from the Firestore collection.
   * @param {string} id - The ID of the educational record.
   * @returns {Promise<EducationalRecords | null>} A promise that resolves to the EducationalRecords entity or null if not found.
   * @throws {Error} If the ID is invalid or the retrieval fails.
   */
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
