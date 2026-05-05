# React → BeerCSS Migration Design Spec

**Date:** 2026-04-30
**Status:** Approved
**Version target:** 0.2.0-alpha.1

---

## 1. Problem Statement

The Khipu Design System has two parallel visual implementations:

- **React (MUI)**: 17 components wrapping Material UI, styled via Emotion CSS-in-JS + MUI theme overrides
- **BeerCSS (Vanilla)**: 200+ CSS classes (`kds-*`) + vanilla JS, used in Grails/HTML apps

Both consume the same design tokens, but produce **different visual output** because MUI applies its own component-level styling (ripple effects, elevation, padding, typography) that diverges from BeerCSS's Material Design 3 implementation.

### Goals

1. **Visual parity**: React components render identically to BeerCSS HTML
2. **Bundle size reduction**: Eliminate ~300KB MUI + Emotion overhead
3. **Single source of truth**: All visual styling lives in the CSS bundle (`khipu-components.css`)
4. **Component expansion**: React gets all components that BeerCSS already has

---

## 2. Architecture

### Before

```
React Component → wraps MUI Component → MUI Theme (Emotion CSS-in-JS) → Visual Output
                                          ↑
                                    tokens/index.ts
```

### After

```
React Component → HTML nativo + clases kds-* → khipu-beercss.min.css → Visual Output
       ↓ (only Modal, Select, Tooltip)            ↑
    Radix UI primitives                      tokens/index.ts
```

### Core Principle

React components render **exactly the same HTML** as the BeerCSS demos. A `<KdsButton variant="primary">` produces:

```html
<button class="kds-btn kds-btn-primary">...</button>
```

Identical to hand-written HTML in a Grails/HTML page.

### Consequence

The CSS bundle (`khipu-beercss.min.css`) becomes **mandatory** for React consumers. No more embedded styles via Emotion.

### Class Composition

Uses `clsx` (already in `utils.ts`) for conditional class combination:

```tsx
className={clsx('kds-btn', `kds-btn-${variant}`, fullWidth && 'kds-btn-block', className)}
```

---

## 3. Dependency Changes

### Removing

- `@mui/material` (~250KB)
- `@mui/icons-material` (~50KB)
- `@emotion/react` + `@emotion/styled`

### Adding

- `@radix-ui/react-dialog` (~8KB) — for KdsModal / KdsBottomSheet
- `@radix-ui/react-select` (~12KB) — for KdsSelect
- `@radix-ui/react-tooltip` (~5KB) — for KdsTooltip
- `clsx` (already exists)

### Net impact: ~300KB removed, ~25KB added

---

## 4. Theming (Merchant Customization)

### KdsThemeProvider (replaces KhipuThemeProvider)

Lightweight provider using CSS custom properties instead of MUI `createTheme()`:

```tsx
export function KdsThemeProvider({ primaryColor, children }: KdsThemeProps) {
  const style = primaryColor ? {
    '--primary': primaryColor,
    '--on-primary': getContrastColor(primaryColor),
    '--primary-container': lighten(primaryColor, 0.85),
  } as React.CSSProperties : undefined;

  return <div className="kds-theme-root" style={style}>{children}</div>;
}
```

CSS custom properties cascade naturally — any `var(--primary)` inside the `<div>` picks up the merchant override. This is exactly what BeerCSS already supports via Material Dynamic Colors.

**Utility functions** (`getContrastColor`, `lighten`) are lightweight pure functions (~20 lines each) that compute derived colors from the merchant primary. They will be implemented in `src/components/core/utils.ts` using simple HSL math — no external color library needed. BeerCSS's Material Dynamic Colors (`material-dynamic-colors` package, already in the bundle) can also be leveraged for more sophisticated palette generation if needed.

### Iframe Loading (khenshin-web)

The `@khipu/design-system` package exports CSS as a separate file. How each consumer loads it is their decision:

- **khenshin-web**: Build tool (e.g., `vite-plugin-css-injected-by-js`) embeds CSS into the JS bundle, which auto-injects a `<style>` tag when executed inside the iframe
- **Standard apps**: `<link>` tag or CSS `@import`
- **npm import**: `import '@khipu/design-system/beercss/css'`

