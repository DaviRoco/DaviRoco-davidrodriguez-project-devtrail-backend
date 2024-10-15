import { db } from '../../firebase';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  where,
  query,
  DocumentData,
} from 'firebase/firestore';
import Skills from '../entities/Skills';
import { KnowledgeLevelEnumerations } from '../constants/enumerations/KnowledgeLevelsEnumerations';

const skillsCollection = collection(db, 'skills');

class SkillsRepository {
  private validateAndMapSkill(docData: DocumentData, id: string): Skills {
    const { name, description, level } = docData;

    if (!name || !description || !level) {
      throw new Error(`Skill with ID ${id} is missing mandatory fields.`);
    }

    return new Skills(
      id,
      name,
      description,
      level as KnowledgeLevelEnumerations,
    );
  }

  async getAllSkills(): Promise<Skills[]> {
    const skillsSnapshot = await getDocs(skillsCollection);

    return skillsSnapshot.docs.map((doc) =>
      this.validateAndMapSkill(doc.data(), doc.id),
    );
  }

  async getSkillByName(name: string): Promise<Skills | null> {
    if (!name || typeof name !== 'string') {
      throw new Error(
        'Invalid name provided. Name must be a non-empty string.',
      );
    }

    const skillMatchingName = query(
      skillsCollection,
      where('name', '==', name),
    );
    const querySnapshot = await getDocs(skillMatchingName);

    if (querySnapshot.empty) {
      return null;
    }

    const docSnapshot = querySnapshot.docs[0];

    return this.validateAndMapSkill(docSnapshot.data(), docSnapshot.id);
  }

  async getSkillByID(id: string): Promise<Skills | null> {
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid ID provided. ID must be a non-empty string.');
    }

    const skillDoc = doc(skillsCollection, id);
    const docSnapshot = await getDoc(skillDoc);

    if (!docSnapshot.exists()) {
      return null;
    }

    return this.validateAndMapSkill(docSnapshot.data(), docSnapshot.id);
  }

  async getSkillsByIDs(ids: Skills[]): Promise<Skills[]> {
    const skills: Skills[] = [];

    const q = query(skillsCollection, where('__name__', 'in', ids));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot) {
      throw new Error(`Skills are non-existent.`);
    }

    querySnapshot.forEach((doc) => {
      skills.push(this.validateAndMapSkill(doc.data(), doc.id));
    });

    return skills;
  }
}

export default SkillsRepository;
