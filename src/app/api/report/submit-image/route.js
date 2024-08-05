import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

const apiKey = process.env.CLOUDAPI_KEY;
const apiSecret = process.env.CLOUDAPI_SECRET;

cloudinary.config({
  cloud_name: "dz7keixqs",
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true
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

    const secureUrl =
      result.secure_url || result.url.replace("http://", "https://");

    return NextResponse.json(secureUrl);
  } catch (error) {
    console.log(error);
    return NextResponse.json("imagen muy pesada");
  }
}
