"use client";

import "./globals.css";
import { HeroUIProvider } from "@heroui/react";
import Nav from "./components/nav";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        <HeroUIProvider>
          <Nav />
          {children}
        </HeroUIProvider>
      </body>
    </html>
  );
}