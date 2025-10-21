import Footer from "@/features/external-view/components/Footer";
import SiteHeader from "@/features/external-view/components/SiteHeader";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full h-full min-h-screen relative">
      <SiteHeader />
      {children}

      <Footer />
    </main>
  );
}

export default layout;
