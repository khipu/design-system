# KTUF-175 — Logo de Khipu en ejemplos del DS + Secure Footer

**Fecha:** 2026-06-23
**Ticket:** [KTUF-175](https://khipucom.atlassian.net/browse/KTUF-175)
**Rama:** `feat/KTUF-175-logo-secure-footer`

## Actualización (2026-06-24) — cambió la dirección

Tras revisar un nuevo mockup (variantes SIN PSP / CON PSP), se ajusta el alcance:

1. **El header ya NO lleva logo de Khipu.** Se revierte la introducción del logo en headers y se quita el `kds-brand-row` de todos los ejemplos. En el diseño nuevo, arriba va el ícono del comercio, no la marca Khipu.
2. **El footer lleva el logo de Khipu a COLOR** (morado + cyan), no gris. El texto pasa a "Pago seguro procesado por" (sin la palabra "Khipu": la marca la aporta el logo, evitando duplicarla).
3. **El footer puede incluir un segundo logo de un PSP** (proveedor de pagos que contrata a Khipu), a la derecha del logo Khipu y separado por un divisor ("Khipu | klap"). Se modela como slot genérico: prop `psp?: ReactNode` en `KdsSecureFooter` (el consumidor pasa el logo del PSP; el DS no empaqueta logos de terceros). CSS: `.kds-secure-footer-sep` (divisor) y sizing de `img`/`.kds-psp-mark` a 11px.

El resto del documento (debajo) refleja la dirección original y se mantiene como contexto histórico.

## Problema

- Los ejemplos del DS no muestran consistentemente el logo de Khipu donde corresponde (headers de pantalla de pago).
- El `KdsSecureFooter` renderiza solo candado + texto; **falta el wordmark de Khipu** que sí aparece en las plantillas reales del *payment flow material* (`~/Code/payment`).

## Fuente de verdad

Plantillas del proyecto `payment` (consumen el bundle KDS BeerCSS):

- **Brand row (header público):** `<div class="kds-brand-row"><img src="logo/logo.svg"></div>` — logo full color (morado `#8347AD` + cyan `#3CB4E5`), SVG 45×15.
- **Secure footer** (`mat:secureFooter`): `<div class="kds-secure-footer"><svg class="kds-secure-footer-lock">…</svg> {label} <img class="khipu-mark" src="logo/khipu-logo-gray.png"></div>` — wordmark **gris** (icono + texto en gris).

## Hallazgo clave

Los assets correctos **ya existen** en el repo y son **byte-idénticos** a los de `payment`:

| Uso | Asset en DS | Igual a payment |
|-----|-------------|-----------------|
| Header (full color) | `src/assets/images/khipu-logo.svg` (45×15) | `logo/logo.svg` ✓ |
| Footer (gris) | `src/beercss/assets/khipu-logo-gray.png` | `logo/khipu-logo-gray.png` ✓ |

El CSS ya define `.kds-brand-row`, `.kds-secure-footer`, `.kds-secure-footer-lock` y `.kds-secure-footer .khipu-mark`. **El gap es de wiring/uso, no de assets.**

## Decisiones

1. **Embebido del logo en el componente React:** la build publicada es `tsup src/index.ts` **sin loader de imágenes** → importar un PNG/SVG en un componente publicado rompería la build. Se usa **SVG inline** con `fill="currentColor"`. El footer ya tiene `color: var(--kds-color-gray-400)`, así el wordmark hereda el gris; en `payment` el footer es íntegramente gris (wordmark + isotipo), por lo que coincide visualmente. Sin cambios de build, nítido y themeable.
2. **Logo del footer siempre visible por defecto** (decisión del usuario).
3. **Headers:** logo full color (`khipu-logo.svg`, ratio fijo) donde haya header; footer en gris.

## Cambios

### 1. `KdsSecureFooter` (componente React)
- Nuevo `KhipuWordmark` interno (SVG inline del wordmark, `fill="currentColor"`, `className="khipu-mark"`).
- Render por defecto: candado SVG (`.kds-secure-footer-lock`, fiel a `payment`) + label + `<KhipuWordmark/>`.
- Se mantienen las props `variant` (`default`/`inside`) y `children` (override opcional del label).

### 2. Headers full-color en ejemplos
- Auditar `Examples/` + `Patterns/` con header/brand-row → asegurar `khipu-logo.svg` full color, bien alineado (`.kds-brand-row` ya posiciona).
- `TerminalScreens` ya OK; revisar `PaymentFlowReact`, `PaymentSummary`, `LayoutPatterns`, `CssOnlyPatterns`.

### 3. Stories del footer
- Muestran el logo gris automáticamente al cambiar el default.

### 4. Patrón CSS-only del footer
- Incluir el markup del `khipu-mark` para que el ejemplo no-React también lo muestre.

## Verificación

- Storybook: stories del footer + pantallas de ejemplo (logo presente y alineado, gris en footer / full color en header).
- Tests del `KdsSecureFooter`.
- `npm run build` (confirmar que no rompe).
- Publicar nueva alpha del DS (con confirmación del usuario).

## Fuera de alcance

- No se agregan assets nuevos ni se cambia la build.
- No se agrega logo a stories de componentes sueltos (solo donde hay header/footer).

---

## Layout del payment flow (estado final)

Estructura del shell (todas las pantallas de pago):

```
.kds-payment-stage          → fondo MUTED (var(--kds-color-background-muted) = #F4F4F7),
                              full-viewport, centra el contenido. El fondo muted es lo que
                              hace que las cards blancas y el gap entre ellas se distingan.
  .kds-payment-flow          → columna angosta (max-width 448px), flex-col, gap spacing-3
    .kds-screen              → flex-col, gap spacing-3; contiene:
      .kds-invoice-sticky    → CARD 1 (header del cobro)
      .kds-card-elevated     → CARD 2 (body / contenido de la pantalla)
      .kds-secure-footer     → footer (desktop: fuera de la card, adyacente)
```

**Dos cards** (header + body) separadas por el gap, sobre fondo muted → se distingue el espaciado.

**Header del cobro (`.kds-invoice-sticky`):**
- NO lleva logo de Khipu (antes había `.kds-brand-row` / `.kds-brand-inner`; se quitaron). Arriba-derecha va el merchant tile (ícono del comercio).
- Monto (`.kds-invoice-amount`) + código (`.kds-invoice-code`): el **label** ("CÓDIGO") va en mayúscula (text-transform del contenedor), el **valor** en minúscula → envolver el valor en `.kds-invoice-code-value--lowercase`.
- **Mobile**: colapso por scroll. El wrapper `.kds-invoice-sticky-wrap` es `position: sticky`. Una variable `--collapse-progress` (0→1, seteada por JS según scroll) maneja: clip-path que oculta el `.kds-invoice-collapsible` (visual, sin cambiar layout), merchant tile 64→50px, amount 3xl→2xl, y el header se compacta y centra. Las vars `--collapse-progress` / `--collapse-collapsible-h` se setean en `.kds-screen`.

**Detalle expandido (`.kds-detail-list` dentro de `.kds-expand-panel`):**
- Grupos `.kds-detail-group` (label + value apilados). Separación entre grupos y arriba del primero = **spacing-2** (gap + padding-top). Sin `margin-bottom` en el grupo (evita doble espaciado).

**Secure footer (`.kds-secure-footer`):**
- Candado SVG + "Pago seguro procesado por" + **logo Khipu a color** + (opcional) **PSP** (`Khipu | klap`, vía slot `psp`).
- El texto NO incluye "Khipu" (lo aporta el logo).
- **Desktop**: variante `default`, FUERA de la card (adyacente, sin gap flotante). **Mobile**: variante `inside`, dentro de la card.

## Peculiaridades encontradas (gotchas del DS)

1. **`--kds-color-background-default` y `-paper` son ambos `#FFFFFF`.** Card blanca sobre fondo blanco = se funden. Para distinguir cards hay que dar fondo muted al contenedor (`--kds-color-background-muted`).
2. **BeerCSS impone `min-height` al elemento `header`.** Se filtra a `.kds-invoice-header` (nuestra regla compound no lo sobreescribía) → al colapsar el merchant tile (50px) quedaba un `min-height: 64px` fijo con hueco muerto. Fix: `min-height: 0` para que el header se ajuste al contenido.
3. **La clase `.is-collapsed` no la setea ningún JS.** La regla `.kds-invoice-sticky.is-collapsed .kds-invoice-header { align-items: center }` estaba muerta (ni PaymentFlowReact ni `khipu-init.js` agregan la clase). Se reemplazó por centrado CSS-only en mobile (no depende de JS).
4. **`.kds-invoice-code` tiene `text-transform: uppercase`** que uppercasea label Y valor. El valor (código de operación) debe ir en minúscula → `.kds-invoice-code-value--lowercase` (clase que ya existía; `payment` la activa con el flag `lowercase` del taglib `mat:paymentAmount`).
5. **Doble espaciado en listas:** `.kds-detail-list` tenía `gap` + `.kds-detail-group` tenía `margin-bottom` → se sumaban. Usar una sola fuente de espaciado.
6. **`KdsButton fullWidth` solo agrega la clase `.kds-btn-block`** (no `width:100%` inline). El ancho 100% depende 100% de que el CSS del DS esté cargado/aplicado — relevante para bugs de prod donde el CSS viene de CDN.
7. **`KdsScope` usa `display: contents`** — el `gap`/CSS atraviesa el wrapper, pero el `align-items`/`min-height` del contenedor real (no del scope) es lo que manda.
8. **El logo del footer va inline como SVG** (no `<img>` de un asset binario) porque la build publicada con `tsup` no tiene loader de imágenes; importar un PNG/SVG en un componente publicado rompería la build.
