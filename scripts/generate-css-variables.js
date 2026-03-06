#!/usr/bin/env node
/**
 * Khipu Design System - CSS Variables Generator
 *
 * Generates CSS custom properties from design tokens JSON
 *
 * Usage:
 *   node scripts/generate-css-variables.js
 */

const fs = require('fs');
const path = require('path');

// Read tokens.json
const tokensPath = path.join(__dirname, '../src/tokens/tokens.json');

if (!fs.existsSync(tokensPath)) {
  console.error('❌ Error: tokens.json not found. Run "npm run tokens:export" first.');
  console.error(`   Looking for: ${tokensPath}`);
  process.exit(1);
}

const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

/**
 * Convert a nested object path to kebab-case CSS variable name
 * Example: { colors: { primary: { main: "#xxx" } } } → --kds-color-primary-main
 */
function generateCSSVariables(obj, prefix = 'kds') {
  const variables = [];

  function traverse(current, path = []) {
    if (typeof current === 'object' && current !== null && !Array.isArray(current)) {
      for (const [key, value] of Object.entries(current)) {
        traverse(value, [...path, key]);
      }
    } else {
      // Leaf value - create CSS variable
      const varName = `--${prefix}-${path.join('-')}`;
      variables.push({ name: varName, value: current });
    }
  }

  traverse(obj);
  return variables;
}

/**
 * Generate CSS custom properties for colors
 */
function generateColorVariables(colors) {
  const variables = [];

  // Primary palette
  if (colors.primary) {
    variables.push({ name: '--kds-color-primary-main', value: colors.primary.main, comment: 'Primary palette - Khipu brand' });
    variables.push({ name: '--kds-color-primary-light', value: colors.primary.light });
    variables.push({ name: '--kds-color-primary-dark', value: colors.primary.dark });
    variables.push({ name: '--kds-color-primary-contrast', value: colors.primary.contrastText });

    if (colors.primary.states) {
      variables.push({ name: '--kds-color-primary-hover', value: colors.primary.states.hover });
      variables.push({ name: '--kds-color-primary-selected', value: colors.primary.states.selected });
      variables.push({ name: '--kds-color-primary-focus', value: colors.primary.states.focus });
      variables.push({ name: '--kds-color-primary-focus-visible', value: colors.primary.states.focusVisible });
    }
  }

  // Secondary palette
  if (colors.secondary) {
    variables.push({ name: '--kds-color-secondary-main', value: colors.secondary.main, comment: 'Secondary palette' });
    variables.push({ name: '--kds-color-secondary-light', value: colors.secondary.light });
    variables.push({ name: '--kds-color-secondary-dark', value: colors.secondary.dark });
    variables.push({ name: '--kds-color-secondary-contrast', value: colors.secondary.contrastText });
  }

  // Semantic colors
  const semanticColors = ['success', 'warning', 'error', 'info'];
  for (const semantic of semanticColors) {
    if (colors[semantic]) {
      const commentText = semantic === 'success' ? 'Semantic colors' : undefined;
      variables.push({ name: `--kds-color-${semantic}-main`, value: colors[semantic].main, comment: commentText });
      variables.push({ name: `--kds-color-${semantic}-light`, value: colors[semantic].light });
      variables.push({ name: `--kds-color-${semantic}-dark`, value: colors[semantic].dark });
    }
  }

  // Text colors
  if (colors.text) {
    variables.push({ name: '--kds-color-text-primary', value: colors.text.primary, comment: 'Text colors' });
    variables.push({ name: '--kds-color-text-secondary', value: colors.text.secondary });
    variables.push({ name: '--kds-color-text-disabled', value: colors.text.disabled });
    if (colors.text.hint) {
      variables.push({ name: '--kds-color-text-hint', value: colors.text.hint });
    }
  }

  // Background colors
  if (colors.background) {
    variables.push({ name: '--kds-color-background-default', value: colors.background.default, comment: 'Background colors' });
    variables.push({ name: '--kds-color-background-paper', value: colors.background.paper });
    variables.push({ name: '--kds-color-background-elevated', value: colors.background.elevated });
  }

  // Action colors
  if (colors.action) {
    variables.push({ name: '--kds-color-action-active', value: colors.action.active, comment: 'Action colors' });
    variables.push({ name: '--kds-color-action-hover', value: colors.action.hover });
    variables.push({ name: '--kds-color-action-selected', value: colors.action.selected });
    variables.push({ name: '--kds-color-action-disabled', value: colors.action.disabled });
    variables.push({ name: '--kds-color-action-disabled-bg', value: colors.action.disabledBackground });
    if (colors.action.focus) {
      variables.push({ name: '--kds-color-action-focus', value: colors.action.focus });
    }
  }

  // Divider
  if (colors.divider) {
    variables.push({ name: '--kds-color-divider', value: colors.divider, comment: 'Divider' });
  }

  // Input borders
  if (colors.components?.input?.outlined) {
    variables.push({ name: '--kds-color-input-border', value: colors.components.input.outlined.enabledBorder, comment: 'Input borders' });
    variables.push({ name: '--kds-color-input-border-hover', value: colors.components.input.outlined.hoverBorder });
  }

  return variables;
}

