import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_URI);

export const dynamic = "force-dynamic";

export async function POST(request) {
  const reporte = await request.formData();

  const pdfBlob = reporte.get("pdf");
  const pdfBuffer = await pdfBlob.arrayBuffer();
  const pdfBase64 = Buffer.from(pdfBuffer).toString('base64');


  try {
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["emaya@mayalunaseguros.com"],
      subject: "Envio de reporte de siniestro",
      html: "Se adjunta el reporte de siniestro",
      attachments: [
        {
          filename: "reporte.pdf",
          content: pdfBase64,
        },
      ],
    });

    return NextResponse.json({
      message: "Correo enviado exitosamente",
      data,
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
