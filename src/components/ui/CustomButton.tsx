
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CustomButtonProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
  variant?: "default" | "subtle" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  variant = "default",
  size = "default",
  className,
  ...props
}) => {
  return (
    <Button
      variant={variant as any}
      size={size as any}
      className={cn(
        "relative overflow-hidden transition-all duration-300 active:scale-[0.98]",
        variant === "default" && "bg-primary hover:bg-primary/90",
        variant === "subtle" && "bg-secondary hover:bg-secondary/80",
        size === "default" && "h-10 px-6 py-2",
        size === "sm" && "h-8 px-4 text-xs",
        size === "lg" && "h-12 px-8 text-base",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};