---

## 5. Component Categorization

### Approach: Hybrid Selective

Radix UI **only** for the 3 components where accessibility is genuinely complex. Everything else uses native HTML + `kds-*` classes + lightweight hooks.

### Category A: Pure HTML + `kds-*` Classes (~15 components)

Components that are fundamentally HTML elements with styling:

| Component | HTML Base | BeerCSS Classes |
|---|---|---|
| KdsButton | `<button>` | `kds-btn kds-btn-{variant}` |
| KdsCard (+Header, Content, Actions) | `<article>` | `kds-card-elevated` |
| KdsAlert | `<div role="alert">` | `kds-alert kds-{severity}` |
| KdsTypography | `<p>`, `<h1>`-`<h6>`, `<span>` | `kds-text-*` |
| KdsChip | `<span>` | `kds-badge {color}` |
| KdsLinearProgress | `<div>` (wrapper + bar) | BeerCSS `progress` |
| KdsSpinner | `<div>` | BeerCSS `loader` |
| KdsCheckbox | `<input type="checkbox">` + `<label>` | BeerCSS `field` |
| KdsRadioGroup | `<fieldset>` + `<input type="radio">` | BeerCSS `field` |
| KdsTextField | `<div class="field label border">` + `<input>` + `<label>` | BeerCSS `field label border` (floating label pattern) |
| KdsDivider | `<hr>` | `kds-hr` / `kds-hr-dashed` |
| KdsBadge | `<span>` | `kds-badge {color}` |
| KdsSectionNote | `<p>` | `kds-section-note` |
| KdsStatusBlock | `<div>` | `kds-status-block` |
| KdsStepper | `<div>` | `kds-stepper` |
| KdsLogoHeader | composition of `<div>`s | `kds-brand-row` |

### Category B: HTML + Custom Hook (~8 components)

Components with interactivity solved by a hook:

| Component | Hook | Purpose |
|---|---|---|
| KdsTabs (+Tab, TabPanel) | `useTabsKeyboard` | Arrow navigation, `aria-selected`, `role="tablist"` |
| KdsAccordion | native `<details>`/`<summary>` | Native collapsible — no hook needed |
| KdsSnackbar | `useAutoHide(duration)` | Auto-dismiss timer + visibility |
| KdsCopyRow | `useCopyToClipboard` | Clipboard API + "copied" state |
| KdsCopyableTable | `useCopyToClipboard` | Reuses same hook |
| KdsCountdown | `useCountdown(deadline)` | Timer with hh:mm:ss + "urgent" state |
| KdsExpandPanel | `useToggle` | Open/closed state + `aria-expanded` |
| KdsSegmentedTabs | `useTabsKeyboard` | Reuses Tabs hook |

### Category C: Radix UI (~3 components)

| Component | Radix Package | Why Radix |
|---|---|---|
| KdsModal / KdsBottomSheet | `@radix-ui/react-dialog` | Focus trap, scroll lock, portal, escape key, `aria-modal` |
| KdsSelect | `@radix-ui/react-select` | Combobox ARIA pattern, typeahead, keyboard nav, auto-positioning |
| KdsTooltip | `@radix-ui/react-tooltip` | Intelligent positioning (flip/shift), delay management |

### Category D: Domain Components (~10 components, new)

Components that exist in BeerCSS but not in React:

| Component | HTML Base | BeerCSS Classes |
|---|---|---|
| KdsBankRow | `<button>` | `kds-bank-row` |
| KdsBankList | `<div>` | `kds-bank-list` |
| KdsBankModal | Radix Dialog + custom content | `kds-bank-modal` |
| KdsQrRow | `<button>` | `kds-qr-row` |
| KdsInvoiceSticky | `<article>` | `kds-invoice-sticky` |
| KdsCardSelector | `<button>` | `kds-card-selector` |
| KdsCardPlan | `<div>` | `kds-card-plan` |
| KdsBottomSheet | Radix Dialog (variant) | `kds-bottom-sheet` |
| KdsSecureFooter | `<div>` | `kds-secure-footer` |
| KdsRecapList | `<ul>` | `kds-recap-list` |

### Totals

