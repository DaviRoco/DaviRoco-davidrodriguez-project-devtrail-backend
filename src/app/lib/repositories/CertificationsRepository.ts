/**
 * @file CertificationsRepository.ts
 * @description Repository class for managing certifications in the Firestore database.
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
import Certifications from '../entities/Certifications';

const certificationsCollection = collection(db, 'certifications');

class CertificationsRepository {
  /**
   * Validates the provided document data and maps it to a Certifications object.
   *
   * @param docData - The document data to validate and map.
   * @param id - The unique identifier for the certification.
   * @returns A Certifications object containing the validated and mapped data.
   * @throws Will throw an error if any mandatory fields are missing in the document data.
   */
  private validateAndMapCertification(
    docData: DocumentData,
    id: string,
  ): Certifications {
    const { name, institution, date, credentialID, url, skills } = docData;

    if (!name || !institution || !date || !credentialID || !url || !skills) {
      throw new Error(
        `Certification with ID ${id} is missing mandatory fields.`,
      );
    }

    return new Certifications(
      id,
      name,
      institution,
      date.toDate(),
      credentialID,
      url,
      skills,
    );
  }

  /**
   * Retrieves all certifications from the certifications collection.
   *
   * @returns {Promise<Certifications[]>} A promise that resolves to an array of Certifications objects.
   */
  async getAllCertifications(): Promise<Certifications[]> {
    const certificationsSnapshot = await getDocs(certificationsCollection);

    return certificationsSnapshot.docs.map((doc) =>
      this.validateAndMapCertification(doc.data(), doc.id),
    );
  }

  /**
   * Retrieves a certification by its name.
   *
   * @param {string} name - The name of the certification to retrieve.
   * @returns {Promise<Certifications | null>} A promise that resolves to the certification object if found, or null if not found.
   * @throws {Error} If the provided name is not a non-empty string.
   */
  async getCertificationByName(name: string): Promise<Certifications | null> {
    if (!name || typeof name !== 'string') {
      throw new Error(
        'Invalid name provided. Name must be a non-empty string.',
      );
    }

    const certificationMatchingName = query(
      certificationsCollection,
      where('name', '==', name),
    );

    const querySnapshot = await getDocs(certificationMatchingName);

    if (querySnapshot.empty) {
      return null;
    }

    return this.validateAndMapCertification(
      querySnapshot.docs[0].data(),
      querySnapshot.docs[0].id,
    );
  }

  /**
   * Retrieves certifications by the given institution name.
   *
   * @param institution - The name of the institution to search for certifications.
   * @returns A promise that resolves to the certification data if found, or null if no matching certification is found.
   * @throws {Error} If the provided institution is not a non-empty string.
   */
  async getCertificationsByInstitution(
    institution: string,
  ): Promise<Certifications | null> {
    if (!institution || typeof institution !== 'string') {
      throw new Error(
        'Invalid institution provided. Institution must be a non-empty string.',
      );
    }

    const certificationMatchingInstitution = query(
      certificationsCollection,
      where('institution', '==', institution),
    );

    const querySnapshot = await getDocs(certificationMatchingInstitution);

    if (querySnapshot.empty) {
      return null;
    }

    return this.validateAndMapCertification(
      querySnapshot.docs[0].data(),
      querySnapshot.docs[0].id,
    );
  }

  /**
   * Retrieves a certification by its ID.
   *
   * @param id - The ID of the certification to retrieve. Must be a non-empty string.
   * @returns A promise that resolves to the certification object if found, or null if not found.
   * @throws {Error} If the provided id is not a non-empty string.
   */
  async getCertificationByID(id: string): Promise<Certifications | null> {
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid ID provided. ID must be a non-empty string.');
    }

    const certification = doc(certificationsCollection, id);
    const certificationSnapshot = await getDoc(certification);

    if (!certificationSnapshot.exists()) {
      return null;
    }

    return this.validateAndMapCertification(
      certificationSnapshot.data(),
      certificationSnapshot.id,
    );
  }
}

export default CertificationsRepository;
