"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import AISkillsRadar from "@/components/sections/AISkillsRadar";
import ProjectsShowcase from "@/components/sections/ProjectsShowcase";
import { CursorTrail } from "@/components/ui/CursorTrail";
import { useI18n } from "@/lib/i18n";

export default function Home() {
  const { t } = useI18n();

  return (
    <main className="relative min-h-screen selection:bg-azure-500/30">
      <CursorTrail />
      <Navbar />
      <Hero />
      <BentoGrid />
      <ProjectsShowcase />
      <AISkillsRadar />

      {/* Footer */}
      <footer className="py-10 text-center text-azure-600/60 dark:text-azure-200/50 text-sm">
        <p>
          {t.footer.rights.replace(
            "{year}",
            new Date().getFullYear().toString()
          )}
        </p>
      </footer>
    </main>
  );
}
