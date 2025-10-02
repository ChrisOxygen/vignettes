"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import {
  resetPasswordSchema,
  type ZResetPasswordInput,
} from "../validators/user.validator";
import { useUpdateUserPassword } from "../hooks/useUpdateUserPassword";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function UpdatePasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<ZResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const {
    mutate: updatePassword,
    isPending: isUpdatingPassword,
    isError,
    error,
    isSuccess,
  } = useUpdateUserPassword({
    onSuccess: (response) => {
      // Reset form on success
      form.reset();
      // You can add toast notification here
      console.log("Password updated successfully:", response.message);
    },
    onError: (error) => {
      // You can add toast notification here
      form.setError("root", { message: error });
    },
  });

  const onSubmit = (data: ZResetPasswordInput) => {
    updatePassword(data);
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
          src="/assets/snap-logo-dark.webp"
          alt="Snap Logo"
          width={400}
          height={150}
          className="w-[160px] sm:w-[200px] object-contain"
        />

        <div className="text-center space-y-2">
          <h1 className="text-xl sm:text-2xl font-light text-foreground">
            Update Password
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Enter your new password to update your account
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
                          disabled={isUpdatingPassword}
                          className={`h-10 sm:h-12 rounded pr-10 bg-white text-sm sm:text-base ${
                            form.formState.errors.password
                              ? "border-destructive focus:border-destructive focus:ring-destructive"
                              : ""
                          }`}
                          {...field}
                        />
                        <button
                          type="button"
                          disabled={isUpdatingPassword}
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
                          disabled={isUpdatingPassword}
                          className={`h-10 sm:h-12 rounded pr-10 bg-white text-sm sm:text-base ${
                            form.formState.errors.confirmPassword
                              ? "border-destructive focus:border-destructive focus:ring-destructive"
                              : ""
                          }`}
                          {...field}
                        />
                        <button
                          type="button"
                          disabled={isUpdatingPassword}
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
                disabled={isUpdatingPassword}
                className="rounded h-10 sm:h-12 w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {isUpdatingPassword ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-2 border-white border-t-transparent"></div>
                    <span className="text-xs sm:text-sm">
                      Updating Password...
                    </span>
                  </div>
                ) : (
                  "Update Password"
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

              {/* Success Message */}
              {isSuccess && (
                <div className="p-2 sm:p-3 bg-green-50 border border-green-200 rounded-lg">
                  <span className="text-green-600 text-xs sm:text-sm">
                    Password updated successfully! Your new password is now
                    active.
                  </span>
                </div>
              )}
            </form>
          </Form>

          <div className="text-xs sm:text-sm text-slate-700 text-center">
            Want to go back?{" "}
            <Link
              href="/dashboard"
              className="text-primary underline hover:text-primary/80 transition-colors"
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
