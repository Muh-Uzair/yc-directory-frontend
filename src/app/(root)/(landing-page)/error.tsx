"use client";

import { useEffect } from "react";
import { Home, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ErrorComponent from "@/components/ErrorComponent";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorComponent>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button onClick={() => reset()}>
          <RefreshCcw className="h-5 w-5" />
          Try Again
        </Button>

        <Link href="/">
          <Button variant={"outline"}>
            <Home className="h-5 w-5" />
            Go Home
          </Button>
        </Link>
      </div>
    </ErrorComponent>
  );
}