/**
 * Generate CSS custom properties for typography
 */
function generateTypographyVariables(typography) {
  const variables = [];

  // Font families
  if (typography.fontFamilies) {
    variables.push({
      name: '--kds-font-family-primary',
      value: typography.fontFamilies.primary,
      comment: 'Font families'
    });
    variables.push({ name: '--kds-font-family-secondary', value: typography.fontFamilies.secondary });
    variables.push({ name: '--kds-font-family-mono', value: typography.fontFamilies.mono });
  }

  // Font weights
  if (typography.fontWeights) {
    variables.push({ name: '--kds-font-weight-regular', value: typography.fontWeights.regular, comment: 'Font weights' });
    variables.push({ name: '--kds-font-weight-medium', value: typography.fontWeights.medium });
    variables.push({ name: '--kds-font-weight-semibold', value: typography.fontWeights.semiBold });
    variables.push({ name: '--kds-font-weight-bold', value: typography.fontWeights.bold });
  }

  // Font sizes
  if (typography.fontSizes) {
    const sizes = typography.fontSizes;
    variables.push({ name: '--kds-font-size-xs', value: sizes.xs, comment: 'Font sizes' });
    variables.push({ name: '--kds-font-size-sm', value: sizes.sm });
    variables.push({ name: '--kds-font-size-base', value: sizes.base });
    variables.push({ name: '--kds-font-size-lg', value: sizes.lg });
    variables.push({ name: '--kds-font-size-xl', value: sizes.xl });
    variables.push({ name: '--kds-font-size-2xl', value: sizes['2xl'] });
    variables.push({ name: '--kds-font-size-3xl', value: sizes['3xl'] });
    variables.push({ name: '--kds-font-size-4xl', value: sizes['4xl'] });
  }

  // Line heights
  if (typography.lineHeights) {
    const lh = typography.lineHeights;
    variables.push({ name: '--kds-line-height-tight', value: lh.tight, comment: 'Line heights' });
    variables.push({ name: '--kds-line-height-snug', value: lh.snug });
    variables.push({ name: '--kds-line-height-normal', value: lh.normal });
    variables.push({ name: '--kds-line-height-relaxed', value: lh.relaxed });
  }

  // Letter spacing
  if (typography.letterSpacings) {
    const ls = typography.letterSpacings;
    variables.push({ name: '--kds-letter-spacing-normal', value: ls.normal, comment: 'Letter spacing' });
    variables.push({ name: '--kds-letter-spacing-wide', value: ls.wide });
    variables.push({ name: '--kds-letter-spacing-wider', value: ls.wider });
    variables.push({ name: '--kds-letter-spacing-widest', value: ls.widest });
  }

  return variables;
}

/**
 * Generate CSS custom properties for spacing
 */
