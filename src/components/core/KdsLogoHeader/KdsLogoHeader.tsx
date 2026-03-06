/**
 * Khipu Design System - LogoHeader Component
 *
 * A header bar component that displays the Khipu logo, a transaction code,
 * and a close button. Used at the top of payment flow screens.
 * Matches the Figma design: Pagos Instantaneos - MUI v610
 *
 * Built with composable sub-components for maximum flexibility.
 */

import React, { forwardRef } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { colors, fontFamilies, fontWeights, spacing, semanticSpacing } from '../../../tokens';

// Import Khipu logo
import khipuLogo from '../../../assets/images/khipu-logo-color.svg';

// =============================================================================
// TYPES
// =============================================================================

export interface KdsLogoHeaderProps extends BoxProps {
  /** Content - typically LogoHeader sub-components */
  children?: React.ReactNode;
}

export interface KdsLogoHeaderLogoProps extends BoxProps {
  /** Custom logo content. Defaults to Khipu text logo */
  children?: React.ReactNode;
}

export interface KdsLogoHeaderSeparatorProps extends BoxProps {
  /** Separator character. Defaults to "|" */
  children?: React.ReactNode;
}

export interface KdsLogoHeaderCodeProps extends BoxProps {
  /** Transaction or reference code to display */
  children: React.ReactNode;
}

export interface KdsLogoHeaderCloseButtonProps extends Omit<IconButtonProps, 'children'> {
  /** Callback fired when the close button is clicked */
  onClose?: () => void;
}

// =============================================================================
// DEFAULT KHIPU LOGO
// =============================================================================

const KhipuLogo = () => (
  <Box
    component="img"
    src={khipuLogo}
    alt="Khipu"
    sx={{
      height: '15px',
      maxHeight: '15px',
      width: 'auto',
      maxWidth: '50px',
      objectFit: 'contain',
    }}
  />
);

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

/**
 * Logo section of the LogoHeader.
 *
 * @example
 * ```tsx
 * <KdsLogoHeaderLogo />
 *
 * <KdsLogoHeaderLogo>
 *   <img src="/custom-logo.svg" alt="Custom Logo" />
 * </KdsLogoHeaderLogo>
 * ```
 */
export const KdsLogoHeaderLogo = forwardRef<HTMLDivElement, KdsLogoHeaderLogoProps>(
  ({ children, sx, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: '15px',
          overflow: 'hidden',
          ...sx,
        }}
        {...props}
      >
        {children || <KhipuLogo />}
      </Box>
    );
  }
);

KdsLogoHeaderLogo.displayName = 'KdsLogoHeaderLogo';

/**
 * Separator element between logo and code.
 *
 * @example
 * ```tsx
 * <KdsLogoHeaderSeparator />
 *
 * <KdsLogoHeaderSeparator>•</KdsLogoHeaderSeparator>
 * ```
 */
export const KdsLogoHeaderSeparator = forwardRef<HTMLSpanElement, KdsLogoHeaderSeparatorProps>(
  ({ children = '|', sx, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        component="span"
        sx={{
          fontFamily: fontFamilies.secondary,
          fontWeight: fontWeights.medium,
          fontSize: '10px',
          lineHeight: '14px',
          color: '#9797A5',
          ...sx,
        }}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

KdsLogoHeaderSeparator.displayName = 'KdsLogoHeaderSeparator';

/**
 * Transaction code section.
 *
 * @example
 * ```tsx
 * <KdsLogoHeaderCode>HUSK-P7ZZ-XGYG</KdsLogoHeaderCode>
 * ```
 */
export const KdsLogoHeaderCode = forwardRef<HTMLSpanElement, KdsLogoHeaderCodeProps>(
  ({ children, sx, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        component="span"
        sx={{
          fontFamily: fontFamilies.primary,
          fontWeight: fontWeights.medium,
          fontSize: '9px',
          lineHeight: '14px',
          color: '#9797A5',
          whiteSpace: 'nowrap',
          ...sx,
        }}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

KdsLogoHeaderCode.displayName = 'KdsLogoHeaderCode';

/**
 * Close button for the header.
 *
 * @example
 * ```tsx
 * <KdsLogoHeaderCloseButton onClose={() => handleClose()} />
 * ```
 */
export const KdsLogoHeaderCloseButton = forwardRef<HTMLButtonElement, KdsLogoHeaderCloseButtonProps>(
  ({ onClose, sx, ...props }, ref) => {
    return (
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <IconButton
          ref={ref}
          onClick={onClose}
          size="small"
          aria-label="close"
          sx={{
            color: colors.action.active,
            padding: 0,
            '&:hover': {
              backgroundColor: colors.action.hover,
            },
            ...sx,
          }}
          {...props}
        >
          <CloseIcon sx={{ fontSize: 24 }} />
        </IconButton>
      </Box>
    );
  }
);

KdsLogoHeaderCloseButton.displayName = 'KdsLogoHeaderCloseButton';

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * LogoHeader bar component.
 *
 * A composable header component that can be used with sub-components
 * for maximum flexibility, or with default children for quick usage.
 *
 * @example
 * ```tsx
 * // Composable usage
 * <KdsLogoHeader>
 *   <KdsLogoHeaderLogo />
 *   <KdsLogoHeaderSeparator />
 *   <KdsLogoHeaderCode>HUSK-P7ZZ-XGYG</KdsLogoHeaderCode>
 *   <KdsLogoHeaderCloseButton onClose={() => handleClose()} />
 * </KdsLogoHeader>
 *
 * // Simple usage with defaults
 * <KdsLogoHeader>
 *   <KdsLogoHeaderLogo />
 *   <KdsLogoHeaderSeparator />
 *   <KdsLogoHeaderCode>ABC-1234-XYZ</KdsLogoHeaderCode>
 * </KdsLogoHeader>
 * ```
 */
export const KdsLogoHeader = forwardRef<HTMLDivElement, KdsLogoHeaderProps>(
  ({ children, sx, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: spacing[2],
          paddingX: semanticSpacing.card.paddingX,
          paddingY: semanticSpacing.card.paddingY,
          backgroundColor: colors.background.default,
          ...sx,
        }}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

KdsLogoHeader.displayName = 'KdsLogoHeader';

export default KdsLogoHeader;
