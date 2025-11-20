import { ScrollArea } from "@/shared/components/ui/scroll-area";
import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className=" w-full min-h-screen flex flex-col lg:flex-row bg-primary/5 ">
      <div className="lg:basis-1/2 py-20 lg:py-0 basis-full grid place-items-center bg-cover bg-center relative bg-[url('/happy-friends-studying-college-campus.jpg')]">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent backdrop-contrast-150" />
      </div>
      <div className="lg:basis-1/2 basis-full">
        <ScrollArea className="h-full lg:h-screen">{children}</ScrollArea>
      </div>
    </main>
  );
}

export default AuthLayout;
