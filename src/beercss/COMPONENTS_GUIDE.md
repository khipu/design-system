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

### JavaScript (Automático) ✅

El bundle de Khipu **incluye toda la funcionalidad**. No necesitas escribir JavaScript adicional.

**Funcionalidad incluida:**
- ✅ Abrir modal al hacer click en `[data-open-bank-modal]`
- ✅ Cerrar modal al hacer click en `[data-close-bank-modal]`
- ✅ Búsqueda en tiempo real (filtra mientras escribes)
- ✅ Cerrar modal al seleccionar un banco
- ✅ Mensaje "sin resultados" cuando no hay coincidencias
- ✅ Focus automático en input al abrir

**Evento custom al seleccionar banco:**

Cuando el usuario selecciona un banco, se dispara el evento `kds:bank:selected`:

```javascript
// Escuchar selección de banco
document.getElementById('bankModal').addEventListener('kds:bank:selected', function(e) {
  var bank = e.detail;
  console.log('Banco seleccionado:', bank.id);
  console.log('Nombre:', bank.name);
  console.log('Elemento:', bank.element);

  // Tu lógica aquí (ej: navegar, enviar formulario, etc.)
  window.location.href = '/pagar?banco=' + bank.id;
});
```

**Reinicializar manualmente (opcional):**

Si cargas el modal dinámicamente después del DOM ready:

```javascript
window.Khipu.initBankModal();
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

Header de factura con animación progresiva de colapso vinculada al scroll. Mobile-only (< 768px). Al hacer scroll, el header se compacta suavemente manteniendo visible monto, código y merchant.

### Arquitectura

El sistema coordina 3 capas con una sola variable CSS: `--collapse-progress` (0→1).

```
JavaScript (scroll listener)
  → Calcula progress = scrollY / 150
  → Escribe --collapse-progress en .kds-screen

CSS (calc() en 10+ propiedades)
  → clip-path, opacity, width, height, translateY, drop-shadow...
  → Todo GPU-accelerated, sin reflow
```

**Patrón wrapper:** `clip-path` recorta todo incluido `box-shadow`. Solución: el wrapper (`.kds-invoice-sticky-wrap`) lleva `position: sticky` + `filter: drop-shadow`, el card hijo lleva `clip-path`. El `drop-shadow` en el wrapper traza el contorno alfa del hijo recortado.

### Estructura HTML

```html
<!-- Wrapper: sticky positioning + shadow (fuera del clip-path) -->
<div class="kds-invoice-sticky-wrap">
  <article class="kds-card-elevated kds-invoice-sticky">
    <!-- Header — siempre visible -->
    <header class="kds-invoice-header">
      <div>
        <p class="kds-invoice-amount">$3.300</p>
        <p class="kds-invoice-code">Código fdap-sr2x-q3pf</p>
      </div>
      <div class="kds-invoice-merchant">
        <i class="material-symbols-outlined">storefront</i>
      </div>
    </header>

    <!-- Contenido colapsable — se recorta y desvanece al hacer scroll -->
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
          </dl>
        </div>
      </div>
    </div>
  </article>
</div>
```

**Requisitos del contexto:** El card debe estar dentro de un contenedor `.kds-screen.active` (el JS busca el sticky dentro de la pantalla activa para setear las variables CSS).

### JavaScript (automático)

El bundle de Khipu **inicializa automáticamente** el sticky header. No necesitas JavaScript adicional.

Si quieres inicializar manualmente (contenido cargado dinámicamente):

```javascript
window.Khipu.initStickyInvoice();
```

### Comportamiento (animación progresiva)

La animación es continua y proporcional al scroll (0–150px), no un toggle binario:

| Propiedad | Expandido (scroll=0) | Colapsado (scroll≥150px) |
|-----------|:---:|:---:|
| **Contenido colapsable** | Visible (opacity 1) | Invisible (opacity 0, clip-path lo oculta) |
| **Merchant tile** | 64×64px, radius 8px | 50×50px, radius 6px |
| **Merchant icon** | 30px | 24px |
| **Código margin-top** | 4px | 0px |
| **Shadow (wrapper)** | Invisible | `0 4px 12px rgba(…, 0.12)` |
| **Bottom border-radius** | 0 (edge-to-edge) | 14px (redondeado) |
| **Siblings translateY** | 0 | Suben para llenar el espacio |

### Clases CSS

| Clase | Descripción |
|-------|-------------|
| `.kds-invoice-sticky-wrap` | Wrapper: `position: sticky` + `filter: drop-shadow` |
| `.kds-invoice-sticky` | Card: `clip-path` progresivo, padding compacto |
| `.kds-invoice-header` | Header con monto, código y merchant |
| `.kds-invoice-amount` | Monto del pago (font-size se mantiene a 30px) |
| `.kds-invoice-code` | Código de operación |
| `.kds-invoice-merchant` | Tile de comercio (reduce tamaño progresivamente) |
| `.kds-invoice-collapsible` | Contenido que se desvanece y recorta |

### Mobile-only

| Viewport | Comportamiento |
|----------|---------------|
| **< 768px** | Animación activa, cards edge-to-edge (sin border-radius), header colapsable con rounded bottom + shadow |
| **≥ 768px** | Sin animación, cards con border-radius normal, todo visible |

### Tokens de diseño utilizados

```css
/* Tamaños merchant (progresivos) */
--kds-merchant-size: 64px;
--kds-merchant-size-collapsed: 50px;
--kds-merchant-radius: 8px;        /* var(--kds-radius-md) */
--kds-merchant-radius-collapsed: 6px;
--kds-merchant-icon-size: 30px;
--kds-merchant-icon-size-collapsed: 24px;

