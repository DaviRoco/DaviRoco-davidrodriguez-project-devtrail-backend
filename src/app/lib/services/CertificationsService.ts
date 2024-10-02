import Certifications from "../entities/Certifications";
import { CertificationsRepository } from "../repositories/CertificationsRepository";
import SkillsFiller from "./utils/SkillsFiller";

export class CertificationsService {
  private certificationsRepository: CertificationsRepository;
  private skillsFiller: SkillsFiller<Certifications>;

  constructor(certificationsRepository: CertificationsRepository) {
    this.certificationsRepository = certificationsRepository;
    this.skillsFiller = new SkillsFiller();
  }

  async getAllCertifications(): Promise<
    Omit<Certifications, "skills">[] | null
  > {
    const certificationData =
      await this.certificationsRepository.getAllCertifications();
    return this.skillsFiller.getObjectsWithSkills(certificationData);
  }

  async getCertificationsByName(
    name: string,
  ): Promise<Omit<Certifications, "skills"> | null> {
    const certificationData =
      await this.certificationsRepository.getCertificationsByName(name);
    return this.skillsFiller.getObjectWithSkills(certificationData);
  }

  async getCertificationsByInstitution(
    institution: string,
  ): Promise<Omit<Certifications, "skills"> | null> {
    const certificationData =
      await this.certificationsRepository.getCertificationsByInstitution(
        institution,
      );
    return this.skillsFiller.getObjectWithSkills(certificationData);
  }

  async getCertificationsByID(
    id: string,
  ): Promise<Omit<Certifications, "skills"> | null> {
    const certificationData =
      await this.certificationsRepository.getCertificationsByID(id);
    return this.skillsFiller.getObjectWithSkills(certificationData);
  }
}
