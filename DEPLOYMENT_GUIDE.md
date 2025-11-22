# 🚀 Guía de Despliegue - Portfolio Neural AI

## ✅ PRE-REQUISITOS

Antes de desplegar, verifica que todo esté en orden:

```bash
# 1. Verificar que no hay errores TypeScript
npx tsc --noEmit

# 2. Verificar que el build funciona
npm run build

# 3. Verificar que las dependencias están instaladas
npm list gsap next-themes recharts
```

---

## 📦 OPCIONES DE DESPLIEGUE

### Opción 1: GitHub Pages (Recomendado)

**Ventajas:**

- ✅ Hosting gratuito
- ✅ Dominio personalizado (tuusuario.github.io)
- ✅ HTTPS automático
- ✅ CI/CD con GitHub Actions

#### Configuración:

1. **Actualizar `next.config.ts`:**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Esto ya está configurado
  basePath: "", // Déjalo vacío si usas tuusuario.github.io
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

2. **Crear archivo `.github/workflows/deploy.yml`:**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

3. **Habilitar GitHub Pages:**

   - Ve a Settings → Pages
   - Source: GitHub Actions
   - Guarda los cambios

4. **Push a GitHub:**

```bash
git add .
git commit -m "feat: deploy portfolio to GitHub Pages"
git push origin main
```

5. **Esperar el deploy:**
   - Ve a Actions y verifica que el workflow se ejecute
   - Tu sitio estará en: `https://tuusuario.github.io`

---

### Opción 2: Vercel (Más fácil)

**Ventajas:**

- ✅ Deploy automático en cada push
- ✅ Preview deployments para cada PR
- ✅ Edge Functions
- ✅ Analytics incluidos

#### Pasos:

1. **Ir a [vercel.com](https://vercel.com)**
2. **Conectar tu repositorio de GitHub**
3. **Configuración automática** (Vercel detecta Next.js)
4. **Deploy** 🚀

**Variables de entorno (si las necesitas):**

```bash
# No hay variables de entorno necesarias por ahora
```

---

### Opción 3: Netlify

**Ventajas:**

- ✅ Drag & drop deploy
- ✅ Serverless functions
- ✅ Form handling

#### Pasos:

1. **Crear cuenta en [netlify.com](https://netlify.com)**
2. **Conectar repositorio o drag & drop la carpeta `/out`**
3. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `out`
4. **Deploy** 🚀

---

### Opción 4: Cloudflare Pages

**Ventajas:**

- ✅ CDN global ultra-rápido
- ✅ Workers para edge computing
- ✅ Gratis sin límites

#### Pasos:

1. **Ir a [pages.cloudflare.com](https://pages.cloudflare.com)**
2. **Conectar repositorio**
3. **Build settings:**
   - Build command: `npm run build`
   - Build output directory: `out`
4. **Deploy** 🚀

---

## 🌐 DOMINIO PERSONALIZADO

### Si tienes un dominio (ejemplo: miguelmaestro.dev)

#### En GitHub Pages:

1. Settings → Pages → Custom domain
2. Añade tu dominio
3. En tu DNS, crea un registro CNAME:
   ```
   CNAME @ tuusuario.github.io
   ```

#### En Vercel:

1. Project Settings → Domains
2. Add domain
3. Sigue las instrucciones de DNS

---

## 🔍 SEO POST-DEPLOY

Una vez desplegado, verifica:

### 1. Google Search Console

```bash
# Añade tu sitio y verifica propiedad
https://search.google.com/search-console
```

### 2. Sitemap (ya generado)

```
https://tusitio.com/sitemap.xml
```

### 3. Robots.txt

Crea `public/robots.txt`:

```txt
User-agent: *
Allow: /
Sitemap: https://tusitio.com/sitemap.xml
```

---

## 📊 ANALYTICS

### Google Analytics

1. **Crea cuenta en [analytics.google.com](https://analytics.google.com)**

2. **Añade el script en `app/layout.tsx`:**

```tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Alternativa: Plausible (Privacy-friendly)

```bash
npm install next-plausible
```

```tsx
// app/layout.tsx
import PlausibleProvider from "next-plausible";

export default function RootLayout({ children }) {
  return (
    <PlausibleProvider domain="tusitio.com">
      <html>
        <body>{children}</body>
      </html>
    </PlausibleProvider>
  );
}
```

---

## 🔧 OPTIMIZACIONES POST-DEPLOY

### 1. Lighthouse Score

Ejecuta Lighthouse en Chrome DevTools:

- Performance: Aim for 90+
- Accessibility: Aim for 100
- Best Practices: Aim for 100
- SEO: Aim for 100

### 2. Compresión de imágenes

```bash
# Optimiza images en /public
npm install -D sharp

# Script para comprimir (opcional)
npx @squoosh/cli --webp auto public/**/*.{jpg,png}
```

### 3. Bundle Size

```bash
# Analiza el bundle
npm install -D @next/bundle-analyzer

# Añade en next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)

# Ejecuta análisis
ANALYZE=true npm run build
```

---

## 🎯 CHECKLIST FINAL

Antes de dar por terminado el deploy:

- [ ] ✅ Build exitoso sin errores
- [ ] ✅ TypeScript sin errores (0 errors)
- [ ] ✅ Todas las páginas cargan correctamente
- [ ] ✅ Dark/Light mode funciona
- [ ] ✅ Idiomas ES/EN funcionan
- [ ] ✅ Neural network se ve en Hero
- [ ] ✅ Cursor trail funciona en desktop
- [ ] ✅ Scroll animations funcionan
- [ ] ✅ Radar chart es interactivo
- [ ] ✅ Responsive en mobile/tablet/desktop
- [ ] ✅ Dominio personalizado (si aplica)
- [ ] ✅ HTTPS habilitado
- [ ] ✅ Sitemap.xml accesible
- [ ] ✅ Robots.txt configurado
- [ ] ✅ Analytics instalado (opcional)
- [ ] ✅ Lighthouse score > 90

---

## 🐛 TROUBLESHOOTING

### Error: "Cannot find module 'gsap'"

```bash
npm install gsap next-themes recharts
```

### Error: Build falla en Vercel

```bash
# Verifica Node version en vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "out",
  "framework": "nextjs",
  "installCommand": "npm install"
}
```

### Imágenes no cargan en GitHub Pages

```typescript
// next.config.ts
images: {
  unoptimized: true, // Ya está configurado
}
```

### Dark mode no persiste

```bash
# Verifica que localStorage esté habilitado en el navegador
# Verifica que ThemeProvider esté en layout.tsx
```

---

## 📞 SOPORTE

Si encuentras algún problema:

1. **Revisa la consola del navegador** (F12)
2. **Revisa los logs de build** en GitHub Actions / Vercel
3. **Verifica que todas las dependencias estén instaladas**
4. **Limpia cache y node_modules**:
   ```bash
   rm -rf node_modules .next out
   npm install
   npm run build
   ```

---

## 🎉 ¡FELICIDADES!

Tu portfolio Neural AI está ahora en producción. Comparte tu enlace en:

- LinkedIn
- GitHub README
- Twitter/X
- CV/Resume

**URL del portfolio:** https://tusitio.com

---

**Última actualización:** 22 Nov 2025  
**Autor:** Miguel Maestro + GitHub Copilot
