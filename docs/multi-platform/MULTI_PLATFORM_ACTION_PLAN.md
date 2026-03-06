# Multi-Platform Design System - Action Plan

## Executive Summary

This document synthesizes the **Web Design System Plan** (React/MUI) and the **Android Cross-Platform Analysis** (Kotlin/Compose) into a unified action plan for building a multi-platform design system with:

1. **Shared Design Tokens** - Single source of truth for colors, spacing, typography
2. **Platform-Specific Components** - React components for web, Compose components for Android
3. **Shared Component Logic** - Where feasible, abstract component behavior/composition

---

## 1. Current State Analysis

### 1.1 Key Findings

| Area | Web (khenshin-web) | Android (khipu-client) | Gap Level |
|------|-------------------|------------------------|-----------|
| **Primary Color** | `#3CB4E5` (blue) | `#7E42A8` (purple) | **CRITICAL** |
| **Spacing Base** | 8px grid | 8dp grid | Aligned |
| **Font Family** | Public Sans | Public Sans | Aligned |
| **Dark Mode** | Not implemented | Full support | Android ahead |
| **Button Variants** | 3 (contained/outlined/text) | 1 (filled only) | Web ahead |
| **RadioCardGroup** | Planned | Missing | **CRITICAL** |
| **OTP Field** | Missing | Implemented | Android ahead |
| **Dynamic Theming** | Via API | Via KhipuColors.Builder | Both support |

### 1.2 Critical Decisions Required

Before proceeding, stakeholders must decide:

| # | Decision | Options | Recommendation |
|---|----------|---------|----------------|
| 1 | **Primary Brand Color** | Blue `#3CB4E5` vs Purple `#8347AD` | Use purple (matches Figma "K-Tokens") |
| 2 | **Spacing Naming** | Numeric (`4`) vs Semantic (`dpSmall`) | **Numeric** - simpler, cross-platform |
| 3 | **Dark Mode for Web** | Implement now vs defer | Implement now for parity |
| 4 | **Token Source** | Figma vs Code-first | **Code-first** (Figma API limitations) |

---

## 2. Proposed Architecture

### 2.1 Three-Layer Design System

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          LAYER 1: SHARED TOKENS                          │
│                                                                          │
│   ┌──────────────────────────────────────────────────────────────────┐  │
│   │                        tokens.json                                │  │
│   │  {                                                                │  │
│   │    "colors": { "primary": "#8347AD", ... },                      │  │
│   │    "spacing": { "1": 4, "2": 8, "3": 12, "4": 16, ... },        │  │
│   │    "typography": { "fontFamily": "Public Sans", ... },           │  │
│   │    "borderRadius": { "sm": 4, "md": 8, ... },                   │  │
│   │    "shadows": { ... }                                            │  │
│   │  }                                                                │  │
│   └──────────────────────────────────────────────────────────────────┘  │
│                                    │                                     │
│            ┌───────────────────────┴───────────────────────┐            │
│            ▼                                               ▼            │
│   ┌────────────────────┐                      ┌────────────────────┐   │
│   │    tokens.ts       │                      │   KdsTokens.kt     │   │
│   │    (TypeScript)    │                      │     (Kotlin)       │   │
│   └────────────────────┘                      └────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                      LAYER 2: COMPONENT CONTRACTS                        │
│                                                                          │
│   ┌──────────────────────────────────────────────────────────────────┐  │
│   │                    component-specs.json                           │  │
│   │  {                                                                │  │
│   │    "Button": {                                                    │  │
│   │      "props": {                                                   │  │
│   │        "variant": ["contained", "outlined", "text"],             │  │
│   │        "color": ["primary", "secondary", "error"],               │  │
│   │        "size": ["small", "medium", "large"],                     │  │
│   │        "loading": "boolean",                                      │  │
│   │        "disabled": "boolean",                                     │  │
│   │        "fullWidth": "boolean"                                     │  │
│   │      },                                                           │  │
│   │      "tokens": {                                                  │  │
│   │        "minHeight": "dimensions.buttonMinHeight",                │  │
│   │        "borderRadius": "borderRadius.sm"                         │  │
│   │      }                                                            │  │
│   │    },                                                             │  │
│   │    "RadioCardGroup": { ... },                                    │  │
│   │    ...                                                            │  │
│   │  }                                                                │  │
│   └──────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                    LAYER 3: PLATFORM IMPLEMENTATIONS                     │
│                                                                          │
│   ┌──────────────────────────┐          ┌──────────────────────────┐   │
│   │      WEB (React/MUI)     │          │   ANDROID (Compose)      │   │
│   │                          │          │                          │   │
│   │  - Button.tsx            │          │  - ButtonComponent.kt    │   │
│   │  - RadioCardGroup.tsx    │          │  - RadioCardGroup.kt     │   │
│   │  - PasswordField.tsx     │          │  - SecureTextField.kt    │   │
│   │  - ConfirmationDialog    │          │  - AlertDialog.kt        │   │
│   │  - LoadingOverlay.tsx    │          │  - LoadingScreen.kt      │   │
│   │  - ResultScreen.tsx      │          │  - ResultViews.kt        │   │
│   │  - OtpField.tsx (NEW)    │          │  - OtpComponent.kt       │   │
│   │                          │          │                          │   │
│   │  @khipu/design-system    │          │  com.khipu.designsystem │   │
│   └──────────────────────────┘          └──────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Repository Structure

