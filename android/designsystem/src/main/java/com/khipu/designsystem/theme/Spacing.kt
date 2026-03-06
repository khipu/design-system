package com.khipu.designsystem.theme

import androidx.compose.runtime.Immutable
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.khipu.designsystem.tokens.KdsSpacing

/**
 * Khipu Design System - Spacing
 *
 * Provides both numeric (space4) and semantic (dpSmall) spacing values
 * for compatibility with existing Android patterns.
 */
@Immutable
data class KdsSpacingValues(
    // ==========================================================================
    // NUMERIC SPACING (from tokens)
    // ==========================================================================
    val space0: Dp = KdsSpacing.space0,
    val space1: Dp = KdsSpacing.space1,
    val space2: Dp = KdsSpacing.space2,
    val space3: Dp = KdsSpacing.space3,
    val space4: Dp = KdsSpacing.space4,
    val space5: Dp = KdsSpacing.space5,
    val space6: Dp = KdsSpacing.space6,
    val space7: Dp = KdsSpacing.space7,
    val space8: Dp = KdsSpacing.space8,
    val space9: Dp = KdsSpacing.space9,
    val space10: Dp = KdsSpacing.space10,
    val space11: Dp = KdsSpacing.space11,
    val space12: Dp = KdsSpacing.space12,

    // ==========================================================================
    // SEMANTIC SPACING ALIASES (for khipu-client-android compatibility)
    // ==========================================================================
    /** 0.dp - No spacing */
    val dpNone: Dp = 0.dp,

    /** 2.dp - Tiny spacing */
    val dpTiny: Dp = 2.dp,

    /** 4.dp - Extra extra small */
    val dpXxSmall: Dp = 4.dp,

    /** 6.dp - Extra small */
    val dpXSmall: Dp = 6.dp,

    /** 8.dp - Small spacing */
    val dpSmall: Dp = 8.dp,

    /** 10.dp - Small-medium spacing */
    val dpSmallMedium: Dp = 10.dp,

    /** 12.dp - Medium-small spacing */
    val dpMediumSmall: Dp = 12.dp,

    /** 14.dp - Medium spacing minus */
    val dpMediumMinus: Dp = 14.dp,

    /** 16.dp - Medium spacing */
    val dpMedium: Dp = 16.dp,

    /** 20.dp - Medium-large spacing */
    val dpMediumLarge: Dp = 20.dp,

    /** 24.dp - Large spacing */
    val dpLarge: Dp = 24.dp,

    /** 32.dp - Extra large spacing */
    val dpXLarge: Dp = 32.dp,

    /** 40.dp - Extra extra large spacing */
    val dpXxLarge: Dp = 40.dp,

    /** 48.dp - Huge spacing */
    val dpHuge: Dp = 48.dp,

    /** 64.dp - Giant spacing */
    val dpGiant: Dp = 64.dp,

    /** 80.dp - Colossal spacing */
    val dpColossal: Dp = 80.dp,

    /** 96.dp - Massive spacing */
    val dpMassive: Dp = 96.dp,

    // ==========================================================================
    // SEMANTIC SPACING (component-specific)
    // ==========================================================================
    val cardPaddingX: Dp = KdsSpacing.cardPaddingX,
    val cardPaddingY: Dp = KdsSpacing.cardPaddingY,
    val cardGap: Dp = KdsSpacing.cardGap,

    val boxPaddingX: Dp = KdsSpacing.boxPaddingX,
    val boxPaddingY: Dp = KdsSpacing.boxPaddingY,
    val boxGap: Dp = KdsSpacing.space4, // 16dp

    val inputPaddingX: Dp = KdsSpacing.inputPaddingX,
    val inputPaddingY: Dp = KdsSpacing.inputPaddingY,

    val buttonPaddingX: Dp = KdsSpacing.buttonPaddingX,
    val buttonPaddingY: Dp = KdsSpacing.buttonPaddingY,

    val pageMargin: Dp = KdsSpacing.space5, // 20dp
    val sectionGap: Dp = KdsSpacing.sectionGap,
    val containerPadding: Dp = KdsSpacing.space5, // 20dp

    val modalPadding: Dp = KdsSpacing.modalPadding,

    // Result page specific
    val resultPagePaddingVertical: Dp = 32.dp,
    val resultPagePaddingHorizontal: Dp = 20.dp
)

/**
 * CompositionLocal for spacing values
 */
val LocalKdsSpacing = staticCompositionLocalOf { KdsSpacingValues() }
