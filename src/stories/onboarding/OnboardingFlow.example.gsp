<%--
  Onboarding de cuenta de cobro (persona jurídica, Chile) en payment / GSP.

  - Layout: layouts/material.gsp (KdsNavbar + KdsSidebar + KdsFooter). Cada pantalla es una
    vista de MerchantController; cada form envía a una acción *Submit que valida, guarda en la
    sesión/dominio y redirige a la siguiente pantalla.
  - El bundle khipu-beercss.js (que payment ya carga) activa los contratos [data-kds-contract]
    (Khipu.initContract) y expone Khipu.showSnackbar.
  - Vistas que ya existen en payment: startOnboarding, selectCountry, selectCurrency,
    selectFlowType (aquí con el markup nuevo del DS). El resto son nuevas: los nombres de
    acciones y modelos son una propuesta.
  - Acciones transversales (las usan también los taglibs del DS, p. ej. kds:onboardingState):
    identity (repetir la verificación de identidad: el controller redirige a selectBank),
    support, drafts ("Tus altas en curso"), start (nueva alta), account y cancel (POST).
    Una sola acción por propósito: no enlazar selectBank directo para "repetir verificación".
  - Borrador (KTUF-496): desde selectFlowType cada pantalla muestra el aviso de guardado y
    "Cancelar esta alta" (_draftFooter.gsp); la confirmación (_cancelDraftSheet.gsp) se
    renderiza una vez por vista, fuera del formulario.
  - Claves i18n: las de merchant.onboarding.start.*, merchant.progress.*, merchant.selectCurrency.title,
    merchant.onboarding.selectFlow.*, merchant.signContract.check.label, merchant.discoverySource.*,
    merchant.name.label, merchant.bankaccount.developer.name.message, default.back.link,
    default.button.continue.label y default.button.send.label ya existen.
    Todas las demás hay que crearlas: el resto de merchant.onboarding.* (step, legal.title,
    banking, bank, bankRedirect, account, plan, businessInfo, industry, collectionModel,
    monthlySales, service, company, signer, contact, verified, riskEvaluation, validated,
    validationError, contract, done), merchant.signContract.title, merchant.signContract.scroll.hint,
    consent.*, plan.recommended, validation.status.*, feedback.thanks.*, default.optional.label y
    default.loading.label; y las compartidas con "On boarding/Estados del alta" y los taglibs:
    onboarding.state.*, onboarding.drafts.*, onboarding.draft.new, onboarding.draft.autosave,
    onboarding.cancel.* (open, title, description, confirm),
    onboarding.identity.retry, default.contactSupport y default.understood.
  - Textos: varias claves existentes (p. ej. merchant.onboarding.selectFlow.*) tienen hoy un
    texto distinto al del prototipo que muestra la historia; hay que actualizarlas.
--%>


<%-- =====================================================================================
     _onboardingHeader.gsp — título, stepper y subtítulo de cada pantalla
     model: title, steps (claves i18n), current (índice desde 0), subtitle, lead
     ===================================================================================== --%>
<h1 class="kds-m-0">${title}</h1>
<g:if test="${steps}">
  <div class="kds-stepper kds-stepper--numbered kds-stepper--primary kds-stepper--current-label">
    <g:each in="${steps}" var="step" status="i">
      <g:if test="${i == current}">
        <div class="kds-step current" aria-current="step">
      </g:if>
      <g:else>
        <div class="kds-step${i < current ? ' completed' : ''}">
      </g:else>
        <div class="kds-step-indicator">${i + 1}</div>
        <div class="kds-step-label"><g:message code="${step}"/></div>
      </div>
    </g:each>
  </div>
</g:if>
<g:if test="${subtitle}">
  <h2 class="kds-m-0 kds-color-primary kds-fw-medium">${subtitle}</h2>
</g:if>
<g:if test="${lead}">
  <%-- <div>, no <p>: BeerCSS suma 1rem sobre un <p> que sigue a otro elemento --%>
  <div class="kds-text-body">${lead}</div>
</g:if>


<%-- =====================================================================================
     _onboardingActions.gsp — Volver (link a la pantalla anterior) + Continuar (submit)
     model: backAction (opcional), continueDisabled (opcional), draft (true desde que existe el
            borrador: agrega el pie con el aviso de guardado y "Cancelar esta alta")
     ===================================================================================== --%>
<div class="kds-flex kds-gap-1">
  <g:if test="${backAction}">
    <mat:button type="outlined" href="${createLink(action: backAction)}"
                textCode="default.back.link" cssClass="kds-flex-1"/>
  </g:if>
  <mat:button type="primary" htmlType="submit" textCode="default.button.continue.label"
              cssClass="kds-flex-1" disabled="${continueDisabled ? 'true' : 'false'}"/>
</div>
<g:if test="${draft}">
  <g:render template="/merchant/draftFooter"/>
</g:if>


<%-- =====================================================================================
     _draftFooter.gsp — KTUF-496. Mientras existe el borrador: aviso de guardado automático
     (el avance se guarda en cada envío de pantalla; no hay botón "Guardar", REA-01) y
     "Cancelar esta alta" siempre visible (NAV-17, VEN-09), que abre la confirmación.
     Va DENTRO del formulario de la pantalla: solo es un botón type="button" que abre el
     diálogo; el envío de la cancelación vive en _cancelDraftSheet.gsp, fuera del formulario.
     ===================================================================================== --%>
<div class="kds-flex kds-flex-col kds-gap-1">
  <div class="kds-text-body-small kds-text-secondary kds-text-center">
    <g:message code="onboarding.draft.autosave"/>
  </div>
  <kds:button type="error-text" size="sm" cssClass="kds-btn-block" data-open-sheet="cancel-draft-sheet">
    <g:message code="onboarding.cancel.open"/>
  </kds:button>
</div>


