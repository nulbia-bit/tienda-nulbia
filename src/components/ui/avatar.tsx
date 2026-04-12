"use client";
import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

/* ── Avatar ──────────────────────────────────────────────────────────────── */
function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      className={cn("relative flex shrink-0 overflow-hidden rounded-full", className)}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      className={cn("aspect-square h-full w-full object-cover", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-slate-100 text-slate-600 text-xs font-semibold",
        className
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };

/* ── ReviewStars ─────────────────────────────────────────────────────────── */
interface ReviewStarsProps {
  rating: number;
  maxRating?: number;
  className?: string;
}

export const ReviewStars = React.forwardRef<HTMLDivElement, ReviewStarsProps>(
  ({ rating, maxRating = 5, className }, ref) => {
    const filled = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    const empty = maxRating - filled - (hasHalf ? 1 : 0);

    return (
      <div
        className={cn("flex items-center gap-0.5", className)}
        ref={ref}
      >
        {[...Array(filled)].map((_, i) => (
          <svg key={`f-${i}`} className="w-4 h-4 fill-sky-400 text-sky-400" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
          </svg>
        ))}
        {hasHalf && (
          <svg key="half" className="w-4 h-4 text-sky-400" viewBox="0 0 20 20">
            <defs>
              <linearGradient id="half-grad">
                <stop offset="50%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#e2e8f0" />
              </linearGradient>
            </defs>
            <path fill="url(#half-grad)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
          </svg>
        )}
        {[...Array(empty)].map((_, i) => (
          <svg key={`e-${i}`} className="w-4 h-4 text-slate-200 fill-slate-200" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
          </svg>
        ))}
      </div>
    );
  }
);

ReviewStars.displayName = "ReviewStars";
