package com.khipu.designsystem.components

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonColors
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.khipu.designsystem.theme.KdsComponentShapes
import com.khipu.designsystem.theme.KdsTextStyles
import com.khipu.designsystem.theme.KdsTheme
import com.khipu.designsystem.tokens.KdsBorderRadius
import com.khipu.designsystem.tokens.KdsColors
import com.khipu.designsystem.tokens.KdsDimensions

/**
 * Khipu Design System - Button
 *
 * A themed button component with variants (contained, outlined, text),
 * color schemes, sizes, and loading state support.
 */

// =============================================================================
// ENUMS
// =============================================================================

/**
 * Button visual variant
 */
enum class KdsButtonVariant {
    /** Filled button with primary color background */
    CONTAINED,
    /** Button with border and transparent background */
    OUTLINED,
    /** Text-only button with no background or border */
    TEXT
}

/**
 * Button color scheme
 */
enum class KdsButtonColor {
    PRIMARY,
    SECONDARY,
    SUCCESS,
    WARNING,
    ERROR
}

/**
 * Button size
 */
enum class KdsButtonSize {
    SMALL,
    MEDIUM,
    LARGE
}

// =============================================================================
// BUTTON COMPONENT
// =============================================================================

/**
 * Khipu Design System Button
 *
 * @param text The button label text
 * @param onClick Callback when button is clicked
 * @param modifier Modifier for the button
 * @param variant Visual style variant (CONTAINED, OUTLINED, TEXT)
 * @param color Color scheme (PRIMARY, SECONDARY, SUCCESS, WARNING, ERROR)
 * @param size Button size (SMALL, MEDIUM, LARGE)
 * @param enabled Whether the button is enabled
 * @param loading Whether to show loading spinner
 * @param fullWidth Whether button should fill available width
 * @param leadingIcon Optional composable for leading icon
 * @param trailingIcon Optional composable for trailing icon
 *
 * @sample
 * ```
 * KdsButton(
 *     text = "Pay Now",
 *     onClick = { /* handle click */ },
 *     variant = KdsButtonVariant.CONTAINED,
 *     color = KdsButtonColor.PRIMARY,
 *     loading = isProcessing
 * )
 * ```
 */
@Composable
fun KdsButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    variant: KdsButtonVariant = KdsButtonVariant.CONTAINED,
    color: KdsButtonColor = KdsButtonColor.PRIMARY,
    size: KdsButtonSize = KdsButtonSize.MEDIUM,
    enabled: Boolean = true,
    loading: Boolean = false,
    fullWidth: Boolean = true,
    leadingIcon: @Composable (() -> Unit)? = null,
    trailingIcon: @Composable (() -> Unit)? = null,
) {
    val colors = getButtonColors(variant, color)
    val contentPadding = getButtonPadding(size)
    val minHeight = getButtonHeight(size)

    val buttonModifier = modifier
        .then(if (fullWidth) Modifier.fillMaxWidth() else Modifier)
        .height(minHeight)

    val buttonContent: @Composable () -> Unit = {
        if (loading) {
            CircularProgressIndicator(
                modifier = Modifier.size(20.dp),
                color = colors.contentColor,
                strokeWidth = 2.dp
            )
        } else {
            leadingIcon?.let {
                it()
                Spacer(Modifier.width(8.dp))
            }

            Text(
                text = text,
                style = KdsTextStyles.button,
                maxLines = 1,
                overflow = TextOverflow.Ellipsis
            )

            trailingIcon?.let {
                Spacer(Modifier.width(8.dp))
                it()
            }
        }
    }

    when (variant) {
        KdsButtonVariant.CONTAINED -> {
            Button(
                onClick = onClick,
                modifier = buttonModifier,
                enabled = enabled && !loading,
                colors = colors,
                contentPadding = contentPadding,
                shape = KdsComponentShapes.button,
            ) {
                buttonContent()
            }
        }

        KdsButtonVariant.OUTLINED -> {
            OutlinedButton(
                onClick = onClick,
                modifier = buttonModifier,
                enabled = enabled && !loading,
                colors = colors,
                contentPadding = contentPadding,
                shape = KdsComponentShapes.button,
                border = BorderStroke(
                    width = 1.dp,
                    color = if (enabled) getColorMain(color) else KdsColors.actionDisabled
                )
            ) {
                buttonContent()
            }
        }

        KdsButtonVariant.TEXT -> {
            TextButton(
                onClick = onClick,
                modifier = buttonModifier,
                enabled = enabled && !loading,
                colors = colors,
                contentPadding = contentPadding,
                shape = KdsComponentShapes.button,
            ) {
                buttonContent()
            }
        }
    }
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

@Composable
private fun getButtonColors(
    variant: KdsButtonVariant,
    color: KdsButtonColor
): ButtonColors {
    val mainColor = getColorMain(color)
    val contrastColor = getColorContrast(color)

    return when (variant) {
        KdsButtonVariant.CONTAINED -> ButtonDefaults.buttonColors(
            containerColor = mainColor,
            contentColor = contrastColor,
            disabledContainerColor = KdsColors.actionDisabledBackground,
            disabledContentColor = KdsColors.actionDisabled
        )

        KdsButtonVariant.OUTLINED -> ButtonDefaults.outlinedButtonColors(
            containerColor = Color.Transparent,
            contentColor = mainColor,
            disabledContainerColor = Color.Transparent,
            disabledContentColor = KdsColors.actionDisabled
        )

        KdsButtonVariant.TEXT -> ButtonDefaults.textButtonColors(
            containerColor = Color.Transparent,
            contentColor = mainColor,
            disabledContainerColor = Color.Transparent,
            disabledContentColor = KdsColors.actionDisabled
        )
    }
}

private fun getColorMain(color: KdsButtonColor): Color {
    return when (color) {
        KdsButtonColor.PRIMARY -> KdsColors.primaryMain
        KdsButtonColor.SECONDARY -> KdsColors.secondaryMain
        KdsButtonColor.SUCCESS -> KdsColors.successMain
        KdsButtonColor.WARNING -> KdsColors.warningMain
        KdsButtonColor.ERROR -> KdsColors.errorMain
    }
}

private fun getColorContrast(color: KdsButtonColor): Color {
    return when (color) {
        KdsButtonColor.PRIMARY -> KdsColors.primaryContrastText
        KdsButtonColor.SECONDARY -> KdsColors.secondaryContrastText
        KdsButtonColor.SUCCESS -> KdsColors.successContrastText
        KdsButtonColor.WARNING -> KdsColors.warningContrastText
        KdsButtonColor.ERROR -> KdsColors.errorContrastText
    }
}

private fun getButtonPadding(size: KdsButtonSize): PaddingValues {
    return when (size) {
        KdsButtonSize.SMALL -> PaddingValues(horizontal = 12.dp, vertical = 6.dp)
        KdsButtonSize.MEDIUM -> PaddingValues(horizontal = 16.dp, vertical = 10.dp)
        KdsButtonSize.LARGE -> PaddingValues(horizontal = 24.dp, vertical = 14.dp)
    }
}

private fun getButtonHeight(size: KdsButtonSize): Dp {
    return when (size) {
        KdsButtonSize.SMALL -> 36.dp
        KdsButtonSize.MEDIUM -> 44.dp
        KdsButtonSize.LARGE -> KdsDimensions.buttonMinHeight
    }
}

// =============================================================================
// PREVIEWS
// =============================================================================

@Preview(name = "Contained - Primary", showBackground = true)
@Composable
private fun PreviewContainedPrimary() {
    KdsTheme {
        KdsButton(
            text = "Pay Now",
            onClick = { },
            variant = KdsButtonVariant.CONTAINED,
            color = KdsButtonColor.PRIMARY
        )
    }
}

@Preview(name = "Contained - Success", showBackground = true)
@Composable
private fun PreviewContainedSuccess() {
    KdsTheme {
        KdsButton(
            text = "Confirm Payment",
            onClick = { },
            variant = KdsButtonVariant.CONTAINED,
            color = KdsButtonColor.SUCCESS
        )
    }
}

@Preview(name = "Outlined - Primary", showBackground = true)
@Composable
private fun PreviewOutlinedPrimary() {
    KdsTheme {
        KdsButton(
            text = "Cancel",
            onClick = { },
            variant = KdsButtonVariant.OUTLINED,
            color = KdsButtonColor.PRIMARY
        )
    }
}

@Preview(name = "Outlined - Error", showBackground = true)
@Composable
private fun PreviewOutlinedError() {
    KdsTheme {
        KdsButton(
            text = "Abandon Payment",
            onClick = { },
            variant = KdsButtonVariant.OUTLINED,
            color = KdsButtonColor.ERROR
        )
    }
}

@Preview(name = "Text Button", showBackground = true)
@Composable
private fun PreviewTextButton() {
    KdsTheme {
        KdsButton(
            text = "Learn More",
            onClick = { },
            variant = KdsButtonVariant.TEXT,
            fullWidth = false
        )
    }
}

@Preview(name = "Loading State", showBackground = true)
@Composable
private fun PreviewLoading() {
    KdsTheme {
        KdsButton(
            text = "Processing...",
            onClick = { },
            loading = true
        )
    }
}

@Preview(name = "Disabled State", showBackground = true)
@Composable
private fun PreviewDisabled() {
    KdsTheme {
        KdsButton(
            text = "Continue",
            onClick = { },
            enabled = false
        )
    }
}

@Preview(name = "Size Variants", showBackground = true)
@Composable
private fun PreviewSizes() {
    KdsTheme {
        androidx.compose.foundation.layout.Column {
            KdsButton(
                text = "Small",
                onClick = { },
                size = KdsButtonSize.SMALL,
                fullWidth = false
            )
            Spacer(Modifier.height(8.dp))
            KdsButton(
                text = "Medium",
                onClick = { },
                size = KdsButtonSize.MEDIUM,
                fullWidth = false
            )
            Spacer(Modifier.height(8.dp))
            KdsButton(
                text = "Large",
                onClick = { },
                size = KdsButtonSize.LARGE,
                fullWidth = false
            )
        }
    }
}

@Preview(name = "All Variants", showBackground = true)
@Composable
private fun PreviewAllVariants() {
    KdsTheme {
        androidx.compose.foundation.layout.Column(
            modifier = Modifier.fillMaxWidth()
        ) {
            KdsButton(
                text = "Contained",
                onClick = { },
                variant = KdsButtonVariant.CONTAINED
            )
            Spacer(Modifier.height(8.dp))
            KdsButton(
                text = "Outlined",
                onClick = { },
                variant = KdsButtonVariant.OUTLINED
            )
            Spacer(Modifier.height(8.dp))
            KdsButton(
                text = "Text",
                onClick = { },
                variant = KdsButtonVariant.TEXT
            )
        }
    }
}
