import CertificationsController from "../../lib/controllers/CertificationsController";
import { CertificationsService } from "../../lib/services/CertificationsService";

jest.mock("../../lib/services/CertificationsService");

describe("Certifications Controller", () => {
  const mockCertifications = [
    {
      id: "1",
      name: "Certification 1",
      institution: "Institution 1",
      date: new Date("2021-01-01"),
      credentialID: "C1",
      url: "www.certification1.com",
      skills: [
        {
          id: "1",
          name: "Typescript",
          description: "Programming Language",
          level: "High",
        },
        {
          id: "2",
          name: "C#",
          description: "Programming Language",
          level: "Mid",
        },
      ],
    },
  ];

  describe("getAllCertifications", () => {
    test("It should return all certifications on success.", async () => {
      (
        CertificationsService.prototype.getAllCertifications as jest.Mock
      ).mockResolvedValue(mockCertifications);

      const result = await CertificationsController.getAllCertifications();

      expect(result.status).toBe(200);
      expect(result.body).toEqual(mockCertifications);
    });

    test("It should return a message if no certifications are found.", async () => {
      (
        CertificationsService.prototype.getAllCertifications as jest.Mock
      ).mockResolvedValue(null);

      const result = await CertificationsController.getAllCertifications();

      expect(result.status).toBe(200);
      expect(result.body).toBe("No Certifications fetched");
    });

    test("It should handle errors", async () => {
      (
        CertificationsService.prototype.getAllCertifications as jest.Mock
      ).mockRejectedValue(new Error("Test"));

      const result = await CertificationsController.getAllCertifications();

      expect(result.status).toBe(500);
      expect(result.body).toBe(
        "Failed to retrieve certifications - Error: Test",
      );
    });
  });

  describe("getCertificationByName", () => {
    const mockCertification = mockCertifications[0];
    test("It should return the specified certification with given name on success.", async () => {
      const testName = "Certification 1";

      (
        CertificationsService.prototype.getCertificationByName as jest.Mock
      ).mockResolvedValue(mockCertification);

      const result =
        await CertificationsController.getCertificationByName(testName);

      expect(result.status).toBe(200);
      expect(result.body).toEqual(mockCertification);
    });

    test("It should return a message if no certification is found with the given name.", async () => {
      const testName = "Certification 2";

      (
        CertificationsService.prototype.getCertificationByName as jest.Mock
      ).mockResolvedValue(null);

      const result =
        await CertificationsController.getCertificationByName(testName);

      expect(result.status).toBe(200);
      expect(result.body).toBe(
        "No Certification fetched with name: " + testName,
      );
    });

    test("It should handle errors when no name parameter is specified", async () => {
      (
        CertificationsService.prototype.getCertificationByName as jest.Mock
      ).mockRejectedValue(new Error("Test"));

      const result =
        await CertificationsController.getCertificationByName(null);

      expect(result.status).toBe(400);
      expect(result.body).toBe("Name is required and should be a string.");
    });

    test("It should handle errors", async () => {
      const testName = "Certification 1";
      (
        CertificationsService.prototype.getCertificationByName as jest.Mock
      ).mockRejectedValue(new Error("Test"));

      const result =
        await CertificationsController.getCertificationByName(testName);

      expect(result.status).toBe(500);
      expect(result.body).toBe(
        "Failed to retrieve certification with name. Name: " +
          testName +
          " - Error: Test",
      );
    });
  });

  describe("getCertificationByID", () => {
    const mockCertification = mockCertifications[0];

    test("It should return the specified certification with given ID on success.", async () => {
      const testID = "1";

      (
        CertificationsService.prototype.getCertificationByID as jest.Mock
      ).mockResolvedValue(mockCertification);

      const result =
        await CertificationsController.getCertificationByID(testID);

      expect(result.status).toBe(200);
      expect(result.body).toEqual(mockCertification);
    });

    test("It should return a message if no certification is found with the given ID.", async () => {
      const testID = "3";

      (
        CertificationsService.prototype.getCertificationByID as jest.Mock
      ).mockResolvedValue(null);

      const result =
        await CertificationsController.getCertificationByID(testID);

      expect(result.status).toBe(200);
      expect(result.body).toBe("No Certification fetched with ID: " + testID);
    });

    test("It should handle errors when no ID parameter is specified", async () => {
      (
        CertificationsService.prototype.getCertificationByID as jest.Mock
      ).mockRejectedValue(
        new Error("Failed to retrieve certification with ID: " + null),
      );

      const result = await CertificationsController.getCertificationByID(null);

      expect(result.status).toBe(400);
      expect(result.body).toBe("ID is required and should be a string.");
    });

    test("It should handle errors", async () => {
      const testID = "1";

      (
        CertificationsService.prototype.getCertificationByID as jest.Mock
      ).mockRejectedValue(new Error("Test"));

      const result =
        await CertificationsController.getCertificationByID(testID);

      expect(result.status).toBe(500);
      expect(result.body).toBe(
        "Failed to retrieve certification with ID. ID: " +
          testID +
          " - Error: Test",
      );
    });
  });

  describe("getCertificationsByInstitution", () => {
    const mockCertification = mockCertifications[0];
    test("It should return the specified certification with given institution on success.", async () => {
      const testInstitution = "Institution 1";

      (
        CertificationsService.prototype
          .getCertificationsByInstitution as jest.Mock
      ).mockResolvedValue(mockCertification);

      const result =
        await CertificationsController.getCertificationsByInstitution(
          testInstitution,
        );

      expect(result.status).toBe(200);
      expect(result.body).toEqual(mockCertification);
    });

    test("It should return a message if no certification is found with the given institution.", async () => {
      const testInstitution = "Institution 2";

      (
        CertificationsService.prototype
          .getCertificationsByInstitution as jest.Mock
      ).mockResolvedValue(null);

      const result =
        await CertificationsController.getCertificationsByInstitution(
          testInstitution,
        );

      expect(result.status).toBe(200);
      expect(result.body).toBe(
        "No Certification fetched with institution: " + testInstitution,
      );
    });

    test("It should handle errors when no institution parameter is specified", async () => {
      (
        CertificationsService.prototype
          .getCertificationsByInstitution as jest.Mock
      ).mockRejectedValue(new Error("Test"));

      const result =
        await CertificationsController.getCertificationsByInstitution(null);

      expect(result.status).toBe(400);
      expect(result.body).toBe(
        "Institution is required and should be a string.",
      );
    });

    test("It should handle errors", async () => {
      const testInstitution = "Institution 1";
      (
        CertificationsService.prototype
          .getCertificationsByInstitution as jest.Mock
      ).mockRejectedValue(new Error("Test"));

      const result =
        await CertificationsController.getCertificationsByInstitution(
          testInstitution,
        );

      expect(result.status).toBe(500);
      expect(result.body).toBe(
        "Failed to retrieve certification with institution. Institution: " +
          testInstitution +
          " - Error: Test",
      );
    });
  });
});