<%-- =====================================================================================
     _cancelDraftSheet.gsp — KTUF-496. Confirmación de "Cancelar esta alta". Se renderiza UNA
     vez en cada vista que muestra _draftFooter.gsp y FUERA del formulario de la pantalla (no
     se anidan forms): abajo, cada vista del borrador lo incluye justo después de su </g:form>.
     Sin él, el botón data-open-sheet="cancel-draft-sheet" no abre nada (y no da error). El bundle lo abre y cierra
     (Khipu.initSheets: data-open-sheet / data-close-sheet, Escape, clic fuera, foco).
     Cancelar es un POST con token (no un link): el botón apunta al form con form="…".
     ===================================================================================== --%>
<g:form action="cancel" useToken="true" name="cancelDraftForm" id="cancel-draft-form"></g:form>
<kds:bottomSheet id="cancel-draft-sheet" title="${message(code: 'onboarding.cancel.title')}"
                 description="${message(code: 'onboarding.cancel.description')}">
  <kds:bottomSheetActions>
    <kds:button type="error" htmlType="submit" form="cancel-draft-form" cssClass="kds-btn-block">
      <g:message code="onboarding.cancel.confirm"/>
    </kds:button>
    <kds:button type="outlined" cssClass="kds-btn-block" data-close-sheet="true">
      <g:message code="default.back.link"/>
    </kds:button>
  </kds:bottomSheetActions>
</kds:bottomSheet>


<%-- Constantes de los steppers (en el controller o en un service) --%>
<%--
  static final List SETUP_STEPS = ['merchant.onboarding.step.country',
                                   'merchant.onboarding.step.currency',
                                   'merchant.onboarding.step.flowType']
  static final List CONFIG_STEPS = ['merchant.onboarding.step.bank',
                                    'merchant.onboarding.step.account',
                                    'merchant.onboarding.step.plan',
                                    'merchant.onboarding.step.businessInfo',
                                    'merchant.onboarding.step.contract']
--%>


<%-- =====================================================================================
     startOnboarding.gsp (existe) — punto de entrada
     ===================================================================================== --%>
<div class="kds-card-elevated kds-max-w-md kds-flex kds-flex-col kds-gap-2">
  <h1 class="kds-m-0"><g:message code="merchant.onboarding.start.card.title"/></h1>
  <p class="kds-m-0"><g:message code="merchant.onboarding.start.card.description"/></p>
  <mat:button type="primary" href="${createLink(action: 'selectCountry')}"
              textCode="merchant.onboarding.start.card.button" cssClass="kds-btn-block"/>
  <mat:button type="text" href="${createLink(action: 'list')}"
              textCode="merchant.onboarding.start.card.later" cssClass="kds-btn-block"/>
</div>


<%-- =====================================================================================
     selectCountry.gsp (existe) — paso 1 de 3. Sin "Volver" en los pasos 1-3: el controller
     redirige al siguiente cuando el paso ya está hecho (país y moneda no se re-eligen).
     ===================================================================================== --%>
<g:form controller="merchant" action="selectCountrySubmit"
        class="kds-card-elevated kds-max-w-md kds-flex kds-flex-col kds-gap-2">
  <g:render template="/merchant/onboardingHeader" model="[
      title: message(code: 'merchant.onboarding.title'),
      steps: SETUP_STEPS, current: 0,
      subtitle: message(code: merchant.developer ? 'merchant.progress.select.country.and.name.type.title'
                                                 : 'merchant.progress.select.country.type.title')]"/>
  <g:if test="${merchant.developer}">
    <mat:textField name="name" bean="${new Object()}" value="${merchant?.name}"
                   labelCode="merchant.name.label" helpCode="merchant.bankaccount.developer.name.message"
                   required="true"/>
  </g:if>
  <mat:select name="code" bean="${merchant}" value="${connectionCountryCode}" from="${countries}"
              optionKey="code" labelCode="merchant.country.label"/>
  <g:render template="/merchant/onboardingActions"/>
</g:form>


<%-- =====================================================================================
     selectCurrency.gsp (existe) — paso 2 de 3. Solo se muestra con más de una moneda: con una
     sola (Chile), selectCountrySubmit ya la fija y el controller salta a selectFlowType.
     ===================================================================================== --%>
<g:form controller="merchant" action="selectCurrencySubmit"
        class="kds-card-elevated kds-max-w-md kds-flex kds-flex-col kds-gap-2">
  <g:render template="/merchant/onboardingHeader" model="[
      title: message(code: 'merchant.onboarding.title'),
      steps: SETUP_STEPS, current: 1,
      subtitle: message(code: 'merchant.selectCurrency.title')]"/>
  <mat:select name="currencyCode" bean="${new Object()}" value="" from="${currencies}"
              optionKey="code" optionValue="title" labelCode="merchant.currency.label"/>
  <g:render template="/merchant/onboardingActions"/>
</g:form>


<%-- =====================================================================================
     selectFlowType.gsp (existe; markup nuevo) — paso 3 de 3. Radios nativos: sin JS ni
     hidden input, la opción elegida viaja como "flowType".
     ===================================================================================== --%>
