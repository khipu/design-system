import React, { useEffect } from 'react';
import { getContrastColor, lighten } from '../components/core/utils';

const CARD_MIN_DELTA_PX = 8;
const CARD_TRANSITION_MS = 280;
const BODY_CARD_SELECTOR = '.kds-screen > .kds-card-elevated';
const CARD_MARK_ATTRIBUTE = 'data-kds-height-transition';
const SCREEN_LAST_HEIGHT_ATTRIBUTE = 'data-kds-last-card-height';

/**
 * Anima el cambio de alto de la body card al pasar de una pantalla a otra
 * (loader ↔ formulario ↔ resultado).
 *
 * No se puede resolver con CSS: un cambio de altura provocado por contenido no dispara
 * transiciones, porque el valor declarado sigue siendo `auto` antes y después. Tampoco
 * lo cubre `interpolate-size: allow-keywords`, que habilita animar hacia `auto` cuando
 * el valor declarado cambia — acá nunca cambia. Por eso se mide el alto previo y se
 * anima explícitamente entre los dos valores.
 *
 * Se apaga solo con `prefers-reduced-motion` y en navegadores sin ResizeObserver o Web
 * Animations API: sin animación el layout queda igual, sólo cambia de golpe.
 */
export function useCardHeightTransition(): void {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof ResizeObserver === 'undefined') {
      return;
    }
    if (typeof Element.prototype.animate !== 'function') {
      return;
    }
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const observers: ResizeObserver[] = [];

    const animate = (card: HTMLElement, from: number, to: number) =>
      card.animate(
        [{ height: `${from}px` }, { height: `${to}px` }],
        { duration: CARD_TRANSITION_MS, easing: 'ease-out' },
      );

    const observe = (card: HTMLElement) => {
      if (card.getAttribute(CARD_MARK_ATTRIBUTE) === 'on') {
        return;
      }
      card.setAttribute(CARD_MARK_ATTRIBUTE, 'on');

      // La memoria de altura va en el screen y no en la card: hay pantallas que
      // reemplazan la card en vez de reusarla (khenshin-web monta un <article> distinto
      // para el loader y otro para el contenido), y una card recién montada no tiene
      // altura previa desde la cual animar. El screen sí persiste entre pantallas.
      const screen = card.parentElement;
      let previous = card.offsetHeight;
      let animating = false;

      const remembered = screen?.getAttribute(SCREEN_LAST_HEIGHT_ATTRIBUTE);
      if (remembered) {
        const from = Number(remembered);
        if (Number.isFinite(from) && from > 0 && Math.abs(from - previous) >= CARD_MIN_DELTA_PX) {
          animating = true;
          animate(card, from, previous)
            .finished.then(() => {
              animating = false;
            })
            .catch(() => {
              animating = false;
            });
        }
      }
      screen?.setAttribute(SCREEN_LAST_HEIGHT_ATTRIBUTE, String(previous));

      const observer = new ResizeObserver(() => {
        // La animación cambia el alto y volvería a disparar el observer.
        if (animating) {
          return;
        }
        const next = card.offsetHeight;
        // Umbral: ignora reflows menores (fuentes que cargan, scrollbars).
        if (Math.abs(next - previous) < CARD_MIN_DELTA_PX) {
          previous = next;
          screen?.setAttribute(SCREEN_LAST_HEIGHT_ATTRIBUTE, String(next));
          return;
        }
        animating = true;
        const animation = animate(card, previous, next);
        previous = next;
        screen?.setAttribute(SCREEN_LAST_HEIGHT_ATTRIBUTE, String(next));
        animation.finished
          .then(() => {
            animating = false;
            previous = card.offsetHeight;
            screen?.setAttribute(SCREEN_LAST_HEIGHT_ATTRIBUTE, String(previous));
          })
          .catch(() => {
            animating = false;
          });
      });
      observer.observe(card);
      observers.push(observer);
    };

    document.querySelectorAll<HTMLElement>(BODY_CARD_SELECTOR).forEach(observe);

    // Las pantallas se montan y desmontan durante el flujo, asi que la card puede
    // aparecer despues del primer render.
    const tree = new MutationObserver(() => {
      document.querySelectorAll<HTMLElement>(BODY_CARD_SELECTOR).forEach(observe);
    });
    tree.observe(document.body, { childList: true, subtree: true });

    return () => {
      tree.disconnect();
      observers.forEach((observer) => observer.disconnect());
      document.querySelectorAll<HTMLElement>(BODY_CARD_SELECTOR).forEach((card) => {
        card.removeAttribute(CARD_MARK_ATTRIBUTE);
      });
    };
  }, []);
}

export interface KdsThemeProviderProps {
  /** Override primary color for merchant branding */
  primaryColor?: string;
  /** Light or dark mode */
  mode?: 'light' | 'dark';
  children: React.ReactNode;
}

/**
 * Lightweight theme provider using CSS custom properties.
 * Replaces MUI's KhipuThemeProvider.
 *
 * Theme contract: sets `data-theme="light" | "dark"` on the wrapper — the same
 * selector the generated CSS variables and component overrides key on
 * (`[data-theme="dark"]`), so `mode="dark"` re-themes every `--kds-*` token in
 * the subtree. The mode class is kept alongside for backward compatibility
 * with CSS still keyed on `.light`/`.dark`.
 *
 * @example
 * ```tsx
 * <KdsThemeProvider mode="dark" primaryColor="#FF0000">
 *   <App />
 * </KdsThemeProvider>
 * ```
 */
export function KdsThemeProvider({ primaryColor, mode = 'light', children }: KdsThemeProviderProps) {
  // Se engancha acá porque es la raíz del DS que todas las apps React ya montan; el
  // JS vanilla (khipu-init.js) sólo lo cargan las vistas server-side.
  useCardHeightTransition();

  const style: React.CSSProperties | undefined = primaryColor
    ? ({
        '--primary': primaryColor,
        '--on-primary': getContrastColor(primaryColor),
        '--primary-container': lighten(primaryColor, 0.85),
        '--on-primary-container': primaryColor,
      } as React.CSSProperties)
    : undefined;

  return (
    <div className={`kds-theme-root ${mode}`} data-theme={mode} style={style}>
      {children}
    </div>
  );
}
