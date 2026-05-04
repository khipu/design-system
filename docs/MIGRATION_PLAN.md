# Plan: Migración de Componentes BeerCSS → React (sin MUI)

## Contexto

El Design System Khipu tiene dos tracks paralelos:
- **React/MUI** (17 componentes `Kds*` que wrappean Material UI v7)
- **BeerCSS** (~40 componentes/familias con 150+ clases CSS, vanilla JS)

Ambos comparten tokens desde `src/tokens/index.ts`, pero BeerCSS tiene muchos más componentes y es la referencia visual actual. **La decisión es desechar MUI** y que los componentes React consuman directamente las clases CSS del bundle BeerCSS (`kds-*`), usando librerías headless (Radix UI) solo para comportamiento complejo.

### Qué cambia
- **Antes**: React → wrappea MUI → tema MUI aplica tokens → render
- **Después**: React → aplica clases `kds-*` del bundle CSS → Radix para comportamiento → render

### Por qué
- Un solo sistema visual (el CSS del bundle) para HTML y React
- Elimina la dependencia pesada de MUI (~300KB+ con emotion)
- Los componentes BeerCSS ya tienen el estilo correcto; duplicar en MUI theme es trabajo doble
- Facilita que cualquier cambio visual se haga una sola vez en el CSS

---

## Inventario: BeerCSS vs React

### Componentes que YA existen en React (17) → Se reescriben sin MUI
| React actual | BeerCSS equivalente | Acción |
|---|---|---|
| KdsButton | `.kds-btn` + variantes | Reescribir con clases CSS |
| KdsTextField | `.field.label.border` | Reescribir con clases CSS |
| KdsCheckbox | `.checkbox` | Reescribir con clases CSS |
| KdsRadioGroup | `.kds-radio-group` | Reescribir con clases CSS |
| KdsSelect | `.field select` | Reescribir + Radix Select |
| KdsCard | `.kds-card-elevated` | Reescribir con clases CSS |
| KdsModal | `dialog.modal` | Reescribir + Radix Dialog |
| KdsAlert | `.kds-alert` | Reescribir con clases CSS |
| KdsTypography | (no tiene clase directa) | Reescribir con tokens CSS |
| KdsTabs | `.kds-segmented-tabs` | Reescribir + Radix Tabs |
| KdsSpinner | (animación CSS) | Reescribir con clases CSS |
| KdsLinearProgress | (BeerCSS progress) | Reescribir con clases CSS |
| KdsChip | `.kds-badge` / chip | Reescribir con clases CSS |
| KdsSnackbar | snackbar BeerCSS | Reescribir con clases CSS |
| KdsTooltip | `.kds-info-tip` | Reescribir + Radix Tooltip |
| KdsAccordion | `.kds-expand-toggle/panel` | Reescribir + Radix Collapsible |
| KdsLogoHeader | (custom) | Reescribir con clases CSS |

### Componentes NUEVOS necesarios (no existen en React)

#### Core (reutilizables en cualquier contexto)
| Componente | Clase BeerCSS | Headless necesario |
|---|---|---|
| KdsStepper | `.kds-stepper` | No |
| KdsBottomSheet | `.kds-bottom-sheet` | Radix Dialog (sheet) |
| KdsPasswordStrength | `.kds-password-strength` | No |
| KdsExpandPanel | `.kds-expand-toggle/panel` | Radix Collapsible |
| KdsSegmentedTabs | `.kds-segmented-tabs` | Radix ToggleGroup |
| KdsStatusBlock | `.kds-status-block` | No |
| KdsCountdown | `.kds-countdown` | No (hook custom) |
| KdsLink | `.kds-link` | No |
| KdsCopyRow | `.kds-copy-row/list` | No (hook clipboard) |
| KdsCopyableTable | `.kds-copyable-table` | No (hook clipboard) |
| KdsCopyAllButton | `.kds-copy-all-btn` | No |
| KdsInfoTooltip | `.kds-info-tip` | Radix Tooltip |
| KdsSectionNote | `.kds-section-note` | No |
| KdsCardSelector | `.kds-card-selector` | No |
| KdsCardPlan | `.kds-card-plan` | No |
| KdsAmountRow | `.kds-amount-row` | No |
| KdsKvGrid | `.kds-kv` | No |
| KdsDivider | `.kds-hr` / `.kds-hr-dashed` | No |

