# Design System Cross-Platform Analysis

## Executive Summary

This document analyzes the alignment between the **khenshin-web design system plan** (React/MUI) and the **khipu-client-android** implementation (Kotlin/Compose) to identify common ground, gaps, and opportunities for a unified multi-platform design system.

**Goal:** Create a component library for each platform with **unified design tokens** from a single source of truth.

---

## 1. Token Comparison Matrix

### 1.1 Color Tokens

| Token Category | Web (DESIGN_SYSTEM_PLAN.md) | Android (Current) | Status |
|----------------|----------------------------|-------------------|--------|
| **Primary** | `#3CB4E5` (blue) | `#7E42A8` (purple) | ⚠️ **MISMATCH** |
| **Secondary** | `#BC25D5` (computed via HSL) | `#005EB5` (blue) | ⚠️ Different approach |
| **Success** | `#2CA24D` | `#0D6E13` (light) / `#2CA24D` (dark) | ✅ Partial match |
| **Warning** | `#FF9800` | `#ED6C02` | ⚠️ Similar but different |
| **Error** | `#E53E3E` | `#BA1A1A` | ⚠️ Different reds |
| **Info** | `#006699` | `#005EB5` | ⚠️ Similar blues |
| **Neutral scale** | 50-900 (10 values) | Not defined as scale | ❌ **Missing in Android** |
| **Background** | `#FFFFFF` | `#FFFFFF` | ✅ Match |
| **Text primary** | `#767E8D` | `#272930` (onSurface) | ⚠️ Different |
| **Dark mode** | Not in plan | ✅ Full support | ✅ Android ahead |

**Key Finding:** Colors are **significantly different** between platforms. Need to decide which is the source of truth.

### 1.2 Spacing Tokens

| Web Scale | Web Value | Android Equivalent | Android Value | Status |
|-----------|-----------|-------------------|---------------|--------|
| `0` | 0px | `dpNone` | 0dp | ✅ |
| `0.5` | 4px | `dpVerySmall` | 4dp | ✅ |
| `1` | 8px | `dpExtraSmall` | 8dp | ✅ |
| `1.5` | 12px | `dpVeryMedium` | 12dp | ✅ |
| `2` | 16px | `dpExtraMedium` | 16dp | ✅ |
| `2.5` | 20px | `dpLarge` | 20dp | ✅ |
| `3` | 24px | `dpModeratelyLarge` | 24dp | ✅ |
| `4` | 32px | — | — | ❌ Missing |
| `5` | 40px | — | — | ❌ Missing |
| `6` | 48px | `dpLarger` | 48dp | ✅ |
| `8` | 64px | — | — | ❌ Missing |

**Key Finding:** Both use **8px/dp base unit**. Android has more granular scale (19 values vs 11). Naming conventions differ significantly.

### 1.3 Typography Tokens

| Token | Web | Android | Status |
|-------|-----|---------|--------|
| **Font Family** | `"Public Sans"` | `publicSans` | ✅ **Match** |
| **h4** | 1.25rem (20px), 600 | `successTitle`: 20sp, 600 | ✅ Similar |
| **body-lg** | 1rem (16px), 400 | `regular16`: 16sp, 400 | ✅ Match |
| **body-md** | 0.875rem (14px), 400 | `labelFont`: 14sp, 500 | ⚠️ Weight differs |
| **body-sm** | 0.8125rem (13px), 400 | — | ❌ Missing |
| **body-xs** | 0.75rem (12px), 400 | `hintFont`: 12sp, 400 | ✅ Match |
| **label** | 0.75rem, uppercase | — | ❌ Different pattern |
| **caption** | 0.625rem (10px) | `headerAmountLabel`: 10sp | ✅ Similar |

**Key Finding:** Both use **Public Sans**. Android has more semantic names (e.g., `successTitle`, `buttonText`) while web uses generic scale names.

### 1.4 Other Tokens

| Category | Web | Android | Status |
|----------|-----|---------|--------|
| **Border Radius** | sm: 4, md: 6, lg: 12, xl: 20 | extraSmall: 4, small: 8, medium: 16, large: 24, extraLarge: 32 | ⚠️ Different scales |
| **Shadows** | sm, md defined | Not explicitly defined | ❌ Missing in Android |
| **Button min height** | 50px | Not standardized | ❌ Missing |
| **Input height** | 56px | 95dp (much larger) | ⚠️ **Different** |
| **Container max width** | 450px | Not applicable (mobile) | N/A |

---

## 2. Component Comparison Matrix

### 2.1 High-Value Components (from Web Plan)

