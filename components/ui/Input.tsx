"use client";

import React from "react";
import { cn } from "@/lib/utils";

/* ─── Input ─── */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, leading, trailing, containerClassName, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className={cn("space-y-1.5", containerClassName)}>
        {label && (
          <label htmlFor={inputId} className="block text-[10px] font-semibold text-[#888] uppercase tracking-wider">
            {label}
          </label>
        )}
        <div className="relative">
          {leading && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888] pointer-events-none">
              {leading}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              "w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-[#0F0F14] placeholder:text-[#AAAAAA]",
              "transition-all duration-200",
              "focus:outline-none focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF]/20",
              error ? "border-red-300" : "border-[#E5E5E5]",
              leading && "pl-10",
              trailing && "pr-10",
              className
            )}
            {...props}
          />
          {trailing && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888]">
              {trailing}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        {hint && !error && <p className="text-xs text-[#888] mt-1">{hint}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

/* ─── Textarea ─── */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  containerClassName?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, containerClassName, id, rows = 3, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className={cn("space-y-1.5", containerClassName)}>
        {label && (
          <label htmlFor={inputId} className="block text-[10px] font-semibold text-[#888] uppercase tracking-wider">
            {label}
          </label>
        )}
        <textarea
          id={inputId}
          ref={ref}
          rows={rows}
          className={cn(
            "w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-[#0F0F14] placeholder:text-[#AAAAAA] resize-none",
            "transition-all duration-200",
            "focus:outline-none focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF]/20",
            error ? "border-red-300" : "border-[#E5E5E5]",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        {hint && !error && <p className="text-xs text-[#888] mt-1">{hint}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Input, Textarea };
