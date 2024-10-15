import ResponseData from '../constants/api/ResponseData';

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

export const createSuccessResponse = <T>(
  data: T | string,
): ResponseData<T | string> => {
  return new ResponseData(200, data);
};

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
