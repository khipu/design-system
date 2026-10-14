import React, { forwardRef, useEffect, useId, useRef } from 'react';
import { clsx } from '../../core/utils';
import { KdsButton } from '../../core/KdsButton';

export interface KdsFeedbackCardProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title' | 'onSubmit'> {
  /** Question shown as the card title (also its accessible name). */
  title: string;
  description?: string;
  /** Material Symbol in the icon tile. @default 'auto_awesome' */
  icon?: string;
  /** The answer control (e.g. a KdsSelect). Hidden once submitted. */
  children?: React.ReactNode;
  /** Enables the submit button (e.g. once an option is chosen). */
  canSubmit: boolean;
  onSubmit: () => void;
  /** @default 'Enviar' */
  submitLabel?: string;
  /** Shows the thank-you state instead of the question. */
  submitted?: boolean;
  /** @default '¡Gracias por contarnos!' */
  thanksTitle?: string;
  /** @default 'Tu respuesta nos ayuda a llegar a más negocios como el tuyo.' */
  thanksDescription?: string;
}

/**
 * Optional feedback card (e.g. "¿Cómo nos conociste?" on a success screen): icon, question,
 * an answer control and a submit button; after submitting it turns into a thank-you note in
 * the same `aria-live` region, so the change is announced. It never blocks the page.
 */
export const KdsFeedbackCard = forwardRef<HTMLElement, KdsFeedbackCardProps>(
  (
    {
      title,
      description,
      icon = 'auto_awesome',
      children,
      canSubmit,
      onSubmit,
      submitLabel = 'Enviar',
      submitted = false,
      thanksTitle = '¡Gracias por contarnos!',
      thanksDescription = 'Tu respuesta nos ayuda a llegar a más negocios como el tuyo.',
      className,
      ...props
    },
    ref,
  ) => {
    const titleId = useId();
    const titleRef = useRef<HTMLDivElement>(null);
    const wasSubmitted = useRef(submitted);

    // The submit button that had focus unmounts on submit; move focus to the thank-you
    // title so keyboard and screen-reader users are not dropped to <body>. Only on the
    // transition, never when the card mounts already submitted.
    useEffect(() => {
      if (submitted && !wasSubmitted.current) titleRef.current?.focus();
      wasSubmitted.current = submitted;
    }, [submitted]);

    return (
      <section
        ref={ref}
        className={clsx('kds-feedback-card', submitted && 'kds-feedback-card--submitted', className)}
        aria-labelledby={titleId}
        aria-live="polite"
        {...props}
      >
        <span className="kds-feedback-card-icon" aria-hidden="true">
          <i className="material-symbols-outlined">{submitted ? 'check' : icon}</i>
        </span>
        <div className="kds-feedback-card-body">
          <div className="kds-feedback-card-text">
            <div
              ref={titleRef}
              className="kds-feedback-card-title"
              id={titleId}
              tabIndex={submitted ? -1 : undefined}
            >
              {submitted ? thanksTitle : title}
            </div>
            {(submitted ? thanksDescription : description) && (
              <div className="kds-feedback-card-description">
                {submitted ? thanksDescription : description}
              </div>
            )}
          </div>
          {!submitted && (
            <>
              {children}
              <KdsButton variant="outlined" disabled={!canSubmit} onClick={onSubmit}>
                {submitLabel}
              </KdsButton>
            </>
          )}
        </div>
      </section>
    );
  },
);
KdsFeedbackCard.displayName = 'KdsFeedbackCard';
