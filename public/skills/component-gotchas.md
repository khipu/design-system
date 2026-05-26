# Khipu Design System — Component Gotchas & Patterns

Documentación de patrones críticos y bugs frecuentes en los componentes del Khipu Design System, para uso por MCP y otros agentes IA al generar/modificar UI.

**Regla principal**: cuando un componente React envuelve un elemento HTML que BeerCSS estiliza globalmente (`button`, `input`, `select`, `i`, `progress`, `.field`, `.snackbar`, etc.), debes:

1. Revisar las reglas que BeerCSS aplica al elemento base (`node_modules/beercss/dist/cdn/beer.css`)
2. Sobreescribir explícitamente las que rompan tu layout (display, sizing, align-items, etc.)
3. Matchear el markup que usa la taglib `mat:*` de producción payment (`grails-app/taglib/com/khipu/ui/MaterialTagLib.groovy`)

---

## Gotchas por componente

### KdsButton

- ✅ Loading spinner: usa `<progress class="circle indeterminate small">` — NO `<span class="loader">` (esa clase no existe en CSS).
- ✅ Tiene `startIcon` y `endIcon` props.

### KdsCheckbox / KdsRadioGroup

- Markup correcto (matchea taglib `mat:checkBox`):
  ```html
  <label class="checkbox"><input type="checkbox"><span>Label</span></label>
  ```
- **NO uses `class="field"`** — eso es para text inputs, no checkboxes/radios.
- **NO agregues `htmlFor` al label** — el `<input>` está adentro del `<label>`, asociación implícita es suficiente.
- BeerCSS renderiza el sprite vía `::before { content: "check_box_outline_blank" }` usando Material Symbols Outlined. Requiere la fuente cargada.

### KdsAlert

- Close button usa `class="kds-alert-close"` (icon-only 28×28 circular), **NO `class="kds-btn"`** — eso rompía el flex layout y mostraba texto vertical.
- Icon prefix automático por severity: info → `info`, success → `check_circle`, warning → `warning`, error → `error`. Overridable con prop `icon` (string custom o `false` para ocultar).

### KdsChip (deletable)

- Close button usa `class="kds-badge-close"` (icon-only 16×16 circular), **NO `kds-btn-text`** — eso lo hacía desproporcionado.
- Container es `inline-flex` con `gap: 4px`.

### KdsCopyRow

- El ROW ENTERO es el botón clickeable (`<button class="kds-copy-row">`).
- Markup oficial (de `src/beercss/demo/payment-components.html`):
  ```html
  <button class="kds-copy-row" data-copy="value">
    <i class="material-symbols-outlined">content_copy</i>  <!-- IZQUIERDA -->
    <div>
      <span class="kds-copy-row-label">LABEL</span>
      <span class="kds-copy-row-value">Value</span>
    </div>
    <span class="kds-copy-toast"><i>check_circle</i> Copiado</span>
  </button>
  ```
- Toast usa `check_circle`, no `check`.
- **Requiere ancho mínimo ~360px** o el toast (position absolute right) se superpone al label/value.
- En stories: envolver en `<div className="kds-copy-list" style={{ width: 360 }}>` (flex-column con stretch que hace que el button-row tome el ancho del wrapper).

### KdsCopyableTable

- Markup correcto: `.kds-copyable-table > .kds-copyable-table-row > span.k + span.v`.
  **NO uses** `kds-copyable-table-label`/`kds-copyable-table-value` — esas clases no existen.
- Cada row es clickeable individualmente (copia el `value`). El botón "Copiar todo" copia todas y aplica `.copied` a TODAS las rows.
- Para evitar hover-flicker post-copy: usa un estado `settling` que se aplica brevemente (300ms = duración del transition) después de quitar `.copied`. El CSS suprime `:hover` cuando está en `.copied` o `.settling`.
- Transición CSS: `280ms cubic-bezier(0.2, 0.8, 0.2, 1)` (no `0.12s ease` que era abrupto).

### KdsModal — ELIMINADO

- **Usar `KdsBottomSheet`** (domain). KdsModal fue absorbido en BottomSheet.
- Props soportados: `title`, `description`, `actions`, `showGrabber` (default true), `showCloseButton` (default false).
- El scrim DEBE llevar la clase `.open` SIEMPRE (Radix maneja mount/unmount). Sin `.open` queda `display: none` invisible.

### KdsSnackbar

- Matchea el markup de `khipu-init.js → initFlashMessages()`:
  ```html
  <div class="snackbar active info" data-auto-dismiss="true"
       style="--kds-snackbar-duration: 5000ms">
    <i class="material-symbols-outlined">info</i>
    <span class="max">Mensaje</span>
    <button class="kds-snackbar-close"><i>close</i></button>
  </div>
  ```
- Progress bar se anima vía `::after` con `--kds-snackbar-duration`. Pasar `duration={0}` lo desactiva.
- `<span class="max">` (no plain span) — `.max` hace flex grow.
- Iconos default por type: info→`info`, success→`check_circle`, error→`error`.
- **Storybook preview**: `.snackbar` es `position: fixed` por default → escapa al viewport. Override en stories con:
  ```css
  position: relative;
  inset: auto;
  transform: none;
  inline-size: auto;
  ```

### KdsSpinner

- Usa `<progress class="circle indeterminate [small|large]">` — NO `<span class="loader">`.
- Tamaños BeerCSS: small=1.5rem, default=2.5rem, large=3.5rem.

### KdsStatusBlock

