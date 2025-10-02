"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FaRegEye, FaRegEyeSlash, FaGoogle } from "react-icons/fa6";
import { signUpSchema, type ZSignUpSchema } from "../validators/user.validator";
import { useCreateUser } from "../hooks/useCreateUserWithCredentials";
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
import { Separator } from "@/shared/components/ui/separator";

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<ZSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    mutate: createUser,
    isPending: isCreatingUser,
    isError,
    error,
    isSuccess,
  } = useCreateUser({
    onSuccess: (response) => {
      // Reset form on success
      form.reset();
      // You can add toast notification here
      console.log("User created successfully:", response.message);
    },
    onError: (error) => {
      // You can add toast notification here
      form.setError("root", { message: error });
    },
  });

  const onSubmit = (data: ZSignUpSchema) => {
    // Remove confirmPassword before sending to API
    const { confirmPassword, ...userCreationData } = data;
    createUser(userCreationData);
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google OAuth
    console.log("Google sign in clicked");
  };

  return (
    <div className="lg:min-h-screen min-h-full relative bg-primary/5 py-20 grid place-items-center">
      <div
        className="absolute opacity-20 inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
        linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
      `,
          backgroundSize: "32px 32px",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
          maskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
        }}
      />
      <div className="w-full max-w-[320px] sm:max-w-[400px] items-center relative gap-6 sm:gap-8 flex flex-col">
        <Image
          src="/I&V-no-bg.png"
          alt="Vignettes Logo"
          width={400}
          height={150}
          className="w-[160px] sm:w-[200px] object-contain"
        />

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
                    Account Created!
                  </h2>
                  <p className="text-sm sm:text-base text-green-700">
                    Your account has been created successfully. Please check
                    your email to verify your account before signing in.
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
                          className={`h-10 sm:h-12 rounded bg-white text-sm sm:text-base focus-visible:ring-0 focus-visible:ring-offset-0 ${
                            form.formState.errors.name
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
                            className={`h-10 sm:h-12 rounded pr-10 bg-white text-sm sm:text-base focus-visible:ring-0 focus-visible:ring-offset-0 ${
                              form.formState.errors.password
                                ? "border-destructive"
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
                            className={`h-10 sm:h-12 rounded pr-10 bg-white text-sm sm:text-base focus-visible:ring-0 focus-visible:ring-offset-0 ${
                              form.formState.errors.confirmPassword
                                ? "border-destructive"
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
                <Link
                  href="/reset-password"
                  className="text-sm text-primary underline self-end justify-self-end text-right w-max hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </Link>
                <Button
                  type="submit"
                  disabled={isCreatingUser}
                  className="rounded h-10 sm:h-12 w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {isCreatingUser ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-2 border-white border-t-transparent"></div>
                      <span className="text-xs sm:text-sm">
                        Creating Account...
                      </span>
                    </div>
                  ) : (
                    "Sign Up"
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
            <div className=" grid grid-cols-[1fr_20px_1fr] w-full items-center gap-3">
              <Separator />
              or
              <Separator />
            </div>
            <Button
              variant="outline"
              disabled={isCreatingUser}
              className="w-full rounded h-10 sm:h-12 flex items-center justify-center gap-2 sm:gap-3 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
              onClick={handleGoogleSignIn}
            >
              {isCreatingUser ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-2 border-primary border-t-transparent"></div>
                  <span className="text-xs sm:text-sm">Please wait...</span>
                </div>
              ) : (
                <>
                  <FaGoogle className="w-4 h-4 sm:w-5 sm:h-5" />
                  Continue with Google
                </>
              )}
            </Button>

            <div className="text-xs sm:text-sm text-slate-700 text-center">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-primary underline hover:text-primary/80 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
