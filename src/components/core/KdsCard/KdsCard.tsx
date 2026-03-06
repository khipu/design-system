/**
 * Khipu Design System - Card Component
 *
 * A card component built on MUI Card with Khipu design system styling.
 * Matches the Figma design: Pagos Automáticos - MUI v610
 */

import { forwardRef } from 'react';
import MuiCard, { CardProps as MuiCardProps } from '@mui/material/Card';
import MuiCardHeader, { CardHeaderProps as MuiCardHeaderProps } from '@mui/material/CardHeader';
import MuiCardContent, { CardContentProps as MuiCardContentProps } from '@mui/material/CardContent';
import MuiCardActions, { CardActionsProps as MuiCardActionsProps } from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';

// =============================================================================
// TYPES
// =============================================================================

export type KdsCardVariant = 'elevation' | 'outlined';
export type KdsCardElevation = 0 | 1 | 2 | 3 | 4 | 6 | 8 | 12 | 16 | 24;
export type KdsCardPadding = 'none' | 'sm' | 'md' | 'lg';

/**
 * Padding values from Figma design
 * Default card padding in Figma: 10px vertical, 20px horizontal
 */
const paddingMap: Record<KdsCardPadding, string> = {
  none: '0',
  sm: '8px 16px',    // Compact
  md: '10px 20px',   // Figma default (bank selection cards)
  lg: '16px 20px',   // Spacious
};

export interface KdsCardProps extends Omit<MuiCardProps, 'variant'> {
  /** Visual variant */
  variant?: KdsCardVariant;
  /** Elevation level (only for elevation variant) */
  elevation?: KdsCardElevation;
  /** Padding size from Figma design tokens */
  padding?: KdsCardPadding;
  /** Clickable card with hover effect */
  clickable?: boolean;
  /** Click handler for clickable cards */
  onCardClick?: () => void;
}

export interface KdsCardHeaderProps extends MuiCardHeaderProps {}
export interface KdsCardContentProps extends MuiCardContentProps {}
export interface KdsCardActionsProps extends MuiCardActionsProps {}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * Card container component for grouping related content.
 *
 * Built on MUI Card with Khipu design system styling.
 *
 * @example
 * ```tsx
 * // Bank selection card
 * <KdsCard variant="outlined" clickable onCardClick={() => selectBank('estado')}>
 *   <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
 *     <img src={bankLogo} alt="Banco Estado" />
 *     <Typography variant="body1" fontWeight={600}>
 *       Banco Estado
 *     </Typography>
 *   </CardContent>
 * </KdsCard>
 *
 * // Account card
 * <KdsCard variant="outlined">
 *   <CardContent>
 *     <Typography variant="body2" fontWeight={600}>
 *       Cuenta Corriente N° ***002344
 *     </Typography>
 *     <Typography variant="body2" color="info.light">
 *       Disponible $1.000.000
 *     </Typography>
 *   </CardContent>
 * </KdsCard>
 * ```
 */
export const KdsCard = forwardRef<HTMLDivElement, KdsCardProps>(
  (
    {
      variant = 'elevation',
      elevation = 1,
      padding,
      clickable = false,
      onCardClick,
      children,
      sx,
      ...props
    },
    ref
  ) => {
    const cardContent = clickable ? (
      <CardActionArea onClick={onCardClick}>
        {children}
      </CardActionArea>
    ) : (
      children
    );

    return (
      <MuiCard
        ref={ref}
        variant={variant}
        elevation={variant === 'elevation' ? elevation : 0}
        sx={{
          borderRadius: '6px',
          ...(variant === 'outlined' && {
            border: '1px solid rgba(0, 0, 0, 0.42)',
          }),
          ...(padding && {
            padding: paddingMap[padding],
          }),
          ...sx,
        }}
        {...props}
      >
        {cardContent}
      </MuiCard>
    );
  }
);

KdsCard.displayName = 'KdsCard';

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

/**
 * Card header with title, subtitle, avatar, and action areas.
 */
export const KdsCardHeader = forwardRef<HTMLDivElement, KdsCardHeaderProps>(
  (props, ref) => {
    return <MuiCardHeader ref={ref} {...props} />;
  }
);

KdsCardHeader.displayName = 'KdsCardHeader';

/**
 * Main content area of the card.
 */
export const KdsCardContent = forwardRef<HTMLDivElement, KdsCardContentProps>(
  (props, ref) => {
    return <MuiCardContent ref={ref} {...props} />;
  }
);

KdsCardContent.displayName = 'KdsCardContent';

/**
 * Actions area at the bottom of the card, typically for buttons.
 */
export const KdsCardActions = forwardRef<HTMLDivElement, KdsCardActionsProps>(
  (props, ref) => {
    return <MuiCardActions ref={ref} {...props} />;
  }
);

KdsCardActions.displayName = 'KdsCardActions';

export default KdsCard;