- **Pending**: SIN icon, solo el spinner CSS (border-top color blue). El JSX no debe pasar `icon` prop.
- **Info**: usa `icon="info_i"` (la i minúscula sin círculo built-in) para que solo se vea el círculo decorativo del DS.
- **Error**: usa `icon="close"` (X sin círculo built-in). **NO uses `icon="error"`** — ese tiene círculo built-in y causa doble círculo.
- **Success**: `icon="check"`.
- **Warn**: `icon="priority_high"` o `icon="warning"` (sin círculo built-in).
- Regla general: para evitar doble círculo, usa iconos SIN círculo built-in en su glyph.

### KdsStepper

- API: `steps: string[]` (array de labels) y `current: number` (0-based index).
- Markup correcto (matchea `mat:stepper`):
  ```html
  <div class="kds-stepper">
    <div class="kds-step [completed|current]">
      <div class="kds-step-indicator"></div>   <!-- VACÍO, número/check via CSS -->
      <div class="kds-step-label">Label</div>
    </div>
  </div>
  ```
- La línea conectora horizontal es `::before` del stepper (NO un `<div>`).
- Checkmark de completed viene de `::after { content: "check" }` en el indicator.
- Requiere container ≥320px para verse correctamente.

### KdsSelect

- Native `<select>` wrapped en `.field.label.border [prefix] [invalid]`.
- API:
  ```tsx
  <KdsSelect
    label="Banco"
    options={[{ value: 'bci', label: 'BCI' }]}
    placeholder="Selecciona..."  // = noSelection del taglib
    value={value}
    onChange={(e) => setValue(e.target.value)}
    error={hasError}
    helperText="..."
    prefixIcon="account_balance"
    required
  />
  ```
- **NO uses Radix Select** — fue reemplazado por `<select>` nativo para matchear el taglib.

### KdsTabs

- Solo existe la variante **segmented** — la variante "standard" fue eliminada (no tenía CSS en el DS).
- `KdsSegmentedTabs` se mantiene como alias semántico.
- Markup: `<div class="kds-segmented-tabs" role="tablist"><button class="active" role="tab">`.

### KdsTextField

- **El componente NO acepta prop `placeholder`** — lo controla internamente como `placeholder=" "` (un espacio) para el truco floating-label de BeerCSS.
- Si necesitas un hint, usa `helperText` (aparece debajo del field).
- **Cuando hay `startIcon`** el wrapper recibe `.prefix` (alinea label correctamente).
- **Cuando hay `endIcon` o `readOnly`** el wrapper recibe `.suffix`.
- `required` agrega `*` al label.

### KdsTooltip

- Usa Radix Tooltip (no BeerCSS `[data-tooltip]`) para a11y completa (focus + portal + collision detection).
- CSS personalizado en `.kds-tooltip` + `.kds-tooltip-arrow` (animación direccional 240ms cubic-bezier).

### KdsCardPlan

- Padding `var(--kds-spacing-2)` (16px) — NO 32px.
- Price usa `class="kds-price"` (font-size `--kds-font-size-4xl`) y `class="kds-price-period"`.
- Badge "Recomendado" es **inline** dentro del card (después del precio), NO `position: absolute`.
- Todas las cards tienen `min-width: 260px` + `align-self: stretch` (mismo alto en grid).

### KdsCardSelector

- **CRÍTICO**: se renderiza como `<button>`. BeerCSS aplica al button base estilos que rompen el layout:
  - `display: inline-flex` (cambia a row)
  - `block-size: 2.5rem` (40px de alto — comprime el contenido)
  - `align-items: center` + `justify-content: center` (centra el contenido)
  - `background: var(--primary)` (purple)
- Reglas a override en `.kds-card-selector`:
  ```css
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  block-size: auto;
  inline-size: 100%;
  text-align: left;
  ```

---

## Pattern general para componentes React que envuelven `<button>` u otros elementos BeerCSS-stylizados

```css
.kds-my-component {
    /* === Reset BeerCSS button defaults === */
    display: flex;             /* en vez de inline-flex */
    flex-direction: column;    /* en vez de row default */
    align-items: stretch;      /* en vez de center */
    justify-content: flex-start;
    block-size: auto;          /* en vez de 2.5rem */
    inline-size: 100%;
    text-align: left;
    line-height: 1.5;

    /* === Tus estilos custom === */
    padding: var(--kds-spacing-3);
    background: var(--kds-color-background-paper);
    /* ... */
}
```

## Stories preview gotchas

| Componente | Issue | Fix |
|---|---|---|
| `KdsSnackbar` | `position: fixed` → escapa al viewport | Decorator con `inlineStyle: { position: relative; inset: auto; transform: none; inline-size: auto }` |
| `KdsCopyRow` | Toast position-absolute se superpone al label/value en row angosto | Decorator: `<div className="kds-copy-list" style={{ width: 360 }}>` |
| `KdsStepper` | Línea conectora invisible en preview angosto | Decorator: `<div style={{ width: '100%', maxWidth: 560 }}>` |
| Cualquier componente con `<button>` BeerCSS-stylizado | Sprites/iconos faltan en Storybook | Asegurar Material Symbols Outlined cargado en `preview-head.html` |

## Convenciones de iconos para evitar "doble círculo" en KdsStatusBlock

Usa estos iconos que NO tienen círculo built-in en su glyph (el círculo decorativo lo provee `.kds-status-block-icon`):

| Status | Icon |
|---|---|
| `success` | `check` |
| `info` | `info_i` (i minúscula) |
| `error` | `close` |
| `warn` | `priority_high` o `warning` |
| `pending` | sin icon (solo spinner del CSS) |

**NO uses**: `info`, `error`, `cancel`, `check_circle` para status block — todos tienen círculo built-in.
