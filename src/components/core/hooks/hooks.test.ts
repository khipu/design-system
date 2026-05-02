import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCopyToClipboard } from './useCopyToClipboard';
import { useAutoHide } from './useAutoHide';
import { useCountdown } from './useCountdown';

describe('useCopyToClipboard', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  it('starts with copied = false', () => {
    const { result } = renderHook(() => useCopyToClipboard());
    expect(result.current.copied).toBe(false);
  });

  it('sets copied to true after copy, then resets', async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      await result.current.copy('hello');
    });
    expect(result.current.copied).toBe(true);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello');

    act(() => {
      vi.advanceTimersByTime(1200);
    });
    expect(result.current.copied).toBe(false);
    vi.useRealTimers();
  });
});

describe('useAutoHide', () => {
  it('starts visible and hides after duration', () => {
    vi.useFakeTimers();
    const onHide = vi.fn();
    const { result } = renderHook(() => useAutoHide(3000, onHide));

    expect(result.current.visible).toBe(true);

    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(result.current.visible).toBe(false);
    expect(onHide).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it('does not hide when duration is 0', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useAutoHide(0));
    act(() => {
      vi.advanceTimersByTime(10000);
    });
    expect(result.current.visible).toBe(true);
    vi.useRealTimers();
  });
});

describe('useCountdown', () => {
  it('computes remaining time from deadline', () => {
    const deadline = new Date(Date.now() + 3661000).toISOString(); // 1h 1m 1s
    const { result } = renderHook(() => useCountdown(deadline));

    expect(result.current.hours).toBe(1);
    expect(result.current.minutes).toBe(1);
    expect(result.current.seconds).toBeGreaterThanOrEqual(0);
    expect(result.current.expired).toBe(false);
    expect(result.current.urgent).toBe(false);
  });

  it('marks urgent when less than 5 minutes remain', () => {
    const deadline = new Date(Date.now() + 120000).toISOString(); // 2 min
    const { result } = renderHook(() => useCountdown(deadline));

    expect(result.current.urgent).toBe(true);
  });

  it('marks expired when deadline is in the past', () => {
    const deadline = new Date(Date.now() - 1000).toISOString();
    const { result } = renderHook(() => useCountdown(deadline));

    expect(result.current.expired).toBe(true);
    expect(result.current.hours).toBe(0);
    expect(result.current.minutes).toBe(0);
    expect(result.current.seconds).toBe(0);
  });
});
