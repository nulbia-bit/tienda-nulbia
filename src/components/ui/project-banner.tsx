"use client";
import React from "react";
import { clsx } from "clsx";

interface ProjectBannerProps {
  variant?: "success" | "warning" | "error";
  label: React.ReactNode;
  icon?: React.ReactNode;
  callToAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export const ProjectBanner = ({
  variant = "success",
  label,
  icon,
  callToAction,
}: ProjectBannerProps) => {
  return (
    <aside
      className={clsx(
        "flex z-50 gap-x-2 justify-center items-center py-2.5 border-b min-h-11 text-sm font-sans sticky top-0",
        variant === "success" &&
          "text-sky-900 fill-sky-900 bg-sky-50 border-sky-200",
        variant === "warning" &&
          "text-amber-900 fill-amber-900 bg-amber-50 border-amber-200",
        variant === "error" &&
          "text-red-900 fill-red-900 bg-red-50 border-red-200"
      )}
    >
      <div className="flex flex-col gap-2 px-6 w-full md:justify-center md:flex-row md:items-center">
        <div className="flex gap-2 items-center">
          {icon && <div className="w-4 h-4 flex-shrink-0">{icon}</div>}
          <p className="text-sm">{label}</p>
        </div>
        {callToAction && (
          <div className="ml-4 md:ml-2">
            {callToAction.href ? (
              <a
                href={callToAction.href}
                className={clsx(
                  "font-semibold underline underline-offset-4 duration-150",
                  variant === "success" &&
                    "text-sky-700 decoration-sky-400 hover:text-sky-900",
                  variant === "warning" &&
                    "text-amber-700 decoration-amber-400 hover:text-amber-900",
                  variant === "error" &&
                    "text-red-700 decoration-red-400 hover:text-red-900"
                )}
              >
                {callToAction.label} →
              </a>
            ) : (
              <button
                onClick={callToAction.onClick}
                className={clsx(
                  "font-semibold underline underline-offset-4 duration-150 cursor-pointer",
                  variant === "success" &&
                    "text-sky-700 decoration-sky-400 hover:text-sky-900",
                  variant === "warning" &&
                    "text-amber-700 decoration-amber-400 hover:text-amber-900",
                  variant === "error" &&
                    "text-red-700 decoration-red-400 hover:text-red-900"
                )}
              >
                {callToAction.label} →
              </button>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};
