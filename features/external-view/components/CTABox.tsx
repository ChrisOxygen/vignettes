import React from "react";
import Link from "next/link";

interface CTABoxProps {
  text: string;
  buttonText?: string;
  href?: string;
}

function CTABox({
  text,
  buttonText = "Contact Us Today",
  href = "/contact",
}: CTABoxProps) {
  return (
    <div className="flex flex-col bg-primary/5 rounded-2xl py-8 px-8 sm:flex-row items-start sm:items-center justify-between gap-4 mt-4">
      <p className="text-gray-600 max-w-xl">{text}</p>
      <Link
        href={href}
        className="px-8 py-3 bg-primary cursor-pointer text-white font-bold rounded-lg hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg whitespace-nowrap"
      >
        {buttonText}
      </Link>
    </div>
  );
}

export default CTABox;
