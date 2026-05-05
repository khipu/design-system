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
      variables.push({ name: '--kds-color-primary-outlined-border-light', value: colors.primary.states.outlinedBorderLight });
      variables.push({ name: '--kds-color-primary-outlined-border', value: colors.primary.states.outlinedBorder });
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
    variables.push({ name: '--kds-color-background-muted', value: colors.background.muted });
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

  // Gray palette (neutral colors)
  if (colors.gray) {
    variables.push({ comment: 'Gray palette - Neutral colors' });
    for (const [shade, value] of Object.entries(colors.gray)) {
      variables.push({ name: `--kds-color-gray-${shade}`, value });
    }
  }

  // Component colors - generate all automatically
  const componentKeys = Object.keys(colors.components || {});

  // Input borders
  for (const [key, value] of Object.entries(colors.components?.input?.outlined || {})) {
    const kebabKey = key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
    const comment = key === 'enabledBorder' ? 'Input borders' : undefined;
    variables.push({ name: `--kds-color-input-${kebabKey}`, value, comment });
  }

  // Snackbar backgrounds
  for (const [key, value] of Object.entries(colors.components?.snackbar || {})) {
    const kebabKey = key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
    const comment = key === 'successBg' ? 'Snackbar backgrounds' : undefined;
    variables.push({ name: `--kds-snackbar-${kebabKey}`, value, comment });
  }

  // Alert backgrounds
  for (const [key, value] of Object.entries(colors.components?.alert || {})) {
    const kebabKey = key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
    const comment = key === 'infoBg' ? 'Alert backgrounds' : undefined;
    variables.push({ name: `--kds-alert-${kebabKey}`, value, comment });
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

  // Font sizes — base scale (xs–4xl) is now set via responsive mobile-first
  // in generateResponsiveBaseFontSizeVariables(). Only static fontSizes.md alias here.
  variables.push({ comment: 'Font sizes (base scale xs–4xl: see responsive section below)' });

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

  // Component-specific typography
  variables.push({ name: '--kds-typography-button-font-size', value: typography.button.fontSize, comment: 'Button typography' });
  variables.push({ name: '--kds-typography-button-font-weight', value: typography.button.fontWeight });
  variables.push({ name: '--kds-typography-button-line-height', value: typography.button.lineHeight });
  variables.push({ name: '--kds-typography-button-letter-spacing', value: typography.button.letterSpacing });

  // Typography margins (h1-h6)
  variables.push({ comment: 'Typography margins' });
  const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  for (const heading of headings) {
    variables.push({ name: `--kds-typography-${heading}-margin-block-start`, value: typography[heading].marginBlockStart });
    variables.push({ name: `--kds-typography-${heading}-margin-block-end`, value: typography[heading].marginBlockEnd });
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
    const cssKey = String(key).replace(/\./g, '-');
    variables.push({ name: `--kds-spacing-${cssKey}`, value });
  }

  // Semantic spacing
  variables.push({ comment: 'Semantic spacing' });

  // Input spacing - generate all properties automatically
  for (const [key, value] of Object.entries(semanticSpacing.input)) {
    const kebabKey = key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
    variables.push({ name: `--kds-spacing-input-${kebabKey}`, value });
  }

  // Button spacing - generate all properties automatically
  for (const [key, value] of Object.entries(semanticSpacing.button)) {
    // Convert camelCase to kebab-case (e.g., paddingX -> padding-x, iconSize -> icon-size)
    const kebabKey = key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
    variables.push({ name: `--kds-spacing-button-${kebabKey}`, value });
  }

  // Sidebar spacing - generate all properties automatically
  for (const [key, value] of Object.entries(semanticSpacing.sidebar)) {
    const kebabKey = key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
    variables.push({ name: `--kds-spacing-sidebar-${kebabKey}`, value });
  }

  // Other semantic spacing
  variables.push({ name: '--kds-spacing-section', value: semanticSpacing.sectionGap });
  variables.push({ name: '--kds-spacing-form-gap', value: semanticSpacing.formGap });
  variables.push({ name: '--kds-spacing-inline-gap', value: semanticSpacing.inlineGap });

  return variables;
}

/**
 * Generate CSS custom properties for breakpoints
 */
function generateBreakpointVariables(breakpoints) {
  const variables = [];

  variables.push({ comment: 'Breakpoints' });

  for (const [key, value] of Object.entries(breakpoints)) {
    variables.push({ name: `--kds-breakpoint-${key}`, value });
  }

  return variables;
}

/**
 * Generate RESPONSIVE spacing variables (Mobile-First)
 */
