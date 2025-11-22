#!/bin/bash

# 🚀 Quick Commands - Neural Portfolio
# ====================================

echo "🎨 Neural Portfolio - Quick Commands"
echo "====================================="
echo ""

# Variables de colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para mostrar comandos
show_command() {
    echo -e "${BLUE}$1${NC}"
    echo -e "${GREEN}  → $2${NC}"
    echo ""
}

# Menú
echo "Selecciona una opción:"
echo ""
echo "1) Desarrollo (npm run dev)"
echo "2) Build para producción (npm run build)"
echo "3) Servir build localmente (npx serve out)"
echo "4) Limpiar cache y reinstalar"
echo "5) Verificar errores TypeScript"
echo "6) Ver todos los comandos disponibles"
echo "7) Mover proyecto a Windows path (fix WSL)"
echo "0) Salir"
echo ""

read -p "Opción: " option

case $option in
    1)
        echo -e "${YELLOW}🚀 Iniciando servidor de desarrollo...${NC}"
        npm run dev
        ;;
    2)
        echo -e "${YELLOW}🏗️  Creando build de producción...${NC}"
        npm run build
        ;;
    3)
        echo -e "${YELLOW}🌐 Sirviendo build localmente...${NC}"
        npx serve out -p 3000
        ;;
    4)
        echo -e "${YELLOW}🧹 Limpiando cache...${NC}"
        rm -rf node_modules .next out package-lock.json
        echo -e "${YELLOW}📦 Reinstalando dependencias...${NC}"
        npm install
        echo -e "${GREEN}✅ Completado!${NC}"
        ;;
    5)
        echo -e "${YELLOW}🔍 Verificando TypeScript...${NC}"
        npx tsc --noEmit
        echo -e "${GREEN}✅ Verificación completada!${NC}"
        ;;
    6)
        echo ""
        show_command "Desarrollo:" "npm run dev"
        show_command "Build:" "npm run build"
        show_command "Start producción:" "npm start"
        show_command "Lint:" "npm run lint"
        show_command "Servir build:" "npx serve out"
        show_command "TypeScript check:" "npx tsc --noEmit"
        show_command "Limpiar todo:" "rm -rf node_modules .next out"
        ;;
    7)
        echo -e "${YELLOW}📁 Moviendo proyecto a Windows path...${NC}"
        mkdir -p /mnt/c/Users/migue/Projects
        cp -r /home/miguelmaestro/VibeCoding/github_portfolio /mnt/c/Users/migue/Projects/
        echo -e "${GREEN}✅ Proyecto copiado a: /mnt/c/Users/migue/Projects/github_portfolio${NC}"
        echo ""
        echo "Ahora ejecuta:"
        echo "  cd /mnt/c/Users/migue/Projects/github_portfolio"
        echo "  npm install"
        echo "  npm run dev"
        ;;
    0)
        echo -e "${GREEN}👋 ¡Hasta luego!${NC}"
        exit 0
        ;;
    *)
        echo -e "${YELLOW}⚠️  Opción no válida${NC}"
        exit 1
        ;;
esac
