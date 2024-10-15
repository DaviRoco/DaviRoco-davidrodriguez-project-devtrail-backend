import ResponseData from '../../../lib/constants/api/ResponseData';
/**
 * @fileoverview Unit tests for the ResponseData constant.
 * 
 * This file contains unit tests for the ResponseData class, which is responsible for encapsulating
 * the structure of the API response data. The tests cover the following functionalities:
 * 
 * - Creation of a ResponseData object: Verifies that the object is defined and initialized correctly.
 * - Modification of ResponseData properties: Ensures that the status and body properties can be set and retrieved accurately.
 * 
 * The tests use Jest to validate the behavior and integrity of the ResponseData object.
 * 
 * @module ResponseDataTest
 */

describe('Response Data Constant', () => {
  test('It should return the response data api object', () => {
    const responseData = new ResponseData(200, 'body');

    expect(responseData).toBeDefined();
    expect(responseData.status).toBe(200);
    expect(responseData.body).toBe('body');
  });

  test('It should set the status and body of the response data api object', () => {
    const responseData = new ResponseData(200, 'body');

    responseData.status = 201;
    responseData.body = 'new body';

    expect(responseData.status).toBe(201);
    expect(responseData.body).toBe('new body');
  });
});
