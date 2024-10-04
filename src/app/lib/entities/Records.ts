import Skills from "./Skills";

/**
 * Represents a record with its details.
 *
 * @class Records
 *
 * @property {string} _id - The unique identifier of the record.
 * @property {Date} _startDate - The start date of the record.
 * @property {Date} _endDate - The end date of the record.
 * @property {string} _description - A brief description of the record.
 * @property {Skills[]} _skills - An array of skills associated with the record.
 * @property {string} _location - The location associated with the record.
*
 * @constructor
 * @param {string} id - The unique identifier of the record.
 * @param {Date} startDate - The starting date of the record.
 * @param {Date} endDate - The ending date of the record.
 * @param {string} description - A brief description of the record.
 * @param {Skills[]} skills - The skills associated with the record.
 * @param {string} location - The location associated with the record.
 *
 * @method get id
 * @returns {string} The unique identifier of the record.
 *
 * @method get startDate
 * @returns {Date} The starting date of the record.
 *
 * @method get endDate
 * @returns {Date} The ending date of the record.
 *
 * @method get description
 * @returns {string} A brief description of the record.
 *
 * @method get skills
 * @returns {Skills[]} The skills associated with the record.
 *
 * @method get location
 * @returns {string} The location associated with the record.
 */

class Records {
  _id: string;
  _startDate: Date;
  _endDate: Date;
  _description: string;
  _skills: Skills[];
  _location: string;

  constructor(
    id: string,
    startDate: Date,
    endDate: Date,
    description: string,
    skills: Skills[],
    location: string
  ) {
    this._id = id;
    this._startDate = startDate;
    this._endDate = endDate;
    this._description = description;
    this._skills = skills;
    this._location = location;
  }

  get id() {
    return this._id;
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

  get skills() {
    return this._skills;
  }
}

export default Records;
