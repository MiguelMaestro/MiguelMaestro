"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalTypewriterProps {
  commands: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export function TerminalTypewriter({
  commands,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
}: TerminalTypewriterProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const command = commands[currentIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (currentText.length < command.length) {
            setCurrentText(command.substring(0, currentText.length + 1));
          } else {
            // Pause before deleting
            setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        } else {
          // Deleting
          if (currentText.length > 0) {
            setCurrentText(command.substring(0, currentText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentIndex((prev) => (prev + 1) % commands.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [
    currentText,
    isDeleting,
    currentIndex,
    commands,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="font-mono text-lg md:text-xl flex items-center gap-1">
      <span className="text-emerald-500 dark:text-emerald-400">&gt;</span>
      <span className="text-azure-800 dark:text-azure-200 min-w-0">
        {currentText}
      </span>
      <AnimatePresence mode="wait">
        {showCursor && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="inline-block w-2 h-5 bg-azure-600 dark:bg-azure-neon ml-0.5"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