<%@ page import="com.khipu.payment.OnboardingType" %>
<g:form controller="merchant" action="selectFlowTypeSubmit"
        class="kds-card-elevated kds-max-w-md kds-flex kds-flex-col kds-gap-2">
  <g:render template="/merchant/onboardingHeader" model="[
      title: message(code: 'merchant.onboarding.title'),
      steps: SETUP_STEPS, current: 2,
      subtitle: message(code: 'merchant.progress.select.flowType.subtitle')]"/>
  <div class="kds-card-selector-group" role="radiogroup"
       aria-label="${message(code: 'merchant.progress.select.flowType.subtitle')}">
    <g:each in="${[[type: OnboardingType.LEGAL_ENTITY, key: 'legal', icon: 'business', reqs: 4],
                   [type: OnboardingType.NATURAL, key: 'natural', icon: 'person', reqs: 2]]}" var="opt">
      <div class="kds-card-selector kds-card-selector--radio">
        <input type="radio" class="kds-card-selector-radio" id="flow-${opt.key}" name="flowType"
               value="${opt.type.name()}" aria-describedby="flow-${opt.key}-desc" required
               ${flowType == opt.type ? 'checked' : ''}/>
        <span class="kds-card-selector-icon" aria-hidden="true">
          <i class="material-symbols-outlined">${opt.icon}</i>
        </span>
        <label for="flow-${opt.key}" class="kds-card-selector-title">
          <g:message code="merchant.onboarding.selectFlow.${opt.key}.title"/>
        </label>
        <span class="kds-card-selector-description" id="flow-${opt.key}-desc">
          <g:message code="merchant.onboarding.selectFlow.${opt.key}.description"/>
        </span>
        <div class="kds-card-selector-details">
          <span class="kds-card-selector-eyebrow">
            <g:message code="merchant.onboarding.selectFlow.${opt.key}.requirements.title"/>
          </span>
          <ul>
            <g:each in="${1..opt.reqs}" var="n">
              <li><g:message code="merchant.onboarding.selectFlow.${opt.key}.requirements.${n}"/></li>
            </g:each>
          </ul>
        </div>
      </div>
    </g:each>
  </div>
  <g:render template="/merchant/onboardingActions" model="[draft: true]"/>
</g:form>
<%-- Fuera del formulario: la confirmación de "Cancelar esta alta" (una vez por vista) --%>
<g:render template="/merchant/cancelDraftSheet"/>


<%-- =====================================================================================
     selectBank.gsp — paso 1 de 5. "Continuar" abre el aviso de redirección (modal: centrado
     en escritorio, bottom sheet en mobile) y su "Continuar" envía el form.
     ===================================================================================== --%>
<g:form controller="merchant" action="selectBankSubmit" id="bankForm"
        class="kds-card-elevated kds-max-w-md kds-flex kds-flex-col kds-gap-2">
  <g:render template="/merchant/onboardingHeader" model="[
      title: message(code: 'merchant.onboarding.legal.title'),
      steps: CONFIG_STEPS, current: 0,
      subtitle: message(code: 'merchant.onboarding.bank.subtitle'),
      lead: message(code: 'merchant.onboarding.bank.lead')]"/>
  <div class="kds-grid">
    <div class="kds-col-sm-12 kds-col-md-6">
      <%-- Banca fija según el tipo de contribuyente (jurídica → Empresas) --%>
      <kds:fieldLocked id="bankingDisplay" labelCode="merchant.onboarding.banking.label"
                       value="${message(code: 'merchant.onboarding.banking.business')}"/>
      <g:hiddenField name="banking" id="banking" value="BUSINESS"/>
    </div>
    <div class="kds-col-sm-12 kds-col-md-6">
      <mat:select name="bankId" bean="${onboarding}" value="${onboarding?.bankId}" from="${banks}"
                  optionKey="id" optionValue="name" labelCode="merchant.onboarding.bank.label"
                  noSelection="['': message(code: 'merchant.onboarding.bank.placeholder')]"
                  required="true"/>
    </div>
  </div>
  <div class="kds-flex kds-gap-1">
    <mat:button type="outlined" href="${createLink(action: 'selectFlowType')}"
                textCode="default.back.link" cssClass="kds-flex-1"/>
    <mat:button type="primary" id="bank-continue" textCode="default.button.continue.label" cssClass="kds-flex-1"/>
  </div>
  <g:render template="/merchant/draftFooter"/>

  <%-- Aviso de redirección: primaria primero (a la derecha en escritorio, arriba en mobile) --%>
  <div class="kds-bottom-sheet-scrim kds-bottom-sheet-scrim--dialog open" id="bank-redirect" hidden>
    <div class="kds-bottom-sheet kds-bottom-sheet--dialog" role="dialog" aria-modal="true"
         aria-labelledby="bank-redirect-heading">
      <div class="kds-bottom-sheet-grabber" aria-hidden="true"></div>
      <%-- El banco se elige en esta misma página: el nombre lo pone el script al abrir --%>
      <h2 class="kds-bottom-sheet-title" id="bank-redirect-heading">
        <g:message code="merchant.onboarding.bankRedirect.titlePrefix"/>
        <span id="bank-redirect-title-bank"></span>
      </h2>
      <p class="kds-bottom-sheet-description">
        <g:message code="merchant.onboarding.bankRedirect.description"/>
      </p>
      <div class="kds-bottom-sheet-body">
        <p class="kds-section-note kds-neutral">
          <i class="material-symbols-outlined" aria-hidden="true">lock</i>
          <span><g:message code="merchant.onboarding.bankRedirect.secure"/></span>
        </p>
      </div>
      <div class="kds-bottom-sheet-actions">
        <mat:button type="primary" htmlType="submit" id="bank-redirect-ok"
                    textCode="default.button.continue.label" cssClass="kds-btn-block"/>
        <mat:button type="outlined" id="bank-redirect-back" textCode="default.back.link" cssClass="kds-btn-block"/>
      </div>
    </div>
  </div>
</g:form>
<%-- Fuera del formulario: la confirmación de "Cancelar esta alta" (una vez por vista) --%>
<g:render template="/merchant/cancelDraftSheet"/>
<kh:script>
  (function () {
    var form = document.getElementById('bankForm');
    var dialog = document.getElementById('bank-redirect');
    var opener = document.getElementById('bank-continue');
    function close() {
      dialog.hidden = true;
      opener.focus();
    }
    opener.addEventListener('click', function () {
      if (!form.reportValidity()) return;
      var bank = document.getElementById('bankId');
      document.getElementById('bank-redirect-title-bank').textContent = bank.selectedOptions[0].text;
      dialog.hidden = false;
      document.getElementById('bank-redirect-ok').focus();
    });
    document.getElementById('bank-redirect-back').addEventListener('click', close);
    dialog.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  })();