| Category | Components | External Dependency |
|---|---|---|
| A: Pure HTML | ~16 | none |
| B: HTML + Hook | ~8 | none |
| C: Radix | 3 (+1 BankModal reuses Dialog) | 3 Radix packages (~25KB) |
| D: Domain | ~10 | none (or reuses Radix Dialog) |
| **Total** | **~37** | **3 packages** |

---

## 6. Implementation Patterns

### Category A — Pure HTML (example: KdsButton)

```tsx
import { forwardRef } from 'react';
import { clsx } from '../utils';

export interface KdsButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outlined' | 'text' | 'success';
  size?: 'sm' | 'md';
  fullWidth?: boolean;
  loading?: boolean;
  startIcon?: string;  // Material Symbols name, e.g., "download"
}

export const KdsButton = forwardRef<HTMLButtonElement, KdsButtonProps>(
  ({ variant = 'primary', size, fullWidth, loading, startIcon, children, className, disabled, ...props }, ref) => (
    <button
      ref={ref}
      className={clsx('kds-btn', `kds-btn-${variant}`, size && `kds-btn-${size}`, fullWidth && 'kds-btn-block', className)}
      disabled={disabled || loading}
      {...props}
    >
      {startIcon && <span className="kds-icon"><i className="material-symbols-outlined">{startIcon}</i></span>}
      {loading ? <span className="loader small" /> : <span>{children}</span>}
    </button>
  )
);
```

### Category B — HTML + Hook (example: KdsCopyRow)

```tsx
function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }, []);
  return { copied, copy };
}

export const KdsCopyRow = forwardRef<HTMLDivElement, KdsCopyRowProps>(
  ({ label, value, className, ...props }, ref) => {
    const { copied, copy } = useCopyToClipboard();
    return (
      <div
        ref={ref}
        className={clsx('kds-copy-row', copied && 'copied', className)}
        data-copy={value}
        onClick={() => copy(value)}
        role="button"
        tabIndex={0}
        {...props}
      >
        <span className="k">{label}</span>
        <span className="v">{value}</span>
      </div>
    );
  }
);
```

### Category C — Radix (example: KdsModal)

```tsx
import * as Dialog from '@radix-ui/react-dialog';

export const KdsModal = forwardRef<HTMLDivElement, KdsModalProps>(
  ({ open, onClose, title, children, actions, className, ...props }, ref) => (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose?.()}>
      <Dialog.Portal>
        <Dialog.Overlay className="kds-bottom-sheet-scrim" />
        <Dialog.Content ref={ref} className={clsx('kds-bottom-sheet', className)} {...props}>
          <div className="kds-bottom-sheet-grabber" />
          {title && <Dialog.Title className="kds-bottom-sheet-title">{title}</Dialog.Title>}
          {children}
          {actions && <div className="kds-bottom-sheet-actions">{actions}</div>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
);
```

**Note on Radix ↔ BeerCSS:** Radix renders overlay and content as portals. The `kds-*` classes apply directly to Radix elements. This works because Radix doesn't inject its own classes — only behavior.

### Category D — Domain (example: KdsBankRow)

```tsx
export const KdsBankRow = forwardRef<HTMLButtonElement, KdsBankRowProps>(
  ({ name, logo, secondaryText, badge, onClick, className, ...props }, ref) => (
    <button ref={ref} className={clsx('kds-bank-row', className)} onClick={onClick} {...props}>
      <span className={clsx('kds-bank-row-logo', logo.type === 'initials' && 'initials')}
            style={logo.type === 'initials' ? { background: logo.color } : undefined}>
        {logo.type === 'initials' ? logo.text : <img src={logo.src} alt="" />}
      </span>
      <span className="kds-bank-row-name">
        {name}
        {secondaryText && <span className="kds-text-secondary"> {secondaryText}</span>}
      </span>
      {badge && <span className="kds-badge primary">{badge}</span>}
      <i className="material-symbols-outlined">chevron_right</i>
    </button>
  )
);
```

### File Structure Per Component

```
src/components/core/
├── KdsButton/
│   ├── KdsButton.tsx
│   ├── KdsButton.test.tsx
│   └── index.ts
├── hooks/
│   ├── useCopyToClipboard.ts
│   ├── useCountdown.ts
│   ├── useTabsKeyboard.ts
│   └── useAutoHide.ts
└── utils.ts
```

