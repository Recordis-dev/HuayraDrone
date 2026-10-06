# ⚙️ Guía de Configuración Correcta en GitHub Pages

Para garantizar que el sitio **Sistema Huayra 2.0** no muestre pantalla en blanco al recargar o navegar, sigue estos breves pasos en la interfaz de GitHub:

## Opción Recomendada: GitHub Actions (Recomendado para Huayra 2.0)

1. Ve a tu repositorio en GitHub: **`https://github.com/Recordis-dev/HuayraDrone`**
2. Haz clic en la pestaña **Settings** (Configuración del Repositorio).
3. En el menú lateral izquierdo, en la sección *Code and automation*, haz clic en **Pages**.
4. En la sección **Build and deployment**:
   - En **Source**, selecciona: **`GitHub Actions`**.
5. ¡Listo! El workflow automático `.github/workflows/deploy.yml` compilará el código cada vez que se actualice `main` y publicará los assets sin procesar por Jekyll (con `.nojekyll` y `404.html` listos).

---

## Opción Alternativa: Deploy from a branch (Rama `gh-pages`)

Si prefieres usar la opción tradicional por rama:
1. En **Settings** -> **Pages**.
2. En **Source**, selecciona: **`Deploy from a branch`**.
3. En **Branch**, selecciona la rama **`gh-pages`** y la carpeta **`/ (root)`**.
4. Haz clic en **Save**.

---

### ¿Por qué ocurría el bug intermitente de la pantalla en blanco?
- **Falta de `.nojekyll`**: GitHub Pages por defecto usa Jekyll, el cual ignora o filtra archivos y carpetas que empiezan por `_` o patrones específicos en el bundle de Vite. Al crear `.nojekyll` dentro de `dist/`, forzamos a GitHub a entregar todos los archivos JavaScript y CSS intactos.
- **Manejo de recargas en SPA**: Al duplicar `index.html` a `404.html`, cualquier recarga de página dentro de una subruta sirve la aplicación React directamente en lugar de mostrar un 404 nativo de GitHub.
