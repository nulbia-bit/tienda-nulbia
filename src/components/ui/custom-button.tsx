"use client";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const sizes = {
  tiny:   "px-3 h-7 text-xs",
  small:  "px-4 h-9 text-sm",
  medium: "px-5 h-11 text-sm",
  large:  "px-8 h-14 text-base font-semibold",
};

const variants = {
  primary:   "bg-sky-500 hover:bg-sky-600 text-white shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-0.5",
  secondary: "bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 shadow-sm hover:border-slate-300 hover:-translate-y-0.5",
  dark:      "bg-slate-900 hover:bg-slate-700 text-white shadow-sm hover:-translate-y-0.5",
};

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
  loading?: boolean;
  href?: string;
}

export function CustomButton({
  size = "large",
  variant = "primary",
  loading = false,
  className,
  children,
  href,
  ...props
}: CustomButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0",
    sizes[size],
    variants[variant],
    className
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button disabled={loading || props.disabled} className={classes} {...props}>
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}
