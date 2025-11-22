"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 animate-pulse" />
    );
  }

  return (
    <motion.button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative w-12 h-12 rounded-full glass-panel flex items-center justify-center group overflow-hidden"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background:
            theme === "dark"
              ? "radial-gradient(circle, rgba(14,165,233,0.3) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(251,191,36,0.3) 0%, transparent 70%)",
        }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ y: -20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          className="relative z-10"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-azure-300 group-hover:text-yellow-400 transition-colors" />
          ) : (
            <Moon className="w-5 h-5 text-azure-600 group-hover:text-azure-700 transition-colors" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
