import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

const apiKey = process.env.CLOUDAPI_KEY;
const apiSecret = process.env.CLOUDAPI_SECRET;

cloudinary.config({
  cloud_name: "dz7keixqs",
  api_key: apiKey,
  api_secret: apiSecret
});

export async function POST(request) {
  try {
    const data = await request.formData();
    const poliza = data.get("image");

    const bytes = await poliza.arrayBuffer();
    const buffer = Buffer.from(bytes).toString("base64");

    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(
      `data:${poliza.type};base64,${buffer}`,
      {
        resource_type: "auto" // automatically detect the resource type
      }
    );

    return NextResponse.json(result.url);
  } catch (error) {
    console.log(error);
    return NextResponse.error({ status: "paila" });
  }
}
