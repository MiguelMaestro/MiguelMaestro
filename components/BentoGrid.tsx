"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Server, Container, Globe, Shield, Database, Code } from "lucide-react";

const items = [
  {
    title: "Azure Expert",
    description: "Deep expertise in Azure services, from VM scale sets to AKS and Azure Functions.",
    icon: CloudIcon,
    className: "md:col-span-2",
    color: "bg-blue-500/10 text-blue-400",
  },
  {
    title: "Infrastructure as Code",
    description: "Terraform & Bicep master. Automating everything.",
    icon: Code,
    className: "md:col-span-1",
    color: "bg-purple-500/10 text-purple-400",
  },
  {
    title: "Containerization",
    description: "Docker & Kubernetes (AKS) orchestration at scale.",
    icon: Container,
    className: "md:col-span-1",
    color: "bg-cyan-500/10 text-cyan-400",
  },
  {
    title: "Security First",
    description: "Implementing DevSecOps and Azure Sentinel policies.",
    icon: Shield,
    className: "md:col-span-2",
    color: "bg-emerald-500/10 text-emerald-400",
  },
];

function CloudIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M17.5 19c0-1.7-1.3-3-3-3h-11c-1.7 0-3 1.3-3 3v1c0 1.7 1.3 3 3 3h14c1.7 0 3-1.3 3-3v-1Z" />
            <path d="M12.9 16a5.6 5.6 0 0 1-1.4-5.4 5.6 5.6 0 0 1 5.4-1.4 5.6 5.6 0 0 1 1.4 5.4" />
            <path d="M17.5 19h.5c1.7 0 3-1.3 3-3v-3.5a3.5 3.5 0 0 0-3.5-3.5c-1 0-1.9.4-2.6 1" />
        </svg>
    )
}


export default function BentoGrid() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold mb-10 text-center">Technical Arsenal</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className={cn(
              "glass-panel p-6 rounded-2xl hover:bg-white/10 transition-colors group cursor-default",
              item.className
            )}
          >
            <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-4", item.color)}>
              <item.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-azure-300 transition-colors">
              {item.title}
            </h3>
            <p className="text-azure-100/70 text-sm leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
