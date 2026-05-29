/**
 * Khipu Design System - CopyableTable Component
 *
 * Tabla compacta con filas que se copian individualmente al click, y un
 * botón "Copiar todos los datos" que cambia el color de todas las filas al copy.
 *
 * Contrato HTML (matchea el CSS .kds-copyable-table del DS):
 * ```html
 * <div class="kds-copyable-table" id="destination-copy-list">
 *   <div class="kds-copyable-table-row" data-copy="value-to-copy">
 *     <span class="kds-key">Banco</span>
 *     <span class="kds-value">Banco Security</span>
 *   </div>
 *   ...
 * </div>
 * <button class="kds-btn kds-btn-outlined kds-btn-block kds-copy-all-btn"
 *         data-copy-all="#destination-copy-list">
 *   <span class="kds-icon"><i class="material-symbols-outlined">content_copy</i></span>
 *   <span>Copiar todos los datos</span>
 * </button>
 * ```
 *
 * Specs:
 * - Row: flex space-between, padding 10px 8px, border-top divider, font sm, cursor pointer
 * - Row hover: bg primary-faint + icon copy aparece en `.kds-value::after`
 * - Row `.copied`: bg success-soft, `.kds-value` color success-dark, icon → check
 * - Copy-all-btn: kds-btn-outlined-block + bg primary-faint
 * - Copy-all-btn `.copied`: bg success-soft
 */

import React, { forwardRef, useState, useRef, useCallback } from 'react';
import { clsx } from '../utils';

export interface KdsCopyableTableRow {
  label: string;
  value: string;
  /** Override del valor a copiar (default: `value`). */
  copy?: string;
}

export interface KdsCopyableTableProps extends React.HTMLAttributes<HTMLDivElement> {
  rows: KdsCopyableTableRow[];
  /** Texto del botón "Copiar todo". Default: "Copiar todos los datos". */
  copyAllLabel?: string;
  /** Texto cuando se copió todo. Default: "Datos copiados". */
  copiedAllLabel?: string;
  /** Si `false`, no muestra el botón "Copiar todo". */
  showCopyAll?: boolean;
}

/** Helper: copia al portapapeles con fallback. */
async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through */
  }
  // Legacy fallback
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    return true;
  } catch {
    return false;
  } finally {
    document.body.removeChild(ta);
  }
}

/** Duración de la transición CSS de la row (debe coincidir con khipu-components.css). */
const TRANSITION_MS = 300;

export const KdsCopyableTable = forwardRef<HTMLDivElement, KdsCopyableTableProps>(
  (
    {
      rows,
      copyAllLabel = 'Copiar todos los datos',
      copiedAllLabel = 'Datos copiados',
      showCopyAll = true,
      className,
      ...props
    },
    ref,
  ) => {
    /** Timers de cleanup por row (para .copied y .settling). */
    const copiedTimers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());
    const settlingTimers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());
    const [copiedRows, setCopiedRows] = useState<Set<number>>(new Set());
    const [settlingRows, setSettlingRows] = useState<Set<number>>(new Set());
    const [allCopied, setAllCopied] = useState(false);

    const markCopied = useCallback((indexes: number[], duration = 1500) => {
      // 1) Aplicar .copied inmediatamente
      setCopiedRows((prev) => {
        const next = new Set(prev);
        indexes.forEach((i) => next.add(i));
        return next;
      });
      // Si estaba en settling, cancelarlo
      indexes.forEach((i) => {
        const st = settlingTimers.current.get(i);
        if (st) {
          clearTimeout(st);
          settlingTimers.current.delete(i);
        }
      });
      setSettlingRows((prev) => {
        const next = new Set(prev);
        indexes.forEach((i) => next.delete(i));
        return next;
      });

      // 2) Tras `duration`, quitar .copied y poner .settling
      indexes.forEach((i) => {
        const existing = copiedTimers.current.get(i);
        if (existing) clearTimeout(existing);
        const t = setTimeout(() => {
          // Remove .copied, add .settling
          setCopiedRows((prev) => {
            const next = new Set(prev);
            next.delete(i);
            return next;
          });
          setSettlingRows((prev) => {
            const next = new Set(prev);
            next.add(i);
            return next;
          });
          copiedTimers.current.delete(i);

          // 3) Tras TRANSITION_MS, quitar .settling (hover vuelve a funcionar)
          const settlingT = setTimeout(() => {
            setSettlingRows((prev) => {
              const next = new Set(prev);
              next.delete(i);
              return next;
            });
            settlingTimers.current.delete(i);
          }, TRANSITION_MS);
          settlingTimers.current.set(i, settlingT);
        }, duration);
        copiedTimers.current.set(i, t);
      });
    }, []);

    const handleRowCopy = async (row: KdsCopyableTableRow, index: number) => {
      const ok = await copyToClipboard(row.copy ?? row.value);
      if (ok) markCopied([index]);
    };

    const handleCopyAll = async () => {
      const text = rows.map((r) => `${r.label}: ${r.value}`).join('\n');
      const ok = await copyToClipboard(text);
      if (ok) {
        markCopied(rows.map((_, i) => i));
        setAllCopied(true);
        setTimeout(() => setAllCopied(false), 2000);
      }
    };

    return (
      <>
        <div ref={ref} className={clsx('kds-copyable-table', className)} {...props}>
          {rows.map((row, i) => (
            <div
              key={`${row.label}-${i}`}
              className={clsx(
                'kds-copyable-table-row',
                copiedRows.has(i) && 'copied',
                settlingRows.has(i) && 'settling',
              )}
              role="button"
              tabIndex={0}
              onClick={() => handleRowCopy(row, i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleRowCopy(row, i);
                }
              }}
              aria-label={`Copiar ${row.label}: ${row.value}`}
            >
              <span className="kds-key">{row.label}</span>
              <span className="kds-value">{row.value}</span>
            </div>
          ))}
        </div>
        {showCopyAll && (
          <button
            type="button"
            className={clsx(
              'kds-btn',
              'kds-btn-outlined',
              'kds-btn-block',
              'kds-copy-all-btn',
              allCopied && 'copied',
            )}
            onClick={handleCopyAll}
            aria-label={allCopied ? copiedAllLabel : copyAllLabel}
          >
            <span className="kds-icon">
              <i className="material-symbols-outlined">
                {allCopied ? 'check' : 'content_copy'}
              </i>
            </span>
            <span>{allCopied ? copiedAllLabel : copyAllLabel}</span>
          </button>
        )}
      </>
    );
  },
);
KdsCopyableTable.displayName = 'KdsCopyableTable';
