import { useState, useEffect } from 'react';

export function useAutoHide(durationMs: number, onHide?: () => void) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (durationMs <= 0) return;
    const timer = setTimeout(() => {
      setVisible(false);
      onHide?.();
    }, durationMs);
    return () => clearTimeout(timer);
  }, [durationMs, onHide]);

  return { visible, setVisible };
}
