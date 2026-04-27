# 🚀 Release Notes - v0.1.0-alpha.49

**Fecha:** 2026-04-27
**Tipo:** Feature Release
**Plataformas:** Web (BeerCSS)

---

## 📦 ¿Cómo actualizar?

### NPM

```bash
npm install @khipu/design-system@0.1.0-alpha.49
```

### CDN

```html
<!-- CSS -->
<link rel="stylesheet" href="https://unpkg.com/@khipu/design-system@0.1.0-alpha.49/dist/beercss/khipu-beercss.min.css">

<!-- JS -->
<script src="https://unpkg.com/@khipu/design-system@0.1.0-alpha.49/dist/beercss/khipu-beercss.min.js"></script>
```

---

## ✨ Nuevos Componentes

### 1. 🏦 Modal de Bancos

Modal con lista completa de bancos, búsqueda en tiempo real y selección.

**Características:**
- ✅ Lista de bancos con logos/iniciales personalizables
- ✅ Búsqueda en tiempo real (filtra mientras escribes)
- ✅ Altura fija (no cambia al filtrar)
- ✅ Mensaje "sin resultados" cuando no hay coincidencias
- ✅ Animaciones suaves de entrada/salida
- ✅ Cierre por botón X o al seleccionar banco

**HTML mínimo:**

```html
<!-- Botón trigger -->
<button data-open-bank-modal>Ver todos los bancos</button>

<!-- Modal -->
<div class="kds-bank-modal-scrim" id="bankModal">
  <div class="kds-bank-modal">
    <header class="kds-bank-modal-header">
      <h2>Selecciona tu banco</h2>
      <button data-close-bank-modal>×</button>
    </header>
    <div class="kds-bank-modal-search">
      <input id="bankSearch" oninput="filterBanks(this.value)">
    </div>
    <div class="kds-bank-modal-body" id="bankModalList">
      <button class="kds-bank-row" data-bank-id="banco-estado">
        <span class="kds-bank-row-logo">BE</span>
        <span class="kds-bank-row-name">Banco Estado</span>
      </button>
      <!-- más bancos... -->
    </div>
  </div>
</div>
```

**JavaScript:** ✅ **Automático** (incluido en el bundle)

```javascript
// Escuchar selección de banco (opcional)
document.getElementById('bankModal').addEventListener('kds:bank:selected', function(e) {
  console.log('Banco seleccionado:', e.detail.id, e.detail.name);
  // Tu lógica aquí
});
```

---

### 2. 📌 Sticky Invoice Header

Header de factura que colapsa automáticamente al hacer scroll.

**Características:**
- ✅ Sticky positioning (siempre visible en top)
- ✅ Collapse automático al scroll > 60px
- ✅ Expand automático al scroll < 20px (hysteresis)
- ✅ Transiciones suaves (0.25s - 0.3s)
- ✅ Soporte multi-pantalla con estado independiente
- ✅ Solo muestra: monto (reducido), código (caption), merchant icon (40px)

**HTML mínimo:**

```html
<article class="kds-card-elevated kds-invoice-sticky">
  <!-- Header - siempre visible -->
  <header class="kds-invoice-header">
    <div>
      <p class="kds-invoice-amount">$3.300</p>
      <p class="kds-invoice-code">Código ABC-123</p>
    </div>
    <div class="kds-invoice-merchant">
      <i class="material-symbols-outlined">storefront</i>
    </div>
  </header>

  <!-- Contenido colapsable -->
  <div class="kds-invoice-collapsible">
    <hr class="kds-hr" />
    <dl class="kds-kv">
      <dt>Pago a</dt><dd>Comercio X</dd>
      <dt>Asunto</dt><dd>Factura #123</dd>
    </dl>
    <!-- más contenido... -->
  </div>
</article>
```

**JavaScript:** Automático, no requiere código adicional.

---

## 🎨 Nuevos Design Tokens

```css
/* Bordes */
--kds-color-border-subtle: #F3F4F6;    /* Borde muy sutil (cards/rows) */
--kds-color-border-default: #E5E7EB;   /* Borde estándar (hover/separadores) */

/* Hover */
--kds-color-hover-bg: #FAFAFA;         /* Fondo hover ultra-sutil */

/* Geometría */
--kds-radius-row: 10px;                /* Radio para filas interactivas */

/* Sombras */
--kds-shadow-elevated: var(--kds-shadow-8); /* Superficies elevadas (modals) */
```

**Uso:**
Estos tokens están disponibles automáticamente en todo el bundle. Úsalos en tu CSS custom:

```css
.mi-componente {
  border: 1px solid var(--kds-color-border-subtle);
  border-radius: var(--kds-radius-row);
  background: var(--kds-color-hover-bg);
}
```

---

## ♻️ Mejoras en Componentes Existentes

