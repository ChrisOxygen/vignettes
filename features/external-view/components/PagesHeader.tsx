"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronRight } from "react-icons/fi";

interface PagesHeaderProps {
  title?: string;
  backgroundImage?: string;
}

function PagesHeader({
  title,
  backgroundImage = "/assets/imgi_5_hero-3.webp",
}: PagesHeaderProps) {
  const pathname = usePathname();

  // Generate breadcrumbs from pathname
  const pathSegments = pathname.split("/").filter(Boolean);

  // Generate title from last segment if not provided
  const pageTitle =
    title ||
    pathSegments[pathSegments.length - 1]
      ?.split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ") ||
    "Home";

  // Generate breadcrumb items
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const label = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return { href, label, isLast: index === pathSegments.length - 1 };
  });

  return (
    <header className="w-full grid grid-rows-[100px_1fr] overflow-hidden relative">
      <div
        className="absolute inset-0 -z-10 bg-no-repeat bg-center bg-cover filter brightness-[49%] saturate-[139%] contrast-[118%]"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      ></div>
      <div className="absolute inset-0 -z-10 bg-black/40"></div>
      <div className="row-start-2 relative p-4 sm:p-6 md:p-8">
        <div className="mx-auto py-10 max-w-7xl flex flex-col gap-2 w-full">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {pageTitle}
          </h2>
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-white/80 flex-wrap">
            <Link
              href="/"
              className="hover:text-white transition-colors duration-200"
            >
              Home
            </Link>
            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={item.href}>
                <FiChevronRight className="text-white/60" />
                {item.isLast ? (
                  <span className="text-white font-medium">{item.label}</span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default PagesHeader;
