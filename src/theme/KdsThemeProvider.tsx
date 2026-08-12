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
 * Theme contract: sets `data-theme="light" | "dark"` on the wrapper — the same
 * selector the generated CSS variables and component overrides key on
 * (`[data-theme="dark"]`), so `mode="dark"` re-themes every `--kds-*` token in
 * the subtree. The mode class is kept alongside for backward compatibility
 * with CSS still keyed on `.light`/`.dark`.
 *
 * @example
 * ```tsx
 * <KdsThemeProvider mode="dark" primaryColor="#FF0000">
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
    <div className={`kds-theme-root ${mode}`} data-theme={mode} style={style}>
      {children}
    </div>
  );
}
