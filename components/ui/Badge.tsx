"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 font-semibold rounded-full border",
  {
    variants: {
      variant: {
        lime: "bg-[#2DD4BF]/20 text-[#134E4A] border-[#2DD4BF]/40",
        dark: "bg-white/10 text-white border-white/10",
        muted: "bg-[#F0F0F0] text-[#888] border-transparent",
        success: "bg-emerald-50 text-emerald-700 border-emerald-200",
        warning: "bg-amber-50 text-amber-700 border-amber-200",
        destructive: "bg-red-50 text-red-700 border-red-200",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px] tracking-wider uppercase",
        md: "px-3 py-1 text-xs tracking-wide uppercase",
      },
    },
    defaultVariants: {
      variant: "lime",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size, className }))} {...props} />
  );
}

export { Badge, badgeVariants };
