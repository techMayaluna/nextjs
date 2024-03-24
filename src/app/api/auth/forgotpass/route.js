import { connectDB } from "@/app/utils/mongoose";
import User from "@/models/users";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ForgotPasswordTemplate } from "@/app/components/email-templates/ForgotPasswordTemplate";

const resend = new Resend(process.env.RESEND_URI);

export async function POST(request) {
  try {
    await connectDB();
    const { email, code } = await request.json();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          message:
            "No existe un usuario con esta dirección de correo electrónico",
        },
        {
          status: 400,
        }
      );
    }

    try {
      const data= await resend.emails.send({
        from: "Seguros Mayaluna <onboarding@resend.dev>",
        to: ["noreply@mayalunaseguros.com", email],
        subject: "Tu codigo de Recuperación ✅ - Mayaluna",
        react: ForgotPasswordTemplate({ code: code }),
      });
      
      console.log("Resend API Response:", data);
    } catch (error) {
      console.log("Error sending email: ", error);
      return NextResponse.error();
    }

    return NextResponse.json("Correo enviado");
  } catch (error) {
    console.log("General error: ", error);
    return NextResponse.error();
  }
}
