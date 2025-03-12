
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Book, ShoppingCart, BarChartBig } from "lucide-react";
import { cn } from "@/lib/utils";

export const Navbar: React.FC = () => {
  const location = useLocation();

  const links = [
    { path: "/", label: "Dashboard", icon: <BarChartBig className="w-4 h-4" /> },
    { path: "/sales", label: "Sales", icon: <ShoppingCart className="w-4 h-4" /> },
    { path: "/purchases", label: "Purchases", icon: <Book className="w-4 h-4" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 sm:top-0 sm:bottom-auto bg-background/80 backdrop-blur-md border-t sm:border-b border-border z-30 px-4 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="hidden sm:block">
          <span className="font-medium text-lg">BookStall</span>
        </div>
        
        <div className="flex items-center justify-center w-full sm:w-auto space-x-1 sm:space-x-2">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                cn(
                  "nav-link flex items-center justify-center flex-col sm:flex-row py-2 px-4 sm:px-5 rounded-lg transition-all duration-200",
                  isActive
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )
              }
            >
              {link.icon}
              <span className="text-xs sm:text-sm sm:ml-2">{link.label}</span>
            </NavLink>
          ))}
        </div>
        
        <div className="hidden sm:block">
          {/* Empty div for alignment */}
        </div>
      </div>
    </nav>
  );
};
