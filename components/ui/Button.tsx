"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "bg-[#2DD4BF] text-[#0F0F14] hover:bg-[#14B8A6] hover:shadow-lime-glow hover:-translate-y-0.5",
        secondary: "bg-white text-[#0F0F14] border border-[#E5E5E5] hover:border-[#2DD4BF]/40 hover:shadow-card hover:-translate-y-0.5",
        dark: "bg-[#0F0F14] text-white hover:bg-[#1A1A22] hover:shadow-dark-card hover:-translate-y-0.5",
        ghost: "bg-transparent text-[#0F0F14] hover:bg-black/5",
        "ghost-white": "bg-transparent text-white hover:bg-white/10",
        outline: "bg-transparent text-[#0F0F14] border border-[#0F0F14] hover:bg-[#0F0F14] hover:text-white",
        "outline-lime": "bg-transparent text-[#2DD4BF] border border-[#2DD4BF] hover:bg-[#2DD4BF] hover:text-[#0F0F14]",
        destructive: "bg-red-500 text-white hover:bg-red-600 hover:-translate-y-0.5",
      },
      size: {
        sm: "px-4 py-2 text-sm rounded-xl",
        md: "px-6 py-3 text-sm rounded-2xl",
        lg: "px-8 py-4 text-base rounded-2xl",
        xl: "px-10 py-5 text-lg rounded-2xl",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
        )}
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
