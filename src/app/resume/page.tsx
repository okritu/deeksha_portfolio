"use client";

import React from "react";
import portfolioData from "@/data/portfolioData.json";
import { ArrowLeft, Printer, Mail, Phone, MapPin, Globe } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";
import { useRouter } from "next/navigation";

export default function ResumePage() {
  const router = useRouter();
  const { profile, experience, skills, projects, education, certifications } = portfolioData;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#050816] text-[#E5E7EB] py-12 px-4 sm:px-6 lg:px-8 print:bg-white print:text-black print:p-0">
      
      {/* Controls - Hidden in print */}
      <div className="max-w-4xl mx-auto mb-8 flex justify-between items-center print:hidden">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-xs font-mono font-bold text-text-muted hover:text-white bg-slate-900/60 border border-white/5 hover:border-primary/30 px-4 py-2 rounded-lg transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-primary" />
          Back to Portfolio
        </button>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 text-xs font-mono font-bold text-white bg-gradient-to-r from-primary to-accent hover:from-primary hover:to-accent px-5 py-2.5 rounded-lg transition-all shadow-md shadow-primary/20 hover:scale-[1.02] cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          Print / Save PDF
        </button>
      </div>

      {/* Resume Container */}
      <div className="max-w-4xl mx-auto bg-slate-950/40 border border-white/5 p-8 md:p-12 rounded-2xl shadow-xl print:shadow-none print:border-none print:bg-white print:p-0 print:text-black print:rounded-none">
        
        {/* Header Section */}
        <div className="text-center pb-6 border-b border-white/10 print:border-black/10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-none print:text-black">
            {profile.name}
          </h1>
          <p className="text-sm font-semibold font-mono text-secondary mt-2 tracking-wider uppercase print:text-black/70">
            {profile.role}
          </p>
          
          {/* Direct Coordinates */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 text-xs text-text-muted font-mono print:text-black/80">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-primary print:text-black" />
              <a href={`mailto:${profile.email}`} className="hover:underline">{profile.email}</a>
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-secondary print:text-black" />
              <span>{profile.phone}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-accent print:text-black" />
              <span>{profile.location}</span>
            </span>
          </div>

          <div className="flex justify-center gap-6 mt-3 text-xs text-text-muted font-mono print:text-black/80">
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
              <Linkedin className="w-3.5 h-3.5 text-[#0A66C2] print:text-black" /> LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
              <Github className="w-3.5 h-3.5 text-white print:text-black" /> GitHub
            </a>
          </div>
        </div>

        {/* Professional Summary */}
        <div className="py-6 border-b border-white/5 print:border-black/5 text-left">
          <h2 className="text-sm font-bold tracking-widest font-mono text-secondary uppercase mb-3 print:text-black print:border-b print:border-black/15 print:pb-1">
            Professional Summary
          </h2>
          <p className="text-xs md:text-sm text-text-muted leading-relaxed print:text-black/90">
            {profile.summary}
          </p>
        </div>

        {/* Experience */}
        <div className="py-6 border-b border-white/5 print:border-black/5 text-left">
          <h2 className="text-sm font-bold tracking-widest font-mono text-secondary uppercase mb-4 print:text-black print:border-b print:border-black/15 print:pb-1">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {experience.map((job) => (
              <div key={job.id} className="space-y-1.5">
                <div className="flex justify-between items-baseline flex-wrap gap-2">
                  <h3 className="text-sm md:text-base font-extrabold text-white print:text-black">
                    {job.role} <span className="text-text-muted font-normal print:text-black/60">at {job.company}</span>
                  </h3>
                  <span className="text-xs font-mono text-secondary print:text-black/75">
                    {job.duration}
                  </span>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-text-muted leading-relaxed print:text-black/90">
                  {job.bullets.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Skills */}
        <div className="py-6 border-b border-white/5 print:border-black/5 text-left">
          <h2 className="text-sm font-bold tracking-widest font-mono text-secondary uppercase mb-3 print:text-black print:border-b print:border-black/15 print:pb-1">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-xs text-text-muted print:text-black/90">
            <div>
              <p className="leading-relaxed"><strong className="text-white font-mono print:text-black font-semibold">Programming:</strong> {skills.core.map(s => s.label).join(", ")}</p>
              <p className="leading-relaxed mt-1"><strong className="text-white font-mono print:text-black font-semibold">Libraries:</strong> {skills.supplementary.filter(s => s.label.includes("Pandas") || s.label.includes("Matplotlib")).map(s => s.label).join(", ")}</p>
              <p className="leading-relaxed mt-1"><strong className="text-white font-mono print:text-black font-semibold">Database:</strong> MySQL</p>
            </div>
            <div>
              <p className="leading-relaxed"><strong className="text-white font-mono print:text-black font-semibold">Visualization:</strong> Power BI, Advanced Excel</p>
              <p className="leading-relaxed mt-1"><strong className="text-white font-mono print:text-black font-semibold">Tools:</strong> Jupyter Notebook, Git, GitHub</p>
              <p className="leading-relaxed mt-1"><strong className="text-white font-mono print:text-black font-semibold">Core Skills:</strong> Data Analytics, Data Cleaning, Wrangling, EDA, Visual Reporting, Data-Driven Decisions</p>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div className="py-6 border-b border-white/5 print:border-black/5 text-left">
          <h2 className="text-sm font-bold tracking-widest font-mono text-secondary uppercase mb-4 print:text-black print:border-b print:border-black/15 print:pb-1">
            Selected Projects
          </h2>
          <div className="space-y-4">
            {projects.slice(0, 2).map((project) => (
              <div key={project.id} className="space-y-1">
                <div className="flex justify-between items-baseline flex-wrap gap-2">
                  <h3 className="text-xs md:text-sm font-extrabold text-white print:text-black">
                    {project.title}
                  </h3>
                  <span className="text-[10px] font-mono text-text-muted print:text-black/60 uppercase">
                    {project.techStack.join(" | ")}
                  </span>
                </div>
                <p className="text-xs text-text-muted leading-relaxed print:text-black/80 italic">
                  {project.subtitle}
                </p>
                <ul className="list-disc list-outside pl-4 space-y-0.5 text-xs text-text-muted leading-relaxed print:text-black/90">
                  {project.achievements.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Qualifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 text-left">
          
          {/* Education */}
          <div>
            <h2 className="text-sm font-bold tracking-widest font-mono text-secondary uppercase mb-3 print:text-black print:border-b print:border-black/15 print:pb-1">
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="flex justify-between font-bold text-white print:text-black">
                    <span>{edu.title}</span>
                    <span className="font-mono text-text-muted font-normal print:text-black/75">{edu.year}</span>
                  </div>
                  <p className="text-text-muted font-mono leading-normal print:text-black/85 mt-0.5">{edu.school}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-sm font-bold tracking-widest font-mono text-secondary uppercase mb-3 print:text-black print:border-b print:border-black/15 print:pb-1">
              Certifications
            </h2>
            <div className="space-y-3">
              {certifications.map((cert) => (
                <div key={cert.id} className="text-xs">
                  <div className="flex justify-between font-bold text-white print:text-black">
                    <span>{cert.title}</span>
                    <span className="font-mono text-text-muted font-normal print:text-black/75">{cert.date}</span>
                  </div>
                  <p className="text-text-muted font-mono leading-normal print:text-black/85 mt-0.5">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
