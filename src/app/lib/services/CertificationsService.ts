import Certifications from '../entities/Certifications';
import CertificationsRepository from '../repositories/CertificationsRepository';
import SkillsFiller from '../utils/SkillsFiller';

export class CertificationsService {
  private certificationsRepository: CertificationsRepository;
  private skillsFiller: SkillsFiller<Certifications>;

  constructor(certificationsRepository: CertificationsRepository) {
    this.certificationsRepository = certificationsRepository;
    this.skillsFiller = new SkillsFiller();
  }

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

  async getCertificationByName(
    name: string,
  ): Promise<Omit<Certifications, 'skills'> | null> {
    const certificationData =
      await this.certificationsRepository.getCertificationsByName(name);
    if (!certificationData) {
      return null;
    }
    return this.skillsFiller.getObjectWithSkills(certificationData);
  }

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

  async getCertificationByID(
    id: string,
  ): Promise<Omit<Certifications, 'skills'> | null> {
    const certificationData =
      await this.certificationsRepository.getCertificationsByID(id);
    if (!certificationData) {
      return null;
    }
    return this.skillsFiller.getObjectWithSkills(certificationData);
  }
}
