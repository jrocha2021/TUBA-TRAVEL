import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TubaTour",
  description: "Premium Cabo Verde tours, transfers, and local experiences."
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
