"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface Trail {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const trailsRef = useRef<Trail[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Only enable on desktop (fine pointer = mouse)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) {
      canvas.style.display = "none";
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Track mouse
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Add new trail particle
      if (Math.random() > 0.7) {
        // 30% chance per frame
        trailsRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          life: 1,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      // Fade out instead of clearing
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const isDark = theme === "dark" || theme === "system";

      // Update and draw trails
      trailsRef.current = trailsRef.current.filter((trail) => {
        trail.x += trail.vx;
        trail.y += trail.vy;
        trail.life -= 0.02;

        if (trail.life <= 0) return false;

        // Draw trail particle
        const size = 3 * trail.life;
        const alpha = trail.life * 0.6;

        ctx.fillStyle = isDark
          ? `rgba(0, 224, 255, ${alpha})` // azure-neon
          : `rgba(14, 165, 233, ${alpha})`; // azure-500

        ctx.beginPath();
        ctx.arc(trail.x, trail.y, size, 0, Math.PI * 2);
        ctx.fill();

        // Add glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = isDark ? "#00e0ff" : "#0ea5e9";

        return true;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 mix-blend-screen"
      style={{ opacity: 0.4 }}
    />
  );
}
