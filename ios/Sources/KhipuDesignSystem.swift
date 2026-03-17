import UIKit

/// Khipu Design System for iOS (UIKit)
///
/// This library provides UIKit components and design tokens for building
/// consistent payment experiences across iOS applications.
///
/// **Quick Start:**
/// ```swift
/// import KhipuDesignSystem
///
/// // Use components
/// let button = KdsButton()
/// button.setTitle("Pagar Ahora", for: .normal)
/// button.variant = .contained
/// button.colorScheme = .primary
/// button.addTarget(self, action: #selector(handlePayment), for: .touchUpInside)
/// view.addSubview(button)
///
/// // Use design tokens
/// label.textColor = KdsTokens.Colors.textPrimary
/// label.font = UIFont.systemFont(ofSize: KdsTokens.Typography.fontSizeLg)
/// ```
///
/// **Available Components:**
/// - `KdsButton` - Primary action button with variants and states (UIKit)
///
/// **Available Tokens:**
/// - `KdsTokens.Colors` - UIColor palette (primary, secondary, semantic colors)
/// - `KdsTokens.Typography` - Font sizes, weights, and line heights
/// - `KdsTokens.Spacing` - Spacing scale and semantic spacing (CGFloat)
/// - `KdsTokens.BorderRadius` - Border radius values (CGFloat)
/// - `KdsTokens.Transitions` - Animation durations (milliseconds)
public enum KhipuDesignSystem {
    public static let version = "0.1.0-alpha.23"
}
