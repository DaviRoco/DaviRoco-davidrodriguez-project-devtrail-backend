import Skills from "./Skills";

class Projects {
  _id: string;
  _name: string;
  _startDate: Date;
  _endDate: Date;
  _description: string;
  _url: URL;
  _skills: Skills[];

  constructor(
    id: string,
    name: string,
    startDate: Date,
    endDate: Date,
    description: string,
    url: URL,
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

  public get id() {
    return this._id;
  }

  public get name() {
    return this._name;
  }

  public get startDate() {
    return this._startDate;
  }

  public get endDate() {
    return this._endDate;
  }

  public get description() {
    return this._description;
  }

  public get url() {
    return this._url;
  }

  public get skills() {
    return this._skills;
  }
}

export default Projects;
