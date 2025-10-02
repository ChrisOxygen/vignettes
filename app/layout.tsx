import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/shared/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HireCo - Automated Job Leads for Freelancers",
  description:
    "Find freelance opportunities faster with automated job lead discovery from LinkedIn, Indeed, and top job boards. Never miss your next project.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${inter.variable}antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
