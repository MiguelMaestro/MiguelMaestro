#!/bin/bash
echo "🔍 GitHub Portfolio - Diagnóstico de Deployment"
echo "================================================"
echo ""

echo "📦 Estructura de directorios críticos:"
ls -la components/sections/ 2>/dev/null | grep -E "(AboutMe|ExperienceTimeline|Testimonials|ProjectsShowcase)" || echo "❌ Faltan componentes"
ls -la components/ui/ 2>/dev/null | grep "CVDownloadButton" || echo "❌ Falta CVDownloadButton"
ls -la lib/ 2>/dev/null | grep "types.ts" || echo "❌ Falta types.ts"
echo ""

echo "🌐 Archivos de i18n:"
[ -f "locales/es.json" ] && echo "✅ es.json existe" || echo "❌ es.json no existe"
[ -f "locales/en.json" ] && echo "✅ en.json existe" || echo "❌ en.json no existe"
echo ""

echo "📋 Validación de JSON:"
cat locales/es.json | python3 -m json.tool > /dev/null 2>&1 && echo "✅ es.json válido" || echo "❌ es.json tiene errores de sintaxis"
cat locales/en.json | python3 -m json.tool > /dev/null 2>&1 && echo "✅ en.json válido" || echo "❌ en.json tiene errores de sintaxis"
echo ""

echo "⚙️ Configuración:"
[ -f "next.config.ts" ] && echo "✅ next.config.ts existe" || echo "❌ next.config.ts no existe"
[ -f "package.json" ] && echo "✅ package.json existe" || echo "❌ package.json no existe"
[ -f ".github/workflows/deploy.yml" ] && echo "✅ workflow de deploy existe" || echo "❌ workflow no existe"
echo ""

echo "📊 Git Status:"
git status --short
echo ""

echo "📝 Últimos 5 commits:"
git log --oneline -5
echo ""

echo "🔍 Verificando imports críticos en componentes:"
echo "ExperienceTimeline.tsx:"
grep -n "import.*Experience.*from.*@/lib/types" components/sections/ExperienceTimeline.tsx 2>/dev/null && echo "✅ Import correcto" || echo "❌ Import de Experience falta o incorrecto"

echo "AboutMe.tsx:"
grep -n "import.*CVDownloadButton" components/sections/AboutMe.tsx 2>/dev/null && echo "✅ Import correcto" || echo "❌ Import de CVDownloadButton falta o incorrecto"

echo "ProjectsShowcase.tsx:"
grep -n "import.*Project.*from.*@/lib/types" components/sections/ProjectsShowcase.tsx 2>/dev/null && echo "✅ Import correcto" || echo "❌ Import de Project falta o incorrecto"

echo "Testimonials.tsx:"
grep -n "import.*Testimonial.*from.*@/lib/types" components/sections/Testimonials.tsx 2>/dev/null && echo "✅ Import correcto" || echo "❌ Import de Testimonial falta o incorrecto"
echo ""

echo "🔗 Enlaces importantes:"
echo "• GitHub Actions: https://github.com/MiguelMaestro/MiguelMaestro.github.io/actions"
echo "• GitHub Pages Settings: https://github.com/MiguelMaestro/MiguelMaestro.github.io/settings/pages"
echo "• Repositorio: https://github.com/MiguelMaestro/MiguelMaestro.github.io"
echo ""

echo "✨ Diagnóstico completado"
echo "================================================"
echo ""
echo "💡 Siguiente paso: Revisa los logs de GitHub Actions para ver el error específico"
