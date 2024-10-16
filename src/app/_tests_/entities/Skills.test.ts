/**
 * @fileoverview Unit tests for the Skills entity.
 *
 * This file contains unit tests for the Skills entity, which represents
 * an individual's skill, including its ID, name, description, and
 * knowledge level. The tests verify the correct instantiation of a
 * Skills object and ensure that all properties are accurately assigned.
 *
 * The tests cover the following aspects:
 *
 * - Creation of a Skills object with valid parameters.
 *
 * The tests ensure that the object is defined and that each property matches
 * the expected values provided during the creation of the Skills instance.
 *
 * @module SkillsEntityTest
 */

import Skills from '../../lib/entities/Skills';
import { KnowledgeLevelEnumerations } from '../../lib/constants/enumerations/KnowledgeLevelsEnumerations';

describe('Skills Entity', () => {
  test('It should create a new Skills object', () => {
    const skills = new Skills(
      '1',
      'JavaScript',
      'A programming language that conforms to the ECMAScript specification.',
      KnowledgeLevelEnumerations.High,
    );
    expect(skills).toBeDefined();
    expect(skills.id).toBe('1');
    expect(skills.name).toBe('JavaScript');
    expect(skills.description).toBe(
      'A programming language that conforms to the ECMAScript specification.',
    );
    expect(skills.level).toBe(KnowledgeLevelEnumerations.High);
  });
});
