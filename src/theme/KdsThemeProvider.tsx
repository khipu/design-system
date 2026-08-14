import React, { useEffect } from 'react';
import { getContrastColor, lighten } from '../components/core/utils';
import { KDS_VERSION } from '../version';

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

    // El alto de partida se fija de forma sincrona, antes de animar. WAAPI recien lo
    // aplica en el frame siguiente, y en esa ventana la card mide su alto natural nuevo:
    // cualquiera que la observe en ese instante —el host que replica la altura del
    // widget embebido, sin ir mas lejos— lee el valor final, lo aplica, y al frame
    // siguiente ve el inicio de la animacion y salta hacia atras. Se ve como si la
    // pantalla encogiera y volviera a crecer antes de acomodarse.
    // Devuelve una promesa que resuelve cuando la card quedó quieta, encadenamientos
    // incluidos, para que quien la llame pueda mantener su guard durante toda la
    // secuencia y no sólo durante el primer tramo.
    const animate = (card: HTMLElement, from: number, to: number): Promise<void> => {
      card.style.height = `${from}px`;
      const animation = card.animate(
        [{ height: `${from}px` }, { height: `${to}px` }],
        { duration: CARD_TRANSITION_MS, easing: 'ease-out' },
      );
      // Al terminar no se suelta el alto sin mirar: si el contenido cambió mientras
      // animaba, el observer lo ignoró (estaba en guard) y soltar el estilo haría que la
      // card salte de golpe a su alto natural. Ese salto es visible, y para quien
      // replica la altura del widget desde afuera aparece como un valor contradictorio
      // en medio de la secuencia. Se compara contra scrollHeight —que mide el contenido
      // y no el alto fijado— y si difiere se encadena en vez de soltar.
      return animation.finished
        .catch(() => undefined)
        .then(() => {
          const current = parseFloat(card.style.height) || card.offsetHeight;
          const natural = card.scrollHeight;
          if (Math.abs(natural - current) >= CARD_MIN_DELTA_PX) {
            return animate(card, current, natural);
          }
          card.style.height = '';
          return undefined;
        });
    };

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
          animate(card, from, previous).then(() => {
            animating = false;
            previous = card.offsetHeight;
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
        const from = previous;
        previous = next;
        screen?.setAttribute(SCREEN_LAST_HEIGHT_ATTRIBUTE, String(next));
        animate(card, from, next).then(() => {
          animating = false;
          // Puede diferir de `next` si el contenido cambió durante la animación y hubo
          // encadenamiento: vale el alto con el que la card quedó, no el que se pidió.
          previous = card.offsetHeight;
          screen?.setAttribute(SCREEN_LAST_HEIGHT_ATTRIBUTE, String(previous));
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
    <div
      className={`kds-theme-root ${mode}`}
      data-theme={mode}
      // Los bundles de las apps no cambian de nombre entre builds, así que desde afuera
      // no hay cómo saber qué versión del DS quedó desplegada. Acá queda a la vista.
      data-kds-version={KDS_VERSION}
      style={style}
    >
      {children}
    </div>
  );
}
