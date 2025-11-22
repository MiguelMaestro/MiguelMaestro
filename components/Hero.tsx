"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const roles = ["Cloud Engineer", "Azure Expert", "DevOps Enthusiast"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentRole.substring(0, text.length + 1));
        if (text === currentRole) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setText(currentRole.substring(0, text.length - 1));
        if (text === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 150);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 pt-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-azure-500/20 rounded-full blur-[100px] -z-10 animate-pulse-slow" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Miguel <span className="text-gradient">Maestro</span>
        </h1>
        <div className="h-8 md:h-12 mb-8">
          <span className="text-xl md:text-3xl text-azure-200 font-mono">
            &gt; {text}
            <span className="animate-pulse">_</span>
          </span>
        </div>
        <p className="max-w-2xl mx-auto text-azure-100/80 text-lg md:text-xl leading-relaxed">
          Architecting scalable cloud solutions and automating infrastructure with precision.
          Turning complex requirements into elegant, high-availability systems on Azure.
        </p>
      </motion.div>
    </section>
  );
}
