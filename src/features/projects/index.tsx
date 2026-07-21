"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FolderGit } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ProjectCard, Project } from "./ProjectCard";
import portfolioData from "@/data/portfolioData.json";

type CategoryFilter = "All" | "Visualization" | "Database" | "Analysis";

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const projects = portfolioData.projects as Project[];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      activeCategory === "All" || project.category === activeCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const categories: { label: string; value: CategoryFilter }[] = [
    { label: "All Analytics", value: "All" },
    { label: "BI & Visualization", value: "Visualization" },
    { label: "SQL & Databases", value: "Database" },
    { label: "Data Pipeline Analysis", value: "Analysis" },
  ];

  return (
    <Section id="projects" hasGlow glowColor="indigo">
      <Container>
        <Heading
          title="Case Studies & Projects"
          subtitle="Featured Portfolios"
          align="center"
        />

        {/* Dynamic Controls Bar */}
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 justify-between items-center mb-12">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-full border border-white/5 bg-slate-950/60 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold tracking-wide transition-all cursor-pointer ${
                  activeCategory === cat.value
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/10"
                    : "text-text-muted hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input Bar */}
          <div className="relative w-full md:w-80 h-10 rounded-full border border-white/5 bg-slate-950/60 backdrop-blur-md flex items-center px-4">
            <Search className="w-4 h-4 text-text-muted shrink-0 mr-2.5" />
            <input
              type="text"
              placeholder="Search by tech or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-xs font-mono w-full text-white placeholder-text-muted focus:outline-none focus:ring-0"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-[10px] font-mono text-text-muted hover:text-white px-1"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Interactive Responsive Grid Layout */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="h-full flex"
              >
                <ProjectCard project={project} index={idx} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 border border-dashed border-white/5 bg-slate-950/20 rounded-2xl">
            <FolderGit className="w-8 h-8 text-text-muted/40 mx-auto mb-3" />
            <p className="text-sm font-mono text-text-muted">
              No matching analytical case studies found. Try querying another library.
            </p>
          </div>
        )}
      </Container>
    </Section>
  );
}
