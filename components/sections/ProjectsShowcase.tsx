"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { ExternalLink, Github } from "lucide-react";
import { useTilt3D } from "@/lib/gsap-hooks";

interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  icon: string;
}

export default function ProjectsShowcase() {
  const { locale } = useI18n();

  const projects: Project[] = [
    {
      title: "Azure Cloud Architect",
      description:
        locale === "es"
          ? "Diseño e implementación de infraestructura cloud enterprise con +500 servicios en producción. Reducción del 35% en costos operacionales."
          : "Enterprise cloud infrastructure design and implementation with +500 services in production. 35% reduction in operational costs.",
      tags: ["Azure", "Terraform", "DevOps", "Cost Optimization"],
      icon: "☁️",
    },
    {
      title: "CI/CD Pipeline Automation",
      description:
        locale === "es"
          ? "Automatización completa de pipelines con Azure DevOps. Deploy time reducido de 4h a 15min. Integración con testing automatizado."
          : "Complete pipeline automation with Azure DevOps. Deploy time reduced from 4h to 15min. Integration with automated testing.",
      tags: ["Azure DevOps", "YAML", "Docker", "Kubernetes"],
      icon: "🚀",
    },
    {
      title: "Hybrid Cloud Migration",
      description:
        locale === "es"
          ? "Migración de workloads on-premise a arquitectura híbrida. Zero downtime durante la transición. Mejora del 60% en disponibilidad."
          : "On-premise to hybrid cloud workload migration. Zero downtime during transition. 60% improvement in availability.",
      tags: ["Azure Arc", "VPN", "ExpressRoute", "Backup"],
      icon: "🔄",
    },
    {
      title: "AI-Powered Monitoring",
      description:
        locale === "es"
          ? "Sistema de monitorización inteligente con Azure Monitor y Log Analytics. Detección predictiva de incidencias con ML."
          : "Intelligent monitoring system with Azure Monitor and Log Analytics. Predictive incident detection with ML.",
      tags: ["Azure Monitor", "KQL", "AI/ML", "Alerts"],
      icon: "🤖",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-20" id="projects">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-azure-900 dark:text-white">
          {locale === "es" ? "Proyectos Destacados" : "Featured Projects"}
        </h2>
        <p className="text-azure-700 dark:text-azure-200 max-w-2xl mx-auto">
          {locale === "es"
            ? "Soluciones cloud que transforman negocios"
            : "Cloud solutions that transform businesses"}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, idx) => (
          <ProjectCard key={idx} project={project} index={idx} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const tiltRef = useTilt3D();

  return (
    <motion.div
      ref={tiltRef as any}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      className="group relative glass-panel rounded-2xl p-6 hover:border-azure-500/50 dark:hover:border-azure-neon/50 transition-all duration-300"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-azure-500/0 to-purple-500/0 group-hover:from-azure-500/10 group-hover:to-purple-500/10 transition-all duration-500 -z-10" />

      {/* Icon */}
      <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
        {project.icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold mb-3 text-azure-900 dark:text-white group-hover:text-azure-600 dark:group-hover:text-azure-300 transition-colors">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-azure-700/80 dark:text-azure-200/70 mb-4 leading-relaxed">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag, tagIdx) => (
          <span
            key={tagIdx}
            className="px-3 py-1 rounded-full text-xs font-medium bg-azure-100/50 dark:bg-azure-900/30 text-azure-700 dark:text-azure-300 border border-azure-300/30 dark:border-azure-500/30"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      {(project.link || project.github) && (
        <div className="flex gap-3 pt-3 border-t border-azure-200/30 dark:border-white/10">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-azure-600 dark:text-azure-400 hover:text-azure-700 dark:hover:text-azure-300 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Demo</span>
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-azure-600 dark:text-azure-400 hover:text-azure-700 dark:hover:text-azure-300 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Code</span>
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}
