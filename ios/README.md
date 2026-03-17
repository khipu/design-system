# Khipu Design System - iOS (UIKit)

UIKit components and design tokens for building consistent payment experiences on iOS.

## Installation

### CocoaPods

Add to your `Podfile`:

```ruby
pod 'KhipuDesignSystem', '~> 0.1.0-alpha.17'
```

Then run:

```bash
pod install
```

## Quick Start

```swift
import UIKit
import KhipuDesignSystem

class PaymentViewController: UIViewController {
    private let payButton = KdsButton()
    private let cancelButton = KdsButton()
    private var isProcessing = false

    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
    }

    private func setupUI() {
        view.backgroundColor = KdsTokens.Colors.backgroundDefault

        // Primary action button
        payButton.setTitle("Pagar Ahora", for: .normal)
        payButton.variant = .contained
        payButton.colorScheme = .primary
        payButton.buttonSize = .large
        payButton.fullWidth = true
        payButton.addTarget(self, action: #selector(handlePayment), for: .touchUpInside)

        // Secondary action button
        cancelButton.setTitle("Cancelar", for: .normal)
        cancelButton.variant = .outlined
        cancelButton.colorScheme = .error
        cancelButton.buttonSize = .large
        cancelButton.fullWidth = true
        cancelButton.addTarget(self, action: #selector(handleCancel), for: .touchUpInside)

        // Layout
        let stackView = UIStackView(arrangedSubviews: [payButton, cancelButton])
        stackView.axis = .vertical
        stackView.spacing = KdsTokens.Spacing.space2
        stackView.translatesAutoresizingMaskIntoConstraints = false

        view.addSubview(stackView)

        NSLayoutConstraint.activate([
            stackView.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: KdsTokens.Spacing.space3),
            stackView.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -KdsTokens.Spacing.space3),
            stackView.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -KdsTokens.Spacing.space3)
        ])
    }

    @objc private func handlePayment() {
        payButton.isLoading = true
        // Process payment...
        DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
            self.payButton.isLoading = false
        }
    }

    @objc private func handleCancel() {
        // Handle cancellation
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
let button = KdsButton()
button.setTitle("Confirmar", for: .normal)
button.variant = .contained
button.colorScheme = .primary
button.addTarget(self, action: #selector(confirm), for: .touchUpInside)
view.addSubview(button)

// Outlined error button
let deleteButton = KdsButton()
deleteButton.setTitle("Eliminar", for: .normal)
deleteButton.variant = .outlined
deleteButton.colorScheme = .error
deleteButton.addTarget(self, action: #selector(delete), for: .touchUpInside)

// Small text button
let textButton = KdsButton()
textButton.setTitle("Cancelar", for: .normal)
textButton.variant = .text
textButton.buttonSize = .small
textButton.fullWidth = false

// Loading state
button.isLoading = true
// Later...
button.isLoading = false

// Disabled state
button.isEnabled = false

// Programmatic layout with Auto Layout
button.translatesAutoresizingMaskIntoConstraints = false
NSLayoutConstraint.activate([
    button.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),
    button.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20),
    button.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -20)
])

// Or with Interface Builder
// 1. Add UIButton to storyboard
// 2. Set custom class to "KdsButton"
// 3. Configure in Interface Builder or code
```

## Design Tokens

All design tokens are available through the `KdsTokens` struct.

### Colors (UIColor)

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

// Example usage
label.textColor = KdsTokens.Colors.textPrimary
view.backgroundColor = KdsTokens.Colors.backgroundDefault
```

### Typography (CGFloat)

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
KdsTokens.Typography.fontWeightRegular    // UIFont.Weight.regular
KdsTokens.Typography.fontWeightMedium     // UIFont.Weight.medium
KdsTokens.Typography.fontWeightSemiBold   // UIFont.Weight.semibold
KdsTokens.Typography.fontWeightBold       // UIFont.Weight.bold

// Line heights
KdsTokens.Typography.lineHeightTight      // 1.2
KdsTokens.Typography.lineHeightSnug       // 1.375
KdsTokens.Typography.lineHeightNormal     // 1.5
KdsTokens.Typography.lineHeightRelaxed    // 1.66
KdsTokens.Typography.lineHeightLoose      // 2.0

// Example usage
let titleLabel = UILabel()
titleLabel.font = UIFont.systemFont(
    ofSize: KdsTokens.Typography.fontSizeLg,
    weight: KdsTokens.Typography.fontWeightBold
)
titleLabel.textColor = KdsTokens.Colors.textPrimary
```

