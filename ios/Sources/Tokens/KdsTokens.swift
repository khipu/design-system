import SwiftUI

/**
 * Khipu Design System - Design Tokens
 * 
 * AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 * Source: design-system/src/tokens/tokens.json
 * Generated: 2026-03-16T20:11:21.299Z
 * 
 * To regenerate:
 *   cd design-system && npm run tokens:generate
 */

// MARK: - Color Extension
extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (255, 0, 0, 0)
        }
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue:  Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}

// MARK: - Design Tokens
public struct KdsTokens {
    
    // MARK: - Colors
    public struct Colors {
        // Primary palette
        public static let primaryMain = Color(hex: "4CAF50")
        public static let primaryLight = Color(hex: "81C784")
        public static let primaryDark = Color(hex: "388E3C")
        public static let primaryContrastText = Color(hex: "FFFFFF")
        
        // Secondary palette
        public static let secondaryMain = Color(hex: "3CB4E5")
        public static let secondaryLight = Color(hex: "6AC6EB")
        public static let secondaryDark = Color(hex: "198EBE")
        public static let secondaryContrastText = Color(hex: "FFFFFF")
        
        // Success
        public static let successMain = Color(hex: "2E7D32")
        public static let successLight = Color(hex: "4CAF50")
        public static let successDark = Color(hex: "1B5E20")
        public static let successContrastText = Color(hex: "FFFFFF")
        
        // Warning
        public static let warningMain = Color(hex: "ED6C02")
        public static let warningLight = Color(hex: "FF9800")
        public static let warningDark = Color(hex: "E65100")
        public static let warningContrastText = Color(hex: "FFFFFF")
        
        // Error
        public static let errorMain = Color(hex: "D32F2F")
        public static let errorLight = Color(hex: "EF5350")
        public static let errorDark = Color(hex: "C62828")
        public static let errorContrastText = Color(hex: "FFFFFF")
        
        // Info
        public static let infoMain = Color(hex: "0288D1")
        public static let infoLight = Color(hex: "03A9F4")
        public static let infoDark = Color(hex: "01579B")
        public static let infoContrastText = Color(hex: "FFFFFF")
        
        // Text colors
        public static let textPrimary = Color(red: 0, green: 0, blue: 0, opacity: 0.87)
        public static let textSecondary = Color(red: 0, green: 0, blue: 0, opacity: 0.60)
        public static let textDisabled = Color(red: 0, green: 0, blue: 0, opacity: 0.38)
        
        // Background colors
        public static let backgroundDefault = Color(hex: "FFFFFF")
        public static let backgroundPaper = Color(hex: "FFFFFF")
        public static let backgroundElevated = Color(hex: "FAFAFA")
        
        // Action colors
        public static let actionActive = Color(red: 0, green: 0, blue: 0, opacity: 0.56)
        public static let actionHover = Color(red: 0, green: 0, blue: 0, opacity: 0.04)
        public static let actionSelected = Color(red: 0, green: 0, blue: 0, opacity: 0.08)
        public static let actionDisabled = Color(red: 0, green: 0, blue: 0, opacity: 0.38)
        public static let actionDisabledBackground = Color(red: 0, green: 0, blue: 0, opacity: 0.12)
        public static let actionFocus = Color(red: 0, green: 0, blue: 0, opacity: 0.12)
        
        // Divider
        public static let divider = Color(red: 0, green: 0, blue: 0, opacity: 0.12)
    }
    
    // MARK: - Typography
    public struct Typography {
        // Font weights
        public static let fontWeightRegular: Font.Weight = .regular
        public static let fontWeightMedium: Font.Weight = .medium
        public static let fontWeightSemiBold: Font.Weight = .semibold
        public static let fontWeightBold: Font.Weight = .bold
        
        // Font sizes
        public static let fontSizeXs: CGFloat = 12
        public static let fontSizeSm: CGFloat = 14
        public static let fontSizeBase: CGFloat = 16
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