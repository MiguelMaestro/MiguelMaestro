"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

/**
 * CVDownloadButton Component
 *
 * Button to generate and download CV as PDF with:
 * - Progress animation
 * - Loading state
 * - Multiple export options (future: PDF generation with jsPDF)
 *
 * Note: For MVP, this provides a simple download link.
 * TODO: Implement full PDF generation with jsPDF + html2canvas
 */
export default function CVDownloadButton() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDownload = async () => {
    setIsGenerating(true);
    setProgress(0);

    // Simulate PDF generation progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    // Simulate generation delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // For MVP: Open LinkedIn or trigger download of pre-made PDF
    // TODO: Generate dynamic PDF from page content
    const cvUrl = "/Miguel_Maestro_CV.pdf"; // Place PDF in /public folder

    try {
      // Check if PDF exists, otherwise fallback to LinkedIn
      const response = await fetch(cvUrl, { method: "HEAD" });
      if (response.ok) {
        const link = document.createElement("a");
        link.href = cvUrl;
        link.download = "Miguel_Maestro_CV.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Fallback: open LinkedIn profile
        window.open("https://www.linkedin.com/in/miguel-maestro", "_blank");
      }
    } catch (error) {
      // Fallback
      window.open("https://www.linkedin.com/in/miguel-maestro", "_blank");
    }

    setIsGenerating(false);
    setProgress(0);
  };

  return (
    <motion.button
      onClick={handleDownload}
      disabled={isGenerating}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative px-6 py-3 rounded-full bg-gradient-to-r from-azure-500 to-accent text-white font-semibold shadow-lg shadow-azure-500/50 hover:shadow-xl hover:shadow-accent/50 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
    >
      {/* Progress Bar */}
      {isGenerating && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="absolute inset-0 bg-white/20"
        />
      )}

      {/* Button Content */}
      <span className="relative z-10 flex items-center gap-2">
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Generando... {progress}%</span>
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            <span>Descargar CV</span>
          </>
        )}
      </span>
    </motion.button>
  );
}
