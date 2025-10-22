"use client";

import { useCarousel } from "@/components/ui/carousel";

import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

function CustomCarouselControls() {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
    useCarousel();
  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <button
        className="size-10 sm:size-12 md:size-14 text-lg sm:text-xl md:text-2xl grid place-items-center rounded-full border transition-colors duration-200 hover:border-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:text-foreground"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
      >
        <FiArrowLeft />
      </button>
      <button
        className="size-10 sm:size-12 md:size-14 text-lg sm:text-xl md:text-2xl grid place-items-center rounded-full border transition-colors duration-200 hover:border-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:text-foreground"
        onClick={scrollNext}
        disabled={!canScrollNext}
      >
        <FiArrowRight />
      </button>
    </div>
  );
}

export default CustomCarouselControls;
