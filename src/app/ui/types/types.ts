export interface Skills {
  _id: string;
  _name: string;
  _description: string;
  _level: string;
}

export interface ExperienceRecords {
  _id: string;
  _startDate: Date;
  _endDate: Date;
  _description: string;
  _skills: Skills[];
  _companyName: string;
  _title: string;
  _location: string;
}

export interface EducationalRecords {
  _id: string;
  _startDate: Date;
  _endDate: Date;
  _description: string;
  _skills: Skills[];
  _institutionName: string;
  _degree: string;
  _location: string;
}

export interface Projects {
  _id: string;
  _name: string;
  _startDate: Date;
  _endDate: Date;
  _description: string;
  _url: string;
  _skills: Skills[];
}

export interface Projects {
  _id: string;
  _name: string;
  _startDate: Date;
  _endDate: Date;
  _description: string;
  _url: string;
  _skills: Skills[];
}