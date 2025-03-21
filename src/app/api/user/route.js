import { connectDB } from "@/app/utils/mongoose";
import User from "@/models/users";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    const { idUser } = await request.json();

    const user = await User.findOne({ identificacion: idUser }).populate(
      "ciudad"
    );

    if (!user) {
      console.log("paila");
      return NextResponse.json(
        {
          message: "No existe un usuario con este número de identificación",
        },
        {
          status: 400,
        }
      );
    }
    user.password = undefined;

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
