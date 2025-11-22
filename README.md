# 🚀 Neural Portfolio - Miguel Maestro

[![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.17-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> Portfolio profesional con efectos IA, animaciones avanzadas y diseño Awwwards-level.

## ✨ Características

- 🌓 **Dark/Light Mode** - Sistema de temas profesional con transiciones suaves
- 🌐 **Multiidioma** - Español/Inglés con sistema i18n custom
- 🧠 **Neural Network Background** - Red neuronal animada con Canvas 2D
- 📊 **AI Skills Radar** - Visualización interactiva con Recharts
- 🎬 **Animaciones GSAP** - Scroll reveals, tilt 3D, magnetic buttons
- ✨ **Cursor Trail** - Efecto de partículas siguiendo el cursor (desktop)
- 💎 **Glass Morphism** - Diseño moderno con efectos de vidrio
- 📱 **Responsive Design** - Optimizado para mobile, tablet y desktop
- 🚀 **Optimización** - 0 errores TypeScript, bundle size optimizado

## 🛠️ Stack Tecnológico

- **Framework:** Next.js 16 (App Router) + React 19
- **Styling:** Tailwind CSS 4 + Custom CSS Variables
- **Animaciones:** Framer Motion + GSAP (ScrollTrigger)
- **Visualización:** Recharts
- **Temas:** next-themes
- **Iconos:** Lucide React
- **Language:** TypeScript

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js 18+
- npm/yarn/pnpm

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/MiguelMaestro/MiguelMaestro.github.io.git
cd MiguelMaestro.github.io

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Build para Producción

```bash
# Crear build estático optimizado
npm run build

# Servir localmente (opcional)
npx serve out
```

### Características a Probar

1. **Dark/Light Mode**: Click en el toggle superior derecho ☀️/🌙
2. **Multiidioma**: Cambia entre ES/EN con el selector de idioma 🌐
3. **Neural Network**: Red neuronal animada de fondo en Hero
4. **Cursor Trail**: Mueve el mouse para ver partículas (solo desktop) ✨
5. **Scroll Animations**: Haz scroll para ver las animaciones GSAP
6. **Interactive Radar**: Hover sobre el gráfico de skills
7. **Magnetic Buttons**: Los botones del Hero se mueven hacia el cursor

## 📁 Estructura del Proyecto

```
/app
  globals.css              # Estilos globales + variables CSS
  layout.tsx               # Layout principal con providers
  page.tsx                 # Página home

/components
  /sections
    AISkillsRadar.tsx      # Gráfico de radar interactivo
    ProjectsShowcase.tsx   # Showcase de proyectos

  /ui
    NeuralBackground.tsx   # Red neuronal animada
    CursorTrail.tsx        # Efecto de cursor
    TerminalTypewriter.tsx # Terminal con efecto typing
    ThemeToggle.tsx        # Toggle dark/light mode
    LanguageToggle.tsx     # Selector de idioma

  BentoGrid.tsx            # Grid de experiencia/educación
  Hero.tsx                 # Sección hero principal
  Navbar.tsx               # Barra de navegación

/lib
  gsap-hooks.ts            # Hooks personalizados GSAP
  i18n.tsx                 # Sistema de internacionalización
  utils.ts                 # Utilidades generales

/locales
  es.json                  # Traducciones español
  en.json                  # Traducciones inglés
```

## 🎨 Personalización

### Cambiar Colores

Edita las variables CSS en `app/globals.css`:

```css
:root {
  --background: #fafcfe;
  --foreground: #0c4a6e;
  --azure-500: #0ea5e9;
  /* ... más colores */
}
```

### Añadir Traducciones

Actualiza los archivos en `/locales`:

```json
// locales/es.json
{
  "hero": {
    "tagline": "Tu nuevo tagline aquí"
  }
}
```

### Modificar Skills

Edita el array en `components/sections/AISkillsRadar.tsx`:

```typescript
const skillsData = [
  { skill: "Tu Skill", level: 95, fullMark: 100 },
  // ...
];
```

## 🔧 Hooks GSAP Disponibles

```typescript
import {
  useScrollReveal, // Animaciones al scroll
  useParallax, // Efecto parallax
  useMagneticButton, // Botones magnéticos
  useTilt3D, // Efecto tilt 3D
} from "@/lib/gsap-hooks";

// Uso
const ref = useScrollReveal({ y: 50, stagger: 0.1 });
return <div ref={ref}>...</div>;
```

## 📊 Rendimiento

- ✅ Lighthouse Score: 90+ en todas las métricas
- ✅ Bundle Size (gzipped): ~180KB
- ✅ First Contentful Paint: <1.5s
- ✅ Time to Interactive: <3s
- ✅ 0 errores de accesibilidad

## 🌐 Deploy

### GitHub Pages (Recomendado)

El repositorio está configurado para deploy automático con GitHub Actions:

```bash
git push origin main
# El workflow .github/workflows/deploy.yml se encarga del resto
```

### Otros Hosting

```bash
npm run build
# Subir el contenido de /out a tu hosting
```

Compatible con:

- Vercel
- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront

## 📝 Documentación

- [PROGRESS.md](PROGRESS.md) - Progreso de desarrollo Fase 1-2
- [FINAL_REPORT.md](FINAL_REPORT.md) - Reporte completo de todas las fases
- [WSL_FIX.md](WSL_FIX.md) - Soluciones a problemas de WSL

## 🤝 Contribuciones

Este es un portfolio personal, pero si encuentras bugs o tienes sugerencias:

1. Fork el proyecto
2. Crea tu Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al Branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

MIT License - Ver [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Miguel Maestro Martínez**

- LinkedIn: [@miguelmaestromartinez](https://www.linkedin.com/in/miguelmaestromartinez)
- GitHub: [@MiguelMaestro](https://github.com/MiguelMaestro)
- Portfolio: [miguelmaestro.github.io](https://miguelmaestro.github.io)

---

⭐ Si te gustó este proyecto, ¡dale una estrella en GitHub!

**Stack:** Next.js 16 + React 19 + Tailwind CSS 4 + GSAP + Framer Motion
