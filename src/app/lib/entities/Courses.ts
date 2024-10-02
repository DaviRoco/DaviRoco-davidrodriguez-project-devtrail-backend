import Skills from "./Skills";

/**
 * Represents a course with its details.
 *
 * @class Courses
 *
 * @property {string} _id - The unique identifier of the course.
 * @property {string} _name - The name of the course.
 * @property {string} _code - The code of the course.
 * @property {string} _description - A brief description of the course.
 * @property {string} _institution - The institution offering the course.
 * @property {Skills[]} _skills - The skills associated with the course.
 *
 * @constructor
 * @param {string} id - The unique identifier of the course.
 * @param {string} name - The name of the course.
 * @param {string} code - The code of the course.
 * @param {string} description - A brief description of the course.
 * @param {string} institution - The institution offering the course.
 * @param {Skills[]} skills - The skills associated with the course.
 *
 * @method get id
 * @returns {string} The unique identifier of the course.
 *
 * @method get name
 * @returns {string} The name of the course.
 *
 * @method get code
 * @returns {string} The code of the course.
 *
 * @method get description
 * @returns {string} A brief description of the course.
 *
 * @method get institution
 * @returns {string} The institution offering the course.
 *
 * @method get skills
 * @returns {Skills[]} The skills associated with the course.
 */
class Courses {
  _id: string;
  _name: string;
  _code: string;
  _description: string;
  _institution: string;
  _skills: Skills[];

  constructor(
    id: string,
    name: string,
    code: string,
    description: string,
    institution: string,
    skills: Skills[],
  ) {
    this._id = id;
    this._name = name;
    this._code = code;
    this._description = description;
    this._institution = institution;
    this._skills = skills;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get code(): string {
    return this._code;
  }

  get description(): string {
    return this._description;
  }

  get institution(): string {
    return this._institution;
  }

  get skills(): Skills[] {
    return this._skills;
  }
}

export default Courses;
