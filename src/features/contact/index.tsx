"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";

export function Contact() {
  return (
    <Section id="contact" hasGlow glowColor="indigo">
      <Container>
        <Heading
          title="Initiate Connection"
          subtitle="Direct Contact"
          align="center"
        />

        <div className="max-w-2xl mx-auto">
          {/* Direct coordinates & Pulsing Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="w-full flex"
          >
            <Card className="w-full p-6 md:p-8 border-white/5 bg-slate-950/20 backdrop-blur-md flex flex-col justify-between relative overflow-hidden h-full">
              
              {/* Dynamic location radial map */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 opacity-5 pointer-events-none">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full text-secondary">
                  <circle cx="50" cy="50" r="45" strokeWidth="0.5" strokeDasharray="4 4" />
                  <circle cx="50" cy="50" r="30" strokeWidth="0.5" />
                  <circle cx="50" cy="50" r="15" strokeWidth="0.5" strokeDasharray="2 2" />
                </svg>
              </div>

              <div className="space-y-6 relative z-10 text-left">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <h4 className="text-sm font-bold text-white tracking-wide uppercase">
                    Direct Coordinates
                  </h4>
                  <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full animate-pulse">
                    Available Now
                  </span>
                </div>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5 text-secondary flex-shrink-0 mt-0.5">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-text-muted uppercase">Email Inquiries</p>
                      <a href="mailto:deeksha30pal@gmail.com" className="text-xs sm:text-sm font-bold text-white hover:text-primary transition-colors mt-0.5 block">
                        deeksha30pal@gmail.com
                      </a>
                    </div>
                  </div>

<div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5 text-secondary flex-shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-text-muted uppercase">Location Base</p>
                      <span className="text-xs sm:text-sm font-bold text-white mt-0.5 block">
                        Greater Noida, Uttar Pradesh, India
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct message copy link */}
              <div className="pt-6 border-t border-white/5 mt-8 flex justify-between gap-4 relative z-10">
                <a
                  href="https://linkedin.com/in/deeksha-pal-48b333235"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono font-bold rounded-lg bg-slate-900 border border-white/5 hover:border-primary/50 text-text-muted hover:text-white transition-all cursor-pointer"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/okritu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono font-bold rounded-lg bg-slate-900 border border-white/5 hover:border-primary/50 text-text-muted hover:text-white transition-all cursor-pointer"
                >
                  <Github className="w-3.5 h-3.5 text-white" />
                  GitHub
                </a>
              </div>

            </Card>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
