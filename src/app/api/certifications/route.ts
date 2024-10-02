import { NextResponse } from "next/server";
import CertificationsController from "../../lib/controllers/CertificationsController";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const validParams = ["name", "id", "institution"];
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

  const name = searchParams.get("name");
  if (name) {
    const response =
      await CertificationsController.getCertificationsByName(name);
    return NextResponse.json(response.body, { status: response.status });
  }

  const id = searchParams.get("id");
  if (id) {
    const response = await CertificationsController.getCertificationsByID(id);
    return NextResponse.json(response.body, { status: response.status });
  }

  const institution = searchParams.get("institution");
  if (institution) {
    const response =
      await CertificationsController.getCertificationsByInstitution(
        institution,
      );
    return NextResponse.json(response.body, { status: response.status });
  }

  const response = await CertificationsController.getAllCertifications();
  return NextResponse.json(response.body, { status: response.status });
}
