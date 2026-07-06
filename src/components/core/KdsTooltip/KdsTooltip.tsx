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
          {/* El portal monta el tooltip en <body>, fuera del árbol de .kds-theme-root;
              este wrapper (display: contents, sin caja propia) restaura el scope para
              consumidores del bundle CSS scoped. */}
          <div className="kds-theme-root" style={{ display: 'contents' }}>
            <Tooltip.Content
              className={clsx('kds-tooltip', className)}
              side={placement}
              sideOffset={6}
              collisionPadding={8}
            >
              {content}
              <Tooltip.Arrow className="kds-tooltip-arrow" width={10} height={5} />
            </Tooltip.Content>
          </div>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
