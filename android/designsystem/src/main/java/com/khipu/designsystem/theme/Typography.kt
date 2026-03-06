package com.khipu.designsystem.theme

import androidx.compose.material3.Typography
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp
import com.khipu.designsystem.tokens.KdsTypography as Tokens

/**
 * Khipu Design System - Typography
 *
 * Uses Public Sans as the primary font family.
 * Font files must be added to res/font/ directory.
 */

// =============================================================================
// FONT FAMILY
// =============================================================================

/**
 * Public Sans font family
 *
 * Note: Font files need to be added to res/font/ directory:
 * - publicsans_regular.ttf
 * - publicsans_medium.ttf
 * - publicsans_semibold.ttf
 * - publicsans_bold.ttf
 * - publicsans_light.ttf (optional)
 *
 * Until fonts are added, uses system default (SansSerif).
 * Copy fonts from khipu-client-android or download from Google Fonts.
 */
val PublicSansFontFamily: FontFamily = FontFamily.SansSerif

// =============================================================================
// MATERIAL 3 TYPOGRAPHY
// =============================================================================

/**
 * Material 3 Typography configuration using Khipu design tokens
 */
val KdsTypography = Typography(
    // Display styles
    displayLarge = TextStyle(
        fontFamily = PublicSansFontFamily,
        fontWeight = FontWeight(Tokens.fontWeightBold),
        fontSize = Tokens.fontSizeSize3Xl,
        lineHeight = 40.sp,
        letterSpacing = (-0.25).sp
    ),
    displayMedium = TextStyle(
        fontFamily = PublicSansFontFamily,
        fontWeight = FontWeight(Tokens.fontWeightBold),
        fontSize = Tokens.fontSizeSize2Xl,
        lineHeight = 36.sp,
        letterSpacing = 0.sp
    ),
    displaySmall = TextStyle(
        fontFamily = PublicSansFontFamily,
        fontWeight = FontWeight(Tokens.fontWeightSemiBold),
        fontSize = Tokens.fontSizeXl,
        lineHeight = 32.sp,
        letterSpacing = 0.sp
    ),

    // Headline styles
    headlineLarge = TextStyle(
        fontFamily = PublicSansFontFamily,
        fontWeight = FontWeight(Tokens.fontWeightSemiBold),
        fontSize = Tokens.fontSizeXl,
        lineHeight = 28.sp,
        letterSpacing = 0.sp
    ),
    headlineMedium = TextStyle(
        fontFamily = PublicSansFontFamily,
        fontWeight = FontWeight(Tokens.fontWeightSemiBold),
        fontSize = Tokens.fontSizeLg,
        lineHeight = 24.sp,
        letterSpacing = 0.sp
    ),
    headlineSmall = TextStyle(
        fontFamily = PublicSansFontFamily,
        fontWeight = FontWeight(Tokens.fontWeightMedium),
        fontSize = Tokens.fontSizeBase,
        lineHeight = 22.sp,
        letterSpacing = 0.sp
    ),

    // Title styles
    titleLarge = TextStyle(
        fontFamily = PublicSansFontFamily,
        fontWeight = FontWeight(Tokens.fontWeightSemiBold),
        fontSize = Tokens.fontSizeLg,
        lineHeight = 24.sp,
        letterSpacing = 0.sp
    ),
    titleMedium = TextStyle(
        fontFamily = PublicSansFontFamily,
        fontWeight = FontWeight(Tokens.fontWeightMedium),
        fontSize = Tokens.fontSizeBase,
        lineHeight = 22.sp,
        letterSpacing = 0.15.sp
    ),
    titleSmall = TextStyle(
        fontFamily = PublicSansFontFamily,
        fontWeight = FontWeight(Tokens.fontWeightMedium),
        fontSize = Tokens.fontSizeSm,
        lineHeight = 20.sp,
        letterSpacing = 0.1.sp
    ),

    // Body styles
    bodyLarge = TextStyle(
        fontFamily = PublicSansFontFamily,
        fontWeight = FontWeight(Tokens.fontWeightRegular),
        fontSize = Tokens.fontSizeBase,
        lineHeight = 24.sp,
        letterSpacing = 0.5.sp
    ),
    bodyMedium = TextStyle(
        fontFamily = PublicSansFontFamily,
        fontWeight = FontWeight(Tokens.fontWeightRegular),
        fontSize = Tokens.fontSizeSm,
        lineHeight = 20.sp,
        letterSpacing = 0.25.sp
    ),
    bodySmall = TextStyle(
        fontFamily = PublicSansFontFamily,
        fontWeight = FontWeight(Tokens.fontWeightRegular),
        fontSize = Tokens.fontSizeXs,
        lineHeight = 16.sp,
        letterSpacing = 0.4.sp
    ),

    // Label styles
    labelLarge = TextStyle(
        fontFamily = PublicSansFontFamily,
        fontWeight = FontWeight(Tokens.fontWeightMedium),
        fontSize = Tokens.fontSizeSm,
        lineHeight = 20.sp,
        letterSpacing = 0.1.sp
    ),
    labelMedium = TextStyle(
        fontFamily = PublicSansFontFamily,
        fontWeight = FontWeight(Tokens.fontWeightMedium),
        fontSize = Tokens.fontSizeXs,
        lineHeight = 16.sp,
        letterSpacing = 0.5.sp
    ),
    labelSmall = TextStyle(
        fontFamily = PublicSansFontFamily,
        fontWeight = FontWeight(Tokens.fontWeightMedium),
        fontSize = 10.sp,
        lineHeight = 14.sp,
        letterSpacing = 0.5.sp
    ),
)

