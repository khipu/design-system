import { useState, useEffect } from 'react';

interface CountdownResult {
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
  urgent: boolean;
}

function calcRemaining(deadline: string): CountdownResult {
  const diff = Math.max(0, new Date(deadline).getTime() - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    expired: diff === 0,
    urgent: diff > 0 && diff < 5 * 60 * 1000,
  };
}

export function useCountdown(deadline: string): CountdownResult {
  const [state, setState] = useState(() => calcRemaining(deadline));

  useEffect(() => {
    const tick = () => setState(calcRemaining(deadline));
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [deadline]);

  return state;
}