function generateResponsiveSpacingVariables(responsiveSpacing) {
  if (!responsiveSpacing) return { mobile: [], tablet: [], desktop: [] };

  const mobile = [];
  const tablet = [];
  const desktop = [];

  // Container padding
  mobile.push({ name: '--kds-container-padding', value: responsiveSpacing.container.mobile, comment: 'Container' });
  tablet.push({ name: '--kds-container-padding', value: responsiveSpacing.container.tablet });
  desktop.push({ name: '--kds-container-padding', value: responsiveSpacing.container.desktop });

  // Card padding
  mobile.push({ name: '--kds-card-padding', value: responsiveSpacing.card.mobile, comment: 'Cards' });
  tablet.push({ name: '--kds-card-padding', value: responsiveSpacing.card.tablet });
  desktop.push({ name: '--kds-card-padding', value: responsiveSpacing.card.desktop });

  // Section gap
  mobile.push({ name: '--kds-section-gap', value: responsiveSpacing.sectionGap.mobile, comment: 'Sections' });
  tablet.push({ name: '--kds-section-gap', value: responsiveSpacing.sectionGap.tablet });
  desktop.push({ name: '--kds-section-gap', value: responsiveSpacing.sectionGap.desktop });

  // Element gap
  mobile.push({ name: '--kds-element-gap', value: responsiveSpacing.elementGap.mobile, comment: 'Elements' });
  tablet.push({ name: '--kds-element-gap', value: responsiveSpacing.elementGap.tablet });
  desktop.push({ name: '--kds-element-gap', value: responsiveSpacing.elementGap.desktop });

  // Section margin
  mobile.push({ name: '--kds-section-margin', value: responsiveSpacing.sectionMargin.mobile, comment: 'Margins' });
  tablet.push({ name: '--kds-section-margin', value: responsiveSpacing.sectionMargin.tablet });
  desktop.push({ name: '--kds-section-margin', value: responsiveSpacing.sectionMargin.desktop });

  return { mobile, tablet, desktop };
}

/**
 * Generate RESPONSIVE typography variables (Mobile-First)
 */
function generateResponsiveTypographyVariables(responsiveTypography) {
  if (!responsiveTypography) return { mobile: [], tablet: [], desktop: [] };

  const mobile = [];
  const tablet = [];
  const desktop = [];

  const variants = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2', 'button', 'caption'];

  for (const variant of variants) {
    if (responsiveTypography[variant]) {
      const comment = variant === 'h1' ? 'Headings' : (variant === 'body1' ? 'Body' : (variant === 'button' ? 'Components' : undefined));

      mobile.push({ name: `--kds-font-size-${variant}`, value: responsiveTypography[variant].mobile, comment });
      tablet.push({ name: `--kds-font-size-${variant}`, value: responsiveTypography[variant].tablet });
      desktop.push({ name: `--kds-font-size-${variant}`, value: responsiveTypography[variant].desktop });
    }
  }

  return { mobile, tablet, desktop };
}

/**
 * Generate RESPONSIVE base font-size variables (Mobile-First)
 * Scales --kds-font-size-xs through --kds-font-size-4xl by breakpoint
 */
