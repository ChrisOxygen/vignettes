import Image from "next/image";
import { BiSolidQuoteLeft } from "react-icons/bi";
import { FaStar } from "react-icons/fa6";

interface TestimonialCardProps {
  name: string;
  position: string;
  testimonialText: string;
  imageIndex: number;
}

function TestimonialCard({
  name,
  position,
  testimonialText,
  imageIndex,
}: TestimonialCardProps) {
  return (
    <div className="relative flex flex-col gap-5 px-5 py-8 rounded-2xl bg-gray-500/10 w-full h-full overflow-hidden">
      {/* Animated rotating border */}
      <div
        className="absolute inset-[-4px] rounded-2xl animate-spin"
        style={{
          background:
            "conic-gradient(from 0deg, #ef4444 0%, #ef4444 10%, transparent 20%, transparent 30%, #ef4444 40%, #ef4444 50%, transparent 60%, transparent 70%, #ef4444 80%, #ef4444 90%, transparent 100%)",
          animationDuration: "4s",
        }}
      ></div>
      <div className="absolute inset-[1px] rounded-2xl bg-white"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-5 h-full">
        <span className="absolute right-[30px] top-[30px] text-8xl text-black/5">
          <BiSolidQuoteLeft />
        </span>
        <div className="flex items-center gap-5">
          <Image
            src={`/assets/service-snippet-img-2.webp`}
            alt={name}
            width={100}
            height={100}
            className="rounded-full size-16 object-cover object-center overflow-hidden flex-shrink-0"
          />
          <div className="flex flex-col">
            <h5 className="text-lg font-semibold">{name}</h5>
            <span className="text-gray-600">{position}</span>
          </div>
        </div>
        <p className="text-2xl">{testimonialText}</p>
        <div className="mt-auto flex gap-1 text-yellow-400 text-xl items-center">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
