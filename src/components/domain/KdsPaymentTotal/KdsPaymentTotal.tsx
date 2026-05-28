import React, { forwardRef } from 'react';
import { clsx } from '../../core/utils';

export type KdsPaymentTotalVariant = 'default' | 'email';

/**
 * Color tone for the amount value.
 * - `brand`: default Khipu purple (current behaviour).
 * - `info`: khipu-blue (#5A5FE0) — LigoPay QR / transfer flows.
 */
export type KdsPaymentTotalTone = 'brand' | 'info';

export interface KdsPaymentTotalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Variante visual.
   * - `default`: monto destacado en color primario (QR / payment view).
   * - `email`: monto compacto en color de texto primario (email templates).
   * @default 'default'
   */
  variant?: KdsPaymentTotalVariant;
  /**
   * Tono de color del monto. Combinable con cualquier `variant`.
   * - `brand` (default): purple Khipu / texto primario según variante.
   * - `info`: khipu-blue (#5A5FE0) — pantallas QR/transfer de LigoPay.
   * @default 'brand'
   */
  tone?: KdsPaymentTotalTone;
  /**
   * Si `true`, aplica el modificador `kds-payment-total--centered`: remueve el
   * `padding-left` asimétrico (que existe por defecto para la vista QR de
   * LigoPay) y centra todo el texto interno. Combinable con `variant` y `tone`.
   * @default false
   */
  centered?: boolean;
  /**
   * Monto a mostrar.
   * - `number`: el componente formatea (entera + decimal) con `Intl.NumberFormat`.
   * - `string`: ya formateado (e.g. `"1,500.50"` o `"1500.50"`). Si contiene `.`,
   *   la parte tras el punto se renderiza como superíndice decimal.
   */
  amount: number | string;
  /**
   * Símbolo de moneda. Default `'S/'` (sol peruano) para mantener paridad con el origen
   * en paylink-ligopay. Pásalo explícito para otras monedas (`'$'`, `'CLP$'`, etc.).
   * @default 'S/'
   */
  currency?: string;
  /**
   * Cantidad de decimales. `0` o `null` ocultan el superíndice decimal.
   * Aplica sólo cuando `amount` es `number` o cuando contiene un `.`.
   * @default 2
   */
  decimals?: number | null;
  /**
   * Locale BCP-47 para `Intl.NumberFormat` (separadores miles/decimal).
   * Aplica sólo cuando `amount` es `number`.
   * @default 'es-PE'
   */
  locale?: string;
  /**
   * Etiqueta sobre el monto (e.g. `"Monto a pagar"`).
   * @default 'Monto a pagar'
   */
  label?: React.ReactNode;
  /**
   * Título principal (desktop). En la variante `default` aparece arriba; en `email`
   * se omite. Pasa `null` para ocultarlo en `default` también.
   * @default 'Escanea el QR'
   */
  title?: React.ReactNode;
  /**
   * Título alternativo para mobile en variante `default`. En desktop se oculta vía CSS.
   * Pasa `null` para omitirlo.
   * @default 'Descarga el QR'
   */
  titleMobile?: React.ReactNode;
}

/**
 * KdsPaymentTotal — bloque de "monto a pagar" usado en pantallas de pago QR y emails de cobro.
 *
 * Portado desde el taglib `<kh:paymentTotal>` de paylink-ligopay
 * (`KhipuTagLib.groovy:131-177` + `materialize-config.css → .payment-total`).
 *
 * **Variantes:**
 * - `default`: amount grande (`3rem`) en color primario Khipu — vista QR de pago.
 * - `email`: amount compacto (`1.5rem`) en color texto primario — plantillas email.
 *
 * **Layout responsive (default):**
 * - Desktop: padding-left 80px, title visible (titleMobile oculto).
 * - Mobile (≤ 1024px): centrado, sólo titleMobile visible.
 * - La variante `email` mantiene alineación izquierda en todos los breakpoints.
 *
 * **Decimal handling:**
 * - Si `amount` es `number`, se formatea con `Intl.NumberFormat(locale)`.
 * - Si `amount` es `string` con `.`, la parte tras el punto va al `<sup>`.
 * - `decimals={0}` o `null` desactivan el superíndice.
 *
 * @gsp Origen: paylink-ligopay/grails-app/taglib/com/khipu/payment/paylink/ligopay/KhipuTagLib.groovy
 * @css .kds-payment-total, .kds-payment-total--email, .kds-payment-total-title,
 *      .kds-payment-total-title-mobile, .kds-payment-label, .kds-payment-amount,
 *      .kds-payment-total-decimal-sup
 */
export const KdsPaymentTotal = forwardRef<HTMLDivElement, KdsPaymentTotalProps>(
  (
    {
      variant = 'default',
      tone = 'brand',
      centered = false,
      amount,
      currency = 'S/',
      decimals = 2,
      locale = 'es-PE',
      label = 'Monto a pagar',
      title = 'Escanea el QR',
      titleMobile = 'Descarga el QR',
      className,
      ...props
    },
    ref,
  ) => {
    const { integer, fraction } = formatAmount(amount, decimals, locale);
    const isEmail = variant === 'email';
    const isInfoTone = tone === 'info';

    return (
      <div
        ref={ref}
        className={clsx(
          'kds-payment-total',
          isEmail && 'kds-payment-total--email',
          isInfoTone && 'kds-payment-total--tone-info',
          centered && 'kds-payment-total--centered',
          className,
        )}
        {...props}
      >
        {!isEmail && title != null && <h5 className="kds-payment-total-title">{title}</h5>}
        {!isEmail && titleMobile != null && (
          <h5 className="kds-payment-total-title-mobile">{titleMobile}</h5>
        )}
        {label != null && <h6 className="kds-payment-label">{label}</h6>}
        <h5 className="kds-payment-amount">
          {currency} {integer}
          {fraction !== null && <sup className="kds-payment-total-decimal-sup">{fraction}</sup>}
        </h5>
      </div>
    );
  },
);
KdsPaymentTotal.displayName = 'KdsPaymentTotal';

// =============================================================================
// HELPERS
// =============================================================================

/**
 * Split an `amount` (number or pre-formatted string) into integer + fraction parts.
 * Returns `fraction = null` when decimals should be hidden.
 */
function formatAmount(
  amount: number | string,
  decimals: number | null,
  locale: string,
): { integer: string; fraction: string | null } {
  const showDecimals = typeof decimals === 'number' && decimals > 0;

  if (typeof amount === 'number') {
    if (showDecimals) {
      const fixed = amount.toFixed(decimals);
      const [int, frac] = fixed.split('.');
      const formattedInt = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(
        Number(int),
      );
      return { integer: formattedInt, fraction: frac ?? null };
    }
    const formattedInt = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(
      Math.trunc(amount),
    );
    return { integer: formattedInt, fraction: null };
  }

  // String input — preserve the user's formatting and only split on the `.`
  const str = amount.trim();
  const dotIdx = str.indexOf('.');
  if (dotIdx === -1 || !showDecimals) {
    return { integer: str, fraction: null };
  }
  return {
    integer: str.slice(0, dotIdx),
    fraction: str.slice(dotIdx + 1),
  };
}
