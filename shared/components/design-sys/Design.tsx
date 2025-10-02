"use client";

import React, { useState, ReactNode } from "react";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/shared/components/ui/alert";
import { Badge } from "@/shared/components/ui/badge";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  Loader2,
  ArrowRight,
  Sparkles,
  Copy,
  Download,
  Share2,
  Star,
  Heart,
  Zap,
} from "lucide-react";

// Note: Design tokens are defined in globals.css as CSS custom properties
// and are accessible via Tailwind utility classes

// ================================
// TYPOGRAPHY COMPONENTS
// ================================

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

const BodyLarge: React.FC<TypographyProps> = ({ children, className = "" }) => (
  <p className={`text-lg leading-8 text-foreground/80 ${className}`}>
    {children}
  </p>
);

const BodySmall: React.FC<TypographyProps> = ({ children, className = "" }) => (
  <p className={`text-sm leading-6 text-muted-foreground ${className}`}>
    {children}
  </p>
);

const Caption: React.FC<TypographyProps> = ({ children, className = "" }) => (
  <p className={`text-xs leading-5 text-muted-foreground ${className}`}>
    {children}
  </p>
);

// ================================
// ENHANCED BUTTON COMPONENTS WITH LOADING STATES
// ================================

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

// ================================
// ENHANCED FORM COMPONENTS
// ================================

interface EnhancedInputProps extends React.ComponentProps<typeof Input> {
  label?: string;
  error?: string;
  success?: string;
  description?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const EnhancedInput: React.FC<EnhancedInputProps> = ({
  label,
  error,
  success,
  description,
  leftIcon,
  rightIcon,
  className = "",
  ...props
}) => {
  const inputClasses = [
    // Base shadcn styles maintained
    leftIcon ? "pl-10" : "",
    rightIcon ? "pr-10" : "",
    // Custom validation states (no focus ring/shadow)
    error
      ? "border-destructive focus-visible:ring-0 focus-visible:ring-offset-0"
      : "",
    success
      ? "border-green-500 focus-visible:ring-0 focus-visible:ring-offset-0"
      : "",
    // Remove default focus ring for all inputs
    "focus-visible:ring-0 focus-visible:ring-offset-0",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="space-y-2">
      {label && (
        <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </Label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10">
            {leftIcon}
          </div>
        )}
        <Input className={inputClasses} {...props} />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10">
            {rightIcon}
          </div>
        )}
      </div>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
      {success && <p className="text-sm text-green-600">{success}</p>}
    </div>
  );
};

// Enhanced Form Field Component using shadcn Form
interface EnhancedFormFieldProps {
  name: string;
  label?: string;
  description?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
}

const EnhancedFormField: React.FC<EnhancedFormFieldProps> = ({
  name,
  label,
  description,
  leftIcon,
  rightIcon,
  children,
}) => {
  return (
    <FormItem>
      {label && <FormLabel>{label}</FormLabel>}
      <FormControl>
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10">
              {leftIcon}
            </div>
          )}
          {children}
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10">
              {rightIcon}
            </div>
          )}
        </div>
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
};

// ================================
// CARD COMPONENTS
// ================================

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hover = false,
}) => (
  <div
    className={`rounded-lg border bg-card text-card-foreground shadow-sm ${
      hover ? "hover:shadow-md transition-shadow duration-200" : ""
    } ${className}`}
  >
    {children}
  </div>
);

const CardHeader: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);

const CardContent: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const CardFooter: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`flex items-center p-6 pt-0 ${className}`}>{children}</div>
);

// ================================
// TESTIMONIAL CARD
// ================================

interface TestimonialCardProps {
  name: string;
  title: string;
  content: string;
  rating: number;
  avatar?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  title,
  content,
  rating,
  avatar,
}) => (
  <Card hover className="p-6">
    <div className="flex items-start space-x-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center text-white font-semibold">
        {avatar || name.charAt(0)}
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <Body className="mb-3 italic">"{content}"</Body>
        <div>
          <H6 className="font-semibold">{name}</H6>
          <BodySmall>{title}</BodySmall>
        </div>
      </div>
    </div>
  </Card>
);

// ================================
// HERO SECTION COMPONENT
// ================================

const HeroSection: React.FC = () => (
  <section className="relative py-20 px-6 text-center bg-gradient-to-b from-background to-muted/20">
    <div className="max-w-4xl mx-auto">
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-6">
        <Sparkles className="w-3 h-3 mr-1" />
        New: AI-Powered Features
      </div>

      <H1 className="mb-6">
        Supercharge Your{" "}
        <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
          Writing & Reading
        </span>{" "}
        with AI
      </H1>

      <BodyLarge className="mb-8 max-w-2xl mx-auto">
        Generate high-converting copy in seconds—ads, emails, blogs, and more.
        AI-powered, lightning-fast, and tailored to your brand voice.
      </BodyLarge>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <EnhancedButton
          className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          size="lg"
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Try for Free
        </EnhancedButton>
        <EnhancedButton variant="outline" size="lg">
          See How It Works
        </EnhancedButton>
      </div>

      <BodySmall className="text-muted-foreground">
        Trusted by 100,000+ marketers, writers, and entrepreneurs
      </BodySmall>
    </div>
  </section>
);

