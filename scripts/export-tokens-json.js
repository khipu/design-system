#!/usr/bin/env node
/**
 * Khipu Design System - Token JSON Exporter
 *
 * Exports TypeScript tokens to JSON format for cross-platform generation
 *
 * Usage:
 *   node scripts/export-tokens-json.js
 */

const fs = require('fs');
const path = require('path');

// Import the built tokens (requires build first)
const tokensPath = path.join(__dirname, '../dist/index.js');

if (!fs.existsSync(tokensPath)) {
  console.error('❌ Error: Built tokens not found. Run "npm run build" first.');
  console.error(`   Looking for: ${tokensPath}`);
  process.exit(1);
}

const { tokens } = require(tokensPath);

// Convert tokens to simplified JSON structure for generation
const jsonTokens = {
  colors: tokens.colors,
  typography: {
    fontFamilies: tokens.fontFamilies,
    fontWeights: tokens.fontWeights,
    fontSizes: tokens.fontSizes,
    lineHeights: tokens.lineHeights,
    letterSpacings: tokens.letterSpacings,
    button: tokens.typography.button,  // Component-specific typography
    h1: tokens.typography.h1,
    h2: tokens.typography.h2,
    h3: tokens.typography.h3,
    h4: tokens.typography.h4,
    h5: tokens.typography.h5,
    h6: tokens.typography.h6,
  },
  spacing: tokens.spacing,
  semanticSpacing: tokens.semanticSpacing,
  responsiveSpacing: tokens.responsiveSpacing,
  responsiveTypography: tokens.responsiveTypography,
  responsiveBaseFontSizes: tokens.responsiveBaseFontSizes,
  borderRadius: tokens.borderRadius,
  borders: tokens.borders,
  shadows: tokens.shadows,
  zIndex: tokens.zIndex,
  transitions: tokens.transitions,
  breakpoints: tokens.breakpoints,
};

// Write to src/tokens/tokens.json
const outputPath = path.join(__dirname, '../src/tokens/tokens.json');
fs.writeFileSync(outputPath, JSON.stringify(jsonTokens, null, 2));

console.log('✅ Exported tokens to JSON:', outputPath);
console.log('   Now you can run: node scripts/generate-tokens.js');
