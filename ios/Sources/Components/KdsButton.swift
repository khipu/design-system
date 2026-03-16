import SwiftUI

/**
 * Khipu Design System - Button Component
 *
 * A themed button component with variants (contained, outlined, text),
 * color schemes, sizes, and loading state support.
 *
 * Built with SwiftUI following Material Design principles.
 */

// MARK: - Button Variant

/// Visual style variant for KdsButton
public enum KdsButtonVariant {
    /// Filled button with solid background color
    case contained
    /// Button with border and transparent background
    case outlined
    /// Text-only button with no background or border
    case text
}

// MARK: - Button Color

/// Color scheme for KdsButton
public enum KdsButtonColor {
    case primary
    case secondary
    case success
    case warning
    case error
    case info
}

// MARK: - Button Size

/// Size variant for KdsButton
public enum KdsButtonSize {
    case small
    case medium
    case large

    var height: CGFloat {
        switch self {
        case .small: return 36
        case .medium: return 44
        case .large: return 56
        }
    }

    var horizontalPadding: CGFloat {
        switch self {
        case .small: return 12
        case .medium: return 16
        case .large: return 24
        }
    }

    var verticalPadding: CGFloat {
        switch self {
        case .small: return 6
        case .medium: return 10
        case .large: return 14
        }
    }

    var fontSize: CGFloat {
        switch self {
        case .small: return KdsTokens.Typography.fontSizeSm
        case .medium: return KdsTokens.Typography.fontSizeBase
        case .large: return KdsTokens.Typography.fontSizeLg
        }
    }
}

// MARK: - Button Component

/// Khipu Design System Button
///
/// A versatile button component with multiple variants, colors, and states.
///
/// **Example:**
/// ```swift
/// KdsButton("Pay Now") {
///     // Handle tap
/// }
/// .variant(.contained)
/// .color(.primary)
/// .loading(isProcessing)
///
/// KdsButton("Cancel", variant: .outlined, color: .error) {
///     // Handle tap
/// }
/// ```
public struct KdsButton: View {
    // MARK: - Properties

    private let title: String
    private let action: () -> Void
    private var variant: KdsButtonVariant
    private var color: KdsButtonColor
    private var size: KdsButtonSize
    private var isEnabled: Bool
    private var isLoading: Bool
    private var fullWidth: Bool
    private var leadingIcon: Image?
    private var trailingIcon: Image?

    // MARK: - Initializer

    /// Creates a button with the specified title and action
    ///
    /// - Parameters:
    ///   - title: The button label text
    ///   - variant: Visual style variant (default: .contained)
    ///   - color: Color scheme (default: .primary)
    ///   - size: Button size (default: .large)
    ///   - action: Callback when button is tapped
    public init(
        _ title: String,
        variant: KdsButtonVariant = .contained,
        color: KdsButtonColor = .primary,
        size: KdsButtonSize = .large,
        action: @escaping () -> Void
    ) {
        self.title = title
        self.action = action
        self.variant = variant
        self.color = color
        self.size = size
        self.isEnabled = true
        self.isLoading = false
        self.fullWidth = false
        self.leadingIcon = nil
        self.trailingIcon = nil
    }

    // MARK: - Body

    public var body: some View {
        Button(action: {
            if !isLoading && isEnabled {
                action()
            }
        }) {
            HStack(spacing: 8) {
                if isLoading {
                    ProgressView()
                        .progressViewStyle(CircularProgressViewStyle(tint: contentColor))
                        .scaleEffect(0.8)
                } else {
                    if let icon = leadingIcon {
                        icon
                            .resizable()
                            .scaledToFit()
                            .frame(width: 20, height: 20)
                    }

                    Text(title)
                        .font(.system(size: size.fontSize, weight: .medium))
                        .lineLimit(1)

                    if let icon = trailingIcon {
                        icon
                            .resizable()
                            .scaledToFit()
                            .frame(width: 20, height: 20)
                    }
                }
            }
            .foregroundColor(contentColor)
            .frame(maxWidth: fullWidth ? .infinity : nil)
            .frame(height: size.height)
            .padding(.horizontal, size.horizontalPadding)
            .background(backgroundColor)
            .cornerRadius(KdsTokens.BorderRadius.button)
            .overlay(
                RoundedRectangle(cornerRadius: KdsTokens.BorderRadius.button)
                    .stroke(borderColor, lineWidth: borderWidth)
            )
        }
        .disabled(!isEnabled || isLoading)
        .opacity(isEnabled && !isLoading ? 1.0 : 0.6)
    }

    // MARK: - Color Helpers

