/**
 * Khipu Design System - Theme Provider
 *
 * Wraps your application with the Khipu theme for MUI components.
 */

import React from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { khipuTheme } from './index';

export interface KhipuThemeProviderProps {
  /** Child components */
  children: React.ReactNode;
  /** Include CSS baseline reset */
  includeCssBaseline?: boolean;
}

/**
 * Provides the Khipu design system theme to all child components.
 *
 * @example
 * ```tsx
 * import { KhipuThemeProvider } from '@khipu/design-system';
 *
 * function App() {
 *   return (
 *     <KhipuThemeProvider>
 *       <YourApp />
 *     </KhipuThemeProvider>
 *   );
 * }
 * ```
 */
export function KhipuThemeProvider({
  children,
  includeCssBaseline = true,
}: KhipuThemeProviderProps) {
  return (
    <MuiThemeProvider theme={khipuTheme}>
      {includeCssBaseline && <CssBaseline />}
      {children}
    </MuiThemeProvider>
  );
}

export default KhipuThemeProvider;
