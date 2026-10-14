/**
 * Khipu Design System - BottomSheet Component
 *
 * Bottom-sheet (modal que sube desde abajo: en mobile ocupa todo el ancho pegado al borde;
 * cuando la pantalla es más ancha que el sheet (420px) flota sobre el borde inferior con
 * todas las esquinas redondeadas) basado
 * en Radix Dialog. Único componente de modales del DS — `KdsModal` fue unificado aquí.
 *
 * Contrato HTML (matchea CSS `.kds-bottom-sheet*` de khipu-components.css):
 *
 *   <div class="kds-bottom-sheet-scrim open">
 *     <div class="kds-bottom-sheet">
 *       <div class="kds-bottom-sheet-grabber" />                  <!-- opcional -->
 *       <button class="kds-bottom-sheet-close">X</button>          <!-- opcional -->
 *       <div class="kds-bottom-sheet-icon">...</div>               <!-- opcional -->
 *       <h2 class="kds-bottom-sheet-title">...</h2>                <!-- opcional -->
 *       <p class="kds-bottom-sheet-description">...</p>            <!-- opcional -->
 *       <div class="kds-bottom-sheet-body">children</div>
 *       <p class="kds-bottom-sheet-hint">...</p>                   <!-- opcional -->
 *       <div class="kds-bottom-sheet-actions">actions</div>        <!-- opcional -->
 *     </div>
 *   </div>
 *
 * Variante diálogo (`variant="dialog"`): `kds-bottom-sheet-scrim--dialog` en el scrim y
 * `kds-bottom-sheet--dialog` en el sheet; con texto centrado suma `kds-bottom-sheet--center`.
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
  /**
   * Alto del sheet. `auto` (default) se ajusta al contenido; `full` usa todo el alto máximo
   * (90dvh) y estira el body para contenido largo como documentos o textos legales.
   */
  size?: 'auto' | 'full';
  /**
   * `false` para un sheet que no se puede cerrar mientras dura un proceso (p. ej. una
   * validación automática): ignora Escape y el click fuera, y no muestra grabber ni X.
   * Lo cierra el consumidor poniendo `open={false}` al terminar. Default: true.
   */
  dismissible?: boolean;
  /**
   * `sheet` (default): bottom sheet con texto centrado. `dialog`: modal corriente con texto
   * a la izquierda — en escritorio (>520px) centrado en pantalla con las acciones lado a lado
   * (la primera acción queda a la derecha); en mobile sigue siendo bottom sheet con las
   * acciones apiladas. Pasa la acción principal primero en `actions`.
   */
  variant?: 'sheet' | 'dialog';
  /**
   * Alineación del texto en la variante `dialog`: `start` (default, modal corriente) o
   * `center` (modal de estado, p. ej. con un spinner arriba). El sheet siempre va centrado.
   */
  align?: 'start' | 'center';
  /** Ícono o loader sobre el título (p. ej. `<KdsSpinner />`), en `.kds-bottom-sheet-icon`. */
  icon?: React.ReactNode;
  /** Nota breve sobre las acciones (p. ej. "No cierres esta ventana."). */
  hint?: React.ReactNode;
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
      size = 'auto',
      dismissible = true,
      variant = 'sheet',
      align = 'start',
      icon,
      hint,
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
          <Dialog.Overlay
            className={clsx('kds-bottom-sheet-scrim', 'open', variant === 'dialog' && 'kds-bottom-sheet-scrim--dialog')}
          >
            <Dialog.Content
              ref={ref}
              className={clsx(
                'kds-bottom-sheet',
                size === 'full' && 'kds-bottom-sheet-full',
                variant === 'dialog' && 'kds-bottom-sheet--dialog',
                variant === 'dialog' && align === 'center' && 'kds-bottom-sheet--center',
                className,
              )}
              onPointerDownOutside={(e) => {
                // No cerrar cuando el click viene desde adentro del sheet
                const target = e.target as HTMLElement;
                if (!dismissible || target.closest('.kds-bottom-sheet')) e.preventDefault();
              }}
              onEscapeKeyDown={(e) => {
                if (!dismissible) e.preventDefault();
              }}
              onInteractOutside={(e) => {
                if (!dismissible) e.preventDefault();
              }}
              {...props}
            >
            {showGrabber && dismissible && (
              <div className="kds-bottom-sheet-grabber" aria-hidden="true" />
            )}
            {showCloseButton && dismissible && (
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
            {icon && <div className="kds-bottom-sheet-icon">{icon}</div>}
            {title && (
              <Dialog.Title className="kds-bottom-sheet-title">{title}</Dialog.Title>
            )}
            {description && (
              <Dialog.Description className="kds-bottom-sheet-description">
                {description}
              </Dialog.Description>
            )}
            <div className="kds-bottom-sheet-body">{children}</div>
            {hint && <p className="kds-bottom-sheet-hint">{hint}</p>}
            {actions && <div className="kds-bottom-sheet-actions">{actions}</div>}
            </Dialog.Content>
          </Dialog.Overlay>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  ),
);
KdsBottomSheet.displayName = 'KdsBottomSheet';
