import { CertificationsService } from "../services/CertificationsService";
import { CertificationsRepository } from "../repositories/CertificationsRepository";
import ResponseData from "../constants/api/ResponseData";
import Certifications from "../entities/Certifications";

const certificationsRepository = new CertificationsRepository();
const certificationsService = new CertificationsService(
  certificationsRepository,
);

/**
 * Retrieves all certifications.
 *
 * @returns {Promise<ResponseData<Certifications[]> | ResponseData<string>>}
 * A promise that resolves to a ResponseData object containing either an array of Certifications
 * or a string message indicating no certifications were fetched or an error occurred.
 *
 * @throws {Error} If there is an issue retrieving the certifications.
 */
export const getAllCertifications = async (): Promise<
  ResponseData<Certifications[]> | ResponseData<string>
> => {
  try {
    const certifications: Certifications[] =
      (await certificationsService.getAllCertifications()) as Certifications[];
    if (!certifications) {
      return new ResponseData(200, "No Certifications fetched");
    }
    return new ResponseData(200, certifications);
  } catch (error) {
    return new ResponseData(
      500,
      "Failed to retrieve certifications - " + error,
    );
  }
};

/**
 * Retrieves certifications by name.
 *
 * @param {string | null} name - The name of the certification to retrieve. Must be a non-null string.
 * @returns {Promise<ResponseData<Certifications | null> | ResponseData<string>>}
 * - A promise that resolves to a ResponseData object containing either the certification data or an error message.
 *
 * @throws {Error} If there is an issue retrieving the certification.
 */
export const getCertificationByName = async (
  name: string | null,
): Promise<ResponseData<Certifications | null> | ResponseData<string>> => {
  if (!name || typeof name !== "string") {
    return new ResponseData(400, "Name is required and should be a string.");
  }

  try {
    const certification = (await certificationsService.getCertificationByName(
      name,
    )) as Certifications;
    if (certification) {
      return new ResponseData(200, certification);
    } else {
      return new ResponseData(
        200,
        "No Certification fetched with name: " + name,
      );
    }
  } catch (error) {
    return new ResponseData(
      500,
      "Failed to retrieve certification with name. Name: " +
        name +
        " - " +
        error,
    );
  }
};

/**
 * Retrieves certifications by ID.
 *
 * @param {string | null} id - The ID of the certification to retrieve. Must be a non-null string.
 * @returns {Promise<ResponseData<Certifications | null> | ResponseData<string>>}
 * - A promise that resolves to a ResponseData object containing either the certification data or an error message.
 *
 * @throws {Error} If there is an issue retrieving the certification.
 */
export const getCertificationByID = async (
  id: string | null,
): Promise<ResponseData<Certifications | null> | ResponseData<string>> => {
  if (!id || typeof id !== "string") {
    return new ResponseData(400, "ID is required and should be a string.");
  }

  try {
    const certification = (await certificationsService.getCertificationByID(
      id,
    )) as Certifications;
    if (certification) {
      return new ResponseData(200, certification);
    } else {
      return new ResponseData(200, "No Certification fetched with ID: " + id);
    }
  } catch (error) {
    return new ResponseData(
      500,
      "Failed to retrieve certification with ID. ID: " + id + " - " + error,
    );
  }
};

/**
 * Retrieves certifications by institution.
 *
 * @param {string | null} institution - The institution of the certification to retrieve. Must be a non-null string.
 * @returns {Promise<ResponseData<Certifications | null> | ResponseData<string>>}
 * - A promise that resolves to a ResponseData object containing either the certification data or an error message.
 *
 * @throws {Error} If there is an issue retrieving the certification.
 */
export const getCertificationsByInstitution = async (
  institution: string | null,
): Promise<ResponseData<Certifications | null> | ResponseData<string>> => {
  if (!institution || typeof institution !== "string") {
    return new ResponseData(
      400,
      "Institution is required and should be a string.",
    );
  }

  try {
    const certification =
      (await certificationsService.getCertificationsByInstitution(
        institution,
      )) as Certifications;
    if (certification) {
      return new ResponseData(200, certification);
    } else {
      return new ResponseData(
        200,
        "No Certification fetched with institution: " + institution,
      );
    }
  } catch (error) {
    return new ResponseData(
      500,
      "Failed to retrieve certification with institution. Institution: " +
        institution +
        " - " +
        error,
    );
  }
};

const CertificationsController = {
  getAllCertifications,
  getCertificationByName,
  getCertificationByID,
  getCertificationsByInstitution,
};

export default CertificationsController;
