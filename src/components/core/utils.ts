/**
 * Khipu Design System - Core Utilities
 *
 * Shared helpers for CSS-based React components.
 */

export { clsx } from 'clsx';

/**
 * Parse a hex color string (#RGB or #RRGGBB) into [r, g, b] values (0-255).
 */
function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace('#', '');
  if (h.length === 3) {
    h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  }
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

/**
 * Convert [r, g, b] (0-255) back to a hex string.
 */
function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return `#${[r, g, b].map((v) => clamp(v).toString(16).padStart(2, '0')).join('')}`;
}

/**
 * Calculate relative luminance per WCAG 2.0.
 * Returns a value between 0 (black) and 1 (white).
 */
function relativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Return a contrast text color (white or near-black) for the given background hex.
 * Uses WCAG luminance threshold.
 */
export function getContrastColor(hex: string): string {
  const [r, g, b] = hexToRgb(hex);
  return relativeLuminance(r, g, b) > 0.179 ? '#1a1a1a' : '#ffffff';
}

/**
 * Lighten a hex color by mixing it toward white.
 * @param hex - Source color, e.g. "#8347AD"
 * @param amount - 0 = original, 1 = white. Typical: 0.85 for container colors.
 */
export function lighten(hex: string, amount: number): string {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex(
    r + (255 - r) * amount,
    g + (255 - g) * amount,
    b + (255 - b) * amount,
  );
}
