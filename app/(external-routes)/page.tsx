import { FaHashtag } from "react-icons/fa6";
import { ArrowRight, User } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen grid p-4 sm:p-6 md:p-8 bg-primary/5">
      <section className="h-full w-full rounded-xl md:rounded-2xl bg-purple-950 relative overflow-hidden grid place-items-center min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-3rem)] md:min-h-[calc(100vh-4rem)]">
        <div className="bg-[url('/Grid-Light.png')] bg-cover bg-center w-full h-full absolute inset-0"></div>
        <div className="flex flex-col max-w-[95%] sm:max-w-[80%] md:max-w-[600px] relative items-center gap-2 px-4">
          <div className="flex gap-2 items-center w-max text-white uppercase text-xs sm:text-sm">
            <span className="text-primary">
              <FaHashtag />
            </span>
            <span>Tailored Job Leads</span>
          </div>

          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-6 sm:mt-8 text-center gap-1 sm:gap-2 capitalize flex flex-col font-semibold">
            <span>Stop Chasing Jobs.</span>
            <span className="text-primary">Let Them Find You.</span>
          </h1>

          <p className="text-white/90 text-center mt-3 sm:mt-4 text-sm sm:text-base">
            Automated job lead discovery across LinkedIn, Indeed, and top job
            boards. Find your next project before your competition does.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 w-full sm:w-auto">
            <Button
              asChild
              size="lg"
              className="rounded-md font-semibold uppercase px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto"
            >
              <Link
                href="/signup"
                className="flex items-center justify-center gap-2"
              >
                Get Started
                <ArrowRight className="hidden sm:block w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-md border-white/20 text-white bg-transparent hover:bg-white/10 hover:text-white font-semibold uppercase px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto"
            >
              <Link
                href="/sign-in"
                className="flex items-center justify-center gap-2"
              >
                <User className="hidden sm:block w-5 h-5" />
                Login
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