```
khipu-design-system/                    # Monorepo root
├── tokens/                             # LAYER 1: Shared tokens
│   ├── tokens.json                     # Source of truth
│   ├── generators/
│   │   ├── generate-typescript.js      # → web/src/tokens/
│   │   └── generate-kotlin.js          # → android/src/.../tokens/
│   └── package.json
│
├── specs/                              # LAYER 2: Component contracts
│   ├── component-specs.json            # API definitions
│   └── validators/
│       ├── validate-web.js
│       └── validate-android.js
│
├── web/                                # LAYER 3a: React implementation
│   ├── src/
│   │   ├── tokens/                     # Generated from tokens/
│   │   ├── theme/
│   │   ├── components/
│   │   │   ├── Button/
│   │   │   ├── RadioCardGroup/
│   │   │   ├── PasswordField/
│   │   │   ├── ConfirmationDialog/
│   │   │   ├── LoadingOverlay/
│   │   │   ├── ResultScreen/
│   │   │   └── OtpField/               # NEW: From Android
│   │   └── icons/
│   ├── stories/
│   └── package.json                    # @khipu/design-system
│
├── android/                            # LAYER 3b: Compose implementation
│   ├── designsystem/
│   │   ├── tokens/                     # Generated from tokens/
│   │   ├── theme/
│   │   ├── components/
│   │   │   ├── Button.kt
│   │   │   ├── RadioCardGroup.kt       # NEW: From Web plan
│   │   │   ├── SecureTextField.kt
│   │   │   ├── AlertDialog.kt
│   │   │   ├── LoadingScreen.kt
│   │   │   ├── ResultViews.kt
│   │   │   └── OtpComponent.kt
│   │   └── icons/
│   └── build.gradle.kts                # com.khipu.designsystem
│
├── icons/                              # Shared icon sources
│   ├── svg/                            # Source SVGs
│   ├── generators/
│   │   ├── generate-react.js           # → web/src/icons/
│   │   └── generate-android.js         # → android/.../drawable/
│   └── icon-manifest.json
│
└── docs/                               # Documentation
    ├── tokens.md
    ├── components.md
    └── migration-guide.md
```

---

## 3. Unified Token Schema

### 3.1 Master Token Definition (`tokens/tokens.json`)

