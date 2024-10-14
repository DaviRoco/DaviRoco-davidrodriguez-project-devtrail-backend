import ResponseData from "../../../lib/constants/api/ResponseData";

describe("Response Data Constant", () => {
  test("It should return the response data api object", () => {
    const responseData = new ResponseData(200, "body");

    expect(responseData).toBeDefined();
    expect(responseData.status).toBe(200);
    expect(responseData.body).toBe("body");
  });

  test("It should set the status and body of the response data api object", () => {
    const responseData = new ResponseData(200, "body");

    responseData.status = 201;
    responseData.body = "new body";

    expect(responseData.status).toBe(201);
    expect(responseData.body).toBe("new body");
  });
});
