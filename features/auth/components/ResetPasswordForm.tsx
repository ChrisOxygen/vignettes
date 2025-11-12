"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import {
  resetPasswordSchema,
  type ZResetPasswordInput,
} from "../validators/user.validator";
import { useConfirmPasswordReset } from "../hooks";
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const params = useParams();
  const token = params.token as string;

  const form = useForm<ZResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const {
    mutate: resetPassword,
    isPending: isResettingPassword,
    isError,
    error,
    isSuccess,
  } = useConfirmPasswordReset({
    onSuccess: (response) => {
      // Reset form on success
      form.reset();
      console.log("Password reset successful:", response.message);
    },
    onError: (error) => {
      form.setError("root", { message: error });
    },
  });

  const onSubmit = (data: ZResetPasswordInput) => {
    if (!token) {
      form.setError("root", {
        message: "Invalid reset link. Please request a new password reset.",
      });
      return;
    }

    // Remove confirmPassword and add token
    const { confirmPassword, ...passwordData } = data;
    resetPassword({
      token,
      password: passwordData.password,
      confirmPassword,
    });
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
          // Success State - Show success message
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl font-light text-foreground">
                Password Reset Successful!
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Your password has been successfully reset. You can now sign in
                with your new password.
              </p>
            </div>
            <div className="flex flex-col gap-3 pt-4">
              <Button
                onClick={() => router.push("/sign-in")}
                className="rounded h-10 sm:h-12 w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors text-sm sm:text-base"
              >
                Go to Sign In
              </Button>
            </div>
          </div>
        ) : (
          // Form State - Show reset password form
          <>
            <div className="text-center space-y-2">
              <h1 className="text-xl sm:text-2xl font-light text-foreground">
                Create New Password
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Enter your new password below
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
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Enter your new password"
                              type={showPassword ? "text" : "password"}
                              disabled={isResettingPassword}
                              className={`h-10 sm:h-12 rounded pr-10 bg-white text-sm sm:text-base focus-visible:ring-0 focus-visible:ring-offset-0 ${
                                form.formState.errors.password
                                  ? "border-destructive"
                                  : ""
                              }`}
                              {...field}
                            />
                            <button
                              type="button"
                              disabled={isResettingPassword}
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-destructive text-sm" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Confirm your new password"
                              type={showConfirmPassword ? "text" : "password"}
                              disabled={isResettingPassword}
                              className={`h-10 sm:h-12 rounded pr-10 bg-white text-sm sm:text-base focus-visible:ring-0 focus-visible:ring-offset-0 ${
                                form.formState.errors.confirmPassword
                                  ? "border-destructive"
                                  : ""
                              }`}
                              {...field}
                            />
                            <button
                              type="button"
                              disabled={isResettingPassword}
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {showConfirmPassword ? (
                                <FaRegEyeSlash />
                              ) : (
                                <FaRegEye />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-destructive text-sm" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isResettingPassword || !token}
                    className="rounded h-10 sm:h-12 w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    {isResettingPassword ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-2 border-white border-t-transparent"></div>
                        <span className="text-xs sm:text-sm">
                          Resetting Password...
                        </span>
                      </div>
                    ) : (
                      "Reset Password"
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

                  {/* Invalid token warning */}
                  {!token && (
                    <div className="p-2 sm:p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <span className="text-amber-600 text-xs sm:text-sm">
                        Invalid reset link. Please request a new password reset.
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
            </div>
          </>
        )}
      </div>
    </div>
  );
}
