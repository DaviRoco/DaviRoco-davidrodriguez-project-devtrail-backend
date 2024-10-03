import { NextResponse } from "next/server";
import RecordsController from "../../lib/controllers/RecordsController";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const validParams = ["id", "type"];
  const invalidParams: string[] = [];

  searchParams.forEach((_, key) => {
    if (!validParams.includes(key)) {
      invalidParams.push(key);
    }
  });

  if (invalidParams.length > 0) {
    return NextResponse.json(
      {
        message: `Invalid query parameters: ${invalidParams.join(", ")}`,
      },
      { status: 400 },
    );
  }

  const id = searchParams.get("id");
  const type = searchParams.get("type");
  if (type === "education") {
    let response;
    if (id) {
      response = await RecordsController.getEducationalRecordByID(id);
    } else {
      response = await RecordsController.getAllEducationalRecords();
    }
    return NextResponse.json(response.body, { status: response.status });
  } else if (type === "experience") {
    let response;
    if (id) {
      response = await RecordsController.getExperienceRecordByID(id);
    } else {
      response = await RecordsController.getAllExperienceRecords();
    }
    return NextResponse.json(response.body, { status: response.status });
  } else {
    return NextResponse.json(
      { message: "Invalid record type provided" },
      { status: 400 },
    );
  }

  return NextResponse.json(
    { message: "Invalid query parameters" },
    { status: 400 },
  );
}
