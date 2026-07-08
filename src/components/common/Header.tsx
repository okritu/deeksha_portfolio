"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";
import { useScroll } from "@/hooks/useScroll";
import { Container } from "@/components/ui/Container";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const isScrolled = useScroll(20);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-nav py-3 shadow-md"
          : "bg-transparent py-5"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 group focus:outline-none"
          >
            <span className="font-mono text-lg font-bold text-white tracking-wider flex items-center">
              <span className="text-primary font-extrabold">&lt;</span>
              Deeksha
              <span className="text-secondary font-extrabold">.Pal /&gt;</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm font-medium text-text-muted hover:text-white transition-colors duration-200 focus:outline-none focus:text-primary"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Social Icons / Call to action */}
            <div className="flex items-center gap-4 pl-6 border-l border-slate-800">
              <a
                href="https://github.com/okritu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-white transition-colors focus:outline-none focus:text-primary"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/deeksha-pal-48b333235"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-white transition-colors focus:outline-none focus:text-primary"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:deeksha30pal@gmail.com"
                className="text-text-muted hover:text-white transition-colors focus:outline-none focus:text-primary"
                aria-label="Email Address"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </nav>

          {/* Mobile Menu Button - min 44x44 px touch target */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg text-text-muted hover:text-white bg-slate-900/50 border border-slate-850 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-lg"
          >
            <Container className="py-6 flex flex-col gap-6">
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={closeMenu}
                    className="text-base font-semibold text-text-muted hover:text-white px-2 py-2.5 rounded-lg hover:bg-slate-900 transition-all focus:outline-none focus:bg-slate-900 focus:text-primary"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>

              {/* Social Links on Mobile */}
              <div className="flex items-center gap-6 px-2 pt-4 border-t border-slate-900">
                <a
                  href="https://github.com/okritu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-text-muted hover:text-white"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-5 h-5" /> GitHub
                </a>
                <a
                  href="https://linkedin.com/in/deeksha-pal-48b333235"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-text-muted hover:text-white"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" /> LinkedIn
                </a>
                <a
                  href="mailto:deeksha30pal@gmail.com"
                  className="flex items-center gap-2 text-sm text-text-muted hover:text-white"
                  aria-label="Email Address"
                >
                  <Mail className="w-5 h-5" /> Email
                </a>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
