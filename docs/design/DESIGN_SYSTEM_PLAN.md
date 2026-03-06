# Khipu Design System Implementation Plan

## Overview

This document provides instructions for building out the `@khipu/design-system` package. The focus is on **components and utilities that add real value** beyond what MUI provides out of the box.

**Current Package:** `@khipu/design-system` v0.1.0-alpha.5
**Source Application:** `khenshin-web` (React 17 + MUI 7.3.4 + Emotion)

### Application Context: Payment Flow

khenshin-web is a payment application that guides users through bank transfers. The typical flow:

```
1. Loading        → App connects to backend, receives PaymentDescriptor (with theme colors)
2. Bank Selection → User picks a bank (RadioCardGroup with bank logos)
3. Login Form     → User enters credentials (PasswordField for secure input)
4. Authorization  → Progress screens while bank processes (LoadingOverlay + status icons)
5. Confirmation   → User confirms transfer details
6. Result         → Success/Failure screen (ResultScreen with operation code)
```

**Key UI Patterns:**
- Forms are dynamic - fields come from backend protocol (`FormRequest`)
- Theme colors come from merchant configuration via API
- Cancel confirmation appears when user tries to exit (`ConfirmationDialog`)
- Loading states block interaction during async operations

### Design Philosophy

> **Don't wrap MUI for the sake of wrapping.**
> Only build components that:
> 1. Add significant functionality MUI doesn't provide
> 2. Encode complex patterns that are repeated across the app
> 3. Require dynamic theming beyond MUI's capabilities

**Use MUI directly for:** Typography, Stack, Box, Container, Divider, Avatar, Checkbox, LinearProgress, Alert, basic Modal/Dialog.

---

## 1. Design Tokens

Design tokens are the foundation - these should be exported as JS objects and CSS variables.

**Where they're used:**
- **Colors**: `ThemeCreator.ts` uses these to build MUI palette, applied globally
- **Spacing**: `spacing.ts` generates CSS variables injected into `:root`, used via `var(--spacing-X)` throughout CSS and `sx` props
- **Typography**: Applied via MUI theme `typography` config, used in all text elements
- **Shadows/Radius**: Applied via MUI theme `components` overrides for buttons, cards, modals

### 1.1 Color Palette

```typescript
// tokens/colors.ts
export const colors = {
  primary: {
    main: '#3CB4E5',
    light: '#6BC7EC',
    dark: '#2A8FB8',
    contrastText: '#FFFFFF'
  },
  secondary: {
    main: '#BC25D5',  // Computed via HSL diff from primary
    light: '#D04DE6',
    dark: '#9A1DB0'
  },
  success: {
    main: '#2CA24D',
    light: '#EDF7ED',
    contrastText: '#1E4620'
  },
  warning: {
    main: '#FF9800',
    light: '#FFF4E5',
    contrastText: '#663C00'
  },
  error: {
    main: '#E53E3E',
    light: '#FDEDED',
    contrastText: '#5F2120'
  },
  info: {
    main: '#006699',
    light: '#E5F6FD',
    contrastText: '#014361'
  },
  neutral: {
    50: '#FAFAFA',
    100: '#F7F7F7',
    200: '#E3E3E3',
    300: '#DDDEE0',
    400: '#BDBFC4',
    500: '#9E9E9E',
    600: '#767E8D',
    700: '#6D6B71',
    800: '#424242',
    900: '#212121'
  },
  background: {
    default: '#FFFFFF',
    paper: '#FFFFFF',
    statusBar: '#F7F7F7'
  },
  text: {
    primary: '#767E8D',
    secondary: 'rgba(0, 0, 0, 0.60)',
    disabled: '#6D6B71'
  }
}
```

### 1.2 Spacing System

8px grid system:

```typescript
// tokens/spacing.ts
export const spacing = {
  0: 0,
  0.5: 4,
  1: 8,
  1.5: 12,
  2: 16,
  2.5: 20,
  3: 24,
  4: 32,
  5: 40,
  6: 48,
  8: 64,
}

export const layout = {
  paddingX: 20,
  paddingY: 32,
  gap: 20,
  sectionGap: 20,
  containerMaxWidth: 450,
}
```

### 1.3 Typography Scale

