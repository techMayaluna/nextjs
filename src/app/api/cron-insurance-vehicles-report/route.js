import { NextResponse } from "next/server";
import { connectDB } from "@/app/utils/mongoose";
import Insurance from "@/models/insurances";
import { Resend } from "resend";
import User from "@/models/users";
import { ExcelVehiclesTemplate } from "@/app/components/email-templates/ExcelVehiclesTemplate";

export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_URI);

export async function GET() {
  await connectDB();

  const ExcelJS = require("exceljs");

  const today = new Date();
  const inTenDays = new Date();

  inTenDays.setDate(today.getDate() + 10);

  let soonToExpireInsurances = await Insurance.find({
    $expr: { $gt: [{ $size: "$vehiculos" }, 1] },
  });

  let modifiedInsurances = [];

  for (let insurance of soonToExpireInsurances) {
    // Convert the Mongoose document into a simple JavaScript object
    insurance = insurance.toObject();

    for (let vehicle of insurance.vehiculos) {
      let vencimientoExtintor = new Date(vehicle.vencimientoExtintor);
      let vencimientoTarjetaOperacion = new Date(
        vehicle.vencimientoTarjetaOperacion
      );
      let vencimientoTecnomecanica = new Date(vehicle.vencimientoTecnomecanica);
      let SOAT = new Date(vehicle.SOAT);

      vehicle.statusExtintor =
        vencimientoExtintor < today
          ? "vencido"
          : vencimientoExtintor <= inTenDays
          ? "pronto a vencer"
          : "activo";
      vehicle.statusTarjetaOperacion =
        vencimientoTarjetaOperacion < today
          ? "vencido"
          : vencimientoTarjetaOperacion <= inTenDays
          ? "pronto a vencer"
          : "activo";
      vehicle.statusTecnomecanica =
        vencimientoTecnomecanica < today
          ? "vencido"
          : vencimientoTecnomecanica <= inTenDays
          ? "pronto a vencer"
          : "activo";
      vehicle.statusSOAT =
        SOAT < today
          ? "vencido"
          : SOAT <= inTenDays
          ? "pronto a vencer"
          : "activo";
    } // Filter the vehicles to remove those with all status fields as 'activo'
    insurance.vehiculos = insurance.vehiculos.filter((vehicle) => {
      return (
        vehicle.statusExtintor !== "activo" ||
        vehicle.statusTarjetaOperacion !== "activo" ||
        vehicle.statusTecnomecanica !== "activo" ||
        vehicle.statusSOAT !== "activo"
      );
    });

    modifiedInsurances.push(insurance);
  }

  modifiedInsurances = await Promise.all(
    modifiedInsurances.map(async (insurance) => {
      // Busca el usuario con el idUser
      const user = await User.findById(insurance.idUser);

      // Agrega el correo electrónico del usuario al seguro
      return {
        vehiculos: insurance.vehiculos,
        tipoPoliza: insurance.tipoPoliza,
        userEmail: user.email,
      };
    })
  );

  for (let insurance of modifiedInsurances) {
    let workbook = new ExcelJS.Workbook();
    let worksheet = workbook.addWorksheet("Vehiculos");

    // Define the headers
    worksheet.columns = [
      { header: "Placa", key: "placa" },
      { header: "Extintor", key: "statusExtintor" },
      { header: "Tarjeta de Operación", key: "statusTarjetaOperacion" },
      { header: "Tecnomecánica", key: "statusTecnomecanica" },
      { header: "SOAT", key: "statusSOAT" },
    ];

    let expiredStyle = {
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFF0000" },
      },
    };
    for (let vehicle of insurance.vehiculos) {
      // Add a row for the vehicle
      let row = worksheet.addRow(vehicle);

      // Apply the expired style to the cells if the item is expired
      if (vehicle.statusExtintor === "vencido")
        row.getCell("statusExtintor").style = expiredStyle;
      if (vehicle.statusTarjetaOperacion === "vencido")
        row.getCell("statusTarjetaOperacion").style = expiredStyle;
      if (vehicle.statusTecnomecanica === "vencido")
        row.getCell("statusTecnomecanica").style = expiredStyle;
      if (vehicle.statusSOAT === "vencido")
        row.getCell("statusSOAT").style = expiredStyle;
    }

    // Write the workbook to a buffer
    let buffer = await workbook.xlsx.writeBuffer();

    // Convert the buffer to base64
    let xlsxBase64 = buffer.toString("base64");

    console.log("Sending email to:", insurance.userEmail);

    try {
      const data = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: ["emaya@mayalunaseguros.com", insurance.userEmail],
        subject: "Reporte mensual estado de vehículos",

        react: ExcelVehiclesTemplate({
          seguro: insurance.tipoPoliza,
        }),
        attachments: [
          {
            filename: "Vehiculos.xlsx",
            content: xlsxBase64,
            encoding: "base64",
          },
        ],
      });
      console.log("Email sent:", data);
    } catch (error) {
      console.log("Error sending email:", error);
    }
  }

  return NextResponse.json({
    message: "todo fine",
  });
}
