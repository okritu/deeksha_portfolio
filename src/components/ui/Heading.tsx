import React from "react";
import { cn } from "@/utils/cn";

interface HeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  gradient?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Heading({
  title,
  subtitle,
  align = "center",
  gradient = true,
  size = "md",
  className,
  ...props
}: HeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col mb-12 md:mb-16",
        align === "center" && "items-center text-center",
        align === "left" && "items-start text-left",
        align === "right" && "items-end text-right",
        className
      )}
      {...props}
    >
      {subtitle && (
        <span className="text-xs md:text-sm font-semibold uppercase tracking-widest text-secondary mb-3">
          {subtitle}
        </span>
      )}
      <h2
        className={cn(
          "font-bold tracking-tight text-white",
          size === "sm" && "text-xl md:text-2xl",
          size === "md" && "text-3xl md:text-4xl lg:text-5xl",
          size === "lg" && "text-4xl md:text-5xl lg:text-6xl",
          size === "xl" && "text-5xl md:text-6xl lg:text-7xl",
          gradient && "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        )}
      >
        {title}
      </h2>
      <div
        className={cn(
          "h-1 w-20 rounded-full mt-4 bg-gradient-to-r from-primary to-secondary",
          align === "center" && "mx-auto",
          align === "right" && "ml-auto"
        )}
      />
    </div>
  );
}
