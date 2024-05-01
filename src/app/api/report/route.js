import { connectDB } from "@/app/utils/mongoose";
import Report from "@/models/report";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDB();
  const requestBody = await request.json();

  const report = new Report(requestBody);
  await report.save();

  return NextResponse.json({
    message: "Report saved successfully",
    data: report
  });
}
