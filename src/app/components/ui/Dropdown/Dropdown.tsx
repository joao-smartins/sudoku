"use client";

import React from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "radix-ui";

export const DropdownRoot = DropdownMenu.Root;
export const DropdownGroup = DropdownMenu.Group;
export const DropdownLabel = DropdownMenu.Label;

export interface DropdownTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: React.ReactNode;
  id?: string;
}

export const DropdownTrigger = React.forwardRef<HTMLButtonElement, DropdownTriggerProps>(
  ({ label, icon, id, className, ...props }, ref) => {
    return (
      <DropdownMenu.Trigger asChild>
        <button
          id={id}
          ref={ref}
          className={`group flex items-center justify-between gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg border border-[#c2dbf3] dark:border-slate-700/80 bg-white dark:bg-slate-800 text-[#133763] dark:text-slate-100 shadow-xs hover:bg-[#d4e5f6]/50 dark:hover:bg-slate-700/80 hover:border-[#a2c8ef] dark:hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-[#7fb2e6]/70 cursor-pointer transition-all duration-150 select-none ${className ?? ""}`}
          {...props}
        >
          <span className="flex items-center gap-2">
            {icon}
            <span>{label}</span>
          </span>
          <ChevronDownIcon className="w-4 h-4 text-[#7fb2e6] dark:text-slate-400 group-hover:text-[#1e5fa8] dark:group-hover:text-slate-200 transition-transform duration-200 data-[state=open]:rotate-180" />
        </button>
      </DropdownMenu.Trigger>
    );
  },
);
DropdownTrigger.displayName = "DropdownTrigger";

export const DropdownContent: React.FC<{
  children: React.ReactNode;
  align?: "start" | "center" | "end";
  sideOffset?: number;
  className?: string;
}> = ({ children, align = "start", sideOffset = 6, className }) => {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        align={align}
        sideOffset={sideOffset}
        className={`z-50 min-w-[210px] rounded-xl border border-[#c2dbf3] dark:border-slate-700/80 bg-white/95 dark:bg-slate-900/95 p-1.5 shadow-lg shadow-[#d4e5f6]/50 dark:shadow-black/50 backdrop-blur-md outline-none animate-slide-down-and-fade ${className ?? ""}`}
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
};

export interface DropdownItemProps {
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  badge?: string;
  className?: string;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  onClick,
  disabled,
  icon,
  children,
  badge,
  className,
}) => {
  return (
    <DropdownMenu.Item
      onSelect={onClick}
      disabled={disabled}
      className={`group flex items-center justify-between gap-2.5 px-3 py-2 text-xs sm:text-sm rounded-lg text-[#1e3a5f] dark:text-slate-200 hover:bg-[#d4e5f6] dark:hover:bg-blue-600 hover:text-[#0c2a4d] dark:hover:text-white focus:bg-[#d4e5f6] dark:focus:bg-blue-600 focus:text-[#0c2a4d] dark:focus:text-white cursor-pointer outline-none transition-colors duration-150 select-none data-[disabled]:opacity-40 data-[disabled]:pointer-events-none ${className ?? ""}`}
    >
      <div className="flex items-center gap-2.5">
        {icon && (
          <span className="text-[#4a7aa8] dark:text-slate-400 group-hover:text-[#0c2a4d] dark:group-hover:text-white group-focus:text-[#0c2a4d] dark:group-focus:text-white transition-colors">
            {icon}
          </span>
        )}
        <span className="font-medium">{children}</span>
      </div>
      {badge && (
        <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#eef5fc] dark:bg-slate-800 text-[#1e5fa8] dark:text-slate-300 group-hover:bg-[#b9d7f3] dark:group-hover:bg-blue-700 group-hover:text-[#0c2a4d] dark:group-hover:text-white transition-colors">
          {badge}
        </span>
      )}
    </DropdownMenu.Item>
  );
};

export const DropdownSeparator: React.FC = () => {
  return <DropdownMenu.Separator className="my-1 h-px bg-[#e1edf9] dark:bg-slate-800" />;
};
