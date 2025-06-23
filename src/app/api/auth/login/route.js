import { connectDB } from "@/app/utils/mongoose";
import User from "@/models/users";
import Insurance from "@/models/insurances";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    const { identificacion, password } = await request.json();

    // Populate the "ciudad" reference so the frontend receives the full object, not just the ObjectId
    let user = await User.findOne({ identificacion });

    if (!user) {
      const insurance = await Insurance.findOne({
        "vehiculos.placa": identificacion,
      });

      if (insurance) {
        // Populate city as well when user is obtained through an insurance policy
        user = await User.findById(insurance.idUser).populate("ciudad");
        user.rol = "conductor";
      } else {
        return NextResponse.json(
          {
            message: "No existe un usuario con este número de identificación",
          },
          {
            status: 400,
          }
        );
      }
    }

    const isMatch =
      password === user.identificacion ||
      (await bcrypt.compare(password, user.password));

    if (!isMatch) {
      return NextResponse.json(
        {
          message: "Contraseña incorrecta",
        },
        {
          status: 400,
        }
      );
    }

    user.password = undefined;

    console.log("USER", user);

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
