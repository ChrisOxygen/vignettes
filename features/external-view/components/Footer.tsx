import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { PAGES, SERVICES } from "../constants";

import { BiPhoneCall } from "react-icons/bi";

function Footer() {
  return (
    <footer className="w-full flex flex-col gap-10 bg-black text-white py-12 px-6 md:px-12 lg:px-16">
      <div className="sm:max-w-2xl lg:max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] gap-8 lg:gap-12">
        {/* Brand Section */}
        <div className="flex flex-col w-full gap-6">
          <Image
            src="/I&V-no-bg.png"
            alt="Vignettes Logo"
            width={400}
            height={150}
            className="w-[180px] sm:w-[220px] object-contain brightness-0 invert"
          />
          <p className="text-white/80 text-sm leading-relaxed max-w-xs">
            Your complete visa and immigration companion. Expert guidance,
            digital forms, and secure document management.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <Link
              href="#"
              className="size-10 border border-white/20 rounded-full grid place-items-center hover:bg-primary hover:border-primary hover:text-white transition-all duration-300"
              aria-label="Facebook"
            >
              <FaFacebookF className="text-sm" />
            </Link>
            <Link
              href="#"
              className="size-10 border border-white/20 rounded-full grid place-items-center hover:bg-primary hover:border-primary hover:text-white transition-all duration-300"
              aria-label="Twitter"
            >
              <FaXTwitter className="text-sm" />
            </Link>
            <Link
              href="#"
              className="size-10 border border-white/20 rounded-full grid place-items-center hover:bg-primary hover:border-primary hover:text-white transition-all duration-300"
              aria-label="Instagram"
            >
              <FaInstagram className="text-sm" />
            </Link>
          </div>
        </div>

        {/* Service Links */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-semibold text-lg mb-2">Services</h4>
          {SERVICES.slice(0, 6).map((service) => (
            <Link
              key={service}
              href={`/services/${service.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-white/70 hover:text-primary transition-colors duration-200 text-sm"
            >
              {service}
            </Link>
          ))}
        </div>

        {/* Explore Links */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-semibold text-lg mb-2">Explore</h4>
          {PAGES.map((page) => (
            <Link
              key={page}
              href={`/${page.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-white/70 hover:text-primary transition-colors duration-200 text-sm"
            >
              {page}
            </Link>
          ))}
        </div>

        {/* Addresses Section */}
        <div className="flex flex-col gap-6">
          <h4 className="text-white font-semibold text-lg mb-2">Addresses</h4>

          <div className="flex flex-col gap-2">
            <span className="text-white font-medium text-sm flex items-center gap-2">
              <span className="text-base">🇳🇬</span> Nigeria
            </span>
            <span className="text-white/70 text-xs leading-relaxed">
              TheBunker, 279 Herbert Macaulay Way, Alagomeji, Yaba
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-white font-medium text-sm flex items-center gap-2">
              <span className="text-base">
                <BiPhoneCall />
              </span>{" "}
              Call us
            </span>
            <div className="flex flex-col">
              <Link href="tel:+2347039594474">
                <span className="text-white/70 text-xs leading-relaxed">
                  +234 703 959 4474
                </span>
              </Link>
            </div>
          </div>

          {/* <div className="flex flex-col gap-2">
            <span className="text-white font-medium text-sm flex items-center gap-2">
              <span className="text-base">🇬🇧</span> United Kingdom
            </span>
            <span className="text-white/70 text-xs leading-relaxed">
              570 8th Ave, New York, NY 10018 United States
            </span>
          </div> */}
        </div>
      </div>

      {/* Copyright Section */}
      <div className="w-full max-w-7xl mx-auto border-t border-white/10 pt-8">
        <p className="text-white/60 text-sm text-center">
          Copyright © 2025 Insights and Vignettes. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