```json
{
  "$schema": "https://khipu.com/design-tokens/v1",
  "version": "1.0.0",

  "colors": {
    "primary": {
      "main": "#8347AD",
      "light": "#A66BC7",
      "dark": "#5E3280",
      "contrast": "#FFFFFF"
    },
    "secondary": {
      "main": "#3CB4E5",
      "light": "#6BC7EC",
      "dark": "#2A8FB8",
      "contrast": "#FFFFFF"
    },
    "success": {
      "main": "#2CA24D",
      "light": "#EDF7ED",
      "dark": "#1E7B35",
      "contrast": "#FFFFFF"
    },
    "warning": {
      "main": "#ED6C02",
      "light": "#FFF4E5",
      "dark": "#C55A02",
      "contrast": "#FFFFFF"
    },
    "error": {
      "main": "#D32F2F",
      "light": "#FDEDED",
      "dark": "#B71C1C",
      "contrast": "#FFFFFF"
    },
    "info": {
      "main": "#005EB5",
      "light": "#E5F6FD",
      "dark": "#014361",
      "contrast": "#FFFFFF"
    },
    "neutral": {
      "50": "#FAFAFA",
      "100": "#F7F7F7",
      "200": "#E3E3E3",
      "300": "#DDDEE0",
      "400": "#BDBFC4",
      "500": "#9E9E9E",
      "600": "#767E8D",
      "700": "#6D6B71",
      "800": "#424242",
      "900": "#212121"
    },
    "background": {
      "default": "#FFFFFF",
      "paper": "#FFFFFF",
      "elevated": "#FAFAFA"
    },
    "text": {
      "primary": "#272930",
      "secondary": "#767E8D",
      "disabled": "#9E9E9E",
      "hint": "#BDBFC4"
    }
  },

  "colorsDark": {
    "primary": {
      "main": "#BB86FC",
      "light": "#D4BBFF",
      "dark": "#8347AD",
      "contrast": "#000000"
    },
    "background": {
      "default": "#121212",
      "paper": "#1E1E1E",
      "elevated": "#2D2D2D"
    },
    "text": {
      "primary": "#FFFFFF",
      "secondary": "#B0B0B0",
      "disabled": "#6D6D6D"
    }
  },

  "spacing": {
    "0": 0,
    "1": 4,
    "2": 8,
    "3": 12,
    "4": 16,
    "5": 20,
    "6": 24,
    "8": 32,
    "10": 40,
    "12": 48,
    "16": 64
  },

  "typography": {
    "fontFamily": {
      "primary": "Public Sans",
      "secondary": "Roboto",
      "monospace": "Roboto Mono"
    },
    "scale": {
      "xs": { "fontSize": 10, "lineHeight": 1.5, "fontWeight": 400 },
      "sm": { "fontSize": 12, "lineHeight": 1.5, "fontWeight": 400 },
      "md": { "fontSize": 14, "lineHeight": 1.57, "fontWeight": 400 },
      "lg": { "fontSize": 16, "lineHeight": 1.5, "fontWeight": 400 },
      "xl": { "fontSize": 20, "lineHeight": 1.4, "fontWeight": 600 },
      "2xl": { "fontSize": 24, "lineHeight": 1.3, "fontWeight": 600 },
      "3xl": { "fontSize": 32, "lineHeight": 1.2, "fontWeight": 700 }
    }
  },

  "borderRadius": {
    "none": 0,
    "sm": 4,
    "md": 8,
    "lg": 16,
    "xl": 24,
    "2xl": 32,
    "full": 9999
  },

  "shadows": {
    "none": "none",
    "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
  },

  "dimensions": {
    "buttonMinHeight": 50,
    "inputHeight": 56,
    "radioCardMinHeight": 65,
    "containerMaxWidth": 450,
    "modalMaxWidth": 450
  }
}
```

### 3.2 Generated Outputs

**TypeScript (`web/src/tokens/index.ts`):**
```typescript
// AUTO-GENERATED - DO NOT EDIT
// Generated from tokens/tokens.json

export const colors = {
  primary: {
    main: '#8347AD',
    light: '#A66BC7',
    dark: '#5E3280',
    contrast: '#FFFFFF',
  },
  // ...
} as const;

export const spacing = {
  0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 10: 40, 12: 48, 16: 64
} as const;

// ...
```

**Kotlin (`android/designsystem/tokens/KdsTokens.kt`):**
```kotlin
// AUTO-GENERATED - DO NOT EDIT
// Generated from tokens/tokens.json

package com.khipu.designsystem.tokens

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

object KdsColors {
    val primaryMain = Color(0xFF8347AD)
    val primaryLight = Color(0xFFA66BC7)
    val primaryDark = Color(0xFF5E3280)
    val primaryContrast = Color(0xFFFFFFFF)
    // ...
}

object KdsSpacing {
    val s0 = 0.dp
    val s1 = 4.dp
    val s2 = 8.dp
    val s3 = 12.dp
    val s4 = 16.dp
    // ...
}

// ...
```

---

## 4. Component Parity Matrix

### 4.1 Unified Component Catalog

| Component | Web Status | Android Status | Priority | Notes |
|-----------|------------|----------------|----------|-------|
| **Button** | Exists | Needs variants | High | Unify API |
| **TextField** | Use MUI | Exists | Low | Keep native |
| **PasswordField** | Planned | Exists (secure mode) | High | Add to web |
| **RadioCardGroup** | Planned | **MISSING** | **Critical** | Add to Android |
| **ConfirmationDialog** | Planned | Exists (simpler) | Medium | Enhance Android |
| **LoadingOverlay** | Planned | Different pattern | Medium | Unify pattern |
| **ResultScreen** | Planned | Split views | Low | Already aligned |
| **OtpField** | **MISSING** | Exists | High | Add to web |
| **CoordinatesField** | **MISSING** | Exists | Medium | Add to web |
| **InactivityModal** | **MISSING** | Exists | Medium | Add to web |

