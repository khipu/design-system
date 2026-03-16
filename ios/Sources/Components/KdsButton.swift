import UIKit

/**
 * Khipu Design System - Button Component (UIKit)
 *
 * A themed button component built on UIButton with variants, colors, sizes,
 * and loading state support.
 *
 * Usage:
 * ```swift
 * let button = KdsButton()
 * button.setTitle("Pagar Ahora", for: .normal)
 * button.variant = .contained
 * button.color = .primary
 * button.addTarget(self, action: #selector(handlePayment), for: .touchUpInside)
 * ```
 */

// MARK: - Button Variant

/// Visual style variant for KdsButton
@objc public enum KdsButtonVariant: Int {
    /// Filled button with solid background color
    case contained
    /// Button with border and transparent background
    case outlined
    /// Text-only button with no background or border
    case text
}

// MARK: - Button Color

/// Color scheme for KdsButton
@objc public enum KdsButtonColor: Int {
    case primary
    case secondary
    case success
    case warning
    case error
    case info
}

// MARK: - Button Size

/// Size variant for KdsButton
@objc public enum KdsButtonSize: Int {
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

    var fontSize: CGFloat {
        switch self {
        case .small: return KdsTokens.Typography.fontSizeSm
        case .medium: return KdsTokens.Typography.fontSizeBase
        case .large: return KdsTokens.Typography.fontSizeLg
        }
    }
}

// MARK: - Button Component

/// Khipu Design System Button (UIKit)
///
/// A versatile button component with multiple variants, colors, and states.
///
/// **Example:**
/// ```swift
/// let button = KdsButton()
/// button.setTitle("Pagar Ahora", for: .normal)
/// button.variant = .contained
/// button.color = .primary
/// button.size = .large
/// button.addTarget(self, action: #selector(handlePayment), for: .touchUpInside)
/// view.addSubview(button)
/// ```
@IBDesignable
public class KdsButton: UIButton {

    // MARK: - Properties

    /// Visual style variant
    @IBInspectable public var variant: KdsButtonVariant = .contained {
        didSet { updateAppearance() }
    }

    /// Color scheme
    @IBInspectable public var colorScheme: KdsButtonColor = .primary {
        didSet { updateAppearance() }
    }

    /// Button size
    @IBInspectable public var buttonSize: KdsButtonSize = .large {
        didSet { updateAppearance() }
    }

    /// Loading state - shows activity indicator
    @IBInspectable public var isLoading: Bool = false {
        didSet { updateLoadingState() }
    }

    /// Full width button
    @IBInspectable public var fullWidth: Bool = false {
        didSet { invalidateIntrinsicContentSize() }
    }

    // Private properties
    private let activityIndicator = UIActivityIndicatorView(style: .medium)
    private var originalTitle: String?

    // MARK: - Initializers

    public override init(frame: CGRect) {
        super.init(frame: frame)
        commonInit()
    }

    public required init?(coder: NSCoder) {
        super.init(coder: coder)
        commonInit()
    }

    private func commonInit() {
        setupActivityIndicator()
        updateAppearance()

        // Set default font
        titleLabel?.font = UIFont.systemFont(ofSize: buttonSize.fontSize, weight: .medium)
    }

    // MARK: - Setup

    private func setupActivityIndicator() {
        activityIndicator.translatesAutoresizingMaskIntoConstraints = false
        activityIndicator.hidesWhenStopped = true
        addSubview(activityIndicator)

        NSLayoutConstraint.activate([
            activityIndicator.centerXAnchor.constraint(equalTo: centerXAnchor),
            activityIndicator.centerYAnchor.constraint(equalTo: centerYAnchor)
        ])
    }

    // MARK: - Appearance

    private func updateAppearance() {
        layer.cornerRadius = KdsTokens.BorderRadius.button
        clipsToBounds = true

        // Content edge insets
        let horizontalPadding = buttonSize.horizontalPadding
        contentEdgeInsets = UIEdgeInsets(
            top: 0,
            left: horizontalPadding,
            bottom: 0,
            right: horizontalPadding
        )

        // Update colors
        updateColors()

        // Update border
        switch variant {
        case .outlined:
            layer.borderWidth = 1
            layer.borderColor = mainColor.cgColor
        case .contained, .text:
            layer.borderWidth = 0
        }

        // Update font
        titleLabel?.font = UIFont.systemFont(ofSize: buttonSize.fontSize, weight: .medium)

        invalidateIntrinsicContentSize()
    }

