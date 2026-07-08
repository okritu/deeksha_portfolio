import React from "react";
import { cn } from "@/utils/cn";

interface SkillBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "indigo" | "cyan";
}

export function SkillBadge({ name, icon, variant = "outline", className, ...props }: SkillBadgeProps) {
  const baseStyles = "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all";
  
  const variants = {
    primary: "bg-primary/10 text-primary border border-primary/20",
    secondary: "bg-secondary/10 text-secondary border border-secondary/20",
    outline: "bg-slate-900/60 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white",
    indigo: "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20",
    cyan: "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
  };

  return (
    <span
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {icon && <span className="text-sm">{icon}</span>}
      {name}
    </span>
  );
}
