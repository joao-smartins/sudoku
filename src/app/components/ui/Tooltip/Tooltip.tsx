"use client";

import React from "react";
import { Tooltip } from "radix-ui";

interface AppTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  delayDuration?: number;
  asChild?: boolean;
}

export const AppTooltip: React.FC<AppTooltipProps> = ({
  content,
  children,
  side = "top",
  align = "center",
  sideOffset = 6,
  delayDuration = 200,
  asChild = true,
}) => {
  if (!content) return <>{children}</>;

  return (
    <Tooltip.Root delayDuration={delayDuration}>
      <Tooltip.Trigger asChild={asChild}>{children}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side={side}
          align={align}
          sideOffset={sideOffset}
          className="z-50 max-w-xs rounded-lg border border-slate-700/60 bg-slate-900/95 px-3 py-1.5 text-center text-xs font-medium leading-relaxed text-slate-100 shadow-xl backdrop-blur-sm animate-slide-down-and-fade select-none"
        >
          {content}
          <Tooltip.Arrow className="fill-slate-900/95" width={10} height={5} />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
};

export const TooltipProvider = Tooltip.Provider;
export default AppTooltip;
