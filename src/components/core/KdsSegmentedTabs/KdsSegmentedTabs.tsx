import React, { forwardRef } from 'react';
import { KdsTabs, type KdsTabsProps } from '../KdsTabs/KdsTabs';

export type KdsSegmentedTabsProps = Omit<KdsTabsProps, 'variant'>;

export const KdsSegmentedTabs = forwardRef<HTMLDivElement, KdsSegmentedTabsProps>(
  (props, ref) => <KdsTabs ref={ref} variant="segmented" {...props} />,
);
KdsSegmentedTabs.displayName = 'KdsSegmentedTabs';
