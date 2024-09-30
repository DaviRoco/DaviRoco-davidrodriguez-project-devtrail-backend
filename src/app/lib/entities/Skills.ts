import { KnowledgeLevelEnumerations } from "../constants/enumerations/KnowledgeLevelsEnumerations";

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

  public get id() {
    return this._id;
  }

  public get name() {
    return this._name;
  }

  public get description() {
    return this._description;
  }

  public get level() {
    return this._level;
  }
}

export default Skills;
