import React from "react";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-900 bg-background/50 py-8 mt-auto">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <p className="text-sm font-medium text-white">
              Deeksha Pal
            </p>
            <p className="text-xs text-text-muted">
              Data Analyst | MCA Student
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-text-muted">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#education" className="hover:text-white transition-colors">Education</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="text-xs text-text-muted font-mono">
            &copy; {currentYear} • Built with Next.js, TS & Tailwind
          </div>
        </div>
      </Container>
    </footer>
  );
}
