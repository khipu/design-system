# Khipu Design System

A multi-platform design system for the Khipu payment platform.

| Platform | Package | Registry |
|----------|---------|----------|
| **Web** (React/TypeScript) | `@khipu/design-system` | [npmjs.org](https://www.npmjs.com/package/@khipu/design-system) |
| **Android** (Kotlin/Compose) | `com.khipu:design-system` | [Nexus](https://dev.khipu.com/nexus/content/repositories/design-system) |
| **iOS** (Swift/SwiftUI) | `KhipuDesignSystem` | [CocoaPods](https://cocoapods.org/pods/KhipuDesignSystem) |

**Storybook:** [design.khipu.com](https://design.khipu.com)

## Installation

### Web
```bash
npm install @khipu/design-system
```

### Android
```kotlin
// build.gradle.kts
dependencies {
    implementation("com.khipu:design-system:0.1.0-alpha.44")
}
```

### iOS
```ruby
# Podfile
pod 'KhipuDesignSystem'
```

## Prerequisites

- Node.js >= 20.0.0
- React >= 18.0.0
- TypeScript >= 5.0.0

## Quick Start

### Import Components

```tsx
import { KdsButton, KdsTextField, KdsCard } from '@khipu/design-system';

function App() {
  return (
    <KdsCard>
      <KdsTextField label="Email" placeholder="Enter your email" />
      <KdsButton variant="contained" color="primary">
        Submit
      </KdsButton>
    </KdsCard>
  );
}
```

### Using Design Tokens

Access design tokens for consistent styling:

```tsx
import { tokens, colors, spacing, typography } from '@khipu/design-system';

const styles = {
  color: colors.primary.main,        // '#8347AD'
  padding: spacing[4],               // '16px'
  fontFamily: typography.body1.fontFamily,
};
```

### Import CSS Variables (Optional)

```tsx
import '@khipu/design-system/css';
```

### Using BeerCSS Bundle (For Grails/Legacy Apps)

The design system includes a complete **BeerCSS bundle** with Material Design 3 components, ideal for Grails applications or projects that prefer utility-based CSS:

```html
<!-- Via CDN -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@khipu/design-system@0.1.0-alpha.44/dist/beercss/khipu-beercss.min.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/@khipu/design-system@0.1.0-alpha.44/dist/beercss/khipu-beercss.min.js"></script>
```

```javascript
// Via npm
import '@khipu/design-system/beercss/css';
import '@khipu/design-system/beercss/js';
```

**What's included:**
- BeerCSS v4.0.1 (Material Design 3)
- Khipu design tokens (colors, spacing, typography)
- Custom Khipu components
- Vanilla JavaScript utilities (modals, snackbars, sidenav)

**See:** `src/beercss/README.md` for complete documentation

## Running the Project

### Setup

```bash
# Clone the repository
git clone git@github.com:khipu/design-system.git
cd design-system

# Install dependencies
npm install
```

### Available Scripts

#### Development

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development mode with watch |
| `npm run build` | Build the library for production |
| `npm run storybook` | Launch Storybook on port 6006 |
| `npm run build-storybook` | Build static Storybook site |
| `npm run test` | Run tests with Vitest |
| `npm run test:ui` | Run tests with Vitest UI |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run lint` | Lint source files |
| `npm run generate:tokens` | Generate Kotlin tokens to dist/ |
| `npm run generate:tokens:android` | Generate tokens to Android project |

#### Figma Synchronization

Sync design tokens from Figma to code:

| Command | Description |
|---------|-------------|
| `npm run sync:figma` | Extract all tokens (colors, typography, effects) |
| `npm run sync:figma:colors` | Extract only color tokens |
| `npm run sync:figma:typography` | Extract only typography styles |
| `npm run sync:figma:effects` | Extract only effects (shadows) |
| `npm run sync:figma:dry-run` | Preview extraction without changes |

**Setup required:**
```bash
export FIGMA_PERSONAL_ACCESS_TOKEN="your_token_here"
npm run sync:figma
```

See `scripts/README.md` for detailed documentation.

### Storybook

View and interact with components in isolation:

```bash
npm run storybook
```

Open http://localhost:6006 in your browser to explore the component library.

## Package Exports

| Export | Description |
|--------|-------------|
| `@khipu/design-system` | All components and tokens |
| `@khipu/design-system/tokens` | Design tokens only |
| `@khipu/design-system/css` | CSS variables |
| `@khipu/design-system/beercss` | BeerCSS bundle (CSS + JS) |
| `@khipu/design-system/beercss/css` | BeerCSS CSS only |
| `@khipu/design-system/beercss/js` | BeerCSS JavaScript only |
| `@khipu/design-system/components/core` | Core UI components |
| `@khipu/design-system/components/domain` | Domain-specific components |

## Available Components

### Core Components (17)

Foundational UI primitives with Khipu theme:

| Component | Description | Storybook |
|-----------|-------------|-----------|
| `KdsButton` | Action buttons with variants: `contained`, `outlined`, `text` | ✅ |
| `KdsTextField` | Text input fields with validation support | ✅ |
| `KdsCheckbox` | Checkbox input with multiple sizes and colors | ✅ |
| `KdsRadioGroup` | Radio button group component | ⚪ |
| `KdsSelect` | Dropdown selection component | ⚪ |
| `KdsModal` | Dialog/modal windows with sizes and transitions | ✅ |
| `KdsCard` | Container with header, content, and actions | ✅ |
| `KdsSpinner` | Loading indicator with multiple sizes | ✅ |
| `KdsLinearProgress` | Progress bar indicator | ⚪ |
| `KdsAlert` | Alert/notification messages | ⚪ |
| `KdsTypography` | Text component with semantic variants | ✅ |
| `KdsTabs` | Tab navigation component | ✅ |
| `KdsLogoHeader` | Khipu branded header with logo | ✅ |
| `KdsChip` | Compact element for tags/labels | ⚪ |
| `KdsSnackbar` | Toast notifications | ⚪ |
| `KdsTooltip` | Contextual help tooltips | ⚪ |
| `KdsAccordion` | Expandable/collapsible panels | ⚪ |

**Coverage:** 9/17 components have Storybook stories (53%)

### Domain Components

_Planned for future releases_ - Domain-specific components for the payment platform will be added as the system matures.

## Design Tokens

Comprehensive tokens extracted from Figma (Pagos Automáticos - MUI v610):

- **Colors** - Primary (purple #8347AD), secondary, semantic (success, warning, error, info)
- **Typography** - Font families (Public Sans, Roboto), sizes, weights, presets
- **Spacing** - Consistent spacing scale (4px base unit)
- **Border Radius** - From `sm` (4px) to `full` (pill shape)
- **Shadows** - MUI-compatible elevation system (elevation1-24)
- **Transitions** - Duration and easing values
- **Breakpoints** - Responsive design breakpoints (xs, sm, md, lg, xl)

## Cross-Platform Token Sync (Android/Compose)

This design system supports exporting tokens to Android/Kotlin for use with Jetpack Compose, ensuring visual consistency across web and mobile platforms.

### Single Source of Truth

Tokens are defined in `src/tokens/tokens.json` and can be exported to:
- **TypeScript** (web) - `src/tokens/index.ts`
- **Kotlin** (Android) - `DesignTokens.kt`

### Generate Kotlin Tokens

```bash
# Generate to dist/DesignTokens.kt
npm run generate:tokens

# Generate directly to Android project
npm run generate:tokens:android
```

### Using Tokens in Compose

```kotlin
import com.khipu.client.ui.theme.KdsColors
import com.khipu.client.ui.theme.KdsSpacing
import com.khipu.client.ui.theme.KdsBorderRadius

@Composable
fun PaymentCard() {
    Card(
        colors = CardDefaults.cardColors(
            containerColor = KdsColors.backgroundPaper
        ),
        shape = RoundedCornerShape(KdsBorderRadius.radiusCard),
        modifier = Modifier.padding(KdsSpacing.space4)
    ) {
        Text(
            text = "Payment",
            color = KdsColors.textPrimary
        )
        Button(
            colors = ButtonDefaults.buttonColors(
                containerColor = KdsColors.primaryMain
            )
        ) {
            Text("Pay Now")
        }
    }
}
```

### Available Kotlin Objects

| Object | Contents |
|--------|----------|
| `KdsColors` | All color tokens (primary, secondary, semantic, text, background) |
| `KdsTypography` | Font weights, sizes, line heights |
| `KdsSpacing` | Spacing scale (0-24, in 4px increments) |
| `KdsBorderRadius` | Border radius values |
| `KdsTransitions` | Animation durations |
| `KdsBreakpoints` | Responsive breakpoints |

### Workflow

1. Update tokens in `src/tokens/tokens.json`
2. Run `npm run generate:tokens:android`
3. Commit both `tokens.json` and the generated `DesignTokens.kt`

## TypeScript Support

All components are fully typed. Import types alongside components:

```tsx
import {
  KdsButton,
  type KdsButtonProps,
  type KdsButtonVariant,
  type KdsButtonColor
} from '@khipu/design-system';
```

## Project Structure

```
src/
├── index.ts              # Main entry point
├── tokens/
│   ├── index.ts          # Design tokens (source of truth)
│   ├── tokens.json       # Generated - JSON format
│   └── css-variables.css # Generated - CSS custom properties
├── theme/
│   ├── index.ts          # MUI theme configuration
│   └── ThemeProvider.tsx # Theme provider component
└── components/
    ├── core/             # 17 Core UI components (Kds* prefix)
    │   ├── KdsButton/
    │   ├── KdsTextField/
    │   ├── KdsCheckbox/
    │   ├── KdsRadioGroup/
    │   ├── KdsSelect/
    │   ├── KdsModal/
    │   ├── KdsCard/
    │   ├── KdsSpinner/
    │   ├── KdsLinearProgress/
    │   ├── KdsAlert/
    │   ├── KdsTypography/
    │   ├── KdsTabs/
    │   ├── KdsLogoHeader/
    │   ├── KdsChip/
    │   ├── KdsSnackbar/
    │   ├── KdsTooltip/
    │   └── KdsAccordion/
    └── domain/           # Future: Domain-specific components
        └── (empty)
```

## License

MIT
