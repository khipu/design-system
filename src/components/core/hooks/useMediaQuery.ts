import { useEffect, useState } from 'react';

/**
 * Khipu Design System - useMediaQuery
 *
 * Suscripción reactiva a una media query nativa.
 * SSR-safe: sin `window` devuelve `false` y no se suscribe.
 *
 *   const thin = useMediaQuery('(max-width: 576px)');
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
