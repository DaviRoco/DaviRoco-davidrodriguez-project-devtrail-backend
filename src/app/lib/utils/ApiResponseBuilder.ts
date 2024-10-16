import ResponseData from '../constants/api/ResponseData';

/**
 * Validates if the provided value is a non-null string.
 *
 * @param value - The value to be validated.
 * @param fieldName - The name of the field being validated.
 * @returns A `ResponseData` object with an error message if the validation fails, or `null` if the validation passes.
 */
export const validateString = (
  value: string | null,
  fieldName: string,
): ResponseData<string> | null => {
  if (!value || typeof value !== 'string') {
    return new ResponseData(
      400,
      `${fieldName} is required and should be a string.`,
    );
  }
  return null;
};

/**
 * Creates a success response with the given data.
 *
 * @template T - The type of the data.
 * @param {T | string} data - The data to include in the response.
 * @returns {ResponseData<T | string>} The success response containing the data.
 */
export const createSuccessResponse = <T>(
  data: T | string,
): ResponseData<T | string> => {
  return new ResponseData(200, data);
};

/**
 * Creates an error response with a given error and message.
 *
 * @param error - The error object or error message string.
 * @param message - The custom message to include in the response.
 * @returns A ResponseData object containing the status code 500 and the combined error message.
 */
export const createErrorResponse = (
  error: Error | string,
  message: string,
): ResponseData<string> => {
  return new ResponseData(500, `${message} - ${error}`);
};

const ApiResponseBuilder = {
  validateString,
  createSuccessResponse,
  createErrorResponse,
};

export default ApiResponseBuilder;