function generateSpacingVariables(spacing, semanticSpacing) {
  const variables = [];

  // Base spacing scale
  for (const [key, value] of Object.entries(spacing)) {
    variables.push({ name: `--kds-spacing-${key}`, value });
  }

  // Semantic spacing
  if (semanticSpacing) {
    variables.push({ name: '--kds-spacing-input-x', value: semanticSpacing.inputPaddingX, comment: 'Semantic spacing' });
    variables.push({ name: '--kds-spacing-input-y', value: semanticSpacing.inputPaddingY });
    variables.push({ name: '--kds-spacing-button-x', value: semanticSpacing.buttonPaddingX });
    variables.push({ name: '--kds-spacing-button-y', value: semanticSpacing.buttonPaddingY });
    variables.push({ name: '--kds-spacing-card', value: semanticSpacing.cardPaddingX });
    variables.push({ name: '--kds-spacing-modal', value: semanticSpacing.modalPadding });
    variables.push({ name: '--kds-spacing-section', value: semanticSpacing.sectionGap });
    variables.push({ name: '--kds-spacing-form-gap', value: semanticSpacing.formGap });
  }

  return variables;
}

/**
 * Generate CSS custom properties for border radius
 */
function generateBorderRadiusVariables(borderRadius) {
  const variables = [];

  // Base radius scale
  const baseRadii = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
  for (const key of baseRadii) {
    if (borderRadius[key]) {
      variables.push({ name: `--kds-radius-${key}`, value: borderRadius[key] });
    }
  }

  // Component-specific radii
  const components = ['button', 'input', 'card', 'modal', 'chip', 'iconContainer'];
  variables.push({ comment: 'Component-specific radii' });
  for (const component of components) {
    if (borderRadius[component]) {
      variables.push({ name: `--kds-radius-${component}`, value: borderRadius[component] });
    }
  }

  return variables;
}

/**
 * Generate CSS custom properties for shadows
 */
function generateShadowVariables(shadows) {
  const variables = [];

  // MUI elevation shadows (generate standard set)
  const elevations = {
    none: 'none',
    1: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    2: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
    4: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    8: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
    16: '0px 8px 10px -5px rgba(0,0,0,0.2), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12)',
    24: '0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)',
  };

  for (const [level, shadow] of Object.entries(elevations)) {
    variables.push({ name: `--kds-shadow-${level}`, value: shadow });
  }

  // Semantic shadows
  variables.push({ comment: 'Semantic shadows' });
  variables.push({ name: '--kds-shadow-button', value: 'var(--kds-shadow-2)' });
  variables.push({ name: '--kds-shadow-card', value: 'var(--kds-shadow-1)' });
  variables.push({ name: '--kds-shadow-modal', value: 'var(--kds-shadow-24)' });
  variables.push({ name: '--kds-shadow-dropdown', value: 'var(--kds-shadow-8)' });

  return variables;
}

/**
 * Generate CSS custom properties for z-index
 */
function generateZIndexVariables(zIndex) {
  const variables = [];

  if (zIndex.fab) variables.push({ name: '--kds-z-index-fab', value: zIndex.fab });
  if (zIndex.appBar) variables.push({ name: '--kds-z-index-appbar', value: zIndex.appBar });
  if (zIndex.drawer) variables.push({ name: '--kds-z-index-drawer', value: zIndex.drawer });
  if (zIndex.modal) variables.push({ name: '--kds-z-index-modal', value: zIndex.modal });
  if (zIndex.snackbar) variables.push({ name: '--kds-z-index-snackbar', value: zIndex.snackbar });
  if (zIndex.tooltip) variables.push({ name: '--kds-z-index-tooltip', value: zIndex.tooltip });

  return variables;
}

/**
 * Generate CSS custom properties for transitions
 */
