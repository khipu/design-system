<%--
  Payment layout shell — ejemplo GSP del contrato agnóstico documentado en
  docs/superpowers/specs/2026-11-19-payment-layout-shell-design.md

  - Markup plano con las clases `kds-*`, sin taglibs (igual que OnboardingFlow.example.gsp):
    ni el header (KdsInvoiceSticky) ni el footer (KdsSecureFooter) tienen taglib propio.
  - `showInvoiceSticky` / `showSecureFooter` son flags de ejemplo para esta demo — en una
    vista real simplemente se omite el bloque entero cuando la pantalla no lo necesita.
  - Nombres de modelo (amountFormatted, merchantName, operationCode) y claves i18n son una
    propuesta ilustrativa, no una API existente en `payment`.
--%>
<div class="kds-payment-stage">
  <div class="kds-payment-flow">

    <div class="kds-screen active">

      <%-- Contenido de KdsInvoiceSticky — fuera de alcance de esta spec; misma estructura
           real que usa el ejemplo React (PaymentFlowReact.stories.tsx / InvoiceContent). --%>
      <g:if test="${showInvoiceSticky}">
        <div class="kds-invoice-sticky-wrap">
          <div class="kds-card-elevated kds-invoice-sticky">
            <header class="kds-invoice-header">
              <div>
                <p class="kds-invoice-amount">${amountFormatted}</p>
                <p class="kds-invoice-code">
                  Código <span class="kds-invoice-code-value kds-invoice-code-value--lowercase">${operationCode}</span>
                </p>
              </div>
              <div class="kds-invoice-merchant" aria-hidden="true">
                <i class="material-symbols-outlined">storefront</i>
              </div>
            </header>
            <div class="kds-invoice-collapsible">
              <div class="kds-invoice-summary">
                <dl class="kds-kv">
                  <dt>Pago a</dt>
                  <dd>${merchantName}</dd>
                  <dt>Asunto</dt>
                  <dd>${subject}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </g:if>

      <div class="kds-card-elevated kds-card-elevated--action">
        <h1 class="kds-m-0"><g:message code="payment.confirm.title"/></h1>
        <p><g:message code="payment.confirm.lead"/></p>
        <%-- resto del form/contenido: componentes del DS, fuera de alcance de esta spec --%>
      </div>

      <g:if test="${showSecureFooter}">
        <div class="kds-secure-footer">
          <svg class="kds-secure-footer-lock" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="4.5" y="10.5" width="15" height="10" rx="2.25" />
            <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
          </svg>
          <g:message code="payment.secureFooter.label"/>
        </div>
      </g:if>

    </div>

  </div>
</div>
