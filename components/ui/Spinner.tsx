"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: number;
  className?: string;
}

export default function Spinner({ size = 20, className }: SpinnerProps) {
  return (
    <div
      className={cn("rounded-full border-2 border-current border-t-transparent animate-spin", className)}
      style={{ width: size, height: size }}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
