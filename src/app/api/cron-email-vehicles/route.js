import { NextResponse } from "next/server";
import { connectDB } from "@/app/utils/mongoose";
import User from "@/models/users";



export const dynamic = "force-dynamic";

export async function GET() {
  await connectDB();

  const today = new Date();

  const birtDayUsers = await User.find({
    fechaNacimiento: {
      $gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      $lt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
    },
  });

  console.log(birtDayUsers);

  if (birtDayUsers.length >= 1) {

    birtDayUsers.forEach((user) => {
     
    });
  } else {
    console.log("No hay cumpleaños hoy");
  }

  return NextResponse.json({ message: birtDayUsers });
}