    private var backgroundColor: Color {
        guard isEnabled || isLoading else {
            return variant == .contained ? KdsTokens.Colors.actionDisabledBackground : .clear
        }

        switch variant {
        case .contained:
            return mainColor
        case .outlined, .text:
            return .clear
        }
    }

    private var contentColor: Color {
        guard isEnabled || isLoading else {
            return KdsTokens.Colors.actionDisabled
        }

        switch variant {
        case .contained:
            return contrastColor
        case .outlined, .text:
            return mainColor
        }
    }

    private var borderColor: Color {
        guard isEnabled || isLoading else {
            return KdsTokens.Colors.actionDisabled
        }

        return variant == .outlined ? mainColor : .clear
    }

    private var borderWidth: CGFloat {
        return variant == .outlined ? 1 : 0
    }

    private var mainColor: Color {
        switch color {
        case .primary: return KdsTokens.Colors.primaryMain
        case .secondary: return KdsTokens.Colors.secondaryMain
        case .success: return KdsTokens.Colors.successMain
        case .warning: return KdsTokens.Colors.warningMain
        case .error: return KdsTokens.Colors.errorMain
        case .info: return KdsTokens.Colors.infoMain
        }
    }

    private var contrastColor: Color {
        switch color {
        case .primary: return KdsTokens.Colors.primaryContrastText
        case .secondary: return KdsTokens.Colors.secondaryContrastText
        case .success: return KdsTokens.Colors.successContrastText
        case .warning: return KdsTokens.Colors.warningContrastText
        case .error: return KdsTokens.Colors.errorContrastText
        case .info: return KdsTokens.Colors.infoContrastText
        }
    }
}

// MARK: - View Modifiers

public extension KdsButton {
    /// Sets the button variant
    func variant(_ variant: KdsButtonVariant) -> KdsButton {
        var button = self
        button.variant = variant
        return button
    }

    /// Sets the button color scheme
    func color(_ color: KdsButtonColor) -> KdsButton {
        var button = self
        button.color = color
        return button
    }

    /// Sets the button size
    func size(_ size: KdsButtonSize) -> KdsButton {
        var button = self
        button.size = size
        return button
    }

    /// Sets whether the button is enabled
    func enabled(_ isEnabled: Bool) -> KdsButton {
        var button = self
        button.isEnabled = isEnabled
        return button
    }

    /// Sets the loading state
    func loading(_ isLoading: Bool) -> KdsButton {
        var button = self
        button.isLoading = isLoading
        return button
    }

    /// Sets whether the button should fill the available width
    func fullWidth(_ fullWidth: Bool = true) -> KdsButton {
        var button = self
        button.fullWidth = fullWidth
        return button
    }

    /// Sets a leading icon
    func leadingIcon(_ icon: Image?) -> KdsButton {
        var button = self
        button.leadingIcon = icon
        return button
    }

    /// Sets a trailing icon
    func trailingIcon(_ icon: Image?) -> KdsButton {
        var button = self
        button.trailingIcon = icon
        return button
    }
}

// MARK: - Previews

#if DEBUG
struct KdsButton_Previews: PreviewProvider {
    static var previews: some View {
        VStack(spacing: 16) {
            // Contained variants
            Group {
                Text("Contained Variants")
                    .font(.headline)

                KdsButton("Pay Now", variant: .contained, color: .primary) {}

                KdsButton("Confirm", variant: .contained, color: .success) {}

                KdsButton("Warning", variant: .contained, color: .warning) {}

                KdsButton("Delete", variant: .contained, color: .error) {}
            }

            Divider()

            // Outlined variants
            Group {
                Text("Outlined Variants")
                    .font(.headline)

                KdsButton("Cancel", variant: .outlined, color: .primary) {}

                KdsButton("Info", variant: .outlined, color: .info) {}
            }

            Divider()

            // Text variant
            Group {
                Text("Text Variant")
                    .font(.headline)

                KdsButton("Learn More", variant: .text, color: .primary) {}
                    .fullWidth(false)
            }

            Divider()

            // States
            Group {
                Text("States")
                    .font(.headline)

                KdsButton("Loading", variant: .contained, color: .primary) {}
                    .loading(true)

                KdsButton("Disabled", variant: .contained, color: .primary) {}
                    .enabled(false)
            }

            Divider()

            // Sizes
            Group {
                Text("Sizes")
                    .font(.headline)

                KdsButton("Small", variant: .contained, color: .primary, size: .small) {}
                    .fullWidth(false)

                KdsButton("Medium", variant: .contained, color: .primary, size: .medium) {}
                    .fullWidth(false)

                KdsButton("Large", variant: .contained, color: .primary, size: .large) {}
                    .fullWidth(false)
            }
        }
        .padding()
    }
}
#endif
