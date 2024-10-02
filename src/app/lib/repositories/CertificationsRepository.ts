import { db } from "../../firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  where,
  query,
} from "firebase/firestore";
import Certifications from "../entities/Certifications";

const certificationsCollection = collection(db, "certifications");

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
export class CertificationsRepository {
  async getAllCertifications(): Promise<Certifications[]> {
    const certificationsSnapshot = await getDocs(certificationsCollection);
    const certifications = certificationsSnapshot.docs.map((doc) => {
      const data = doc.data();

      if (
        !data.name ||
        !data.institution ||
        !data.date ||
        !data.credentialID ||
        !data.url ||
        !data.skills
      ) {
        throw new Error(
          `Certification with ID ${doc.id} is missing mandatory fields.`,
        );
      }

      return new Certifications(
        doc.id,
        data.name,
        data.institution,
        data.date.toDate(),
        data.credentialID,
        data.url,
        data.skills,
      );
    });

    return certifications;
  }

  async getCertificationsByName(name: string): Promise<Certifications | null> {
    if (!name || typeof name !== "string") {
      throw new Error(
        "Invalid name provided. Name must be a non-empty string.",
      );
    }

    const certificationMatchingName = query(
      certificationsCollection,
      where("name", "==", name),
    );

    const querySnapshot = await getDocs(certificationMatchingName);

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];

    const data = doc.data();

    return new Certifications(
      doc.id,
      data.name,
      data.institution,
      data.date.toDate(),
      data.credentialID,
      data.url,
      data.skills,
    );
  }

  async getCertificationsByInstitution(
    institution: string,
  ): Promise<Certifications | null> {
    if (!institution || typeof institution !== "string") {
      throw new Error(
        "Invalid institution provided. Institution must be a non-empty string.",
      );
    }

    const certificationMatchingInstitution = query(
      certificationsCollection,
      where("institution", "==", institution),
    );

    const querySnapshot = await getDocs(certificationMatchingInstitution);

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];

    const data = doc.data();

    return new Certifications(
      doc.id,
      data.name,
      data.institution,
      data.date.toDate(),
      data.credentialID,
      data.url,
      data.skills,
    );
  }

  async getCertificationsByID(id: string): Promise<Certifications | null> {
    if (!id || typeof id !== "string") {
      throw new Error("Invalid ID provided. ID must be a non-empty string.");
    }

    const certification = doc(certificationsCollection, id);
    const certificationSnapshot = await getDoc(certification);

    if (!certificationSnapshot.exists()) {
      return null;
    }

    const data = certificationSnapshot.data();

    if (
      !data.name ||
      !data.institution ||
      !data.date ||
      !data.credentialID ||
      !data.url ||
      !data.skills
    ) {
      throw new Error(
        `Certification with ID ${id} is missing mandatory fields.`,
      );
    }

    return new Certifications(
      certificationSnapshot.id,
      data.name,
      data.institution,
      data.date.toDate(),
      data.credentialID,
      data.url,
      data.skills,
    );
  }
}
