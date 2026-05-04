import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { clsx } from '../utils';

export type KdsTooltipPlacement = 'top' | 'right' | 'bottom' | 'left';

export interface KdsTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  placement?: KdsTooltipPlacement;
  className?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  delayDuration?: number;
}

export function KdsTooltip({
  content,
  children,
  placement = 'top',
  className,
  open,
  defaultOpen,
  onOpenChange,
  delayDuration = 300,
}: KdsTooltipProps) {
  return (
    <Tooltip.Provider delayDuration={delayDuration}>
      <Tooltip.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <Tooltip.Trigger asChild>
          {children}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className={clsx('kds-tooltip', className)} side={placement} sideOffset={4}>
            {content}
            <Tooltip.Arrow className="kds-tooltip-arrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
