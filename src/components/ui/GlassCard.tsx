
import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "subtle" | "elevated";
  className?: string;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, variant = "default", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-xl overflow-hidden",
          variant === "default" && "bg-white/80 backdrop-blur-md border border-white/20 shadow-glass",
          variant === "subtle" && "bg-white/60 backdrop-blur-sm border border-white/10 shadow-subtle",
          variant === "elevated" && "bg-white/90 backdrop-blur-lg border border-white/30 shadow-hover",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
