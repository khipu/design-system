/**
 * Khipu Design System - Stepper Component
 *
 * Matchea exactamente el markup del taglib `mat:stepper` de payment:
 *
 *   <div class="kds-stepper">
 *     <div class="kds-step [completed|current]">
 *       <div class="kds-step-indicator"></div>   <!-- vacío: check via CSS -->
 *       <div class="kds-step-label">Label</div>
 *     </div>
 *     ...
 *   </div>
 *
 * Specs CSS-driven:
 * - La línea conectora horizontal es `.kds-stepper::before` (NO un `<div>`).
 * - El check de completed viene de `.kds-step-indicator::after { content: "check" }`.
 * - Sin `numbered` el número del step está oculto (`font-size: 0`).
 *
 * Modificadores opcionales (aditivos; sin ellos el markup es el de arriba):
 * - `.kds-stepper--numbered`: número dentro del indicador (`numbered`).
 * - `.kds-stepper--primary`: paso actual en color de marca (`color="primary"`).
 * - `.kds-stepper--current-label`: con el stepper angosto (≤ 560px de ancho propio,
 *   container query) solo se ve la etiqueta del paso actual (`currentLabelOnly`).
 * El paso actual lleva `aria-current="step"`.
 *
 * Pasos como objetos (`KdsStepperStep`, flujos configurables): estado explícito por paso
 * (también no lineal), `.skipped`, marca "Opcional" (`.kds-step-optional`) y enlace o botón
 * sobre los pasos cumplidos para volver a ellos (`.kds-step-link`). Con strings el markup es
 * el clásico de arriba.
 *
 * @gsp `mat:stepper` taglib (MaterialTagLib.groovy:817)
 */

import React, { forwardRef } from 'react';
import { clsx } from '../utils';

export type KdsStepStatus = 'pending' | 'current' | 'completed' | 'skipped';

/**
 * A step described as an object (for flows whose steps come from configuration).
 * Strings in `steps` keep the classic linear markup.
 */
export interface KdsStepperStep {
  label: string;
  /**
   * Explicit status. Overrides the one derived from `current`, so the progress can be
   * non-linear (e.g. a completed step after the current one when the flow changed).
   */
  status?: KdsStepStatus;
  /** Shows a small "Opcional" mark under the label. */
  optional?: boolean;
  /**
   * Completed or skipped step: renders a link over the step to go back to it. Only
   * same-site URLs are rendered (relative paths, or http(s) on the current origin): a
   * `javascript:` URL or another site would come from bad flow data, so the step is shown
   * without a link instead.
   */
  href?: string;
  /**
   * Completed or skipped step: called on click. With `href` it is attached to the link
   * (e.g. `event.preventDefault()` for client-side routing); without it the step renders a
   * button.
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export interface KdsStepperStatusLabels {
  /** Read by screen readers after a completed step. @default 'completado' */
  completed?: string;
  /** Read by screen readers after a skipped step. @default 'omitido' */
  skipped?: string;
  /** Visible mark of an optional step. @default 'Opcional' */
  optional?: string;
}

interface KdsStepperBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Muestra el número de paso (1-based) dentro del indicador. Los pasos completados
   * mantienen el check. Aplica `.kds-stepper--numbered`.
   */
  numbered?: boolean;
  /**
   * Color del paso actual: `info` (default, como hasta ahora) o `primary` (color de marca).
   * `primary` aplica `.kds-stepper--primary`.
   * @default 'info'
   */
  color?: 'info' | 'primary';
  /**
   * Con el stepper angosto (≤ 560px de su propio ancho, no del viewport: container query)
   * muestra solo la etiqueta del paso actual; las demás
   * quedan ocultas visualmente pero disponibles para lectores de pantalla.
   * Aplica `.kds-stepper--current-label`.
   */
  currentLabelOnly?: boolean;
  /** Texts for step statuses (i18n). */
  statusLabels?: KdsStepperStatusLabels;
}

/**
 * Steps are either all strings (classic linear stepper: `current` is required) or all
 * `KdsStepperStep` objects (configurable flows: each step may carry its own `status`, so
 * `current` is optional and only fills in the steps without one).
 */
