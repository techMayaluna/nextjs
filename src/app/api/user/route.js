import { connectDB } from "@/app/utils/mongoose";
import User from "@/models/users";
import { NextResponse } from "next/server";


export async function POST(request) {
  try {
    await connectDB();
    const { idUser } = await request.json();

    console.log("GET USER")
    console.log(idUser)


    const user = await User.findOne({ identificacion: idUser });



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

    console.log(user);
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
