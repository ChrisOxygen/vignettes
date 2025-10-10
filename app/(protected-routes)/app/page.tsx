"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { WelcomeDialog } from "@/features/onboarding/components";

function UserDashboard() {
  const searchParams = useSearchParams();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Check if the user is a new user who just completed their profile
    const isNewUser = searchParams.get("newUser") === "true";

    if (isNewUser) {
      setShowWelcome(true);
      // Clean up the URL by removing the search param without causing a page reload
      const url = new URL(window.location.href);
      url.searchParams.delete("newUser");
      window.history.replaceState({}, "", url.toString());
    }
  }, [searchParams]);

  const handleWelcomeClose = (open: boolean) => {
    setShowWelcome(open);
  };

  return (
    <>
      <main className="w-full h-full grid place-items-center rounded-lg p-6 bg-gray-50">
        <div className="max-w-xl mx-auto rounded-lg bg-white border flex flex-col items-center p-8 text-center space-y-6">
          <h1 className="text-3xl font-bold text-foreground">
            No Applications Yet
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
            Ready to start your visa journey? Create your first application and
            let us guide you through the process step by step.
          </p>
          <Link
            href="/app/form"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Create Your First Application
          </Link>
        </div>
      </main>

      <WelcomeDialog open={showWelcome} onOpenChange={handleWelcomeClose} />
    </>
  );
}

export default UserDashboard;