```typescript
// tokens/typography.ts
export const fontFamily = '"Public Sans", Arial, sans-serif'

export const typography = {
  h4: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.3 },  // Form titles
  'body-lg': { fontSize: '1rem', fontWeight: 400, lineHeight: 1.5 },
  'body-md': { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.57 },
  'body-sm': { fontSize: '0.8125rem', fontWeight: 400, lineHeight: 1.5 },
  'body-xs': { fontSize: '0.75rem', fontWeight: 400, lineHeight: 1.66 },
  label: { fontSize: '0.75rem', fontWeight: 400, letterSpacing: '1px', textTransform: 'uppercase' },
  caption: { fontSize: '0.625rem', fontWeight: 400, lineHeight: 1.66 },
}
```

### 1.4 Other Tokens

```typescript
// tokens/shadows.ts
export const shadows = {
  sm: '0 1px 2px 0 rgba(9, 3, 3, 0.12)',
  md: '0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.20)',
}

// tokens/radius.ts
export const radius = {
  sm: 4,   // Buttons
  md: 6,   // Cards
  lg: 12,  // Containers
  xl: 20,  // Modals
}

// tokens/dimensions.ts
export const dimensions = {
  buttonMinHeight: 50,
  inputHeight: 56,
  radioCardMinHeight: 65,
  containerMaxWidth: 450,
  modalMaxWidth: 450,
  modalMaxHeight: 800,
}
```

---

## 2. Theme Provider (HIGH PRIORITY)

This is the most valuable piece - MUI doesn't support dynamic runtime theming from API responses.

**Where it's used:**
- `App.tsx` wraps the entire application with `CustomThemeProvider` + `KhipuThemeProvider`
- Theme colors come from `PaymentDescriptor` received via WebSocket from backend
- Merchants can customize: primary color, text color, background, button colors
- Theme updates dynamically when payment descriptor is received

### 2.1 Why It's Needed

Payments receive theme configuration from the API:
```typescript
// From payment descriptor
{
  primaryColor: '#CustomBrandColor',
  textColor: '#333333',
  backgroundColor: '#FFFFFF',
  // ...
}
```

The theme provider must:
1. Accept dynamic colors at runtime
2. Compute color variants (light/dark) using HSL
3. Generate CSS variables for non-React consumers
4. Create a valid MUI theme

### 2.2 Implementation

```typescript
// theme/KhipuThemeProvider.tsx
interface ThemeConfig {
  primaryColor?: string
  textColor?: string
  backgroundColor?: string
  pageBackgroundColor?: string
  fontFamily?: string
  mode?: 'light' | 'dark'
}

interface KhipuThemeProviderProps {
  config?: ThemeConfig
  children: ReactNode
}

export function KhipuThemeProvider({ config, children }: KhipuThemeProviderProps) {
  const theme = useMemo(() => createKhipuTheme(config), [config])

  useEffect(() => {
    // Inject CSS variables into :root
    injectCSSVariables(theme)
  }, [theme])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
```

### 2.3 Color Utilities

**Source:** `src/FormatUtils.ts`

```typescript
// utils/colorUtils.ts

// Convert hex to HSL
export function hexToHSL(hex: string): { h: number; s: number; l: number }

// Convert HSL to hex
export function hslToHex(hsl: { h: number; s: number; l: number }): string

// Compute a color variant by applying HSL diff
export function getVariantFromHexColor(
  hex: string,
  hslVariation: { h: number; s: number; l: number }
): string

// Compute secondary color from primary (the purple variant)
export function computeSecondaryColor(primaryHex: string): string

// Validate CSS color string
export function isValidCSSColor(color: string): boolean
```

### 2.4 CSS Variable Generation

**Source:** `src/themes/spacing.ts`

```typescript
// utils/cssVariables.ts

export function generateCSSVariables(theme: KhipuTheme): string {
  return `
    :root {
      --khipu-color-primary: ${theme.colors.primary.main};
      --khipu-color-primary-light: ${theme.colors.primary.light};
      --khipu-color-primary-dark: ${theme.colors.primary.dark};
      --khipu-spacing-1: 8px;
      --khipu-spacing-2: 16px;
      /* ... etc */
    }
  `
}

export function injectCSSVariables(theme: KhipuTheme): void {
  // Create or update <style> element in <head>
}
```

