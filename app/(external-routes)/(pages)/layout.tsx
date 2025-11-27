import FloatingWhatsappBtn from "@/features/external-view/components/FloatingWhatsappBtn";
import Footer from "@/features/external-view/components/Footer";
import SiteHeader from "@/features/external-view/components/SiteHeader";
import React from "react";
import { IoLogoWhatsapp } from "react-icons/io";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full h-full relative">
      <SiteHeader />
      {children}

      <Footer />
      <FloatingWhatsappBtn />
    </main>
  );
}

export default layout;
