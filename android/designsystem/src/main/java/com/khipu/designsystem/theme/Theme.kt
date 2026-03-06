package com.khipu.designsystem.theme

import android.app.Activity
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat
import com.khipu.designsystem.tokens.KdsColors
import com.khipu.designsystem.tokens.KdsColorsDark

/**
 * Khipu Design System - Theme
 *
 * Material 3 theme configuration using design system tokens.
 */

// =============================================================================
// LIGHT COLOR SCHEME
// =============================================================================

private val LightColorScheme = lightColorScheme(
    primary = KdsColors.primaryMain,
    onPrimary = KdsColors.primaryContrastText,
    primaryContainer = KdsColors.primaryLight,
    onPrimaryContainer = KdsColors.primaryDark,

    secondary = KdsColors.secondaryMain,
    onSecondary = KdsColors.secondaryContrastText,
    secondaryContainer = KdsColors.secondaryLight,
    onSecondaryContainer = KdsColors.secondaryDark,

    tertiary = KdsColors.infoMain,
    onTertiary = KdsColors.infoContrastText,
    tertiaryContainer = KdsColors.infoLight,
    onTertiaryContainer = KdsColors.infoDark,

    error = KdsColors.errorMain,
    onError = KdsColors.errorContrastText,
    errorContainer = KdsColors.errorLight,
    onErrorContainer = KdsColors.errorDark,

    background = KdsColors.backgroundDefault,
    onBackground = KdsColors.textPrimary,

    surface = KdsColors.backgroundPaper,
    onSurface = KdsColors.textPrimary,
    surfaceVariant = KdsColors.backgroundElevated,
    onSurfaceVariant = KdsColors.textSecondary,

    outline = KdsColors.divider,
    outlineVariant = KdsColors.actionDisabled,

    scrim = KdsColors.actionDisabledBackground,
)

// =============================================================================
// DARK COLOR SCHEME
// =============================================================================

private val DarkColorScheme = darkColorScheme(
    primary = KdsColorsDark.primaryMain,
    onPrimary = KdsColorsDark.primaryContrastText,
    primaryContainer = KdsColorsDark.primaryDark,
    onPrimaryContainer = KdsColorsDark.primaryLight,

    secondary = KdsColorsDark.secondaryMain,
    onSecondary = KdsColorsDark.secondaryContrastText,
    secondaryContainer = KdsColorsDark.secondaryDark,
    onSecondaryContainer = KdsColorsDark.secondaryLight,

    tertiary = KdsColorsDark.infoMain,
    onTertiary = KdsColorsDark.infoContrastText,
    tertiaryContainer = KdsColorsDark.infoDark,
    onTertiaryContainer = KdsColorsDark.infoLight,

    error = KdsColorsDark.errorMain,
    onError = KdsColorsDark.errorContrastText,
    errorContainer = KdsColorsDark.errorDark,
    onErrorContainer = KdsColorsDark.errorLight,

    background = KdsColorsDark.backgroundDefault,
    onBackground = KdsColorsDark.textPrimary,

    surface = KdsColorsDark.backgroundPaper,
    onSurface = KdsColorsDark.textPrimary,
    surfaceVariant = KdsColorsDark.backgroundElevated,
    onSurfaceVariant = KdsColorsDark.textSecondary,

    outline = KdsColorsDark.divider,
    outlineVariant = KdsColorsDark.actionDisabled,

    scrim = KdsColorsDark.actionDisabledBackground,
)

// =============================================================================
// THEME MODE
// =============================================================================

/**
 * Theme mode options
 */
enum class KdsThemeMode {
    LIGHT,
    DARK,
    SYSTEM
}

// =============================================================================
// THEME COMPOSABLE
// =============================================================================

/**
 * Khipu Design System Theme
 *
 * Wraps content with Material 3 theming using Khipu design tokens.
 *
 * @param themeMode The theme mode (LIGHT, DARK, or SYSTEM)
 * @param dynamicStatusBar Whether to update status bar color based on theme
 * @param content The content to wrap
 *
 * @sample
 * ```
 * KdsTheme(themeMode = KdsThemeMode.SYSTEM) {
 *     KdsButton(text = "Pay Now", onClick = { })
 * }
 * ```
 */
@Composable
fun KdsTheme(
    themeMode: KdsThemeMode = KdsThemeMode.SYSTEM,
    dynamicStatusBar: Boolean = true,
    content: @Composable () -> Unit
) {
    val darkTheme = when (themeMode) {
        KdsThemeMode.LIGHT -> false
        KdsThemeMode.DARK -> true
        KdsThemeMode.SYSTEM -> isSystemInDarkTheme()
    }

    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme

    // Update status bar color
    if (dynamicStatusBar) {
        val view = LocalView.current
        if (!view.isInEditMode) {
            SideEffect {
                val window = (view.context as? Activity)?.window
                window?.let {
                    it.statusBarColor = colorScheme.background.toArgb()
                    WindowCompat.getInsetsController(it, view).isAppearanceLightStatusBars = !darkTheme
                }
            }
        }
    }

    CompositionLocalProvider(
        LocalKdsSpacing provides KdsSpacingValues(),
        LocalKdsColors provides if (darkTheme) KdsExtendedColorsDark else KdsExtendedColorsLight
    ) {
        MaterialTheme(
            colorScheme = colorScheme,
            typography = KdsTypography,
            shapes = KdsShapes,
            content = content
        )
    }
}

/**
 * Access Khipu Design System theme values
 */
object KdsTheme {
    /**
     * Current spacing values
     */
    val spacing: KdsSpacingValues
        @Composable
        get() = LocalKdsSpacing.current

    /**
     * Current extended colors (success, warning, info, etc.)
     */
    val extendedColors: KdsExtendedColors
        @Composable
        get() = LocalKdsColors.current
}