function generateTransitionVariables(transitions) {
  const variables = [];

  // Duration
  if (transitions.duration) {
    const d = transitions.duration;
    variables.push({ name: '--kds-transition-shortest', value: `${d.shortest}ms` });
    variables.push({ name: '--kds-transition-shorter', value: `${d.shorter}ms` });
    variables.push({ name: '--kds-transition-short', value: `${d.short}ms` });
    variables.push({ name: '--kds-transition-standard', value: `${d.standard}ms` });
    variables.push({ name: '--kds-transition-complex', value: `${d.complex}ms` });
  }

  // Easing
  if (transitions.easing) {
    variables.push({ name: '--kds-easing-standard', value: transitions.easing.easeInOut });
    variables.push({ name: '--kds-easing-ease-out', value: transitions.easing.easeOut });
    variables.push({ name: '--kds-easing-ease-in', value: transitions.easing.easeIn });
    variables.push({ name: '--kds-easing-sharp', value: transitions.easing.sharp });
  }

  return variables;
}

/**
 * Generate CSS custom properties for breakpoints
 */
function generateBreakpointVariables(breakpoints) {
  const variables = [];

  // Skip xs (0px) and start from sm
  if (breakpoints.sm) variables.push({ name: '--kds-breakpoint-sm', value: breakpoints.sm });
  if (breakpoints.md) variables.push({ name: '--kds-breakpoint-md', value: breakpoints.md });
  if (breakpoints.lg) variables.push({ name: '--kds-breakpoint-lg', value: breakpoints.lg });
  if (breakpoints.xl) variables.push({ name: '--kds-breakpoint-xl', value: breakpoints.xl });

  return variables;
}

/**
 * Format CSS variables into :root declaration
 */
function formatCSSVariables(sections) {
  let css = `/**
 * Khipu Design System - CSS Custom Properties
 * Use these variables for runtime theming and CSS-based styling
 *
 * AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 * Source: design-system/src/tokens/tokens.json
 * Generated: ${new Date().toISOString()}
 *
 * To regenerate:
 *   cd design-system && npm run tokens:generate
 */

/* Font imports - must be at the top of the file */
@import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&family=Roboto:wght@400;500;700&family=Inter:wght@400;500;600&display=swap');

:root {
`;

  for (const { title, variables } of sections) {
    css += `  /* ${'='.repeat(74)}\n`;
    css += `     ${title.toUpperCase()}\n`;
    css += `     ${'='.repeat(74)} */\n\n`;

    let lastHadComment = false;
    for (const variable of variables) {
      // Handle comment-only entries (section dividers)
      if (variable.comment && !variable.name) {
        if (!lastHadComment) {
          css += '\n';
        }
        css += `  /* ${variable.comment} */\n`;
        lastHadComment = true;
      }
      // Handle variables with optional comments
      else if (variable.name) {
        if (variable.comment) {
          if (!lastHadComment) {
            css += '\n';
          }
          css += `  /* ${variable.comment} */\n`;
        }
        css += `  ${variable.name}: ${variable.value};\n`;
        lastHadComment = false;
      }
    }

    css += '\n';
  }

  css += '}\n';
  return css;
}

// Generate all CSS variables
const sections = [
  {
    title: 'COLOR TOKENS',
    variables: generateColorVariables(tokens.colors),
  },
  {
    title: 'TYPOGRAPHY TOKENS',
    variables: generateTypographyVariables(tokens.typography),
  },
  {
    title: 'SPACING TOKENS',
    variables: generateSpacingVariables(tokens.spacing, tokens.semanticSpacing),
  },
  {
    title: 'BORDER RADIUS TOKENS',
    variables: generateBorderRadiusVariables(tokens.borderRadius),
  },
  {
    title: 'SHADOW TOKENS',
    variables: generateShadowVariables(tokens.shadows),
  },
  {
    title: 'Z-INDEX TOKENS',
    variables: generateZIndexVariables(tokens.zIndex),
  },
  {
    title: 'TRANSITION TOKENS',
    variables: generateTransitionVariables(tokens.transitions),
  },
  {
    title: 'BREAKPOINTS',
    variables: generateBreakpointVariables(tokens.breakpoints),
  },
];

const cssContent = formatCSSVariables(sections);

// Write to src/tokens/css-variables.css
const outputPath = path.join(__dirname, '../src/tokens/css-variables.css');
fs.writeFileSync(outputPath, cssContent);

console.log('✅ Generated CSS variables:', outputPath);
console.log('   Variables are now in sync with TypeScript tokens!');
