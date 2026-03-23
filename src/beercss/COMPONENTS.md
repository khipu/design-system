# Khipu Design System - BeerCSS Components

Documentación completa de componentes implementados desde Figma Make prototype.

## Tabla de Contenidos

1. [Sistema de Tokens](#sistema-de-tokens)
2. [Card Components](#card-components)
3. [Stepper Component](#stepper-component)
4. [Form Validation States](#form-validation-states)
5. [Alert Components](#alert-components)
6. [Typography Scale](#typography-scale)
7. [Layout Utilities](#layout-utilities)

---

## Sistema de Tokens

### OKLch Color System

Sistema de colores basado en OKLch extraído del Figma Make prototype.

#### Primary Colors (Purple)

```css
--kds-color-primary-50: oklch(96% 0.02 295);
--kds-color-primary-100: oklch(92% 0.04 295);
--kds-color-primary-500: oklch(60% 0.20 295);  /* Main */
--kds-color-primary-900: oklch(28% 0.12 295);
```

#### Secondary Colors (Green)

```css
--kds-color-secondary-50: oklch(96% 0.02 145);
--kds-color-secondary-500: oklch(64% 0.16 145);  /* Main */
```

#### Semantic Colors

```css
--kds-color-success: oklch(56% 0.16 145);  /* Green */
--kds-color-error: oklch(48% 0.20 28);     /* Red */
--kds-color-warning: oklch(72% 0.18 90);   /* Amber */
--kds-color-info: oklch(60% 0.18 240);     /* Blue */
```

#### Alert Backgrounds

```css
--kds-alert-info-bg: oklch(95% 0.02 240);
--kds-alert-warning-bg: oklch(95% 0.08 90);
--kds-alert-success-bg: oklch(95% 0.08 145);
--kds-alert-error-bg: oklch(95% 0.08 28);
```

### Typography

Font family: `"Public Sans", -apple-system, sans-serif`

#### Font Sizes (Material Design 3)

```css
--kds-font-size-xs: 0.75rem;    /* 12px */
--kds-font-size-sm: 0.875rem;   /* 14px */
--kds-font-size-base: 1rem;     /* 16px */
--kds-font-size-lg: 1.125rem;   /* 18px */
--kds-font-size-xl: 1.25rem;    /* 20px */
--kds-font-size-2xl: 1.5rem;    /* 24px */
--kds-font-size-3xl: 2rem;      /* 32px */
--kds-font-size-4xl: 3rem;      /* 48px */
```

#### Font Weights

```css
--kds-font-weight-regular: 400;
--kds-font-weight-medium: 500;
--kds-font-weight-semibold: 600;
--kds-font-weight-bold: 700;
```

### Spacing System (4px base grid)

```css
--kds-spacing-1: 4px;
--kds-spacing-2: 8px;
--kds-spacing-3: 12px;
--kds-spacing-4: 16px;
--kds-spacing-5: 20px;
--kds-spacing-6: 24px;
--kds-spacing-8: 32px;
--kds-spacing-10: 40px;
--kds-spacing-12: 48px;
--kds-spacing-16: 64px;
--kds-spacing-20: 80px;
```

### Shadows (Material Design Elevation)

```css
--kds-shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
--kds-shadow-md: 0 4px 6px rgba(0,0,0,0.1);
--kds-shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
--kds-shadow-elevation-1: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
--kds-shadow-elevation-4: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
```

### Border Radius

```css
--kds-radius-sm: 4px;
--kds-radius-md: 8px;
--kds-radius-lg: 12px;
--kds-radius-xl: 16px;
--kds-radius-full: 9999px;
```

---

## Card Components

### Elevated Card

Card básico con sombra Material Design.

**Classes:** `.kds-card-elevated`, `.khipu-card-elevated` (legacy)

**HTML:**
```html
<div class="kds-card-elevated">
    <h3>Card Title</h3>
    <p>Card content goes here.</p>
    <button class="primary">Action</button>
</div>
```

**Features:**
- Box shadow elevation-1 (default)
- Elevation-4 on hover
- 12px border radius
- 32px padding

---

### Flow Selector Card

Card para selección de opciones en flujos multi-etapa (from Figma Make StageSelector).

**Class:** `.kds-card-flow`

**HTML:**
```html
<div class="kds-card-flow">
    <div>
        <h3>Option Title</h3>
        <p>Description text</p>
        <ul>
            <li>Feature 1</li>
            <li>Feature 2</li>
        </ul>
    </div>
    <button class="primary">Select</button>
</div>
```

**Features:**
- Min-height: 582px
- Flexbox column layout
- Action button pushed to bottom (`margin-top: auto`)
- Border changes to primary color on hover
- Box shadow on hover

---

### Pricing Plan Card

Card para mostrar planes de pricing (from Figma Make StagePricingPlan).

**Class:** `.kds-card-plan`, `.kds-card-plan.recommended`

**HTML:**
```html
<div class="kds-card-plan">
    <h3>Plan Name</h3>
    <div class="plan-price">$29</div>
    <p>Plan description</p>
    <ul class="plan-features">
        <li>Feature 1</li>
        <li>Feature 2</li>
        <li>Feature 3</li>
    </ul>
    <button class="primary">Select Plan</button>
</div>

<!-- Recommended variant -->
<div class="kds-card-plan recommended">
    <!-- Same structure -->
</div>
```

**Features:**
- Max-width: 365px
- `.plan-price`: Large primary-colored price display
- `.plan-features`: List with checkmark bullets (green ✓)
- `.recommended`: Primary border + container background

---

### Status Card

Card para mostrar estados de verificación/proceso (from onboarding patterns).

**Class:** `.kds-card-status`, `.kds-card-status.muted`

**HTML:**
```html
<div class="kds-card-status">
    <div class="status-icon">
        <i class="material-symbols-outlined">check_circle</i>
    </div>
    <div class="status-content">
        <strong>Status Title</strong>
        <p>Status description</p>
    </div>
    <button class="primary">Action</button>
</div>
```

**Features:**
- Horizontal flex layout
- Min-height: 80px
- `.muted`: Transparent border, elevated background

---

### Card Sections

Dividers y estructura para cards complejos.

**Classes:** `.kds-card-header`, `.kds-card-body`, `.kds-card-footer`

**HTML:**
```html
<div class="kds-card-elevated">
    <div class="kds-card-header">
        <h3>Card Title</h3>
    </div>
    <div class="kds-card-body">
        <p>Main content</p>
    </div>
    <div class="kds-card-footer">
        <button class="transparent">Cancel</button>
        <button class="primary">Save</button>
    </div>
</div>
```

**Features:**
- `.kds-card-header`: Bottom border separator
- `.kds-card-body`: Vertical padding
- `.kds-card-footer`: Top border, flex layout (right-aligned buttons)

---

## Stepper Component

Multi-stage progress indicator (from Figma Make OnboardingFlow).

**Classes:** `.kds-stepper`, `.kds-step`, `.kds-step-indicator`, `.kds-step-label`, `.kds-step-description`

**HTML:**
```html
<div class="kds-stepper">
    <div class="kds-step completed">
        <div class="kds-step-indicator">1</div>
        <div class="kds-step-label">Step One</div>
        <div class="kds-step-description">Completed</div>
    </div>

    <div class="kds-step current">
        <div class="kds-step-indicator">2</div>
        <div class="kds-step-label">Step Two</div>
        <div class="kds-step-description">In Progress</div>
    </div>

    <div class="kds-step">
        <div class="kds-step-indicator">3</div>
        <div class="kds-step-label">Step Three</div>
        <div class="kds-step-description">Pending</div>
    </div>
</div>
```

**States:**
- **Pending** (default): Gray circle (#7a7a7a)
- **Current** (`.current`): Primary color circle
- **Completed** (`.completed`): Green circle with checkmark

**Features:**
- Connecting line between steps (::before pseudo-element)
- Responsive sizing (36px → 28px → 24px on mobile)
- Checkmark icon for completed steps
- Optional step description

---

## Form Validation States

Enhanced validation states with colored backgrounds (from Figma Make patterns).

**Classes:** `.field.info`, `.field.warning`, `.field.valid`, `.field.invalid`

### Info State (Blue)

**HTML:**
```html
<div class="field label border info">
    <input type="text" id="username">
    <label for="username">Username</label>
    <span class="info-message">This username is available</span>
</div>
```

### Warning State (Amber)

**HTML:**
```html
<div class="field label border warning">
    <input type="password" id="password">
    <label for="password">Password</label>
    <span class="warning-message">Weak password. Use letters, numbers, and symbols.</span>
</div>
```

### Success State (Green)

**HTML:**
```html
<div class="field label border valid">
    <input type="email" id="email">
    <label for="email">Email</label>
    <span class="success-message">Email verified successfully</span>
</div>
```

### Error State (Red)

**HTML:**
```html
<div class="field label border invalid">
    <input type="email" id="email-error">
    <label for="email-error">Email</label>
    <span class="error">Please enter a valid email address</span>
</div>
```

**Features:**
- Colored border on input
- Colored label
- Message with colored background + left border
- 8px padding, 4px border-radius

---

## Alert Components

Colored banners for notifications/information (from Figma Make KYC patterns).

**Classes:** `.kds-alert`, `.kds-alert.{info|warning|success|error}`, `.kds-alert.compact`

### Standard Alert

**HTML:**
```html
<div class="kds-alert info">
    <div class="kds-alert-icon">
        <i class="material-symbols-outlined">info</i>
    </div>
    <div class="kds-alert-content">
        <div class="kds-alert-title">Information</div>
        <div class="kds-alert-description">
            Your account requires additional verification.
        </div>
    </div>
</div>
```

### Alert with Actions

**HTML:**
```html
<div class="kds-alert warning">
    <div class="kds-alert-icon">
        <i class="material-symbols-outlined">warning</i>
    </div>
    <div class="kds-alert-content">
        <div class="kds-alert-title">Action Required</div>
        <div class="kds-alert-description">Description text</div>
        <div class="kds-alert-actions">
            <button class="transparent">Later</button>
            <button class="primary">Upload Now</button>
        </div>
    </div>
</div>
```

### Compact Alert (no icon)

**HTML:**
```html
<div class="kds-alert info compact">
    <div class="kds-alert-content">
        <div class="kds-alert-description">
            Brief message without icon.
        </div>
    </div>
</div>
```

**Variants:**
- `.info`: Blue border + background
- `.warning`: Amber border + background
- `.success`: Green border + background
- `.error`: Red border + background

**Features:**
- Flex layout (icon + content)
- Colored border + light background
- Icon at 20px
- Title (semibold) + description
- Optional action buttons

---

## Typography Scale

Material Design 3 typography classes.

### Display Styles

**Classes:** `.kds-display-large`, `.kds-display-medium`

```html
<h1 class="kds-display-large">Display Large (48px)</h1>
<h1 class="kds-display-medium">Display Medium (32px)</h1>
```

**Usage:** Hero sections, landing pages

---

### Headline Styles

**Classes:** `.kds-headline-large`, `.kds-headline-medium`, `.kds-headline-small`

```html
<h2 class="kds-headline-large">Headline Large (24px)</h2>
<h3 class="kds-headline-medium">Headline Medium (20px)</h3>
<h4 class="kds-headline-small">Headline Small (18px)</h4>
```

**Usage:** Page titles, section headers

---

### Title Styles

**Classes:** `.kds-title-large`, `.kds-title-medium`, `.kds-title-small`

```html
<h5 class="kds-title-large">Title Large (20px)</h5>
<h6 class="kds-title-medium">Title Medium (16px)</h6>
<div class="kds-title-small">Title Small (14px)</div>
```

**Usage:** Card titles, list headers

---

### Body Styles

**Classes:** `.kds-body-large`, `.kds-body-medium`, `.kds-body-small`

```html
<p class="kds-body-large">Body Large (18px)</p>
<p class="kds-body-medium">Body Medium (16px)</p>
<p class="kds-body-small">Body Small (14px)</p>
```

**Usage:** Main content, paragraphs

---

### Label Styles

**Classes:** `.kds-label-large`, `.kds-label-medium`, `.kds-label-small`

```html
<span class="kds-label-large">Label Large (16px)</span>
<span class="kds-label-medium">Label Medium (14px)</span>
<span class="kds-label-small">Label Small (12px)</span>
```

**Usage:** Buttons, form labels, tags

---

### Text Utilities

**Classes:** `.kds-text-{center|left|right}`, `.kds-text-{primary|success|error|warning|muted}`, `.kds-font-{regular|medium|semibold|bold}`

```html
<p class="kds-text-center kds-text-primary kds-font-bold">
    Centered, primary color, bold text
</p>

<p class="kds-text-muted">
    Muted text (on-surface-variant color)
</p>
```

---

## Layout Utilities

### Grid System

Responsive grid layouts (mobile-first).

**Classes:** `.kds-grid-2col`, `.kds-grid-3col`, `.kds-grid-4col`

```html
<!-- 2 Column Grid (mobile: 1, tablet+: 2) -->
<div class="kds-grid-2col">
    <div>Item 1</div>
    <div>Item 2</div>
</div>

<!-- 3 Column Grid (mobile: 1, tablet: 2, desktop: 3) -->
<div class="kds-grid-3col">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
</div>

<!-- 4 Column Grid (mobile: 1, tablet: 2, desktop: 4) -->
<div class="kds-grid-4col">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
    <div>Item 4</div>
</div>
```

**Breakpoints:**
- Mobile: `< 768px` (1 column)
- Tablet: `768px - 1023px` (2 columns)
- Desktop: `≥ 1024px` (3-4 columns)

---

### Flex Utilities

**Classes:** `.kds-flex`, `.kds-flex-col`, `.kds-flex-row`, `.kds-justify-{start|center|end|between}`, `.kds-items-{start|center|end}`

```html
<!-- Horizontal flex with space-between -->
<div class="kds-flex kds-justify-between kds-items-center">
    <span>Left</span>
    <button>Right</button>
</div>

<!-- Vertical flex (column) -->
<div class="kds-flex-col kds-gap-4">
    <div>Item 1</div>
    <div>Item 2</div>
</div>
```

---

### Gap Utilities

**Classes:** `.kds-gap-{1|2|3|4|5|6|8}`

Values: 4px, 8px, 12px, 16px, 20px, 24px, 32px

```html
<div class="kds-flex kds-gap-4">
    <span>Item 1</span>
    <span>Item 2</span>
</div>
```

---

### Spacing Utilities

#### Margin

**Classes:** `.kds-m-{0|2|4|6|8}`, `.kds-mt-{0|2|4|6|8}`, `.kds-mb-{0|2|4|6|8}`, `.kds-ml-{0|2|4}`, `.kds-mr-{0|2|4}`, `.kds-my-{0|2|4|6|8}`, `.kds-mx-auto`

```html
<div class="kds-mt-6 kds-mb-4">
    Margin top: 24px, bottom: 16px
</div>

<div class="kds-mx-auto">
    Centered (margin-left/right: auto)
</div>
```

#### Padding

**Classes:** `.kds-p-{0|2|4|6|8}`, `.kds-pt-{4|6|8}`, `.kds-pb-{4|6|8}`, `.kds-px-{4|6|8}`, `.kds-py-{4|6|8}`

```html
<div class="kds-p-6">
    Padding: 24px all sides
</div>

<div class="kds-px-8 kds-py-4">
    Padding horizontal: 32px, vertical: 16px
</div>
```

---

## Responsive Behavior

All components follow mobile-first responsive design:

### Stepper
- Desktop: 36px indicators, 48px gap, 16px labels
- Tablet: 28px indicators, 24px gap, 14px labels
- Mobile: 24px indicators, 12px gap, 12px labels

### Grid System
- Mobile: 1 column
- Tablet (≥768px): 2 columns
- Desktop (≥1024px): 3-4 columns

### Card Components
- No hard breakpoints, flexible width
- Recommended: Use within grid containers for responsive layouts

---

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- OKLch color support: Chrome 111+, Safari 15.4+, Firefox 113+
- Fallback: CSS variables default to equivalent RGB/HEX values

---

## Migración desde Componentes Legacy

### Elevated Cards

**Legacy:**
```html
<div class="khipu-card-elevated">
```

**New:**
```html
<div class="kds-card-elevated">
```

Ambas clases funcionan (backward compatibility mantenida).

### Spacing

**Legacy:**
```html
<div class="khipu-spacing-top">
<div class="khipu-spacing-bottom">
<div class="khipu-spacing-large">
```

**New:**
```html
<div class="kds-mt-8">  <!-- margin-top: 32px -->
<div class="kds-mb-8">  <!-- margin-bottom: 32px -->
<div class="kds-my-12"> <!-- margin: 48px 0 -->
```

Legacy classes mantenidas para compatibilidad.

---

## CDN Usage

```html
<!-- Production CDN (jsDelivr) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@khipu/design-system@0.2.0/dist/beercss/khipu-beercss.min.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/@khipu/design-system@0.2.0/dist/beercss/khipu-beercss.min.js"></script>

<!-- Material Symbols Icons (required) -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200">
```

---

## Demo Page

Ver ejemplos completos de todos los componentes en:
- **Development:** http://localhost:3000 (después de `npm run beercss:dev`)
- **Production:** https://cdn.jsdelivr.net/npm/@khipu/design-system@0.2.0/dist/beercss/demo/index.html

---

## Comparación con Figma Make

Todos los componentes implementados son réplicas fieles del Figma Make prototype (fileKey: `ju4simHaH58JzlhpwagnTy`):

- ✅ **Stepper:** Idéntico a `OnboardingFlow` component
- ✅ **Flow Cards:** Basado en `StageSelector` grid
- ✅ **Pricing Cards:** Extraído de `StagePricingPlan`
- ✅ **Form Validation:** Estados de `StageProfile`, `StageCommercialData`
- ✅ **Alerts:** Patrones de KYC blocking messages
- ✅ **Typography:** Material Design 3 scale del Figma Make
- ✅ **Colors:** OKLch tokens exactos del `theme.css`

---

## Changelog v0.2.0

### Added
- Sistema completo de tokens OKLch
- Card components: flow, plan, status, sections
- Stepper component (multi-stage progress)
- Form validation states: info, warning (enhanced success/error)
- Alert components (4 variants: info, warning, success, error)
- Typography scale (Material Design 3: display, headline, title, body, label)
- Grid system (responsive 2/3/4 columns)
- Flex utilities
- Spacing utilities (margin, padding, gap)

### Changed
- Elevated cards ahora usan tokens de shadow
- Form validation messages con colored backgrounds
- Legacy spacing classes mantienen compatibilidad

### Deprecated
- Ninguna (backward compatibility total)

---

**Última actualización:** 2026-03-19
**Versión del Design System:** 0.2.0
