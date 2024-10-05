import ExperienceRecords from "../../lib/entities/ExperienceRecords";
import { KnowledgeLevelEnumerations } from "../../lib/constants/enumerations/KnowledgeLevelsEnumerations";
import Skills from "../../lib/entities/Skills";

describe("Experience Records Entity", () => {
  test("It should create a new Experience Records object", () => {
    const skill = new Skills(
      "1",
      "JavaScript",
      "A programming language that conforms to the ECMAScript specification.",
      KnowledgeLevelEnumerations.High,
    );
    const experienceRecords = new ExperienceRecords(
      "1",
      new Date("2021-07-01"),
      new Date("2021-07-01"),
      "An experience record",
      [skill],
      "companyName",
      "title",
      "Location",
    );

    expect(experienceRecords).toBeDefined();
    expect(experienceRecords.id).toBe("1");
    expect(experienceRecords.startDate).toEqual(new Date("2021-07-01"));
    expect(experienceRecords.endDate).toEqual(new Date("2021-07-01"));
    expect(experienceRecords.description).toBe("An experience record");
    expect(experienceRecords.skills).toEqual([skill]);
    expect(experienceRecords.companyName).toBe("companyName");
    expect(experienceRecords.title).toBe("title");
    expect(experienceRecords.location).toBe("Location");
  });
});
