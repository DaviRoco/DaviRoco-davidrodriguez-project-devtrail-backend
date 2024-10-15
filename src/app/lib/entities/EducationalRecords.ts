import Records from './Records';
import Skills from './Skills';
/**
 * Represents an educational record with its details.
 *
 * @class EducationalRecords
 * @extends {Records}
 *
 * @property {string} _institutionName - The name of the educational institution.
 * @property {string} _degree - The degree obtained.
 *
 * @constructor
 * @param {string} id - The unique identifier of the record.
 * @param {Date} startDate - The starting date of the record.
 * @param {Date} endDate - The ending date of the record.
 * @param {string} description - A brief description of the record.
 * @param {Skills[]} skills - The skills associated with the record.
 * @param {string} institutionName - The name of the educational institution.
 * @param {string} degree - The degree obtained.
 * @param {string} location - The location associated with the record.
 *
 * @method get institutionName
 * @returns {string} The name of the educational institution.
 *
 * @method get degree
 * @returns {string} The degree obtained.
 */

class EducationalRecords extends Records {
  _institutionName: string;
  _degree: string;

  constructor(
    id: string,
    startDate: Date,
    endDate: Date,
    description: string,
    skills: Skills[],
    institutionName: string,
    degree: string,
    location: string,
  ) {
    super(id, startDate, endDate, description, skills, location);
    this._institutionName = institutionName;
    this._degree = degree;
  }

  get institutionName() {
    return this._institutionName;
  }

  get degree() {
    return this._degree;
  }
}

export default EducationalRecords;
