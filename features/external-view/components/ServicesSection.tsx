import Image from "next/image";
import Link from "next/link";
import SectionTitle from "./SectionTitle";
import { SERVICES_SNIPPET } from "../constants";

function ServicesSection() {
  return (
    <section className=" flex w-full flex-col gap-6 items-center px-4 sm:px-6">
      <div className="mx-auto py-16 sm:py-20 lg:py-26 max-w-7xl flex flex-col items-center gap-10 w-full">
        <SectionTitle
          subtitle="Services We Provide"
          title="Explore Our Visa Citizenship & Immigration Services"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 w-full">
          {SERVICES_SNIPPET.map((service, index) => (
            <Link key={service.title} href={service.link} className="flex">
              <div className="flex flex-col items-center gap-3 bg-white p-4 rounded-xl border-2 border-gray/20 hover:border-primary hover:scale-[1.02] transition-all duration-300 group w-full h-full">
                <Image
                  src={`/assets/service-snippet-img-${index + 1}.webp`}
                  alt={service.title}
                  width={700}
                  height={700}
                  className=" object-cover object-center w-full h-[200px] rounded-lg flex-shrink-0"
                />
                <div className="flex flex-col gap-2 flex-1">
                  <h5 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h5>
                  <span className="text-gray-600">{service.description}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
