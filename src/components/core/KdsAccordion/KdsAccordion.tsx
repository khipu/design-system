import React, { forwardRef } from 'react';
import { clsx } from '../utils';

export interface KdsAccordionProps extends React.DetailsHTMLAttributes<HTMLDetailsElement> {}

export const KdsAccordion = forwardRef<HTMLDetailsElement, KdsAccordionProps>(
  ({ children, className, ...props }, ref) => (
    <details ref={ref} className={clsx('kds-accordion', className)} {...props}>
      {children}
    </details>
  ),
);
KdsAccordion.displayName = 'KdsAccordion';

export interface KdsAccordionSummaryProps extends React.HTMLAttributes<HTMLElement> {}

export const KdsAccordionSummary = forwardRef<HTMLElement, KdsAccordionSummaryProps>(
  ({ children, className, ...props }, ref) => (
    <summary ref={ref} className={clsx('kds-accordion-summary', className)} {...props}>
      {children}
      <i className="material-symbols-outlined">expand_more</i>
    </summary>
  ),
);
KdsAccordionSummary.displayName = 'KdsAccordionSummary';

export interface KdsAccordionDetailsProps extends React.HTMLAttributes<HTMLDivElement> {}

export const KdsAccordionDetails = forwardRef<HTMLDivElement, KdsAccordionDetailsProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={clsx('kds-accordion-details', className)} {...props}>
      {children}
    </div>
  ),
);
KdsAccordionDetails.displayName = 'KdsAccordionDetails';
