"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import {
  adminSignUpSchema,
  type ZAdminSignUpSchema,
} from "../validators/user.validator";
import { useCreateAdminUser } from "../hooks/useCreateAdminUser";
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

export function AdminSignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<ZAdminSignUpSchema>({
    resolver: zodResolver(adminSignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      adminCode: "",
    },
  });

  const {
    mutate: createAdminUser,
    isPending: isCreatingUser,
    isError,
    error,
    isSuccess,
  } = useCreateAdminUser({
    onSuccess: (response) => {
      // Reset form on success
      form.reset();
      // You can add toast notification here
      console.log("Admin user created successfully:", response.message);
    },
    onError: (error) => {
      // You can add toast notification here
      form.setError("root", { message: error });
    },
  });

  const onSubmit = (data: ZAdminSignUpSchema) => {
    // Remove confirmPassword before sending to API
    const { confirmPassword, ...adminUserCreationData } = data;
    createAdminUser(adminUserCreationData);
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
        <div className="flex flex-col items-center gap-2">
          <Image
            src="/assets/snap-logo-dark.webp"
            alt="Snap Logo"
            width={400}
            height={150}
            className="w-[160px] sm:w-[200px] object-contain"
          />
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-semibold text-foreground">
              Admin Sign Up
            </h1>
            <p className="text-sm text-muted-foreground">
              Create your admin account with invitation code
            </p>
          </div>
        </div>

        {isSuccess ? (
          // Success message component
          <div className="flex flex-col gap-4 sm:gap-6 w-full text-center">
            <div className="p-6 sm:p-8 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green-600"
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
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-green-800 mb-2">
                    Admin Account Created!
                  </h2>
                  <p className="text-sm sm:text-base text-green-700">
                    Your admin account has been created successfully. Please
                    check your email to verify your account before signing in.
                  </p>
                </div>
              </div>
            </div>
            <div className="text-xs sm:text-sm text-slate-700 text-center">
              Ready to sign in?{" "}
              <Link
                href="/sign-in"
                className="text-primary underline hover:text-primary/80 transition-colors"
              >
                Go to Sign In
              </Link>
            </div>
          </div>
        ) : (
          // Form component
          <div className="flex flex-col gap-4 sm:gap-6 w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4 sm:gap-6 w-full"
              >
                {/* Admin Code Field */}
                <FormField
                  control={form.control}
                  name="adminCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Admin Invitation Code</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your admin invitation code (e.g., admin2025)"
                          disabled={isCreatingUser}
                          className={`h-10 sm:h-12 rounded bg-white text-sm sm:text-base ${
                            form.formState.errors.adminCode
                              ? "border-destructive focus:border-destructive focus:ring-destructive"
                              : ""
                          }`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-destructive text-sm" />
                    </FormItem>
                  )}
                />

                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your full name"
                          disabled={isCreatingUser}
                          className={`h-10 sm:h-12 rounded bg-white text-sm sm:text-base ${
                            form.formState.errors.name
                              ? "border-destructive focus:border-destructive focus:ring-destructive"
                              : ""
                          }`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-destructive text-sm" />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
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
                          disabled={isCreatingUser}
                          className={`h-10 sm:h-12 rounded bg-white text-sm sm:text-base ${
                            form.formState.errors.email
                              ? "border-destructive focus:border-destructive focus:ring-destructive"
                              : ""
                          }`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-destructive text-sm" />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Enter your password"
                            type={showPassword ? "text" : "password"}
                            disabled={isCreatingUser}
                            className={`h-10 sm:h-12 rounded pr-10 bg-white text-sm sm:text-base ${
                              form.formState.errors.password
                                ? "border-destructive focus:border-destructive focus:ring-destructive"
                                : ""
                            }`}
                            {...field}
                          />
                          <button
                            type="button"
                            disabled={isCreatingUser}
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

                {/* Confirm Password Field */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Confirm your password"
                            type={showConfirmPassword ? "text" : "password"}
                            disabled={isCreatingUser}
                            className={`h-10 sm:h-12 rounded pr-10 bg-white text-sm sm:text-base ${
                              form.formState.errors.confirmPassword
                                ? "border-destructive focus:border-destructive focus:ring-destructive"
                                : ""
                            }`}
                            {...field}
                          />
                          <button
                            type="button"
                            disabled={isCreatingUser}
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

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isCreatingUser}
                  className="rounded h-10 sm:h-12 w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {isCreatingUser ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-2 border-white border-t-transparent"></div>
                      <span className="text-xs sm:text-sm">
                        Creating Admin Account...
                      </span>
                    </div>
                  ) : (
                    "Create Admin Account"
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
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-primary underline hover:text-primary/80 transition-colors"
              >
                Sign In
              </Link>
            </div>
            <div className="text-xs sm:text-sm text-slate-700 text-center">
              Regular user?{" "}
              <Link
                href="/sign-up"
                className="text-primary underline hover:text-primary/80 transition-colors"
              >
                Create Regular Account
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
