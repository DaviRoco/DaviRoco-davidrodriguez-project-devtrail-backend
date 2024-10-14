import { RecordsService } from "../../lib/services/RecordsService";
import { RecordsRepository } from "../../lib/repositories/RecordsRepository";
import Records from "../../lib/entities/Records";
import ExperienceRecords from "../../lib/entities/ExperienceRecords";
import EducationalRecords from "../../lib/entities/EducationalRecords";
import { KnowledgeLevelEnumerations } from "../../lib/constants/enumerations/KnowledgeLevelsEnumerations";
import Skills from "../../lib/entities/Skills";
import SkillsFiller from "../../lib/services/utils/SkillsFiller";
import SkillsRepository from "../../lib/repositories/SkillsRepository";

jest.mock("../../lib/repositories/RecordsRepository");
jest.mock("../../lib/repositories/SkillsRepository");

describe("Records Service", () => {
  let recordsService: RecordsService;
  let recordsRepository: jest.Mocked<RecordsRepository>;
  let skillsRepository: jest.Mocked<SkillsRepository>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockExperienceRecords = [
    new ExperienceRecords(
      "1",
      new Date("2021-01-01"),
      new Date("2021-12-31"),
      "A description of the experience record.",
      [
        new Skills(
          "1",
          "JavaScript",
          "A programming language that conforms to the ECMAScript specification.",
          KnowledgeLevelEnumerations.High,
        ),
        new Skills(
          "2",
          "TypeScript",
          "A strict syntactical superset of JavaScript.",
          KnowledgeLevelEnumerations.High,
        ),
      ],
      "Company Name",
      "Job Title",
      "Location",
    ),
    new ExperienceRecords(
      "2",
      new Date("2021-01-01"),
      new Date("2021-12-31"),
      "A description of the experience record.",
      [
        new Skills(
          "1",
          "JavaScript",
          "A programming language that conforms to the ECMAScript specification.",
          KnowledgeLevelEnumerations.High,
        ),
        new Skills(
          "2",
          "TypeScript",
          "A strict syntactical superset of JavaScript.",
          KnowledgeLevelEnumerations.High,
        ),
      ],
      "Company Name",
      "Job Title",
      "Location",
    ),
  ];

  const mockExperienceObjects = [
    {
      _companyName: mockExperienceRecords[0]._companyName,
      _title: mockExperienceRecords[0]._title,
      _id: mockExperienceRecords[0]._id,
      _startDate: mockExperienceRecords[0]._startDate,
      _endDate: mockExperienceRecords[0]._endDate,
      _description: mockExperienceRecords[0]._description,
      _location: mockExperienceRecords[0]._location,
    } as Omit<ExperienceRecords, "skills">,
    {
      _companyName: mockExperienceRecords[1]._companyName,
      _title: mockExperienceRecords[1]._title,
      _id: mockExperienceRecords[1]._id,
      _startDate: mockExperienceRecords[1]._startDate,
      _endDate: mockExperienceRecords[1]._endDate,
      _description: mockExperienceRecords[1]._description,
      _location: mockExperienceRecords[1]._location,
    } as Omit<ExperienceRecords, "skills">,
  ];

  describe("getAllExperienceRecords", () => {
    test("It should return all experience records when repository returns records", async () => {
      skillsRepository =
        new SkillsRepository() as jest.Mocked<SkillsRepository>;
      recordsRepository = new RecordsRepository(
        "experience",
      ) as jest.Mocked<RecordsRepository>;
      recordsService = new RecordsService(recordsRepository, "experience");

      skillsRepository.getSkillsByID = jest.fn().mockResolvedValue([
        {
          id: "1",
          name: "JavaScript",
          description:
            "A programming language that conforms to the ECMAScript specification.",
          knowledgeLevel: KnowledgeLevelEnumerations.High,
        },
        {
          id: "2",
          name: "TypeScript",
          description: "A strict syntactical superset of JavaScript.",
          knowledgeLevel: KnowledgeLevelEnumerations.High,
        },
      ]);

      recordsRepository.getAllExperienceRecords.mockResolvedValue(
        mockExperienceRecords,
      );

      const result = await recordsService.getAllExperienceRecords();

      expect(result).toEqual(mockExperienceObjects);
      expect(recordsRepository.getAllExperienceRecords).toHaveBeenCalledTimes(
        1,
      );
    });
  });
});
