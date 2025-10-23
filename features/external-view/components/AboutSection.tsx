"use client";

import React from "react";
import SectionTitle from "./SectionTitle";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { FaPassport, FaUserGraduate, FaGlobeAmericas } from "react-icons/fa";
import { Separator } from "@/shared/components/ui/separator";

function AboutSection() {
  const pathname = usePathname();
  const isAboutUsPage = pathname === "/about-us";

  return (
    <section className="flex w-full flex-col gap-6 items-center px-4 sm:px-6 bg-gradient-to-b from-transparent to-gray-100/40">
      <div className="mx-auto pb-16 sm:pb-20 lg:pb-26 max-w-7xl flex flex-col items-center gap-10 w-full">
        {!isAboutUsPage && (
          <Image
            src={`/assets/imgi_5_hero-3.webp`}
            alt="about-us"
            width={1500}
            height={1500}
            className="rounded-2xl w-full object-cover object-center h-[300px] sm:h-[500px] lg:h-[700px] overflow-hidden flex-shrink-0"
          />
        )}
        <div className=" sm:px-8 w-full flex flex-col gap-5">
          <SectionTitle
            title="Insights and Vignettes Limited (IVL)"
            className="max-w-7xl"
            alignment="left"
          />

          <p className="text-lg leading-relaxed text-gray-600">
            Nigeria's leading global talent mobility and international student
            recruitment agency. IVL offers global talented and promising
            individuals the Insights, materials, tools and assistance to
            navigate and form strategies and initiatives required to apply for
            family settlement routes and move abroad. Insights for global
            talents is aimed to facilitate mobility of talents and promising
            individuals around the globe. We also help students who have
            WAEC/NECO/GCE, National Diploma (ND), Higher National Diploma (HND),
            B.Sc./BA and Master Degrees to secure and process applications to
            further their education abroad. We offer a wide range of services
            and commitments to prospecting international students and parents
            whose children/wards seek higher education abroad including the
            United Kingdom (UK), United States of America (USA), Canada, The
            Republic of Ireland, United Arab Emirate (UAE), Germany, France, and
            Switzerland.
          </p>
          <div className="flex flex-col sm:flex-row w-full sm:items-center justify-center sm:justify-between gap-4 sm:gap-6 px-4 sm:px-6 py-6 rounded-lg">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <IoCheckmarkCircleOutline className="text-primary text-xl sm:hidden" />
              <span className="font-semibold text-sm sm:text-base">
                Immigration & Visa Consulting
              </span>
            </div>
            <div className="hidden sm:block h-8 w-[2px] bg-primary flex-shrink-0" />
            <div className="flex items-center gap-3 text-center sm:text-left">
              <IoCheckmarkCircleOutline className="text-primary text-xl sm:hidden" />
              <span className="font-semibold text-sm sm:text-base">
                International Student Recruitment
              </span>
            </div>
            <div className="hidden sm:block h-8 w-[2px] bg-primary flex-shrink-0" />
            <div className="flex items-center gap-3 text-center sm:text-left">
              <IoCheckmarkCircleOutline className="text-primary text-xl sm:hidden" />
              <span className="font-semibold text-sm sm:text-base">
                Global Talent Mobility
              </span>
            </div>
          </div>
          <div className="flex flex-col bg-primary/5 rounded-2xl py-8 px-8 sm:flex-row items-start sm:items-center justify-between gap-4 mt-4">
            <p className="text-gray-600 max-w-xl">
              Ready to start your immigration journey? Our expert team is here
              to guide you through every step of the process.
            </p>
            <button className="px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg whitespace-nowrap">
              Contact Us Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
