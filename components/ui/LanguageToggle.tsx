"use client";

import { Globe } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function LanguageToggle() {
  const [mounted, setMounted] = useState(false);
  const { locale, setLocale } = useI18n();

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
      onClick={() => setLocale(locale === "es" ? "en" : "es")}
      className="relative w-12 h-12 rounded-full glass-panel flex items-center justify-center group overflow-hidden"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle language"
      title={locale === "es" ? "Switch to English" : "Cambiar a Español"}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background:
            "radial-gradient(circle, rgba(14,165,233,0.3) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center">
        <Globe className="w-4 h-4 text-azure-300 dark:text-azure-400 group-hover:text-azure-500 transition-colors mb-0.5" />
        <AnimatePresence mode="wait">
          <motion.span
            key={locale}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-[10px] font-bold text-azure-600 dark:text-azure-300 uppercase"
          >
            {locale}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.button>
  );
}
