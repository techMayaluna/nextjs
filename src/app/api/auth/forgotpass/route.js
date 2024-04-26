import { connectDB } from "@/app/utils/mongoose";
import User from "@/models/users";
import { NextResponse } from "next/server";

const acountSid = process.env.TWILIO_ACCOUNT_ID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(acountSid, authToken);

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

    console.log("enviado al celular", user.celular, code);

    await client.messages
      .create({
        from: "MG6fa13751d6def000a2d443822ca88579",
        contentSid: "HX96102b7c68c50ac38720cc96fcce2802",
        contentVariables: JSON.stringify({
          1: `${code}`,
        }),
        to: `whatsapp:+57${user.celular}`,
      })
      .then((message) => console.log(message.sid))
      .catch((error) => console.error("Error sending message:", error));

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log("General error: ", error);
    return NextResponse.error();
  }
}
