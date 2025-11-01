"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { WelcomeDialog } from "@/features/onboarding/components";
import { Button } from "@/shared/components/ui/button";
import {
  IoNotificationsOutline,
  IoPersonCircleOutline,
  IoPowerOutline,
} from "react-icons/io5";

import { FiUser } from "react-icons/fi";

import { LuBellRing } from "react-icons/lu";
import { useCurrentUser } from "@/features/auth/hooks";

function UserDashboard() {
  const searchParams = useSearchParams();
  const [showWelcome, setShowWelcome] = useState(false);
  const { user, isLoading } = useCurrentUser();

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
      <main className="w-full h-screen grid grid-cols-[200px_1fr] gap-3 rounded-lg p-6 bg-white">
        <div className=" bg-gray-50 rounded-lg">{/* Sidebar */}</div>
        <div className="grid grid-rows-[80px_1fr] gap-3">
          <div className="bg-gray-50 rounded-lg px-6 flex items-center justify-between">
            {/* User Greeting */}
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}!
              </h2>
              <p className="text-sm text-muted-foreground">
                Good to see you again
              </p>
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full border border-gray-300 hover:border-primary hover:bg-primary/10"
              >
                <LuBellRing className="w-6 h-6 hover:text-primary" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border border-gray-300 hover:border-primary hover:bg-primary/10"
              >
                <FiUser className="w-6 h-6 hover:text-primary" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border border-red-500 bg-red-50 hover:bg-red-100"
              >
                <IoPowerOutline className="w-5 h-5 text-red-500" />
              </Button>
            </div>
          </div>
          <div className=" bg-gray-50 rounded-lg">{/* Main Content */}</div>
        </div>
      </main>

      <WelcomeDialog open={showWelcome} onOpenChange={handleWelcomeClose} />
    </>
  );
}

export default UserDashboard;
