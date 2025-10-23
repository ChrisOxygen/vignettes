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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import { NAVIGATION } from "../constants";
import { useState } from "react";
import { usePathname } from "next/navigation";

interface MobileMenuProps {
  isScrolled: boolean;
}

function MobileMenu({ isScrolled }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
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
        className="w-[300px] p-5 flex flex-col h-full sm:w-[400px] overflow-y-auto"
      >
        <div className="grid grid-rows-[1fr_auto] h-full gap-6 mt-8">
          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            {NAVIGATION.menuItems.map((item) => {
              const isActive =
                pathname === item.link ||
                (item.hasDropdown &&
                  item.children?.some((child) => pathname === child.link));

              return (
                <div key={item.text}>
                  {item.hasDropdown && item.children ? (
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value={item.text} className="border-none">
                        <AccordionTrigger
                          className={`text-base font-semibold transition-colors duration-200 py-3 hover:no-underline ${
                            isActive
                              ? "text-primary"
                              : "text-foreground hover:text-primary"
                          }`}
                        >
                          {item.text}
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-2 pl-4 pb-2">
                          {/* Add "All [Category]" link if parent has a link */}
                          {item.link && (
                            <Link
                              href={item.link}
                              className={`text-sm font-semibold transition-colors duration-200 py-2 ${
                                pathname === item.link
                                  ? "text-primary"
                                  : "text-foreground hover:text-primary"
                              }`}
                              onClick={() => setOpen(false)}
                            >
                              All {item.text}
                            </Link>
                          )}
                          {item.children.map((child) => (
                            <Link
                              key={child.text}
                              href={child.link}
                              className={`text-sm transition-colors duration-200 py-2 ${
                                pathname === child.link
                                  ? "text-primary font-semibold"
                                  : "text-muted-foreground hover:text-primary"
                              }`}
                              onClick={() => setOpen(false)}
                            >
                              {child.text}
                            </Link>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <Link
                      href={item.link}
                      className={`text-base font-semibold transition-colors duration-200 py-3 block ${
                        pathname === item.link
                          ? "text-primary"
                          : "text-foreground hover:text-primary"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {item.text}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 border-t pt-4">
            <Button variant="outline" size="lg" asChild>
              <Link href="/sign-in" onClick={() => setOpen(false)}>
                Sign In
              </Link>
            </Button>
            <Button size="lg" asChild>
              <Link href="/sign-up" onClick={() => setOpen(false)}>
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileMenu;
