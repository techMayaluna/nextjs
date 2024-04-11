import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_URI);

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["noreply@mayalunaseguros.com"],
      subject: "Mensaje quinceal!",
      html: "Tu sabes para que es este correo!",
    });

    return NextResponse.json({
      message: "Correo enviado exitosamente",
      data,
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
