import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FutbolParaTodos · Catálogo",
  description:
    "Catálogo de camisetas y equipación. Encuentra tu equipo y pide por WhatsApp.",
  openGraph: {
    title: "FutbolParaTodos · Catálogo",
    description: "Camisetas y equipación deportiva. Pedidos por WhatsApp.",
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
