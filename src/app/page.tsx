import React from "react";
import { Header } from "@/components/common/Header";
import { Hero } from "@/features/hero";
import { About } from "@/features/about";
import { Skills } from "@/features/skills";
import { Projects } from "@/features/projects";

import { Education } from "@/features/education";
import { Contact } from "@/features/contact";
import { Footer } from "@/components/common/Footer";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { Cursor } from "@/components/ui/Cursor";
import { CommandMenu } from "@/components/ui/CommandMenu";

export default function Home() {
  return (
    <>
      {/* Dynamic Interaction Overlay Utilities */}
      <Cursor />
      <CommandMenu />

      {/* Global Transparent Blur Header */}
      <Header />

      <main className="flex-grow relative z-10">
        {/* 1. Large Luxury Headline & Counters */}
        <Hero />

        {/* 2. Dossier Profile Strengths */}
        <About />

        {/* 3. Circular Tech & Libraries Taxonomy */}
        <Skills />

        {/* 5. Detailed Case Studies & Filters */}
        <Projects />



        {/* 7. AcademicTimeline & Certification credentials */}
        <Education />

        {/* 8. Direct Form Transmission & Pulse Coordinates */}
        <Contact />
      </main>

      {/* Footer copyright */}
      <Footer />

      {/* Scroll-To-Top button */}
      <ScrollToTop />
    </>
  );
}
