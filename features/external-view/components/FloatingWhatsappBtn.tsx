"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

function FloatingWhatsappBtn() {
  const [isVisible, setIsVisible] = useState(false);
  const [isBuzzing, setIsBuzzing] = useState(false);

  const whatsappNumber = "2347039594474";
  const message =
    "hello and good day, I have some enquires about Insights and Vignettes Services";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  // Fade in after 3 seconds
  useEffect(() => {
    const fadeInTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(fadeInTimer);
  }, []);

  // Buzz every 1 minute
  useEffect(() => {
    const buzzInterval = setInterval(() => {
      setIsBuzzing(true);
      // Reset buzz animation after 500ms
      setTimeout(() => {
        setIsBuzzing(false);
      }, 500);
    }, 60000); // 60 seconds

    return () => clearInterval(buzzInterval);
  }, []);

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed cursor-pointer z-50 size-16 hover:scale-105 transition-all duration-1000 bottom-5 right-5 text-6xl text-green-700  ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${isBuzzing ? "animate-buzz" : ""}`}
    >
      <Image
        src="/assets/wa-icon.webp"
        alt="WhatsApp Logo"
        width={100}
        height={100}
        className="cursor-pointer size-16"
        style={{
          filter:
            "drop-shadow(0 15px 60px rgba(0, 0, 0, 0.116)) drop-shadow(0 5px 15px rgba(0, 0, 0, 0.404))",
        }}
      />
      <style jsx>{`
        @keyframes buzz {
          0%,
          100% {
            transform: translateX(0) rotate(0deg);
          }
          10% {
            transform: translateX(-3px) rotate(-3deg);
          }
          20% {
            transform: translateX(3px) rotate(3deg);
          }
          30% {
            transform: translateX(-3px) rotate(-3deg);
          }
          40% {
            transform: translateX(3px) rotate(3deg);
          }
          50% {
            transform: translateX(-3px) rotate(-3deg);
          }
          60% {
            transform: translateX(3px) rotate(3deg);
          }
          70% {
            transform: translateX(-3px) rotate(-3deg);
          }
          80% {
            transform: translateX(3px) rotate(3deg);
          }
          90% {
            transform: translateX(-3px) rotate(-3deg);
          }
        }
        :global(.animate-buzz) {
          animation: buzz 0.5s ease-in-out;
        }
      `}</style>
    </Link>
  );
}

export default FloatingWhatsappBtn;