</kh:script>


<%-- =====================================================================================
     bankAuthorization.gsp — paso 2: página de autorización de Khipu, FUERA del panel
     (layout sin navbar/sidebar). Dos submits: autorizar → selectAccount, rechazar → selectBank.
     ===================================================================================== --%>
<g:form controller="merchant" action="bankAuthorizationSubmit" useToken="true">
  <div class="kds-screen active kds-max-w-500 kds-mx-auto">
    <section class="kds-card-elevated kds-consent-card" aria-labelledby="consent-title">
      <div class="kds-consent-card-header">
        <div class="kds-consent-card-title" role="heading" aria-level="2" id="consent-title">
          <strong>Khipu</strong> <g:message code="consent.requestsAccessTo"/> <strong>${bank.name}</strong>
        </div>
      </div>
      <div class="kds-consent-card-body">
        <g:each in="${consentSections}" var="section" status="i">
          <div class="kds-consent-card-section" role="group" aria-labelledby="consent-s${i}">
            <div class="kds-consent-card-section-title" role="heading" aria-level="3" id="consent-s${i}">
              <g:message code="${section.titleCode}"/>
            </div>
            <ul class="kds-consent-card-items">
              <g:each in="${section.items}" var="item">
                <li class="kds-consent-card-item">
                  <i class="material-symbols-outlined" aria-hidden="true">${item.icon}</i>
                  <span><g:message code="${item.code}"/></span>
                </li>
              </g:each>
            </ul>
          </div>
        </g:each>
        <div class="kds-consent-card-actions">
          <mat:button type="primary" htmlType="submit" name="decision" value="accept"
                      textCode="consent.accept" cssClass="kds-btn-block"/>
          <mat:button type="outlined" htmlType="submit" name="decision" value="reject"
                      textCode="consent.reject" cssClass="kds-btn-block"/>
        </div>
      </div>
    </section>
    <%-- Directo hijo de .kds-screen y fuera de la card --%>
    <mat:secureFooter/>
  </div>
</g:form>


<%-- =====================================================================================
     selectAccount.gsp — paso 2 de 5: cuenta de recaudación
     ===================================================================================== --%>
<g:form controller="merchant" action="selectAccountSubmit"
        class="kds-card-elevated kds-max-w-md kds-flex kds-flex-col kds-gap-2">
  <g:render template="/merchant/onboardingHeader" model="[
      title: message(code: 'merchant.onboarding.legal.title'),
      steps: CONFIG_STEPS, current: 1]"/>
  <mat:alert type="success" description="${message(code: 'merchant.onboarding.account.validated', args: [bank.name])}"/>
  <h2 class="kds-m-0 kds-color-primary kds-fw-medium"><g:message code="merchant.onboarding.account.subtitle"/></h2>
  <div class="kds-card-selector-group" role="radiogroup"
       aria-label="${message(code: 'merchant.onboarding.account.subtitle')}">
    <g:each in="${bankAccounts}" var="account" status="i">
      <div class="kds-card-selector kds-card-selector--radio">
        <input type="radio" class="kds-card-selector-radio" id="account-${i}" name="accountId"
               value="${account.id}" aria-describedby="account-${i}-number" required
               ${i == 0 ? 'checked' : ''}/>
        <span class="kds-card-selector-icon" aria-hidden="true">
          <i class="material-symbols-outlined">account_balance</i>
        </span>
        <label for="account-${i}" class="kds-card-selector-title">${account.typeName}</label>
        <span class="kds-card-selector-description" id="account-${i}-number">N° ${account.number}</span>
      </div>
    </g:each>
  </div>
  <g:render template="/merchant/onboardingActions" model="[backAction: 'selectBank', draft: true]"/>
</g:form>
<%-- Fuera del formulario: la confirmación de "Cancelar esta alta" (una vez por vista) --%>
<g:render template="/merchant/cancelDraftSheet"/>


<%-- =====================================================================================
     selectPlan.gsp — paso 3 de 5
     ===================================================================================== --%>
<g:form controller="merchant" action="selectPlanSubmit"
        class="kds-card-elevated kds-max-w-md kds-flex kds-flex-col kds-gap-2">
  <g:render template="/merchant/onboardingHeader" model="[
      title: message(code: 'merchant.onboarding.legal.title'),
      steps: CONFIG_STEPS, current: 2,
      subtitle: message(code: 'merchant.onboarding.plan.subtitle')]"/>
  <div class="kds-card-plan-group" role="radiogroup" aria-label="${message(code: 'merchant.onboarding.plan.subtitle')}">
    <g:each in="${plans}" var="plan">
      <div class="kds-card-plan kds-card-plan--selectable${plan.recommended ? ' recommended' : ''}">
        <input type="radio" class="kds-card-plan-radio" id="plan-${plan.code}" name="plan"
               value="${plan.code}" required
               aria-describedby="plan-${plan.code}-price${plan.recommended ? ' plan-' + plan.code + '-badge' : ''}"
               ${plan.code == selectedPlan ? 'checked' : ''}/>
        <div class="kds-card-plan-header">
          <h3><label for="plan-${plan.code}">${plan.name}</label></h3>
        </div>
        <div class="kds-card-plan-price" id="plan-${plan.code}-price">
          <span class="kds-price">${plan.feeDescription}</span>
        </div>
        <g:if test="${plan.description}">
          <div class="kds-card-plan-description">${plan.description}</div>
        </g:if>
        <g:if test="${plan.recommended}">
          <span class="kds-card-plan-badge" id="plan-${plan.code}-badge"><g:message code="plan.recommended"/></span>
        </g:if>
        <ul class="kds-card-plan-features kds-card-plan-features--check">
          <g:each in="${plan.features}" var="feature">
            <li><i class="material-symbols-outlined" aria-hidden="true">check</i>${feature}</li>
          </g:each>
        </ul>
      </div>
    </g:each>
  </div>
  <g:render template="/merchant/onboardingActions" model="[backAction: 'selectAccount', draft: true]"/>
