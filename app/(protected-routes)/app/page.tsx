"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { WelcomeDialog } from "@/features/onboarding/components";

function UserDashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();
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
      <main className="w-full h-full bg-muted/20 rounded-lg p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Welcome to Your Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">
            Your migration journey starts here. Manage your applications, track
            progress, and access resources to help with your visa applications.
          </p>
        </div>
      </main>

      <WelcomeDialog open={showWelcome} onOpenChange={handleWelcomeClose} />
    </>
  );
}

export default UserDashboard;
