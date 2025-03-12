
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

const variants = {
  hidden: { opacity: 0, y: 10 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};

// Using a simple transition component since we don't have framer-motion installed
export const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div
      className={cn(
        "w-full animate-slide-up opacity-0",
        className
      )}
    >
      {children}
    </div>
  );
};
