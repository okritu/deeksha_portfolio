"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, ArrowRight, BarChart3, Database, FileSpreadsheet, Layers, FileDown, ArrowDown } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

// Count-up helper component for data metrics
function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 15);
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <>{count}</>;
}

const statsData = [
  { value: 3, suffix: "+", label: "Analytics Case Studies", icon: <BarChart3 className="w-5 h-5 text-secondary" /> },
  { value: 100, suffix: "K+", label: "Rows Cleaned & Processed", icon: <Database className="w-5 h-5 text-primary" /> },
  { value: 50, suffix: "+", label: "Advanced SQL Queries", icon: <Layers className="w-5 h-5 text-accent" /> },
  { value: 20, suffix: "+", label: "Dashboard Formulations", icon: <FileSpreadsheet className="w-5 h-5 text-secondary" /> },
];

export function Hero() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityBg = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 overflow-hidden bg-background">
      {/* 1. Subtle Premium Animated Blobs */}
      <motion.div 
        style={{ y: yBg, opacity: opacityBg }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div className="absolute top-10 left-[10%] w-[350px] md:w-[500px] h-[350px] md:h-[500px] rounded-full glow-blur-indigo opacity-40 blur-[120px] animate-float-slow" />
        <div className="absolute bottom-20 right-[10%] w-[300px] md:w-[450px] h-[300px] md:h-[450px] rounded-full glow-blur-cyan opacity-35 blur-[120px] animate-float-medium" />
        <div className="absolute top-1/3 right-[30%] w-[250px] md:w-[350px] h-[250px] md:h-[350px] rounded-full glow-blur-purple opacity-20 blur-[100px] animate-float-slow" />
      </motion.div>

      {/* 2. Background Grid Overlay */}
      <div className="absolute inset-0 grid-mesh opacity-80 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-noise pointer-events-none z-0" />
      
      {/* 3. Radial Fade-out Mask */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,transparent_30%,#050816_100%)] pointer-events-none z-0" />

      {/* Hero Content */}
      <Container className="relative z-10 flex-grow flex flex-col justify-center items-center text-center">
        
        {/* Recruitment Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-slate-950/60 backdrop-blur-md text-text-muted text-xs font-semibold tracking-wider mb-8"
        >
          <span className="flex h-2.5 w-2.5 rounded-full bg-secondary animate-pulse" />
          <span>Available for Data Analyst Opportunities (India / Remote)</span>
        </motion.div>

        {/* Large Professional Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-none max-w-5xl"
        >
          Turning Raw Data Into <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Actionable Intelligence
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-base sm:text-lg md:text-xl text-text-muted max-w-2xl mt-6 leading-relaxed"
        >
          I build engineered pipelines, perform rigorous Exploratory Data Analysis, and design dynamic business dashboards to optimize executive decision-making.
        </motion.p>

        {/* Action Button Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-10 w-full sm:w-auto"
        >
          <Button
            variant="primary"
            onClick={() => {
              const element = document.getElementById("projects");
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full sm:w-auto px-7 py-3 text-sm font-bold gap-2 group cursor-pointer"
          >
            Explore Case Studies
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              window.open("/resume", "_blank");
            }}
            className="w-full sm:w-auto px-7 py-3 text-sm font-semibold gap-2 cursor-pointer border-white/5 bg-slate-950/40 hover:bg-slate-900"
          >
            <FileDown className="w-4 h-4 text-secondary" />
            View Resume
          </Button>
        </motion.div>

        {/* Social / Contact Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center gap-4 mt-8"
        >
          <a
            href="https://linkedin.com/in/deeksha-pal-48b333235"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/5 bg-slate-950/40 text-text-muted hover:text-white hover:border-primary/50 transition-all cursor-pointer"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/okritu"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/5 bg-slate-950/40 text-text-muted hover:text-white hover:border-primary/50 transition-all cursor-pointer"
            aria-label="GitHub Profile"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="mailto:deeksha30pal@gmail.com"
            className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/5 bg-slate-950/40 text-text-muted hover:text-white hover:border-primary/50 transition-all cursor-pointer"
            aria-label="Email Address"
          >
            <Mail className="w-5 h-5" />
          </a>
        </motion.div>

        {/* Statistics Row Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-24 pt-8 border-t border-white/5"
        >
          {statsData.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-white/5 bg-slate-950/20 backdrop-blur-md flex items-start gap-4 hover:border-primary/20 hover:bg-slate-900/10 transition-all duration-300 shadow-sm"
            >
              <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5 text-primary">
                {stat.icon}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono leading-none">
                  <AnimatedCounter value={stat.value} />
                  {stat.suffix}
                </span>
                <span className="text-[11px] sm:text-xs text-text-muted mt-2 font-medium tracking-wide leading-tight">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

      </Container>

      {/* Mouse scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="w-full flex justify-center mt-12 relative z-10 pointer-events-none"
      >
        <div className="flex flex-col items-center gap-2 text-text-muted font-mono text-[10px] tracking-widest uppercase">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4 text-secondary" />
          </motion.div>
          <span>Scroll Down</span>
        </div>
      </motion.div>

    </section>
  );
}
