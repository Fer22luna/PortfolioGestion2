import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Meridiano — GovTech & Smart City",
  description:
    "Transformación digital para gobiernos y ciudades más inteligentes.",
};

export const viewport: Viewport = {
  themeColor: "#0E2E45",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${nunito.variable} antialiased`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
