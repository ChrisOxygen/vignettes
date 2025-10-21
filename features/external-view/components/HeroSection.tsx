import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";

function HeroSection() {
  return (
    <main className="lg:min-h-screen relative h-full grid grid-rows-[100px_1fr] p-4 sm:p-6 md:p-8">
      {/* Background with filter - separate layer */}
      <div className="absolute inset-0 -z-10 bg-[url('/assets/imgi_5_hero-3.webp')] bg-no-repeat bg-center bg-cover filter brightness-[49%] saturate-[139%] contrast-[118%]"></div>
      <div className="absolute inset-0 -z-10 bg-black/40"></div>

      <section className="relative grid place-items-center row-start-2 z-10 py-20 px-6 text-center ">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary mb-6">
            <Sparkles className="w-3 h-3 mr-1" />
            New: Streamlined Application Process
          </div>

          <h1 className="scroll-m-20 text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6 text-white">
            Your Complete{" "}
            <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
              Visa & Immigration
            </span>{" "}
            Companion
          </h1>

          <p className="sm:text-lg leading-6 sm:leading-8 text-white/90 mb-8 max-w-2xl mx-auto">
            Navigate your visa journey with confidence. Get expert insights,
            fill out forms digitally, and keep all your documents organized in
            one secure place—whether you're a student or working professional.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
              size="lg"
              asChild
            >
              <Link href="/sign-up">
                Start Your Application
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/40 bg-white/20 text-white hover:bg-white hover:border-white hover:text-primary"
            >
              Explore Requirements
            </Button>
          </div>

          <p className="text-sm leading-6 text-white/80">
            Trusted by 50,000+ students and professionals worldwide
          </p>
        </div>
      </section>
    </main>
  );
}

export default HeroSection;