---

## 3. Components (Only Custom Patterns)

### 3.1 Button (Already Exists - Standardize)

**Where it's used:**
- Submit buttons on every form (`SecureForm.tsx`)
- Navigation buttons (continue, cancel, retry)
- Action buttons in result screens (SuccessMessage, FailureMessage)
- Modal action buttons (CancelConfirmModal)

The Button already exists in `@khipu/design-system`. Document the standard usage:

```typescript
// Standard button props
interface ButtonProps {
  variant?: 'contained' | 'outlined' | 'text'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  size?: 'small' | 'medium' | 'large'
  fullWidth?: boolean
  disabled?: boolean
  loading?: boolean
  startIcon?: ReactNode
  endIcon?: ReactNode
  href?: string
  type?: 'button' | 'submit'
  onClick?: () => void
  children: ReactNode
}
```

**Default styling to enforce:**
- `fullWidth: true` (100% width)
- `minHeight: 50px`
- `borderRadius: 4px`
- `fontWeight: bold`

---

### 3.2 PasswordField (NEW)

**Where it's used:**
- Bank login forms (username/password authentication)
- PIN entry fields
- Coordinate card inputs (dynamic password challenges)
- Any secure input where masking is needed

MUI TextField doesn't include the password visibility toggle pattern.

**Source:** `src/components/Form/Fields/BaseInputField.tsx`

```typescript
interface PasswordFieldProps {
  label?: string
  value?: string
  placeholder?: string
  error?: boolean
  helperText?: string
  fullWidth?: boolean
  disabled?: boolean
  onChange?: (value: string) => void
  onBlur?: () => void
}
```

**Features:**
- Eye icon toggle (VisibilityOutlined / VisibilityOffOutlined)
- Handles Edge browser password reveal button conflict
- Standard error/helperText display

```tsx
// Usage
<PasswordField
  label="Contraseña"
  error={hasError}
  helperText={errorMessage}
  onChange={(value) => setPassword(value)}
/>
```

---

### 3.3 RadioCardGroup (NEW - HIGH VALUE)

**Where it's used:**
- Bank selection screen (list of banks with logos)
- Account selection (choosing between checking/savings accounts)
- Payment method selection
- Any single-choice question with rich content (icons, descriptions, metadata)

This is NOT a standard radio button. It's a large clickable card used for option selection.

**Source:** `src/components/Form/Fields/RadioGroupField.tsx`

```typescript
interface RadioCardOption {
  value: string
  label: ReactNode           // Can be complex JSX
  description?: string
  disabled?: boolean
  icon?: ReactNode
  metadata?: Record<string, any>  // For data tables
}

interface RadioCardGroupProps {
  options: RadioCardOption[]
  value?: string
  name?: string
  onChange?: (value: string) => void
}
```

**Styling:**
- Min height: 65px
- Border: 1px solid #DDDEE0
- Border radius: 6px
- Background: white
- Box shadow for depth
- Selected state: primary border color + light background tint
- Disabled: 50% opacity
- Supports complex content (icons, multiple lines, data tables)

```tsx
// Usage
<RadioCardGroup
  options={[
    {
      value: 'bank1',
      label: 'Banco de Chile',
      icon: <BankLogo src="..." />,
      description: 'Cuenta corriente'
    },
    {
      value: 'bank2',
      label: 'Santander',
      icon: <BankLogo src="..." />
    },
  ]}
  value={selectedBank}
  onChange={setSelectedBank}
/>
```

---

### 3.4 ConfirmationDialog (NEW)

**Where it's used:**
- Cancel payment confirmation (TopBar.tsx → "¿Abandonar pago?")
- Session timeout warning (InactivityModal.tsx)
- Destructive action confirmations

A specialized dialog pattern for confirmations with icon, centered content, and action buttons.

**Source:** `src/components/Modal/CancelConfirmModal.tsx`

```typescript
interface ConfirmationDialogProps {
  open: boolean
  onClose?: () => void
  icon?: ReactNode
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  confirmColor?: 'primary' | 'error' | 'warning'
  onConfirm?: () => void
  onCancel?: () => void
  footer?: ReactNode  // For reference codes, etc.
}
```

