import { Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";

interface ComingSoonProps {
  title: string;
  description?: string;
}

function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <main className="flex flex-col w-full min-h-[calc(100vh-100px)] items-center justify-center px-4 sm:px-6">
      <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-6">
        <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center">
          <Clock className="size-10 text-primary" />
        </div>
        
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
          {title}
        </h1>
        
        <p className="text-lg text-muted-foreground max-w-xl">
          {description || 
            "We're working hard to bring you this page. Check back soon for updates!"}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button asChild size="lg">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          
          <Button variant="outline" size="lg" asChild>
            <Link href="/contact-us">Contact Us</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

export default ComingSoon;