---

## 7. Storybook Changes

### Preview Configuration

Replace MUI ThemeProvider with direct CSS bundle loading:

```tsx
// .storybook/preview.tsx
import '@khipu/design-system/beercss/css';

const preview: Preview = {
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="kds-theme-root">
        <Story />
      </div>
    ),
  ],
};
```

### Story Organization

```
Brand/           → Brand documentation (unchanged)
Core/            → Migrated components (Button, Card, Alert, etc.)
Domain/          → New domain components (BankRow, InvoiceSticky, etc.)
Hooks/           → Custom hooks documentation (useCopyToClipboard, etc.)
```

---

## 8. Testing Strategy

**Tools:** Vitest + Testing Library (unchanged).

Tests simplify significantly — no MUI theme mocking needed:

```tsx
// Before (with MUI)
render(
  <KhipuThemeProvider>
    <KdsButton variant="contained">Click</KdsButton>
  </KhipuThemeProvider>
);

// After (without MUI)
render(<KdsButton variant="primary">Click</KdsButton>);
expect(screen.getByRole('button')).toHaveClass('kds-btn', 'kds-btn-primary');
```

### What gets tested

- Correct CSS classes based on props (clsx logic)
- ARIA attributes and accessibility
- Events (onClick, onChange, etc.)
- Custom hooks (clipboard, countdown, auto-hide)
- Radix integration (Modal open/close, focus trap)

### What does NOT get tested

- Visual styles (covered by CSS bundle + Storybook visual inspection)

---

## 9. Execution Phases

### Phase 0: Setup

- Add Radix dependencies
- Create lightweight `KdsThemeProvider` (CSS custom properties)
- Update `.storybook/preview.tsx` to load CSS bundle
- Create base hooks (`useCopyToClipboard`, `useCountdown`, `useTabsKeyboard`, `useAutoHide`)
- Audit `khipu-components.css` for missing classes; create any needed

### Phase 1: Pure HTML Components (Cat. A)

Migrate simplest components first:

1. KdsButton
2. KdsAlert
3. KdsTypography
4. KdsChip / KdsBadge
5. KdsLinearProgress
6. KdsSpinner
7. KdsCheckbox
8. KdsRadioGroup
9. KdsTextField
10. KdsCard (+ Header, Content, Actions)
11. KdsDivider
12. KdsLogoHeader

**Checkpoint:** All Cat. A components have stories and tests. Storybook shows visual output identical to BeerCSS demos.

### Phase 2: Components with Hooks (Cat. B)

1. KdsTabs (+ Tab, TabPanel)
2. KdsAccordion
3. KdsSnackbar
4. KdsCopyRow
5. KdsCopyableTable
6. KdsExpandPanel
7. KdsCountdown
8. KdsSegmentedTabs

**Checkpoint:** Hooks unit-tested. Interactive components verified in Storybook.

### Phase 3: Radix Components (Cat. C)

1. KdsModal / KdsBottomSheet
2. KdsSelect
3. KdsTooltip

**Checkpoint:** Focus trap, keyboard nav, and positioning verified in Storybook.

### Phase 4: Domain Components (Cat. D)

1. KdsBankRow + KdsBankList
2. KdsBankModal (reuses Radix Dialog)
3. KdsQrRow
4. KdsCardSelector + KdsCardPlan
5. KdsInvoiceSticky
6. KdsStatusBlock + KdsStepper
7. KdsSecureFooter + KdsRecapList

**Checkpoint:** All payment flow components have React equivalents.

### Phase 5: Cleanup

- Remove MUI + Emotion dependencies from `package.json`
- Remove MUI re-exports (`Box`, `Grid`, `Stack`, icons)
- Remove `src/theme/` (MUI ThemeProvider, MUI theme)
- Update `src/index.ts` with new exports
- Update documentation
- Version bump to `0.2.0-alpha.1` (breaking change)

### Cross-cutting: Missing CSS Classes