| Component | Web Plan | Android Equivalent | Alignment |
|-----------|----------|-------------------|-----------|
| **Button** | `Button` with loading state | `MainButtonComponent` | ✅ Similar patterns |
| **PasswordField** | Eye toggle, Edge handling | `TextComponent` (secure mode) | ✅ Both have secure input |
| **RadioCardGroup** | Card-based selection | Not found | ❌ **Missing in Android** |
| **ConfirmationDialog** | Centered icon, actions | `AlertDialogComponent` | ⚠️ Simpler in Android |
| **LoadingOverlay** | Fullscreen/inline variants | `BigIconMessageComponent` + views | ⚠️ Different pattern |
| **ResultScreen** | Success/failure/warning | `SuccessMessageView`, `FailureMessageView`, `WarningMessageView` | ✅ **Split into views** |

### 2.2 Android Components Without Web Equivalent

| Android Component | Purpose | Recommendation |
|-------------------|---------|----------------|
| `OtpComponent` | 6-digit OTP input | Add to web plan |
| `RutComponent` | Chilean RUT field + keyboard | Add to web plan (locale-specific) |
| `CoordinatesField` | Auth challenge grid | Add to web plan |
| `InactivityModalComponent` | Session timeout | Similar to web's ConfirmationDialog |
| `AccordionComponent` | Expandable sections | Consider for web |
| `DataTableComponent` | Data display | Consider for web |

### 2.3 Component API Comparison: Button

**Web (DESIGN_SYSTEM_PLAN.md):**
```typescript
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

**Android (MainButtonComponent):**
```kotlin
@Composable
fun MainButtonComponent(
    text: String,
    enabled: Boolean = true,
    isSubmitting: Boolean = false,  // ← Similar to 'loading'
    onSubmit: () -> Unit
)
```

**Gap Analysis:**
- ❌ Android missing: `variant`, `color`, `size`, `startIcon`, `endIcon`, `href`
- ✅ Both have: `disabled`/`enabled`, `loading`/`isSubmitting`
- Android enforces `fullWidth` by default (correct for mobile)

---

## 3. Screen/View Comparison

### 3.1 Payment Flow Alignment

| Flow Step | Web Plan | Android View | Status |
|-----------|----------|--------------|--------|
| 1. Loading | App connects | `EndToEndEncryption` | ✅ |
| 2. Bank Selection | RadioCardGroup | **Not implemented** | ❌ **Gap** |
| 3. Login Form | PasswordField in forms | `FormView` | ✅ |
| 4. Authorization | Progress screens | `AuthorizationRequestView`, `ProgressInfoView` | ✅ |
| 5. Confirmation | Confirm transfer | `FormView` (dynamic) | ✅ |
| 6. Result | Success/Failure screen | `SuccessMessageView`, `FailureMessageView` | ✅ |

### 3.2 Android-Specific Screens

| View | Purpose | Web Equivalent Needed? |
|------|---------|----------------------|
| `GeolocationWarningView` | Location permission | Yes (if web needs it) |
| `TimeoutMessageView` | Session timeout | Could merge with ConfirmationDialog |
| `MustContinueMessageView` | External action needed | Add to web plan |
| `RedirectToManualView` | Manual payment fallback | Add to web plan |

---

## 4. Icon Library Comparison

### 4.1 Icons in Web Plan

| Icon | Web Plan | Android Equivalent | Status |
|------|----------|-------------------|--------|
| Abandon | ✅ | ❌ Not found | Missing |
| AuthorizeLogin | ✅ | `authorize.png` | ✅ Similar |
| AuthorizeTransfer | ✅ | ❌ Not found | Missing |
| Email | ✅ | `email.png` | ✅ |
| Inactivity | ✅ | ❌ Not found | Missing |
| Plane | ✅ | ❌ Not found | Missing |
| Privacy | ✅ | ❌ Not found | Missing |
| RainCloud | ✅ | ❌ Not found | Missing |
| KhipuLogo | ✅ | ❌ Not found | Missing |
| LockIcon | ✅ | ❌ Not found | Missing |

### 4.2 Android Icons Not in Web Plan

| Icon | Purpose | Add to Web? |
|------|---------|-------------|
| `whatsapp.png` | Contact support | Yes |
| `telegram.png` | Contact support | Yes |
| `geolocation.png` | Location features | Yes |
| `setting.png` | Settings | Yes |

**Key Finding:** Icon libraries are **significantly different**. Need unified icon set exported to both SVG (web) and vector drawable (Android).

---

## 5. Theming Architecture Comparison

### 5.1 Dynamic Theming

| Feature | Web Plan | Android | Status |
|---------|----------|---------|--------|
| Runtime color override | ✅ Via API | ✅ Via `KhipuColors.Builder` | ✅ Both support |
| HSL color computation | ✅ `colorUtils.ts` | ❌ Not found | Missing in Android |
| CSS variable injection | ✅ | N/A | Web-only |
| Dark mode | Not in plan | ✅ Full support | Android ahead |
| System theme detection | Not mentioned | ✅ `SYSTEM` mode | Android ahead |

### 5.2 Theme Customization API

**Web (from plan):**
```typescript
interface ThemeConfig {
  primaryColor?: string
  textColor?: string
  backgroundColor?: string
  pageBackgroundColor?: string
  fontFamily?: string
  mode?: 'light' | 'dark'
}
```

**Android (KhipuColors.Builder):**
```kotlin
KhipuColors.Builder()
  .lightBackground(hex)
  .lightOnBackground(hex)
  .lightPrimary(hex)
  .lightOnPrimary(hex)
  .lightTopBarContainer(hex)
  .lightOnTopBarContainer(hex)
  .darkBackground(hex)
  .darkOnBackground(hex)
  .darkPrimary(hex)
  .darkOnPrimary(hex)
  .darkTopBarContainer(hex)
  .darkOnTopBarContainer(hex)
  .build()
