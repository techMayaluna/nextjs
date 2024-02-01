import { connectDB } from "@/app/utils/mongoose";
import User from "@/models/users";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    let { _id } = await request.json();
    _id = _id.replace(/"/g, '');

    const user = await User.findById({ _id }).select('-password');

    console.log(user)

    if (!user)
      return NextResponse.json(
        {
          message: "No existe un usuario con este ID",
        },
        {
          status: 400,
        }
      );

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      {
        message: "No existe un usuario con este ID",
      },
      {
        status: 400,
      }
    );

  }
}