import { SkillsService } from "../../lib/services/SkillsService";
import SkillsRepository from "../../lib/repositories/SkillsRepository";
import Skills from "../../lib/entities/Skills";
import { KnowledgeLevelEnumerations } from "../../lib/constants/enumerations/KnowledgeLevelsEnumerations";

jest.mock("../../lib/repositories/SkillsRepository");

describe("Skills Service", () => {
  let skillsService: SkillsService;
  let skillsRepository: jest.Mocked<SkillsRepository>;

  beforeEach(() => {
    skillsRepository = new SkillsRepository() as jest.Mocked<SkillsRepository>;
    skillsService = new SkillsService(skillsRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockSkills = [
    new Skills(
      "1",
      "TypeScript",
      "Strong in TypeScript",
      KnowledgeLevelEnumerations.High,
    ),
    new Skills(
      "2",
      "JavaScript",
      "Experienced in JavaScript",
      KnowledgeLevelEnumerations.Mid,
    ),
  ];

  describe("getAllSkills", () => {
    test("It should return all skills when repository returns skills", async () => {
      skillsRepository.getAllSkills.mockResolvedValue(mockSkills);

      const result = await skillsService.getAllSkills();

      expect(result).toEqual(mockSkills);
      expect(skillsRepository.getAllSkills).toHaveBeenCalledTimes(1);
    });
  });

  describe("getSkillsByName", () => {
    test("It should return the skills when the repository returns it by name", async () => {
      const testName = "TypeScript";
      skillsRepository.getSkillByName.mockResolvedValue(mockSkills[0]);

      const result = await skillsService.getSkillByName(testName);

      expect(result).toEqual(mockSkills[0]);
      expect(skillsRepository.getSkillByName).toHaveBeenCalledTimes(1);
    });
  });
  describe("getSkillsByName", () => {
    test("It should return the skills when the repository returns it by ID", async () => {
      const testID = "2";
      skillsRepository.getSkillByID.mockResolvedValue(mockSkills[1]);

      const result = await skillsService.getSkillByID(testID);

      expect(result).toEqual(mockSkills[1]);
      expect(skillsRepository.getSkillByID).toHaveBeenCalledTimes(1);
    });
  });
});
