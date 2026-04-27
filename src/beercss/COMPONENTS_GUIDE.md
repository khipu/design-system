# Khipu BeerCSS Components - Usage Guide

Guía de uso de componentes avanzados del Design System Khipu para BeerCSS.

---

## 📦 Instalación

```bash
npm install @khipu/design-system
```

O incluye directamente desde CDN en producción:

```html
<!-- CSS -->
<link rel="stylesheet" href="https://unpkg.com/@khipu/design-system/dist/beercss/khipu-beercss.min.css">

<!-- JS -->
<script src="https://unpkg.com/@khipu/design-system/dist/beercss/khipu-beercss.min.js"></script>
```

---

## 🏦 Modal de Bancos

Modal con lista completa de bancos, búsqueda en tiempo real y selección.

### Estructura HTML

```html
<!-- Botón que abre el modal -->
<button class="kds-bank-row" data-open-bank-modal>
  <i class="material-symbols-outlined">add</i>
  <span class="kds-bank-row-name">Todos los bancos y billeteras +17</span>
  <i class="material-symbols-outlined">chevron_right</i>
</button>

<!-- Modal (colocar antes del cierre de </body>) -->
<div class="kds-bank-modal-scrim" id="bankModal">
  <div class="kds-bank-modal">
    <!-- Header con búsqueda -->
    <header class="kds-bank-modal-header">
      <h2>Selecciona tu banco</h2>
      <button class="kds-bank-modal-close" data-close-bank-modal>
        <i class="material-symbols-outlined">close</i>
      </button>
    </header>

    <!-- Campo de búsqueda -->
    <div class="kds-bank-modal-search">
      <i class="material-symbols-outlined">search</i>
      <input
        type="text"
        id="bankSearch"
        placeholder="Buscar banco o billetera"
        oninput="filterBanks(this.value)"
      />
    </div>

    <!-- Lista de bancos -->
    <div class="kds-bank-modal-body" id="bankModalList">
      <button class="kds-bank-row" data-bank-id="banco-estado">
        <span class="kds-bank-row-logo initials" style="background:#E31837">BE</span>
        <span class="kds-bank-row-name">Banco Estado</span>
        <i class="material-symbols-outlined">chevron_right</i>
      </button>

      <button class="kds-bank-row" data-bank-id="banco-chile">
        <span class="kds-bank-row-logo initials" style="background:#0033A0">BC</span>
        <span class="kds-bank-row-name">Banco de Chile</span>
        <i class="material-symbols-outlined">chevron_right</i>
      </button>

      <!-- Agrega más bancos aquí -->
    </div>

    <!-- Mensaje cuando no hay resultados -->
    <div class="kds-bank-modal-empty" id="bankNoResults">
      <i class="material-symbols-outlined">search_off</i>
      <p>No se encontraron resultados</p>
    </div>
  </div>
</div>
```

### JavaScript requerido

El bundle de Khipu **ya incluye** la inicialización automática. Solo necesitas agregar esta función para el filtrado:

```javascript
/**
 * Filtra la lista de bancos según la búsqueda
 * @param {string} query - Texto de búsqueda
 */
function filterBanks(query) {
  var q = query.toLowerCase().trim();
  var rows = document.querySelectorAll('#bankModalList .kds-bank-row');
  var visible = 0;

  rows.forEach(function(row) {
    var name = row.querySelector('.kds-bank-row-name').textContent.toLowerCase();
    var match = !q || name.indexOf(q) !== -1;
    row.style.display = match ? '' : 'none';
    if (match) visible++;
  });

  // Mostrar/ocultar mensaje de "sin resultados"
  document.getElementById('bankNoResults').classList.toggle('visible', visible === 0);
}
```

### Hooks de eventos

Manejo de apertura/cierre (incluido en el bundle):

```javascript
// Abrir modal
document.querySelector('[data-open-bank-modal]').addEventListener('click', function() {
  document.getElementById('bankModal').classList.add('open');
  document.getElementById('bankSearch').value = '';
  filterBanks('');
});

// Cerrar modal
document.querySelector('[data-close-bank-modal]').addEventListener('click', function() {
  document.getElementById('bankModal').classList.remove('open');
});

// Banco seleccionado
document.querySelectorAll('#bankModalList .kds-bank-row').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var bankId = this.dataset.bankId;
    // Tu lógica aquí (ej: navegar, enviar formulario, etc.)
    console.log('Banco seleccionado:', bankId);

    // Cerrar modal
    document.getElementById('bankModal').classList.remove('open');
  });
});
```

### Clases CSS disponibles

