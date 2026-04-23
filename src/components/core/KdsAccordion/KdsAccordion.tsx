/**
 * Khipu Design System - Accordion Component
 *
 * An accordion component built on MUI Accordion with Khipu design system styling.
 */

import { forwardRef } from 'react';
import MuiAccordion, { AccordionProps as MuiAccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps as MuiAccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails, { AccordionDetailsProps as MuiAccordionDetailsProps } from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// =============================================================================
// TYPES
// =============================================================================

export type KdsAccordionVariant = 'elevation' | 'outlined';

export interface KdsAccordionProps extends Omit<MuiAccordionProps, 'variant'> {
  /** Visual variant */
  variant?: KdsAccordionVariant;
}

export interface KdsAccordionSummaryProps extends MuiAccordionSummaryProps {}

export interface KdsAccordionDetailsProps extends MuiAccordionDetailsProps {}

// =============================================================================
// COMPONENTS
// =============================================================================

export const KdsAccordionSummary = forwardRef<HTMLDivElement, KdsAccordionSummaryProps>(
  ({ expandIcon, ...props }, ref) => {
    return (
      <MuiAccordionSummary
        ref={ref}
        expandIcon={expandIcon || <ExpandMoreIcon />}
        {...props}
      />
    );
  }
);

KdsAccordionSummary.displayName = 'KdsAccordionSummary';

export const KdsAccordionDetails = forwardRef<HTMLDivElement, KdsAccordionDetailsProps>(
  (props, ref) => {
    return <MuiAccordionDetails ref={ref} {...props} />;
  }
);

KdsAccordionDetails.displayName = 'KdsAccordionDetails';

/**
 * Accordion component for expandable/collapsible content sections.
 *
 * @example
 * ```tsx
 * <KdsAccordion>
 *   <KdsAccordionSummary>
 *     <Typography>Detalles del pago</Typography>
 *   </KdsAccordionSummary>
 *   <KdsAccordionDetails>
 *     <Typography>Contenido expandible aqui</Typography>
 *   </KdsAccordionDetails>
 * </KdsAccordion>
 * ```
 */
export const KdsAccordion = forwardRef<HTMLDivElement, KdsAccordionProps>(
  (
    {
      variant = 'elevation',
      sx,
      ...props
    },
    ref
  ) => {
    return (
      <MuiAccordion
        ref={ref}
        variant={variant}
        sx={{
          borderRadius: '4px',
          '&:before': { display: 'none' },
          ...sx,
        }}
        {...props}
      />
    );
  }
);

KdsAccordion.displayName = 'KdsAccordion';

export default KdsAccordion;
