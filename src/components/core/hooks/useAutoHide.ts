import { useState, useEffect, useRef } from 'react';

export function useAutoHide(durationMs: number, onHide?: () => void) {
  const [visible, setVisible] = useState(true);
  const onHideRef = useRef(onHide);
  onHideRef.current = onHide;

  useEffect(() => {
    if (durationMs <= 0) return;
    const timer = setTimeout(() => {
      setVisible(false);
      onHideRef.current?.();
    }, durationMs);
    return () => clearTimeout(timer);
  }, [durationMs]);

  return { visible, setVisible };
}
