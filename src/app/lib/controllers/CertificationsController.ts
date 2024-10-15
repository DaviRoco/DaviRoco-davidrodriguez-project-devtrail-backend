import { CertificationsService } from '../services/CertificationsService';
import CertificationsRepository from '../repositories/CertificationsRepository';
import ResponseData from '../constants/api/ResponseData';
import Certifications from '../entities/Certifications';
import ApiResponseBuilder from '../utils/ApiResponseBuilder';

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
  ResponseData<Certifications[] | string>
> => {
  try {
    const certifications: Certifications[] =
      (await certificationsService.getAllCertifications()) as Certifications[];
    if (!certifications) {
      return ApiResponseBuilder.createSuccessResponse(
        'No Certifications fetched',
      );
    }
    return ApiResponseBuilder.createSuccessResponse(certifications);
  } catch (error) {
    return ApiResponseBuilder.createErrorResponse(
      error as Error,
      'Failed to retrieve certifications',
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
  name: string,
): Promise<ResponseData<Certifications | string>> => {
  const validationError = ApiResponseBuilder.validateString(name, 'Name');
  if (validationError) {
    return validationError;
  }

  try {
    const certification = (await certificationsService.getCertificationByName(
      name,
    )) as Certifications;
    if (certification) {
      return ApiResponseBuilder.createSuccessResponse(certification);
    } else {
      return ApiResponseBuilder.createSuccessResponse(
        `No Certification fetched with name: ${name}`,
      );
    }
  } catch (error) {
    return ApiResponseBuilder.createErrorResponse(
      error as Error,
      `Failed to retrieve certification with name. Name: ${name}`,
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
  id: string,
): Promise<ResponseData<Certifications | string>> => {
  const validationError = ApiResponseBuilder.validateString(id, 'ID');
  if (validationError) {
    return validationError;
  }

  try {
    const certification = (await certificationsService.getCertificationByID(
      id,
    )) as Certifications;
    if (certification) {
      return ApiResponseBuilder.createSuccessResponse(certification);
    } else {
      return ApiResponseBuilder.createSuccessResponse(
        `No Certification fetched with ID: ${id}`,
      );
    }
  } catch (error) {
    return ApiResponseBuilder.createErrorResponse(
      error as Error,
      `Failed to retrieve certification with ID. ID: ${id}`,
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
  institution: string,
): Promise<ResponseData<Certifications | string>> => {
  const validationError = ApiResponseBuilder.validateString(
    institution,
    'Institution',
  );
  if (validationError) {
    return validationError;
  }

  try {
    const certification =
      (await certificationsService.getCertificationsByInstitution(
        institution,
      )) as Certifications;
    if (certification) {
      return ApiResponseBuilder.createSuccessResponse(certification);
    } else {
      return ApiResponseBuilder.createSuccessResponse(
        `No Certification fetched with institution: ${institution}`,
      );
    }
  } catch (error) {
    return ApiResponseBuilder.createErrorResponse(
      error as Error,
      `Failed to retrieve certification with institution. Institution: ${institution}`,
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
