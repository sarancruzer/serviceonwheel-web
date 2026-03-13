"use client";

import { Suspense } from "react";

import AuthModals from "@/components/AuthModals";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function PublicLayoutShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="main-wrapper body-one sow-page">
        <Header variant="home" />
        <main>{children}</main>
        <Footer />
      </div>
      <Suspense fallback={null}>
        <AuthModals />
      </Suspense>
    </>
  );
}