Throughout all phases, if a React component needs a `kds-*` class that doesn't exist in `khipu-components.css`, **create it in the CSS bundle first**, then use it in React. This maintains the rule that CSS is the source of truth.

Known potentially missing classes:
- `KdsTypography` — needs `kds-text-display1`, `kds-text-heading1`, etc.
- `KdsTextField` — verify `field.label.border` covers all states (error, helperText, adornments)
- `KdsLinearProgress` — verify progress class in BeerCSS

---

## 10. Breaking Changes & Consumer Migration

### Version: 0.2.0-alpha.1

### Required Changes for Consumers

**1. Load CSS bundle (mandatory)**
```tsx
import '@khipu/design-system/beercss/css';
```

**2. ThemeProvider**
```tsx
// Before
import { KhipuThemeProvider } from '@khipu/design-system';
<KhipuThemeProvider primaryColor="#FF0000">...</KhipuThemeProvider>

// After
import { KdsThemeProvider } from '@khipu/design-system';
<KdsThemeProvider primaryColor="#FF0000">...</KdsThemeProvider>
```

**3. Component Prop Changes**

| Component | Before | After |
|---|---|---|
| KdsButton | `variant="contained"` | `variant="primary"` |
| KdsButton | `startIcon={<SearchIcon />}` | `startIcon="search"` |
| KdsButton | `color="primary"` | removed (variant includes color) |
| KdsCard | `variant="elevation"` | no prop (always `kds-card-elevated`) |
| KdsAlert | `severity="error"` | `severity="error"` (unchanged) |
| KdsTextField | `InputProps={{ startAdornment: ... }}` | `startIcon="search"` |
| All | `sx={{ ... }}` | `className="kds-..."` |

**4. Icons**
```tsx
// Before
import { Search, ChevronRight } from '@khipu/design-system';
<Search />

// After — use Material Symbols font directly
<i className="material-symbols-outlined">search</i>
```

**5. Layout Components (Box, Grid, Stack)**
```tsx
// No longer exported from @khipu/design-system
// Option A: Import from MUI directly
import { Box } from '@mui/material';

// Option B: Use HTML + kds-* classes
<div className="kds-flex kds-gap-4 kds-items-center">...</div>
```

### What Does NOT Change

- Component names (`KdsButton`, `KdsCard`, etc.)
- Design tokens (export of `tokens`, `colors`, etc.)
- TypeScript token types
- Visual output (components look the same or better — now identical to BeerCSS)

---

## 11. Risk Analysis

### khenshin-web Impact

khenshin-web is the primary consumer via iframe. Key risks:

| Area | Risk | Mitigation |
|---|---|---|
| `sx` prop usage | HIGH — if used extensively, every instance needs migration | Search & replace across khenshin-web |
| Icon React components | HIGH — all icon imports change from JSX to font strings | Bulk search & replace |
| MUI re-exports (Box, Grid, Stack) | HIGH — layout components removed | Import from MUI directly or migrate to kds-* flex classes |
| KhipuThemeProvider | LOW — drop-in replacement | `KdsThemeProvider` has same props |
| CSS loading in iframe | LOW — build tool handles injection | `vite-plugin-css-injected-by-js` or equivalent |
| `styled()` overrides | UNKNOWN — if khenshin-web extends MUI components | Requires audit |

**Recommendation:** Plan khenshin-web migration separately after DS migration is complete.

### Technical Risks

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Radix DOM structure conflicts with kds-* CSS | Medium | Medium | Test each Radix component early; adapt CSS if needed |
| Missing kds-* classes for React-specific states | Medium | Low | Create classes in CSS bundle as discovered |
| Browser compat with native `<details>`/`<dialog>` | Low | Low | Polyfill if needed; all target browsers support these |
| Accessibility regression in Cat. B components | Medium | High | Manual a11y testing + automated axe-core in Vitest |

---

## 12. Success Criteria

1. All 37 components render visually identical to BeerCSS demos
2. Bundle size reduced by >250KB (MUI+Emotion removed)
3. All components have Storybook stories and Vitest tests
4. CSS bundle is the single source of truth for all visual styling
5. No accessibility regressions (verified via axe-core + manual testing)
6. `KdsThemeProvider` supports merchant color customization via CSS custom properties
