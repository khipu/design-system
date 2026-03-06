# Khipu Design System

A comprehensive design system for the Khipu payment platform, built with TypeScript and React.

## Prerequisites

- Node.js >= 18.0.0
- React >= 17.0.0

## Installation

```bash
npm install @khipu/design-system
```

## Quick Start

### Import Components

```tsx
import { Button, TextField, Card } from '@khipu/design-system';

function App() {
  return (
    <Card>
      <TextField label="Email" placeholder="Enter your email" />
      <Button variant="contained" color="primary">
        Submit
      </Button>
    </Card>
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

## Running the Project

### Setup

```bash
# Clone the repository
git clone https://github.com/khipu/design-system.git
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
| `@khipu/design-system/components/core` | Core UI components |
| `@khipu/design-system/components/domain` | Domain-specific components |

## Available Components

### Core Components

Foundational UI primitives:

| Component | Description |
|-----------|-------------|
| `Button` | Action buttons with variants: `contained`, `outlined`, `text` |
| `TextField` | Text input fields with validation support |
| `Checkbox` | Checkbox input with multiple sizes and colors |
| `Select` | Dropdown selection component |
| `Modal` | Dialog/modal windows |
| `Card` | Container with `CardHeader`, `CardContent`, `CardActions` |
| `Spinner` | Loading indicator |

### Domain Components

Khipu-specific components for the payment platform:

| Component | Description |
|-----------|-------------|
| `BankSelector` | Bank selection interface |
| `PaymentStepper` | Multi-step payment flow indicator |
| `MandateStatusBadge` | Status badge for payment mandates |
| `PayoutSummaryCard` | Payout information display |
| `EmptyState` | Empty state placeholder |

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
  Button,
  type ButtonProps,
  type ButtonVariant,
  type ButtonColor
} from '@khipu/design-system';
```

## Project Structure

```
src/
├── index.ts              # Main entry point
├── tokens/
│   ├── index.ts          # Design tokens
│   └── css-variables.css # CSS custom properties
└── components/
    ├── core/             # Core UI components
    │   ├── Button/
    │   ├── TextField/
    │   ├── Checkbox/
    │   ├── Select/
    │   ├── Modal/
    │   ├── Card/
    │   └── Spinner/
    └── domain/           # Domain-specific components
        ├── BankSelector/
        ├── PaymentStepper/
        ├── MandateStatusBadge/
        ├── PayoutSummaryCard/
        └── EmptyState/
```

## License

MIT
