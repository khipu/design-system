import { describe, it, expect } from 'vitest';
import { clsx, getContrastColor, lighten, formatDateTime } from './utils';

describe('clsx', () => {
  it('re-exports clsx from package', () => {
    expect(clsx('a', 'b')).toBe('a b');
    expect(clsx('a', false && 'b', 'c')).toBe('a c');
  });
});

describe('getContrastColor', () => {
  it('returns white for dark colors', () => {
    expect(getContrastColor('#000000')).toBe('#ffffff');
    expect(getContrastColor('#8347AD')).toBe('#ffffff');
    expect(getContrastColor('#333333')).toBe('#ffffff');
  });

  it('returns dark for light colors', () => {
    expect(getContrastColor('#ffffff')).toBe('#1a1a1a');
    expect(getContrastColor('#F3E5FF')).toBe('#1a1a1a');
    expect(getContrastColor('#FFFF00')).toBe('#1a1a1a');
  });
});

describe('lighten', () => {
  it('lightens a hex color by the given amount', () => {
    const result = lighten('#8347AD', 0.85);
    // Should produce a very light purple
    expect(result).toMatch(/^#[0-9a-f]{6}$/i);
    // The lightened color should be lighter (higher RGB values)
    const r = parseInt(result.slice(1, 3), 16);
    expect(r).toBeGreaterThan(200);
  });

  it('handles already light colors without exceeding #ffffff', () => {
    const result = lighten('#EEEEEE', 0.5);
    expect(result).toMatch(/^#[0-9a-f]{6}$/i);
  });
});

describe('formatDateTime', () => {
  // Local-time ISO (no trailing Z/offset) → parsed in local tz, so output is deterministic across runners.
  it('formats an ISO date-time as DD-MM-YYYY HH:mm', () => {
    expect(formatDateTime('2026-08-26T23:59:00')).toBe('26-08-2026 23:59');
  });

  it('zero-pads single-digit day, month, hour and minute', () => {
    expect(formatDateTime('2026-01-05T07:08:00')).toBe('05-01-2026 07:08');
  });

  it('returns "" for empty or undefined input', () => {
    expect(formatDateTime('')).toBe('');
    expect(formatDateTime(undefined)).toBe('');
  });

  it('returns "" for an invalid date string', () => {
    expect(formatDateTime('not-a-date')).toBe('');
  });
});