### Bank Row & Copy Row
Ahora comparten los mismos tokens de diseño para consistencia visual:
- Mismo borde sutil (`--kds-color-border-subtle`)
- Mismo hover background (`--kds-color-hover-bg`)
- Mismo borde hover (`--kds-color-border-default`)

### Alineación con Diseño Origen
Todos los componentes fueron ajustados para coincidir 100% con el diseño origen:
- `kds-bank-row`: padding 12px, radius 14px, font-size 14px
- `kds-copy-row`: padding 12px 14px, radius 10px, font-size 14px
- Colores de íconos y bordes calibrados

---

## 📚 Documentación

### Nueva Guía de Componentes

**[src/beercss/COMPONENTS_GUIDE.md](./src/beercss/COMPONENTS_GUIDE.md)**

Incluye:
- ✅ Estructura HTML completa para cada componente
- ✅ Clases CSS disponibles y su función
- ✅ JavaScript hooks y eventos
- ✅ Tokens de diseño utilizados
- ✅ Ejemplos funcionales
- ✅ Troubleshooting común

---

## 🧪 Testing

### Cómo probar localmente

```bash
# 1. Clonar repo
git clone https://github.com/khipu/design-system.git
cd design-system

# 2. Instalar dependencias
npm install

# 3. Correr dev server
npm run beercss:dev

# 4. Abrir en navegador
# → http://localhost:3000/payment-flow.html
```

### Qué probar

**Modal de Bancos:**
1. Click en "Todos los bancos y billeteras +17"
2. Modal se abre con lista completa
3. Escribir en búsqueda (ej: "estado")
4. Solo aparecen bancos que coinciden
5. Seleccionar banco → modal se cierra

**Sticky Header:**
1. Navegar a cualquier pantalla (1, 2, 3, 4, 5, 6, 7)
2. Hacer scroll hacia abajo
3. Header colapsa mostrando solo: monto + código + merchant
4. Hacer scroll hacia arriba
5. Header se expande mostrando todos los detalles

---

## 🔧 Configuración Avanzada

### Ajustar thresholds de scroll

Si 60px es muy pronto o muy tarde para colapsar, modifica en tu proyecto:

```javascript
// Sobrescribir función después de cargar el bundle
window.Khipu.initStickyInvoice = function(root) {
  root = root || document;
  var collapseAt = 80;   // Tu valor (era 60)
  var expandAt = 30;     // Tu valor (era 20)
  // ... resto del código
};
```

### Customizar estilos del modal

Sobrescribe en tu CSS:

```css
.kds-bank-modal {
  max-width: 600px;    /* Por defecto: 448px */
  height: 90vh;        /* Por defecto: 85vh */
}

.kds-bank-row {
  padding: 16px;       /* Por defecto: 12px */
}
```

---

## 📊 Bundle Size

| Archivo | Tamaño Original | Minificado | Ahorro |
|---------|----------------|------------|--------|
| **CSS** | 240.42 KB | 186.96 KB | 22.2% |
| **JS** | 115.79 KB | 81.54 KB | 29.6% |

**Total minificado:** 268.5 KB

---

## 🐛 Bugs Corregidos

- ✅ Modal cambiaba de altura al filtrar búsqueda → Ahora altura fija (85vh)
- ✅ Valores hardcodeados en componentes → Migrados a tokens
- ✅ Sticky header solo funcionaba en pantalla 2 → Ahora funciona en todas
- ✅ Scroll oscilaba al colapsar → Agregado hysteresis (60px collapse, 20px expand)

---

## ⚠️ Breaking Changes

**Ninguno.** Esta es una release de features, completamente retrocompatible con alpha.48.

---

## 🚦 CI/CD Pipeline

El tag `v0.1.0-alpha.49` fue pusheado, lo que activa automáticamente:

1. ✅ **GitHub Actions CI** - Tests y build en Node 20
2. 📦 **npm publish** - Publicación a npmjs.org
3. 📦 **Nexus publish** - Android y Grails (si aplica)
4. 📦 **CocoaPods publish** - iOS (si aplica)
5. 🚀 **Storybook deploy** - GitHub Pages

**Verificar publicación:**
```bash
npm view @khipu/design-system@0.1.0-alpha.49
```

---

## 👥 Contribuidores

- **Fortunato Herrera** - Implementación y documentación
- **Claude Sonnet 4.5** - Asistencia de desarrollo

---

## 📋 Próximos Pasos

1. ✅ **Integrar en payment app** - Usar los nuevos componentes en el flujo de pago
2. ✅ **Feedback del equipo** - Ajustar thresholds/estilos según uso real
3. 🔜 **Beta release** - Estabilizar API y promover a beta después de testing
4. 🔜 **Documentar en Storybook** - Crear stories para modal y sticky header

---

## 📞 Soporte

- **Issues**: https://github.com/khipu/design-system/issues
- **Docs**: `/docs/` en el repositorio
- **Slack**: #design-system (interno)

---

**¡Happy coding!** 🎉
