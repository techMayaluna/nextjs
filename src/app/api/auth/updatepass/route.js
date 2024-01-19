import { connectDB } from "@/app/utils/mongoose";
import User from "@/models/users";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await connectDB();
    const { newPassword, idUser } = await request.json();

    const user = await User.findOne({ _id: idUser });
    if (!user)
      return NextResponse.json(
        {
          message:
            "No existe un usuario con este id, porfavor contacte al soporte técnico",
        },
        {
          status: 400,
        }
      );

    const updatedUser = await User.updateOne(
      { _id: idUser }, // Cambia _id por idUser
      {
        password: bcrypt.hashSync(newPassword, 10),
      }
    );

    return NextResponse.json(
      {
        message: "contraseña modificada con éxito",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
