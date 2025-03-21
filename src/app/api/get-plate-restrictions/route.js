import { connectDB } from "@/app/utils/mongoose";
import PlateRestriction from "@/models/plateRestrictions";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    const plateRestrictions = await PlateRestriction.find();

    return NextResponse.json(plateRestrictions);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
