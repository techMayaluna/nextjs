import { connectDB } from "@/app/utils/mongoose";
import User from "@/models/users";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    const { _uid } = await request.json();


    const user = await User.findOne({ _uid });

    user.password = undefined;

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
