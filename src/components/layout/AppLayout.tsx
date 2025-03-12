
import React from "react";
import { Navbar } from "./Navbar";
import { PageTransition } from "./PageTransition";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 pt-4 pb-20 sm:pb-4 sm:pt-20 px-4 max-w-5xl mx-auto w-full">
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  );
};
