import Skills from "../../lib/entities/Skills";
import { KnowledgeLevelEnumerations } from "../../lib/constants/enumerations/KnowledgeLevelsEnumerations";

describe("Skills Entity", () => {
  test("It should create a new Skills object", () => {
    const skills = new Skills(
      "1",
      "JavaScript",
      "A programming language that conforms to the ECMAScript specification.",
      KnowledgeLevelEnumerations.High,
    );
    expect(skills).toBeDefined();
    expect(skills.id).toBe("1");
    expect(skills.name).toBe("JavaScript");
    expect(skills.description).toBe(
      "A programming language that conforms to the ECMAScript specification.",
    );
    expect(skills.level).toBe(KnowledgeLevelEnumerations.High);
  });
});
