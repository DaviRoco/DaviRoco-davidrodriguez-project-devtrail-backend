import { CertificationsService } from '../../lib/services/CertificationsService';
import CertificationsRepository from '../../lib/repositories/CertificationsRepository';
import Certifications from '../../lib/entities/Certifications';
import Skills from '../../lib/entities/Skills';
import { KnowledgeLevelEnumerations } from '../../lib/constants/enumerations/KnowledgeLevelsEnumerations';
import SkillsRepository from '../../lib/repositories/SkillsRepository';

jest.mock('../../lib/repositories/CertificationsRepository');
jest.mock('../../lib/repositories/SkillsRepository');

describe('Certifications Service', () => {
  let certificationsService: CertificationsService;
  let certificationsRepository: jest.Mocked<CertificationsRepository>;
  let skillsRepository: jest.Mocked<SkillsRepository>;

  beforeEach(() => {
    certificationsRepository =
      new CertificationsRepository() as jest.Mocked<CertificationsRepository>;
    certificationsService = new CertificationsService(certificationsRepository);
    skillsRepository = new SkillsRepository() as jest.Mocked<SkillsRepository>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockCertifications = [
    new Certifications(
      '1',
      'Certification 1',
      'Institution 1',
      new Date('2021-01-01'),
      'Credential ID 1',
      'url1',
      [
        new Skills(
          '1',
          'TypeScript',
          'Strong in TypeScript',
          KnowledgeLevelEnumerations.High,
        ),
        new Skills(
          '2',
          'JavaScript',
          'Experienced in JavaScript',
          KnowledgeLevelEnumerations.Mid,
        ),
      ],
    ),
    new Certifications(
      '2',
      'Certification 2',
      'Institution 2',
      new Date('2021-01-01'),
      'Credential ID 2',
      'url2',
      [
        new Skills(
          '1',
          'TypeScript',
          'Strong in TypeScript',
          KnowledgeLevelEnumerations.High,
        ),
        new Skills(
          '2',
          'JavaScript',
          'Experienced in JavaScript',
          KnowledgeLevelEnumerations.Mid,
        ),
      ],
    ),
  ];

  const mockCertificationsObjects = [
    {
      _id: mockCertifications[0].id,
      _name: mockCertifications[0].name,
      _institution: mockCertifications[0].institution,
      _date: mockCertifications[0].date,
      _credentialID: mockCertifications[0].credentialID,
      _url: mockCertifications[0].url,
    } as Omit<Certifications, 'skills'>,
    {
      _id: mockCertifications[1].id,
      _name: mockCertifications[1].name,
      _institution: mockCertifications[1].institution,
      _date: mockCertifications[1].date,
      _credentialID: mockCertifications[1].credentialID,
      _url: mockCertifications[1].url,
    } as Omit<Certifications, 'skills'>,
  ];

  describe('getAllCertifications', () => {
    test('It should return all certifications when repository returns certifications', async () => {
      skillsRepository.getSkillsByIDs = jest.fn().mockResolvedValue([
        {
          id: '1',
          name: 'JavaScript',
          description:
            'A programming language that conforms to the ECMAScript specification.',
          knowledgeLevel: KnowledgeLevelEnumerations.High,
        },
        {
          id: '2',
          name: 'TypeScript',
          description: 'A strict syntactical superset of JavaScript.',
          knowledgeLevel: KnowledgeLevelEnumerations.High,
        },
      ]);
      certificationsRepository.getAllCertifications.mockResolvedValue(
        mockCertifications,
      );

      const result = await certificationsService.getAllCertifications();

      expect(result).toEqual(mockCertificationsObjects);
      expect(
        certificationsRepository.getAllCertifications,
      ).toHaveBeenCalledTimes(1);
    });

    test('It should return null when repository returns no certifications', async () => {
      certificationsRepository.getAllCertifications.mockResolvedValue([]);

      const result = await certificationsService.getAllCertifications();

      expect(result).toBeNull();
      expect(
        certificationsRepository.getAllCertifications,
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCertificationByName', () => {
    test('It should return the certification when the repository returns it by name', async () => {
      const testName = 'Certification 1';
      skillsRepository.getSkillsByIDs = jest.fn().mockResolvedValue([
        {
          id: '1',
          name: 'JavaScript',
          description:
            'A programming language that conforms to the ECMAScript specification.',
          knowledgeLevel: KnowledgeLevelEnumerations.High,
        },
        {
          id: '2',
          name: 'TypeScript',
          description: 'A strict syntactical superset of JavaScript.',
          knowledgeLevel: KnowledgeLevelEnumerations.High,
        },
      ]);
      certificationsRepository.getCertificationsByName.mockResolvedValue(
        mockCertifications[0],
      );

      const result =
        await certificationsService.getCertificationByName(testName);

      expect(result).toEqual(mockCertificationsObjects[0]);
      expect(
        certificationsRepository.getCertificationsByName,
      ).toHaveBeenCalledTimes(1);
    });

    test('It should return null when the repository returns no certification', async () => {
      const testName = 'Certification 3';
      certificationsRepository.getCertificationsByName.mockResolvedValue(null);

      const result =
        await certificationsService.getCertificationByName(testName);

      expect(result).toBeNull();
      expect(
        certificationsRepository.getCertificationsByName,
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCertificationsByInstitution', () => {
    test('It should return the certification when the repository returns it by institution', async () => {
      const testInstitution = 'Institution 2';
      skillsRepository.getSkillsByIDs = jest.fn().mockResolvedValue([
        {
          id: '1',
          name: 'JavaScript',
          description:
            'A programming language that conforms to the ECMAScript specification.',
          knowledgeLevel: KnowledgeLevelEnumerations.High,
        },
        {
          id: '2',
          name: 'TypeScript',
          description: 'A strict syntactical superset of JavaScript.',
          knowledgeLevel: KnowledgeLevelEnumerations.High,
        },
      ]);
      certificationsRepository.getCertificationsByInstitution.mockResolvedValue(
        mockCertifications[1],
      );

      const result =
        await certificationsService.getCertificationsByInstitution(
          testInstitution,
        );

      expect(result).toEqual(mockCertificationsObjects[1]);
      expect(
        certificationsRepository.getCertificationsByInstitution,
      ).toHaveBeenCalledTimes(1);
    });

    test('It should return null when the repository returns no certification', async () => {
      const testInstitution = 'Institution 3';
      certificationsRepository.getCertificationsByInstitution.mockResolvedValue(
        null,
      );

      const result =
        await certificationsService.getCertificationsByInstitution(
          testInstitution,
        );

      expect(result).toBeNull();
      expect(
        certificationsRepository.getCertificationsByInstitution,
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCertificationByID', () => {
    test('It should return the certification when the repository returns it by ID', async () => {
      const testID = '2';
      skillsRepository.getSkillsByIDs = jest.fn().mockResolvedValue([
        {
          id: '1',
          name: 'JavaScript',
          description:
            'A programming language that conforms to the ECMAScript specification.',
          knowledgeLevel: KnowledgeLevelEnumerations.High,
        },
        {
          id: '2',
          name: 'TypeScript',
          description: 'A strict syntactical superset of JavaScript.',
          knowledgeLevel: KnowledgeLevelEnumerations.High,
        },
      ]);
      certificationsRepository.getCertificationsByID.mockResolvedValue(
        mockCertifications[1],
      );

      const result = await certificationsService.getCertificationByID(testID);

      expect(result).toEqual(mockCertificationsObjects[1]);
      expect(
        certificationsRepository.getCertificationsByID,
      ).toHaveBeenCalledTimes(1);
    });

    test('It should return null when the repository returns no certification', async () => {
      const testID = '3';
      certificationsRepository.getCertificationsByID.mockResolvedValue(null);

      const result = await certificationsService.getCertificationByID(testID);

      expect(result).toBeNull();
      expect(
        certificationsRepository.getCertificationsByID,
      ).toHaveBeenCalledTimes(1);
    });
  });
});