```

**Gap Analysis:**
- Android has **separate light/dark overrides** (more granular)
- Web plan has **single set** with mode toggle
- Android has **topBarContainer** colors (not in web)
- Web plan mentions **fontFamily** override (not in Android)

---

## 6. Unified Design System Recommendations

### 6.1 Token Unification Strategy

```
┌─────────────────────────────────────────────────────────────────┐
│                    FIGMA (Source of Truth)                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                    npm run sync:figma
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       tokens.json                                │
│  {                                                               │
│    "colors": {                                                   │
│      "primary": { "main": "#8347AD", "light": "...", ... },     │
│      "success": { "main": "#2CA24D", ... },                     │
│      ...                                                         │
│    },                                                            │
│    "spacing": { "0": 0, "1": 4, "2": 8, ... },                  │
│    "typography": { ... },                                        │
│    "borderRadius": { ... }                                       │
│  }                                                               │
└─────────────────────────────────────────────────────────────────┘
                              │
               npm run generate:tokens
                              │
         ┌────────────────────┴────────────────────┐
         ▼                                          ▼
┌─────────────────┐                      ┌─────────────────┐
│   tokens.ts     │                      │  KdsTokens.kt   │
│   (React/Web)   │                      │   (Android)     │
└─────────────────┘                      └─────────────────┘
```

### 6.2 Recommended Token Schema (Unified)

```json
{
  "colors": {
    "primary": {
      "main": "#8347AD",
      "light": "#A66BC7",
      "dark": "#5E3280",
      "onPrimary": "#FFFFFF"
    },
    "secondary": { ... },
    "success": { "main": "#2CA24D", "light": "#EDF7ED", "onSuccess": "#1E4620" },
    "warning": { "main": "#ED6C02", ... },
    "error": { "main": "#BA1A1A", ... },
    "info": { "main": "#005EB5", ... },
    "neutral": { "50": "#FAFAFA", ..., "900": "#212121" },
    "background": { "default": "#FFFFFF", "paper": "#FFFFFF" },
    "surface": { ... },
    "text": { "primary": "...", "secondary": "...", "disabled": "..." }
  },
  "spacing": {
    "0": 0, "1": 4, "2": 8, "3": 12, "4": 16, "5": 20, "6": 24, "8": 32, "10": 40, "12": 48
  },
  "typography": {
    "fontFamily": { "primary": "Public Sans" },
    "scale": {
      "xs": { "fontSize": 10, "lineHeight": 1.5, "fontWeight": 400 },
      "sm": { "fontSize": 12, "lineHeight": 1.5, "fontWeight": 400 },
      "md": { "fontSize": 14, "lineHeight": 1.57, "fontWeight": 400 },
      "lg": { "fontSize": 16, "lineHeight": 1.5, "fontWeight": 400 },
      "xl": { "fontSize": 20, "lineHeight": 1.5, "fontWeight": 600 },
      "2xl": { "fontSize": 24, "lineHeight": 1.3, "fontWeight": 600 }
    }
  },
  "borderRadius": {
    "none": 0, "sm": 4, "md": 8, "lg": 16, "xl": 24, "full": 9999
  },
  "shadows": {
    "none": "none",
    "sm": "...",
    "md": "...",
    "lg": "..."
  }
}
```

### 6.3 Component Parity Checklist

| Component | Web | Android | Priority |
|-----------|-----|---------|----------|
| Button | ✅ Exists | ⚠️ Needs variants | High |
| PasswordField | 📋 Planned | ✅ Exists | High |
| RadioCardGroup | 📋 Planned | ❌ Missing | **High** |
| ConfirmationDialog | 📋 Planned | ⚠️ Simpler | Medium |
| LoadingOverlay | 📋 Planned | ⚠️ Different | Medium |
| ResultScreen | 📋 Planned | ✅ Split views | Low (already aligned) |
| OtpField | ❌ Missing | ✅ Exists | Add to web |
| CoordinatesField | ❌ Missing | ✅ Exists | Add to web |
| InactivityModal | ❌ Missing | ✅ Exists | Add to web |

---

## 7. Questions for Stakeholders

### 7.1 Token Decisions (CRITICAL)

1. **Primary Color Conflict:**
   - Web plan uses `#3CB4E5` (blue)
   - Android uses `#7E42A8` (purple)
   - MULTI-PLATFORM-PLAN.md mentions `#8347AD` (purple)

   **Question:** Which is the authoritative primary color? Is this merchant-specific?

