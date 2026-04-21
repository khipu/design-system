import UIKit

/**
 * Khipu Design System - Design Tokens
 * 
 * AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 * Source: design-system/src/tokens/tokens.json
 * Generated: 2026-04-21T16:31:30.929Z
 * 
 * To regenerate:
 *   cd design-system && npm run tokens:generate
 */

// MARK: - Design Tokens
public struct KdsTokens {
    
    // MARK: - Colors
    public struct Colors {
        // Primary palette
        public static let primaryMain = UIColor(red: 0.514, green: 0.278, blue: 0.678, alpha: 1.0)
        public static let primaryLight = UIColor(red: 0.608, green: 0.420, blue: 0.741, alpha: 1.0)
        public static let primaryDark = UIColor(red: 0.357, green: 0.192, blue: 0.475, alpha: 1.0)
        public static let primaryContrastText = UIColor(red: 1.000, green: 1.000, blue: 1.000, alpha: 1.0)
        
        // Secondary palette
        public static let secondaryMain = UIColor(red: 0.235, green: 0.706, blue: 0.898, alpha: 1.0)
        public static let secondaryLight = UIColor(red: 0.416, green: 0.776, blue: 0.922, alpha: 1.0)
        public static let secondaryDark = UIColor(red: 0.098, green: 0.557, blue: 0.745, alpha: 1.0)
        public static let secondaryContrastText = UIColor(red: 1.000, green: 1.000, blue: 1.000, alpha: 1.0)
        
        // Success
        public static let successMain = UIColor(red: 0.180, green: 0.490, blue: 0.196, alpha: 1.0)
        public static let successLight = UIColor(red: 0.298, green: 0.686, blue: 0.314, alpha: 1.0)
        public static let successDark = UIColor(red: 0.106, green: 0.369, blue: 0.125, alpha: 1.0)
        public static let successContrastText = UIColor(red: 1.000, green: 1.000, blue: 1.000, alpha: 1.0)
        
        // Warning
        public static let warningMain = UIColor(red: 0.937, green: 0.424, blue: 0.000, alpha: 1.0)
        public static let warningLight = UIColor(red: 1.000, green: 0.596, blue: 0.000, alpha: 1.0)
        public static let warningDark = UIColor(red: 0.902, green: 0.318, blue: 0.000, alpha: 1.0)
        public static let warningContrastText = UIColor(red: 1.000, green: 1.000, blue: 1.000, alpha: 1.0)
        
        // Error
        public static let errorMain = UIColor(red: 0.827, green: 0.184, blue: 0.184, alpha: 1.0)
        public static let errorLight = UIColor(red: 0.937, green: 0.325, blue: 0.314, alpha: 1.0)
        public static let errorDark = UIColor(red: 0.776, green: 0.157, blue: 0.157, alpha: 1.0)
        public static let errorContrastText = UIColor(red: 1.000, green: 1.000, blue: 1.000, alpha: 1.0)
        
        // Info
        public static let infoMain = UIColor(red: 0.008, green: 0.533, blue: 0.820, alpha: 1.0)
        public static let infoLight = UIColor(red: 0.012, green: 0.663, blue: 0.957, alpha: 1.0)
        public static let infoDark = UIColor(red: 0.004, green: 0.341, blue: 0.608, alpha: 1.0)
        public static let infoContrastText = UIColor(red: 1.000, green: 1.000, blue: 1.000, alpha: 1.0)
        
        // Text colors
        public static let textPrimary = UIColor(red: 0.200, green: 0.200, blue: 0.200, alpha: 1.0)
        public static let textSecondary = UIColor(red: 0, green: 0, blue: 0, alpha: 0.60)
        public static let textDisabled = UIColor(red: 0.620, green: 0.620, blue: 0.620, alpha: 1.0)
        
        // Background colors
        public static let backgroundDefault = UIColor(red: 1.000, green: 1.000, blue: 1.000, alpha: 1.0)
        public static let backgroundPaper = UIColor(red: 1.000, green: 1.000, blue: 1.000, alpha: 1.0)
        public static let backgroundElevated = UIColor(red: 0.980, green: 0.980, blue: 0.980, alpha: 1.0)
        
        // Action colors
        public static let actionActive = UIColor(red: 0, green: 0, blue: 0, alpha: 0.56)
        public static let actionHover = UIColor(red: 0, green: 0, blue: 0, alpha: 0.04)
        public static let actionSelected = UIColor(red: 0, green: 0, blue: 0, alpha: 0.08)
        public static let actionDisabled = UIColor(red: 0.620, green: 0.620, blue: 0.620, alpha: 1.0)
        public static let actionDisabledBackground = UIColor(red: 0.878, green: 0.878, blue: 0.878, alpha: 1.0)
        public static let actionFocus = UIColor(red: 0, green: 0, blue: 0, alpha: 0.12)
        
