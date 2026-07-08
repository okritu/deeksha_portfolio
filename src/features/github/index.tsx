"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Flame } from "lucide-react";
import { Github } from "@/components/ui/Icons";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";

interface ContributionCell {
  date: string;
  count: number;
}

// Generate mock contribution data for past 24 weeks (7 days each)
const generateMockContributions = (): ContributionCell[][] => {
  const weeks: ContributionCell[][] = [];
  const now = new Date(2026, 6, 8); // Anchor to current time
  
  for (let w = 0; w < 24; w++) {
    const weekData: ContributionCell[] = [];
    for (let d = 0; d < 7; d++) {
      // Create relative date offsets
      const dayOffset = (24 - w) * 7 + (7 - d);
      const cellDate = new Date(now.getTime() - dayOffset * 24 * 60 * 60 * 1000);
      
      // Randomize activity weight (0 to 12 commits)
      let count = 0;
      const rand = Math.random();
      if (rand > 0.4) {
        count = Math.floor(Math.random() * 5) + 1; // Light activity
      }
      if (rand > 0.8) {
        count = Math.floor(Math.random() * 8) + 5; // Heavy activity
      }
      
      // Make weekends lighter
      if (d === 0 || d === 6) {
        count = Math.random() > 0.75 ? Math.floor(Math.random() * 3) : 0;
      }

      weekData.push({
        date: cellDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        count,
      });
    }
    weeks.push(weekData);
  }
  return weeks;
};

const mockContributions = generateMockContributions();

export function GitHubGraph() {
  const [hoveredCell, setHoveredCell] = useState<{ date: string; count: number; x: number; y: number } | null>(null);

  const getCellColorClass = (count: number) => {
    if (count === 0) return "bg-slate-900 border-white/5";
    if (count <= 2) return "bg-emerald-950 border-emerald-900/40";
    if (count <= 5) return "bg-emerald-800 border-emerald-700/40";
    if (count <= 8) return "bg-emerald-500 border-emerald-400/40";
    return "bg-emerald-300 border-emerald-200/40";
  };

  const handleCellHover = (e: React.MouseEvent, cell: ContributionCell) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredCell({
      date: cell.date,
      count: cell.count,
      x: rect.left + window.scrollX - 80,
      y: rect.top + window.scrollY - 45,
    });
  };

  return (
    <Section id="github" hasGlow glowColor="cyan">
      <Container>
        <Heading
          title="Coding Contribution Activity"
          subtitle="GitHub Index"
          align="center"
        />

        <div className="max-w-4xl mx-auto">
          <Card className="p-6 md:p-8 border-white/5 bg-slate-950/30 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 radial-glow-indigo opacity-25 blur-xl pointer-events-none" />

            {/* Header: GitHub Username info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-5 mb-6 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5 text-white">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wide">
                    okritu (Deeksha Pal)
                  </h3>
                  <a
                    href="https://github.com/okritu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono text-secondary hover:underline"
                  >
                    https://github.com/okritu
                  </a>
                </div>
              </div>

              {/* Stats Widgets */}
              <div className="flex gap-4 text-left">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-500" />
                  <div>
                    <span className="text-xs font-bold text-white font-mono block">45 Days</span>
                    <span className="text-[9px] text-text-muted font-mono uppercase block">Max Streak</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-secondary" />
                  <div>
                    <span className="text-xs font-bold text-white font-mono block">Python / SQL</span>
                    <span className="text-[9px] text-text-muted font-mono uppercase block">Active Code</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendar Ingestion Grid Container */}
            <div className="overflow-x-auto pb-4 -mx-6 px-6 sm:mx-0 sm:px-0">
              <div className="flex flex-col space-y-2 min-w-[500px]">
                
                {/* Visual grid representing columns and rows */}
                <div className="flex gap-[3px] select-none justify-center">
                  
                  {/* Row tags */}
                  <div className="flex flex-col justify-between text-[9px] font-mono text-text-muted/60 pr-2 pt-1 h-20 leading-none">
                    <span>Mon</span>
                    <span>Wed</span>
                    <span>Fri</span>
                  </div>

                  {mockContributions.map((week, wIdx) => {
                    // Responsive column rendering: hide older weeks on small screens
                    const showColumnClass = wIdx < 10 
                      ? "flex" // Always show recent 10 weeks
                      : wIdx < 16
                      ? "hidden sm:flex" // Show up to 16 on tablet
                      : "hidden md:flex"; // Show up to 24 on desktop
                      
                    return (
                      <div
                        key={wIdx}
                        className={`${showColumnClass} flex-col gap-[3px]`}
                      >
                        {week.map((cell, dIdx) => (
                          <div
                            key={dIdx}
                            onMouseEnter={(e) => handleCellHover(e, cell)}
                            onMouseLeave={() => setHoveredCell(null)}
                            className={`w-[10px] h-[10px] rounded-[1.5px] border cursor-crosshair transition-all hover:scale-125 duration-100 ${getCellColorClass(cell.count)}`}
                          />
                        ))}
                      </div>
                    );
                  })}
                </div>

                {/* Calendar Legend Indicators */}
                <div className="flex justify-between items-center text-[8px] font-mono text-text-muted max-w-[480px] mx-auto w-full pt-2">
                  <span>24 Weeks Ago</span>
                  <div className="flex items-center gap-1">
                    <span>Less</span>
                    <div className="w-2 h-2 rounded-[1px] bg-slate-900 border border-white/5" />
                    <div className="w-2 h-2 rounded-[1px] bg-emerald-950 border border-emerald-900/20" />
                    <div className="w-2 h-2 rounded-[1px] bg-emerald-800 border border-emerald-700/20" />
                    <div className="w-2 h-2 rounded-[1px] bg-emerald-500 border border-emerald-400/20" />
                    <div className="w-2 h-2 rounded-[1px] bg-emerald-300 border border-emerald-200/20" />
                    <span>More</span>
                  </div>
                  <span>Today</span>
                </div>

              </div>
            </div>

            {/* Ingestion Info Statement */}
            <div className="text-[10px] font-mono text-text-muted text-center border-t border-white/5 pt-4 mt-2">
              Syncing automated data model cleaning algorithms, notebook updates, and query revisions.
            </div>

          </Card>
        </div>

        {/* Hover Tooltip Portal Overlay */}
        <AnimatePresence>
          {hoveredCell && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute pointer-events-none z-50 bg-slate-950 border border-white/10 p-2 rounded-lg text-[9px] font-mono text-white shadow-2xl glass"
              style={{
                left: hoveredCell.x,
                top: hoveredCell.y,
              }}
            >
              <div className="font-bold text-center">
                {hoveredCell.count === 0 ? "No contributions" : `${hoveredCell.count} commits`}
              </div>
              <div className="text-text-muted mt-0.5">{hoveredCell.date}</div>
            </motion.div>
          )}
        </AnimatePresence>

      </Container>
    </Section>
  );
}
