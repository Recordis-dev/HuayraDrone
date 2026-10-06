# 🔍 Diagnóstico Técnico: "process is not defined" y la Pantalla en Blanco (Blank Screen)

## ¿Por qué ocurre la pantalla en blanco (Blank Screen) en GitHub Pages?

1. **Incompatibilidad de `process.env` en Navegadores**:
   En Node.js existe el objeto global `process.env`. Sin embargo, en un navegador web (como Chrome/Safari en GitHub Pages) **el objeto `process` NO existe nativamente**.
   Si un paquete importado o un componente React intenta leer `process.env.GEMINI_API_KEY` o evaluar `typeof process.env` al cargar el módulo JavaScript, el navegador lanza una excepción no capturada:
   `Uncaught ReferenceError: process is not defined`
   Esto interrumpe inmediatamente la ejecución de React antes de que se monte `<div id="root"></div>`, produciendo una **pantalla totalmente en blanco (Blank Screen)**.

2. **¿Qué significa "definiciones atomizadas" y por qué fallaba?**:
   - En Vite, cuando usas `define: { 'process.env.GEMINI_API_KEY': JSON.stringify(...) }`, Vite solo reemplaza la cadena exacta `process.env.GEMINI_API_KEY`.
   - Pero librerías como `@google/genai` (u otras dependencias) internamente evalúan expresiones dinámicas como `process.env['GEMINI_API_KEY']`, `typeof process`, o `process.env` como un objeto completo. Al no encontrar el objeto global `process`, el navegador falla catastróficamente.

## 🛠️ Solución Definitiva Implementada:

1. **Aislamiento Total de la API de Gemini**:
   Removemos cualquier llamada o importación directa de la SDK de Gemini al momento de la carga inicial. Todos los simuladores de IA utilizarán generadores de imágenes/prompts y placeholders hiperrealistas de manera 100% síncrona y segura.
2. **Polyfill Nativo en `index.html`**:
   Inyectamos en el `<head>` de `index.html` la inicialización explícita del objeto global:
   ```html
   <script>
     window.global = window;
     window.process = { env: {} };
   </script>
   ```
3. **React Error Boundary**:
   Implementamos un componente `<ErrorBoundary>` alrededor de `<App />` para que, ante cualquier imprevisto en cliente, la aplicación muestre un banner elegante de diagnóstico en lugar de quedar en blanco.
