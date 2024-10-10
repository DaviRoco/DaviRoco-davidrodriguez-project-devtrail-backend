import { CertificationsRepository } from "../../lib/repositories/CertificationsRepository";
import { getDocs, getDoc, Timestamp } from "firebase/firestore";

jest.mock("firebase/firestore", () => ({
  initializeApp: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  getDocs: jest.fn(),
  getDoc: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  doc: jest.fn(),
  Timestamp: {
    fromDate: (date: Date) => ({
      toDate: () => date,
    }),
  },
}));

describe("Certifications Repository", () => {
  let repository: CertificationsRepository;

  const mockCertifications = [
    {
      id: "1",
      name: "Certification 1",
      institution: "Udemy",
      date: Timestamp.fromDate(new Date("2021-01-01")),
      credentialID: "123456",
      url: "https://example.com",
      skills: [
        {
          id: "1",
          name: "Skill 1",
          description: "Description 1",
          level: "High",
        },
      ],
    },
    {
      id: "2",
      name: "Certification 2",
      institution: "Udemy",
      date: Timestamp.fromDate(new Date("2021-03-01")),
      credentialID: "123456",
      url: "https://example.com",
      skills: [
        {
          id: "2",
          name: "Skill 2",
          description: "Description 2",
          level: "Medium",
        },
      ],
    },
  ];

  beforeEach(() => {
    repository = new CertificationsRepository();
    jest.resetAllMocks();
  });

  describe("getCertifications", () => {
    test("It should retrieve all certifications.", async () => {
      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: mockCertifications.map((certification) => ({
          id: certification.id,
          data: () => certification,
        })),
      });

      const certifications = await repository.getAllCertifications();
      expect(certifications.length).toBe(2);
      expect(certifications[0].name).toBe("Certification 1");
      expect(certifications[1].name).toBe("Certification 2");
    });

    test("It should handle errors when mandatory fields are missing.", async () => {
      const incompleteCertifications = [
        {
          id: "1",
          name: "",
          institution: "Udemy",
          date: Timestamp.fromDate(new Date("2021-01-01")),
          credentialID: "123456",
          url: "https://example.com",
          skills: [
            {
              id: "1",
              name: "Skill 1",
              description: "Description 1",
              level: "High",
            },
          ],
        },
        {
          id: "2",
          name: "Certification 2",
          institution: "Udemy",
          date: Timestamp.fromDate(new Date("2021-03-01")),
          credentialID: "123456",
          url: "https://example.com",
          skills: [
            {
              id: "2",
              name: "Skill 2",
              description: "Description 2",
              level: "Medium",
            },
          ],
        },
      ];

      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: incompleteCertifications.map((certification) => ({
          id: certification.id,
          data: () => certification,
        })),
      });

      await expect(repository.getAllCertifications()).rejects.toThrow();
    });
  });

  describe("getCertificationByName", () => {
    test("It should retrieve the certification with the specified name.", async () => {
      const testName = "Certification 2";
      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: [
          {
            id: "2",
            data: () => ({
              id: "2",
              name: "Certification 2",
              institution: "Udemy",
              date: Timestamp.fromDate(new Date("2021-03-01")),
              credentialID: "123456",
              url: "https://example.com",
              skills: [
                {
                  id: "2",
                  name: "Skill 2",
                  description: "Description 2",
                  level: "Medium",
                },
              ],
            }),
          },
        ],
      });

      const certification = await repository.getCertificationsByName(testName);
      expect(certification?.name).toBe(testName);
    });

    test("It should return null if no certification is found.", async () => {
      const testName = "Certification 3";
      (getDocs as jest.Mock).mockResolvedValueOnce({
        empty: true,
        docs: [],
      });

      const certification = await repository.getCertificationsByName(testName);
      expect(certification).toBeNull();
    });

    test("It should handle errors when an invalid name is provided.", async () => {
      const testName = "";
      await expect(
        repository.getCertificationsByName(testName),
      ).rejects.toThrow();
    });
  });

  describe("getCertificationsByInstitution", () => {
    test("It should retrieve the certification with the specified institution.", async () => {
      const testInstitution = "Udemy";
      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: [
          {
            id: "1",
            data: () => ({
              id: "1",
              name: "Certification 1",
              institution: "Udemy",
              date: Timestamp.fromDate(new Date("2021-01-01")),
              credentialID: "123456",
              url: "https://example.com",
              skills: [
                {
                  id: "1",
                  name: "Skill 1",
                  description: "Description 1",
                  level: "High",
                },
              ],
            }),
          },
        ],
      });

      const certification =
        await repository.getCertificationsByInstitution(testInstitution);
      expect(certification?.institution).toBe(testInstitution);
    });

    test("It should return null if no certification is found.", async () => {
      const testInstitution = "Coursera";
      (getDocs as jest.Mock).mockResolvedValueOnce({
        empty: true,
        docs: [],
      });

      const certification =
        await repository.getCertificationsByInstitution(testInstitution);
      expect(certification).toBeNull();
    });

    test("It should handle errors when an invalid institution is provided.", async () => {
      const testInstitution = "";
      await expect(
        repository.getCertificationsByInstitution(testInstitution),
      ).rejects.toThrow();
    });
  });

  describe("getCertificationsByID", () => {
    test("It should retrieve the certification with the specified ID.", async () => {
      const testID = "1";
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => true,
        id: "1",
        data: () => ({
          id: "1",
          name: "Certification 1",
          institution: "Udemy",
          date: Timestamp.fromDate(new Date("2021-01-01")),
          credentialID: "123456",
          url: "https://example.com",
          skills: [
            {
              id: "1",
              name: "Skill 1",
              description: "Description 1",
              level: "High",
            },
          ],
        }),
      });

      const certification = await repository.getCertificationsByID(testID);
      expect(certification?.id).toBe("1");
    });

    test("It should return null if no certification is found.", async () => {
      const testID = "3";
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => false,
        data: () => null,
      });

      const certification = await repository.getCertificationsByID(testID);
      expect(certification).toBeNull();
    });

    test("It should handle errors when mandatory fields are missing.", async () => {
      const incompleteCertification = {
        id: "1",
        name: "",
        institution: "Udemy",
        date: Timestamp.fromDate(new Date("2021-01-01")),
        credentialID: "123456",
        url: "https://example.com",
        skills: [
          {
            id: "1",
            name: "Skill 1",
            description: "Description 1",
            level: "High",
          },
        ],
      };

      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => true,
        id: "1",
        data: () => incompleteCertification,
      });

      await expect(repository.getCertificationsByID("1")).rejects.toThrow(
        "Certification with ID 1 is missing mandatory fields.",
      );
    });

    test("It should handle errors when an invalid ID is provided.", async () => {
      await expect(repository.getCertificationsByID("")).rejects.toThrow();
    });
  });
});
