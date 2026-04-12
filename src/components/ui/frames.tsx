import { cn } from "@/lib/utils";

export function Frame({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("relative flex flex-col rounded-2xl bg-slate-100/60 p-1.5", className)}
      {...props}
    />
  );
}

export function FramePanel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative flex-1 rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-sky-100 transition-all duration-300",
        className
      )}
      {...props}
    />
  );
}

export function FrameHeader({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={cn("flex flex-col mb-3", className)}
      {...props}
    />
  );
}

export function FrameIcon({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "w-11 h-11 rounded-xl bg-sky-50 flex items-center justify-center mb-4 text-sky-500",
        className
      )}
      {...props}
    />
  );
}

export function FrameTitle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("font-bold text-slate-900 text-base", className)}
      {...props}
    />
  );
}

export function FrameDescription({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("text-slate-500 text-sm leading-relaxed mt-2", className)}
      {...props}
    />
  );
}
