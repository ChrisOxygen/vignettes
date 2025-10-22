import { BiSolidQuoteLeft } from "react-icons/bi";
import { FaStar } from "react-icons/fa6";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import SectionTitle from "./SectionTitle";
import CustomCarouselControls from "./CustomCarouselControls";
import TestimonialCard from "./TestimonialCard";
import { TESTIMONIALS } from "../constants";

function TestimonialSection() {
  return (
    <section className="flex w-full flex-col bg-primary/5 py-16 sm:py-20 lg:py-26">
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <div className="flex items-center w-full justify-between mb-10">
            <SectionTitle
              subtitle="Our Testimonials"
              title="What Our Clients Say About Us"
              className="sm:max-w-xl max-w-[350px]"
              alignment="left"
            />
            <div className="hidden sm:flex">
              <CustomCarouselControls />
            </div>
          </div>

          <CarouselContent className="-ml-2 md:-ml-4">
            {TESTIMONIALS.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <TestimonialCard
                  name={testimonial.name}
                  position={testimonial.position}
                  testimonialText={testimonial.testimonialText}
                  imageIndex={index}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex sm:hidden mt-6">
            <CustomCarouselControls />
          </div>
        </Carousel>
      </div>
    </section>
  );
}

export default TestimonialSection;