#### Domain (específicos del flujo de pago Khipu)
| Componente | Clase BeerCSS | Headless necesario |
|---|---|---|
| KdsBankModal | `.kds-bank-modal` | Radix Dialog |
| KdsBankGrid | `.kds-bank-grid/item` | No |
| KdsBankRow | `.kds-bank-row` | No |
| KdsInvoiceSticky | `.kds-invoice-sticky` | No (hook scroll) |
| KdsQrRow | `.kds-qr-row` | No |
| KdsDetailList | `.kds-detail-list` | Radix Collapsible |
| KdsRecapSection | `.kds-recap-header/list` | No |
| KdsSidebar | `.kds-sidebar` | No |
| KdsLocaleSwitcher | `.kds-locale-switcher` | Radix DropdownMenu |
| KdsStageLayout | `.kds-stage` | No |

---

## Arquitectura Nueva

### Patrón de Componente (reemplaza el patrón MUI wrapper)

```tsx
// src/components/core/KdsButton/KdsButton.tsx
import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';  // ~228 bytes - para combinar clases

export interface KdsButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outlined' | 'text' | 'google';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  startIcon?: React.ReactNode;
}

export const KdsButton = forwardRef<HTMLButtonElement, KdsButtonProps>(
  ({ variant = 'primary', size, fullWidth, loading, className, children, disabled, startIcon, ...props }, ref) => (
    <button
      ref={ref}
      className={clsx(
        'kds-btn',
        `kds-btn-${variant}`,
        size && `kds-btn-${size}`,
        fullWidth && 'kds-btn-block',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="kds-spinner-inline" />}
      {startIcon && <span className="kds-icon">{startIcon}</span>}
      {children}
    </button>
  )
);
KdsButton.displayName = 'KdsButton';
```

### Para componentes con comportamiento complejo (Radix)

```tsx
// src/components/core/KdsModal/KdsModal.tsx
import * as Dialog from '@radix-ui/react-dialog';
import { clsx } from 'clsx';

export interface KdsModalProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const KdsModal = ({ open, onClose, title, children, footer, size = 'sm' }: KdsModalProps) => (
  <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
    <Dialog.Portal>
      <Dialog.Overlay className="kds-bank-modal-scrim" />
      <Dialog.Content className={clsx('kds-modal', size && `kds-modal-${size}`)}>
        {title && <Dialog.Title className="kds-modal-title">{title}</Dialog.Title>}
        <div className="kds-modal-body">{children}</div>
        {footer && <div className="kds-modal-footer">{footer}</div>}
        <Dialog.Close className="kds-modal-close">
          <i>close</i>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
```

### Estructura de archivos por componente

```
src/components/core/KdsButton/
├── KdsButton.tsx          # Componente
├── KdsButton.stories.tsx  # Storybook story
├── KdsButton.test.tsx     # Tests
└── index.ts               # Barrel export
```

---

## Dependencias: Qué entra, qué sale

### Se eliminan (eventualmente)
```json
{
  "@mui/material": "7.3.4",
  "@mui/icons-material": "7.3.4",
  "@emotion/react": "11.11.4",
  "@emotion/styled": "11.11.5"
}
```

### Se agregan
```json
{
  "@radix-ui/react-dialog": "^1.x",
  "@radix-ui/react-tooltip": "^1.x",
  "@radix-ui/react-collapsible": "^1.x",
  "@radix-ui/react-tabs": "^1.x",
  "@radix-ui/react-dropdown-menu": "^1.x",
  "@radix-ui/react-toggle-group": "^1.x",
  "@radix-ui/react-select": "^2.x",
  "clsx": "^2.x"
}
```
> Radix packages son tree-shakeable y pesan ~3-8KB cada uno (vs ~300KB de MUI+emotion)

### Iconos: Material Symbols via font (ya cargada en el bundle BeerCSS)
El bundle BeerCSS ya usa Material Symbols/Icons vía font. Los componentes React usarán `<i>icon_name</i>` igual que el HTML, eliminando la necesidad de `@mui/icons-material`. Para typing se puede crear un helper:

```tsx
// src/components/core/KdsIcon/KdsIcon.tsx
export const KdsIcon = ({ name, className, size }: { name: string; className?: string; size?: 'sm'|'md'|'lg' }) => (
  <i className={clsx(size && `kds-icon-${size}`, className)}>{name}</i>
);
```

