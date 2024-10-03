import Records from "./Records";
import Skills from "./Skills";
/**
 * Represents an experience record with its details.
 *
 * @class ExperienceRecords with Records as it's parent class
 *
 * @property {string} _id - The unique identifier of the record.
 * @property {Date} _startDate - The start date of the record.
 * @property {Date} _endDate - The end date of the record.
 * @property {string} _description - A brief description of the record.
 * @property {Skills[]} _skills - An array of skills associated with the record.
 * @property {string} _companyName - The name of the company.
 * @property {string} _title - The title of the position.
 * @property {string} _location - The location of the position.
 *
 * @constructor
 * @param {string} id - The unique identifier of the record.
 * @param {Date} startDate - The starting date of the record.
 * @param {Date} endDate - The ending date of the record.
 * @param {string} description - A brief description of the record.
 * @param {Skills[]} skills - The skills associated with the record.
 * @param {string} companyName - The name of the company.
 * @param {string} title - The title of the position.
 * @param {string} location - The location of the position.
 *
 * @method get companyName
 * @returns {string} The name of the company.
 *
 * @method get title
 * @returns {string} The title of the position.
 *
 * @method get location
 * @returns {string} The location of the position.
 */

class ExperienceRecords extends Records {
  _companyName: string;
  _title: string;
  _location: string;

  constructor(
    id: string,
    startDate: Date,
    endDate: Date,
    description: string,
    skills: Skills[],
    companyName: string,
    title: string,
    location: string,
  ) {
    super(id, startDate, endDate, description, skills);
    this._companyName = companyName;
    this._title = title;
    this._location = location;
  }

  get companyName() {
    return this._companyName;
  }

  get title() {
    return this._title;
  }

  get location() {
    return this._location;
  }
}

export default ExperienceRecords;
