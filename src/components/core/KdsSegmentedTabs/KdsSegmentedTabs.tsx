import { forwardRef } from 'react';
import { KdsTabs, type KdsTabsProps } from '../KdsTabs/KdsTabs';

/**
 * KdsSegmentedTabs — alias semántico de `KdsTabs`.
 *
 * Mantenido por backwards-compat con código que importa `KdsSegmentedTabs`.
 * `KdsTabs` ahora ya renderiza directamente segmented (la única variante del DS).
 */
export type KdsSegmentedTabsProps = KdsTabsProps;

export const KdsSegmentedTabs = forwardRef<HTMLDivElement, KdsSegmentedTabsProps>(
  (props, ref) => <KdsTabs ref={ref} {...props} />,
);
KdsSegmentedTabs.displayName = 'KdsSegmentedTabs';
