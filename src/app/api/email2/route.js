import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.MAIL_EMAIL,
    pass: process.env.MAIL_PASSWORD
  }
});

export async function POST(request) {
  const reporte = await request.json();

  console.log(reporte);
  try {
    const emailInfo = await sendEmail(reporte);

    return NextResponse.json({
      message: "Correo enviado exitosamente",
      emailInfo
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function sendEmail(emailData) {
  let htmlContent;
  const table = generateTable(emailData);

  htmlContent = `
  <section>

      <p>Estimado/a,</p>
    <p>Por favor, encuentre a continuación los detalles del reporte:</p>
    ${table}
    <p>Saludos,</p>
    <p>Su equipo de soporte</p>
  </section>
  `;

  const info = await transporter.sendMail({
    from: '"Mayaluna Seguros " <segurosmayaluna@gmail.com>', // sender address
    to: ["", "wildchamo@gmail.com"],
    subject: `Reporte de siniestro ${emailData.placaDelVehiculo} `,
    html: htmlContent
  });

  console.log("Message sent: %s", info.messageId);
  return info.messageId;
}

function generateTable(values) {
  let table = `<table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse;">`;
  for (const key in values) {
    if (key !== "images") {
      table += `
        <tr>
          <td><strong>${key}</strong></td>
          <td>${values[key]}</td>
        </tr>`;
    } else {
      table += `
        <tr>
          <td><strong>${key}</strong></td>
          <td>${values[key]
            .map((img) => `<img src="${img}" width="100" />`)
            .join(" ")}</td>
        </tr>`;
    }
  }
  table += `</table>`;
  return table;
}