| Clase | Descripción |
|-------|-------------|
| `.kds-bank-modal-scrim` | Overlay oscuro del modal |
| `.kds-bank-modal-scrim.open` | Estado abierto del modal |
| `.kds-bank-modal` | Contenedor del modal |
| `.kds-bank-modal-header` | Header con título y botón cerrar |
| `.kds-bank-modal-close` | Botón de cerrar |
| `.kds-bank-modal-search` | Campo de búsqueda con icono |
| `.kds-bank-modal-body` | Lista scrollable de bancos |
| `.kds-bank-modal-empty` | Mensaje "sin resultados" |
| `.kds-bank-modal-empty.visible` | Muestra el mensaje |
| `.kds-bank-row` | Fila de banco individual |
| `.kds-bank-row-logo` | Logo/inicial del banco |
| `.kds-bank-row-name` | Nombre del banco |

### Tokens de diseño utilizados

```css
/* Del bundle khipu-beercss.css */
--kds-color-border-subtle: #F3F4F6;        /* Borde muy sutil */
--kds-color-border-default: #E5E7EB;       /* Borde hover */
--kds-color-hover-bg: #FAFAFA;             /* Fondo hover */
--kds-radius-card: 14px;                   /* Radio del modal */
--kds-shadow-elevated: var(--kds-shadow-8); /* Sombra elevada */
```

---

## 📌 Sticky Invoice Header

Header de factura que colapsa automáticamente al hacer scroll, manteniendo visible solo la información esencial (monto, código, merchant).

### Estructura HTML

```html
<article class="kds-card-elevated kds-invoice-sticky">
  <!-- Header - siempre visible -->
  <header class="kds-invoice-header">
    <div>
      <p class="kds-invoice-amount">$3.300</p>
      <p class="kds-invoice-code">Código fdap-sr2x-q3pf</p>
    </div>
    <div class="kds-invoice-merchant">
      <i class="material-symbols-outlined">storefront</i>
    </div>
  </header>

  <!-- Contenido colapsable - se oculta al hacer scroll -->
  <div class="kds-invoice-collapsible">
    <hr class="kds-hr" />

    <dl class="kds-kv">
      <dt>Pago a</dt>
      <dd>Belén Fuentes Mejías</dd>
      <dt>Asunto</dt>
      <dd>Cuenta Enero 2026</dd>
    </dl>

    <!-- Opcional: sección expandible con más detalles -->
    <div class="kds-expand-section">
      <button class="kds-expand-toggle" data-expand-toggle aria-expanded="false">
        <span>Detalle del cobro</span>
        <i class="material-symbols-outlined">expand_more</i>
      </button>
      <div class="kds-expand-panel" data-expand-panel>
        <dl class="kds-detail-list">
          <div class="kds-detail-group">
            <dt>Emisor cobro</dt>
            <dd>Khipu</dd>
          </div>
          <div class="kds-detail-group">
            <dt>Descripción</dt>
            <dd>Estado de cuenta correspondiente a enero de 2026...</dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</article>
```

### JavaScript (automático)

El bundle de Khipu **inicializa automáticamente** el sticky header. No necesitas JavaScript adicional.

Si quieres inicializar manualmente:

```javascript
// Llamar después de cargar contenido dinámico
window.Khipu.initStickyInvoice();
```

### Comportamiento

| Acción | Resultado |
|--------|-----------|
| **Scroll > 60px** | Header colapsa (añade clase `.collapsed`) |
| **Scroll < 20px** | Header se expande (remueve clase `.collapsed`) |
| **Estado collapsed** | Solo se ve: monto (más pequeño), código (caption), merchant icon (40px) |
| **Transiciones** | Suaves (0.25s - 0.3s) con easing |

### Clases CSS disponibles

| Clase | Descripción |
|-------|-------------|
| `.kds-invoice-sticky` | Habilita sticky positioning y comportamiento de collapse |
| `.kds-invoice-sticky.collapsed` | Estado colapsado (aplicado por JS al hacer scroll) |
| `.kds-invoice-header` | Header con monto, código y merchant |
| `.kds-invoice-amount` | Monto del pago (reduce font-size al colapsar) |
| `.kds-invoice-code` | Código de operación (reduce a caption al colapsar) |
| `.kds-invoice-merchant` | Icono de comercio (reduce tamaño al colapsar) |
| `.kds-invoice-collapsible` | Wrapper del contenido que se oculta |

### Thresholds personalizables

Si necesitas ajustar los thresholds de scroll, edita en tu código:

```javascript
// Copiar función initStickyInvoice del bundle y modificar:
var collapseAt = 60;   // px scrolled para colapsar (por defecto: 60)
var expandAt = 20;     // px scrolled para expandir (por defecto: 20)
```

### Tokens de diseño utilizados

