/**
 * Khipu Design System - BottomSheet Component
 *
 * Bottom-sheet (modal que sube desde abajo en mobile, centrado en desktop) basado
 * en Radix Dialog. Único componente de modales del DS — `KdsModal` fue unificado aquí.
 *
 * Contrato HTML (matchea CSS `.kds-bottom-sheet*` de khipu-components.css):
 *
 *   <div class="kds-bottom-sheet-scrim open">
 *     <div class="kds-bottom-sheet">
 *       <div class="kds-bottom-sheet-grabber" />                  <!-- opcional -->
 *       <button class="kds-bottom-sheet-close">X</button>          <!-- opcional -->
 *       <h2 class="kds-bottom-sheet-title">...</h2>                <!-- opcional -->
 *       <p class="kds-bottom-sheet-description">...</p>            <!-- opcional -->
 *       <div class="kds-bottom-sheet-body">children</div>
 *       <div class="kds-bottom-sheet-actions">actions</div>        <!-- opcional -->
 *     </div>
 *   </div>
 *
 * IMPORTANTE: el scrim DEBE llevar la clase `.open` SIEMPRE (Radix maneja mount/unmount).
 * Sin `.open`, el scrim queda `display: none` y no se ve.
 */

import React, { forwardRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { clsx } from '../../core/utils';

export interface KdsBottomSheetProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Controla la visibilidad. */
  open: boolean;
  /** Callback cuando se debe cerrar (close button / ESC / click fuera). */
  onClose: () => void;
  /** Título — renderiza `<h2 class="kds-bottom-sheet-title">`. */
  title?: string;
  /** Descripción opcional bajo el título (`<p class="kds-bottom-sheet-description">`). */
  description?: string;
  /** Contenido del body. */
  children: React.ReactNode;
  /** Botones de acción (footer). Renderiza dentro de `.kds-bottom-sheet-actions`. */
  actions?: React.ReactNode;
  /** Mostrar grabber (handle) visual en el top. Default: true. */
  showGrabber?: boolean;
  /** Mostrar X de cierre en el top-right. Default: false. */
  showCloseButton?: boolean;
  /** Portal container — útil para Storybook o anchors específicos. */
  container?: HTMLElement | null;
  /** Clase adicional al sheet. */
  className?: string;
}

export const KdsBottomSheet = forwardRef<HTMLDivElement, KdsBottomSheetProps>(
  (
    {
      open,
      onClose,
      title,
      description,
      children,
      actions,
      showGrabber = true,
      showCloseButton = false,
      container,
      className,
      ...props
    },
    ref,
  ) => (
    <Dialog.Root
      open={open}
      onOpenChange={(o) => {
        if (!o) onClose();
      }}
    >
      <Dialog.Portal container={container}>
        {/* El portal monta fuera del árbol de .kds-theme-root; este wrapper
            (display: contents) restaura el scope para el bundle CSS scoped. */}
        <div className="kds-theme-root" style={{ display: 'contents' }}>
          <Dialog.Overlay className="kds-bottom-sheet-scrim open">
            <Dialog.Content
              ref={ref}
              className={clsx('kds-bottom-sheet', className)}
              onPointerDownOutside={(e) => {
                // No cerrar cuando el click viene desde adentro del sheet
                const target = e.target as HTMLElement;
                if (target.closest('.kds-bottom-sheet')) e.preventDefault();
              }}
              {...props}
            >
            {showGrabber && <div className="kds-bottom-sheet-grabber" aria-hidden="true" />}
            {showCloseButton && (
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="kds-bottom-sheet-close"
                  aria-label="Cerrar"
                >
                  <i className="material-symbols-outlined">close</i>
                </button>
              </Dialog.Close>
            )}
            {title && (
              <Dialog.Title className="kds-bottom-sheet-title">{title}</Dialog.Title>
            )}
            {description && (
              <Dialog.Description className="kds-bottom-sheet-description">
                {description}
              </Dialog.Description>
            )}
            <div className="kds-bottom-sheet-body">{children}</div>
            {actions && <div className="kds-bottom-sheet-actions">{actions}</div>}
            </Dialog.Content>
          </Dialog.Overlay>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  ),
);
KdsBottomSheet.displayName = 'KdsBottomSheet';
