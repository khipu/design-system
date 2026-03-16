#!/usr/bin/env node
/**
 * Khipu Design System - Token Generator
 *
 * Generates platform-specific token files from tokens.json
 *
 * Usage:
 *   node scripts/generate-tokens.js
 *   node scripts/generate-tokens.js --kotlin-output=android/designsystem/src/main/java/com/khipu/designsystem/tokens/KdsTokens.kt
 */

const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
const kotlinOutputArg = args.find(arg => arg.startsWith('--kotlin-output='));
const kotlinOutput = kotlinOutputArg
  ? kotlinOutputArg.split('=')[1]
  : path.join(__dirname, '../dist/DesignTokens.kt');

// Load tokens
const tokensPath = path.join(__dirname, '../src/tokens/tokens.json');
const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

/**
 * Convert rgba() or hex color to Kotlin Color format
 */
function hexToKotlinColor(colorValue) {
  if (!colorValue) return 'Color.Unspecified';

  // Handle rgba(r, g, b, a) format
  if (colorValue.startsWith('rgba(')) {
    const match = colorValue.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
    if (match) {
      const [, r, g, b, a] = match;
      const alpha = Math.round(parseFloat(a) * 255);
      const hex = [alpha, parseInt(r), parseInt(g), parseInt(b)]
        .map(n => n.toString(16).padStart(2, '0').toUpperCase())
        .join('');
      return `Color(0x${hex})`;
    }
  }

  // Handle rgb(r, g, b) format
  if (colorValue.startsWith('rgb(')) {
    const match = colorValue.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      const [, r, g, b] = match;
      const hex = [255, parseInt(r), parseInt(g), parseInt(b)]
        .map(n => n.toString(16).padStart(2, '0').toUpperCase())
        .join('');
      return `Color(0x${hex})`;
    }
  }

  // Handle hex colors
  const cleanHex = colorValue.replace('#', '');
  if (cleanHex.length === 6) {
    return `Color(0xFF${cleanHex.toUpperCase()})`;
  } else if (cleanHex.length === 8) {
    // RGBA to ARGB
    const alpha = cleanHex.slice(6, 8);
    const rgb = cleanHex.slice(0, 6);
    return `Color(0x${alpha.toUpperCase()}${rgb.toUpperCase()})`;
  }

  return `Color(0xFF${cleanHex.toUpperCase()})`;
}

/**
 * Strip units and convert to number
 */
function stripUnits(value) {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    // Remove px, rem, em, etc
    return parseFloat(value.replace(/[a-z%]+$/i, ''));
  }
  return value;
}

/**
 * Convert rem to pixels (assuming 16px base)
 */
function remToPixels(remValue) {
  if (typeof remValue === 'number') return remValue * 16;
  if (typeof remValue === 'string' && remValue.includes('rem')) {
    return parseFloat(remValue) * 16;
  }
  return stripUnits(remValue);
}

/**
 * Generate Kotlin code
 */