function generateResponsiveBaseFontSizeVariables(responsiveBaseFontSizes) {
  const mobile = [];
  const tablet = [];
  const desktop = [];

  const sizes = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl'];

  for (const size of sizes) {
    const entry = responsiveBaseFontSizes[size];
    const comment = size === 'xs' ? 'Base font-size scale' : undefined;
    mobile.push({ name: `--kds-font-size-${size}`, value: entry.mobile, comment });
    tablet.push({ name: `--kds-font-size-${size}`, value: entry.tablet, comment });
    desktop.push({ name: `--kds-font-size-${size}`, value: entry.desktop, comment });
  }

  return { mobile, tablet, desktop };
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
    6: '0px 3px 4px -2px rgba(0,0,0,0.2), 0px 6px 7px 0px rgba(0,0,0,0.14), 0px 2px 12px 1px rgba(0,0,0,0.12)',
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
 * Generate CSS custom properties for borders
 */
function generateBorderVariables(borders) {
  const variables = [];

  variables.push({ name: '--kds-border-light', value: borders.light, comment: 'Border colors' });
  variables.push({ name: '--kds-border-medium', value: borders.medium });
  variables.push({ name: '--kds-border-dark', value: borders.dark });

  // Border widths
  variables.push({ name: '--kds-border-width-sm', value: borders.widthSm, comment: 'Border widths' });
  variables.push({ name: '--kds-border-width-md', value: borders.widthMd });

  return variables;
}

/**
 * Generate semantic alias variables
 * These are shorter aliases for commonly used color variables
 */
function generateSemanticAliases() {
  const variables = [];

  // Surface aliases
  variables.push({ name: '--kds-surface-base', value: 'var(--kds-color-background-default)', comment: 'Surface aliases' });

  // Text aliases (shorter versions of color tokens)
  variables.push({ name: '--kds-text-primary', value: 'var(--kds-color-text-primary)', comment: 'Text aliases' });
  variables.push({ name: '--kds-text-secondary', value: 'var(--kds-color-text-secondary)' });
  variables.push({ name: '--kds-text-disabled', value: 'var(--kds-color-text-disabled)' });

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
 * Format CSS variables into :root declaration
 */
function formatCSSVariables(sections, responsiveSections = []) {
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

  // Add responsive sections with media queries (Mobile-First)
  if (responsiveSections.length > 0) {
    css += '\n/* ============================================================================\n';
    css += '   RESPONSIVE TOKENS (Mobile-First)\n';
    css += '   ============================================================================ */\n\n';

    for (const { title, breakpoint, variables } of responsiveSections) {
      if (variables.length === 0) continue;

      css += `/* ${title} */\n`;
      css += `@media (min-width: ${breakpoint}) {\n`;
      css += `  :root {\n`;

      let lastHadComment = false;
      for (const variable of variables) {
        if (variable.comment && !variable.name) {
          if (!lastHadComment) {
            css += '\n';
          }
          css += `    /* ${variable.comment} */\n`;
          lastHadComment = true;
        } else if (variable.name) {
          if (variable.comment) {
            if (!lastHadComment) {
              css += '\n';
            }
            css += `    /* ${variable.comment} */\n`;
          }
          css += `    ${variable.name}: ${variable.value};\n`;
          lastHadComment = false;
        }
      }

      css += `  }\n`;
      css += `}\n\n`;
    }
  }

  // Add base typography styles using tokens
  // Higher specificity to override BeerCSS default spacing
  css += '/* ============================================================================\n';
  css += '   BASE TYPOGRAPHY STYLES\n';
  css += '   Reset default browser margins using design tokens\n';
  css += '   Higher specificity to override BeerCSS framework\n';
  css += '   ============================================================================ */\n\n';

  const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  for (const heading of headings) {
    css += `:where(${heading}) {\n`;
    css += `  margin-block-start: var(--kds-typography-${heading}-margin-block-start) !important;\n`;
    css += `  margin-block-end: var(--kds-typography-${heading}-margin-block-end) !important;\n`;
    css += `}\n\n`;
  }

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
    title: 'BORDER TOKENS',
    variables: generateBorderVariables(tokens.borders),
  },
  {
    title: 'SEMANTIC ALIASES',
    variables: generateSemanticAliases(),
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

// Generate responsive sections (Mobile-First)
const responsiveSections = [];

const respSpacing = generateResponsiveSpacingVariables(tokens.responsiveSpacing);
const respTypography = generateResponsiveTypographyVariables(tokens.responsiveTypography);
const respBaseFontSizes = generateResponsiveBaseFontSizeVariables(tokens.responsiveBaseFontSizes);

// Base mobile values go into :root
sections.push({
  title: 'RESPONSIVE SPACING (Mobile Base)',
  variables: respSpacing.mobile,
});
sections.push({
  title: 'RESPONSIVE TYPOGRAPHY (Mobile Base)',
  variables: [...respBaseFontSizes.mobile, ...respTypography.mobile],
});

// Tablet breakpoint (min-width: 600px)
responsiveSections.push({
  title: 'Tablet (600px+) - Spacing',
  breakpoint: '600px',
  variables: respSpacing.tablet,
});
responsiveSections.push({
  title: 'Tablet (600px+) - Typography',
  breakpoint: '600px',
  variables: [...respBaseFontSizes.tablet, ...respTypography.tablet],
});

// Desktop breakpoint (min-width: 840px)
responsiveSections.push({
  title: 'Desktop (840px+) - Spacing',
  breakpoint: '840px',
  variables: respSpacing.desktop,
});
responsiveSections.push({
  title: 'Desktop (840px+) - Typography',
  breakpoint: '840px',
  variables: [...respBaseFontSizes.desktop, ...respTypography.desktop],
});

const cssContent = formatCSSVariables(sections, responsiveSections);

// Write to src/tokens/css-variables.css
const outputPath = path.join(__dirname, '../src/tokens/css-variables.css');
fs.writeFileSync(outputPath, cssContent);

console.log('✅ Generated CSS variables:', outputPath);
console.log('   Variables are now in sync with TypeScript tokens!');
console.log('   Responsive variables: Mobile-First with 600px (tablet) and 840px (desktop) breakpoints');
