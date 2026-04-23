/**
 * Khipu Design System - Theme Provider
 *
 * Wraps your application with the Khipu theme for MUI components.
 * Supports dynamic overrides for merchant-specific customization at runtime.
 */

import React, { useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline, createTheme, ThemeOptions } from '@mui/material';
import { khipuTheme } from './index';

export interface KhipuThemeProviderProps {
  /** Child components */
  children: React.ReactNode;
  /** Include CSS baseline reset */
  includeCssBaseline?: boolean;
  /** Override palette.primary.main */
  primaryColor?: string;
  /** Override palette.primary.light */
  primaryColorVariant?: string;
  /** Override typography.fontFamily */
  fontFamily?: string;
  /** Override palette.text.primary */
  textColor?: string;
  /** Override palette.background.default */
  backgroundColor?: string;
  /** Override palette.background.paper */
  pageBackgroundColor?: string;
  /** Override palette.mode ('light' | 'dark') */
  mode?: 'light' | 'dark';
  /** Override button text color (primary.contrastText) */
  buttonFontColor?: string;
  /** Override palette.text.disabled */
  disabledFontColor?: string;
  /** Override palette.action.disabledBackground */
  disabledBackgroundColor?: string;
  /** Font size multiplier for responsive sizing */
  fontSizeMultiplier?: number;
  /** Additional MUI theme overrides for full flexibility */
  themeOverrides?: ThemeOptions;
}

function buildDynamicOverrides(props: KhipuThemeProviderProps): ThemeOptions {
  const overrides: ThemeOptions = {};

  // Palette overrides
  const paletteOverrides: any = {};
  let hasPalette = false;

  if (props.mode) {
    paletteOverrides.mode = props.mode;
    hasPalette = true;
  }

  if (props.primaryColor || props.primaryColorVariant || props.buttonFontColor) {
    paletteOverrides.primary = {
      ...(props.primaryColor && { main: props.primaryColor }),
      ...(props.primaryColorVariant && { light: props.primaryColorVariant }),
      ...(props.buttonFontColor && { contrastText: props.buttonFontColor }),
    };
    hasPalette = true;
  }

  if (props.textColor || props.disabledFontColor) {
    paletteOverrides.text = {
      ...(props.textColor && { primary: props.textColor }),
      ...(props.disabledFontColor && { disabled: props.disabledFontColor }),
    };
    hasPalette = true;
  }

  if (props.backgroundColor || props.pageBackgroundColor) {
    paletteOverrides.background = {
      ...(props.backgroundColor && { default: props.backgroundColor }),
      ...(props.pageBackgroundColor && { paper: props.pageBackgroundColor }),
    };
    hasPalette = true;
  }

  if (props.disabledBackgroundColor || props.disabledFontColor) {
    paletteOverrides.action = {
      ...(props.disabledBackgroundColor && { disabledBackground: props.disabledBackgroundColor }),
      ...(props.disabledFontColor && { disabled: props.disabledFontColor }),
    };
    hasPalette = true;
  }

  if (hasPalette) {
    overrides.palette = paletteOverrides;
  }

  // Typography overrides
  if (props.fontFamily) {
    const fontStack = `"${props.fontFamily}", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
    overrides.typography = { fontFamily: fontStack };
  }

  return overrides;
}

/**
 * Provides the Khipu design system theme to all child components.
 * Supports dynamic overrides for merchant-specific customization at runtime.
 *
 * @example
 * ```tsx
 * import { KhipuThemeProvider } from '@khipu/design-system';
 *
 * // Basic usage
 * function App() {
 *   return (
 *     <KhipuThemeProvider>
 *       <YourApp />
 *     </KhipuThemeProvider>
 *   );
 * }
 *
 * // With dynamic merchant overrides
 * function MerchantApp({ style }) {
 *   return (
 *     <KhipuThemeProvider
 *       primaryColor={style.primaryColor}
 *       fontFamily={style.fontFamily}
 *       mode={style.theme}
 *       backgroundColor={style.backgroundColor}
 *     >
 *       <YourApp />
 *     </KhipuThemeProvider>
 *   );
 * }
 * ```
 */
export function KhipuThemeProvider({
  children,
  includeCssBaseline = true,
  themeOverrides,
  ...dynamicProps
}: KhipuThemeProviderProps) {
  const theme = useMemo(() => {
    const dynamicOverrides = buildDynamicOverrides(dynamicProps as KhipuThemeProviderProps);
    const hasDynamicOverrides = Object.keys(dynamicOverrides).length > 0;
    const hasThemeOverrides = themeOverrides && Object.keys(themeOverrides).length > 0;

    if (!hasDynamicOverrides && !hasThemeOverrides) {
      return khipuTheme;
    }

    // Deep-merge: khipuTheme <- dynamicOverrides <- themeOverrides
    const mergedOverrides: ThemeOptions[] = [];
    if (hasDynamicOverrides) mergedOverrides.push(dynamicOverrides);
    if (hasThemeOverrides) mergedOverrides.push(themeOverrides!);

    return createTheme(khipuTheme, ...mergedOverrides);
  }, [
    dynamicProps.primaryColor,
    dynamicProps.primaryColorVariant,
    dynamicProps.fontFamily,
    dynamicProps.textColor,
    dynamicProps.backgroundColor,
    dynamicProps.pageBackgroundColor,
    dynamicProps.mode,
    dynamicProps.buttonFontColor,
    dynamicProps.disabledFontColor,
    dynamicProps.disabledBackgroundColor,
    dynamicProps.fontSizeMultiplier,
    themeOverrides,
  ]);

  return (
    <MuiThemeProvider theme={theme}>
      {includeCssBaseline && <CssBaseline />}
      {children}
    </MuiThemeProvider>
  );
}

export default KhipuThemeProvider;
