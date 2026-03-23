# BeerCSS Development Workflow

Flujo de trabajo para desarrollar y visualizar componentes BeerCSS con hot reload.

## 🚀 Quick Start

### 1. Iniciar el servidor de desarrollo

```bash
cd ~/Code/design-system-github/design-system
npm run beercss:dev
```

Esto inicia:
- ✅ Servidor HTTP en `http://localhost:3000`
- ✅ Demo app con todos los componentes
- ✅ Watch mode: rebuild automático cuando cambies customizaciones
- ✅ Archivos servidos desde `dist/beercss/`

### 2. Ver la demo app

Abre en tu navegador:
```
http://localhost:3000
```

Verás:
- 🎨 Paleta de colores Khipu
- 🔘 Todos los componentes BeerCSS
- 🃏 Cards personalizadas
- 📝 Formularios
- 💬 Dialogs y Snackbars
- Y más...

### 3. Editar customizaciones

Edita archivos en `src/beercss/customizations/`:

```bash
src/beercss/customizations/
├── khipu-tokens.css        # Colores y variables
├── khipu-components.css    # Componentes custom
└── khipu-init.js           # JavaScript
```

**El bundle se reconstruye automáticamente** cuando guardas cambios.

**Refresca el navegador** para ver los cambios (F5 o Cmd+R).

## 🔄 Usar en Payment App (Desarrollo)

### Opción 1: Desarrollo local (Recomendado)

1. **Inicia el dev server** (si no está corriendo):
   ```bash
   cd ~/Code/design-system-github/design-system
   npm run beercss:dev
   ```

2. **Cambia las URLs en `material.gsp`**:

   Archivo: `~/Code/payment/grails-app/views/layouts/material.gsp`

   ```html
   <!-- CSS -->
   <link rel="stylesheet" href="http://localhost:3000/dist/beercss/khipu-beercss.min.css">

   <!-- JavaScript -->
   <script type="module" src="http://localhost:3000/dist/beercss/khipu-beercss.min.js"></script>
   ```

3. **Reinicia el payment app** (o solo refresca el navegador si hot reload funciona)

4. **Edita customizaciones** en design-system → Se rebuilds automáticamente → Refresca payment app en navegador

### Opción 2: Producción (CDN)

Para usar la versión publicada:

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@khipu/design-system@0.1.0-alpha.25/dist/beercss/khipu-beercss.min.css">

<!-- JavaScript -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@khipu/design-system@0.1.0-alpha.25/dist/beercss/khipu-beercss.min.js"></script>
```

## 📝 Workflow Típico

### Agregar un nuevo componente custom:

1. **Edita `khipu-components.css`:**
   ```css
   .khipu-my-component {
       background: var(--primary);
       border-radius: 12px;
       padding: 24px;
   }
   ```

2. **Guarda el archivo** → Build automático

3. **Refresca http://localhost:3000** → Ves el componente en la demo

4. **Agrega ejemplo en `demo/index.html`:**
   ```html
   <div class="demo-section">
       <h2 class="demo-title">Mi Componente</h2>
       <div class="khipu-my-component">
           Contenido del componente
       </div>
   </div>
   ```

5. **Refresca** → Ves el ejemplo

6. **Refresca payment app** → Componente disponible

### Cambiar colores:

1. **Edita `khipu-tokens.css`:**
   ```css
   :root {
       --khipu-primary: #FF0000;  /* Cambio a rojo */
   }
   ```

2. **Guarda** → Build automático

3. **Refresca demo** → Todo el primary ahora es rojo

4. **Refresca payment app** → Cambios aplicados

## 🛠️ Scripts Disponibles

```bash
# Servidor de desarrollo (recomendado)
npm run beercss:dev

# Build manual (sin watch)
npm run beercss:build

# Watch mode sin servidor
npm run beercss:watch
```

## 🎨 Estructura del Demo

```
src/beercss/demo/
└── index.html              # Demo app con todos los componentes

src/beercss/customizations/
├── khipu-tokens.css        # Variables CSS y colores
├── khipu-components.css    # Componentes personalizados
└── khipu-init.js           # Inicialización JavaScript

src/beercss/scripts/
├── build.js                # Script de build
└── dev-server.js           # Servidor de desarrollo
```

## 📦 Output del Build

```
dist/beercss/
├── khipu-beercss.css       # No minificado (debugging)
├── khipu-beercss.min.css   # Minificado (producción)
├── khipu-beercss.js        # No minificado
├── khipu-beercss.min.js    # Minificado
└── metadata.json           # Info de versión
```

## 🚀 Publicar Cambios

Cuando termines de desarrollar:

1. **Commit los cambios:**
   ```bash
   git add src/beercss/
   git commit -m "feat: add new custom component"
   ```

2. **Bump versión:**
   ```bash
   ./scripts/sync-version.sh 0.1.0-alpha.26
   ```

3. **Update iOS version** (manual):
   ```
   ios/Sources/KhipuDesignSystem.swift
   ```

4. **Tag y push:**
   ```bash
   git add -A
   git commit -m "0.1.0-alpha.26"
   git tag v0.1.0-alpha.26
   git push && git push --tags
   ```

5. **GitHub Actions publica automáticamente** a npm

6. **Actualiza payment app a nueva versión:**
   ```html
   @0.1.0-alpha.26
   ```

## 💡 Tips

- **Hot reload manual**: Refresca el navegador con Cmd+R (Mac) o F5 (Windows/Linux)
- **DevTools**: Abre la consola para ver logs de inicialización
- **Network tab**: Verifica que los archivos se cargan desde localhost:3000
- **Cache**: Si no ves cambios, hard refresh con Cmd+Shift+R o Ctrl+Shift+R
- **Puerto ocupado**: Si el puerto 3000 está ocupado, edita `dev-server.js` línea 11

## 🐛 Troubleshooting

### El servidor no inicia

```bash
# Verificar que el puerto 3000 esté libre
lsof -ti:3000

# Matar proceso si está ocupado
lsof -ti:3000 | xargs kill -9
```

### Cambios no se ven

1. Verifica que el build fue exitoso (mira la consola del dev server)
2. Hard refresh en el navegador
3. Verifica que estás editando el archivo correcto
4. Checa errores en la consola del navegador

### Payment app no carga los estilos

1. Verifica que el dev server esté corriendo: `http://localhost:3000`
2. Verifica las URLs en `material.gsp`
3. Checa la consola del navegador por errores CORS
4. Verifica Network tab para ver si los archivos se cargan

## 📚 Recursos

- [BeerCSS Documentation](https://www.beercss.com/)
- [Material Design 3 Guidelines](https://m3.material.io/)
- [Design System README](../../README.md)
