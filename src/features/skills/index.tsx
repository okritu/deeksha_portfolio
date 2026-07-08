"use client";

import React from "react";
import { motion } from "framer-motion";
import { Terminal, Award } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";

// Circular gauge progress component
function CircularProgress({ value, label, color = "indigo" }: { value: number; label: string; color?: "indigo" | "cyan" }) {
  const radius = 35;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center text-center space-y-3">
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Glow glow-blur behind circle */}
        <div className={`absolute inset-0.5 rounded-full blur-[8px] opacity-15 ${
          color === "indigo" ? "bg-primary" : "bg-secondary"
        }`} />
        
        <svg className="w-full h-full transform -rotate-90">
          {/* Base track */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.03)"
            strokeWidth={strokeWidth}
          />
          {/* Active progress */}
          <motion.circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke={color === "indigo" ? "#6366F1" : "#06B6D4"}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-sm font-bold font-mono text-white">
          {value}%
        </span>
      </div>
      <span className="text-[11px] font-bold font-mono tracking-wider text-text-muted uppercase">
        {label}
      </span>
    </div>
  );
}

// Line skill bar component
function LinearProgress({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-1.5 w-full">
      <div className="flex justify-between items-center text-xs">
        <span className="font-bold text-white font-mono tracking-wide">{label}</span>
        <span className="text-text-muted font-mono">{value}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-slate-900 border border-white/5 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
          initial={{ width: "0%" }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

const coreSkills = [
  { label: "Python Core", value: 90, color: "indigo" as const },
  { label: "SQL Relational", value: 95, color: "cyan" as const },
  { label: "Power BI", value: 88, color: "cyan" as const },
];

const supplementarySkills = [
  { label: "Pandas & NumPy", value: 92 },
  { label: "MySQL Queries / Joins", value: 94 },
  { label: "Advanced Excel Modeling", value: 85 },
  { label: "Matplotlib & Seaborn", value: 80 },
  { label: "Git & GitHub Versioning", value: 88 },
  { label: "Machine Learning (Basics)", value: 75 },
];

export function Skills() {
  return (
    <Section id="skills" hasGlow glowColor="cyan">
      <Container>
        <Heading
          title="Analytical Tooling"
          subtitle="Skill Taxonomy"
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch">
          
          {/* Core circular charts (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex"
          >
            <Card className="w-full p-6 md:p-8 border-white/5 bg-slate-950/30 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <div className="p-2 rounded-lg bg-slate-900 border border-white/5">
                    <Award className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-wide">Core Technologies</h3>
                    <p className="text-[10px] font-mono text-text-muted uppercase">Analyst Foundation</p>
                  </div>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  These represent my primary day-to-day analytics drivers. I build relational schemas, compute statistical distributions, and assemble visual interfaces.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 py-8">
                {coreSkills.map((skill, idx) => (
                  <CircularProgress
                    key={idx}
                    value={skill.value}
                    label={skill.label}
                    color={skill.color}
                  />
                ))}
              </div>

              <div className="text-[10px] font-mono text-text-muted bg-slate-900/60 p-3 rounded-lg border border-white/5 text-center">
                Query Optimization • Custom DAX Measures • Data Wrangling
              </div>

            </Card>
          </motion.div>

          {/* Supplementary linear skills (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 flex"
          >
            <Card className="w-full p-6 md:p-8 border-white/5 bg-slate-950/30 flex flex-col justify-between h-full">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <div className="p-2 rounded-lg bg-slate-900 border border-white/5">
                  <Terminal className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wide">Libraries & Frameworks</h3>
                  <p className="text-[10px] font-mono text-text-muted uppercase">Execution Taxonomy</p>
                </div>
              </div>

              <div className="space-y-5 py-6">
                {supplementarySkills.map((skill, idx) => (
                  <LinearProgress
                    key={idx}
                    label={skill.label}
                    value={skill.value}
                  />
                ))}
              </div>

              <div className="text-[10px] font-mono text-text-muted text-center border-t border-white/5 pt-4">
                Version Control: Git/GitHub • Notebook Environments: Jupyter
              </div>

            </Card>
          </motion.div>

        </div>
      </Container>
    </Section>
  );
}
