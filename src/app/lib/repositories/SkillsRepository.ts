import { db } from "../../firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  where,
  query,
} from "firebase/firestore";
import Skills from "../entities/Skills";
import { KnowledgeLevelEnumerations } from "../constants/enumerations/KnowledgeLevelsEnumerations";

const skillsCollection = collection(db, "skills");

export class SkillsRepository {
  async getAllSkills(): Promise<Skills[]> {
    const skillsSnapshot = await getDocs(skillsCollection);
    const skills = skillsSnapshot.docs.map((doc) => {
      const data = doc.data();

      if (!data.name || !data.level || !data.description) {
        throw new Error(`Skill with ID ${doc.id} is missing mandatory fields.`);
      }

      return new Skills(
        doc.id,
        data.name,
        data.description,
        data.level as KnowledgeLevelEnumerations,
      );
    });

    return skills;
  }

  async getSkillByName(name: string): Promise<Skills | null> {
    if (!name || typeof name !== "string") {
      throw new Error(
        "Invalid name provided. Name must be a non-empty string.",
      );
    }

    const skillMatchingName = query(
      skillsCollection,
      where("name", "==", name),
    );
    const querySnapshot = await getDocs(skillMatchingName);

    if (querySnapshot.empty) {
      return null;
    }

    const docSnapshot = querySnapshot.docs[0];
    const docData = docSnapshot.data();

    if (!docData.name || !docData.level || !docData.description) {
      throw new Error(`Skill with name ${name} is missing mandatory fields.`);
    }

    const skill = new Skills(
      docSnapshot.id,
      docData.name,
      docData.description,
      docData.level as KnowledgeLevelEnumerations,
    );

    return skill;
  }

  async getSkillByID(id: string): Promise<Skills | null> {
    if (!id || typeof id !== "string") {
      throw new Error("Invalid ID provided. ID must be a non-empty string.");
    }

    const skillDoc = doc(skillsCollection, id);
    const docSnapshot = await getDoc(skillDoc);

    if (!docSnapshot.exists()) {
      return null;
    }

    const docData = docSnapshot.data();

    if (!docData.name || !docData.level || !docData.description) {
      throw new Error(`Skill with ID ${id} is missing mandatory fields.`);
    }

    const skill = new Skills(
      docSnapshot.id,
      docData.name,
      docData.description,
      docData.level as KnowledgeLevelEnumerations,
    );

    return skill;
  }

  async getSkillsByID(ids: Skills[]): Promise<Skills[]> {
    const skills: Skills[] = [];

    const q = query(skillsCollection, where("__name__", "in", ids));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const skillData = doc.data();
      skills.push(
        new Skills(
          doc.id,
          skillData.name,
          skillData.description,
          skillData.level,
        ),
      );
    });

    return skills;
  }
}

export default SkillsRepository;
