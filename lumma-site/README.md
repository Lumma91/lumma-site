# Lumma Studio — Landing Page

## Desplegar en Vercel (paso a paso)

### Opción A: Desde GitHub (recomendada)

1. **Crear cuenta en GitHub** (si no tienes): https://github.com
2. **Crear un repositorio nuevo**: 
   - Ve a https://github.com/new
   - Nombre: `lumma-site`
   - Privado o público (tu elección)
   - Click "Create repository"
3. **Subir los archivos**:
   - En la página del repo vacío, click "uploading an existing file"
   - Arrastra toda la carpeta `lumma-site` 
   - Click "Commit changes"
4. **Ir a Vercel**: https://vercel.com
   - Crear cuenta con GitHub
   - Click "Add New Project"
   - Importar el repo `lumma-site`
   - Vercel detecta automáticamente que es un proyecto Vite/React
   - Click "Deploy"
   - ¡Listo! Tu sitio está live en una URL temporal de Vercel

### Opción B: Desde la terminal (si sabes usar Git)

```bash
cd lumma-site
npm install
npm run build  # para verificar que compila bien

git init
git add .
git commit -m "Lumma Studio LP"
git remote add origin https://github.com/TU_USUARIO/lumma-site.git
git push -u origin main
```

Luego importa el repo en Vercel.

### Conectar tu dominio (lummacreative.com)

1. En Vercel, ve a tu proyecto → Settings → Domains
2. Agrega: `www.lummacreative.com` y `lummacreative.com`
3. Vercel te dará los DNS records que necesitas configurar
4. En Hostinger, ve a DNS Zone Editor y agrega:
   - Un registro **A** apuntando a `76.76.21.21`
   - Un registro **CNAME** para `www` apuntando a `cname.vercel-dns.com`
5. Espera 10-30 minutos para propagación
6. Vercel genera SSL automáticamente

### Conectar formulario con HubSpot

El formulario actualmente muestra un mensaje de confirmación visual.
Para conectarlo con HubSpot tienes dos opciones:

**Opción 1 — Zapier (más fácil):**
- Crea cuenta en Zapier (gratis hasta 100 tareas/mes)
- Zap: "Webhook → HubSpot Create Contact"
- Modifica el botón de envío para hacer un POST al webhook de Zapier

**Opción 2 — HubSpot Form embebido:**
- Crea un formulario en HubSpot con los mismos campos
- Reemplaza el formulario actual por el embed de HubSpot
- Los leads caen directamente en tu CRM

## Estructura del proyecto

```
lumma-site/
├── index.html          ← HTML principal con SEO meta tags
├── package.json        ← Dependencias (React, Vite, Tailwind)
├── vite.config.js      ← Configuración de Vite
├── tailwind.config.js  ← Configuración de Tailwind
├── postcss.config.js   ← PostCSS para Tailwind
├── public/
│   └── favicon.svg     ← Favicon (isotipo Dual Light)
└── src/
    ├── main.jsx        ← Entry point
    ├── index.css       ← Estilos globales + Tailwind
    └── App.jsx         ← Landing page completa
```

## Desarrollo local

```bash
npm install
npm run dev
```

Abre http://localhost:5173 en tu navegador.
