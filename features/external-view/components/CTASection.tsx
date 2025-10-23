import Link from "next/link";
import React from "react";

function CTASection() {
  return (
    <section className="flex w-full flex-col gap-6 items-center px-4 sm:px-6 bg-primary/5 relative">
      <div className="mx-auto relative overflow-hidden py-16 sm:py-20 lg:py-26 max-w-7xl  w-full bg-primary rounded-3xl -mt-16 sm:-mt-20 lg:-mt-50 px-6 sm:px-12 text-center">
        <div className="absolute inset-0 bg-[url('/assets/red-dot-bg.jpg')] bg-no-repeat bg-top bg-cover opacity-40"></div>
        <div className="flex flex-col items-center justify-center gap-8 relative">
          {/* CTA Content */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight max-w-xl">
            Ready to Take the Next Step in Your Journey?
          </h2>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl leading-relaxed">
            Join thousands of successful applicants who have achieved their
            dreams of studying and working abroad. Let our expert team guide you
            through every step of your immigration process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              href="/sign-up"
              className="px-8 py-4 bg-white text-primary font-bold text-lg rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Get Started Now
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-lg hover:bg-white hover:text-primary transition-all duration-300 text-center"
            >
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
