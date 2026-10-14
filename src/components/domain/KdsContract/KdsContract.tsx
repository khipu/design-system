import React, { forwardRef, useCallback, useEffect, useId, useRef, useState } from 'react';
import { clsx } from '../../core/utils';

export interface KdsContractProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Contract body, rendered inside the scrollable `.kds-contract-content`. */
  children: React.ReactNode;
  /** Accessible name of the scrollable region. @default 'Contrato' */
  contentLabel?: string;
  /** Checkbox label. @default 'Declaro que leí y acepto el contrato' */
  acceptLabel?: React.ReactNode;
  /** Shown (and used as the checkbox description) until the end is reached. */
  hint?: string;
  /** Checkbox `name`, for form submission. */
  name?: string;
  /** Controlled checked state of the acceptance checkbox. */
  accepted?: boolean;
  /** Called with the new checked state. */
  onAcceptedChange?: (accepted: boolean) => void;
  /** Called once, when the content has been scrolled to the end (or fits without scroll). */
  onReadComplete?: () => void;
}

/** A few px of tolerance: zoom and sub-pixel rounding rarely land exactly on 0. */
const END_TOLERANCE_PX = 8;

/**
 * Contract that must be read to the end before it can be accepted: the acceptance checkbox
 * stays disabled until `.kds-contract-content` is scrolled to the bottom (or right away if
 * it fits). Server-side pages get the same behaviour from `[data-kds-contract]` in the
 * BeerCSS bundle (`Khipu.initContract`).
 */
export const KdsContract = forwardRef<HTMLDivElement, KdsContractProps>(
  (
    {
      children,
      contentLabel = 'Contrato',
      acceptLabel = 'Declaro que leí y acepto el contrato',
      hint = 'Desplázate hasta el final del contrato para poder aceptarlo.',
      name,
      accepted,
      onAcceptedChange,
      onReadComplete,
      className,
      ...props
    },
    ref,
  ) => {
    const hintId = useId();
    const contentRef = useRef<HTMLDivElement>(null);
    const [read, setRead] = useState(false);
    const onReadCompleteRef = useRef(onReadComplete);
    onReadCompleteRef.current = onReadComplete;

    // clientHeight 0 means not laid out yet (hidden step or tab): wait for the
    // ResizeObserver instead of reading 0 >= -8 as "reached the end".
    const check = useCallback(() => {
      const el = contentRef.current;
      if (!el || el.clientHeight === 0) return;
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - END_TOLERANCE_PX) {
        setRead(true);
      }
    }, []);

    useEffect(() => {
      check();
      const el = contentRef.current;
      if (!el || typeof ResizeObserver === 'undefined') return undefined;
      const observer = new ResizeObserver(check);
      observer.observe(el);
      return () => observer.disconnect();
    }, [check]);

    useEffect(() => {
      if (read) onReadCompleteRef.current?.();
    }, [read]);

    return (
      <div ref={ref} className={clsx('kds-contract', read && 'kds-contract--read', className)} {...props}>
        <div
          ref={contentRef}
          className="kds-contract-content"
          role="region"
          aria-label={contentLabel}
          tabIndex={0}
          onScroll={read ? undefined : check}
        >
          {children}
        </div>
        <label className="checkbox kds-contract-accept">
          <input
            type="checkbox"
            name={name}
            checked={accepted}
            disabled={!read}
            aria-describedby={read ? undefined : hintId}
            onChange={(e) => onAcceptedChange?.(e.target.checked)}
          />
          <span>{acceptLabel}</span>
        </label>
        {!read && (
          <div className="kds-contract-hint" id={hintId}>
            {hint}
          </div>
        )}
      </div>
    );
  },
);
KdsContract.displayName = 'KdsContract';