// =============================================================================
// SEMANTIC TEXT STYLES (for khipu-client-android compatibility)
// =============================================================================

/**
 * Semantic text styles for specific UI components
 */
object KdsTextStyles {
    /** Button text style */
    val button = TextStyle(
        fontFamily = PublicSansFontFamily,
        fontWeight = FontWeight.SemiBold,
        fontSize = 14.sp,
        lineHeight = 20.sp,
        letterSpacing = 0.1.sp
    )

    /** Form label style */
    val label = TextStyle(
        fontFamily = PublicSansFontFamily,
        fontWeight = FontWeight.Medium,
        fontSize = 12.sp,
        lineHeight = 16.sp,
        letterSpacing = 0.5.sp
    )

    /** Hint/helper text style */
    val hint = TextStyle(
        fontFamily = PublicSansFontFamily,
        fontWeight = FontWeight.Normal,
        fontSize = 12.sp,
        lineHeight = 16.sp,
        letterSpacing = 0.4.sp
    )

    /** Success title style */
    val successTitle = TextStyle(
        fontFamily = PublicSansFontFamily,
        fontWeight = FontWeight.SemiBold,
        fontSize = 20.sp,
        lineHeight = 28.sp
    )

    /** Failure title style */
    val failureTitle = TextStyle(
        fontFamily = PublicSansFontFamily,
        fontWeight = FontWeight.SemiBold,
        fontSize = 20.sp,
        lineHeight = 28.sp
    )

    /** Form warning text style */
    val formWarning = TextStyle(
        fontFamily = PublicSansFontFamily,
        fontWeight = FontWeight.Normal,
        fontSize = 14.sp,
        lineHeight = 20.sp
    )

    /** Header merchant name style */
    val headerMerchantName = TextStyle(
        fontFamily = PublicSansFontFamily,
        fontWeight = FontWeight.Medium,
        fontSize = 14.sp,
        lineHeight = 20.sp
    )

    /** Header amount label style */
    val headerAmountLabel = TextStyle(
        fontFamily = PublicSansFontFamily,
        fontWeight = FontWeight.Normal,
        fontSize = 12.sp,
        lineHeight = 16.sp
    )

    /** Header amount value style */
    val headerAmountValue = TextStyle(
        fontFamily = PublicSansFontFamily,
        fontWeight = FontWeight.Bold,
        fontSize = 24.sp,
        lineHeight = 32.sp
    )
}
