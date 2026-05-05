import React from 'react';
import { getContrastColor, lighten } from '../components/core/utils';

export interface KdsThemeProviderProps {
  /** Override primary color for merchant branding */
  primaryColor?: string;
  /** Light or dark mode */
  mode?: 'light' | 'dark';
  children: React.ReactNode;
}

/**
 * Lightweight theme provider using CSS custom properties.
 * Replaces MUI's KhipuThemeProvider.
 *
 * @example
 * ```tsx
 * <KdsThemeProvider primaryColor="#FF0000">
 *   <App />
 * </KdsThemeProvider>
 * ```
 */
export function KdsThemeProvider({ primaryColor, mode = 'light', children }: KdsThemeProviderProps) {
  const style: React.CSSProperties | undefined = primaryColor
    ? ({
        '--primary': primaryColor,
        '--on-primary': getContrastColor(primaryColor),
        '--primary-container': lighten(primaryColor, 0.85),
        '--on-primary-container': primaryColor,
      } as React.CSSProperties)
    : undefined;

  return (
    <div className={`kds-theme-root ${mode}`} style={style}>
      {children}
    </div>
  );
}
