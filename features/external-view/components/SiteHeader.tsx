"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { PAGES } from "../constants";
import { useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";

function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full h-[100px] fixed top-0 left-0 right-0 border-b z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/50 backdrop-blur-md border-gray-200/40"
          : "bg-transparent border-white/10"
      }`}
    >
      <div className="max-w-7xl w-full h-full mx-auto px-6 grid items-center grid-cols-[180px_1fr_auto] gap-8">
        {/* Logo Section */}
        <Link href="/" className="flex items-center">
          <Image
            src="/I&V-no-bg.png"
            alt="Vignettes Logo"
            width={200}
            height={80}
            className={`w-[140px] sm:w-[160px] object-contain transition-all duration-300 ${
              isScrolled ? "" : "brightness-0 invert"
            }`}
          />
        </Link>

        {/* Nav Section */}
        <nav className="hidden lg:flex items-center justify-center gap-8">
          {PAGES.map((page) => (
            <Link
              key={page}
              href={`/${page.toLowerCase().replace(/\s+/g, "-")}`}
              className={`text-sm font-semibold tracking-wide hover:text-primary transition-colors duration-200 ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
            >
              {page}
            </Link>
          ))}
        </nav>

        {/* CTA Buttons Section - Desktop Only */}
        <div className="hidden ml-auto sm:flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className={`border transition-colors duration-200 ${
              isScrolled
                ? "text-white hover:bg-gray-100 border-gray-200/40 hover:border-gray-300"
                : "text-white hover:bg-white/20 hover:text-white border-white/20 hover:border-white/40"
            }`}
          >
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/sign-up">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <MobileMenu isScrolled={isScrolled} />
      </div>
    </header>
  );
}

export default SiteHeader;
