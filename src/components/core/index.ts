/**
 * Khipu Design System - Core Components
 *
 * These are the foundational UI primitives built on Material UI.
 * All components are styled to match the Figma design: Pagos Automáticos - MUI v610.
 */

// Button
export { KdsButton, type KdsButtonProps, type KdsButtonVariant, type KdsButtonSize } from './KdsButton';

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
  KdsCardBody,
  KdsCardFooter,
  type KdsCardProps,
  type KdsCardVariant,
  type KdsCardSectionProps,
} from './KdsCard';

// Spinner
export { KdsSpinner, type KdsSpinnerProps, type KdsSpinnerSize, type KdsSpinnerColor } from './KdsSpinner';

// LinearProgress
export { KdsLinearProgress, type KdsLinearProgressProps, type KdsLinearProgressColor, type KdsLinearProgressVariant } from './KdsLinearProgress';

// Alert
export { KdsAlert, type KdsAlertProps, type KdsAlertSeverity } from './KdsAlert';

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

// RadioGroup
export {
  KdsRadioGroup,
  KdsRadio,
  type KdsRadioGroupProps,
  type KdsRadioProps,
  type KdsRadioOption,
  type KdsRadioColor,
  type KdsRadioSize,
} from './KdsRadioGroup';

// Select
export {
  KdsSelect,
  KdsMenuItem,
  type KdsSelectProps,
  type KdsMenuItemProps,
  type KdsSelectOption,
  type KdsSelectVariant,
  type KdsSelectSize,
} from './KdsSelect';

// Chip
export {
  KdsChip,
  type KdsChipProps,
  type KdsChipVariant,
  type KdsChipColor,
  type KdsChipSize,
} from './KdsChip';

// Snackbar
export {
  KdsSnackbar,
  type KdsSnackbarProps,
  type KdsSnackbarAnchorVertical,
  type KdsSnackbarAnchorHorizontal,
} from './KdsSnackbar';

// Tooltip
export {
  KdsTooltip,
  type KdsTooltipProps,
  type KdsTooltipPlacement,
} from './KdsTooltip';

// Accordion
export {
  KdsAccordion,
  KdsAccordionSummary,
  KdsAccordionDetails,
  type KdsAccordionProps,
  type KdsAccordionSummaryProps,
  type KdsAccordionDetailsProps,
  type KdsAccordionVariant,
} from './KdsAccordion';
