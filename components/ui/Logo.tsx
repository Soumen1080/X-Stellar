"use client";

import React from "react";
import Link from "next/link";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface StellarStarLogoProps {
  variant?: "default" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZES = {
  sm: { icon: "w-7 h-7", text: "text-base", iconInner: "w-3.5 h-3.5" },
  md: { icon: "w-8 h-8", text: "text-lg font-black", iconInner: "w-4 h-4" },
  lg: { icon: "w-10 h-10", text: "text-xl font-black", iconInner: "w-5 h-5" },
};

export function StellarStarLogo({ variant = "default", size = "md", className }: StellarStarLogoProps) {
  const s = SIZES[size];
  const textColor = variant === "white" ? "text-white" : "text-[#0F0F14]";
  const accentColor = variant === "white" ? "text-[#2DD4BF]" : "text-gradient-lime";

  return (
    <Link href="/" className={cn("flex items-center gap-2.5 group", className)}>
      <div className={cn(
        s.icon,
        "rounded-xl bg-gradient-to-br from-[#2DD4BF] to-[#0D9488] flex items-center justify-center",
        "shadow-md group-hover:shadow-lime-glow transition-shadow duration-300"
      )}>
        <Zap className={cn(s.iconInner, "text-[#0F0F14] fill-[#0F0F14]")} />
      </div>
      <span className={cn("font-bold tracking-tight", s.text, textColor)}>
        X<span className={accentColor}>-Stellar</span>
      </span>
    </Link>
  );
}
