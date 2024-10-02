import Skills from "./Skills";

/**
 * Represents a certification entity.
 *
 * @class Certifications
 *
 * @property {string} _id - The unique identifier for the certification.
 * @property {string} _name - The name of the certification.
 * @property {string} _institution - The institution that issued the certification.
 * @property {Date} _date - The date the certification was issued.
 * @property {string} _credentialID - The credential ID of the certification.
 * @property {string} _url - The URL to the certification.
 * @property {Skills[]} _skills - The skills associated with the certification.
 *
 * @constructor
 * @param {string} id - The unique identifier for the certification.
 * @param {string} name - The name of the certification.
 * @param {string} institution - The institution that issued the certification.
 * @param {Date} date - The date the certification was issued.
 * @param {string} credentialID - The credential ID of the certification.
 * @param {string} url - The URL to the certification.
 * @param {Skills[]} skills - The skills associated with the certification.
 *
 * @method get id
 * @returns {string} - The unique identifier for the certification.
 *
 * @method get name
 * @returns {string} - The name of the certification.
 *
 * @method get institution
 * @returns {string} - The institution that issued the certification.
 *
 * @method get date
 * @returns {Date} - The date the certification was issued.
 *
 * @method get credentialID
 * @returns {string} - The credential ID of the certification.
 *
 * @method get url
 * @returns {string} - The URL to the certification.
 *
 * @method get skills
 * @returns {Skills[]} - The skills associated with the certification.
 */
class Certifications {
  _id: string;
  _name: string;
  _institution: string;
  _date: Date;
  _credentialID: string;
  _url: string;
  _skills: Skills[];

  constructor(
    id: string,
    name: string,
    institution: string,
    date: Date,
    credentialID: string,
    url: string,
    skills: Skills[],
  ) {
    this._id = id;
    this._name = name;
    this._institution = institution;
    this._date = date;
    this._credentialID = credentialID;
    this._url = url;
    this._skills = skills;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get institution(): string {
    return this._institution;
  }

  get date(): Date {
    return this._date;
  }

  get credentialID(): string {
    return this._credentialID;
  }

  get url(): string {
    return this._url;
  }

  get skills(): Skills[] {
    return this._skills;
  }
}

export default Certifications;