### 4.2 Unified Component API: Button

```typescript
// Component Contract (specs/components/Button.json)
{
  "name": "Button",
  "description": "Primary action button",
  "props": {
    "variant": {
      "type": "enum",
      "values": ["contained", "outlined", "text"],
      "default": "contained",
      "description": "Visual style variant"
    },
    "color": {
      "type": "enum",
      "values": ["primary", "secondary", "success", "warning", "error"],
      "default": "primary",
      "description": "Color scheme"
    },
    "size": {
      "type": "enum",
      "values": ["small", "medium", "large"],
      "default": "medium",
      "description": "Size variant"
    },
    "fullWidth": {
      "type": "boolean",
      "default": true,
      "description": "Stretch to container width"
    },
    "disabled": {
      "type": "boolean",
      "default": false,
      "description": "Disable interaction"
    },
    "loading": {
      "type": "boolean",
      "default": false,
      "description": "Show loading spinner"
    },
    "startIcon": {
      "type": "icon",
      "optional": true,
      "description": "Icon before label"
    },
    "endIcon": {
      "type": "icon",
      "optional": true,
      "description": "Icon after label"
    }
  },
  "tokens": {
    "minHeight": "dimensions.buttonMinHeight",
    "borderRadius": "borderRadius.sm",
    "fontWeight": 600
  }
}
```

### 4.3 Unified Component API: RadioCardGroup

```typescript
// Component Contract (specs/components/RadioCardGroup.json)
{
  "name": "RadioCardGroup",
  "description": "Card-based single selection group (e.g., bank selection)",
  "props": {
    "options": {
      "type": "array",
      "items": {
        "value": "string",
        "label": "string | ReactNode",
        "description": "string?",
        "icon": "icon?",
        "disabled": "boolean?"
      },
      "description": "Selection options"
    },
    "value": {
      "type": "string",
      "description": "Currently selected value"
    },
    "onChange": {
      "type": "function",
      "signature": "(value: string) => void",
      "description": "Selection change handler"
    },
    "name": {
      "type": "string",
      "optional": true,
      "description": "Form field name"
    }
  },
  "tokens": {
    "minHeight": "dimensions.radioCardMinHeight",
    "borderRadius": "borderRadius.md",
    "borderColor": "colors.neutral.300",
    "selectedBorderColor": "colors.primary.main",
    "selectedBackground": "colors.primary.light + 10% opacity"
  }
}
```

---

## 5. Icon System Strategy

### 5.1 Unified Icon Library

```
icons/
├── svg/                          # Source files (master)
│   ├── abandon.svg
│   ├── authorize-login.svg
│   ├── authorize-transfer.svg
│   ├── email.svg
│   ├── geolocation.svg
│   ├── inactivity.svg
│   ├── khipu-logo.svg
│   ├── lock.svg
│   ├── plane.svg
│   ├── privacy.svg
│   ├── qr-skeleton.svg
│   ├── rain-cloud.svg
│   ├── setting.svg
│   ├── telegram.svg
│   ├── whatsapp.svg
│   └── ...
│
├── icon-manifest.json            # Icon registry
│   {
│     "icons": [
│       { "name": "abandon", "category": "status", "usage": "Cancel confirmation" },
│       { "name": "authorize-login", "category": "auth", "usage": "Login progress" },
│       ...
│     ]
│   }
│
└── generators/
    ├── generate-react.js         # SVG → React components
    └── generate-android.js       # SVG → Vector Drawable XML
```

### 5.2 Generated Outputs

**React (`web/src/icons/`):**
```tsx
// AUTO-GENERATED
export const AbandonIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', ...props }) => (
  <svg width={size} height={size} fill={color} {...props}>
    {/* SVG path */}
  </svg>
);
```

**Android (`android/res/drawable/`):**
```xml
<!-- AUTO-GENERATED: ic_abandon.xml -->
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp"
    android:height="24dp"
    android:viewportWidth="24"
    android:viewportHeight="24">
    <path android:fillColor="@color/on_surface" android:pathData="..." />
</vector>
```

---

## 6. Implementation Phases

### Phase 1: Foundation (Week 1-2)

