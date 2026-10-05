# 📜 DEVLOG.md - Status Quo & Bitácora de Desarrollo Huayra 2.0

## 📍 Status Quo (Estado Actual)
- **Estado Inicial del Repositorio**: Se contaba con un proyecto Vite + React 19 con Tailwind v4 y `@google/genai`. La UI previa se limitaba a una landing page monolítica estática en `App.tsx` con un generador simple de prompts y un iframe estático.
- **Transformación Huayra 2.0**: Se evoluciona la solución hacia un ecosistema de software tipo **Dashboard de Servicios & Landing Page de Alta Conversión** sin depender de motores de renderizado 3D pesados ni backends externos monolíticos.

---

## 🗺️ Mapa de Servicios Huayra 2.0
El sistema cuenta con **7 Servicios Clave**, cada uno con subrutas autocontenidas:

1. **Agentes e IA Generator (LOD BMI & Blueprints)**
   - Subrutas: `/overview`, `/generator`, `/specs`, `/export`
2. **Growth Hack & Portales Internacionales (30+ Portales)**
   - Subrutas: `/overview`, `/portals-map`, `/analytics`, `/campaigns`
3. **Manejo de Inventario Centralizado (Drive / Share Sync)**
   - Subrutas: `/overview`, `/drive-sync`, `/unit-matrix`, `/permissions`
4. **Funnel & CRM Inmobiliario Integrado**
   - Subrutas: `/overview`, `/pipeline`, `/lead-scoring`, `/automations`
5. **Calendarización & Lead Scoring Post-VR Tour**
   - Subrutas: `/overview`, `/calendar`, `/vr-analytics`, `/booking-flow`
6. **Videos FPV + Renders IA Overlays**
   - Subrutas: `/overview`, `/video-player`, `/ai-overlays`, `/render-presets`
7. **Property 360° & Video Tour Interactivo**
   - Subrutas: `/overview`, `/viewer-360`, `/hotspots`, `/tour-builder`

---

## 📐 Decisiones de Arquitectura UI/UX
- **Enrutamiento Interno Autocontenido**: Implementado en cliente mediante un Custom Router basado en estados (`currentRoute` y `currentSubRoute`), logrando cero latencia, persistencia de parámetros y fluidez sin recargas.
- **Estilo Visual Dark Mode Tech**: Paleta Zinc-950 con acentos verde esmeralda (`emerald-400`/ `emerald-500`) y cyan, capas de glassmorphism (`backdrop-blur-md`), bordes sutiles zinc-800 y micro-interacciones suaves impulsadas por Framer Motion.
- **Cero Motor de Renderizado Pesado**: El sistema aprovecha reproductores interactivos multimedia, simuladores de hotspot 360° SVG/Canvas ultraligeros, mapas de calor sintéticos y generadores de prompts de pre-factibilidad.
