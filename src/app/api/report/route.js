import { connectDB } from "@/app/utils/mongoose";
import Report from "@/models/report";
import { NextResponse } from "next/server";

const acountSid = process.env.TWILIO_ACCOUNT_ID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(acountSid, authToken);

export async function POST(request) {
  await connectDB();
  const requestBody = await request.json();
  console.log("Request body", requestBody);

  const report = new Report(requestBody);
  await report.save();

  const numbers = [3244924827, 3108229260]; 

  for (let number of numbers) {
    await client.messages.create({
      from: "MG6fa13751d6def000a2d443822ca88579",
      contentSid: "HX9edfa83c11e686e1ade631263499a7f9",
      contentVariables: JSON.stringify({
        1: `${report._id}`,
        2: `${report.nombre}`,
        3: `${report.placaDelVehiculo}`
      }),
      to: `whatsapp:+57${number}`
    });
  }

  return NextResponse.json({
    message: "Report saved successfully"
  });
}