// ================================
// MAIN DESIGN SYSTEM COMPONENT
// ================================

export default function DesignSystem() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    message: "",
    newsletter: false,
  });

  const handleLoadingDemo = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background px-10">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <H4>Vignettes Design System</H4>
          <nav className="flex items-center space-x-6">
            <EnhancedButton variant="ghost" size="sm">
              Documentation
            </EnhancedButton>
            <EnhancedButton variant="ghost" size="sm">
              Components
            </EnhancedButton>
            <EnhancedButton size="sm">Get Started</EnhancedButton>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection />

      <main className="container py-20 space-y-20">
        {/* Color Palette */}
        <section>
          <H2 className="mb-8">Color System</H2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <div className="w-full h-20 rounded-md mb-4 border bg-primary" />
              <H6>Primary</H6>
              <Caption className="font-mono">hsl(var(--primary))</Caption>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-full h-20 rounded-md mb-4 border bg-secondary" />
              <H6>Secondary</H6>
              <Caption className="font-mono">hsl(var(--secondary))</Caption>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-full h-20 rounded-md mb-4 border bg-accent" />
              <H6>Accent</H6>
              <Caption className="font-mono">hsl(var(--accent))</Caption>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-full h-20 rounded-md mb-4 border bg-muted" />
              <H6>Muted</H6>
              <Caption className="font-mono">hsl(var(--muted))</Caption>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-full h-20 rounded-md mb-4 border bg-destructive" />
              <H6>Destructive</H6>
              <Caption className="font-mono">hsl(var(--destructive))</Caption>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-full h-20 rounded-md mb-4 border bg-background" />
              <H6>Background</H6>
              <Caption className="font-mono">hsl(var(--background))</Caption>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-full h-20 rounded-md mb-4 border bg-foreground" />
              <H6>Foreground</H6>
              <Caption className="font-mono">hsl(var(--foreground))</Caption>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-full h-20 rounded-md mb-4 border bg-border" />
              <H6>Border</H6>
              <Caption className="font-mono">hsl(var(--border))</Caption>
            </Card>
          </div>
        </section>

        {/* Typography */}
        <section>
          <H2 className="mb-8">Typography</H2>
          <div className="space-y-8">
            <div>
              <H3 className="mb-4">Headings</H3>
              <div className="space-y-4">
                <H1>Heading 1 - The quick brown fox</H1>
                <H2>Heading 2 - The quick brown fox</H2>
                <H3>Heading 3 - The quick brown fox</H3>
                <H4>Heading 4 - The quick brown fox</H4>
                <H5>Heading 5 - The quick brown fox</H5>
                <H6>Heading 6 - The quick brown fox</H6>
              </div>
            </div>

            <div>
              <H3 className="mb-4">Body Text</H3>
              <div className="space-y-4">
                <BodyLarge>
                  Large body text - Perfect for introductions and important
                  content that needs emphasis.
                </BodyLarge>
                <Body>
                  Regular body text - The foundation of readable content. This
                  is the standard text size for most content.
                </Body>
                <BodySmall>
                  Small body text - Ideal for captions, metadata, and secondary
                  information.
                </BodySmall>
                <Caption>
                  Caption text - Used for image captions, footnotes, and fine
                  print.
                </Caption>
              </div>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section>
          <H2 className="mb-8">Buttons</H2>

          <div className="space-y-8">
            <div>
              <H3 className="mb-4">Button Variants</H3>
              <div className="flex flex-wrap gap-4">
                <EnhancedButton variant="default">Default</EnhancedButton>
                <EnhancedButton variant="secondary">Secondary</EnhancedButton>
                <EnhancedButton variant="outline">Outline</EnhancedButton>
                <EnhancedButton variant="ghost">Ghost</EnhancedButton>
                <EnhancedButton variant="destructive">
                  Destructive
                </EnhancedButton>
                <EnhancedButton className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
                  Gradient
                </EnhancedButton>
                <EnhancedButton variant="link">Link</EnhancedButton>
              </div>
            </div>

            <div>
              <H3 className="mb-4">Button Sizes</H3>
              <div className="flex flex-wrap items-center gap-4">
                <EnhancedButton size="sm">Small</EnhancedButton>
                <EnhancedButton size="default">Default</EnhancedButton>
                <EnhancedButton size="lg">Large</EnhancedButton>
                <EnhancedButton className="h-12 px-10 text-lg">
                  Extra Large
                </EnhancedButton>
                <EnhancedButton size="icon" variant="outline">
                  <Heart className="w-4 h-4" />
                </EnhancedButton>
              </div>
            </div>

            <div>
              <H3 className="mb-4">Button States</H3>
              <div className="flex flex-wrap gap-4">
                <EnhancedButton leftIcon={<Zap className="w-4 h-4" />}>
                  With Left Icon
                </EnhancedButton>
                <EnhancedButton rightIcon={<ArrowRight className="w-4 h-4" />}>
                  With Right Icon
                </EnhancedButton>
                <EnhancedButton
                  loading={isLoading}
                  onClick={handleLoadingDemo}
                  className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                >
                  {isLoading ? "Processing..." : "Click to Load"}
                </EnhancedButton>
                <EnhancedButton disabled>Disabled</EnhancedButton>
              </div>
            </div>

            <div>
              <H3 className="mb-4">Interactive Buttons</H3>
              <div className="flex flex-wrap gap-4">
                <EnhancedButton
                  variant="outline"
                  leftIcon={<Copy className="w-4 h-4" />}
                >
                  Copy
                </EnhancedButton>
                <EnhancedButton
                  variant="outline"
                  leftIcon={<Download className="w-4 h-4" />}
                >
                  Download
                </EnhancedButton>
                <EnhancedButton
                  variant="outline"
                  leftIcon={<Share2 className="w-4 h-4" />}
                >
                  Share
                </EnhancedButton>
              </div>
            </div>
          </div>
        </section>

        {/* Forms */}
        <section>
          <H2 className="mb-8">Form Components</H2>

          <div className="max-w-md space-y-6">
            <EnhancedInput
              label="Email Address"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, email: e.target.value })
              }
              description="We'll never share your email with anyone else."
            />

            <EnhancedInput
              label="Search"
              placeholder="Search templates..."
              leftIcon={<Info className="w-4 h-4" />}
            />

            <EnhancedInput
              label="Password (Error State)"
              type="password"
              placeholder="Enter password"
              error="Password must be at least 8 characters"
            />

            <EnhancedInput
              label="Username (Success State)"
              placeholder="Enter username"
              success="Username is available"
              rightIcon={<CheckCircle className="w-4 h-4 text-green-500" />}
            />

            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea
                placeholder="Tell us about your project..."
                value={formData.message}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="min-h-[100px]"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="newsletter"
                checked={formData.newsletter}
                onCheckedChange={(checked: boolean) =>
                  setFormData({ ...formData, newsletter: checked })
                }
              />
              <Label htmlFor="newsletter" className="text-sm leading-none">
                Subscribe to our newsletter for updates
              </Label>
            </div>

            <EnhancedButton className="w-full bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
              Submit Form
            </EnhancedButton>
          </div>

          <div className="mt-12">
            <H3 className="mb-6">Enhanced Input Variants</H3>
            <div className="max-w-md space-y-6">
              <EnhancedInput
                label="With Left Icon"
                placeholder="Enter your name..."
                leftIcon={<Info className="w-4 h-4" />}
                description="This input has a left icon for better UX"
              />

              <EnhancedInput
                label="With Right Icon"
                placeholder="Username"
                rightIcon={<CheckCircle className="w-4 h-4 text-green-500" />}
                success="Username is available"
              />

              <EnhancedInput
                label="Error State"
                placeholder="Enter invalid input"
                error="This field has an error"
              />

              <EnhancedInput
                label="Success State"
                placeholder="Valid input"
                success="This looks good!"
              />

              <EnhancedInput
                label="Disabled State"
                placeholder="Can't edit this"
                disabled
                value="Disabled input"
              />
            </div>
          </div>
        </section>

        {/* Alerts */}
        <section>
          <H2 className="mb-8">Alerts</H2>
          <div className="space-y-4 max-w-2xl">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                Your changes have been saved successfully.
              </AlertDescription>
            </Alert>

            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                There was an error processing your request. Please try again.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Cards & Testimonials */}
        <section>
          <H2 className="mb-8">Cards & Testimonials</H2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TestimonialCard
              name="Sarah Johnson"
              title="Marketing Director at TechCorp"
              content="Absolutely incredible! The AI-generated content is high-quality, engaging, and feels natural. Seriously, a total time-saver!"
              rating={5}
            />

            <TestimonialCard
              name="Mike Chen"
              title="Content Creator"
              content="The ability to instantly generate multiple variations of ad copy! I can A/B test effortlessly and optimize conversions."
              rating={5}
            />

            <TestimonialCard
              name="Emma Davis"
              title="Startup Founder"
              content="Feels like having a copywriting team on demand! The quality and speed are unmatched."
              rating={5}
            />
          </div>
        </section>

        {/* Badges */}
        <section>
          <H2 className="mb-8">Badges</H2>
          <div className="space-y-4">
            <div>
              <H4 className="mb-3">Default Badges</H4>
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </div>

            <div>
              <H4 className="mb-3">Feature Tags</H4>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  New
                </Badge>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                  Popular
                </Badge>
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                  Premium
                </Badge>
                <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                  Beta
                </Badge>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-12">
        <div className="container text-center">
          <H4 className="mb-4">Vignettes Design System</H4>
          <BodySmall>
            A comprehensive, accessible design system built with shadcn/ui and
            Tailwind CSS.
          </BodySmall>
        </div>
      </footer>
    </div>
  );
}
