# Khipu Design System - iOS

SwiftUI components and design tokens for building consistent payment experiences on iOS.

## Installation

### CocoaPods

Add to your `Podfile`:

```ruby
pod 'KhipuDesignSystem', '~> 0.1.0-alpha.13'
```

Then run:

```bash
pod install
```

## Quick Start

```swift
import SwiftUI
import KhipuDesignSystem

struct PaymentView: View {
    @State private var isProcessing = false

    var body: some View {
        VStack(spacing: KdsTokens.Spacing.space3) {
            // Primary action button
            KdsButton("Pagar Ahora") {
                handlePayment()
            }
            .loading(isProcessing)

            // Secondary action
            KdsButton("Cancelar", variant: .outlined, color: .error) {
                handleCancel()
            }

            // Text button
            KdsButton("Más información", variant: .text, color: .info) {
                showInfo()
            }
            .fullWidth(false)
        }
        .padding(KdsTokens.Spacing.space2)
    }

    private func handlePayment() {
        isProcessing = true
        // Process payment...
    }

    private func handleCancel() {
        // Handle cancellation
    }

    private func showInfo() {
        // Show info
    }
}
```

## Components

### KdsButton

A versatile button component with multiple variants, colors, and states.

**Variants:**
- `.contained` - Filled button with solid background (default)
- `.outlined` - Button with border and transparent background
- `.text` - Text-only button