| Task | Owner | Deliverable |
|------|-------|-------------|
| 1.1 Create `tokens/tokens.json` | Design System | Unified token file |
| 1.2 Build TypeScript generator | Web Dev | `npm run generate:ts` |
| 1.3 Build Kotlin generator | Android Dev | `npm run generate:kt` |
| 1.4 Migrate web tokens | Web Dev | Update `src/tokens/` |
| 1.5 Migrate Android tokens | Android Dev | Update `KdsTokens.kt` |
| 1.6 Visual regression test | QA | Screenshot comparison |

**Success Criteria:**
- [ ] Both platforms compile with generated tokens
- [ ] Visual appearance matches current (no regression)
- [ ] Single `npm run generate` updates both platforms

### Phase 2: Component Contracts (Week 2-3)

| Task | Owner | Deliverable |
|------|-------|-------------|
| 2.1 Define Button contract | Design | `specs/Button.json` |
| 2.2 Define RadioCardGroup contract | Design | `specs/RadioCardGroup.json` |
| 2.3 Define PasswordField contract | Design | `specs/PasswordField.json` |
| 2.4 Define OtpField contract | Design | `specs/OtpField.json` |
| 2.5 Build contract validators | Dev | Validate implementations |

**Success Criteria:**
- [ ] All high-priority components have JSON contracts
- [ ] Validators can check web/android implementations against contracts

### Phase 3: Web Components (Week 3-5)

| Task | Owner | Deliverable |
|------|-------|-------------|
| 3.1 Implement RadioCardGroup | Web Dev | Component + Stories |
| 3.2 Implement PasswordField | Web Dev | Component + Stories |
| 3.3 Implement OtpField (NEW) | Web Dev | Component + Stories |
| 3.4 Implement ConfirmationDialog | Web Dev | Component + Stories |
| 3.5 Implement LoadingOverlay | Web Dev | Component + Stories |
| 3.6 Add dark mode support | Web Dev | Theme toggle |
| 3.7 Storybook documentation | Web Dev | Complete stories |

**Success Criteria:**
- [ ] All components pass contract validation
- [ ] Storybook shows all variants
- [ ] khenshin-web can import and use components

### Phase 4: Android Components (Week 3-5, Parallel)

| Task | Owner | Deliverable |
|------|-------|-------------|
| 4.1 Implement RadioCardGroup (NEW) | Android Dev | Composable + Preview |
| 4.2 Add Button variants | Android Dev | outlined/text variants |
| 4.3 Enhance AlertDialog | Android Dev | Match web ConfirmationDialog |
| 4.4 Unify loading pattern | Android Dev | Match LoadingOverlay |
| 4.5 Compose previews | Android Dev | All component previews |

**Success Criteria:**
- [ ] All components pass contract validation
- [ ] Compose previews show all variants
- [ ] khipu-client-android can use components

### Phase 5: Icon System (Week 4)

| Task | Owner | Deliverable |
|------|-------|-------------|
| 5.1 Audit & consolidate SVGs | Design | Unified icon set |
| 5.2 Build React icon generator | Web Dev | `npm run generate:icons` |
| 5.3 Build Android icon generator | Android Dev | Vector drawable output |
| 5.4 Update web to use new icons | Web Dev | Import from package |
| 5.5 Update Android to use new icons | Android Dev | Import from package |

**Success Criteria:**
- [ ] Single SVG source generates both platforms
- [ ] All payment flow icons available on both platforms

### Phase 6: Integration & Migration (Week 5-6)

| Task | Owner | Deliverable |
|------|-------|-------------|
| 6.1 Update khenshin-web | Web Dev | Use @khipu/design-system |
| 6.2 Update khipu-client-android | Android Dev | Use designsystem module |
| 6.3 Remove duplicated code | Both | Clean old implementations |
| 6.4 E2E testing | QA | Full payment flow tests |
| 6.5 Documentation | Tech Writer | Migration guide |

**Success Criteria:**
- [ ] Both apps use design system exclusively
- [ ] No visual regressions
- [ ] Payment flows work end-to-end

---

## 7. Shared Component Logic Strategy

### 7.1 What Can Be Shared

| Logic Type | Shareable? | Approach |
|------------|------------|----------|
| **Validation Rules** | Yes | JSON schema or shared JS/KMP |
| **State Machines** | Yes | XState (web) / shared spec |
| **Animation Timing** | Yes | Token-based durations |
| **Accessibility Rules** | Yes | Shared specification |
| **Business Rules** | Partial | API contracts |

### 7.2 Recommended: Specification-Driven Development

Rather than sharing code (which is complex with React + Compose), share **specifications**:

