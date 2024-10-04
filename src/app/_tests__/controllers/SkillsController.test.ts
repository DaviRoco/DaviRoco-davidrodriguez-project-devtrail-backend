import { KnowledgeLevelEnumerations } from "../../lib/constants/enumerations/KnowledgeLevelsEnumerations";
import SkillsController from "../../lib/controllers/SkillsController";
import { SkillsService } from "../../lib/services/SkillsService";

jest.mock("../../lib/services/SkillsService");

describe("Skills Controller", () => {
  const mockSkills = [
    {
      id: "1",
      name: "Typescript",
      description: "Programming Language",
      level: KnowledgeLevelEnumerations.High,
    },
    {
      id: "2",
      name: "C#",
      description: "Programming Language",
      level: KnowledgeLevelEnumerations.Mid,
    },
  ];

  describe("getAllSkills", () => {
    test("It should return all skills on success.", async () => {
      (SkillsService.prototype.getAllSkills as jest.Mock).mockResolvedValue(
        mockSkills,
      );

      const result = await SkillsController.getAllSkills();

      expect(result.status).toBe(200);
      expect(result.body).toEqual(mockSkills);
    });

    test("It should handle errors", async () => {
      (SkillsService.prototype.getAllSkills as jest.Mock).mockRejectedValue(
        new Error("Failed to retrieve skills"),
      );

      const result = await SkillsController.getAllSkills();

      expect(result.status).toBe(500);
      expect(result.body).toBe("Failed to retrieve skills");
    });
  });

  describe("getSkillByName", () => {
    const mockSkill = mockSkills[0];
    test("It should return the specified skill with given name on success.", async () => {
      const testName = "Typescript";

      (SkillsService.prototype.getSkillByName as jest.Mock).mockResolvedValue(
        mockSkill,
      );

      const result = await SkillsController.getSkillByName(testName);

      expect(result.status).toBe(200);
      expect(result.body).toEqual(mockSkill);
    });

    test("It should return a message if no skill is found with the given name.", async () => {
      const testName = "Javascript";

      (SkillsService.prototype.getSkillByName as jest.Mock).mockResolvedValue(
        null,
      );

      const result = await SkillsController.getSkillByName(testName);

      expect(result.status).toBe(200);
      expect(result.body).toBe("No Skill fetched with name: " + testName);
    });

    test("It should handle errors when no name parameter is specified", async () => {
      (SkillsService.prototype.getSkillByName as jest.Mock).mockRejectedValue(
        new Error("Failed to retrieve skills"),
      );

      const result = await SkillsController.getSkillByName("");

      expect(result.status).toBe(400);
      expect(result.body).toBe("Name is required and should be a string.");
    });

    test("It should handle errors", async () => {
      const testName = "Typescript";

      (SkillsService.prototype.getSkillByName as jest.Mock).mockRejectedValue(
        new Error(
          "Failed to retrieve skill with name. Name: " +
            testName +
            " is not defined",
        ),
      );

      const result = await SkillsController.getSkillByName(testName);

      expect(result.status).toBe(500);
      expect(result.body).toBe(
        "Failed to retrieve skill with name. Name: " +
          testName +
          " is not defined",
      );
    });
  });

  describe("getSkillByID", () => {
    const mockSkill = mockSkills[0];
    test("It should return the specified skill with given id on success.", async () => {
      const testID = "1";

      (SkillsService.prototype.getSkillByID as jest.Mock).mockResolvedValue(
        mockSkill,
      );

      const result = await SkillsController.getSkillByID(testID);

      expect(result.status).toBe(200);
      expect(result.body).toEqual(mockSkill);
    });

    test("It should return a message if no skill is found with the given id.", async () => {
      const testID = "1";

      (SkillsService.prototype.getSkillByID as jest.Mock).mockResolvedValue(
        null,
      );

      const result = await SkillsController.getSkillByID(testID);

      expect(result.status).toBe(200);
      expect(result.body).toBe("No Skill fetched with ID: " + testID);
    });

    test("It should handle errors when no id parameter is specified", async () => {
      (SkillsService.prototype.getSkillByID as jest.Mock).mockRejectedValue(
        new Error("Failed to retrieve skills"),
      );

      const result = await SkillsController.getSkillByID("");

      expect(result.status).toBe(400);
      expect(result.body).toBe("ID is required and should be a string.");
    });

    test("It should handle errors", async () => {
      const testID = "1";

      (SkillsService.prototype.getSkillByID as jest.Mock).mockRejectedValue(
        new Error(
          "Failed to retrieve skill with ID. ID: " + testID + " is not defined",
        ),
      );

      const result = await SkillsController.getSkillByID(testID);

      expect(result.status).toBe(500);
      expect(result.body).toBe(
        "Failed to retrieve skill with ID. ID: " + testID + " is not defined",
      );
    });
  });
});
