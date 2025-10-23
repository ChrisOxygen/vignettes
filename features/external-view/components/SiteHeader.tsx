"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/shared/components/ui/menubar";
import { NAVIGATION } from "../constants";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";

function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

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
        <nav className="hidden lg:flex items-center justify-center">
          <Menubar className="border-0 bg-transparent h-auto p-0 gap-6">
            {NAVIGATION.menuItems.map((item) => {
              const isActive =
                pathname === item.link ||
                (item.hasDropdown &&
                  item.children?.some((child) => pathname === child.link));

              return (
                <MenubarMenu key={item.text}>
                  {item.hasDropdown && item.children ? (
                    <>
                      <MenubarTrigger
                        className={`text-sm font-semibold tracking-wide transition-colors duration-200 cursor-pointer bg-transparent data-[state=open]:bg-transparent focus:bg-transparent hover:!bg-transparent px-0 ${
                          isActive
                            ? "text-primary data-[state=open]:text-primary focus:text-primary"
                            : isScrolled
                              ? "text-foreground hover:text-primary data-[state=open]:text-foreground focus:text-foreground"
                              : "text-white hover:text-primary data-[state=open]:text-white focus:text-white"
                        }`}
                      >
                        {item.text}
                      </MenubarTrigger>
                      <MenubarContent
                        align="start"
                        className="w-56 rounded-xl animate-in fade-in-0 zoom-in-95 duration-200"
                      >
                        {/* Add "All [Category]" link if parent has a link */}
                        {item.link && (
                          <MenubarItem asChild>
                            <Link
                              href={item.link}
                              className={`font-semibold cursor-pointer ${
                                pathname === item.link
                                  ? "bg-accent text-primary"
                                  : ""
                              }`}
                            >
                              All {item.text}
                            </Link>
                          </MenubarItem>
                        )}
                        {item.children.map((child) => (
                          <MenubarItem key={child.text} asChild>
                            <Link
                              href={child.link}
                              className={`cursor-pointer ${
                                pathname === child.link
                                  ? "bg-accent text-primary"
                                  : ""
                              }`}
                            >
                              {child.text}
                            </Link>
                          </MenubarItem>
                        ))}
                      </MenubarContent>
                    </>
                  ) : (
                    <MenubarTrigger asChild>
                      <Link
                        href={item.link}
                        className={`text-sm font-semibold tracking-wide transition-colors duration-200 cursor-pointer bg-transparent data-[state=open]:bg-transparent focus:bg-transparent hover:!bg-transparent px-0 ${
                          pathname === item.link
                            ? "text-primary data-[state=open]:text-primary focus:text-primary"
                            : isScrolled
                              ? "text-foreground hover:text-primary data-[state=open]:text-foreground focus:text-foreground"
                              : "text-white hover:text-primary data-[state=open]:text-white focus:text-white"
                        }`}
                      >
                        {item.text}
                      </Link>
                    </MenubarTrigger>
                  )}
                </MenubarMenu>
              );
            })}
          </Menubar>
        </nav>

        {/* CTA Buttons Section - Desktop Only */}
        <div className="hidden ml-auto sm:flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className={`border transition-colors duration-200 ${
              isScrolled
                ? "text-black hover:bg-gray-100 border-gray-200/40 hover:border-gray-300"
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
