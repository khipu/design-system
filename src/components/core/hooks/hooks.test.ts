import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createElement as h } from 'react';
import { renderHook, act, render, fireEvent } from '@testing-library/react';
import { useCopyToClipboard } from './useCopyToClipboard';
import { useAutoHide } from './useAutoHide';
import { useCountdown } from './useCountdown';
import { useStickyInvoiceCollapse } from './useStickyInvoiceCollapse';
import { useExpandToggle } from './useExpandToggle';
import { useHideOnScroll } from './useHideOnScroll';

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

describe('useStickyInvoiceCollapse', () => {
  const setWidth = (w: number) =>
    Object.defineProperty(window, 'innerWidth', { value: w, configurable: true, writable: true });

  beforeEach(() => {
    // rAF síncrono para testear el efecto del scroll sin esperar frames
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      cb(0);
      return 0;
    });
    document.body.innerHTML = `
      <section class="kds-screen active">
        <div class="kds-invoice-sticky-wrap">
          <article class="kds-card-elevated kds-invoice-sticky">
            <div class="kds-invoice-collapsible">
              <button class="kds-expand-toggle" aria-expanded="true" aria-controls="p1"><span>Ver detalle</span></button>
              <div id="p1" class="kds-expand-panel open"></div>
            </div>
          </article>
        </div>
      </section>`;
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true, writable: true });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    document.body.innerHTML = '';
  });

  it('maps scroll to --collapse-progress and closes open panels on mobile', () => {
    setWidth(390);
    const onCollapseStart = vi.fn();
    renderHook(() => useStickyInvoiceCollapse({ onCollapseStart, collapseEnd: 20 }));

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 20, configurable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    const screen = document.querySelector('.kds-screen.active') as HTMLElement;
    const toggle = document.querySelector('.kds-expand-toggle') as HTMLElement;
    expect(screen.style.getPropertyValue('--collapse-progress')).toBe('1');
    expect(document.querySelector('.kds-invoice-sticky')!.classList.contains('is-collapsed')).toBe(true);
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(document.getElementById('p1')!.classList.contains('open')).toBe(false);
    expect(onCollapseStart).toHaveBeenCalledTimes(1);
  });

  it('does not collapse on desktop', () => {
    setWidth(1024);
    const onCollapseStart = vi.fn();
    renderHook(() => useStickyInvoiceCollapse({ onCollapseStart }));

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 50, configurable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    const screen = document.querySelector('.kds-screen.active') as HTMLElement;
    expect(screen.style.getPropertyValue('--collapse-progress')).toBe('');
    expect(onCollapseStart).not.toHaveBeenCalled();
  });

  it('collapses from iframe VIEWPORT_OFFSET messages', () => {
    setWidth(390);
    const onCollapseStart = vi.fn();
    renderHook(() => useStickyInvoiceCollapse({ onCollapseStart, collapseEnd: 20 }));

    act(() => {
      window.dispatchEvent(new MessageEvent('message', { data: { type: 'VIEWPORT_OFFSET', offsetTop: 20 } }));
    });

    const screen = document.querySelector('.kds-screen.active') as HTMLElement;
    expect(screen.style.getPropertyValue('--collapse-progress')).toBe('1');
    expect(onCollapseStart).toHaveBeenCalledTimes(1);
  });
});

describe('useExpandToggle', () => {
  it('starts closed and links toggle/panel via aria-controls/id', () => {
    const { result } = renderHook(() => useExpandToggle());
    const toggle = result.current.getToggleProps();
    const panel = result.current.getPanelProps();

    expect(result.current.open).toBe(false);
    expect(toggle.type).toBe('button');
    expect(toggle['aria-expanded']).toBe(false);
    expect(toggle['aria-controls']).toBe(panel.id);
    expect(panel.className).toBe('kds-expand-panel');
    expect(panel.hidden).toBe(true);
  });

  it('toggles open state and reflects it in the prop-getters', () => {
    const { result } = renderHook(() => useExpandToggle());

    act(() => result.current.toggle());

    expect(result.current.open).toBe(true);
    expect(result.current.getToggleProps()['aria-expanded']).toBe(true);
    expect(result.current.getPanelProps().className).toBe('kds-expand-panel open');
    expect(result.current.getPanelProps().hidden).toBe(false);
  });

  it('respects a custom base className and defaultOpen', () => {
    const { result } = renderHook(() => useExpandToggle({ defaultOpen: true }));
    expect(result.current.getPanelProps('my-panel').className).toBe('my-panel open');
  });

  it('is controlled when open is provided', () => {
    const onOpenChange = vi.fn();
    const { result } = renderHook(() => useExpandToggle({ open: false, onOpenChange }));

    act(() => result.current.toggle());

    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(result.current.open).toBe(false);
  });

  it('sizes the panel max-height from scrollHeight on open and clears it on close', () => {
    const Probe = () => {
      const detail = useExpandToggle();
      return h('div', null, [
        h('button', { key: 'b', 'data-testid': 'tgl', ...detail.getToggleProps() }, 'toggle'),
        h('div', { key: 'p', 'data-testid': 'pnl', ...detail.getPanelProps() }, 'content'),
      ]);
    };

    const { getByTestId } = render(h(Probe));
    const panel = getByTestId('pnl');

    // Closed: no inline cap — the CSS `max-height: 0` rule owns the state.
    expect(panel.style.maxHeight).toBe('');

    fireEvent.click(getByTestId('tgl'));
    // Open: inline max-height set from the panel's own scrollHeight (never a fixed cap).
    expect(panel.style.maxHeight).not.toBe('');

    fireEvent.click(getByTestId('tgl'));
    // Closed again: inline cleared so the collapse animates via CSS.
    expect(panel.style.maxHeight).toBe('');
  });
});

describe('useHideOnScroll', () => {
  beforeEach(() => {
    // Run the rAF callback synchronously so scroll handling is deterministic.
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0);
      return 0;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Drive scroll via the iframe VIEWPORT_OFFSET message (deterministic; window.scrollY stays 0).
  const scrollTo = (offsetTop: number) =>
    act(() => {
      window.dispatchEvent(
        new MessageEvent('message', { data: { type: 'VIEWPORT_OFFSET', offsetTop } })
      );
    });

  it('starts visible', () => {
    const { result } = renderHook(() => useHideOnScroll());
    expect(result.current.hidden).toBe(false);
  });

  it('hides on scroll down past the threshold and shows again on scroll up', () => {
    const { result } = renderHook(() => useHideOnScroll({ threshold: 10 }));

    scrollTo(100); // down
    expect(result.current.hidden).toBe(true);

    scrollTo(50); // up
    expect(result.current.hidden).toBe(false);
  });

  it('ignores sub-threshold jitter', () => {
    const { result } = renderHook(() => useHideOnScroll({ threshold: 40 }));

    scrollTo(20); // delta 20 < 40 → no change
    expect(result.current.hidden).toBe(false);
  });

  it('is always visible within topOffset of the top', () => {
    const { result } = renderHook(() => useHideOnScroll({ threshold: 10, topOffset: 30 }));

    scrollTo(100); // down → hidden
    expect(result.current.hidden).toBe(true);

    scrollTo(20); // within topOffset → forced visible
    expect(result.current.hidden).toBe(false);
  });
});
