import { connectDB } from "@/app/utils/mongoose";
import Report from "@/models/report";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_URI);

export async function POST(request) {
  await connectDB();
  console.log("Request body", request.body);
  const requestBody = await request.json();

  const report = new Report(requestBody);
  await report.save();

  const urlReporte = `https://mayaluna-admin-three.vercel.app/home/reporte/${report._id}`;
  
  try {
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["emaya@mayalunaseguros.com"],
      subject: "Envio de reporte de siniestro",
      html: `El usuario ${report.nombre} ha enviado un reporte de siniestro. La placa del vehiculo es ${report.placaDelVehiculo}. Puede verlo en el siguiente enlace: <a href="${urlReporte}">${urlReporte}</a>`
    });
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({
    message: "Report saved successfully"
  });
}
