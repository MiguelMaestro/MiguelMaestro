"use client";

import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { X, Server, ShieldCheck, Activity } from "lucide-react";

const blueprints = [
  {
    id: 1,
    title: "High Availability Architecture",
    subtitle: "Multi-region Azure deployment with Traffic Manager",
    icon: Server,
    color: "bg-blue-500",
    content: (
      <div className="space-y-4">
        <p>
          Designed for 99.99% uptime using Azure Traffic Manager to route traffic between primary and secondary regions.
        </p>
        <ul className="list-disc list-inside space-y-2 text-azure-100/80">
          <li>Active-Passive failover configuration</li>
          <li>Azure SQL Geo-Replication for data redundancy</li>
          <li>Azure Front Door for global load balancing</li>
        </ul>
        <div className="mt-4 p-4 bg-black/30 rounded-lg border border-white/10 font-mono text-xs">
          <div className="text-green-400">Traffic Manager Status: Online</div>
          <div className="text-blue-400">Region: West Europe (Primary)</div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: "Kubernetes Autoscaling",
    subtitle: "AKS Cluster with HPA and Cluster Autoscaler",
    icon: Activity,
    color: "bg-purple-500",
    content: (
      <div className="space-y-4">
        <p>
          Dynamic scaling solution using Azure Kubernetes Service (AKS) to handle burst workloads efficiently.
        </p>
        <ul className="list-disc list-inside space-y-2 text-azure-100/80">
          <li>Horizontal Pod Autoscaler (HPA) based on CPU/Memory</li>
          <li>Cluster Autoscaler for node pool management</li>
          <li>Spot Instances for cost optimization</li>
        </ul>
      </div>
    ),
  },
  {
    id: 3,
    title: "Disaster Recovery Plan",
    subtitle: "RTO < 15min, RPO < 5min Strategy",
    icon: ShieldCheck,
    color: "bg-emerald-500",
    content: (
      <div className="space-y-4">
        <p>
          Comprehensive DR strategy leveraging Azure Site Recovery (ASR) for seamless business continuity.
        </p>
        <ul className="list-disc list-inside space-y-2 text-azure-100/80">
          <li>Automated failover testing scripts</li>
          <li>Cross-region backups with GRS</li>
          <li>Regular drill simulations</li>
        </ul>
      </div>
    ),
  },
];

export default function CloudBlueprints() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-background selection:bg-azure-500/30 pb-20">
      <Navbar />
      
      <div className="pt-32 px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Cloud <span className="text-gradient">Blueprints</span></h1>
          <p className="text-azure-200/70 max-w-2xl mx-auto">
            Interactive gallery of architectural patterns and cloud solutions.
            Click on a blueprint to explore the technical details.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blueprints.map((item) => (
            <motion.div
              layoutId={`card-${item.id}`}
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className="glass-panel p-6 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors group relative overflow-hidden"
            >
              <div className={cn("absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110")} />
              
              <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-white shadow-lg", item.color)}>
                <item.icon className="w-6 h-6" />
              </div>
              <motion.h3 className="text-xl font-bold mb-2">{item.title}</motion.h3>
              <motion.p className="text-sm text-azure-100/70">{item.subtitle}</motion.p>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedId && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              />
              <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4">
                {blueprints.map((item) => {
                  if (item.id !== selectedId) return null;
                  return (
                    <motion.div
                      layoutId={`card-${item.id}`}
                      key={item.id}
                      className="bg-[#0c4a6e] w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border border-white/10 pointer-events-auto relative"
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedId(null);
                        }}
                        className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors text-white z-10"
                      >
                        <X className="w-5 h-5" />
                      </button>
                      
                      <div className="p-8">
                        <div className={cn("w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-white shadow-lg", item.color)}>
                          <item.icon className="w-8 h-8" />
                        </div>
                        <motion.h3 className="text-3xl font-bold mb-2">{item.title}</motion.h3>
                        <motion.p className="text-lg text-azure-200 mb-6">{item.subtitle}</motion.p>
                        
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="prose prose-invert max-w-none"
                        >
                          {item.content}
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
