import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Nulbia — Despierta con energía, no con reproches",
  description:
    "Elimina los ronquidos desde la primera noche con tecnología de conducción ósea. Sin cirugía. Sin pastillas. 30 noches de garantía total.",
  openGraph: {
    title: "Nulbia — Despierta con energía, no con reproches",
    description:
      "El dispositivo anti-ronquidos más avanzado del mercado. 97% de eficacia. Garantía de 30 noches.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} ${orbitron.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
