import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  measureLogoLuminance,
  pickLogoBackdrop,
  LIGHT_LOGO_LUMINANCE_THRESHOLD,
} from './logoLuminance';

const SAMPLE_PIXELS = 16 * 16;

/** Construye el buffer rgba de una imagen muestreada con `count` píxeles [r,g,b,a] dados. */
function pixels(rgba: [number, number, number, number], count = SAMPLE_PIXELS) {
  const data = new Uint8ClampedArray(SAMPLE_PIXELS * 4);
  for (let i = 0; i < count * 4; i += 4) {
    data[i] = rgba[0];
    data[i + 1] = rgba[1];
    data[i + 2] = rgba[2];
    data[i + 3] = rgba[3];
  }
  return data;
}

function mockCanvas(data: Uint8ClampedArray) {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
    drawImage: () => undefined,
    getImageData: () => ({ data }),
  } as unknown as CanvasRenderingContext2D);
}

class ImmediateLoadImage {
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;
  crossOrigin: string | null = null;
  set src(_value: string) {
    queueMicrotask(() => this.onload?.());
  }
}

class FailingImage {
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;
  crossOrigin: string | null = null;
  set src(_value: string) {
    queueMicrotask(() => this.onerror?.());
  }
}

describe('measureLogoLuminance', () => {
  beforeEach(() => {
    vi.stubGlobal('Image', ImmediateLoadImage);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('returns high luminance for a light logo', async () => {
    mockCanvas(pixels([250, 250, 250, 255]));
    const luminance = await measureLogoLuminance('https://x/light.png');
    expect(luminance).toBeGreaterThan(LIGHT_LOGO_LUMINANCE_THRESHOLD);
  });

  it('returns low luminance for a dark logo', async () => {
    mockCanvas(pixels([40, 40, 40, 255]));
    const luminance = await measureLogoLuminance('https://x/dark.png');
    expect(luminance).toBeLessThan(LIGHT_LOGO_LUMINANCE_THRESHOLD);
  });

  it('ignores transparent pixels when averaging', async () => {
    const data = pixels([0, 0, 0, 0]);
    // Solo 8 píxeles opacos claros: el promedio debe salir de ellos, no de la transparencia.
    data.set(pixels([255, 255, 255, 255], 8).subarray(0, 8 * 4), 0);
    mockCanvas(data);
    const luminance = await measureLogoLuminance('https://x/sparse.png');
    expect(luminance).toBeGreaterThan(LIGHT_LOGO_LUMINANCE_THRESHOLD);
  });

  it('returns null for an almost fully transparent image', async () => {
    mockCanvas(pixels([255, 255, 255, 0]));
    const luminance = await measureLogoLuminance('https://x/transparent.png');
    expect(luminance).toBeNull();
  });

  it('returns null when the image fails to load', async () => {
    vi.stubGlobal('Image', FailingImage);
    const luminance = await measureLogoLuminance('https://x/broken.png');
    expect(luminance).toBeNull();
  });

  it('returns null when the canvas is tainted by CORS', async () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
      drawImage: () => undefined,
      getImageData: () => {
        throw new DOMException('tainted canvas', 'SecurityError');
      },
    } as unknown as CanvasRenderingContext2D);
    const luminance = await measureLogoLuminance('https://x/no-cors.png');
    expect(luminance).toBeNull();
  });
});

describe('pickLogoBackdrop', () => {
  it('picks the dark neutral for light logos', () => {
    expect(pickLogoBackdrop(0.95)).toBe('dark');
  });

  it('picks paper for dark logos', () => {
    expect(pickLogoBackdrop(0.3)).toBe('light');
  });

  it('picks paper when the luminance is not measurable', () => {
    expect(pickLogoBackdrop(null)).toBe('light');
  });
});