function generateKotlin(tokens) {
  const lines = [];

  lines.push(`package com.khipu.designsystem.tokens`);
  lines.push(``);
  lines.push(`/**`);
  lines.push(` * Khipu Design System - Design Tokens`);
  lines.push(` * `);
  lines.push(` * AUTO-GENERATED FILE - DO NOT EDIT MANUALLY`);
  lines.push(` * Source: design-system/src/tokens/tokens.json`);
  lines.push(` * Generated: ${new Date().toISOString()}`);
  lines.push(` * `);
  lines.push(` * To regenerate:`);
  lines.push(` *   cd design-system && npm run tokens:generate`);
  lines.push(` */`);
  lines.push(``);
  lines.push(`import androidx.compose.ui.graphics.Color`);
  lines.push(`import androidx.compose.ui.unit.Dp`);
  lines.push(`import androidx.compose.ui.unit.TextUnit`);
  lines.push(`import androidx.compose.ui.unit.dp`);
  lines.push(`import androidx.compose.ui.unit.sp`);
  lines.push(``);

  // =============================================================================
  // KdsColors (Light Mode) - 34 properties
  // =============================================================================
  lines.push(`/**`);
  lines.push(` * Design System Colors (Light Mode)`);
  lines.push(` * Primary: ${tokens.colors.primary.main}`);
  lines.push(` */`);
  lines.push(`object KdsColors {`);

  // Primary colors
  lines.push(`    // Primary palette`);
  lines.push(`    val primaryMain = ${hexToKotlinColor(tokens.colors.primary.main)}`);
  lines.push(`    val primaryLight = ${hexToKotlinColor(tokens.colors.primary.light)}`);
  lines.push(`    val primaryDark = ${hexToKotlinColor(tokens.colors.primary.dark)}`);
  lines.push(`    val primaryContrastText = ${hexToKotlinColor(tokens.colors.primary.contrastText)}`);
  lines.push(``);

  // Secondary colors
  lines.push(`    // Secondary palette`);
  lines.push(`    val secondaryMain = ${hexToKotlinColor(tokens.colors.secondary.main)}`);
  lines.push(`    val secondaryLight = ${hexToKotlinColor(tokens.colors.secondary.light)}`);
  lines.push(`    val secondaryDark = ${hexToKotlinColor(tokens.colors.secondary.dark)}`);
  lines.push(`    val secondaryContrastText = ${hexToKotlinColor(tokens.colors.secondary.contrastText)}`);
  lines.push(``);

  // Semantic colors with contrast text
  lines.push(`    // Success`);
  lines.push(`    val successMain = ${hexToKotlinColor(tokens.colors.success.main)}`);
  lines.push(`    val successLight = ${hexToKotlinColor(tokens.colors.success.light)}`);
  lines.push(`    val successDark = ${hexToKotlinColor(tokens.colors.success.dark)}`);
  lines.push(`    val successContrastText = ${hexToKotlinColor(tokens.colors.success.contrastText)}`);
  lines.push(``);

  lines.push(`    // Warning`);
  lines.push(`    val warningMain = ${hexToKotlinColor(tokens.colors.warning.main)}`);
  lines.push(`    val warningLight = ${hexToKotlinColor(tokens.colors.warning.light)}`);
  lines.push(`    val warningDark = ${hexToKotlinColor(tokens.colors.warning.dark)}`);
  lines.push(`    val warningContrastText = ${hexToKotlinColor(tokens.colors.warning.contrastText)}`);
  lines.push(``);

  lines.push(`    // Error`);
  lines.push(`    val errorMain = ${hexToKotlinColor(tokens.colors.error.main)}`);
  lines.push(`    val errorLight = ${hexToKotlinColor(tokens.colors.error.light)}`);
  lines.push(`    val errorDark = ${hexToKotlinColor(tokens.colors.error.dark)}`);
  lines.push(`    val errorContrastText = ${hexToKotlinColor(tokens.colors.error.contrastText)}`);
  lines.push(``);

  lines.push(`    // Info`);
  lines.push(`    val infoMain = ${hexToKotlinColor(tokens.colors.info.main)}`);
  lines.push(`    val infoLight = ${hexToKotlinColor(tokens.colors.info.light)}`);
  lines.push(`    val infoDark = ${hexToKotlinColor(tokens.colors.info.dark)}`);
  lines.push(`    val infoContrastText = ${hexToKotlinColor(tokens.colors.info.contrastText)}`);
  lines.push(``);

  // Text colors
  lines.push(`    // Text colors`);
  lines.push(`    val textPrimary = ${hexToKotlinColor(tokens.colors.text.primary)}`);
  lines.push(`    val textSecondary = ${hexToKotlinColor(tokens.colors.text.secondary)}`);
  lines.push(`    val textDisabled = ${hexToKotlinColor(tokens.colors.text.disabled)}`);
  lines.push(``);

  // Background colors
  lines.push(`    // Background colors`);
  lines.push(`    val backgroundDefault = ${hexToKotlinColor(tokens.colors.background.default)}`);
  lines.push(`    val backgroundPaper = ${hexToKotlinColor(tokens.colors.background.paper)}`);
  lines.push(`    val backgroundElevated = ${hexToKotlinColor(tokens.colors.background.elevated)}`);
  lines.push(``);

  // Action colors
  lines.push(`    // Action colors`);
  lines.push(`    val actionActive = ${hexToKotlinColor(tokens.colors.action.active)}`);
  lines.push(`    val actionHover = ${hexToKotlinColor(tokens.colors.action.hover)}`);
  lines.push(`    val actionSelected = ${hexToKotlinColor(tokens.colors.action.selected)}`);
  lines.push(`    val actionDisabled = ${hexToKotlinColor(tokens.colors.action.disabled)}`);
  lines.push(`    val actionDisabledBackground = ${hexToKotlinColor(tokens.colors.action.disabledBackground)}`);
  lines.push(`    val actionFocus = ${hexToKotlinColor(tokens.colors.action.focus)}`);
  lines.push(``);

  lines.push(`    // Divider`);
  lines.push(`    val divider = ${hexToKotlinColor(tokens.colors.divider)}`);
  lines.push(`}`);
  lines.push(``);

  // =============================================================================
  // KdsColorsDark (Dark Mode) - 34 properties (same structure)
  // =============================================================================
  lines.push(`/**`);
  lines.push(` * Design System Colors (Dark Mode)`);
  lines.push(` * Currently using adjusted values - TODO: Define proper dark mode palette`);
  lines.push(` */`);
  lines.push(`object KdsColorsDark {`);
  lines.push(`    // Primary palette`);
  lines.push(`    val primaryMain = ${hexToKotlinColor(tokens.colors.primary.light)}`); // Use light for dark mode
  lines.push(`    val primaryLight = ${hexToKotlinColor(tokens.colors.primary.main)}`);
  lines.push(`    val primaryDark = ${hexToKotlinColor(tokens.colors.primary.dark)}`);
  lines.push(`    val primaryContrastText = Color(0xFF000000)`); // Black text on primary in dark mode
  lines.push(``);

  lines.push(`    // Secondary palette`);
  lines.push(`    val secondaryMain = ${hexToKotlinColor(tokens.colors.secondary.light)}`);
  lines.push(`    val secondaryLight = ${hexToKotlinColor(tokens.colors.secondary.main)}`);
  lines.push(`    val secondaryDark = ${hexToKotlinColor(tokens.colors.secondary.dark)}`);
  lines.push(`    val secondaryContrastText = Color(0xFF000000)`);
  lines.push(``);

  lines.push(`    // Success`);
  lines.push(`    val successMain = ${hexToKotlinColor(tokens.colors.success.light)}`);
  lines.push(`    val successLight = ${hexToKotlinColor(tokens.colors.success.main)}`);
  lines.push(`    val successDark = ${hexToKotlinColor(tokens.colors.success.dark)}`);
  lines.push(`    val successContrastText = Color(0xFF000000)`);
  lines.push(``);

  lines.push(`    // Warning`);
  lines.push(`    val warningMain = ${hexToKotlinColor(tokens.colors.warning.light)}`);
  lines.push(`    val warningLight = ${hexToKotlinColor(tokens.colors.warning.main)}`);
  lines.push(`    val warningDark = ${hexToKotlinColor(tokens.colors.warning.dark)}`);
  lines.push(`    val warningContrastText = Color(0xFF000000)`);
  lines.push(``);

  lines.push(`    // Error`);
  lines.push(`    val errorMain = ${hexToKotlinColor(tokens.colors.error.light)}`);
  lines.push(`    val errorLight = ${hexToKotlinColor(tokens.colors.error.main)}`);
  lines.push(`    val errorDark = ${hexToKotlinColor(tokens.colors.error.dark)}`);
  lines.push(`    val errorContrastText = Color(0xFF000000)`);
  lines.push(``);

  lines.push(`    // Info`);
  lines.push(`    val infoMain = ${hexToKotlinColor(tokens.colors.info.light)}`);
  lines.push(`    val infoLight = ${hexToKotlinColor(tokens.colors.info.main)}`);
  lines.push(`    val infoDark = ${hexToKotlinColor(tokens.colors.info.dark)}`);
  lines.push(`    val infoContrastText = Color(0xFF000000)`);
  lines.push(``);

  lines.push(`    // Text colors (inverted for dark mode)`);
  lines.push(`    val textPrimary = Color(0xFFFFFFFF)`); // White
  lines.push(`    val textSecondary = Color(0xB3FFFFFF)`); // 70% white
  lines.push(`    val textDisabled = Color(0x61FFFFFF)`); // 38% white
  lines.push(``);

  lines.push(`    // Background colors (dark)`);
  lines.push(`    val backgroundDefault = Color(0xFF121212)`);
  lines.push(`    val backgroundPaper = Color(0xFF1E1E1E)`);
  lines.push(`    val backgroundElevated = Color(0xFF2C2C2C)`);
  lines.push(``);

  lines.push(`    // Action colors (adjusted for dark)`);
  lines.push(`    val actionActive = Color(0x8FFFFFFF)`);
  lines.push(`    val actionHover = Color(0x0AFFFFFF)`);
  lines.push(`    val actionSelected = Color(0x14FFFFFF)`);
  lines.push(`    val actionDisabled = Color(0x42FFFFFF)`);
  lines.push(`    val actionDisabledBackground = Color(0x1FFFFFFF)`);
  lines.push(`    val actionFocus = Color(0x1FFFFFFF)`);
  lines.push(``);

  lines.push(`    // Divider`);
  lines.push(`    val divider = Color(0x1FFFFFFF)`);
  lines.push(`}`);
  lines.push(``);

  // =============================================================================
  // KdsTypography - 17 properties
  // =============================================================================
  lines.push(`/**`);
  lines.push(` * Design System Typography`);
  lines.push(` */`);
  lines.push(`object KdsTypography {`);
  lines.push(`    // Font weights`);
  lines.push(`    const val fontWeightRegular = ${tokens.typography.fontWeights.regular}`);
  lines.push(`    const val fontWeightMedium = ${tokens.typography.fontWeights.medium}`);
  lines.push(`    const val fontWeightSemiBold = ${tokens.typography.fontWeights.semiBold}`);
  lines.push(`    const val fontWeightBold = ${tokens.typography.fontWeights.bold}`);
  lines.push(``);

  lines.push(`    // Font sizes (in sp)`);
  Object.entries(tokens.typography.fontSizes).forEach(([key, value]) => {
    const pixels = remToPixels(value);
    const safeName = key.replace(/^(\d)/, 'size$1').replace(/xl/gi, 'Xl');
    const capitalizedName = safeName.charAt(0).toUpperCase() + safeName.slice(1);
    lines.push(`    val fontSize${capitalizedName} = ${pixels}.sp`);
  });
  lines.push(``);

  lines.push(`    // Line heights`);
  Object.entries(tokens.typography.lineHeights).forEach(([key, value]) => {
    const capitalizedName = key.charAt(0).toUpperCase() + key.slice(1);
    lines.push(`    const val lineHeight${capitalizedName} = ${value}f`);
  });
  lines.push(`}`);
  lines.push(``);

  // =============================================================================
  // KdsSpacing - 28 properties (base scale + semantic)
  // =============================================================================
  lines.push(`/**`);
  lines.push(` * Design System Spacing`);
  lines.push(` */`);
  lines.push(`object KdsSpacing {`);
  lines.push(`    // Base spacing scale`);
  Object.entries(tokens.spacing).forEach(([key, value]) => {
    const pixels = stripUnits(value);
    lines.push(`    val space${key} = ${pixels}.dp`);
  });
  lines.push(``);

  // Add semantic spacing as direct properties
  if (tokens.semanticSpacing) {
    lines.push(`    // Component-specific semantic spacing`);
    if (tokens.semanticSpacing.card) {
      lines.push(`    val cardPaddingX = ${stripUnits(tokens.semanticSpacing.card.paddingX)}.dp`);
      lines.push(`    val cardPaddingY = ${stripUnits(tokens.semanticSpacing.card.paddingY)}.dp`);
      lines.push(`    val cardGap = ${stripUnits(tokens.semanticSpacing.card.gap)}.dp`);
      lines.push(`    val cardListGap = ${stripUnits(tokens.semanticSpacing.card.listGap)}.dp`);
    }
    if (tokens.semanticSpacing.box) {
      lines.push(`    val boxPaddingX = ${stripUnits(tokens.semanticSpacing.box.paddingX)}.dp`);
      lines.push(`    val boxPaddingY = ${stripUnits(tokens.semanticSpacing.box.paddingY)}.dp`);
    }
    if (tokens.semanticSpacing.input) {
      lines.push(`    val inputPaddingX = ${stripUnits(tokens.semanticSpacing.input.paddingX)}.dp`);
      lines.push(`    val inputPaddingY = ${stripUnits(tokens.semanticSpacing.input.paddingY)}.dp`);
    }
    if (tokens.semanticSpacing.button) {
      lines.push(`    val buttonPaddingX = ${stripUnits(tokens.semanticSpacing.button.paddingX)}.dp`);
      lines.push(`    val buttonPaddingY = ${stripUnits(tokens.semanticSpacing.button.paddingY)}.dp`);
    }
    lines.push(`    val sectionGap = ${stripUnits(tokens.semanticSpacing.sectionGap)}.dp`);
    lines.push(`    val formGap = ${stripUnits(tokens.semanticSpacing.formGap)}.dp`);
    lines.push(`    val stackGap = ${stripUnits(tokens.semanticSpacing.stackGap)}.dp`);
    lines.push(`    val inlineGap = ${stripUnits(tokens.semanticSpacing.inlineGap)}.dp`);
    lines.push(`    val modalPadding = ${stripUnits(tokens.semanticSpacing.modalPadding)}.dp`);
  }
  lines.push(`}`);
  lines.push(``);

  // =============================================================================
  // KdsBorderRadius - 16 properties
  // =============================================================================
  lines.push(`/**`);
  lines.push(` * Design System Border Radius`);
  lines.push(` */`);
  lines.push(`object KdsBorderRadius {`);
  lines.push(`    // Base radius scale`);
  Object.entries(tokens.borderRadius).forEach(([key, value]) => {
    const pixels = value === '9999px' ? 9999 : stripUnits(value);

    // Skip component-specific ones, we'll add them separately
    if (['button', 'input', 'card', 'modal', 'chip', 'avatar', 'iconContainer'].includes(key)) {
      return;
    }

    if (key === 'full') {
      lines.push(`    val radiusFull = ${pixels}.dp // Use for pills/circles`);
    } else if (key.match(/^\d/)) {
      lines.push(`    val radius${key.replace(/xl/gi, 'Xl')} = ${pixels}.dp`);
    } else {
      const safeName = key.charAt(0).toUpperCase() + key.slice(1);
      lines.push(`    val radius${safeName} = ${pixels}.dp`);
    }
  });

  lines.push(``);
  lines.push(`    // Component-specific radii`);
  if (tokens.borderRadius.button !== undefined) {
    lines.push(`    val button = ${stripUnits(tokens.borderRadius.button)}.dp`);
  }
  if (tokens.borderRadius.input !== undefined) {
    lines.push(`    val input = ${stripUnits(tokens.borderRadius.input)}.dp`);
  }
  if (tokens.borderRadius.card !== undefined) {
    lines.push(`    val card = ${stripUnits(tokens.borderRadius.card)}.dp`);
  }
  if (tokens.borderRadius.modal !== undefined) {
    lines.push(`    val modal = ${stripUnits(tokens.borderRadius.modal)}.dp`);
  }
  if (tokens.borderRadius.chip !== undefined) {
    lines.push(`    val chip = ${stripUnits(tokens.borderRadius.chip)}.dp`);
  }
  if (tokens.borderRadius.avatar !== undefined) {
    lines.push(`    val avatar = ${stripUnits(tokens.borderRadius.avatar)}.dp`);
  }
  if (tokens.borderRadius.iconContainer !== undefined) {
    lines.push(`    val iconContainer = ${stripUnits(tokens.borderRadius.iconContainer)}.dp`);
  }
  lines.push(`}`);
  lines.push(``);

  // =============================================================================
  // KdsTransitions - 7 properties
  // =============================================================================
  lines.push(`/**`);
  lines.push(` * Design System Animation Durations (in milliseconds)`);
  lines.push(` */`);
  lines.push(`object KdsTransitions {`);
  Object.entries(tokens.transitions.duration).forEach(([key, value]) => {
    const capitalizedName = key.charAt(0).toUpperCase() + key.slice(1);
    lines.push(`    const val duration${capitalizedName} = ${value}`);
  });
  lines.push(`}`);
  lines.push(``);

  // =============================================================================
  // KdsBreakpoints - 5 properties
  // =============================================================================
  lines.push(`/**`);
  lines.push(` * Design System Breakpoints (in dp)`);
  lines.push(` */`);
  lines.push(`object KdsBreakpoints {`);
  Object.entries(tokens.breakpoints).forEach(([key, value]) => {
    const pixels = stripUnits(value);
    lines.push(`    val ${key} = ${pixels}.dp`);
  });
  lines.push(`}`);
  lines.push(``);

  // =============================================================================
  // KdsDimensions - 9 properties
  // =============================================================================
  lines.push(`/**`);
  lines.push(` * Design System Component Dimensions`);
  lines.push(` * TODO: Move these to design tokens`);
  lines.push(` */`);
  lines.push(`object KdsDimensions {`);
  lines.push(`    val buttonMinHeight = 50.dp`);
  lines.push(`    val buttonMinHeightSmall = 36.dp`);
  lines.push(`    val buttonMinHeightMedium = 44.dp`);
  lines.push(`    val buttonMinHeightLarge = 50.dp`);
  lines.push(`    val inputHeight = 56.dp`);
  lines.push(`    val radioCardMinHeight = 65.dp`);
  lines.push(`    val containerMaxWidth = 450.dp`);
  lines.push(`    val modalMaxWidth = 450.dp`);
  lines.push(`    val modalMaxHeight = 800.dp`);
  lines.push(`}`);

  return lines.join('\n');
}

// Generate files
console.log('🎨 Khipu Design System - Token Generator\n');

// Ensure output directory exists
const outputDir = path.dirname(kotlinOutput);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate Kotlin
const kotlinCode = generateKotlin(tokens);
fs.writeFileSync(kotlinOutput, kotlinCode);
console.log(`✅ Generated Kotlin tokens: ${kotlinOutput}`);

console.log('\n📦 Done! Tokens generated successfully.');
console.log('\n🔄 Next steps:');
console.log('   1. Build Android library: npm run android:build');
console.log('   2. Publish to Nexus: npm run android:publish');
console.log('   3. Update version in consuming apps');
console.log('\n💡 Publishing targets:');
console.log('   • Web: npmjs.org (npm publish --tag alpha --access public)');
console.log('   • Android: Nexus design-system repo (npm run android:publish)');
console.log('   • Grails: Nexus thirdparty repo (manual ZIP upload)');
console.log('\n💡 Tokens are included in the published library:');
console.log('   Import: import com.khipu.designsystem.tokens.KdsColors');
console.log('   Usage:  KdsColors.primaryMain, KdsSpacing.space4, etc.');
