/**
 * @fileoverview Unit tests for the Educational Records entity.
 *
 * This file contains unit tests for the Educational Records entity, which represents
 * an individual's educational history, including details about the institution, degree,
 * and associated skills. The tests validate the creation of an EducationalRecords object
 * and ensure that all properties are correctly assigned during instantiation.
 *
 * The tests cover the following aspects:
 *
 * - Creation of an EducationalRecords object with valid parameters.
 *
 * The tests verify that the object is defined and that all properties match the expected values
 * based on the input provided during the object's creation.
 *
 * @module EducationalRecordsEntityTest
 */

import EducationalRecords from '../../lib/entities/EducationalRecords';
import { KnowledgeLevelEnumerations } from '../../lib/constants/enumerations/KnowledgeLevelsEnumerations';
import Skills from '../../lib/entities/Skills';

describe('Educational Records Entity', () => {
  test('It should create a new Educational Records object', () => {
    const skill = new Skills(
      '1',
      'JavaScript',
      'A programming language that conforms to the ECMAScript specification.',
      KnowledgeLevelEnumerations.High,
    );
    const educationalRecords = new EducationalRecords(
      '1',
      new Date('2021-07-01'),
      new Date('2021-07-01'),
      'An educational record',
      [skill],
      'institutionName',
      'degree',
      'Location',
    );

    expect(educationalRecords).toBeDefined();
    expect(educationalRecords.id).toBe('1');
    expect(educationalRecords.startDate).toEqual(new Date('2021-07-01'));
    expect(educationalRecords.endDate).toEqual(new Date('2021-07-01'));
    expect(educationalRecords.description).toBe('An educational record');
    expect(educationalRecords.skills).toEqual([skill]);
    expect(educationalRecords.institutionName).toBe('institutionName');
    expect(educationalRecords.degree).toBe('degree');
    expect(educationalRecords.location).toBe('Location');
  });
});