    private func updateColors() {
        let bgColor = backgroundColor(for: variant, color: colorScheme, state: state)
        let textColor = contentColor(for: variant, color: colorScheme, state: state)

        setBackgroundColor(bgColor, for: .normal)
        setTitleColor(textColor, for: .normal)

        // Disabled state
        let disabledBg = backgroundColor(for: variant, color: colorScheme, state: .disabled)
        let disabledText = KdsTokens.Colors.actionDisabled

        setBackgroundColor(disabledBg, for: .disabled)
        setTitleColor(disabledText, for: .disabled)

        // Highlighted state (when pressed)
        setBackgroundColor(bgColor.withAlphaComponent(0.8), for: .highlighted)
    }

    private func backgroundColor(for variant: KdsButtonVariant, color: KdsButtonColor, state: UIControl.State) -> UIColor {
        if state == .disabled {
            return variant == .contained ? KdsTokens.Colors.actionDisabledBackground : .clear
        }

        switch variant {
        case .contained:
            return mainColorForScheme(color)
        case .outlined, .text:
            return .clear
        }
    }

    private func contentColor(for variant: KdsButtonVariant, color: KdsButtonColor, state: UIControl.State) -> UIColor {
        if state == .disabled {
            return KdsTokens.Colors.actionDisabled
        }

        switch variant {
        case .contained:
            return contrastColorForScheme(color)
        case .outlined, .text:
            return mainColorForScheme(color)
        }
    }

    private func mainColorForScheme(_ colorScheme: KdsButtonColor) -> UIColor {
        switch colorScheme {
        case .primary: return KdsTokens.Colors.primaryMain
        case .secondary: return KdsTokens.Colors.secondaryMain
        case .success: return KdsTokens.Colors.successMain
        case .warning: return KdsTokens.Colors.warningMain
        case .error: return KdsTokens.Colors.errorMain
        case .info: return KdsTokens.Colors.infoMain
        }
    }

    private func contrastColorForScheme(_ colorScheme: KdsButtonColor) -> UIColor {
        switch colorScheme {
        case .primary: return KdsTokens.Colors.primaryContrastText
        case .secondary: return KdsTokens.Colors.secondaryContrastText
        case .success: return KdsTokens.Colors.successContrastText
        case .warning: return KdsTokens.Colors.warningContrastText
        case .error: return KdsTokens.Colors.errorContrastText
        case .info: return KdsTokens.Colors.infoContrastText
        }
    }

    // MARK: - Loading State

    private func updateLoadingState() {
        if isLoading {
            originalTitle = title(for: .normal)
            setTitle("", for: .normal)
            activityIndicator.color = contentColor(for: variant, color: colorScheme, state: state)
            activityIndicator.startAnimating()
            isEnabled = false
        } else {
            if let title = originalTitle {
                setTitle(title, for: .normal)
                originalTitle = nil
            }
            activityIndicator.stopAnimating()
            isEnabled = true
        }
    }

    // MARK: - Layout

    public override var intrinsicContentSize: CGSize {
        let superSize = super.intrinsicContentSize
        let height = buttonSize.height

        if fullWidth {
            return CGSize(width: UIView.noIntrinsicMetric, height: height)
        } else {
            return CGSize(width: superSize.width, height: height)
        }
    }

    public override func layoutSubviews() {
        super.layoutSubviews()

        // Ensure background color fills the entire button
        if let bgColor = backgroundColor(for: .normal) {
            layer.backgroundColor = bgColor.cgColor
        }
    }
}

// MARK: - UIButton Background Color Extension

private extension UIButton {
    func setBackgroundColor(_ color: UIColor, for state: UIControl.State) {
        let image = UIImage.imageWithColor(color)
        setBackgroundImage(image, for: state)
    }
}

// MARK: - UIImage Helper

private extension UIImage {
    static func imageWithColor(_ color: UIColor) -> UIImage {
        let rect = CGRect(x: 0, y: 0, width: 1, height: 1)
        UIGraphicsBeginImageContext(rect.size)
        let context = UIGraphicsGetCurrentContext()
        context?.setFillColor(color.cgColor)
        context?.fill(rect)
        let image = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        return image ?? UIImage()
    }
}
