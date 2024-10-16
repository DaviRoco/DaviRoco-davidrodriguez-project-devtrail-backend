import Certifications from '../entities/Certifications';
import CertificationsRepository from '../repositories/CertificationsRepository';
import SkillsFiller from '../utils/SkillsFiller';

/**
 * Service class for managing certifications.
 */
export class CertificationsService {
  private certificationsRepository: CertificationsRepository;
  private skillsFiller: SkillsFiller<Certifications>;

  /**
   * Constructs a new instance of the CertificationsService.
   *
   * @param {CertificationsRepository} certificationsRepository - The repository used to manage certifications data.
   */
  constructor(certificationsRepository: CertificationsRepository) {
    this.certificationsRepository = certificationsRepository;
    this.skillsFiller = new SkillsFiller();
  }

  /**
   * Retrieves all certifications from the repository.
   *
   * @returns {Promise<Omit<Certifications, 'skills'>[] | null>}
   * A promise that resolves to an array of certifications without the 'skills' property,
   * or null if no certifications are found.
   */
  async getAllCertifications(): Promise<
    Omit<Certifications, 'skills'>[] | null
  > {
    const certificationsData =
      await this.certificationsRepository.getAllCertifications();
    if (!certificationsData || certificationsData.length === 0) {
      return null;
    }
    return this.skillsFiller.getObjectsWithSkills(certificationsData);
  }

  /**
   * Retrieves a certification by its name.
   *
   * @param name - The name of the certification to retrieve.
   * @returns A promise that resolves to the certification object without the 'skills' property, or null if not found.
   */
  async getCertificationByName(
    name: string,
  ): Promise<Omit<Certifications, 'skills'> | null> {
    const certificationData =
      await this.certificationsRepository.getCertificationByName(name);
    if (!certificationData) {
      return null;
    }
    return this.skillsFiller.getObjectWithSkills(certificationData);
  }

  /**
   * Retrieves certifications by the given institution.
   *
   * @param institution - The name of the institution to filter certifications by.
   * @returns A promise that resolves to an object containing the certification data without the 'skills' field, or null if no data is found.
   */
  async getCertificationsByInstitution(
    institution: string,
  ): Promise<Omit<Certifications, 'skills'> | null> {
    const certificationData =
      await this.certificationsRepository.getCertificationsByInstitution(
        institution,
      );
    if (!certificationData) {
      return null;
    }
    return this.skillsFiller.getObjectWithSkills(certificationData);
  }

  /**
   * Retrieves a certification by its ID.
   *
   * @param id - The unique identifier of the certification.
   * @returns A promise that resolves to the certification object without the 'skills' property, or null if not found.
   */
  async getCertificationByID(
    id: string,
  ): Promise<Omit<Certifications, 'skills'> | null> {
    const certificationData =
      await this.certificationsRepository.getCertificationByID(id);
    if (!certificationData) {
      return null;
    }
    return this.skillsFiller.getObjectWithSkills(certificationData);
  }
}
