import "./styles/globals.css";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Seguros Mayaluna",
  description: "Seguros Mayaluna - Tu aliado en protección y seguros",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.ico", sizes: "16x16", type: "image/x-icon" },
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
    ],
    apple: [
      { url: "/favicon.ico", sizes: "180x180", type: "image/x-icon" },
      { url: "/favicon.ico", sizes: "167x167", type: "image/x-icon" },
      { url: "/favicon.ico", sizes: "152x152", type: "image/x-icon" },
      { url: "/favicon.ico", sizes: "120x120", type: "image/x-icon" },
    ],
  },
  appleWebApp: {
    title: "Seguros Mayaluna",
    statusBarStyle: "default",
    capable: true,
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Seguros Mayaluna",
    "application-name": "Seguros Mayaluna",
    "msapplication-TileColor": "#ffffff",
    "theme-color": "#ffffff",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Seguros Mayaluna" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Seguros Mayaluna" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={josefin.className}>{children}</body>
    </html>
  );
}
