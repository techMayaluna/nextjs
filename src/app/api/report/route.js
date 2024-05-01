import { connectDB } from "@/app/utils/mongoose";
import Report from "@/models/report";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const acountSid = process.env.TWILIO_ACCOUNT_ID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(acountSid, authToken);

const resend = new Resend(process.env.RESEND_URI);

export async function POST(request) {
  await connectDB();
  console.log("Request body", request.body);
  const requestBody = await request.json();

  const report = new Report(requestBody);
  await report.save();

  const urlReporte = `https://mayaluna-admin-three.vercel.app/home/reporte/${report._id}`;

  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["emaya@mayalunaseguros.com"],
      subject: "Envio de reporte de siniestro",
      html: `El usuario ${report.nombre} ha enviado un reporte de siniestro. La placa del vehiculo es ${report.placaDelVehiculo}. Puede verlo en el siguiente enlace: <a href="${urlReporte}">${urlReporte}</a>`
    });
  } catch (error) {
    console.log(error);
  }

  const numbers = [3142758675, 3244924827]; 

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
