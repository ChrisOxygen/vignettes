"use client";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

function WelcomeAndVerifyPage() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    // Get auth user from supabase and console log it
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error);
        return;
      }

      console.log("Auth user from Supabase:", user);
      console.log("User metadata:", user?.user_metadata);
      console.log("User status:", user?.user_metadata?.status);
      console.log("User role:", user?.user_metadata?.role);
      setUser(user);
    };

    getUser();
  }, [supabase.auth]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome! Please verify your email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a verification link to your email address. Please check
            your inbox and click the link to verify your account.
          </p>
          {user && (
            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-800">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-sm text-blue-800">
                <strong>Status:</strong>{" "}
                {user.user_metadata?.status || "Unknown"}
              </p>
              <p className="text-sm text-blue-800">
                <strong>Role:</strong> {user.user_metadata?.role || "Unknown"}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default WelcomeAndVerifyPage;
