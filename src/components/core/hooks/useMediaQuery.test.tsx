import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useMediaQuery } from './useMediaQuery';

function mockMatchMedia(initialMatches: boolean) {
  let listener: ((e: {matches: boolean}) => void) | null = null;
  const mql = {
    matches: initialMatches,
    addEventListener: (_: string, cb: (e: {matches: boolean}) => void) => {
      listener = cb;
    },
    removeEventListener: vi.fn(),
  };
  window.matchMedia = vi.fn().mockReturnValue(mql);
  return {
    fire: (matches: boolean) => act(() => listener?.({ matches })),
    mql,
  };
}

describe('useMediaQuery', () => {
  it('devuelve el estado inicial de la media query', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(max-width: 576px)'));
    expect(result.current).toBe(true);
  });

  it('reacciona a cambios de la media query', () => {
    const { fire } = mockMatchMedia(false);
    const { result } = renderHook(() => useMediaQuery('(max-width: 576px)'));
    expect(result.current).toBe(false);
    fire(true);
    expect(result.current).toBe(true);
  });

  it('desuscribe el listener al desmontar', () => {
    const { mql } = mockMatchMedia(false);
    const { unmount } = renderHook(() => useMediaQuery('(max-width: 576px)'));
    unmount();
    expect(mql.removeEventListener).toHaveBeenCalled();
  });
});
