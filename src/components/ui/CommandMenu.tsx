"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, Terminal, FolderGit, GraduationCap, Mail, FileDown, Clipboard, Check, HelpCircle } from "lucide-react";
import { cn } from "@/utils/cn";

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  action: () => void;
  category: "Navigation" | "Contact" | "Utilities";
}

export function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const triggerScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const commands: CommandItem[] = [
    {
      id: "nav-about",
      title: "Jump to About Section",
      subtitle: "Read academic and data analytics background narrative",
      icon: <User className="w-4 h-4 text-primary" />,
      action: () => triggerScroll("about"),
      category: "Navigation",
    },
    {
      id: "nav-skills",
      title: "Jump to Technical Competencies",
      subtitle: "View categorization grid and interactive skills meters",
      icon: <Terminal className="w-4 h-4 text-secondary" />,
      action: () => triggerScroll("skills"),
      category: "Navigation",
    },
    {
      id: "nav-sandbox",
      title: "Jump to SQL Query Runner & Dashboard Showcase",
      subtitle: "Simulate live SQL queries and aggregate analytics tables",
      icon: <HelpCircle className="w-4 h-4 text-accent" />,
      action: () => triggerScroll("sandbox"),
      category: "Navigation",
    },
    {
      id: "nav-projects",
      title: "Jump to Featured Projects",
      subtitle: "Review portfolio of outcome-driven analytics case studies",
      icon: <FolderGit className="w-4 h-4 text-primary" />,
      action: () => triggerScroll("projects"),
      category: "Navigation",
    },
    {
      id: "nav-credentials",
      title: "Jump to Education & Credentials",
      subtitle: "See pursuing MCA, BCA, and certifications certificates",
      icon: <GraduationCap className="w-4 h-4 text-secondary" />,
      action: () => triggerScroll("education"),
      category: "Navigation",
    },
    {
      id: "nav-contact",
      title: "Jump to Contact Card",
      subtitle: "Direct copy/call details and availability stats",
      icon: <Mail className="w-4 h-4 text-accent" />,
      action: () => triggerScroll("contact"),
      category: "Navigation",
    },
    {
      id: "copy-email",
      title: "Copy Email Address",
      subtitle: "deeksha30pal@gmail.com",
      icon: <Clipboard className="w-4 h-4 text-primary" />,
      action: () => copyToClipboard("deeksha30pal@gmail.com", "Email Address"),
      category: "Contact",
    },

    {
      id: "download-resume",
      title: "View & Print Resume",
      subtitle: "Open professional print-friendly layout to save as PDF",
      icon: <FileDown className="w-4 h-4 text-accent" />,
      action: () => {
        window.open("/resume", "_blank");
        setIsOpen(false);
      },
      category: "Utilities",
    },
  ];

  // Filter commands by search
  const filtered = commands.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleOpen();
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        setSelectedIndex(0);
        setSearch("");
      }, 100);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    }
  };

  useEffect(() => {
    // Keep active item in view inside scroll container
    if (scrollContainerRef.current) {
      const activeEl = scrollContainerRef.current.children[selectedIndex] as HTMLElement;
      if (activeEl) {
        const parent = scrollContainerRef.current;
        const activeTop = activeEl.offsetTop;
        const activeHeight = activeEl.offsetHeight;
        const parentScrollTop = parent.scrollTop;
        const parentHeight = parent.offsetHeight;

        if (activeTop < parentScrollTop) {
          parent.scrollTop = activeTop;
        } else if (activeTop + activeHeight > parentScrollTop + parentHeight) {
          parent.scrollTop = activeTop + activeHeight - parentHeight;
        }
      }
    }
  }, [selectedIndex]);

  return (
    <>
      {/* Floating Shortcut Badge */}
      <button
        onClick={toggleOpen}
        className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-slate-950/80 backdrop-blur-md text-xs font-mono text-text-muted hover:text-white hover:border-primary/40 shadow-lg cursor-pointer transition-all duration-300"
        aria-label="Open Command Menu"
      >
        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
        <span>Menu</span>
        <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-white">
          Ctrl K
        </kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 md:p-10">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleOpen}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-950/90 shadow-2xl overflow-hidden glass flex flex-col max-h-[500px]"
            >
              {/* Search Header */}
              <div className="flex items-center gap-3 px-4 border-b border-white/5 h-14 shrink-0">
                <Search className="w-5 h-5 text-text-muted shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a command or query search..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent border-0 text-sm font-sans placeholder-text-muted focus:outline-none focus:ring-0 text-white"
                />
                <kbd className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-text-muted shrink-0 shadow-inner">
                  ESC
                </kbd>
              </div>

              {/* Status Copy Toast */}
              <AnimatePresence>
                {copiedText && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-emerald-500/10 border-b border-emerald-500/20 text-emerald-400 px-4 py-2 text-xs font-mono flex items-center gap-2"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Copied {copiedText} successfully!
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Command List Scroll Area */}
              <div
                ref={scrollContainerRef}
                className="overflow-y-auto p-2 space-y-1 divide-y divide-white/5 flex-grow"
              >
                {filtered.length > 0 ? (
                  filtered.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={cn(
                        "w-full text-left flex items-center gap-4 px-4 py-3 rounded-xl transition-all outline-none duration-150 border border-transparent cursor-pointer",
                        idx === selectedIndex
                          ? "bg-white/5 border-white/5 shadow-inner"
                          : "hover:bg-white/5"
                      )}
                    >
                      <div className="flex-shrink-0 p-2.5 rounded-lg bg-slate-900 border border-white/5">
                        {item.icon}
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="text-sm font-bold text-white tracking-wide truncate">
                          {item.title}
                        </div>
                        <div className="text-xs text-text-muted font-mono truncate mt-0.5">
                          {item.subtitle}
                        </div>
                      </div>
                      <div className="shrink-0 text-[10px] font-mono font-bold text-text-muted uppercase bg-slate-900/60 px-2 py-0.5 rounded border border-white/5">
                        {item.category}
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="py-12 text-center text-text-muted font-mono text-sm">
                    No results found for &quot;{search}&quot;.
                  </div>
                )}
              </div>

              {/* Modal Footer Tip */}
              <div className="bg-slate-950 px-4 py-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-text-muted shrink-0">
                <div className="flex items-center gap-4">
                  <span>↑↓ Navigate</span>
                  <span>↵ Select</span>
                </div>
                <span>Ctrl+K to Toggle</span>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