**Layout:**
- Centered icon (large, ~100px area)
- Centered title
- Centered description
- Two action buttons (primary + secondary)
- Optional footer for metadata

```tsx
// Usage
<ConfirmationDialog
  open={showCancel}
  icon={<AbandonIcon />}
  title="¿Abandonar pago?"
  description="Perderás el progreso de esta transacción"
  confirmText="Sí, abandonar"
  cancelText="Continuar"
  confirmColor="error"
  onConfirm={handleCancel}
  onCancel={() => setShowCancel(false)}
/>
```

---

### 3.5 LoadingOverlay (NEW)

**Where it's used:**
- Initial app loading (App.tsx → while connecting to backend)
- Form submission (SecureForm.tsx → while processing)
- Bank authentication waiting (while bank processes login)
- Progress screens (ProgressScreen.tsx, ProgressInfo.tsx)
- Any async operation that blocks user interaction

Full-screen or inline loading state with optional center icon.

**Source:** `src/components/Loading.tsx`

```typescript
interface LoadingOverlayProps {
  variant?: 'fullscreen' | 'inline' | 'container'
  size?: 'small' | 'medium' | 'large'
  label?: string
  icon?: ReactNode        // Center icon (e.g., lock)
  blockInteraction?: boolean
  transparent?: boolean   // For overlay background
}
```

**Features:**
- CircularProgress spinner
- Optional center icon overlay
- Fullscreen mode with fixed positioning
- Inline mode with reserved height
- Can block pointer events

```tsx
// Usage
<LoadingOverlay
  variant="fullscreen"
  icon={<LockIcon />}
  label="Procesando..."
  blockInteraction
/>
```

---

### 3.6 ResultScreen (NEW)

**Where it's used:**
- Payment success (SuccessMessage.tsx → shows operation code, amount, redirect countdown)
- Payment failure (FailureMessage.tsx → shows error reason, retry button)
- Payment warning (WarningMessage.tsx → partial success states)
- Must continue message (MustContinueMessage.tsx → when user action needed outside app)
- Rendered by `ComponentRendererFactory.tsx` based on backend response type

Transaction result display pattern (success, failure, warning).

**Source:** `src/components/TransactionResult/SuccessMessage.tsx`

```typescript
interface ResultScreenProps {
  status: 'success' | 'failure' | 'warning' | 'info'
  icon?: ReactNode
  title: string
  subtitle?: string
  details?: Array<{ label: string; value: string }>
  operationCode?: string
  copyableCode?: boolean
  redirectUrl?: string
  redirectCountdown?: number
  actions?: ReactNode
}
```

**Features:**
- Colored header based on status
- Icon display
- Operation details list
- Copyable operation code (with CopyToClipboard)
- Auto-redirect countdown
- Action buttons

---

## 4. Icon Library

Custom SVG icons that don't exist in MUI Icons. These are payment-flow specific illustrations.

**Source:** `src/components/Icon/*.tsx`

### Icons to Include

| Icon Name | Usage | Where Used |
|-----------|-------|------------|
| Abandon | Cancel/exit confirmation | CancelConfirmModal |
| AuthorizeDestinatary | Destinatary authorization | Progress screens when authorizing recipient |
| AuthorizeLogin | Login authorization | Progress screens during bank login |
| AuthorizeNewPassword | Password change | Progress screens for password flows |
| AuthorizeTransfer | Transfer authorization | Progress screens when confirming transfer |
| Email | Email verification | Email verification forms |
| Inactivity | Session timeout | InactivityModal |
| PartialCloud | Partial status | Warning/partial success screens |
| Plane | Transfer/send | Transfer confirmation screens |
| Privacy | Privacy policy | PrivacyModal, footer links |
| QRSkeleton | QR loading state | QR authorization screens |
| RainCloud | Error/failure state | FailureMessage |
| KhipuLogo | Brand logo | Footer, headers |
| LockIcon | Security/loading | Loading overlay center icon |

### Icon Component

```typescript
interface IconProps {
  name: IconName
  size?: 'sm' | 'md' | 'lg' | number
  color?: string  // Theme key or CSS color
  className?: string
}

// Usage
<Icon name="abandon" size="lg" color="error.main" />
```

---

## 5. File Structure

