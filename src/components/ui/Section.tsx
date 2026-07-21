import React from "react";
import { cn } from "@/utils/cn";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  id?: string;
  hasGlow?: boolean;
  glowColor?: "cyan" | "indigo";
}

export function Section({
  children,
  className,
  id,
  hasGlow = false,
  glowColor = "indigo",
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-20 md:py-28 overflow-hidden scroll-mt-20 md:scroll-mt-24",
        className
      )}
      {...props}
    >
      {hasGlow && (
        <div
          className={cn(
            "absolute -z-10 w-96 h-96 blur-[120px] rounded-full pointer-events-none opacity-40",
            glowColor === "indigo" ? "radial-glow-indigo top-1/4 -left-20" : "radial-glow-cyan bottom-1/4 -right-20"
          )}
        />
      )}
      {children}
    </section>
  );
}
