import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4 text-destructive">
        404: Page Not Found
      </h1>
      <p className="text-sm text-muted-foreground mb-6">
        The page you're looking for does not exist or is no longer here.
      </p>
      <Button asChild className="rounded-full">
        <Link href="/">Browse components</Link>
      </Button>
    </div>
  );
}
