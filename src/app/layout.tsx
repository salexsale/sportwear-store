import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alvaro Ferreira · avalito",
  description:
    "Portfolio de Alvaro Ferreira — Futuro desarrollador de software con visión de futuro y ganas de progresar.",
  openGraph: {
    title: "Alvaro Ferreira · avalito",
    description: "Portfolio de Alvaro Ferreira — Futuro desarrollador de software.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={geist.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
