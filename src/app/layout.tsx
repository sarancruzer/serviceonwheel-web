import type { Metadata } from "next";

import BootstrapClient from "@/components/BootstrapClient";

import "./globals.css";

export const metadata: Metadata = {
  title: "Truelysell",
  description:
    "Service marketplace template converted to Next.js App Router with TypeScript.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <BootstrapClient />
      </body>
    </html>
  );
}
