package com.khipu.designsystem.theme

import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Shapes
import androidx.compose.ui.unit.dp
import com.khipu.designsystem.tokens.KdsBorderRadius

/**
 * Khipu Design System - Shapes
 *
 * Border radius configuration for Material 3 components.
 */
val KdsShapes = Shapes(
    // Extra small: chips, small buttons
    extraSmall = RoundedCornerShape(KdsBorderRadius.radiusSm),

    // Small: buttons, text fields
    small = RoundedCornerShape(KdsBorderRadius.radiusSm),

    // Medium: cards, dialogs
    medium = RoundedCornerShape(KdsBorderRadius.radiusMd),

    // Large: bottom sheets, large cards
    large = RoundedCornerShape(KdsBorderRadius.radiusLg),

    // Extra large: modals, full-screen dialogs
    extraLarge = RoundedCornerShape(KdsBorderRadius.radiusXl),
)

/**
 * Component-specific shapes from design tokens
 */
object KdsComponentShapes {
    /** Button border radius */
    val button = RoundedCornerShape(KdsBorderRadius.button)

    /** Card border radius */
    val card = RoundedCornerShape(KdsBorderRadius.card)

    /** Input field border radius */
    val input = RoundedCornerShape(KdsBorderRadius.input)

    /** Modal/dialog border radius */
    val modal = RoundedCornerShape(KdsBorderRadius.modal)

    /** Chip border radius */
    val chip = RoundedCornerShape(KdsBorderRadius.chip)

    /** Checkbox border radius */
    val checkbox = RoundedCornerShape(KdsBorderRadius.radiusSm)

    /** Full pill shape */
    val pill = RoundedCornerShape(KdsBorderRadius.radiusFull)
}
