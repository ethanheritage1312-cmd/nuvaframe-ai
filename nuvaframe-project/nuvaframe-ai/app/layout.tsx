import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nuvaframe AI — Turn ideas into videos",
  description:
    "Create cinematic faceless short videos from a single prompt with Nuvaframe AI.",
  applicationName: "Nuvaframe AI",
};

export const viewport: Viewport = {
  themeColor: "#05090b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
