import { useEffect, useState } from 'react';

/**
 * Options for {@link useHideOnScroll}.
 */
export interface UseHideOnScrollOptions {
  /** Minimum scroll delta (px) before toggling, to avoid jitter. Default 8. */
  threshold?: number;
  /** Scroll offset (px) at/under which the element is always visible. Default 0. */
  topOffset?: number;
}

/**
 * Result of {@link useHideOnScroll}.
 */
export interface UseHideOnScrollResult {
  /** True when the element should be hidden (user scrolled down past the threshold). */
  hidden: boolean;
}

/**
 * Hide-on-scroll-down / show-on-scroll-up for floating UI (e.g. `KdsFab`).
 *
 * Returns `{ hidden }`: starts visible, hides once the user scrolls **down** past
 * `threshold`, shows again as soon as they scroll **up**, and is always visible while
 * within `topOffset` of the top. Coalesced through `requestAnimationFrame` so it stays cheap.
 *
 * Works standalone (`window.scrollY`) and **embedded in an iframe**, where the widget does
 * not scroll internally and the parent posts the scroll offset via
 * `postMessage({ type: 'VIEWPORT_OFFSET', offsetTop })` — the same mechanism as
 * {@link useStickyInvoiceCollapse}.
 *
 * @example
 * const { hidden } = useHideOnScroll();
 * <KdsFab icon="close" aria-label="Cancelar" hidden={hidden} onClick={open} />
 */
export function useHideOnScroll(options: UseHideOnScrollOptions = {}): UseHideOnScrollResult {
  const { threshold = 8, topOffset = 0 } = options;
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let viewportOffset = 0;
    let lastY = 0;
    let ticking = false;

    // Effective scroll position: the larger of the local scroll and the iframe parent's offset.
    const currentY = () => Math.max(window.scrollY || window.pageYOffset || 0, viewportOffset);

    const apply = () => {
      ticking = false;
      const y = currentY();
      if (y <= topOffset) {
        setHidden(false);
        lastY = y;
        return;
      }
      const delta = y - lastY;
      if (Math.abs(delta) < threshold) return;
      setHidden(delta > 0);
      lastY = y;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(apply);
    };

    const onMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'VIEWPORT_OFFSET') {
        viewportOffset = Math.max(0, event.data.offsetTop || 0);
        onScroll();
      }
    };

    lastY = currentY();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('message', onMessage);
    };
  }, [threshold, topOffset]);

  return { hidden };
}
