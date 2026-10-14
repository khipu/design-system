import React, { forwardRef, useId } from 'react';
import { clsx } from '../../core/utils';
import { KdsButton } from '../../core/KdsButton';

export interface KdsConsentItem {
  /** Material Symbol shown before the text (decorative). */
  icon?: string;
  text: React.ReactNode;
}

export interface KdsConsentSection {
  /** Section title, e.g. "Datos solicitados", "Vigencia de la autorización", "Finalidad". */
  title: string;
  items: KdsConsentItem[];
}

export interface KdsConsentCardProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Who asks for access, e.g. "Khipu". */
  requester: string;
  /** What access is asked for, e.g. the bank name. */
  resource: string;
  /**
   * Replaces the default heading "<requester> solicita acceso a <resource>" (e.g. for
   * another language). It is still the card's accessible name.
   */
  heading?: React.ReactNode;
  subtitle?: string;
  /** Logo shown above the title (e.g. a KdsMerchantTile). */
  logo?: React.ReactNode;
  /** What is requested, for how long and what for. Texts come from the consumer. */
  sections: KdsConsentSection[];
  onAccept: () => void;
  onReject: () => void;
  /** Accept in progress: shows `loadingLabel` and disables both actions. */
  loading?: boolean;
  /** @default 'Autorizar' */
  acceptLabel?: string;
  /** @default 'Rechazar' */
  rejectLabel?: string;
  /** @default 'Autorizando' */
  loadingLabel?: string;
}

/**
 * Access consent: "<requester> solicita acceso a <resource>", the data requested, its
 * validity and purpose, and Authorize / Reject. Sections are configurable so the legal
 * texts stay with the consumer. The secure footer goes outside the card, as a sibling
 * under `.kds-screen` (inside a `.kds-card-elevated` it is hidden by design).
 */
export const KdsConsentCard = forwardRef<HTMLElement, KdsConsentCardProps>(
  (
    {
      requester,
      resource,
      heading,
      subtitle,
      logo,
      sections,
      onAccept,
      onReject,
      loading = false,
      acceptLabel = 'Autorizar',
      rejectLabel = 'Rechazar',
      loadingLabel = 'Autorizando',
      className,
      ...props
    },
    ref,
  ) => {
    const titleId = useId();
    return (
      <section
        ref={ref}
        className={clsx('kds-card-elevated', 'kds-consent-card', className)}
        aria-labelledby={titleId}
        {...props}
      >
        <div className="kds-consent-card-header">
          {logo && <div className="kds-consent-card-logo">{logo}</div>}
          <div className="kds-consent-card-title" role="heading" aria-level={2} id={titleId}>
            {heading ?? (
              <>
                <strong>{requester}</strong> solicita acceso a <strong>{resource}</strong>
              </>
            )}
          </div>
          {subtitle && <div className="kds-consent-card-subtitle">{subtitle}</div>}
        </div>
        <div className="kds-consent-card-body">
          {sections.map((section, i) => {
            const sectionId = `${titleId}-s${i}`;
            return (
              <div
                key={section.title}
                className="kds-consent-card-section"
                role="group"
                aria-labelledby={sectionId}
              >
                <div
                  className="kds-consent-card-section-title"
                  role="heading"
                  aria-level={3}
                  id={sectionId}
                >
                  {section.title}
                </div>
                <ul className="kds-consent-card-items">
                  {section.items.map((item, j) => (
                    <li key={j} className="kds-consent-card-item">
                      {item.icon && (
                        <i className="material-symbols-outlined" aria-hidden="true">
                          {item.icon}
                        </i>
                      )}
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          <div className="kds-consent-card-actions">
            <KdsButton variant="primary" fullWidth loading={loading} onClick={onAccept}>
              {loading ? loadingLabel : acceptLabel}
            </KdsButton>
            <KdsButton variant="outlined" fullWidth disabled={loading} onClick={onReject}>
              {rejectLabel}
            </KdsButton>
          </div>
        </div>
      </section>
    );
  },
);
KdsConsentCard.displayName = 'KdsConsentCard';
