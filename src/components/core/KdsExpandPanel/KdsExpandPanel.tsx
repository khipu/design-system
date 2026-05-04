import React, { forwardRef, useState } from 'react';
import { clsx } from '../utils';

export interface KdsExpandPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  defaultExpanded?: boolean;
}

export const KdsExpandPanel = forwardRef<HTMLDivElement, KdsExpandPanelProps>(
  ({ label, defaultExpanded = false, children, className, ...props }, ref) => {
    const [expanded, setExpanded] = useState(defaultExpanded);

    return (
      <div ref={ref} className={className} {...props}>
        <button
          className="kds-expand-toggle"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
        >
          <span>{label}</span>
          <i className="material-symbols-outlined">{expanded ? 'expand_less' : 'expand_more'}</i>
        </button>
        <div className={clsx('kds-expand-panel', expanded && 'open')} hidden={!expanded}>
          {children}
        </div>
      </div>
    );
  },
);
KdsExpandPanel.displayName = 'KdsExpandPanel';