```json
// specs/behaviors/OtpField.json
{
  "behavior": {
    "autoFocus": "Focus first input on mount",
    "autoAdvance": "Move to next input after digit entry",
    "backspace": "Clear current, move to previous if empty",
    "paste": "Distribute digits across inputs",
    "validation": {
      "pattern": "^[0-9]{6}$",
      "errorMessage": "Ingresa los 6 dígitos"
    }
  },
  "accessibility": {
    "role": "textbox",
    "ariaLabel": "Código de verificación, dígito {n} de 6",
    "announceOnComplete": "Código ingresado: {code}"
  }
}
```

Both platforms implement the same spec, ensuring consistent behavior.

### 7.3 Future: Kotlin Multiplatform (KMP)

For true code sharing, consider KMP for:
- Validation logic
- State machines
- API clients

```
┌─────────────────────────────────────────────────────────────────┐
│                     KMP Shared Module                            │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  common/                                                    │ │
│  │    - ValidationRules.kt                                    │ │
│  │    - OtpStateMachine.kt                                    │ │
│  │    - ColorUtils.kt (HSL computations)                      │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              │                                   │
│            ┌─────────────────┴─────────────────┐                │
│            ▼                                   ▼                │
│  ┌──────────────────┐              ┌──────────────────┐        │
│  │  JS/TS Target    │              │  Android Target  │        │
│  │  (for React)     │              │  (for Compose)   │        │
│  └──────────────────┘              └──────────────────┘        │
└─────────────────────────────────────────────────────────────────┘
```

**Recommendation:** Start with specification-driven development. Evaluate KMP after Phase 6 based on maintenance overhead.

---

## 8. Risk Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Token mismatch breaks UI | High | High | Visual regression tests |
| Android RadioCardGroup UX differs | Medium | Medium | Prototype first, get design approval |
| Icon conversion quality loss | Low | Medium | Manual QA of generated icons |
| Bundle size increase | Medium | Low | Tree-shaking, code splitting |
| Migration breaks production | High | Critical | Feature flags, gradual rollout |

---

## 9. Success Metrics

### 9.1 Quantitative

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Token sync time | < 30 seconds | `npm run generate` duration |
| Component parity | 100% high-priority | Contract validator pass rate |
| Bundle size delta | < 5% increase | Before/after comparison |
| Visual regression | 0 failures | Percy/Chromatic tests |
| Build time | No increase | CI pipeline duration |

### 9.2 Qualitative

- [ ] Designers can update tokens without code changes
- [ ] New components can be added following documented patterns
- [ ] Both platforms feel visually consistent
- [ ] Developer experience is improved (less duplication)

---

## 10. Open Questions for Stakeholders

### Immediate (Blocking Phase 1)

1. **Confirm primary color:** `#8347AD` (purple) as single source?
2. **Dark mode scope:** Full parity or web deferred?
3. **Monorepo or separate repos?** This plan assumes monorepo.

### Medium-term (Before Phase 4)

4. **RadioCardGroup on Android:** Same pattern or native alternative?
5. **Button variants on Android:** All 3 or mobile-optimized subset?
6. **Compose previews in CI:** Worth the setup cost?

### Long-term (Post Phase 6)

7. **KMP investment:** Worth the complexity for shared logic?
8. **iOS parity:** When to add SwiftUI implementation?
9. **Design token automation:** Revisit Figma API when available?

---

## 11. Appendix: File Changes Summary

### New Files to Create

```
tokens/tokens.json                     # Master token file
tokens/generators/generate-typescript.js
tokens/generators/generate-kotlin.js
specs/components/Button.json
specs/components/RadioCardGroup.json
specs/components/PasswordField.json
specs/components/OtpField.json
icons/svg/*.svg                        # Consolidated icons
icons/generators/generate-react.js
icons/generators/generate-android.js
```

### Files to Modify

```
web/src/tokens/index.ts               # Now auto-generated
web/src/components/index.ts           # Add new components
android/.../tokens/KdsTokens.kt       # Now auto-generated
android/.../components/*.kt           # Add variants
```

### Files to Delete (After Migration)

```
khenshin-web/src/themes/ThemeCreator.ts   # Replaced by design-system theme
khenshin-web/src/themes/spacing.ts        # Replaced by tokens
khenshin-web/src/components/Icon/*.tsx    # Replaced by icon library
khipu-client-android/.../Dimensions.kt    # Replaced by KdsTokens
```

---

*Document created: 2026-01-30*
*Status: Ready for stakeholder review*
*Next action: Schedule decision meeting for blocking questions (Section 10)*