export type KdsStepperProps = KdsStepperBaseProps &
  (
    | {
        /** Labels of a linear stepper. */
        steps: string[];
        /**
         * Índice 0-based del step actual.
         * - Steps `< current` → `.completed` (verde con check)
         * - Step `== current` → `.current` (azul info, o primary con `color="primary"`)
         * - Steps `> current` → pending (gris)
         */
        current: number;
      }
    | {
        /** Steps with explicit status, optional mark and links back to completed steps. */
        steps: KdsStepperStep[];
        /** Fills in the status of steps without an explicit `status`. */
        current?: number;
      }
  );

const DEFAULT_STATUS_LABELS: Required<KdsStepperStatusLabels> = {
  completed: 'completado',
  skipped: 'omitido',
  optional: 'Opcional',
};

function derivedStatus(index: number, current: number | undefined): KdsStepStatus {
  if (current === undefined) return 'pending';
  if (index < current) return 'completed';
  return index === current ? 'current' : 'pending';
}

/**
 * Same-site check for step links: relative paths, or http(s) URLs on the current origin.
 * Parsing against the page URL also rejects tricks such as `//other.site` or
 * `/\other.site` (both resolve to another origin) and any non-http scheme.
 */
export function isSameSiteHref(href: string): boolean {
  const base = typeof window !== 'undefined' ? window.location.href : 'https://kds.invalid/';
  try {
    const url = new URL(href.trim(), base);
    return (url.protocol === 'https:' || url.protocol === 'http:') && url.origin === new URL(base).origin;
  } catch {
    return false;
  }
}

export const KdsStepper = forwardRef<HTMLDivElement, KdsStepperProps>(
  (
    { steps, current, numbered, color = 'info', currentLabelOnly, statusLabels, className, ...props },
    ref,
  ) => {
    const labels = { ...DEFAULT_STATUS_LABELS, ...statusLabels };
    return (
      <div
        ref={ref}
        className={clsx(
          'kds-stepper',
          numbered && 'kds-stepper--numbered',
          color === 'primary' && 'kds-stepper--primary',
          currentLabelOnly && 'kds-stepper--current-label',
          className,
        )}
        {...props}
      >
        {(steps as Array<string | KdsStepperStep>).map((step, i) => {
          const indicator = <div className="kds-step-indicator">{numbered ? i + 1 : null}</div>;

          // Classic linear markup, unchanged (payment's mat:stepper renders the same).
          if (typeof step === 'string') {
            const status = derivedStatus(i, current);
            return (
              <div
                key={`${i}-${step}`}
                className={clsx('kds-step', status === 'completed' && 'completed', status === 'current' && 'current')}
                aria-current={status === 'current' ? 'step' : undefined}
              >
                {indicator}
                <div className="kds-step-label">{step}</div>
              </div>
            );
          }

          const status = step.status ?? derivedStatus(i, current);
          const done = status === 'completed' || status === 'skipped';
          const href = done && step.href !== undefined && isSameSiteHref(step.href) ? step.href : undefined;
          const interactive = done && (href !== undefined || step.onClick !== undefined);
          const statusText = done ? labels[status] : undefined;
          // The link (or button) covers the whole step and carries its name in visually
          // hidden text, so the visible label is hidden from assistive tech (read once).
          const linkContent = (
            <span className="kds-sr-only">
              {step.label}
              {step.optional && `, ${labels.optional}`}
              {statusText && `, ${statusText}`}
            </span>
          );
          return (
            <div
              key={`${i}-${step.label}`}
              className={clsx(
                'kds-step',
                status === 'completed' && 'completed',
                status === 'current' && 'current',
                status === 'skipped' && 'skipped',
                interactive && 'kds-step--interactive',
              )}
              aria-current={status === 'current' ? 'step' : undefined}
            >
              {indicator}
              <div className="kds-step-label" aria-hidden={interactive || undefined}>
                {step.label}
                {step.optional && <span className="kds-step-optional">{labels.optional}</span>}
                {!interactive && statusText && <span className="kds-step-status">, {statusText}</span>}
              </div>
              {interactive &&
                (href !== undefined ? (
                  <a className="kds-step-link" href={href} onClick={step.onClick}>
                    {linkContent}
                  </a>
                ) : (
                  <button type="button" className="kds-step-link" onClick={step.onClick}>
                    {linkContent}
                  </button>
                ))}
            </div>
          );
        })}
      </div>
    );
  },
);
KdsStepper.displayName = 'KdsStepper';
