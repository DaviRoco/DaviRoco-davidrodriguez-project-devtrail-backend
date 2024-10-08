import { db } from "../../firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  where,
  query,
  Timestamp,
} from "firebase/firestore";
import { RecordsRepository } from "../../lib/repositories/RecordsRepository";

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

describe("Records Repository", () => {
  let repository: RecordsRepository;

  const mockExperienceRecords = [
    {
      id: "1",
      startDate: Timestamp.fromDate(new Date("2021-01-01")),
      endDate: Timestamp.fromDate(new Date("2021-12-31")),
      description: "A description of the experience record.",
      skills: [
        {
          id: "1",
          name: "JavaScript",
          description:
            "A programming language that conforms to the ECMAScript specification.",
          level: "High",
        },
        {
          id: "2",
          name: "TypeScript",
          description: "A strict syntactical superset of JavaScript.",
          level: "High",
        },
      ],
      companyName: "Company Name",
      title: "Job Title",
      location: "Location",
    },
    {
      id: "2",
      startDate: Timestamp.fromDate(new Date("2021-01-01")),
      endDate: Timestamp.fromDate(new Date("2021-12-31")),
      description: "A description of the experience record.",
      skills: [
        {
          id: "1",
          name: "JavaScript",
          description:
            "A programming language that conforms to the ECMAScript specification.",
          level: "High",
        },
        {
          id: "2",
          name: "TypeScript",
          description: "A strict syntactical superset of JavaScript.",
          level: "High",
        },
      ],
      companyName: "Company Name",
      title: "Job Title",
      location: "Location",
    },
  ];

  const mockEducationalRecords = [
    {
      id: "1",
      startDate: Timestamp.fromDate(new Date("2021-01-01")),
      endDate: Timestamp.fromDate(new Date("2021-12-31")),
      description: "A description of the educational record.",
      skills: [
        {
          id: "1",
          name: "JavaScript",
          description:
            "A programming language that conforms to the ECMAScript specification.",
          level: "High",
        },
        {
          id: "2",
          name: "TypeScript",
          description: "A strict syntactical superset of JavaScript.",
          level: "High",
        },
      ],
      institutionName: "Institution Name",
      degree: "Degree",
      location: "Location",
    },
    {
      id: "2",
      startDate: Timestamp.fromDate(new Date("2021-01-01")),
      endDate: Timestamp.fromDate(new Date("2021-12-31")),
      description: "A description of the educational record.",
      skills: [
        {
          id: "1",
          name: "JavaScript",
          description:
            "A programming language that conforms to the ECMAScript specification.",
          level: "High",
        },
        {
          id: "2",
          name: "TypeScript",
          description: "A strict syntactical superset of JavaScript.",
          level: "High",
        },
      ],
      institutionName: "Institution Name",
      degree: "Degree",
      location: "Location",
    },
  ];

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("It should not allow an unknown record collection name.", () => {
    expect(() => {
      repository = new RecordsRepository("Work");
    }).toThrow("Invalid record type provided.");
  });

  describe("getAllExperienceRecords", () => {
    test("It should retrieve all experience records.", async () => {
      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: mockExperienceRecords.map((record) => ({
          id: record.id,
          data: () => record,
        })),
      });

      repository = new RecordsRepository("experience");
      const records = await repository.getAllExperienceRecords();
      expect(records.length).toBe(2);
      expect(records[0].companyName).toBe("Company Name");
      expect(records[1].title).toBe("Job Title");
    });

    test("It should handle errors when mandatory fields are missing.", async () => {
      const incompleteRecords = [
        {
          id: "1",
          startDate: Timestamp.fromDate(new Date("2021-01-01")),
          endDate: Timestamp.fromDate(new Date("2021-12-31")),
          description: "A description of the experience record.",
          skills: [
            {
              id: "1",
              name: "JavaScript",
              description:
                "A programming language that conforms to the ECMAScript specification.",
              level: "High",
            },
            {
              id: "2",
              name: "TypeScript",
              description: "A strict syntactical superset of JavaScript.",
              level: "High",
            },
          ],
          companyName: "",
          title: "Job Title",
          location: "Location",
        },
        {
          id: "2",
          startDate: Timestamp.fromDate(new Date("2021-01-01")),
          endDate: Timestamp.fromDate(new Date("2021-12-31")),
          description: "A description of the experience record.",
          skills: [
            {
              id: "1",
              name: "JavaScript",
              description:
                "A programming language that conforms to the ECMAScript specification.",
              level: "High",
            },
            {
              id: "2",
              name: "TypeScript",
              description: "A strict syntactical superset of JavaScript.",
              level: "High",
            },
          ],
          companyName: "Company Name",
          title: "",
          location: "Location",
        },
      ];

      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: incompleteRecords.map((record) => ({
          id: record.id,
          data: () => record,
        })),
      });

      repository = new RecordsRepository("experience");
      await expect(repository.getAllExperienceRecords()).rejects.toThrow(
        "Experience record with ID 1 is missing mandatory fields.",
      );
    });
  });

  describe("getAllEducationalRecords", () => {
    test("It should retrieve all educational records.", async () => {
      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: mockEducationalRecords.map((record) => ({
          id: record.id,
          data: () => record,
        })),
      });

      repository = new RecordsRepository("education");
      const records = await repository.getAllEducationalRecords();
      expect(records.length).toBe(2);
      expect(records[0].institutionName).toBe("Institution Name");
      expect(records[1].degree).toBe("Degree");
    });

    test("It should handle errors when mandatory fields are missing.", async () => {
      const incompleteRecords = [
        {
          id: "1",
          startDate: Timestamp.fromDate(new Date("2021-01-01")),
          endDate: Timestamp.fromDate(new Date("2021-12-31")),
          description: "A description of the educational record.",
          skills: [
            {
              id: "1",
              name: "JavaScript",
              description:
                "A programming language that conforms to the ECMAScript specification.",
              level: "High",
            },
            {
              id: "2",
              name: "TypeScript",
              description: "A strict syntactical superset of JavaScript.",
              level: "High",
            },
          ],
          institutionName: "",
          degree: "Degree",
          location: "Location",
        },
        {
          id: "2",
          startDate: Timestamp.fromDate(new Date("2021-01-01")),
          endDate: Timestamp.fromDate(new Date("2021-12-31")),
          description: "A description of the educational record.",
          skills: [
            {
              id: "1",
              name: "JavaScript",
              description:
                "A programming language that conforms to the ECMAScript specification.",
              level: "High",
            },
            {
              id: "2",
              name: "TypeScript",
              description: "A strict syntactical superset of JavaScript.",
              level: "High",
            },
          ],
          institutionName: "Institution Name",
          degree: "",
          location: "Location",
        },
      ];

      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: incompleteRecords.map((record) => ({
          id: record.id,
          data: () => record,
        })),
      });

      repository = new RecordsRepository("education");
      await expect(repository.getAllEducationalRecords()).rejects.toThrow(
        "Educational record with ID 1 is missing mandatory fields.",
      );
    });
  });

  describe("getExperienceRecordByID", () => {
    test("It should retrieve an experience record by ID.", async () => {
      const testID = "1";

      (doc as jest.Mock).mockReturnValueOnce(testID);
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => true,
        id: testID,
        data: () => mockExperienceRecords[0],
      });

      repository = new RecordsRepository("experience");
      const record = await repository.getExperienceRecordByID(testID);
      expect(record?.companyName).toBe("Company Name");
      expect(record?.title).toBe("Job Title");
    });

    test("It should return null when the record does not exist.", async () => {
      const testID = "3";

      (doc as jest.Mock).mockReturnValueOnce(testID);
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => false,
      });

      repository = new RecordsRepository("experience");
      const record = await repository.getExperienceRecordByID(testID);
      expect(record).toBeNull();
    });

    test("It should handle errors when an invalid ID is provided.", async () => {
      const testID = "";

      repository = new RecordsRepository("experience");
      await expect(repository.getExperienceRecordByID(testID)).rejects.toThrow(
        "Invalid ID provided. ID must be a non-empty string.",
      );
    });

    test("It should handle errors when mandatory fields are missing.", async () => {
      const testID = "2";

      (doc as jest.Mock).mockReturnValueOnce(testID);
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => true,
        id: testID,
        data: () => ({
          id: testID,
          startDate: Timestamp.fromDate(new Date("2021-01-01")),
          endDate: Timestamp.fromDate(new Date("2021-12-31")),
          description: "A description of the experience record.",
          skills: [
            {
              id: "1",
              name: "JavaScript",
              description:
                "A programming language that conforms to the ECMAScript specification.",
              level: "High",
            },
            {
              id: "2",
              name: "TypeScript",
              description: "A strict syntactical superset of JavaScript.",
              level: "High",
            },
          ],
          companyName: "",
          title: "Job Title",
          location: "Location",
        }),
      });

      repository = new RecordsRepository("experience");
      await expect(repository.getExperienceRecordByID(testID)).rejects.toThrow(
        "Experience record with ID 2 is missing mandatory fields.",
      );
    });
  });

  describe("getEducationalRecordByID", () => {
    test("It should retrieve an educational record by ID.", async () => {
      const testID = "1";

      (doc as jest.Mock).mockReturnValueOnce(testID);
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => true,
        id: testID,
        data: () => mockEducationalRecords[0],
      });

      repository = new RecordsRepository("education");
      const record = await repository.getEducationalRecordByID(testID);
      expect(record?.institutionName).toBe("Institution Name");
      expect(record?.degree).toBe("Degree");
    });

    test("It should return null when the record does not exist.", async () => {
      const testID = "3";

      (doc as jest.Mock).mockReturnValueOnce(testID);
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => false,
      });

      repository = new RecordsRepository("experience");
      const record = await repository.getEducationalRecordByID(testID);
      expect(record).toBeNull();
    });

    test("It should handle errors when an invalid ID is provided.", async () => {
      const testID = "";

      repository = new RecordsRepository("experience");
      await expect(repository.getEducationalRecordByID(testID)).rejects.toThrow(
        "Invalid ID provided. ID must be a non-empty string.",
      );
    });

    test("It should handle errors when mandatory fields are missing.", async () => {
      const testID = "2";

      (doc as jest.Mock).mockReturnValueOnce(testID);
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => true,
        id: testID,
        data: () => ({
          id: testID,
          startDate: Timestamp.fromDate(new Date("2021-01-01")),
          endDate: Timestamp.fromDate(new Date("2021-12-31")),
          description: "A description of the educational record.",
          skills: [
            {
              id: "1",
              name: "JavaScript",
              description:
                "A programming language that conforms to the ECMAScript specification.",
              level: "High",
            },
            {
              id: "2",
              name: "TypeScript",
              description: "A strict syntactical superset of JavaScript.",
              level: "High",
            },
          ],
          institutionName: "",
          degree: "Degree",
          location: "Location",
        }),
      });

      repository = new RecordsRepository("experience");
      await expect(repository.getEducationalRecordByID(testID)).rejects.toThrow(
        "Educational record with ID 2 is missing mandatory fields.",
      );
    });
  });
});