</g:form>
<%-- Fuera del formulario: la confirmación de "Cancelar esta alta" (una vez por vista) --%>
<g:render template="/merchant/cancelDraftSheet"/>


<%-- =====================================================================================
     businessInfo.gsp — paso 4 de 5, pantalla 1/3: sobre tu negocio
     ===================================================================================== --%>
<g:form controller="merchant" action="businessInfoSubmit"
        class="kds-card-elevated kds-max-w-md kds-flex kds-flex-col kds-gap-2">
  <g:render template="/merchant/onboardingHeader" model="[
      title: message(code: 'merchant.onboarding.legal.title'),
      steps: CONFIG_STEPS, current: 3,
      subtitle: message(code: 'merchant.onboarding.businessInfo.subtitle', args: [1, 3])]"/>
  <h3 class="kds-m-0 kds-text-label"><g:message code="merchant.onboarding.businessInfo.business"/></h3>
  <mat:select name="industry" bean="${onboarding}" value="${onboarding?.industry}" from="${industries}"
              labelCode="merchant.onboarding.industry.label" required="true"
              noSelection="['': message(code: 'merchant.onboarding.industry.placeholder')]"/>
  <mat:select name="collectionModel" bean="${onboarding}" value="${onboarding?.collectionModel}"
              from="${collectionModels}" labelCode="merchant.onboarding.collectionModel.label" required="true"
              noSelection="['': message(code: 'merchant.onboarding.collectionModel.placeholder')]"/>
  <mat:select name="monthlySales" bean="${onboarding}" value="${onboarding?.monthlySales}" from="${salesRanges}"
              labelCode="merchant.onboarding.monthlySales.label" helpCode="merchant.onboarding.monthlySales.help"
              required="true" noSelection="['': message(code: 'merchant.onboarding.monthlySales.placeholder')]"/>
  <hr class="divider"/>
  <h3 class="kds-m-0 kds-text-label"><g:message code="merchant.onboarding.businessInfo.interest"/></h3>
  <mat:select name="service" bean="${onboarding}" value="${onboarding?.service}" from="${services}"
              labelCode="merchant.onboarding.service.label" required="true"
              noSelection="['': message(code: 'merchant.onboarding.service.placeholder')]"/>
  <g:render template="/merchant/onboardingActions" model="[backAction: 'selectPlan', draft: true]"/>
</g:form>
<%-- Fuera del formulario: la confirmación de "Cancelar esta alta" (una vez por vista) --%>
<g:render template="/merchant/cancelDraftSheet"/>


<%-- =====================================================================================
     companyInfo.gsp — paso 4 de 5, pantalla 2/3: datos de la empresa y del firmante.
     Datos verificados en solo lectura (KTUF-495): razón social, giro y dirección vienen del
     SII/Regcheq (D-32) y el firmante de la identidad bancaria (BOR-08). No se editan: si están
     mal se repite la verificación o se contacta a soporte (§11.5). Solo teléfono y correo se
     envían en el formulario; el controller NO debe aceptar los campos verificados del request.
     ===================================================================================== --%>
<g:form controller="merchant" action="companyInfoSubmit"
        class="kds-card-elevated kds-max-w-md kds-flex kds-flex-col kds-gap-2">
  <g:render template="/merchant/onboardingHeader" model="[
      title: message(code: 'merchant.onboarding.legal.title'),
      steps: CONFIG_STEPS, current: 3,
      subtitle: message(code: 'merchant.onboarding.businessInfo.subtitle', args: [2, 3])]"/>
  <h3 class="kds-m-0 kds-text-label"><g:message code="merchant.onboarding.company.title"/></h3>
  <div class="kds-grid">
    <div class="kds-col-sm-12 kds-col-md-6">
      <kds:fieldLocked id="companyName" labelCode="merchant.onboarding.company.name.label"
                       value="${company.name}"/>
    </div>
    <div class="kds-col-sm-12 kds-col-md-6">
      <kds:fieldLocked id="companyRut" labelCode="merchant.onboarding.company.rut.label"
                       value="${company.rut}"/>
    </div>
  </div>
  <%-- Sin name: los datos verificados no viajan en el formulario --%>
  <kds:fieldLocked id="companyActivity" labelCode="merchant.onboarding.company.activity.label"
                   value="${company.activity}"/>
  <kds:fieldLocked id="companyAddress" labelCode="merchant.onboarding.company.address.label"
                   value="${company.address}"/>
  <p class="kds-section-note kds-neutral">
    <i class="material-symbols-outlined" aria-hidden="true">verified</i>
    <span><g:message code="merchant.onboarding.company.source" args="${[bank.name]}"/></span>
  </p>
  <div class="kds-grid">
    <div class="kds-col-sm-12 kds-col-md-6">
      <mat:textField name="phone" bean="${onboarding}" value="${onboarding?.phone}"
                     labelCode="merchant.onboarding.company.phone.label" required="true"/>
    </div>
    <div class="kds-col-sm-12 kds-col-md-6">
      <mat:emailField name="email" bean="${onboarding}" value="${onboarding?.email}"
                      labelCode="merchant.onboarding.company.email.label" required="true"/>
    </div>
  </div>
  <hr class="divider"/>
  <h3 class="kds-m-0 kds-text-label"><g:message code="merchant.onboarding.signer.title"/></h3>
  <div class="kds-grid">
    <div class="kds-col-sm-12 kds-col-md-6">
      <kds:fieldLocked id="signerName" labelCode="merchant.onboarding.signer.name.label"
                       value="${signer.name}"/>
    </div>
    <div class="kds-col-sm-12 kds-col-md-6">
      <kds:fieldLocked id="signerRut" labelCode="merchant.onboarding.signer.rut.label"
                       value="${signer.rut}"/>
    </div>
  </div>
  <p class="kds-section-note kds-neutral">
    <i class="material-symbols-outlined" aria-hidden="true">verified</i>
    <span><g:message code="merchant.onboarding.signer.source" args="${[bank.name]}"/></span>
  </p>
  <%-- Datos mal: se repite la verificación o se contacta a soporte (§11.5), no se editan --%>
  <div class="kds-flex kds-flex-col kds-gap-1">
    <span class="kds-text-body-small kds-text-secondary"><g:message code="merchant.onboarding.verified.wrong"/></span>
    <div class="kds-flex kds-gap-1">
      <mat:button type="text" size="sm" href="${createLink(action: 'identity')}" textCode="onboarding.identity.retry" cssClass="kds-flex-1"/>
      <mat:button type="text" size="sm" href="${createLink(action: 'support')}" textCode="default.contactSupport" cssClass="kds-flex-1"/>
    </div>
  </div>
  <g:render template="/merchant/onboardingActions" model="[backAction: 'businessInfo', draft: true]"/>
