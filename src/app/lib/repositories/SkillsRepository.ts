/**
 * @file RecordsRepository.ts
 * @description Repository class for managing experience and educational records in the Firestore database.
 */

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
  /**
   * Validates and maps Firestore document data to a Skills entity.
   * @param {DocumentData} docData - The Firestore document data.
   * @param {string} id - The document ID.
   * @throws {Error} If mandatory fields are missing.
   */
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

  /**
   * Retrieves all skills from the skills collection.
   *
   * @returns {Promise<Skills[] | null>} A promise that resolves to an array of skills if found, or null if the collection is empty.
   */
  async getAllSkills(): Promise<Skills[] | null> {
    const skillsSnapshot = await getDocs(skillsCollection);

    if (skillsSnapshot.empty) {
      return null;
    }

    return skillsSnapshot.docs.map((doc) =>
      this.validateAndMapSkill(doc.data(), doc.id),
    );
  }

  /**
   * Retrieves a skill by its name from the skills collection.
   *
   * @param {string} name - The name of the skill to retrieve. Must be a non-empty string.
   * @returns {Promise<Skills | null>} - A promise that resolves to the skill object if found, or null if no matching skill is found.
   * @throws {Error} - Throws an error if the provided name is invalid (not a non-empty string).
   */
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

  /**
   * Retrieves a skill by its ID from the skills collection.
   *
   * @param id - The ID of the skill to retrieve. Must be a non-empty string.
   * @returns A promise that resolves to the skill object if found, or null if not found.
   * @throws {Error} - Throws an error if the provided id is invalid (not a non-empty string).
   */
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

  /**
   * Retrieves a list of skills based on the provided skill IDs.
   *
   * @param ids - An array of skill IDs to fetch the corresponding skills.
   * @returns A promise that resolves to an array of `Skills` objects.
   * @throws {Error} - Throws an error if the skills do not exist.
   */
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

  /**
   * Retrieves all front-end skills from the skills collection.
   *
   * @returns {Promise<Skills[] | null>} A promise that resolves to an array of front-end skills or null if no skills are found.
   *
   * @throws {FirebaseError} If there is an error while querying the database.
   */
  async getAllFrontEndSkills(): Promise<Skills[] | null> {
    const frontEndSkillsQuery = query(
      skillsCollection,
      where('description', '==', 'Front-End'),
    );
    const querySnapshot = await getDocs(frontEndSkillsQuery);

    if (querySnapshot.empty) {
      return null;
    }

    return querySnapshot.docs.map((doc) =>
      this.validateAndMapSkill(doc.data(), doc.id),
    );
  }
  /**
   * Retrieves all back-end skills from the skills collection.
   *
   * @returns {Promise<Skills[] | null>} A promise that resolves to an array of back-end skills or null if no skills are found.
   *
   * @throws {FirebaseError} If there is an error while querying the database.
   */
  async getAllBackEndSkills(): Promise<Skills[] | null> {
    const backEndSkillsQuery = query(
      skillsCollection,
      where('description', '==', 'Back-End'),
    );
    const querySnapshot = await getDocs(backEndSkillsQuery);

    if (querySnapshot.empty) {
      return null;
    }

    return querySnapshot.docs.map((doc) =>
      this.validateAndMapSkill(doc.data(), doc.id),
    );
  }
}

export default SkillsRepository;