```
@khipu/design-system/
├── src/
│   ├── tokens/
│   │   ├── colors.ts
│   │   ├── spacing.ts
│   │   ├── typography.ts
│   │   ├── shadows.ts
│   │   ├── radius.ts
│   │   ├── dimensions.ts
│   │   └── index.ts
│   │
│   ├── theme/
│   │   ├── KhipuThemeProvider.tsx
│   │   ├── createKhipuTheme.ts
│   │   ├── useKhipuTheme.ts
│   │   └── index.ts
│   │
│   ├── utils/
│   │   ├── colorUtils.ts
│   │   ├── cssVariables.ts
│   │   └── index.ts
│   │
│   ├── components/
│   │   ├── Button/           # Already exists - document
│   │   ├── PasswordField/
│   │   ├── RadioCardGroup/
│   │   ├── ConfirmationDialog/
│   │   ├── LoadingOverlay/
│   │   ├── ResultScreen/
│   │   └── index.ts
│   │
│   ├── icons/
│   │   ├── svg/              # SVG source files
│   │   ├── Icon.tsx
│   │   ├── icons.ts          # Icon registry
│   │   └── index.ts
│   │
│   └── index.ts
│
├── stories/                  # Storybook
└── package.json
```

---

## 6. What NOT to Build

Use MUI directly for these - just configure via theme:

| Component | Use Instead |
|-----------|-------------|
| Typography | `@mui/material/Typography` with theme variants |
| Stack | `@mui/material/Stack` |
| Box | `@mui/material/Box` |
| Container | `@mui/material/Container` |
| Divider | `@mui/material/Divider` |
| Avatar | `@mui/material/Avatar` |
| Checkbox | `@mui/material/Checkbox` |
| LinearProgress | `@mui/material/LinearProgress` |
| Alert | `@mui/material/Alert` |
| Modal/Dialog | `@mui/material/Dialog` |
| TextField | `@mui/material/TextField` (except PasswordField) |
| Select | `@mui/material/Select` |
| Radio | `@mui/material/Radio` (except RadioCardGroup) |
| Chip | `@mui/material/Chip` |
| CircularProgress | `@mui/material/CircularProgress` |

---

## 7. Implementation Phases

### Phase 1: Foundation
- [ ] Design tokens (colors, spacing, typography, etc.)
- [ ] Color utilities (HSL conversion, variant computation)
- [ ] CSS variable generation
- [ ] KhipuThemeProvider with dynamic theming

### Phase 2: Core Components
- [ ] Document existing Button
- [ ] PasswordField
- [ ] RadioCardGroup
- [ ] ConfirmationDialog

### Phase 3: Feedback & Display
- [ ] LoadingOverlay
- [ ] ResultScreen
- [ ] Icon library

### Phase 4: Integration
- [ ] Update khenshin-web to use design system
- [ ] Remove duplicated wrappers (Typography, Sheet)
- [ ] Storybook documentation

---

## 8. Key Source Files Reference

| Design System Item | Source in khenshin-web |
|-------------------|------------------------|
| Theme creation | `src/themes/ThemeCreator.ts` |
| CSS variables | `src/themes/spacing.ts` |
| Color utilities | `src/FormatUtils.ts` (getHSLColorDiff, getVariantFromHexColor) |
| PasswordField pattern | `src/components/Form/Fields/BaseInputField.tsx` |
| RadioCard pattern | `src/components/Form/Fields/RadioGroupField.tsx` |
| ConfirmationDialog | `src/components/Modal/CancelConfirmModal.tsx` |
| LoadingOverlay | `src/components/Loading.tsx` |
| ResultScreen | `src/components/TransactionResult/SuccessMessage.tsx` |
| Icons | `src/components/Icon/*.tsx` |

---

## 9. Notes for Design System Agent

1. **Theme Provider is the priority** - Dynamic theming is the main differentiator
2. **Don't wrap MUI** - Only build what adds real value
3. **RadioCardGroup is unique** - This is NOT a standard radio, it's a card-based selector
4. **Test with khenshin-web** - Always verify in the real app
5. **Keep bundle small** - Tree-shake, don't bundle MUI internals
6. **CSS variables matter** - Some consumers aren't React

---

*Last updated: 2025-01-30*
*Focused on high-value components only*
