# 🔧 Deployment Troubleshooting Guide

## Estado Actual

**Fecha**: 23 de noviembre de 2025
**Commits recientes**:

- `3b7b0db` - docs: add post-deploy verification guide
- `fa4beb0` - feat: transform portfolio into professional CV
- `a2bcfc4` - feat: major performance + SEO + accessibility improvements v2.0

## 🔍 Paso 1: Verificar GitHub Actions

### Ver logs del deployment

1. **Accede a GitHub Actions**:

   ```
   https://github.com/MiguelMaestro/MiguelMaestro.github.io/actions
   ```

2. **Busca el workflow "Deploy to GitHub Pages"** con los últimos commits

3. **Revisa los logs** específicamente en:
   - ✅ Build step: `npm ci` y `npm run build`
   - ✅ Upload artifact step
   - ✅ Deploy step

### Errores Comunes a Buscar

#### ❌ Error: Build Failed

**Síntoma**: El job "build" falla en `npm run build`

**Posibles causas**:

```bash
# 1. Dependencias incompatibles
Error: Cannot find module 'X'
Solución: Verificar package.json

# 2. TypeScript errors
Type error: Property 'X' does not exist on type 'Y'
Solución: Revisar tipos en lib/types.ts

# 3. Import errors
Module not found: Can't resolve '@/components/...'
Solución: Verificar rutas de imports

# 4. Runtime errors durante build
ReferenceError: X is not defined
Solución: Verificar código client-side con "use client"
```

#### ❌ Error: Deploy Failed

**Síntoma**: El job "deploy" falla después de un build exitoso

**Posibles causas**:

```bash
# 1. Permisos insuficientes
Error: Resource not accessible by integration
Solución: Verificar Settings > Actions > General > Workflow permissions

# 2. Pages no configurado
Error: GitHub Pages is not enabled
Solución: Settings > Pages > Source: GitHub Actions

# 3. Artifact no encontrado
Error: Artifact not found
Solución: Verificar que ./out se genera correctamente
```

## 🛠️ Paso 2: Verificaciones Locales

### 1. Verificar TypeScript

```bash
cd /home/miguelmaestro/VibeCoding/github_portfolio
npx tsc --noEmit
```

**Esperado**: Sin errores

### 2. Verificar Sintaxis JSON

```bash
# Verificar locales
cat locales/es.json | python3 -m json.tool > /dev/null && echo "✅ es.json válido"
cat locales/en.json | python3 -m json.tool > /dev/null && echo "✅ en.json válido"
```

### 3. Verificar Imports

```bash
# Buscar imports rotos
grep -r "from '@/" components/ --include="*.tsx" | grep -v "node_modules"
```

### 4. Verificar Estructura de Archivos

```bash
# Verificar que todos los componentes existen
ls -la components/sections/
ls -la components/ui/
ls -la lib/
```

## 🔧 Paso 3: Soluciones Rápidas

### Opción A: Re-trigger del Workflow

```bash
# En tu terminal local
cd /home/miguelmaestro/VibeCoding/github_portfolio
git commit --allow-empty -m "chore: trigger rebuild"
git push origin main
```

### Opción B: Limpiar y Reconstruir

```bash
# Limpiar dependencias y caché
rm -rf node_modules .next out
rm package-lock.json

# Reinstalar (solo si npm está disponible localmente)
npm install
npm run build
```

### Opción C: Verificar Configuración de GitHub Pages

1. Ve a: `https://github.com/MiguelMaestro/MiguelMaestro.github.io/settings/pages`
2. Verifica:
   - ✅ Source: **GitHub Actions** (no "Deploy from a branch")
   - ✅ Custom domain: vacío (o configurado correctamente)
   - ✅ Enforce HTTPS: habilitado

### Opción D: Verificar Permisos de Workflow

1. Ve a: `https://github.com/MiguelMaestro/MiguelMaestro.github.io/settings/actions`
2. En "Workflow permissions", asegúrate de tener:
   - ✅ Read and write permissions
   - ✅ Allow GitHub Actions to create and approve pull requests

## 📋 Paso 4: Checklist de Diagnóstico

Marca lo que hayas verificado:

- [ ] GitHub Actions muestra los workflows ejecutándose
- [ ] El job "build" se completa exitosamente
- [ ] El job "deploy" se completa exitosamente
- [ ] No hay errores en los logs de Actions
- [ ] GitHub Pages está configurado con "Source: GitHub Actions"
- [ ] Los permisos de workflow están en "Read and write"
- [ ] `npx tsc --noEmit` no muestra errores TypeScript
- [ ] Los archivos JSON (locales/es.json, en.json) son válidos
- [ ] Todos los componentes importados existen en sus rutas
- [ ] El directorio `out/` se genera después del build

## 🔍 Paso 5: Logs Específicos a Revisar

### Si el error está en npm ci

```
Error: npm ERR! code ERESOLVE
```

**Solución**: Problema con resolución de dependencias. Verificar versiones en package.json.

### Si el error está en npm run build

```
Error: Build failed with N errors
```

**Solución**: Revisar los errores específicos en los logs. Buscar:

- TypeScript errors (Type 'X' is not assignable to type 'Y')
- Module not found errors
- Runtime errors durante SSG

### Si el error está en upload artifact

```
Error: Unable to find artifacts at path: ./out
```

**Solución**: El directorio `out` no se generó. Verificar next.config.ts tiene `output: "export"`.

## 🆘 Comandos de Emergencia

### Revertir último commit si es necesario

```bash
git revert HEAD
git push origin main
```

### Ver últimos commits

```bash
git log --oneline -10
```

### Ver diferencias con commit anterior

```bash
git diff fa4beb0^..fa4beb0
```

## 📊 Información del Sistema

**Repositorio**: MiguelMaestro/MiguelMaestro.github.io
**Branch**: main
**Node Version (Actions)**: 20.x
**Next.js Version**: 16.0.3
**Output Mode**: export (static)

## 📞 Próximos Pasos

1. **Revisa los logs de GitHub Actions** primero
2. **Copia el error exacto** que aparece en los logs
3. **Busca el error** en esta guía o en la documentación de Next.js
4. **Aplica la solución** correspondiente
5. **Haz push** y verifica de nuevo

## 🔗 Enlaces Útiles

- [GitHub Actions Logs](https://github.com/MiguelMaestro/MiguelMaestro.github.io/actions)
- [GitHub Pages Settings](https://github.com/MiguelMaestro/MiguelMaestro.github.io/settings/pages)
- [Next.js Static Export Docs](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages Actions Docs](https://github.com/actions/deploy-pages)

---

## ⚡ Script de Diagnóstico Rápido

Ejecuta este script para obtener un reporte completo:

```bash
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

echo "⚙️ Configuración:"
[ -f "next.config.ts" ] && echo "✅ next.config.ts existe" || echo "❌ next.config.ts no existe"
[ -f "package.json" ] && echo "✅ package.json existe" || echo "❌ package.json no existe"
echo ""

echo "📊 Git Status:"
git status --short
echo ""

echo "📝 Últimos 3 commits:"
git log --oneline -3
echo ""

echo "🔗 Para ver logs de GitHub Actions, visita:"
echo "https://github.com/MiguelMaestro/MiguelMaestro.github.io/actions"
```

Guarda esto como `diagnose-deployment.sh`, dale permisos con `chmod +x diagnose-deployment.sh` y ejecútalo con `./diagnose-deployment.sh`.
