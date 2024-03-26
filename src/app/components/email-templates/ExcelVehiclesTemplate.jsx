import React from "react";

export const ExcelVehiclesTemplate = ({ seguro }) => {
  return (
    <html lang="es">
      <head>
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
      </head>
      <body
        style={{
          backgroundColor: "#ffffff",
          fontFamily: "sans-serif",
          margin: 0,
          padding: 0,
        }}
      >
        <table
          align="center"
          role="presentation"
          cellSpacing="0"
          cellPadding="0"
          border="0"
          width="100%"
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: "20px 0 48px",
            borderCollapse: "collapse",
          }}
        >
          <tr>
            <td style={{ textAlign: "center", padding: "20px 0" }}>
              <img
                alt="Logo_mayaluna"
                src="https://res.cloudinary.com/dz7keixqs/image/upload/v1705961749/ph4rxkpobvkzfqjbh3yk.jpg"
                width="190"
                height="70"
                style={{
                  display: "block",
                  outline: "none",
                  border: "none",
                  textDecoration: "none",
                  margin: "0 auto",
                }}
              />
            </td>
          </tr>

          <tr>
            <td style={{ padding: "0 20px", textAlign: "center" }}>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: "26px",
                  margin: "5px 0",
                  textAlign: "justify",
                }}
              >
                Adjunto a este correo encontrarás un archivo con la información
                de la poliza de {seguro} que has registrado con Mayaluna
                Seguros.
              </p>
              <hr
                style={{
                  width: "100%",
                  border: "none",
                  borderTop: "1px solid #eaeaea",
                  borderColor: "#cccccc",
                  margin: "20px 0",
                }}
              />
              <p
                style={{
                  fontSize: "12px",
                  lineHeight: "24px",
                  margin: "16px 0",
                  color: "#8898aa",
                }}
              >
                © Mayaluna Seguros - 2024 | Todos los derechos reservados
              </p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  );
};
