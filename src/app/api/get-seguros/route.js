import { connectDB } from "@/app/utils/mongoose";
import Insurance from "@/models/insurances";
import { NextResponse } from "next/server";


export async function POST(request) {
    try {
        await connectDB();

        let { idUser } = await request.json();

        console.log(idUser)

        const insurances = await Insurance.find({ idUser });

        return NextResponse.json(insurances);
    } catch (error) {
        console.log(error);
        return NextResponse.error();
    }
}