# 🚀 Sistema Huayra 2.0 - Plataforma Inmobiliaria IA & Dashboard de Servicios

Bienvenido a la documentación oficial de **Sistema Huayra 2.0**, la solución integral de PropTech e Inteligencia Artificial Generativa diseñada para desarrolladores inmobiliarios, agencias y brokers de alto impacto.

---

## 📊 Gap Analysis (Análisis de Brecha)

El siguiente análisis compara el estado base (versión 1.0 monolítica / landing simple) frente a las capacidades desplegadas en **Sistema Huayra 2.0**:

| Dimensión | Versión Base (1.0) | Sistema Huayra 2.0 (Target) | Brecha Cubierta (Gap Closed) |
| :--- | :--- | :--- | :--- |
| **Arquitectura de Navegación** | Landing page lineal estática de una sola página. | Landing Page + Dashboard Multimodular con Enrutador Interno Autocontenido. | Rutas y subrutas dinámicas para cada servicio sin recarga de página. |
| **Catálogo de Servicios** | 4 características expuestas como bloques de texto simples. | 7 Servicios Integrales con demos interactivas, métricas y subrutas especializadas. | Desglose completo de servicios (IA LOD BMI, Growth Hack 30+ portales, Inventario Drive, CRM Funnel, VR Lead Scoring, FPV Renders, Property 360°). |
| **Experiencia Multimedial** | Un solo iframe de video FPV básico. | Galería interactiva con simulador FPV, Player Property 360°, Renders IA, VR Tour e imágenes hiperrealistas. | Experiencia inmersiva completa sin requerir motor de renderizado pesado en cliente. |
| **Simulador / Generador IA** | Prompt generator básico mock. | Generador de Blueprint (LOD BMI) + Prompting avanzado con selector de parámetros en tiempo real. | Herramienta interactiva de pre-factibilidad y diseño paramétrico. |
| **UI/UX & Conversión** | Estilo básico oscuro sin jerarquía profunda. | Estilo "Dark Mode Tech" premium (Zinc-950, Verde Esmeralda/Cyan, Glassmorphism, Micro-animaciones). | Interfaz elocuente, altamente legible, memorable y enfocada en maximizar la tasa de conversión (CTA inteligente). |
| **Autonomía Frontend** | Dependencia de backend/estáticos externos. | Enrutador interno 100% autocontenido en cliente, ultra fluido y reactivo. | Cero latencia en navegación entre subrutas de servicios. |

---

## 🛠️ Arquitectura y Tecnologías

- **Core Framework**: React 19 + TypeScript + Vite 6
- **Estilos & UI**: Tailwind CSS v4 + Lucide React Icons
- **Animaciones & Transiciones**: Motion (Framer Motion v12)
- **IA Generativa**: `@google/genai` (Integración con modelos Gemini para sugerencias y prompts inmobiliarios)
- **Navegación**: Custom State-Based Router (Enrutador Interno Autocontenido)

---

## 🚀 Instalación y Ejecución Local

1. **Clonar e Instalar Dependencias**:
   ```bash
   npm install
   ```

2. **Configurar Variables de Entorno**:
   Crear un archivo `.env.local` con tu clave de Gemini API:
   ```env
   GEMINI_API_KEY=tu_api_key_aqui
   ```

3. **Ejecutar servidor local**:
   ```bash
   # Ejecución en modo desarrollo
   npm run dev &
   ```
   La aplicación estará disponible en `http://localhost:3000`.

4. **Verificación de Tipos y Build de Producción**:
   ```bash
   npm run lint
   npm run build
   ```
