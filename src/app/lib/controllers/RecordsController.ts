import { RecordsService } from "../services/RecordsService";
import { RecordsRepository } from "../repositories/RecordsRepository";
import ResponseData from "../constants/api/ResponseData";
import ExperienceRecords from "../entities/ExperienceRecords";
import EducationalRecords from "../entities/EducationalRecords";

export const getAllExperienceRecords = async (): Promise<
  ResponseData<ExperienceRecords[]> | ResponseData<string>
> => {
  try {
    const recordsRepository = new RecordsRepository("experience");
    const recordsService = new RecordsService(recordsRepository, "experience");
    const records =
      (await recordsService.getAllExperienceRecords()) as ExperienceRecords[];
    if (!records) {
      return new ResponseData(200, "No Experience records fetched");
    }
    return new ResponseData(200, records);
  } catch (error) {
    return new ResponseData(
      500,
      "Failed to retrieve experience records - " + error,
    );
  }
};

export const getAllEducationalRecords = async (): Promise<
  ResponseData<EducationalRecords[]> | ResponseData<string>
> => {
  try {
    const recordsRepository = new RecordsRepository("education");
    const recordsService = new RecordsService(recordsRepository, "education");
    const records =
      (await recordsService.getAllEducationalRecords()) as EducationalRecords[];
    if (!records) {
      return new ResponseData(200, "No Educational records fetched");
    }
    return new ResponseData(200, records);
  } catch (error) {
    return new ResponseData(
      500,
      "Failed to retrieve educational records - " + error,
    );
  }
};

export const getExperienceRecordByID = async (
  id: string | null,
): Promise<ResponseData<ExperienceRecords | null> | ResponseData<string>> => {
  if (!id || typeof id !== "string") {
    return new ResponseData(400, "ID is required and should be a string.");
  }

  try {
    const recordsRepository = new RecordsRepository("experience");
    const recordsService = new RecordsService(recordsRepository, "experience");
    const record = (await recordsService.getExperienceRecordByID(
      id,
    )) as ExperienceRecords;
    if (record) {
      return new ResponseData(200, record);
    } else {
      return new ResponseData(
        200,
        "No Experience record fetched with ID: " + id,
      );
    }
  } catch (error) {
    return new ResponseData(
      500,
      "Failed to retrieve experience record with ID: " + id + " - " + error,
    );
  }
};

export const getEducationalRecordByID = async (
  id: string | null,
): Promise<ResponseData<EducationalRecords | null> | ResponseData<string>> => {
  if (!id || typeof id !== "string") {
    return new ResponseData(400, "ID is required and should be a string.");
  }

  try {
    const recordsRepository = new RecordsRepository("education");
    const recordsService = new RecordsService(recordsRepository, "education");
    const record = (await recordsService.getEducationalRecordByID(
      id,
    )) as EducationalRecords;
    if (record) {
      return new ResponseData(200, record);
    } else {
      return new ResponseData(
        200,
        "No Educational record fetched with ID: " + id,
      );
    }
  } catch (error) {
    return new ResponseData(
      500,
      "Failed to retrieve educational record with ID: " + id + " - " + error,
    );
  }
};

const RecordsController = {
  getAllExperienceRecords,
  getAllEducationalRecords,
  getExperienceRecordByID,
  getEducationalRecordByID,
};

export default RecordsController;
