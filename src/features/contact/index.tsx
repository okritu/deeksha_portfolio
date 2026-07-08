"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus("error");
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Simulate form submission to backend
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
      
      // Auto clear toast after 4s
      setTimeout(() => setSubmitStatus("idle"), 4000);
    }, 1500);
  };

  return (
    <Section id="contact" hasGlow glowColor="indigo">
      <Container>
        <Heading
          title="Initiate Connection"
          subtitle="Direct Contact"
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch max-w-5xl mx-auto">
          
          {/* Direct coordinates & Pulsing Map (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex"
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

                <div className="space-y-4">
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
              <div className="pt-6 border-t border-white/5 mt-8 flex justify-between gap-3 relative z-10">
                <a
                  href="https://linkedin.com/in/deeksha-pal-48b333235"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow flex items-center justify-center gap-2 px-3 py-2 text-xs font-mono font-bold rounded-lg bg-slate-900 border border-white/5 hover:border-primary/50 text-text-muted hover:text-white transition-all cursor-pointer"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/okritu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow flex items-center justify-center gap-2 px-3 py-2 text-xs font-mono font-bold rounded-lg bg-slate-900 border border-white/5 hover:border-primary/50 text-text-muted hover:text-white transition-all cursor-pointer"
                >
                  <Github className="w-3.5 h-3.5 text-white" />
                  GitHub
                </a>
              </div>

            </Card>
          </motion.div>

          {/* Form Message client (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 flex"
          >
            <Card className="w-full p-6 md:p-8 border-white/5 bg-slate-950/20 backdrop-blur-md flex flex-col justify-between h-full text-left">
              <form onSubmit={handleSubmit} className="space-y-5 flex-grow flex flex-col justify-between">
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-white tracking-wide uppercase border-b border-white/5 pb-4">
                    Send Data Transmission
                  </h4>

                  {/* Input Casing with dynamic borders */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-text-muted uppercase tracking-wider block">Your Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full h-10 px-4 rounded-lg bg-slate-900 border border-white/5 focus:border-primary/50 focus:outline-none focus:ring-0 text-white text-xs font-sans placeholder-text-muted transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-text-muted uppercase tracking-wider block">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. john@company.com"
                      className="w-full h-10 px-4 rounded-lg bg-slate-900 border border-white/5 focus:border-primary/50 focus:outline-none focus:ring-0 text-white text-xs font-sans placeholder-text-muted transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-text-muted uppercase tracking-wider block">Message Transmission</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Discuss analytics case studies, timelines, or recruitment availability..."
                      rows={4}
                      className="w-full p-4 rounded-lg bg-slate-900 border border-white/5 focus:border-primary/50 focus:outline-none focus:ring-0 text-white text-xs font-sans placeholder-text-muted transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Submit Toast indicators */}
                <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-6">
                  <div className="min-h-[24px] flex items-center">
                    <AnimatePresence mode="wait">
                      {submitStatus === "success" && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          Message sent successfully.
                        </motion.div>
                      )}
                      {submitStatus === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="flex items-center gap-1.5 text-xs text-rose-400 font-mono"
                        >
                          <AlertCircle className="w-4 h-4 text-rose-400" />
                          All form fields are required.
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                    className="gap-2 px-6 py-2.5 text-xs font-mono font-bold shrink-0 cursor-pointer"
                  >
                    {isSubmitting ? "Transmitting..." : "Send Message"}
                    <Send className="w-3.5 h-3.5" />
                  </Button>
                </div>

              </form>
            </Card>
          </motion.div>

        </div>
      </Container>
    </Section>
  );
}