---

## Storybook: Cambios necesarios

### Preview actualizado
```tsx
// .storybook/preview.tsx (simplificado sin MUI)
import '@khipu/design-system/beercss/css';  // Carga el bundle CSS completo
import '../src/tokens/css-variables.css';     // Variables CSS adicionales
```

### Sort order actualizado
```
['Brand', 'Core', 'Domain', 'Payment Flow', 'Onboarding', 'Examples']
```

---

## Estrategia de Transición

- **Reemplazo directo**: Los nuevos componentes usan los mismos nombres (`KdsButton`, `KdsModal`, etc.) con API similar. Breaking change controlado en version bump (ej: `0.2.0-alpha.1`).
- **Feature branch**: Todo el trabajo en rama `feat/react-beercss`. Merge a main cuando esté completo.
- **Las apps consumidoras** deberán: (1) cargar el CSS bundle, (2) actualizar imports si hay props que cambiaron, (3) eliminar `KhipuThemeProvider`.

---

## Plan de Ejecución por Fases

### Fase 0: Setup (~5 archivos)
- [ ] Instalar dependencias: `clsx`, Radix packages necesarios
- [ ] Crear archivo `src/components/core/utils.ts` (helpers: `clsx` re-export, `useCopyToClipboard` hook, etc.)
- [ ] Actualizar `.storybook/preview.tsx` para cargar BeerCSS CSS bundle
- [ ] Crear estructura `src/components/domain/` para componentes de pago
- [ ] Verificar que el bundle CSS se carga correctamente en Storybook

### Fase 1: Core Simples - Componentes sin headless (~12 componentes)
Componentes que solo necesitan HTML + clases CSS, sin Radix:

- [ ] **KdsButton** (reescribir) - ya tiene story
- [ ] **KdsAlert** (reescribir) - ya tiene story
- [ ] **KdsLink** (nuevo)
- [ ] **KdsDivider** (nuevo)
- [ ] **KdsStepper** (nuevo)
- [ ] **KdsStatusBlock** (nuevo)
- [ ] **KdsSectionNote** (nuevo)
- [ ] **KdsCardSelector** (nuevo)
- [ ] **KdsCardPlan** (nuevo)
- [ ] **KdsAmountRow** (nuevo)
- [ ] **KdsKvGrid** (nuevo)
- [ ] **KdsPasswordStrength** (nuevo)

### Fase 2: Core con Comportamiento - Hooks custom (~8 componentes)
Componentes que necesitan lógica JS pero no headless:

- [ ] **KdsTextField** (reescribir) - floating labels CSS
- [ ] **KdsCheckbox** (reescribir)
- [ ] **KdsRadioGroup** (reescribir)
- [ ] **KdsSpinner** (reescribir)
- [ ] **KdsLinearProgress** (reescribir)
- [ ] **KdsCountdown** (nuevo) - hook `useCountdown`
- [ ] **KdsCopyRow + KdsCopyList** (nuevo) - hook `useCopyToClipboard`
- [ ] **KdsCopyableTable + KdsCopyAllButton** (nuevo) - hook `useCopyToClipboard`

### Fase 3: Core con Radix (~8 componentes)
Componentes que necesitan Radix para accesibilidad y comportamiento:

- [ ] **KdsModal** (reescribir) - Radix Dialog
- [ ] **KdsBottomSheet** (nuevo) - Radix Dialog variant
- [ ] **KdsTooltip** (reescribir) - Radix Tooltip
- [ ] **KdsInfoTooltip** (nuevo) - Radix Tooltip
- [ ] **KdsTabs** (reescribir) - Radix Tabs
- [ ] **KdsSegmentedTabs** (nuevo) - Radix ToggleGroup
- [ ] **KdsAccordion / KdsExpandPanel** (reescribir) - Radix Collapsible
- [ ] **KdsSelect** (reescribir) - Radix Select

### Fase 4: Cards y Layout (~6 componentes)
- [ ] **KdsCard** (reescribir) - con sub-componentes
- [ ] **KdsLogoHeader** (reescribir) - con sub-componentes
- [ ] **KdsChip / KdsBadge** (reescribir)
- [ ] **KdsSnackbar** (reescribir) - puede usar Radix Toast
- [ ] **KdsTypography** (reescribir) - mapea a clases CSS
- [ ] **KdsIcon** (nuevo) - wrapper para Material Symbols font

