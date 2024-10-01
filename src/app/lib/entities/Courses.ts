import Skills from "./Skills";

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
