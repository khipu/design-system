import SwiftUI

/// Khipu Design System for iOS
///
/// This library provides SwiftUI components and design tokens for building
/// consistent payment experiences across iOS applications.
///
/// **Quick Start:**
/// ```swift
/// import KhipuDesignSystem
///
/// // Use components
/// KdsButton("Pay Now") {
///     // Handle payment
/// }
///
/// // Use design tokens
/// Text("Hello Khipu")
///     .foregroundColor(KdsTokens.Colors.primaryMain)
///     .font(.system(size: KdsTokens.Typography.fontSizeLg))
/// ```
///
/// **Available Components:**
/// - `KdsButton` - Primary action button with variants and states
///
/// **Available Tokens:**
/// - `KdsTokens.Colors` - Color palette (primary, secondary, semantic colors)
/// - `KdsTokens.Typography` - Font sizes, weights, and line heights
/// - `KdsTokens.Spacing` - Spacing scale and semantic spacing
/// - `KdsTokens.BorderRadius` - Border radius values
/// - `KdsTokens.Transitions` - Animation durations
public enum KhipuDesignSystem {
    public static let version = "0.1.0-alpha.14"
}