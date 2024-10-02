import { KnowledgeLevelEnumerations } from "../constants/enumerations/KnowledgeLevelsEnumerations";

/**
 * Represents a skill with its details.
 *
 * @class Skills
 *
 * @property {string} _id - The unique identifier of the skill.
 * @property {string} _name - The name of the skill.
 * @property {string} [_description] - A brief description of the skill (optional).
 * @property {KnowledgeLevelEnumerations} _level - The knowledge level of the skill.
 *
 * @constructor
 * @param {string} id - The unique identifier of the skill.
 * @param {string} name - The name of the skill.
 * @param {string} description - A brief description of the skill.
 * @param {KnowledgeLevelEnumerations} level - The knowledge level of the skill.
 *
 * @method get id
 * @returns {string} The unique identifier of the skill.
 *
 * @method get name
 * @returns {string} The name of the skill.
 *
 * @method get description
 * @returns {string} A brief description of the skill.
 *
 * @method get level
 * @returns {KnowledgeLevelEnumerations} The knowledge level of the skill.
 */
class Skills {
  _id: string;
  _name: string;
  _description?: string;
  _level: KnowledgeLevelEnumerations;

  constructor(
    id: string,
    name: string,
    description: string,
    level: KnowledgeLevelEnumerations,
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._level = level;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get level() {
    return this._level;
  }
}

export default Skills;