</g:form>
<%-- Fuera del formulario: la confirmación de "Cancelar esta alta" (una vez por vista) --%>
<g:render template="/merchant/cancelDraftSheet"/>


<%-- =====================================================================================
     contacts.gsp — paso 4 de 5, pantalla 3/3: cinco contactos; solo el comercial es
     obligatorio. El checkbox copia el comercial en los demás y los mantiene sincronizados.
     ===================================================================================== --%>
<g:form controller="merchant" action="contactsSubmit" id="contactsForm"
        class="kds-card-elevated kds-max-w-md kds-flex kds-flex-col kds-gap-2">
  <g:render template="/merchant/onboardingHeader" model="[
      title: message(code: 'merchant.onboarding.legal.title'),
      steps: CONFIG_STEPS, current: 3,
      subtitle: message(code: 'merchant.onboarding.businessInfo.subtitle', args: [3, 3])]"/>
  <g:each in="${['commercial', 'technical', 'operations', 'administrative', 'payments']}" var="type" status="i">
    <g:if test="${i > 0}"><hr class="divider"/></g:if>
    <h3 class="kds-m-0 kds-text-label">
      <g:message code="merchant.onboarding.contact.${type}.title"/>
      <g:if test="${i > 0}"><g:message code="default.optional.label"/></g:if>
    </h3>
    <div class="kds-grid" data-contact="${type}">
      <g:each in="${['name', 'email', 'phone', 'whatsapp']}" var="field">
        <div class="kds-col-sm-12 kds-col-md-6">
          <mat:textField name="contacts.${type}.${field}" id="contact-${type}-${field}" bean="${onboarding}"
                         value="${onboarding?.contacts?.get(type)?.get(field)}"
                         labelCode="merchant.onboarding.contact.${field}.label"
                         required="${i == 0 ? 'true' : 'false'}"/>
        </div>
      </g:each>
    </div>
    <g:if test="${i == 0}">
      <mat:checkBox name="sameContacts" id="sameContacts" bean="${onboarding}"
                    labelCode="merchant.onboarding.contact.useForAll"
                    checked="${onboarding?.sameContacts ? 'true' : 'false'}"/>
    </g:if>
  </g:each>
  <g:render template="/merchant/onboardingActions" model="[backAction: 'companyInfo', draft: true]"/>
</g:form>
<%-- Fuera del formulario: la confirmación de "Cancelar esta alta" (una vez por vista) --%>
<g:render template="/merchant/cancelDraftSheet"/>
<%-- payment imprime los scripts de las vistas con <kh:deferredScripts/> (layouts/material.gsp):
     van en <kh:script>, no en <asset:script>. --%>
<kh:script>
  (function () {
    var same = document.getElementById('sameContacts');
    var fields = ['name', 'email', 'phone', 'whatsapp'];
    function sync() {
      document.querySelectorAll('[data-contact]:not([data-contact="commercial"])').forEach(function (group) {
        var type = group.getAttribute('data-contact');
        fields.forEach(function (f) {
          var input = document.getElementById('contact-' + type + '-' + f);
          if (same.checked) input.value = document.getElementById('contact-commercial-' + f).value;
          input.readOnly = same.checked;
        });
      });
    }
    same.addEventListener('change', sync);
    document.querySelector('[data-contact="commercial"]').addEventListener('input', function () {
      if (same.checked) sync();
    });
    // A re-rendered page (e.g. after a validation error) keeps the checkbox state.
    sync();
  })();
</kh:script>


<%-- =====================================================================================
     riskEvaluation.gsp — tras contactsSubmit, solo si la evaluación de riesgo sigue pendiente
     (D-29 / NAV-12: el contrato no se muestra antes de que termine). Si ya terminó, el
     controller redirige directo a contract. Es una pantalla, no un modal: el avance está
     guardado y se puede salir; el script consulta el avance y, al terminar, habilita
     "Continuar a la firma".
     model: validationSteps [{key, labelCode, status}], timedOut (sin respuesta a tiempo),
            contactEmail
     ===================================================================================== --%>
