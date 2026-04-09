import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tuba Travel",
  description: "Multilingual tourism MVP for Cabo Verde."
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
