import { connectDB } from "@/app/utils/mongoose";
import PlateRestriction from "@/models/plateRestrictions";
import User from "@/models/users";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    const { idUser } = await request.json();

    const user = await User.findOne({ identificacion: idUser });
    if (!user) {
      return NextResponse.json(
        {
          message: "No existe un usuario con este número de identificación",
        },
        {
          status: 400,
        }
      );
    }

    console.log(user);

    const ciudad = await PlateRestriction.findOne({
      _id: user.ciudad,
    });
    console.log("CIUDAD", ciudad);

    const returnedUser = {
      ...user,
      ciudad: ciudad,
      password: undefined,
    };

    console.log("RETURNED USER", returnedUser);

    return NextResponse.json(returnedUser);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