2. **Neutral Scale:**
   - Web has 10-value neutral scale (50-900)
   - Android doesn't have this pattern

   **Question:** Should Android adopt the neutral scale, or is Material 3's built-in surface colors sufficient?

3. **Spacing Naming Convention:**
   - Web: numeric (`spacing.2 = 16`)
   - Android: semantic (`dpExtraMedium = 16`)

   **Question:** Adopt numeric (simpler, less verbose) or semantic (more readable)?

### 7.2 Component Decisions

4. **RadioCardGroup Priority:**
   - Critical for bank selection on web
   - Missing on Android (may use different UX pattern)

   **Question:** Does Android need RadioCardGroup, or does it use a different selection pattern?

5. **Button Variants:**
   - Web plan has `contained`, `outlined`, `text` variants
   - Android only has primary filled button

   **Question:** Should Android support all button variants, or is mobile UX different?

6. **OTP/Coordinates Fields:**
   - Android has specialized fields (OtpComponent, CoordinatesField)
   - Not in web plan

   **Question:** Should these be added to web design system?

### 7.3 Architecture Decisions

7. **Dark Mode:**
   - Android: Full support with System/Light/Dark modes
   - Web plan: Only mentions `mode` property, no detail

   **Question:** Should web implement full dark mode support to match Android?

8. **HSL Color Computation:**
   - Web plan mentions computing secondary color via HSL
   - Android doesn't have this

   **Question:** Is HSL computation needed for Android, or are fixed color overrides sufficient?

9. **Icon Distribution:**
   - Icons differ significantly between platforms

   **Question:** Should we create a unified icon library exported as SVG + Android Vector Drawable?

### 7.4 Process Decisions

10. **Token Generation Flow:**
    - MULTI-PLATFORM-PLAN.md proposes Figma → tokens.json → platform outputs

    **Question:** Is this the approved flow? Who owns the Figma source?

11. **DesignTokens.kt Status:**
    - File exists but is untracked (in `.gitignore`?)
    - Marked as "AUTO-GENERATED from design-system" in MULTI-PLATFORM-PLAN.md

    **Question:** Is the generation script already working? Should we commit the generated file?

---

## 8. Recommended Next Steps

### Phase 1: Token Alignment (Week 1)

1. [ ] **Resolve primary color question** - Pick authoritative value
2. [ ] **Create unified `tokens.json`** - Single source of truth
3. [ ] **Implement Kotlin generator** - `tokens.json` → `KdsTokens.kt`
4. [ ] **Test token generation** - Validate output matches current Android values

### Phase 2: Component Gap Analysis (Week 2)

5. [ ] **Audit RadioCardGroup need** - Determine if Android needs it
6. [ ] **Standardize Button API** - Define cross-platform props
7. [ ] **Document OTP/Coordinates** - Add to web plan if needed
8. [ ] **Create icon inventory** - Unified list for both platforms

### Phase 3: Implementation (Week 3-4)

9. [ ] **Build RadioCardGroup for Android** (if needed)
10. [ ] **Extend Button variants** (Android)
11. [ ] **Generate unified tokens** - Both platforms
12. [ ] **Visual regression testing** - Ensure parity

---

## 9. File Cross-Reference

| Item | Web Source | Android Source |
|------|------------|----------------|
| Tokens | `design-system/src/tokens/` | `khipuClient/.../ui/theme/` |
| Theme | `ThemeCreator.ts` | `Theme.kt`, `Color.kt` |
| Button | `design-system/components/Button` | `MainButtonComponent.kt` |
| Forms | `SecureForm.tsx`, `BaseInputField.tsx` | `FormView.kt`, `TextComponent.kt` |
| Dialogs | `CancelConfirmModal.tsx` | `AlertDialogComponent.kt` |
| Results | `SuccessMessage.tsx`, `FailureMessage.tsx` | `SuccessMessageView.kt`, `FailureMessageView.kt` |
| Icons | `src/components/Icon/` | `res/drawable/` |

---

*Document created: 2026-01-30*
*Based on: DESIGN_SYSTEM_PLAN.md (khenshin-web) and khipu-client-android codebase analysis*
