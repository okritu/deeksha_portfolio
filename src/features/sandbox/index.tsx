"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Terminal as TerminalIcon, RefreshCw, BarChart2 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface QueryPreset {
  id: string;
  name: string;
  query: string;
  description: string;
  stats: { label: string; value: string }[];
  resultType: "bar" | "line" | "donut";
  chartData: { label: string; value: number }[];
}

const presets: QueryPreset[] = [
  {
    id: "zomato",
    name: "Zomato Cuisine Performance",
    query: `SELECT cuisine_type, ROUND(AVG(rating), 2) as avg_rating, COUNT(*) as total_orders
FROM zomato_data
GROUP BY cuisine_type
ORDER BY avg_rating DESC
LIMIT 4;`,
    description: "Computes average ratings and order volumes to identify top-performing cuisines.",
    stats: [
      { label: "Execution Time", value: "0.02s" },
      { label: "Records Parsed", value: "9,500" },
      { label: "Top Segment", value: "Continental" },
    ],
    resultType: "bar",
    chartData: [
      { label: "Continental", value: 4.45 },
      { label: "North Indian", value: 4.12 },
      { label: "Chinese", value: 3.98 },
      { label: "Fast Food", value: 3.65 },
    ],
  },
  {
    id: "stocks",
    name: "Stock Volatility Index",
    query: `SELECT date, ROUND(AVG(price_close), 2) as closing_price
FROM stock_transactions
WHERE symbol = 'AAPL' AND date >= '2026-06-01'
GROUP BY date
ORDER BY date ASC;`,
    description: "Aggregates daily transaction prices to graph trend trajectories.",
    stats: [
      { label: "Execution Time", value: "0.04s" },
      { label: "Records Parsed", value: "24,000" },
      { label: "Trend Outlook", value: "Bullish (+8.5%)" },
    ],
    resultType: "line",
    chartData: [
      { label: "Jun 01", value: 172 },
      { label: "Jun 10", value: 175 },
      { label: "Jun 20", value: 182 },
      { label: "Jun 30", value: 188 },
    ],
  },
  {
    id: "linkedin",
    name: "Remote Work Distribution",
    query: `SELECT remote_status, COUNT(*) * 100.0 / SUM(COUNT(*)) OVER() as percentage
FROM linkedin_job_postings
GROUP BY remote_status;`,
    description: "Calculates the ratio of remote, hybrid, and onsite developer openings.",
    stats: [
      { label: "Execution Time", value: "0.03s" },
      { label: "Records Parsed", value: "4,200" },
      { label: "Dominant Hub", value: "Remote (60%)" },
    ],
    resultType: "donut",
    chartData: [
      { label: "Remote", value: 60 },
      { label: "Onsite", value: 25 },
      { label: "Hybrid", value: 15 },
    ],
  },
];

