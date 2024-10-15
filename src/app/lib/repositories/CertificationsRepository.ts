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

/**
 * The `CertificationsRepository` class provides methods to interact with the certifications collection.
 * It allows retrieving all certifications, as well as retrieving certifications by name, institution, or ID.
 *
 * @class CertificationsRepository
 * @method getAllCertifications - Retrieves all certifications from the certifications collection.
 * @method getCertificationsByName - Retrieves a certification by its name from the certifications collection.
 * @method getCertificationsByInstitution - Retrieves a certification by its institution from the certifications collection.
 * @method getCertificationsByID - Retrieves a certification by its ID from the certifications collection.
 */
class CertificationsRepository {
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

  async getAllCertifications(): Promise<Certifications[]> {
    const certificationsSnapshot = await getDocs(certificationsCollection);

    return certificationsSnapshot.docs.map((doc) =>
      this.validateAndMapCertification(doc.data(), doc.id),
    );
  }

  async getCertificationsByName(name: string): Promise<Certifications | null> {
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

  async getCertificationsByID(id: string): Promise<Certifications | null> {
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
