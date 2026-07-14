/** Umbral de luminancia media sobre el cual un logo se considera "claro". */
export const LIGHT_LOGO_LUMINANCE_THRESHOLD = 0.72;

const SAMPLE_SIZE = 16;
const ALPHA_THRESHOLD = 128;
const MIN_OPAQUE_RATIO = 0.02;

export type LogoBackdrop = 'light' | 'dark';

/**
 * Mide la luminancia relativa media (0..1) de los píxeles visibles (alpha ≥ 50%) de una
 * imagen, muestreada a 16×16. Devuelve `null` cuando no se puede medir: error de carga,
 * canvas tainted (el origen no envía `Access-Control-Allow-Origin`) o imagen casi
 * completamente transparente.
 *
 * Usa una imagen sonda con `crossOrigin='anonymous'` separada de la `<img>` visible, para
 * no afectar la carga del logo cuando el origen no soporta CORS.
 */
export function measureLogoLuminance(url: string): Promise<number | null> {
  return new Promise((resolve) => {
    const probe = new Image();
    probe.crossOrigin = 'anonymous';
    probe.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = SAMPLE_SIZE;
        canvas.height = SAMPLE_SIZE;
        const context = canvas.getContext('2d');
        if (!context) {
          resolve(null);
          return;
        }
        context.drawImage(probe, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
        const { data } = context.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
        let sum = 0;
        let opaquePixels = 0;
        for (let i = 0; i < data.length; i += 4) {
          if (data[i + 3] < ALPHA_THRESHOLD) continue;
          sum += (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
          opaquePixels++;
        }
        if (opaquePixels < SAMPLE_SIZE * SAMPLE_SIZE * MIN_OPAQUE_RATIO) {
          resolve(null);
          return;
        }
        resolve(sum / opaquePixels);
      } catch {
        resolve(null);
      }
    };
    probe.onerror = () => resolve(null);
    probe.src = url;
  });
}

/**
 * Traduce la luminancia medida al fondo neutro del tile: logos claros van sobre el neutro
 * oscuro; el resto (incluido `null`, no medible) sobre paper — el mismo default que el
 * preview del backoffice.
 */
export function pickLogoBackdrop(luminance: number | null): LogoBackdrop {
  return luminance != null && luminance > LIGHT_LOGO_LUMINANCE_THRESHOLD ? 'dark' : 'light';
}
