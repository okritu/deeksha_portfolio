"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Github } from "@/components/ui/Icons";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { SkillBadge } from "@/components/ui/SkillBadge";
import { Button } from "@/components/ui/Button";
import { Project } from "./projectsData";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full flex"
    >
      <Card className="flex flex-col w-full h-full border-slate-800 bg-slate-900/40 relative overflow-hidden group">
        
        {/* Glow Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <CardHeader className="relative z-10 pb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-secondary uppercase bg-secondary/5 px-2 py-0.5 rounded border border-secondary/15">
              Data Insights
            </span>
            <div className="flex items-center gap-2">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-white transition-colors p-1 bg-slate-950/65 rounded border border-slate-800 hover:border-slate-700"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
          <CardTitle className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors duration-300">
            {project.title}
          </CardTitle>
          <CardDescription className="text-xs font-medium font-mono text-secondary mt-1">
            {project.subtitle}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-grow space-y-4 relative z-10 text-sm">
          <p className="text-text-muted leading-relaxed text-xs sm:text-sm">
            {project.description}
          </p>

          {/* Key Achievements/Recruiter conversion items */}
          <div className="space-y-2 pt-2 border-t border-slate-800/40">
            <span className="text-[11px] font-bold tracking-wider font-mono text-white/90 uppercase">
              Business Actions & Results
            </span>
            <ul className="space-y-1.5">
              {project.achievements.map((achievement, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-text-muted leading-relaxed">
                  <CheckCircle2 className="w-3.5 h-3.5 text-secondary flex-shrink-0 mt-0.5" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Metrics Row */}
          <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-lg bg-slate-950/50 border border-slate-800/40 text-center">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="flex flex-col justify-center">
                <span className="text-[11px] sm:text-xs font-bold text-white font-mono">
                  {metric.value}
                </span>
                <span className="text-[9px] text-text-muted mt-0.5 uppercase tracking-wide">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>

          {/* Stack Badge list */}
          <div className="space-y-2 pt-2">
            <span className="text-[11px] font-bold tracking-wider font-mono text-white/90 uppercase">
              Technologies Used
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <SkillBadge
                  key={tech}
                  name={tech}
                  variant={tech === "Power BI" || tech === "SQL" || tech === "MySQL" ? "cyan" : "outline"}
                  className="text-[10px] py-0.5 px-2 font-mono"
                />
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="relative z-10 pt-2 border-t border-slate-800/20">
          <Button
            variant="outline"
            onClick={() => window.open(project.githubUrl, "_blank")}
            className="w-full text-xs py-2 gap-2 border-slate-800 hover:border-primary/40 bg-slate-950/20 hover:bg-slate-900"
          >
            <Github className="w-4 h-4" />
            Explore Code & Model
          </Button>
        </CardFooter>

      </Card>
    </motion.div>
  );
}
