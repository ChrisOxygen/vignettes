import { FaHashtag } from "react-icons/fa6";
import { ArrowRight, Loader2, Sparkles, User } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import { ReactNode } from "react";

export default function Home() {
  interface TypographyProps {
    children: ReactNode;
    className?: string;
  }

  const H1: React.FC<TypographyProps> = ({ children, className = "" }) => (
    <h1
      className={`scroll-m-20 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight ${className}`}
    >
      {children}
    </h1>
  );

  const H2: React.FC<TypographyProps> = ({ children, className = "" }) => (
    <h2
      className={`scroll-m-20 text-3xl md:text-4xl font-semibold tracking-tight leading-tight ${className}`}
    >
      {children}
    </h2>
  );

  const H3: React.FC<TypographyProps> = ({ children, className = "" }) => (
    <h3
      className={`scroll-m-20 text-2xl md:text-3xl font-semibold tracking-tight leading-tight ${className}`}
    >
      {children}
    </h3>
  );

  const H4: React.FC<TypographyProps> = ({ children, className = "" }) => (
    <h4
      className={`scroll-m-20 text-xl md:text-2xl font-semibold tracking-tight leading-tight ${className}`}
    >
      {children}
    </h4>
  );

  const H5: React.FC<TypographyProps> = ({ children, className = "" }) => (
    <h5
      className={`scroll-m-20 text-lg md:text-xl font-semibold text-foreground/90 ${className}`}
    >
      {children}
    </h5>
  );

  const H6: React.FC<TypographyProps> = ({ children, className = "" }) => (
    <h6
      className={`scroll-m-20 text-base md:text-lg font-semibold text-foreground/80 ${className}`}
    >
      {children}
    </h6>
  );

  const Body: React.FC<TypographyProps> = ({ children, className = "" }) => (
    <p className={`leading-7 text-foreground/80 ${className}`}>{children}</p>
  );

  const BodyLarge: React.FC<TypographyProps> = ({
    children,
    className = "",
  }) => (
    <p className={`text-lg leading-8 text-foreground/80 ${className}`}>
      {children}
    </p>
  );

  const BodySmall: React.FC<TypographyProps> = ({
    children,
    className = "",
  }) => (
    <p className={`text-sm leading-6 text-muted-foreground ${className}`}>
      {children}
    </p>
  );

  interface EnhancedButtonProps extends React.ComponentProps<typeof Button> {
    loading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
  }

  const EnhancedButton: React.FC<EnhancedButtonProps> = ({
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props
  }) => {
    const isDisabled = disabled || loading;

    return (
      <Button disabled={isDisabled} {...props}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {children}
          </>
        ) : (
          <>
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-2">{rightIcon}</span>}
          </>
        )}
      </Button>
    );
  };
  return (
    <main className="min-h-screen grid place-items-center p-4 sm:p-6 md:p-8 bg-primary/5">
      <section className="relative py-20 px-6 text-center bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-6">
            <Sparkles className="w-3 h-3 mr-1" />
            New: Streamlined Application Process
          </div>

          <H1 className="mb-6">
            Your Complete{" "}
            <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
              Visa & Immigration
            </span>{" "}
            Companion
          </H1>

          <BodyLarge className="mb-8 max-w-2xl mx-auto">
            Navigate your visa journey with confidence. Get expert insights,
            fill out forms digitally, and keep all your documents organized in
            one secure place—whether you're a student or working professional.
          </BodyLarge>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
              size="lg"
              asChild
            >
              <Link href="/signup">
                Start Your Application
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              Explore Requirements
            </Button>
          </div>

          <BodySmall className="text-muted-foreground">
            Trusted by 50,000+ students and professionals worldwide
          </BodySmall>
        </div>
      </section>
    </main>
  );
}
