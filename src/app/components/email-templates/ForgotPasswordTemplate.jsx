import React from "react";

export const ForgotPasswordTemplate = ({ code }) => {
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
            <td style={{ padding: "0 20px", textAlign: "center" }}>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: "26px",
                  margin: "5px 0",
                  textAlign: "justify",
                }}
              >
                Recientemente solicitaste un código de recuperación para tu
                cuenta en Mayaluna. Tu código de recuperación es:
              </p>
              <p
                style={{
                  backgroundColor: "#c9ffaf",
                  fontWeight: 800,
                  borderRadius: "10px",
                  color: "#000000",
                  fontSize: "30px",
                  textAlign: "center",
                  display: "inline-block",
                  lineHeight: "100%",
                  maxWidth: "100%",
                  padding: "12px",
                  letterSpacing: "2px",
                }}
              >
                {code}
              </p>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: "26px",
                  margin: "5px 0",
                  textAlign: "justify",
                }}
              >
                Si no solicitaste el envío de este código de recuperación, haz
                caso omiso a este mensaje. Para mantener tu cuenta segura, por
                favor no reenvíes este correo a nadie.
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
