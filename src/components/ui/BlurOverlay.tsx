
import React from "react";
import { cn } from "@/lib/utils";

interface BlurOverlayProps {
  isVisible: boolean;
  onClick?: () => void;
  intensity?: "light" | "medium" | "heavy";
  className?: string;
}

export const BlurOverlay: React.FC<BlurOverlayProps> = ({
  isVisible,
  onClick,
  intensity = "medium",
  className,
}) => {
  const intensityMap = {
    light: "backdrop-blur-sm bg-black/10",
    medium: "backdrop-blur-md bg-black/20",
    heavy: "backdrop-blur-lg bg-black/30",
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-40 transition-all duration-300 ease-in-out",
        intensityMap[intensity],
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
        className
      )}
      onClick={onClick}
    />
  );
};
