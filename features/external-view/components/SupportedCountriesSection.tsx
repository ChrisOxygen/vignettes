"use client";

import React from "react";
import SectionTitle from "./SectionTitle";
import { VISA_TYPES } from "../constants";
import Image from "next/image";
import { usePathname } from "next/navigation";

function SupportedCountriesSection() {
  const pathname = usePathname();
  const isPartnerInstitutionsPage = pathname === "/partner-institutions";
  return (
    <section className=" flex w-full flex-col gap-6 items-center px-4 sm:px-6 bg-[url('/assets/imgi_41_pattern-8.webp')] bg-no-repeat bg-top bg-cover">
      <div className="mx-auto py-16 sm:py-20 lg:py-26 max-w-7xl flex flex-col items-center gap-10 w-full">
        <SectionTitle
          subtitle="Global Coverage"
          title="Countries We Support for Immigration Services"
          className="max-w-2xl"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-6 md:grid-rows-3 lg:grid-rows-2 gap-4 lg:gap-6 w-full">
          {VISA_TYPES.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-6 p-4 bg-white rounded-lg border border-gray/20 hover:border-primary hover:scale-[1.02] transition-all duration-300"
            >
              <Image
                src={`/assets/${item.country.toLowerCase().replace(/\s+/g, "-")}.webp`}
                alt={item.country}
                width={100}
                height={100}
                className="rounded-full size-20 object-cover object-center overflow-hidden flex-shrink-0"
              />
              <div className="flex flex-col ">
                <h5 className="text-lg font-semibold">{item.country}</h5>
                <p className="text-gray-600 text-sm">{item.visaTypes}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section - Hidden on Partner Institutions page */}
        {!isPartnerInstitutionsPage && (
          <div className="flex flex-col items-center gap-4 text-center mt-8">
            <p className="text-lg text-gray-700 max-w-2xl">
              Looking for partner institutions in your destination country?
              Explore our network of trusted educational partners worldwide.
            </p>
            <button className="px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg">
              See Our Partner Institutions
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default SupportedCountriesSection;