/* Card */
--kds-radius-card: 14px;           /* Bottom border-radius al colapsar */
--kds-shadow-sticky: 0 2px 10px rgba(16, 24, 40, 0.08);

/* Variables runtime (seteadas por JS en .kds-screen) */
--collapse-progress: 0;            /* 0 (expandido) a 1 (colapsado) */
--collapse-collapsible-h: 0px;     /* Altura medida del contenido colapsable */
```

---

## 🎯 QR Featured Button

Botón destacado para opciones de pago prioritarias con gradiente, badge y diseño visual enfatizado.

### Estructura HTML

```html
<button class="kds-qr-row">
  <!-- Avatar con icono -->
  <span class="kds-qr-avatar" aria-hidden="true">
    <i class="material-symbols-outlined">qr_code_2</i>
  </span>

  <!-- Texto principal -->
  <span class="kds-qr-text">
    <span class="title">Pagar escaneando QR</span>
    <span class="sub">Escanea con la app de tu banco</span>
  </span>

  <!-- Badge "Rápido" -->
  <span class="kds-qr-badge">Rápido</span>

  <!-- Chevron -->
  <i class="material-symbols-outlined">chevron_right</i>
</button>
```

### Características

- ✅ Fondo con gradiente (púrpura → azul)
- ✅ Avatar con icono y borde sutil
- ✅ Badge personalizable (ej: "Rápido", "Nuevo")
- ✅ Estados hover, focus, active
- ✅ Sombras sutiles con color primario
- ✅ Transiciones suaves

### Clases CSS disponibles

| Clase | Descripción |
|-------|-------------|
| `.kds-qr-row` | Botón principal con gradiente y espaciado |
| `.kds-qr-avatar` | Contenedor del icono (40x40px, borde redondeado) |
| `.kds-qr-text` | Wrapper del título y subtítulo |
| `.kds-qr-text .title` | Título principal (font-weight: 600, 14px) |
| `.kds-qr-text .sub` | Subtítulo descriptivo (12px, color secundario) |
| `.kds-qr-badge` | Badge pill (uppercase, 10px, fondo primario) |

### Tokens de diseño utilizados

```css
/* Gradiente y colores */
--kds-qr-bg-gradient: linear-gradient(135deg, #F7EEFF 0%, #EEF6FF 100%);
--kds-qr-border: rgba(131, 71, 173, 0.28);
--kds-qr-border-hover: var(--kds-color-primary-main);
--kds-qr-shadow: 0 1px 2px rgba(131, 71, 173, 0.08);
--kds-qr-shadow-hover: 0 2px 8px rgba(131, 71, 173, 0.14);

/* Avatar */
--kds-qr-avatar-bg: #FFFFFF;
--kds-qr-avatar-border: rgba(131, 71, 173, 0.2);
--kds-qr-avatar-radius: 10px;
--kds-status-icon-size-sm: 40px;  /* Tamaño del avatar */

/* Badge */
--kds-qr-badge-bg: var(--kds-color-primary-main);
--kds-qr-badge-text: #FFFFFF;
```

### Variantes

**Badge personalizado:**
```html
<span class="kds-qr-badge">Nuevo</span>
<span class="kds-qr-badge">Recomendado</span>
<span class="kds-qr-badge">Beta</span>
```

**Diferentes iconos:**
```html
<!-- Transferencia -->
<i class="material-symbols-outlined">payments</i>

<!-- Billetera digital -->
<i class="material-symbols-outlined">account_balance_wallet</i>

<!-- Código QR -->
<i class="material-symbols-outlined">qr_code_2</i>
```

### Cuándo usar

- ✅ Opciones de pago prioritarias o destacadas
- ✅ Métodos rápidos que quieres promover
- ✅ Features nuevas que necesitan visibilidad
- ❌ No usar para opciones estándar (usa `kds-bank-row` normal)

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
