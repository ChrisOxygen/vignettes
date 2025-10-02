"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { emailSchema, type ZEmailInput } from "../validators/user.validator";
import { useResetPassword } from "../hooks/useResetPassword";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import Image from "next/image";

export function ResetPasswordForm() {
  const form = useForm<ZEmailInput>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    mutate: resetPassword,
    isPending: isResettingPassword,
    isError,
    error,
    isSuccess,
  } = useResetPassword({
    onSuccess: (response) => {
      // Reset form on success
      form.reset();
      // You can add toast notification here
      console.log("Password reset email sent:", response.message);
    },
    onError: (error) => {
      // You can add toast notification here
      form.setError("root", { message: error });
    },
  });

  const onSubmit = (data: ZEmailInput) => {
    resetPassword(data);
  };

  return (
    <div className="lg:min-h-screen min-h-full relative bg-primary/5 py-20 grid place-items-center">
      <div
        className="absolute opacity-40 inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
        linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
      `,
          backgroundSize: "32px 32px",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
        }}
      />
      <div className="w-full max-w-[320px] sm:max-w-[400px] items-center relative gap-6 sm:gap-8 flex flex-col">
        <Image
          src="/I&V-no-bg.png"
          alt="I&V Logo"
          width={400}
          height={150}
          className="w-[160px] sm:w-[200px] object-contain"
        />

        {isSuccess ? (
          // Success State - Show friendly message
          <div className="text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl font-light text-foreground">
                Check Your Email
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                A password reset link has been sent to your mailbox. Please
                check your email and follow the instructions to reset your
                password.
              </p>
            </div>
            <div className="text-xs sm:text-sm text-slate-500 text-center">
              Didn't receive the email? Check your spam folder or{" "}
              <button
                onClick={() => window.location.reload()}
                className="text-primary underline hover:text-primary/80 transition-colors"
              >
                try again
              </button>
            </div>
            <div className="flex flex-col gap-3 pt-4">
              <Link
                href="/sign-in"
                className="text-xs sm:text-sm text-slate-700 text-center"
              >
                <span className="text-primary underline hover:text-primary/80 transition-colors">
                  Back to Sign In
                </span>
              </Link>
            </div>
          </div>
        ) : (
          // Form State - Show reset password form
          <>
            <div className="text-center space-y-2">
              <h1 className="text-xl sm:text-2xl font-light text-foreground">
                Reset Password
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Enter your email address and we'll send you a reset link
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:gap-6 w-full">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-4 sm:gap-6 w-full"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your email address"
                            type="email"
                            disabled={isResettingPassword}
                            className={`h-10 sm:h-12 rounded bg-white text-sm sm:text-base focus-visible:ring-0 focus-visible:ring-offset-0 ${
                              form.formState.errors.email
                                ? "border-destructive"
                                : ""
                            }`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-destructive text-sm" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isResettingPassword}
                    className="rounded h-10 sm:h-12 w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    {isResettingPassword ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-2 border-white border-t-transparent"></div>
                        <span className="text-xs sm:text-sm">
                          Sending Reset Link...
                        </span>
                      </div>
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>

                  {/* Error Message */}
                  {isError && error && (
                    <div className="p-2 sm:p-3 bg-red-50 border border-red-200 rounded-lg">
                      <span className="text-red-600 text-xs sm:text-sm">
                        {error}
                      </span>
                    </div>
                  )}
                </form>
              </Form>

              <div className="text-xs sm:text-sm text-slate-700 text-center">
                Remember your password?{" "}
                <Link
                  href="/sign-in"
                  className="text-primary underline hover:text-primary/80 transition-colors"
                >
                  Sign In
                </Link>
              </div>

              <div className="text-xs sm:text-sm text-slate-700 text-center">
                Don't have an account?{" "}
                <Link
                  href="/sign-up"
                  className="text-primary underline hover:text-primary/80 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
