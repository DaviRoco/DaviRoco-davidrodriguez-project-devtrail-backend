import Skills from "./Skills";
/**
 * Represents a project with its details.
 *
 * @class Projects
 *
 * @property {string} _id - The unique identifier of the project.
 * @property {string} _name - The name of the project.
 * @property {Date} _startDate - The starting date of the project.
 * @property {Date} _endDate - The ending date of the project.
 * @property {string} _description - A brief description of the project.
 * @property {URL} _url - The URL of the project.
 * @property {Skills[]} _skills - The skills associated with the project.
 *
 * @constructor
 * @param {string} id - The unique identifier of the project.
 * @param {string} name - The name of the project.
 * @param {Date} startDate - The starting date of the project.
 * @param {Date} endDate - The ending date of the project.
 * @param {string} description - A brief description of the project.
 * @param {URL} url - The URL of the project.
 * @param {Skills[]} skills - The skills associated with the project.
 *
 * @method get id
 * @returns {string} The unique identifier of the project.
 *
 * @method get name
 * @returns {string} The name of the project.
 *
 * @method get startDate
 * @returns {Date} The starting date of the project.
 *
 * @method get endDate
 * @returns {Date} The ending date of the project.
 *
 * @method get description
 * @returns {string} A brief description of the project.
 *
 * @method get url
 * @returns {URL} The URL of the project.
 *
 * @method get skills
 * @returns {Skills[]} The skills associated with the project.
 */
class Projects {
  _id: string;
  _name: string;
  _startDate: Date;
  _endDate: Date;
  _description: string;
  _url: string;
  _skills: Skills[];

  constructor(
    id: string,
    name: string,
    startDate: Date,
    endDate: Date,
    description: string,
    url: string,
    skills: Skills[],
  ) {
    this._id = id;
    this._name = name;
    this._startDate = startDate;
    this._endDate = endDate;
    this._description = description;
    this._url = url;
    this._skills = skills;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get startDate() {
    return this._startDate;
  }

  get endDate() {
    return this._endDate;
  }

  get description() {
    return this._description;
  }

  get url() {
    return this._url;
  }

  get skills() {
    return this._skills;
  }
}

export default Projects;
