import { useCallback, useId, useLayoutEffect, useRef, useState } from 'react';

/**
 * Options for {@link useExpandToggle}.
 */
export interface UseExpandToggleOptions {
  /** Initial open state when uncontrolled. Default `false`. */
  defaultOpen?: boolean;
  /** Controlled open state. When provided, the hook is controlled and `onOpenChange` must drive updates. */
  open?: boolean;
  /** Called whenever the open state should change (toggle click). */
  onOpenChange?: (open: boolean) => void;
  /** Override the generated panel id (`aria-controls` / panel `id`). Defaults to a stable `useId()`. */
  id?: string;
}

/** Props to spread on the `.kds-expand-toggle` `<button>`. */
export interface ExpandToggleProps {
  type: 'button';
  'aria-expanded': boolean;
  'aria-controls': string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

/** Props to spread on the `.kds-expand-panel` `<div>`. */
export interface ExpandPanelProps {
  id: string;
  className: string;
  hidden: boolean;
  /**
   * Ref the hook uses to drive the panel's `max-height` off its own `scrollHeight`, so the
   * expand animation fits any content length instead of clipping against a fixed CSS cap.
   */
  ref: (node: HTMLDivElement | null) => void;
}

/**
 * Result of {@link useExpandToggle}.
 */
export interface UseExpandToggleResult {
  /** Current open state. */
  open: boolean;
  /** Imperatively set the open state (e.g. close on header collapse). */
  setOpen: (open: boolean) => void;
  /** Toggle the open state. */
  toggle: () => void;
  /** Prop-getter for the `.kds-expand-toggle` button — wires `aria-expanded`, `aria-controls`, `onClick`. */
  getToggleProps: () => ExpandToggleProps;
  /**
   * Prop-getter for the `.kds-expand-panel` div — wires `id`, the `open` class and the
   * `hidden` attribute. Pass the base class (defaults to `kds-expand-panel`).
   */
  getPanelProps: (baseClassName?: string) => ExpandPanelProps;
}

/**
 * Accessible disclosure (expand/collapse) wiring for the DS `.kds-expand-toggle` +
 * `.kds-expand-panel` pattern — the React equivalent of the vanilla `initExpandToggle`
 * (`khipu-init.js`) for consumers that don't load the global DS JS.
 *
 * It links button and panel via a stable `aria-controls`/`id` pair (`useId`), reflects the
 * open state through `aria-expanded` (which drives the caret rotation in CSS) and toggles the
 * `open` class on the panel, sizing its `max-height` to the content's `scrollHeight` so the
 * animation never clips. The `hidden` attribute is also set when closed — the DS provides a
 * `.kds-expand-panel[hidden]` rule that keeps the panel `display:block` so the collapse still animates.
 *
 * Supports controlled (`open` + `onOpenChange`) and uncontrolled (`defaultOpen`) usage. Combine
 * with `useStickyInvoiceCollapse({ onCollapseStart: () => setOpen(false) })` to close on scroll.
 *
 * @example
 * const detail = useExpandToggle();
 * <button className="kds-expand-toggle" {...detail.getToggleProps()}>…</button>
 * <div {...detail.getPanelProps('kds-expand-panel')}>…</div>
 */
export function useExpandToggle(options: UseExpandToggleOptions = {}): UseExpandToggleResult {
  const { defaultOpen = false, open: controlledOpen, onOpenChange, id } = options;
  const generatedId = useId();
  const panelId = id ?? `kds-expand-${generatedId}`;

  const isControlled = controlledOpen !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const panelRef = useRef<HTMLDivElement | null>(null);
  const setPanelRef = useCallback((node: HTMLDivElement | null) => {
    panelRef.current = node;
  }, []);

  // Size the panel to its own content: a fixed CSS `max-height` cap truncates the last rows
  // when the content grows (long descriptions, extra detail rows). Reading `scrollHeight` on
  // open keeps the `max-height` transition exact and clip-free; clearing it lets the CSS
  // collapse rule (`max-height: 0`) drive the close animation.
  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    panel.style.maxHeight = open ? `${panel.scrollHeight}px` : '';
  }, [open]);

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(next);
      }
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const toggle = useCallback(() => setOpen(!open), [open, setOpen]);

  const getToggleProps = useCallback(
    (): ExpandToggleProps => ({
      type: 'button',
      'aria-expanded': open,
      'aria-controls': panelId,
      onClick: () => toggle(),
    }),
    [open, panelId, toggle],
  );

  const getPanelProps = useCallback(
    (baseClassName = 'kds-expand-panel'): ExpandPanelProps => ({
      id: panelId,
      className: open ? `${baseClassName} open` : baseClassName,
      hidden: !open,
      ref: setPanelRef,
    }),
    [open, panelId, setPanelRef],
  );

  return { open, setOpen, toggle, getToggleProps, getPanelProps };
}
