"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Calendar, ExternalLink, ShieldCheck } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { SkillBadge } from "@/components/ui/SkillBadge";

const timelineEvents = [
  {
    year: "2026 - Future",
    title: "Analytics Engineer / Junior Data Analyst",
    type: "Goal",
    subtitle: "Accelerate Business Growth",
    description: "Positioned to join a modern data stack team to automate pipelines, normalize warehousing structures, and optimize query latency."
  },
  {
    year: "2025",
    title: "IBM Python for Data Science Certified",
    type: "Credential",
    subtitle: "Professional Certificate",
    description: "Completed rigorous coursework in Python scripting, API data collections, and Pandas/NumPy preprocessing frameworks."
  },
  {
    year: "2024 - 2026",
    title: "Master of Computer Applications (MCA)",
    type: "Education",
    subtitle: "GL Bajaj Institute of Tech & Mgmt",
    description: "Acquiring engineering fundamentals: Relational DBMS indexing, data modeling algorithms, and software development patterns."
  },
  {
    year: "2021 - 2024",
    title: "Bachelor of Computer Applications (BCA)",
    type: "Education",
    subtitle: "Mahatma Gandhi Kashi Vidyapith",
    description: "Graduated with honors in programming fundamentals, mathematical logic, and relational database systems concepts."
  }
];

const certificates = [
  {
    title: "Python for Data Science",
    issuer: "IBM (Coursera Verified)",
    date: "Issued 2025",
    verificationUrl: "https://github.com/okritu",
    skills: ["Pandas & NumPy", "Web scraping", "API ingestion", "Wrangling"]
  },
  {
    title: "SQL Query Engineering",
    issuer: "In-Course Academic Honors",
    date: "Issued 2024",
    verificationUrl: "https://github.com/okritu",
    skills: ["MySQL Server", "Aggregations", "CTE & Joins", "Subqueries"]
  },
  {
    title: "Data Visualization & Dashboarding",
    issuer: "Guided Practical Studies",
    date: "Issued 2024",
    verificationUrl: "https://github.com/okritu",
    skills: ["Power BI", "DAX calculations", "Data modeling", "Chart design"]
  }
];

export function Education() {
  return (
    <Section id="education" hasGlow glowColor="indigo">
      <Container>
        <Heading
          title="Education & Qualifications"
          subtitle="Timeline"
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Chronicles Timeline (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            <div className="space-y-3 mb-6">
              <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Career & Academic Journey
              </h3>
              <p className="text-xs text-text-muted">
                Chronological mapping of education tracks, verified certificates, and career aspirations.
              </p>
            </div>

            {/* Vertical Line Timeline */}
            <div className="relative border-l border-white/5 ml-3 pl-6 space-y-8 flex-grow">
              {timelineEvents.map((event, idx) => {
                const badgeColor = 
                  event.type === "Goal" 
                    ? "bg-secondary/15 text-secondary border-secondary/20"
                    : event.type === "Credential"
                    ? "bg-accent/15 text-accent border-accent/20"
                    : "bg-primary/15 text-primary border-primary/20";
                
                return (
                  <div key={idx} className="relative">
                    {/* Node Dot */}
                    <div className="absolute -left-[30px] top-1.5 w-3 h-3 rounded-full bg-slate-950 border-2 border-primary flex items-center justify-center">
                      <span className="w-1 h-1 rounded-full bg-secondary" />
                    </div>

                    <div className="space-y-1 text-left">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-xs font-mono font-bold text-white/90 bg-slate-900 border border-white/5 px-2 py-0.5 rounded">
                          {event.year}
                        </span>
                        <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${badgeColor}`}>
                          {event.type}
                        </span>
                      </div>

                      <h4 className="text-sm sm:text-base font-bold text-white pt-1">
                        {event.title}
                      </h4>
                      <p className="text-xs font-semibold text-secondary">
                        {event.subtitle}
                      </p>
                      <p className="text-xs text-text-muted leading-relaxed pt-1 max-w-xl">
                        {event.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Certificates (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div className="space-y-3 mb-6">
              <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Award className="w-5 h-5 text-secondary" />
                Verified Credentials
              </h3>
              <p className="text-xs text-text-muted">
                Professional certificates and software honors evaluated by third-party boards.
              </p>
            </div>

            <div className="space-y-4 flex-grow flex flex-col justify-start">
              {certificates.map((cert, idx) => (
                <Card
                  key={idx}
                  hoverEffect={true}
                  className="p-5 border-white/5 bg-slate-950/20 hover:border-primary/20 backdrop-blur-md space-y-3"
                >
                  <div className="flex justify-between items-start gap-3">
                    <div className="space-y-0.5 text-left">
                      <h4 className="text-xs sm:text-sm font-bold text-white tracking-wide">
                        {cert.title}
                      </h4>
                      <p className="text-[11px] font-bold text-secondary font-mono">
                        {cert.issuer}
                      </p>
                    </div>
                    <span className="text-[9px] font-mono text-text-muted font-semibold bg-slate-900 border border-white/5 px-2 py-0.5 rounded">
                      {cert.date}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cert.skills.map((skill) => (
                      <SkillBadge
                        key={skill}
                        name={skill}
                        variant="outline"
                        className="text-[9px] py-0.5 px-2 bg-slate-950/40"
                      />
                    ))}
                  </div>

                  <div className="pt-2 border-t border-white/5 flex justify-end">
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-secondary hover:text-secondary/80 focus:outline-none hover:underline cursor-pointer"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Verify Credential
                      <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>

        </div>
      </Container>
    </Section>
  );
}
