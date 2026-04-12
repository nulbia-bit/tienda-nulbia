import { cn } from "@/lib/utils";
import type { ElementType } from "react";

interface StatusBadgeProps {
  leftIcon?: ElementType;
  leftLabel: string;
  rightIcon?: ElementType;
  rightLabel: string;
  className?: string;
}

export function StatusBadge({
  leftIcon: LeftIcon,
  leftLabel,
  rightIcon: RightIcon,
  rightLabel,
  className,
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full bg-slate-50 border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600",
        className
      )}
    >
      <span className="inline-flex items-center gap-1.5">
        {LeftIcon && <LeftIcon className="w-4 h-4 text-sky-500" />}
        {leftLabel}
      </span>
      <span className="h-3.5 w-px bg-slate-300" />
      <span className="inline-flex items-center gap-1.5">
        {RightIcon && <RightIcon className="w-4 h-4 text-sky-500" />}
        {rightLabel}
      </span>
    </span>
  );
}
