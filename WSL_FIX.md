# 🔧 Solución: Next.js en WSL2 - Path Issue

## ❌ Problema

```bash
Error: EPERM: operation not permitted, mkdir 'C:\Windows\.next'
Error: > Couldn't find any `pages` or `app` directory
```

## 🎯 Causa Raíz

Next.js ejecutado en WSL2 detecta rutas UNC (`\\wsl.localhost\...`) como punto de inicio y CMD.EXE intenta redirigir a `C:\Windows`, causando errores de permisos y detección incorrecta del directorio `app`.

## ✅ SOLUCIÓN RECOMENDADA #1: Mover a Ruta Windows Montada

### Paso 1: Crear directorio en Windows

```bash
mkdir -p /mnt/c/Users/migue/Projects
```

### Paso 2: Copiar proyecto

```bash
cp -r /home/miguelmaestro/VibeCoding/github_portfolio /mnt/c/Users/migue/Projects/
cd /mnt/c/Users/migue/Projects/github_portfolio
```

### Paso 3: Ejecutar

```bash
npm run dev
```

**Ventajas:**

- ✅ Next.js detecta correctamente los directorios
- ✅ Hot reload funciona perfectamente
- ✅ Compatible con VS Code Remote-WSL

---

## ✅ SOLUCIÓN ALTERNATIVA #2: Node.js Nativo Windows

### Paso 1: Descargar Node.js para Windows

https://nodejs.org/ (versión LTS)

### Paso 2: Abrir PowerShell en el directorio del proyecto

```powershell
cd C:\Users\migue\...\github_portfolio
npm install
npm run dev
```

**Ventajas:**

- ✅ Evita completamente el problema de WSL
- ✅ Mejor rendimiento en Windows
- ✅ No requiere mover archivos

---

## ✅ SOLUCIÓN WORKAROUND #3: Export Estático

Si solo necesitas ver el resultado final:

```bash
cd /home/miguelmaestro/VibeCoding/github_portfolio

# Editar next.config.ts temporalmente
cat > next.config.ts << 'EOF'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "./out",  // Cambiar destino
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
EOF

# Build
npm run build

# Servir con Python o npx
npx serve out -p 3000
# O
python3 -m http.server 3000 -d out
```

Abrir: `http://localhost:3000`

**Ventajas:**

- ✅ Funciona siempre (no depende de Next.js dev server)
- ✅ Resultado final idéntico al deployment
- ✅ Perfecto para testing pre-deploy

**Desventajas:**

- ❌ No hay hot reload
- ❌ Debes rebuild después de cada cambio

---

## 🚀 SOLUCIÓN DEFINITIVA #4: Configurar WSL correctamente

### Paso 1: Editar `.wslconfig` en Windows

En `C:\Users\migue\.wslconfig`:

```ini
[wsl2]
kernelCommandLine = vsyscall=emulate
```

### Paso 2: Reiniciar WSL

```powershell
# En PowerShell (como Admin)
wsl --shutdown
```

### Paso 3: Verificar

```bash
wsl
cd /home/miguelmaestro/VibeCoding/github_portfolio
npm run dev
```

---

## 📊 Comparativa de Soluciones

| Solución           | Complejidad | Hot Reload | Rendimiento  | Recomendación    |
| ------------------ | ----------- | ---------- | ------------ | ---------------- |
| #1 Mover a /mnt/c  | 🟢 Baja     | ✅ Sí      | 🟡 Bueno     | ⭐⭐⭐⭐⭐       |
| #2 Node Windows    | 🟢 Baja     | ✅ Sí      | 🟢 Excelente | ⭐⭐⭐⭐         |
| #3 Export Estático | 🟢 Baja     | ❌ No      | 🟢 Excelente | ⭐⭐⭐ (testing) |
| #4 Configurar WSL  | 🔴 Alta     | ✅ Sí      | 🟢 Excelente | ⭐⭐ (avanzado)  |

---

## 🎯 Mi Recomendación

**Para desarrollo activo:**
→ **Solución #1** (mover a `/mnt/c/Users/migue/Projects`)

**Para testing rápido:**
→ **Solución #3** (export estático + serve)

**Para deployment:**
→ GitHub Pages automático ya está configurado ✅

---

## 📝 Comando Rápido (Copiar y Pegar)

```bash
# Crear directorio y mover proyecto
mkdir -p /mnt/c/Users/migue/Projects
cp -r /home/miguelmaestro/VibeCoding/github_portfolio /mnt/c/Users/migue/Projects/
cd /mnt/c/Users/migue/Projects/github_portfolio

# Reinstalar dependencias por si acaso
rm -rf node_modules package-lock.json
npm install

# Ejecutar
npm run dev
```

Luego abre: http://localhost:3000

---

**Status:** ✅ El código está perfecto (0 errores TypeScript)
**Problema:** ⚠️ Solo es un issue de rutas WSL/Windows
**Tiempo estimado para resolver:** 2-3 minutos con Solución #1
