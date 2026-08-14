import React from 'react';
import { getContrastColor, lighten } from '../components/core/utils';
import { KDS_VERSION } from '../version';

// El alto de la body card cambia de golpe al pasar de una pantalla a otra, sin animar.
// Hubo una transición (KTUF-239) y se quitó en KTUF-314: animar el alto obliga a fijar
// `height` en píxeles sobre la card, y para saber cuándo soltarlo hay que comparar contra
// el alto natural del contenido — que un elemento con `height` fijado no expone.
// `scrollHeight` devuelve `max(contenido, clientHeight)`, así que cuando el contenido
// encoge por debajo del alto fijado la comparación da cero y el estilo queda puesto para
// siempre: espacio muerto dentro de la card, y el ResizeObserver tampoco vuelve a
// dispararse porque la card ya no cambia de tamaño. No es un umbral mal elegido, es que
// la medición necesaria no existe mientras el alto está fijado.

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
    <div
      className={`kds-theme-root ${mode}`}
      data-theme={mode}
      // Los bundles de las apps no cambian de nombre entre builds, así que desde afuera
      // no hay cómo saber qué versión del DS quedó desplegada. Acá queda a la vista.
      data-kds-version={KDS_VERSION}
      style={style}
    >
      {children}
    </div>
  );
}
