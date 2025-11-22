"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Cloud, Home, Layers } from "lucide-react";

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Blueprints", path: "/cloud-blueprints", icon: Layers },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-6 inset-x-0 max-w-2xl mx-auto z-50 px-4"
    >
      <div className="glass-panel rounded-full px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-azure-400">
          <Cloud className="w-6 h-6 text-azure-500" />
          <span>Maestro.Cloud</span>
        </Link>
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "relative px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  isActive ? "text-white" : "text-azure-200 hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-azure-600 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.name}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