### Spacing (CGFloat)

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
let stackView = UIStackView()
stackView.spacing = KdsTokens.Spacing.space2

view.layoutMargins = UIEdgeInsets(
    top: KdsTokens.Spacing.space3,
    left: KdsTokens.Spacing.space3,
    bottom: KdsTokens.Spacing.space3,
    right: KdsTokens.Spacing.space3
)
```

### Border Radius (CGFloat)

```swift
KdsTokens.BorderRadius.button     // 4pt
KdsTokens.BorderRadius.card       // 8pt
KdsTokens.BorderRadius.input      // 4pt
KdsTokens.BorderRadius.dialog     // 8pt

// Example usage
cardView.layer.cornerRadius = KdsTokens.BorderRadius.card
cardView.clipsToBounds = true
```

### Transitions (milliseconds)

```swift
KdsTokens.Transitions.fast      // 150ms
KdsTokens.Transitions.normal    // 300ms
KdsTokens.Transitions.slow      // 500ms

// Example usage
UIView.animate(withDuration: KdsTokens.Transitions.normal / 1000) {
    view.alpha = 0
}
```

## Complete Example

```swift
import UIKit
import KhipuDesignSystem

class PaymentFlowViewController: UIViewController {
    // UI Components
    private let amountLabel = UILabel()
    private let payButton = KdsButton()
    private let cancelButton = KdsButton()
    private let cardView = UIView()

    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
    }

    private func setupUI() {
        view.backgroundColor = KdsTokens.Colors.backgroundDefault

        // Card container
        cardView.backgroundColor = KdsTokens.Colors.backgroundElevated
        cardView.layer.cornerRadius = KdsTokens.BorderRadius.card
        cardView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(cardView)

        // Amount label
        amountLabel.text = "$50.000"
        amountLabel.font = UIFont.systemFont(
            ofSize: KdsTokens.Typography.fontSizeSize2Xl,
            weight: KdsTokens.Typography.fontWeightBold
        )
        amountLabel.textColor = KdsTokens.Colors.primaryMain
        amountLabel.textAlignment = .center
        amountLabel.translatesAutoresizingMaskIntoConstraints = false
        cardView.addSubview(amountLabel)

        // Pay button
        payButton.setTitle("Pagar Ahora", for: .normal)
        payButton.variant = .contained
        payButton.colorScheme = .primary
        payButton.fullWidth = true
        payButton.addTarget(self, action: #selector(processPayment), for: .touchUpInside)

        // Cancel button
        cancelButton.setTitle("Cancelar", for: .normal)
        cancelButton.variant = .outlined
        cancelButton.colorScheme = .error
        cancelButton.fullWidth = true
        cancelButton.addTarget(self, action: #selector(cancelPayment), for: .touchUpInside)

        // Button stack
        let buttonStack = UIStackView(arrangedSubviews: [payButton, cancelButton])
        buttonStack.axis = .vertical
        buttonStack.spacing = KdsTokens.Spacing.space2
        buttonStack.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(buttonStack)

        // Layout constraints
        NSLayoutConstraint.activate([
            // Card
            cardView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: KdsTokens.Spacing.space4),
            cardView.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: KdsTokens.Spacing.space3),
            cardView.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -KdsTokens.Spacing.space3),
            cardView.heightAnchor.constraint(equalToConstant: 120),

            // Amount label
            amountLabel.centerXAnchor.constraint(equalTo: cardView.centerXAnchor),
            amountLabel.centerYAnchor.constraint(equalTo: cardView.centerYAnchor),

            // Buttons
            buttonStack.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: KdsTokens.Spacing.space3),
            buttonStack.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -KdsTokens.Spacing.space3),
            buttonStack.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -KdsTokens.Spacing.space3)
        ])
    }

    @objc private func processPayment() {
        payButton.isLoading = true
        // Simulate API call
        DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
            self.payButton.isLoading = false
            // Handle success
        }
    }

    @objc private func cancelPayment() {
        dismiss(animated: true)
    }
}
```

## Requirements

- iOS 15.0+
- UIKit
- Xcode 14.0+

## Documentation

For complete documentation and examples, visit:
- **Storybook:** [design.khipu.com](https://design.khipu.com)
- **GitHub:** [github.com/khipu/design-system](https://github.com/khipu/design-system)

## License

MIT License - See LICENSE file for details