```css
/* Transiciones y tamaños del bundle khipu-beercss.css */
--kds-shadow-2: ...;                       /* Sombra cuando collapsed */
--kds-status-icon-size-sm: 40px;           /* Tamaño merchant icon collapsed */
--kds-font-size-xl: 1.5rem;                /* Monto collapsed */
--kds-font-size-caption: 0.75rem;          /* Código collapsed */
--kds-radius-card: 14px;                   /* Border radius */
```

---

## 🎨 Componentes complementarios

### Bank Row (fila de banco)

```html
<button class="kds-bank-row">
  <span class="kds-bank-row-logo initials" style="background:#E31837">BE</span>
  <span class="kds-bank-row-name">Banco Estado</span>
  <i class="material-symbols-outlined">chevron_right</i>
</button>
```

### Copy Row (fila copiable)

```html
<button class="kds-copy-row" data-copy="Valor a copiar">
  <div>
    <span class="kds-copy-row-label">RUT</span>
    <span class="kds-copy-row-value">76.187.287-7</span>
  </div>
  <i class="material-symbols-outlined">content_copy</i>
</button>
```

### Expand Toggle (sección expandible)

```html
<div class="kds-expand-section">
  <button class="kds-expand-toggle" data-expand-toggle aria-expanded="false">
    <span>Detalle del cobro</span>
    <i class="material-symbols-outlined">expand_more</i>
  </button>
  <div class="kds-expand-panel" data-expand-panel>
    <!-- Contenido expandible aquí -->
  </div>
</div>
```

---

## 🛠️ Requisitos

### Dependencias

- **Material Symbols Outlined** (iconos): Ya incluido en el bundle
- **BeerCSS** (base): Ya incluido en el bundle
- **JavaScript vanilla**: ES5 compatible (IE11+)

### HTML base requerido

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi App con Khipu DS</title>

  <!-- Khipu BeerCSS Bundle -->
  <link rel="stylesheet" href="/dist/beercss/khipu-beercss.min.css">
</head>
<body>

  <!-- Tu contenido aquí -->

  <!-- Khipu JS Bundle (al final del body) -->
  <script src="/dist/beercss/khipu-beercss.min.js"></script>
</body>
</html>
```

---

## 📚 Ejemplos completos

Ver demos funcionales en:
- **Local**: `npm run beercss:dev` → http://localhost:3000/payment-flow.html
- **Producción**: https://design.khipu.com (próximamente)

### Archivos de referencia

- **HTML completo**: `src/beercss/demo/payment-flow.html`
- **Componentes CSS**: `src/beercss/customizations/khipu-components.css`
- **Tokens CSS**: `src/beercss/customizations/khipu-tokens.css`
- **JavaScript**: `src/beercss/customizations/khipu-init.js`

---

## 🐛 Troubleshooting

### Modal no se abre

✅ Verifica que el bundle JS esté cargado
✅ Confirma que el `id="bankModal"` coincida con el selector
✅ Revisa la consola del navegador por errores

### Sticky header no colapsa

✅ Asegúrate que el article tenga clase `kds-invoice-sticky`
✅ Verifica que el contenido esté dentro de `kds-invoice-collapsible`
✅ Confirma que la página tenga scroll (contenido suficiente)

### Estilos no se aplican

✅ Verifica que el bundle CSS esté cargado antes del body
✅ Revisa que no haya CSS custom sobrescribiendo los tokens
✅ Usa las clases exactas (sin espacios extra, case-sensitive)

---

## 💬 Soporte

- **Issues**: https://bitbucket.org/khipu/design-system/issues
- **Documentación**: `/docs/` en el repo
- **Storybook**: https://design.khipu.com

---

## 📋 Changelog

### v0.1.0-alpha.49 (2026-04-27)

**Nuevos componentes:**
- ✨ Modal de bancos con búsqueda en tiempo real
- ✨ Sticky invoice header con collapse automático en scroll

**Nuevos tokens:**
- `--kds-color-border-subtle` - Borde muy sutil (#F3F4F6)
- `--kds-color-border-default` - Borde estándar (#E5E7EB)
- `--kds-color-hover-bg` - Fondo hover (#FAFAFA)
- `--kds-radius-row` - Radio para filas interactivas (10px)
- `--kds-shadow-elevated` - Sombra para superficies elevadas

**Mejoras:**
- ♻️ Componentes `kds-bank-row` y `kds-copy-row` comparten tokens
- ♻️ Sticky header funciona en múltiples pantallas con estado independiente
- ♻️ Hysteresis en scroll para prevenir oscilación (collapse: 60px, expand: 20px)
- 🎨 Alineación completa con diseño origen (border colors, padding, font-size, radius)
