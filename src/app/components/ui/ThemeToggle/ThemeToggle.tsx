"use client";

import React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "@/app/context/ThemeContext";
import AppTooltip from "../Tooltip/Tooltip";

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <AppTooltip content={isDark ? "Mudar para modo Claro" : "Mudar para modo Escuro"} side="bottom">
      <button
        onClick={toggleTheme}
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label="Alternar tema de cores"
        className="group relative inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-[#a2c8ef] dark:border-slate-700 bg-[#d4e5f6] dark:bg-slate-800 p-0.5 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#7fb2e6] focus:ring-offset-2 dark:focus:ring-offset-slate-900 shadow-sm"
      >
        <span
          className={`${
            isDark ? "translate-x-6 bg-slate-900 text-amber-300" : "translate-x-0 bg-white text-[#1e5fa8]"
          } pointer-events-none flex h-6.5 w-6.5 transform items-center justify-center rounded-full shadow-md ring-0 transition duration-200 ease-in-out`}
        >
          {isDark ? (
            <MoonIcon className="h-3.5 w-3.5" />
          ) : (
            <SunIcon className="h-3.5 w-3.5" />
          )}
        </span>
      </button>
    </AppTooltip>
  );
};

export default ThemeToggle;
