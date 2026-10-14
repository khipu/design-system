import React, { forwardRef } from 'react';
import { clsx } from '../utils';

export type KdsProgressChecklistStatus = 'pending' | 'active' | 'done' | 'error';

export interface KdsProgressChecklistItem {
  /** Stable key; falls back to the label. */
  id?: string;
  label: string;
  status: KdsProgressChecklistStatus;
}

export interface KdsProgressChecklistProps extends React.HTMLAttributes<HTMLUListElement> {
  items: KdsProgressChecklistItem[];
  /**
   * Status text read by screen readers after each label (visually hidden), for i18n.
   * @default { pending: 'pendiente', active: 'en curso', done: 'listo', error: 'con error' }
   */
  statusLabels?: Partial<Record<KdsProgressChecklistStatus, string>>;
}

const DEFAULT_STATUS_LABELS: Record<KdsProgressChecklistStatus, string> = {
  pending: 'pendiente',
  active: 'en curso',
  done: 'listo',
  error: 'con error',
};

function Mark({ status }: { status: KdsProgressChecklistStatus }) {
  return (
    <span className="kds-progress-checklist-mark" aria-hidden="true">
      {status === 'done' && <i className="material-symbols-outlined">check</i>}
      {status === 'error' && <i className="material-symbols-outlined">error</i>}
      {status === 'active' && (
        <span className="kds-dots-loader">
          <span />
          <span />
          <span />
        </span>
      )}
      {status === 'pending' && <span className="kds-progress-checklist-dot" />}
    </span>
  );
}

/**
 * Progress checklist: a list of steps that advance pending → active → done (or error),
 * e.g. the automatic validation after the business information in onboarding.
 *
 * The list is an `aria-live="polite"` region, so status changes are announced; each item
 * also carries its status as visually hidden text.
 */
export const KdsProgressChecklist = forwardRef<HTMLUListElement, KdsProgressChecklistProps>(
  ({ items, statusLabels, className, ...props }, ref) => {
    const labels = { ...DEFAULT_STATUS_LABELS, ...statusLabels };
    return (
      <ul
        ref={ref}
        className={clsx('kds-progress-checklist', className)}
        aria-live="polite"
        {...props}
      >
        {items.map((item) => (
          <li
            key={item.id ?? item.label}
            className={clsx(
              'kds-progress-checklist-item',
              `kds-progress-checklist-item--${item.status}`,
            )}
            aria-current={item.status === 'active' ? 'step' : undefined}
          >
            <Mark status={item.status} />
            <span className="kds-progress-checklist-label">{item.label}</span>
            <span className="kds-progress-checklist-status">: {labels[item.status]}</span>
          </li>
        ))}
      </ul>
    );
  },
);
KdsProgressChecklist.displayName = 'KdsProgressChecklist';
