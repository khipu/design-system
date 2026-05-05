import React, { forwardRef, useEffect, useRef } from 'react';
import { clsx } from '../utils';
import { useCountdown } from '../hooks/useCountdown';

export interface KdsCountdownProps extends React.HTMLAttributes<HTMLDivElement> {
  deadline: string;
  label?: string;
  onExpire?: () => void;
}

export const KdsCountdown = forwardRef<HTMLDivElement, KdsCountdownProps>(
  ({ deadline, label, onExpire, className, ...props }, ref) => {
    const { hours, minutes, seconds, expired, urgent } = useCountdown(deadline);
    const onExpireRef = useRef(onExpire);
    onExpireRef.current = onExpire;

    useEffect(() => {
      if (expired) {
        onExpireRef.current?.();
      }
    }, [expired]);

    if (expired) {
      return null;
    }

    const pad = (n: number) => String(n).padStart(2, '0');

    return (
      <div ref={ref} className={clsx('kds-countdown', urgent && 'urgent', className)} {...props}>
        {label && <span className="kds-countdown-label">{label}</span>}
        <span className="kds-countdown-value">
          {pad(hours)}:{pad(minutes)}:{pad(seconds)}
        </span>
      </div>
    );
  },
);
KdsCountdown.displayName = 'KdsCountdown';