<div class="kds-card-elevated kds-max-w-md kds-flex kds-flex-col kds-gap-2">
  <g:if test="${timedOut}">
    <%-- Sin respuesta: el alta queda guardada y se avisa por correo cuando se pueda firmar.
         kds:onboardingState pinta el bloque de estado y su acción ("Entendido" → drafts);
         descriptionArgs se escapa dentro del taglib. --%>
    <g:render template="/merchant/onboardingHeader" model="[
        title: message(code: 'merchant.onboarding.legal.title'),
        steps: CONFIG_STEPS, current: 3]"/>
    <kds:onboardingState case="${com.khipu.designsystem.OnboardingStateCase.RISK_BY_EMAIL}"
                         descriptionArgs="${[contactEmail]}"/>
  </g:if>
  <g:else>
    <g:render template="/merchant/onboardingHeader" model="[
        title: message(code: 'merchant.onboarding.legal.title'),
        steps: CONFIG_STEPS, current: 3,
        subtitle: message(code: 'merchant.onboarding.riskEvaluation.subtitle'),
        lead: message(code: 'merchant.onboarding.riskEvaluation.lead', args: [company.name])]"/>
    <%-- Envuelta en <div>: un <ul> después de otro elemento también recibe 1rem de BeerCSS.
         validationSteps: [{key, labelCode, status}]; cada <li> lleva data-step="<key>", que es
         lo que usa el sondeo de abajo para actualizarlo. --%>
    <div>
      <kds:progressChecklist steps="${validationSteps}"/>
    </div>
    <kds:sectionNote icon="info" tone="neutral" textCode="merchant.onboarding.riskEvaluation.canLeave"/>
    <div class="kds-flex kds-gap-1">
      <mat:button type="outlined" href="${createLink(action: 'contacts')}" textCode="default.back.link" cssClass="kds-flex-1"/>
      <%-- Sin href: mat:button ignora disabled cuando renderiza un <a>. El script lo habilita. --%>
      <mat:button type="primary" id="risk-continue" textCode="merchant.onboarding.riskEvaluation.wait"
                  cssClass="kds-flex-1" disabled="true"/>
    </div>
  </g:else>
  <g:render template="/merchant/draftFooter"/>
</div>
<%-- Fuera del formulario: la confirmación de "Cancelar esta alta" (una vez por vista) --%>
<g:render template="/merchant/cancelDraftSheet"/>
<g:if test="${!timedOut}">
<kh:script>
  (function () {
    // validationStatus responde {steps: [{key, status}], timedOut} con status: pending | active | done | error
    var MARKS = {
      done: '<i class="material-symbols-outlined">check</i>',
      error: '<i class="material-symbols-outlined">error</i>',
      active: '<span class="kds-dots-loader"><span></span><span></span><span></span></span>',
      pending: '<span class="kds-progress-checklist-dot"></span>'
    };
    // Visually hidden status read after each label (as KdsProgressChecklist statusLabels)
    var STATUS = {
      pending: '${message(code: 'validation.status.pending').encodeAsJavaScript()}',
      active: '${message(code: 'validation.status.active').encodeAsJavaScript()}',
      done: '${message(code: 'validation.status.done').encodeAsJavaScript()}',
      error: '${message(code: 'validation.status.error').encodeAsJavaScript()}'
    };
    var button = document.getElementById('risk-continue');

    function render(steps) {
      steps.forEach(function (s) {
        var li = document.querySelector('[data-step="' + s.key + '"]');
        if (!li || !MARKS[s.status]) return;
        li.className = 'kds-progress-checklist-item kds-progress-checklist-item--' + s.status;
        if (s.status === 'active') li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
        li.querySelector('.kds-progress-checklist-mark').innerHTML = MARKS[s.status];
        li.querySelector('.kds-progress-checklist-status').textContent = ': ' + STATUS[s.status];
      });
    }

    function enable(label, href) {
      button.disabled = false;
      button.textContent = label;
      button.addEventListener('click', function () { window.location.href = href; });
      button.focus();
    }

    // Failed requests retry with a growing delay and stop after a few: no reload loop that
    // hammers the server; the "puedes salir" note stays and the user can come back later.
    var failures = 0;
    var MAX_FAILURES = 5;

    (function poll() {
      fetch('${createLink(action: 'validationStatus')}', { headers: { Accept: 'application/json' } })
        .then(function (r) {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          return r.json();
        })
        .then(function (result) {
          failures = 0;
          render(result.steps);
          // Sin respuesta a tiempo: el servidor pinta el aviso por correo.
          if (result.timedOut) window.location.reload();
          else if (result.steps.some(function (s) { return s.status === 'error'; })) {
            enable('${message(code: 'merchant.onboarding.validationError.review').encodeAsJavaScript()}',
                   '${createLink(action: 'companyInfo')}');
          } else if (result.steps.every(function (s) { return s.status === 'done'; })) {
            enable('${message(code: 'merchant.onboarding.validated.continue').encodeAsJavaScript()}',
                   '${createLink(action: 'contract')}');
          } else setTimeout(poll, 1200);
        })
        // An expired session answers with the login page (not JSON) and lands here too.
        // After the last retry the button becomes "Reintentar": a reload only when the user
        // asks for it (no loop), and the screen does not go silent.
        .catch(function () {
          failures += 1;
          if (failures < MAX_FAILURES) setTimeout(poll, 1200 * Math.pow(2, failures));
          else enable('${message(code: 'merchant.onboarding.riskEvaluation.retry').encodeAsJavaScript()}',
                      window.location.href);
        });
    })();
  })();
</kh:script>
</g:if>


<%-- =====================================================================================
     contract.gsp — paso 5 de 5: firmante + contrato. khipu-beercss.js habilita el checkbox
     al llegar al final; "Rechazar condiciones" deja al usuario en la pantalla con un aviso.
     ===================================================================================== --%>
