/**
 * Khipu Design System - SectionNote Component
 *
 * An informational note with icon, used in forms and sections.
 */

import React, { forwardRef } from 'react';
import { clsx } from '../utils';

export interface KdsSectionNoteProps extends React.HTMLAttributes<HTMLParagraphElement> {
  icon?: string;
}

export const KdsSectionNote = forwardRef<HTMLParagraphElement, KdsSectionNoteProps>(
  ({ icon = 'info', children, className, ...props }, ref) => (
    <p ref={ref} className={clsx('kds-section-note', className)} {...props}>
      <i className="material-symbols-outlined">{icon}</i>
      <span>{children}</span>
    </p>
  ),
);
KdsSectionNote.displayName = 'KdsSectionNote';