**Colors:**
- `.primary` (default) - Main brand color (#4CAF50)
- `.secondary` - Secondary brand color (#3CB4E5)
- `.success` - Success/confirmation actions (#2E7D32)
- `.warning` - Warning actions (#ED6C02)
- `.error` - Error/destructive actions (#D32F2F)
- `.info` - Informational actions (#0288D1)

**Sizes:**
- `.small` - 36pt height
- `.medium` - 44pt height
- `.large` - 56pt height (default)

**Examples:**

```swift
// Basic button
KdsButton("Confirmar") {
    // Action
}

// Outlined error button
KdsButton("Eliminar", variant: .outlined, color: .error) {
    // Delete action
}

// Small text button
KdsButton("Cancelar", variant: .text, size: .small) {
    // Cancel
}
.fullWidth(false)

// Loading state
KdsButton("Procesando...") {
    // Action
}
.loading(true)

// Disabled state
KdsButton("Continuar") {
    // Action
}
.enabled(false)

// With custom width
KdsButton("Aceptar") {
    // Action
}
.fullWidth(false)
```

## Design Tokens

All design tokens are available through the `KdsTokens` struct.

### Colors

```swift
// Primary palette
KdsTokens.Colors.primaryMain          // #4CAF50
KdsTokens.Colors.primaryLight         // #81C784
KdsTokens.Colors.primaryDark          // #388E3C
KdsTokens.Colors.primaryContrastText  // #FFFFFF

// Secondary palette
KdsTokens.Colors.secondaryMain
KdsTokens.Colors.secondaryLight
KdsTokens.Colors.secondaryDark
KdsTokens.Colors.secondaryContrastText

// Semantic colors
KdsTokens.Colors.successMain
KdsTokens.Colors.warningMain
KdsTokens.Colors.errorMain
KdsTokens.Colors.infoMain

// Text colors
KdsTokens.Colors.textPrimary
KdsTokens.Colors.textSecondary
KdsTokens.Colors.textDisabled

// Background colors
KdsTokens.Colors.backgroundDefault
KdsTokens.Colors.backgroundPaper
KdsTokens.Colors.backgroundElevated

// Action colors
KdsTokens.Colors.actionActive
KdsTokens.Colors.actionHover
KdsTokens.Colors.actionDisabled
```

### Typography

```swift
// Font sizes
KdsTokens.Typography.fontSizeXs       // 12pt
KdsTokens.Typography.fontSizeSm       // 14pt
KdsTokens.Typography.fontSizeBase     // 16pt
KdsTokens.Typography.fontSizeLg       // 18pt
KdsTokens.Typography.fontSizeXl       // 20pt
KdsTokens.Typography.fontSizeSize2Xl  // 24pt
KdsTokens.Typography.fontSizeSize3Xl  // 30pt
KdsTokens.Typography.fontSizeSize4Xl  // 36pt

// Font weights
KdsTokens.Typography.fontWeightRegular    // .regular
KdsTokens.Typography.fontWeightMedium     // .medium
KdsTokens.Typography.fontWeightSemiBold   // .semibold
KdsTokens.Typography.fontWeightBold       // .bold

// Line heights
KdsTokens.Typography.lineHeightTight      // 1.2
KdsTokens.Typography.lineHeightSnug       // 1.375
KdsTokens.Typography.lineHeightNormal     // 1.5
KdsTokens.Typography.lineHeightRelaxed    // 1.66
KdsTokens.Typography.lineHeightLoose      // 2.0

// Example usage
Text("Título")
    .font(.system(
        size: KdsTokens.Typography.fontSizeLg,
        weight: KdsTokens.Typography.fontWeightBold
    ))
    .foregroundColor(KdsTokens.Colors.textPrimary)
```

### Spacing

```swift
// Base spacing scale (8pt grid)
KdsTokens.Spacing.space0   // 0pt
KdsTokens.Spacing.space1   // 8pt
KdsTokens.Spacing.space2   // 16pt
KdsTokens.Spacing.space3   // 24pt
KdsTokens.Spacing.space4   // 32pt
KdsTokens.Spacing.space5   // 40pt
KdsTokens.Spacing.space6   // 48pt
KdsTokens.Spacing.space7   // 56pt
KdsTokens.Spacing.space8   // 64pt
KdsTokens.Spacing.space9   // 72pt
KdsTokens.Spacing.space10  // 80pt
KdsTokens.Spacing.space11  // 88pt
KdsTokens.Spacing.space12  // 96pt

// Semantic spacing
KdsTokens.Spacing.cardPaddingX
KdsTokens.Spacing.cardPaddingY
KdsTokens.Spacing.cardGap
KdsTokens.Spacing.inputPaddingX
KdsTokens.Spacing.buttonPaddingX
KdsTokens.Spacing.sectionGap

// Example usage
VStack(spacing: KdsTokens.Spacing.space2) {
    // Content
}
.padding(KdsTokens.Spacing.space3)
```

### Border Radius

```swift
KdsTokens.BorderRadius.button     // 4pt
KdsTokens.BorderRadius.card       // 8pt
KdsTokens.BorderRadius.input      // 4pt
KdsTokens.BorderRadius.dialog     // 8pt

// Example usage
RoundedRectangle(cornerRadius: KdsTokens.BorderRadius.card)
```

### Transitions

```swift
KdsTokens.Transitions.fast      // 150ms
KdsTokens.Transitions.normal    // 300ms
KdsTokens.Transitions.slow      // 500ms

// Example usage
.animation(.easeInOut(duration: KdsTokens.Transitions.normal / 1000))
```

## Complete Example

```swift
import SwiftUI
import KhipuDesignSystem

struct PaymentFlowView: View {
    @State private var amount: String = ""
    @State private var isProcessing = false

    var body: some View {
        VStack(spacing: KdsTokens.Spacing.space3) {
            // Header
            Text("Confirmar Pago")
                .font(.system(
                    size: KdsTokens.Typography.fontSizeSize2Xl,
                    weight: KdsTokens.Typography.fontWeightBold
                ))
                .foregroundColor(KdsTokens.Colors.textPrimary)

            // Amount display
            HStack {
                Text("Monto:")
                    .foregroundColor(KdsTokens.Colors.textSecondary)
                Spacer()
                Text("$\(amount)")
                    .font(.system(
                        size: KdsTokens.Typography.fontSizeXl,
                        weight: KdsTokens.Typography.fontWeightBold
                    ))
                    .foregroundColor(KdsTokens.Colors.primaryMain)
            }
            .padding(KdsTokens.Spacing.cardPaddingX)
            .background(KdsTokens.Colors.backgroundElevated)
            .cornerRadius(KdsTokens.BorderRadius.card)

            Spacer()

            // Action buttons
            VStack(spacing: KdsTokens.Spacing.space2) {
                KdsButton("Pagar Ahora") {
                    processPayment()
                }
                .loading(isProcessing)

                KdsButton("Cancelar", variant: .outlined, color: .error) {
                    cancelPayment()
                }
            }
        }
        .padding(KdsTokens.Spacing.space3)
        .background(KdsTokens.Colors.backgroundDefault)
    }

    private func processPayment() {
        isProcessing = true
        // Process payment...
    }

    private func cancelPayment() {
        // Handle cancellation
    }
}
```

## Requirements

- iOS 15.0+
- Swift 5.9+
- Xcode 14.0+

## Documentation

For complete documentation and examples, visit:
- **Storybook:** [design.khipu.com](https://design.khipu.com)
- **GitHub:** [github.com/khipu/design-system](https://github.com/khipu/design-system)

## License

MIT License - See LICENSE file for details
