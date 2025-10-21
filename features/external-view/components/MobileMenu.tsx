"use client";

import Link from "next/link";
import { HiMenuAlt3 } from "react-icons/hi";
import { Button } from "@/shared/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { PAGES } from "../constants";

interface MobileMenuProps {
  isScrolled: boolean;
}

function MobileMenu({ isScrolled }: MobileMenuProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`lg:hidden ml-auto text-2xl col-start-3  ${
            isScrolled ? "text-foreground" : "text-white"
          }`}
        >
          <HiMenuAlt3 className="text-2xl size-10" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] p-5 flex flex-col h-full sm:w-[400px]"
      >
        <div className="grid grid-rows-[1fr_100px] h-full gap-6 mt-8">
          {/* Navigation Links */}
          <nav className="flex flex-col gap-4">
            {PAGES.map((page) => (
              <SheetClose asChild key={page}>
                <Link
                  href={`/${page.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-base font-semibold text-foreground hover:text-primary transition-colors duration-200 py-2"
                >
                  {page}
                </Link>
              </SheetClose>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="flex  flex-col gap-3  mt-auto border-t">
            <SheetClose asChild>
              <Button variant="outline" size="lg" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button size="lg" asChild>
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileMenu;
