import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";

export default function Home() {
  return (
    <main className="relative min-h-screen selection:bg-azure-500/30">
      <Navbar />
      <Hero />
      <BentoGrid />
      
      {/* Footer */}
      <footer className="py-10 text-center text-azure-200/50 text-sm">
        <p>© {new Date().getFullYear()} Miguel Maestro Martínez. Built with Next.js & Tailwind.</p>
      </footer>
    </main>
  );
}