### Fase 5: Domain - Componentes de Pago (~10 componentes)
- [ ] **KdsBankModal** - Radix Dialog + búsqueda
- [ ] **KdsBankGrid + KdsBankItem** - grid de bancos
- [ ] **KdsBankRow** - fila de banco en lista
- [ ] **KdsInvoiceSticky** - hook `useScrollCollapse`
- [ ] **KdsQrRow** - botón featured de pago
- [ ] **KdsDetailList** - lista expandible
- [ ] **KdsRecapSection** - sección resumen
- [ ] **KdsSidebar** - navegación lateral
- [ ] **KdsLocaleSwitcher** - Radix DropdownMenu
- [ ] **KdsStageLayout** - layout onboarding

### Fase 6: Limpieza y Migración
- [ ] Actualizar `src/index.ts` con todos los nuevos exports
- [ ] Actualizar `package.json`: eliminar MUI de dependencies, agregar Radix
- [ ] Actualizar `tsup` config si es necesario
- [ ] Deprecar `KhipuThemeProvider` (ya no necesario - CSS carga directo)
- [ ] Migrar todas las stories pendientes
- [ ] Actualizar documentación

---

## Resumen Cuantitativo

| Métrica | Valor |
|---|---|
| Componentes a reescribir (sin MUI) | 17 |
| Componentes nuevos (core) | ~18 |
| Componentes nuevos (domain) | ~10 |
| **Total componentes React** | **~45** |
| Hooks custom necesarios | ~4 (clipboard, countdown, scroll-collapse, expandable) |
| Radix packages necesarios | ~6 |
| Archivos nuevos estimados | ~135 (componente + story + test + index x 45) |
| Archivos modificados | ~10 (index.ts, package.json, storybook config, etc.) |
| Dependencias que se eliminan | 4 (MUI + Emotion) |
| Dependencias que se agregan | ~8 (Radix + clsx) |
| Reduccion bundle size estimada | ~250-300KB (MUI+Emotion → Radix ~30KB total) |

---

## Riesgos y Consideraciones

### Design System
1. **Clases CSS faltantes**: Algunos componentes React actuales (Typography variants, Card padding props) no tienen clase CSS equivalente en el bundle. Habrá que crearlas en `khipu-components.css` primero.
2. **CSS bundle obligatorio**: Las apps React DEBEN cargar `khipu-beercss.min.css`. Esto cambia el contrato de consumo.
3. **Dark mode**: Actualmente via MUI theme → nuevo approach via CSS custom properties en `:root` (ya soportado en tokens).
4. **Testing**: Los tests se simplifican (HTML + clases CSS en vez de MUI rendering).

---

## Verificación

### Design System
1. **Visual**: Comparar side-by-side en Storybook vs demo BeerCSS (`npm run beercss:dev`)
2. **Props**: Verificar que todas las variantes del CSS tienen prop equivalente en React
3. **Accesibilidad**: Verificar ARIA attributes (Radix los maneja automáticamente)
4. **TypeScript**: `npm run typecheck` pasa sin errores
5. **Tests**: `npm run test` pasa
6. **Build**: `npm run build` genera bundle correctamente
7. **Storybook**: `npm run storybook` muestra los componentes con estilos correctos

---

## Archivos Críticos

| Archivo | Rol |
|---|---|
| `src/beercss/customizations/khipu-components.css` | Fuente de verdad visual - todas las clases `kds-*` |
| `src/beercss/customizations/khipu-tokens.css` | Mapeo de tokens a variables BeerCSS |
| `src/beercss/customizations/khipu-init.js` | Comportamiento JS a replicar en React |
| `src/tokens/index.ts` | Tokens fuente de verdad |
| `src/tokens/css-variables.css` | Variables CSS generadas |
| `src/index.ts` | Exports principales del package |
| `src/components/core/index.ts` | Barrel export de componentes core |
| `.storybook/preview.tsx` | Configuración de Storybook |
| `package.json` | Dependencias y scripts |

---

## Findings & Notas (se actualiza durante la migración)

_Esta sección se irá llenando con descubrimientos durante la implementación._
