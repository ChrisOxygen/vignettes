"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Home, ArrowLeft, FileQuestion, Search } from "lucide-react";

interface NotFoundTemplateProps {
  title?: string;
  message?: string;
  showSearchButton?: boolean;
  customActions?: React.ReactNode;
}

export function NotFoundTemplate({
  title = "Page Not Found",
  message = "Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or you may have entered an incorrect URL.",
  showSearchButton = false,
  customActions,
}: NotFoundTemplateProps) {
  return (
    <div className="grid place-items-center p-4">
      <Card className="w-full max-w-md text-center border-border/40 bg-background/50 backdrop-blur-sm">
        <CardContent className="pt-8 pb-8 px-6">
          {/* 404 Icon */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <FileQuestion className="h-20 w-20 text-muted-foreground/60" />
              <div className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs font-bold rounded-full h-8 w-8 flex items-center justify-center">
                404
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-foreground mb-3">{title}</h1>

          {/* Message */}
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {message}
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Dashboard Button */}
            <Link href="/app" className="block">
              <Button
                className="w-full h-11 text-base cursor-pointer font-medium"
                size="lg"
              >
                <Home className="mr-2 h-4 w-4" />
                Go to Dashboard
              </Button>
            </Link>

            {/* Back Button */}
            <Button
              variant="outline"
              className="w-full h-11 text-base cursor-pointer font-medium border-border/40 hover:border-border/60"
              size="lg"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>

            {/* Optional Search Button */}
            {showSearchButton && (
              <Link href="/app/search" className="block">
                <Button
                  variant="ghost"
                  className="w-full h-11 text-base font-medium text-muted-foreground hover:text-foreground"
                  size="lg"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </Link>
            )}

            {/* Custom Actions */}
            {customActions && <div className="pt-2">{customActions}</div>}
          </div>

          {/* Help Text */}
          <div className="mt-8 pt-6 border-t border-border/20">
            <p className="text-xs text-muted-foreground">
              If you believe this is an error, please{" "}
              <Link
                href="/contact"
                className="text-primary hover:text-primary/80 underline underline-offset-4"
              >
                contact support
              </Link>
              .
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