        // Divider
        public static let divider = UIColor(red: 0, green: 0, blue: 0, alpha: 0.12)
    }
    
    // MARK: - Typography
    public struct Typography {
        // Font weights
        public static let fontWeightRegular: UIFont.Weight = .regular
        public static let fontWeightMedium: UIFont.Weight = .medium
        public static let fontWeightSemiBold: UIFont.Weight = .semibold
        public static let fontWeightBold: UIFont.Weight = .bold
        
        // Font sizes
        public static let fontSizeXs: CGFloat = 12
        public static let fontSizeSm: CGFloat = 14
        public static let fontSizeBase: CGFloat = 16
        public static let fontSizeMd: CGFloat = 16
        public static let fontSizeLg: CGFloat = 18
        public static let fontSizeXl: CGFloat = 20
        public static let fontSizeSize2Xl: CGFloat = 24
        public static let fontSizeSize3Xl: CGFloat = 30
        public static let fontSizeSize4Xl: CGFloat = 36
        
        // Line heights
        public static let lineHeightTight: CGFloat = 1.2
        public static let lineHeightSnug: CGFloat = 1.375
        public static let lineHeightNormal: CGFloat = 1.5
        public static let lineHeightRelaxed: CGFloat = 1.66
        public static let lineHeightLoose: CGFloat = 2
    }
    
    // MARK: - Spacing
    public struct Spacing {
        // Base spacing scale
        public static let space0: CGFloat = 0
        public static let space1: CGFloat = 8
        public static let space2: CGFloat = 16
        public static let space3: CGFloat = 24
        public static let space4: CGFloat = 32
        public static let space5: CGFloat = 40
        public static let space6: CGFloat = 48
        public static let space7: CGFloat = 56
        public static let space8: CGFloat = 64
        public static let space9: CGFloat = 72
        public static let space10: CGFloat = 80
        public static let space11: CGFloat = 88
        public static let space12: CGFloat = 96
        public static let space20: CGFloat = 160
        public static let space0_5: CGFloat = 4
        public static let space0_75: CGFloat = 6
        public static let space1_5: CGFloat = 12
        public static let space2_5: CGFloat = 20
        public static let space3_5: CGFloat = 28
        public static let space4_5: CGFloat = 36
        public static let space5_5: CGFloat = 44
        
        // Semantic spacing
        public static let cardPaddingX: CGFloat = 20
        public static let cardPaddingY: CGFloat = 10
        public static let cardGap: CGFloat = 16
        public static let cardListGap: CGFloat = 12
        public static let boxPaddingX: CGFloat = 20
        public static let boxPaddingY: CGFloat = 32
        public static let inputPaddingX: CGFloat = 12
        public static let inputPaddingY: CGFloat = 16
        public static let buttonPaddingX: CGFloat = 22
        public static let buttonPaddingY: CGFloat = 8
        public static let sectionGap: CGFloat = 32
        public static let formGap: CGFloat = 20
        public static let stackGap: CGFloat = 16
        public static let inlineGap: CGFloat = 8
        public static let modalPadding: CGFloat = 24
    }
    
    // MARK: - Border Radius
    public struct BorderRadius {
        // Base radius scale
        public static let radiusNone: CGFloat = 0
        public static let radiusSm: CGFloat = 4
        public static let radiusMd: CGFloat = 8
        public static let radiusLg: CGFloat = 12
        public static let radiusXl: CGFloat = 16
        public static let radius2Xl: CGFloat = 20
        public static let radius3Xl: CGFloat = 24
        public static let radiusFull: CGFloat = 9999 // Use for pills/circles
        
        // Component-specific radii
        public static let button: CGFloat = 4
        public static let input: CGFloat = 4
        public static let card: CGFloat = 20
        public static let modal: CGFloat = 20
        public static let chip: CGFloat = 16
        public static let avatar: CGFloat = 100
        public static let iconContainer: CGFloat = 10
    }
    
    // MARK: - Transitions
    public struct Transitions {
        public static let durationShortest: Double = 0.15 // 150ms
        public static let durationShorter: Double = 0.2 // 200ms
        public static let durationShort: Double = 0.25 // 250ms
        public static let durationStandard: Double = 0.3 // 300ms
        public static let durationComplex: Double = 0.375 // 375ms
        public static let durationEnteringScreen: Double = 0.225 // 225ms
        public static let durationLeavingScreen: Double = 0.195 // 195ms
    }
}