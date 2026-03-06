/**
 * Khipu Design System - Core Components
 *
 * These are the foundational UI primitives built on Material UI.
 * All components are styled to match the Figma design: Pagos Automáticos - MUI v610.
 */

// Button
export { KdsButton, type KdsButtonProps, type KdsButtonVariant, type KdsButtonColor, type KdsButtonSize } from './KdsButton';

// TextField
export { KdsTextField, type KdsTextFieldProps, type KdsTextFieldVariant, type KdsTextFieldSize } from './KdsTextField';

// Checkbox
export { KdsCheckbox, type KdsCheckboxProps, type KdsCheckboxColor, type KdsCheckboxSize } from './KdsCheckbox';

// Modal
export { KdsModal, type KdsModalProps, type KdsModalSize } from './KdsModal';

// Card
export {
  KdsCard,
  KdsCardHeader,
  KdsCardContent,
  KdsCardActions,
  type KdsCardProps,
  type KdsCardHeaderProps,
  type KdsCardContentProps,
  type KdsCardActionsProps,
  type KdsCardVariant,
  type KdsCardElevation,
} from './KdsCard';

// Spinner
export { KdsSpinner, type KdsSpinnerProps, type KdsSpinnerSize, type KdsSpinnerColor } from './KdsSpinner';

// LinearProgress
export { KdsLinearProgress, type KdsLinearProgressProps, type KdsLinearProgressColor, type KdsLinearProgressVariant } from './KdsLinearProgress';

// Alert
export { KdsAlert, type KdsAlertProps, type KdsAlertSeverity, type KdsAlertVariant } from './KdsAlert';

// Typography
export { KdsTypography, type KdsTypographyProps, type KdsTypographyVariant } from './KdsTypography';

// Tabs
export {
  KdsTabs,
  KdsTab,
  KdsTabPanel,
  type KdsTabsProps,
  type KdsTabProps,
  type KdsTabPanelProps,
  type KdsTabsColor,
  type KdsTabsVariant,
} from './KdsTabs';

// LogoHeader
export {
  KdsLogoHeader,
  KdsLogoHeaderLogo,
  KdsLogoHeaderSeparator,
  KdsLogoHeaderCode,
  KdsLogoHeaderCloseButton,
  type KdsLogoHeaderProps,
  type KdsLogoHeaderLogoProps,
  type KdsLogoHeaderSeparatorProps,
  type KdsLogoHeaderCodeProps,
  type KdsLogoHeaderCloseButtonProps,
} from './KdsLogoHeader';