export function Sandbox() {
  const [activePreset, setActivePreset] = useState<QueryPreset>(presets[0]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [terminalLog, setTerminalLog] = useState<string>("Ready to execute.");

  const runQuery = (preset: QueryPreset) => {
    setIsExecuting(true);
    setTerminalLog("Initiating MySQL connection...");
    
    setTimeout(() => {
      setTerminalLog((prev) => prev + "\nExecuting query structure...");
    }, 400);

    setTimeout(() => {
      setActivePreset(preset);
      setIsExecuting(false);
      setTerminalLog(
        `Connection OK.\nQuery successful: ${preset.chartData.length} clusters aggregated.\nRows returned: ${preset.chartData.length} rows in ${preset.stats[0].value}.`
      );
    }, 1000);
  };

  // Helper to color SQL syntax
  const formatSQL = (sqlText: string) => {
    const keywords = ["SELECT", "FROM", "WHERE", "GROUP BY", "ORDER BY", "LIMIT", "ROUND", "AVG", "COUNT", "OVER", "AND", "AS", "DESC", "ASC"];
    let result = sqlText;

    keywords.forEach((keyword) => {
      const reg = new RegExp(`\\b${keyword}\\b`, "g");
      result = result.replace(reg, `<span class="text-cyan-400 font-bold">${keyword}</span>`);
    });

    // Replace strings with yellow
    result = result.replace(/'([^']*)'/g, `<span class="text-amber-300">'$1'</span>`);
    // Replace numbers with purple
    result = result.replace(/\b(\d+)\b/g, `<span class="text-violet-400">$1</span>`);

    return <code dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <Section id="sandbox" hasGlow glowColor="indigo">
      <Container>
        <Heading
          title="Analytics Sandbox"
          subtitle="SQL & BI Emulator"
          align="center"
        />

        <div className="max-w-4xl mx-auto text-center mb-12 -mt-4">
          <p className="text-sm sm:text-base text-text-muted leading-relaxed">
            Recruiters, choose a SQL script from the presets below to execute relational operations, fetch analytical cohorts, and watch the BI dashboard generate statistics and graph overlays dynamically.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {presets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => runQuery(preset)}
              disabled={isExecuting}
              className={`px-4 py-2 text-xs font-mono font-bold rounded-full border tracking-wide transition-all cursor-pointer ${
                activePreset.id === preset.id
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/25"
                  : "bg-slate-950/65 text-text-muted border-white/5 hover:border-white/10 hover:text-white"
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* SQL Terminal IDE Panel (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-white/5 bg-slate-950/60 backdrop-blur-md overflow-hidden relative group">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-slate-900/40">
              <div className="flex items-center gap-2">
                <TerminalIcon className="w-4 h-4 text-primary" />
                <span className="text-[11px] font-mono font-bold text-white tracking-wide">
                  MySQL Workspace Client
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
            </div>

            {/* SQL Code Block */}
            <div className="p-5 font-mono text-[11px] sm:text-xs leading-relaxed text-slate-300 flex-grow min-h-[160px] overflow-x-auto select-text whitespace-pre bg-black/30">
              <div className="flex gap-4">
                {/* Simulated line numbers */}
                <div className="text-text-muted/40 select-none text-right">
                  {activePreset.query.split("\n").map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                {/* Code display */}
                <pre className="text-left font-mono">
                  {formatSQL(activePreset.query)}
                </pre>
              </div>
            </div>

            {/* Action Bar */}
            <div className="px-4 py-3 border-t border-white/5 bg-slate-900/40 flex items-center justify-between">
              <div className="text-[10px] font-mono text-text-muted">
                Engine: MySQL Community Server (InnoDB)
              </div>
              <Button
                variant="primary"
                onClick={() => runQuery(activePreset)}
                disabled={isExecuting}
                className="gap-1.5 py-1.5 px-4 text-xs font-mono font-bold cursor-pointer"
              >
                {isExecuting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Querying...
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Run Query
                  </>
                )}
              </Button>
            </div>

            {/* Terminal Console Output */}
            <div className="bg-slate-950 p-4 border-t border-white/5 font-mono text-[10px] text-emerald-400 text-left min-h-[75px] whitespace-pre-wrap select-text">
              {terminalLog}
            </div>

          </div>

          {/* BI Dashboard Report Panel (5 cols) */}
          <div className="lg:col-span-5 flex">
            <Card className="w-full p-6 border-white/5 bg-slate-950/30 backdrop-blur-md flex flex-col justify-between relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-24 h-24 radial-glow-cyan opacity-20 blur-xl pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-secondary" />
                  <span className="text-xs font-bold text-white tracking-wide">
                    BI Output Dashboard
                  </span>
                </div>
                <span className="text-[9px] font-mono font-bold text-secondary uppercase bg-secondary/15 px-2 py-0.5 rounded border border-secondary/15">
                  Aggregate View
                </span>
              </div>

              {/* Dynamic Stats Indicators */}
              <div className="grid grid-cols-3 gap-2.5 py-4">
                {activePreset.stats.map((stat, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-900 border border-white/5 text-center">
                    <span className="text-xs font-bold text-white font-mono leading-none block">
                      {stat.value}
                    </span>
                    <span className="text-[8px] text-text-muted mt-1 uppercase tracking-wider block">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Interactive Dashboard Graphic representation based on data */}
              <div className="flex-grow flex items-center justify-center min-h-[160px] bg-slate-900/40 rounded-xl border border-white/5 p-4 relative">
                <AnimatePresence mode="wait">
                  {isExecuting ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center gap-2 text-text-muted text-xs font-mono"
                    >
                      <RefreshCw className="w-6 h-6 animate-spin text-secondary" />
                      <span>Re-aggregating metrics...</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={activePreset.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full flex flex-col justify-center"
                    >
                      {/* 1. Bar Chart Render */}
                      {activePreset.resultType === "bar" && (
                        <div className="space-y-2.5 w-full">
                          {activePreset.chartData.map((data, idx) => {
                            const maxVal = Math.max(...activePreset.chartData.map((d) => d.value));
                            const percent = (data.value / maxVal) * 100;
                            return (
                              <div key={idx} className="space-y-1">
                                <div className="flex justify-between text-[9px] font-mono text-slate-300">
                                  <span>{data.label}</span>
                                  <span className="font-bold">{data.value} ★</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-slate-950 border border-white/5 overflow-hidden">
                                  <motion.div
                                    className="h-full bg-primary"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percent}%` }}
                                    transition={{ duration: 0.8, delay: idx * 0.05 }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* 2. Line Chart Render (Using SVG path) */}
                      {activePreset.resultType === "line" && (
                        <div className="w-full flex flex-col items-stretch h-full">
                          <svg className="w-full h-28 overflow-visible mt-2" viewBox="0 0 100 50">
                            {/* Grid markers */}
                            <line x1="0" y1="40" x2="100" y2="40" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                            <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                            
                            {/* Trend line */}
                            <motion.path
                              d="M 5 40 Q 30 35 60 20 T 95 10"
                              fill="none"
                              stroke="#06b6d4"
                              strokeWidth="2"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 1 }}
                            />
                            
                            {/* Data points */}
                            <circle cx="5" cy="40" r="1.5" fill="#6366f1" />
                            <circle cx="35" cy="32" r="1.5" fill="#6366f1" />
                            <circle cx="65" cy="18" r="1.5" fill="#6366f1" />
                            <circle cx="95" cy="10" r="1.5" fill="#6366f1" />
                          </svg>
                          <div className="flex justify-between text-[8px] font-mono text-text-muted mt-2 border-t border-white/5 pt-1.5">
                            {activePreset.chartData.map((d, i) => (
                              <span key={i}>{d.label}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 3. Donut chart representation */}
                      {activePreset.resultType === "donut" && (
                        <div className="flex items-center justify-between gap-6 w-full">
                          <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                              <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="4" />
                              {/* Remote segment: 60% */}
                              <circle cx="18" cy="18" r="14" fill="none" stroke="#6366f1" strokeWidth="4" strokeDasharray="60 100" strokeDashoffset="0" />
                              {/* Onsite segment: 25% */}
                              <circle cx="18" cy="18" r="14" fill="none" stroke="#06b6d4" strokeWidth="4" strokeDasharray="25 100" strokeDashoffset="-60" />
                              {/* Hybrid segment: 15% */}
                              <circle cx="18" cy="18" r="14" fill="none" stroke="#8b5cf6" strokeWidth="4" strokeDasharray="15 100" strokeDashoffset="-85" strokeLinecap="round" />
                            </svg>
                            <span className="absolute text-[9px] font-mono font-bold text-white">Ratio %</span>
                          </div>
                          <div className="flex-grow space-y-1 text-[9px] font-mono text-left">
                            {activePreset.chartData.map((d, idx) => {
                              const colors = ["bg-primary", "bg-secondary", "bg-accent"];
                              return (
                                <div key={idx} className="flex items-center justify-between border-b border-white/5 pb-1">
                                  <div className="flex items-center gap-1.5">
                                    <span className={`w-1.5 h-1.5 rounded-full ${colors[idx]}`} />
                                    <span className="text-slate-300">{d.label}</span>
                                  </div>
                                  <span className="font-bold text-white">{d.value}%</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="text-[10px] text-center font-mono text-text-muted mt-4 border-t border-white/5 pt-3">
                * Simulated live-updating dataset aggregates
              </div>
            </Card>
          </div>

        </div>
      </Container>
    </Section>
  );
}
