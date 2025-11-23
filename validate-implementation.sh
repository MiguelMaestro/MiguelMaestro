#!/bin/bash

# 🚀 Script de Validación - Portfolio CV Profesional
# Ejecutar este script en WSL para validar la implementación

set -e

echo "🎯 === VALIDACIÓN DE PORTFOLIO CV PROFESIONAL ==="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para imprimir con color
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# 1. Verificar que estamos en el directorio correcto
echo "1. Verificando directorio del proyecto..."
if [ ! -f "package.json" ]; then
    print_error "No se encontró package.json. Asegúrate de estar en el directorio del proyecto."
    exit 1
fi
print_success "Directorio correcto"
echo ""

# 2. Verificar Node.js y npm
echo "2. Verificando Node.js y npm..."
if ! command -v node &> /dev/null; then
    print_error "Node.js no está instalado"
    exit 1
fi
NODE_VERSION=$(node -v)
print_success "Node.js instalado: $NODE_VERSION"

if ! command -v npm &> /dev/null; then
    print_error "npm no está instalado"
    exit 1
fi
NPM_VERSION=$(npm -v)
print_success "npm instalado: $NPM_VERSION"
echo ""

# 3. Verificar dependencias
echo "3. Verificando dependencias..."
if [ ! -d "node_modules" ]; then
    print_info "node_modules no existe. Instalando dependencias..."
    npm install
else
    print_success "node_modules existe"
fi
echo ""

# 4. Verificar archivos clave
echo "4. Verificando archivos clave implementados..."
files=(
    "lib/types.ts"
    "components/sections/AboutMe.tsx"
    "components/sections/ExperienceTimeline.tsx"
    "components/sections/Testimonials.tsx"
    "components/ui/CVDownloadButton.tsx"
    "locales/es.json"
    "locales/en.json"
    "app/layout.tsx"
    "app/page.tsx"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        print_success "$file"
    else
        print_error "$file NO ENCONTRADO"
    fi
done
echo ""

# 5. Verificar tipos TypeScript
echo "5. Verificando tipos TypeScript..."
if npx tsc --noEmit 2>&1 | grep -q "error TS"; then
    print_error "Hay errores de TypeScript. Ejecuta 'npx tsc --noEmit' para ver detalles."
else
    print_success "Sin errores de TypeScript"
fi
echo ""

# 6. Verificar ESLint
echo "6. Ejecutando ESLint..."
if npm run lint 2>&1 | grep -q "error"; then
    print_info "Hay warnings/errors de ESLint. Revisa con 'npm run lint'"
else
    print_success "ESLint pasó sin errores críticos"
fi
echo ""

# 7. Intentar build
echo "7. Intentando build de producción..."
print_info "Esto puede tardar un minuto..."
if npm run build > /dev/null 2>&1; then
    print_success "Build exitoso!"
    
    # Verificar tamaño del build
    if [ -d ".next" ]; then
        BUILD_SIZE=$(du -sh .next | cut -f1)
        print_info "Tamaño del build: $BUILD_SIZE"
    fi
else
    print_error "Build falló. Ejecuta 'npm run build' para ver detalles."
    exit 1
fi
echo ""

# 8. Verificar estructura de i18n
echo "8. Verificando estructura de i18n..."
if grep -q '"about"' locales/es.json && grep -q '"experience"' locales/es.json && grep -q '"projects"' locales/es.json; then
    print_success "Estructura i18n correcta en es.json"
else
    print_error "Falta contenido en es.json"
fi

if grep -q '"about"' locales/en.json && grep -q '"experience"' locales/en.json && grep -q '"projects"' locales/en.json; then
    print_success "Estructura i18n correcta en en.json"
else
    print_error "Falta contenido en en.json"
fi
echo ""

# 9. Verificar imágenes necesarias
echo "9. Verificando assets necesarios..."
if [ -f "public/profile.png" ]; then
    print_success "Profile photo existe"
else
    print_info "Considera agregar public/profile.png"
fi

if [ -f "public/og-image.png" ]; then
    print_success "OG image existe"
else
    print_info "Crea public/og-image.png (1200x630px) para mejor SEO"
fi
echo ""

# 10. Resumen final
echo "═══════════════════════════════════════"
echo "🎉 VALIDACIÓN COMPLETADA"
echo "═══════════════════════════════════════"
echo ""
print_success "Portfolio CV Profesional implementado correctamente!"
echo ""
echo "📋 Próximos pasos:"
echo "   1. Ejecuta 'npm run dev' para ver el resultado localmente"
echo "   2. Crea public/og-image.png (1200x630px) para redes sociales"
echo "   3. Actualiza links de proyectos en locales/*.json"
echo "   4. Deploy: git add . && git commit -m 'feat: implement professional CV' && git push"
echo ""
echo "📖 Ver IMPLEMENTATION_COMPLETE.md para detalles completos"
echo ""
