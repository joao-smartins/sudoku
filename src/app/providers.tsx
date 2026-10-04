"use client";

import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./components/ui/Toast/ToastProvider";
import { TooltipProvider } from "./components/ui/Tooltip/Tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <TooltipProvider delayDuration={200}>{children}</TooltipProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