<g:form controller="merchant" action="contractSubmit"
        class="kds-card-elevated kds-max-w-md kds-flex kds-flex-col kds-gap-2">
  <g:render template="/merchant/onboardingHeader" model="[
      title: message(code: 'merchant.onboarding.legal.title'),
      steps: CONFIG_STEPS, current: 4]"/>
  <%-- Riesgo rojo: el tope se informa antes de firmar, no solo en el éxito --%>
  <g:if test="${riskCap}">
    <%-- message() marca su resultado como seguro: el monto se escapa ANTES de entrar al
         mensaje, no después. --%>
    <kds:alert severity="warning"
               lead="${message(code: 'merchant.onboarding.contract.riskCap.lead', args: [kh.formatAmount(amount: riskCap, currency: merchant.currency).toString().encodeAsHTML()])}"
               textCode="merchant.onboarding.contract.riskCap.text"/>
  </g:if>
  <g:else>
    <kds:alert severity="success" textCode="merchant.onboarding.contract.validated"/>
  </g:else>
  <h2 class="kds-m-0 kds-color-primary kds-fw-medium"><g:message code="merchant.onboarding.contract.subtitle"/></h2>
  <h3 class="kds-m-0 kds-text-label"><g:message code="merchant.onboarding.signer.title"/></h3>
  <div class="kds-grid">
    <div class="kds-col-sm-12 kds-col-md-6">
      <%-- Mismo origen que en companyInfo.gsp: la identidad bancaria (BOR-08) --%>
      <kds:fieldLocked id="signerName" labelCode="merchant.onboarding.signer.name.label"
                       value="${signer.name}"/>
    </div>
    <div class="kds-col-sm-12 kds-col-md-6">
      <kds:fieldLocked id="signerRut" labelCode="merchant.onboarding.signer.rut.label"
                       value="${signer.rut}"/>
    </div>
  </div>
  <hr class="divider"/>
  <h3 class="kds-m-0 kds-text-label"><g:message code="merchant.onboarding.contract.review"/></h3>
  <div class="kds-contract" data-kds-contract>
    <div class="kds-contract-content" role="region" tabindex="0"
         aria-label="${message(code: 'merchant.signContract.title')}">
      ${raw(contractContent)}
    </div>
    <label class="checkbox kds-contract-accept">
      <input type="checkbox" id="agreeContract" name="agreeContract" aria-describedby="contract-hint"/>
      <span><g:message code="merchant.signContract.check.label"/></span>
    </label>
    <div class="kds-contract-hint" id="contract-hint">
      <g:message code="merchant.signContract.scroll.hint"/>
    </div>
  </div>
  <div class="kds-flex kds-gap-1">
    <mat:button type="outlined" id="reject-contract" textCode="merchant.onboarding.contract.reject"
                cssClass="kds-flex-1"/>
    <mat:button type="primary" htmlType="submit" id="sign-button" textCode="merchant.onboarding.contract.sign"
                cssClass="kds-flex-1" disabled="true"/>
  </div>
  <g:render template="/merchant/draftFooter"/>
</g:form>
<%-- Fuera del formulario: la confirmación de "Cancelar esta alta" (una vez por vista) --%>
<g:render template="/merchant/cancelDraftSheet"/>
<kh:script>
  (function () {
    var accept = document.getElementById('agreeContract');
    var sign = document.getElementById('sign-button');
    accept.addEventListener('change', function () { sign.disabled = !accept.checked; });
    document.getElementById('reject-contract').addEventListener('click', function () {
      Khipu.showSnackbar('${message(code: 'merchant.onboarding.contract.reject.snackbar').encodeAsJavaScript()}', 'info');
    });
  })();
</kh:script>


<%-- =====================================================================================
     onboardingDone.gsp — cuenta creada + encuesta opcional (no bloquea nada)
     ===================================================================================== --%>
<div class="kds-max-w-md kds-flex kds-flex-col kds-gap-2">
  <div class="kds-card-elevated kds-flex kds-flex-col kds-gap-2">
    <h1 class="kds-m-0"><g:message code="merchant.onboarding.done.title"/></h1>
    <div class="kds-status-block" data-status="success">
      <div class="kds-status-block-icon"><i class="material-symbols-outlined">check</i></div>
      <h2 class="kds-status-block-title"><g:message code="merchant.onboarding.done.subtitle"/></h2>
    </div>
    <div class="kds-flex kds-justify-center">
      <span class="kds-badge primary">${merchant.name} · ID ${merchant.id}</span>
    </div>
    <mat:button type="primary" href="${createLink(controller: 'payment', action: 'create')}"
                textCode="merchant.onboarding.done.collect" cssClass="kds-btn-block"/>
    <mat:button type="text" href="${createLink(action: 'profile', id: merchant.id)}"
                textCode="merchant.onboarding.done.options" cssClass="kds-btn-block"/>
  </div>

  <%-- Acción nueva: la actual selectDiscoverySourceSubmit (encuesta al inicio) redirige a
       startOnboarding; esta guarda la respuesta y vuelve aquí con submitted = true. --%>
  <g:form action="onboardingDiscoverySourceSubmit">
    <section class="kds-feedback-card${submitted ? ' kds-feedback-card--submitted' : ''}"
             aria-labelledby="feedback-title">
      <span class="kds-feedback-card-icon" aria-hidden="true">
        <i class="material-symbols-outlined">${submitted ? 'check' : 'auto_awesome'}</i>
      </span>
      <div class="kds-feedback-card-body">
        <div class="kds-feedback-card-text">
          <div class="kds-feedback-card-title" id="feedback-title">
            <g:message code="${submitted ? 'feedback.thanks.title' : 'merchant.onboarding.start.modal.title'}"/>
          </div>
          <div class="kds-feedback-card-description">
            <g:message code="${submitted ? 'feedback.thanks.description' : 'merchant.onboarding.start.modal.subtitle'}"/>
          </div>
        </div>
        <g:unless test="${submitted}">
          <mat:select name="discoverySource" bean="${new Object()}" value="" from="${discoverySourceOptions}"
                      optionKey="id" optionValue="label" labelCode="merchant.discoverySource.label"
                      noSelection="['': message(code: 'merchant.discoverySource.not.select.label')]"
                      required="true"/>
          <mat:button type="outlined" htmlType="submit" textCode="default.button.send.label"/>
        </g:unless>
      </div>
    </section>
  </g:form>
</div>
