"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, MapPin, Calendar, Compass, ShieldCheck, Mail, GraduationCap } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";

const profileDetails = [
  { label: "Role Target", value: "Junior Data Analyst / Analytics Engineer", icon: <Compass className="text-primary w-4 h-4" /> },
  { label: "Current Education", value: "MCA Pursuing (GL Bajaj College)", icon: <GraduationCap className="text-secondary w-4 h-4" /> },
  { label: "Location Base", value: "Greater Noida, UP, India", icon: <MapPin className="text-accent w-4 h-4" /> },
  { label: "Availability Status", value: "Immediate (Full-Time or Co-op)", icon: <Calendar className="text-primary w-4 h-4" /> },
  { label: "Direct Communications", value: "deeksha30pal@gmail.com", icon: <Mail className="text-secondary w-4 h-4" /> },
];

const strengths = [
  { title: "Rigorous Preprocessing", desc: "Using Pandas & NumPy to cleanse null arrays, validate ranges, and filter out outlier values to maintain mathematical model integrity." },
  { title: "Query Engineering", desc: "Constructing multi-table joins, subqueries, group operations, and Common Table Expressions in MySQL to answer business questions." },
  { title: "Visual Synthesis", desc: "Creating clean relational reporting dashboards in Power BI with dynamic filters and custom DAX metrics for executive review." },
  { title: "Critical Analysis", desc: "Applying business logic to data cohorts, isolating trends, and drafting evidence-backed summaries for strategic direction." },
];

export function About() {
  return (
    <Section id="about" hasGlow glowColor="indigo">
      <Container>
        <Heading
          title="Professional Dossier"
          subtitle="Executive Summary"
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch">
          
          {/* Objective & Strengths (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col justify-between space-y-8 text-left"
          >
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                Engineering Analytical Pipelines for Evidence-Backed Actions
              </h3>
              <p className="text-text-muted leading-relaxed text-sm md:text-base">
                I am a Master of Computer Applications student bridging software development rigor with data analytics. I am committed to standardizing messy datasets, writing performant SQL queries, and converting raw database transactions into interactive business dashboards.
              </p>
            </div>

            {/* Strengths List */}
            <div className="space-y-4 pt-4">
              <h4 className="text-xs font-bold tracking-widest font-mono text-white/70 uppercase">
                Core Strengths & Capabilities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {strengths.map((str, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-white/5 bg-slate-950/20 flex flex-col space-y-1.5 hover:border-primary/20 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-secondary flex-shrink-0" />
                      <span className="text-xs font-bold text-white tracking-wide">{str.title}</span>
                    </div>
                    <p className="text-[11px] text-text-muted leading-normal">
                      {str.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Facts Profile Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 flex"
          >
            <Card className="w-full p-6 md:p-8 flex flex-col justify-between border-white/5 bg-slate-950/30 relative overflow-hidden h-full">
              
              {/* Pulsing Location Map Visual */}
              <div className="absolute bottom-[-50px] right-[-50px] w-64 h-64 opacity-15 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full text-secondary" fill="none" stroke="currentColor">
                  {/* Concentric rings representing location radar */}
                  <circle cx="50" cy="50" r="40" strokeWidth="0.5" strokeDasharray="3 3" />
                  <circle cx="50" cy="50" r="30" strokeWidth="0.5" />
                  <circle cx="50" cy="50" r="20" strokeWidth="0.5" strokeDasharray="2 2" />
                  <circle cx="50" cy="50" r="8" className="animate-ping" fill="currentColor" stroke="none" opacity="0.4" />
                  <circle cx="50" cy="50" r="3" fill="currentColor" stroke="none" />
                </svg>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-white/5">
                    <User className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-wide">Candidate Profile</h4>
                    <p className="text-[10px] font-mono text-text-muted uppercase">Deeksha Pal</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {profileDetails.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="p-1.5 rounded bg-slate-900 border border-white/5 flex-shrink-0 mt-0.5">
                        {detail.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono text-text-muted uppercase">{detail.label}</span>
                        <span className="text-xs font-bold text-white leading-normal mt-0.5">{detail.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 mt-8 flex justify-between items-center text-[10px] font-mono text-text-muted">
                <span>Security Clearance: NA</span>
                <span className="flex items-center gap-1.5 text-secondary">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                  Active Inquiries Open
                </span>
              </div>

            </Card>
          </motion.div>

        </div>
      </Container>
    </Section>
  );
}
