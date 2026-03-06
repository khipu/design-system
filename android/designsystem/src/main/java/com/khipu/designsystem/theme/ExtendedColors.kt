package com.khipu.designsystem.theme

import androidx.compose.runtime.Immutable
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.graphics.Color
import com.khipu.designsystem.tokens.KdsColors
import com.khipu.designsystem.tokens.KdsColorsDark

/**
 * Khipu Design System - Extended Colors
 *
 * Additional semantic colors not covered by Material 3 color scheme.
 * These extend Material's palette with Khipu-specific colors.
 */
@Immutable
data class KdsExtendedColors(
    // ==========================================================================
    // SEMANTIC STATUS COLORS
    // ==========================================================================
    val success: Color,
    val successLight: Color,
    val successDark: Color,
    val onSuccess: Color,

    val warning: Color,
    val warningLight: Color,
    val warningDark: Color,
    val onWarning: Color,

    val info: Color,
    val infoLight: Color,
    val infoDark: Color,
    val onInfo: Color,

    // ==========================================================================
    // COMPONENT-SPECIFIC COLORS
    // ==========================================================================
    /** Input field border color (default state) */
    val inputFieldBorder: Color,

    /** Input field border color (focused state) */
    val inputFieldBorderFocused: Color,

    /** Placeholder text color */
    val placeholder: Color,

    /** Hint text color */
    val hintText: Color,

    /** Operation/confirmation code display color */
    val operationCode: Color,

    /** Coordinates field border color */
    val coordinatesFieldBorder: Color,

    /** Top bar container color */
    val topBarContainer: Color,

    /** Content on top bar */
    val onTopBarContainer: Color,
)

/**
 * Light theme extended colors
 */
val KdsExtendedColorsLight = KdsExtendedColors(
    success = KdsColors.successMain,
    successLight = KdsColors.successLight,
    successDark = KdsColors.successDark,
    onSuccess = KdsColors.successContrastText,

    warning = KdsColors.warningMain,
    warningLight = KdsColors.warningLight,
    warningDark = KdsColors.warningDark,
    onWarning = KdsColors.warningContrastText,

    info = KdsColors.infoMain,
    infoLight = KdsColors.infoLight,
    infoDark = KdsColors.infoDark,
    onInfo = KdsColors.infoContrastText,

    inputFieldBorder = Color(0xFF9E9E9E),
    inputFieldBorderFocused = KdsColors.primaryMain,
    placeholder = Color(0xFF9E9E9E),
    hintText = Color(0xFF757575),
    operationCode = KdsColors.primaryMain,
    coordinatesFieldBorder = Color(0xFFBDBDBD),
    topBarContainer = KdsColors.backgroundElevated,
    onTopBarContainer = KdsColors.textPrimary,
)

/**
 * Dark theme extended colors
 */
val KdsExtendedColorsDark = KdsExtendedColors(
    success = KdsColorsDark.successMain,
    successLight = KdsColorsDark.successLight,
    successDark = KdsColorsDark.successDark,
    onSuccess = KdsColorsDark.successContrastText,

    warning = KdsColorsDark.warningMain,
    warningLight = KdsColorsDark.warningLight,
    warningDark = KdsColorsDark.warningDark,
    onWarning = KdsColorsDark.warningContrastText,

    info = KdsColorsDark.infoMain,
    infoLight = KdsColorsDark.infoLight,
    infoDark = KdsColorsDark.infoDark,
    onInfo = KdsColorsDark.infoContrastText,

    inputFieldBorder = Color(0xFF757575),
    inputFieldBorderFocused = KdsColorsDark.primaryMain,
    placeholder = Color(0xFF9E9E9E),
    hintText = Color(0xFFB0B0B0),
    operationCode = KdsColorsDark.primaryMain,
    coordinatesFieldBorder = Color(0xFF616161),
    topBarContainer = KdsColorsDark.backgroundElevated,
    onTopBarContainer = KdsColorsDark.textPrimary,
)

/**
 * CompositionLocal for extended colors
 */
val LocalKdsColors = staticCompositionLocalOf { KdsExtendedColorsLight }
