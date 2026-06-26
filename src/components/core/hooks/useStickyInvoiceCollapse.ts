import { useEffect, useRef } from 'react';

/**
 * Options for {@link useStickyInvoiceCollapse}.
 */
export interface UseStickyInvoiceCollapseOptions {
  /**
   * Called once each time the sticky header *starts* collapsing (scroll crosses the
   * threshold, progress 0 → >0). Use it to close any open expand panel from React
   * state — mirrors the vanilla DS behavior that closes `[data-expand-toggle]` panels
   * as soon as the header begins to collapse. Not fired again until the header
   * fully expands (progress returns to 0).
   */
  onCollapseStart?: () => void;
  /**
   * Scroll/collapse range end in px (header is fully collapsed at this scroll). Default 20.
   */
  collapseEnd?: number;
  /**
   * Max viewport width (px) for the collapse to apply. Desktop is always expanded. Default 768.
   */
  mobileBreakpoint?: number;
}

/**
 * React port of the DS vanilla `initStickyInvoice` (`khipu-init.js`).
 *
 * On **mobile only** (< `mobileBreakpoint`), maps scroll (0 → `collapseEnd`px) to
 * `--collapse-progress` (0 → 1) on `.kds-screen.active`; the scoped DS CSS interpolates
 * the sticky-header collapse + box-shadow. Also caches `--collapse-collapsible-h`,
 * toggles `.is-collapsed` on `.kds-invoice-sticky`, and closes any open expand panel as
 * soon as the header starts collapsing (DOM `[data-expand-toggle]` / `.kds-expand-toggle`
 * for uncontrolled consumers, plus the {@link UseStickyInvoiceCollapseOptions.onCollapseStart}
 * callback for React-controlled toggles).
 *
 * Works standalone (`window.scrollY`) and **embedded in an iframe**, where the widget does
 * not scroll internally and the parent posts the scroll offset via
 * `postMessage({ type: 'VIEWPORT_OFFSET', offsetTop })`.
 *
 * This hook only reads/writes the DOM and `window` listeners; it renders nothing and
 * returns nothing. Call it once near the root of the payment screen.
 */
export function useStickyInvoiceCollapse(options: UseStickyInvoiceCollapseOptions = {}): void {
  const { onCollapseStart, collapseEnd = 20, mobileBreakpoint = 768 } = options;

  const onCollapseStartRef = useRef(onCollapseStart);
  onCollapseStartRef.current = onCollapseStart;

  useEffect(() => {
    let viewportOffset = 0;
    let ticking = false;
    let wasCollapsing = false;

    const isMobile = () => window.innerWidth < mobileBreakpoint;

    const closeOpenPanels = (sticky: HTMLElement) => {
      // Uncontrolled (vanilla DS contract): flip aria-expanded + remove `.open` on the panel.
      const toggles = sticky.querySelectorAll<HTMLElement>(
        '[data-expand-toggle][aria-expanded="true"], .kds-expand-toggle[aria-expanded="true"]'
      );
      toggles.forEach((toggle) => {
        toggle.setAttribute('aria-expanded', 'false');
        const panelId = toggle.getAttribute('aria-controls');
        const panel = panelId
          ? document.getElementById(panelId)
          : toggle.parentElement?.querySelector<HTMLElement>('[data-expand-panel], .kds-expand-panel');
        panel?.classList.remove('open');
      });
    };

    const apply = () => {
      ticking = false;
      const screen = document.querySelector<HTMLElement>('.kds-screen.active');
      if (!screen) return;
      const sticky = screen.querySelector<HTMLElement>('.kds-invoice-sticky');
      if (!sticky || !isMobile()) {
        screen.style.removeProperty('--collapse-progress');
        screen.style.removeProperty('--collapse-collapsible-h');
        sticky?.classList.remove('is-collapsed');
        wasCollapsing = false;
        return;
      }

      const scrollY = Math.max(window.scrollY || window.pageYOffset || 0, viewportOffset);
      const progress = Math.min(Math.max(scrollY / collapseEnd, 0), 1);

      if (!screen.style.getPropertyValue('--collapse-collapsible-h')) {
        const collapsible = sticky.querySelector<HTMLElement>('.kds-invoice-collapsible');
        if (collapsible) {
          screen.style.setProperty('--collapse-collapsible-h', `${collapsible.offsetHeight}px`);
        }
      }

      screen.style.setProperty('--collapse-progress', String(progress));
      sticky.classList.toggle('is-collapsed', progress >= 1);

      // Close expand panels as soon as the header starts collapsing — fire the React
      // callback once per 0 → >0 transition, and also handle uncontrolled DOM panels.
      if (progress > 0) {
        if (!wasCollapsing) {
          wasCollapsing = true;
          closeOpenPanels(sticky);
          onCollapseStartRef.current?.();
        }
      } else {
        wasCollapsing = false;
      }
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

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('message', onMessage);
    apply();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('message', onMessage);
    };
  }, [collapseEnd, mobileBreakpoint]);
}
