import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">404 - Page Not Found</h1>
        <p className="text-muted-foreground text-lg">
          The page you are looking for doesn't exist.
        </p>
        <Link href="/">
          <Button variant="default">Return Home</Button>
        </Link>
      </div>
    </div>
  );
}
