import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Screen Recorder",
  description: "Graba tu pantalla de forma sencilla sin necesidad de instalaciones ni registros. Graba, descarga y comparte tus videos fácilmente.",
  keywords: "grabador de pantalla, screen recorder, grabación de pantalla online, grabar pantalla sin instalar, captura de pantalla web",
  authors: [{ name: "Matias Orellana" }],
  creator: "Matias Orellana",
  openGraph: {
    title: "Screen Recorder",
    description: "Graba tu pantalla directamente desde el navegador, sin descargas ni registros",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
