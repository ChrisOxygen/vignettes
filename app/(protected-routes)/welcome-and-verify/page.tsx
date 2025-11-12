"use client";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { Button } from "@/shared/components/ui/button";
import { Mail, RefreshCw, Sparkles, CheckCircle2 } from "lucide-react";
import { useCreateEmailVerificationToken } from "@/features/auth/hooks/useCreateEmailVerificationToken";
import { ResendTimerButton } from "@/shared/components/ResendTimerButton";

function WelcomeAndVerifyPage() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error);
        return;
      }

      setUser(user);
    };

    getUser();
  }, [supabase.auth]);

  const { mutate: resendVerificationEmail, isPending } =
    useCreateEmailVerificationToken({
      onSuccess: (response) => {
        console.log("Verification email sent:", response);
        // Remove the manual state management since the timer component handles it
      },
      onError: (error) => {
        console.error("Failed to send verification email:", error);
        // You could add a toast notification here
      },
    });

  const handleResendEmail = () => {
    if (user?.email) {
      resendVerificationEmail(user.email);
    }
  };

  const getUserName = () => {
    return (
      user?.user_metadata?.firstName || user?.email?.split("@")[0] || "there"
    );
  };

  return (
    <main className="min-h-screen grid place-items-center p-4 sm:p-6 md:p-8 bg-gradient-to-b from-background to-muted/20">
      <section className="relative py-8 px-6 sm:px-8 md:px-12 text-center max-w-5xl w-full mx-auto">
        <div className="space-y-8">
          {/* Status Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-amber-100 text-amber-700 border border-amber-200">
            <Mail className="w-4 h-4 mr-2" />
            Email Verification Required
          </div>

          {/* Welcome Message */}
          <div className="space-y-4">
            <h1 className="scroll-m-20 text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight mb-4">
              Welcome{user ? `, ${getUserName()}` : ""}!
              <span className="block mt-2 bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                Almost There
              </span>
            </h1>

            <p className="text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              We've sent a verification link to{" "}
              <span className="font-semibold text-foreground">
                {user?.email}
              </span>
              . Please check your inbox and click the link to verify your
              account and start your visa journey.
            </p>
          </div>

          {/* Email Verification Card */}
          <div className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm max-w-2xl mx-auto">
            <div className="flex flex-col items-center space-y-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-primary" />
              </div>

              <div className="text-center space-y-3">
                <h2 className="scroll-m-20 font-semibold tracking-tight leading-tight text-xl sm:text-2xl">
                  Check Your Email
                </h2>
                <p className="leading-7 text-foreground/80 text-sm sm:text-base max-w-md">
                  Click the verification link in your email to activate your
                  account. Don't forget to check your spam folder if you don't
                  see it in your inbox.
                </p>
              </div>

              <div className="w-full space-y-4">
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Didn't receive the email?</span>
                </div>

                <ResendTimerButton
                  onResend={handleResendEmail}
                  isPending={isPending}
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Resend Verification Email
                </ResendTimerButton>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-muted/30 border border-muted-foreground/20 rounded-lg p-4 sm:p-6 max-w-2xl mx-auto">
            <div className="flex sm:flex-row flex-col items-start gap-3">
              <Sparkles className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="text-left space-y-2">
                <p className="leading-7 font-medium text-foreground text-sm sm:text-base">
                  What happens after verification?
                </p>
                <p className="leading-7 text-xs sm:text-sm text-muted-foreground">
                  Once verified, you'll have full access to our visa guidance
                  tools, digital form filling, and document management system to
                  make your application process seamless.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default WelcomeAndVerifyPage;
