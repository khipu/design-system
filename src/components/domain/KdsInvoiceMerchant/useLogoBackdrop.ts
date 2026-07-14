import { useEffect, useState } from 'react';
import { measureLogoLuminance, pickLogoBackdrop, type LogoBackdrop } from './logoLuminance';

/**
 * Determina el fondo neutro para el logo de un comercio según su luminancia:
 * `'light'` (paper) para logos oscuros o no medibles, `'dark'` (gray-800) para logos
 * claros que se perderían sobre blanco. Parte en `'light'` y se ajusta cuando la medición
 * asíncrona termina.
 */
export function useLogoBackdrop(logoUrl?: string): LogoBackdrop {
  const [backdrop, setBackdrop] = useState<LogoBackdrop>('light');

  useEffect(() => {
    let cancelled = false;
    setBackdrop('light');
    if (!logoUrl) {
      return undefined;
    }
    measureLogoLuminance(logoUrl).then((luminance) => {
      if (!cancelled) {
        setBackdrop(pickLogoBackdrop(luminance));
      }
    });
    return () => {
      cancelled = true;
    };
  }, [logoUrl]);

  return backdrop;
}
