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
  - Claves i18n: las de merchant.onboarding.start.*, merchant.progress.*, merchant.selectCurrency.title,
    merchant.onboarding.selectFlow.*, merchant.signContract.check.label, merchant.discoverySource.*,
    merchant.name.label, merchant.bankaccount.developer.name.message, default.back.link,
    default.button.continue.label y default.button.send.label ya existen.
    Todas las demás hay que crearlas: el resto de merchant.onboarding.* (step, legal.title,
    banking, bank, bankRedirect, account, plan, businessInfo, industry, collectionModel,
    monthlySales, service, company, signer, contact, validating, validated, validationError,
    contract, done), merchant.signContract.title, merchant.signContract.scroll.hint, consent.*,
    plan.recommended, validation.status.*, feedback.thanks.*, default.optional.label y
    default.loading.label.
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
  <p class="kds-m-0">${lead}</p>
</g:if>


<%-- =====================================================================================
     _onboardingActions.gsp — Volver (link a la pantalla anterior) + Continuar (submit)
     model: backAction (opcional), continueDisabled (opcional)
     ===================================================================================== --%>
<div class="kds-flex kds-gap-1">
  <g:if test="${backAction}">
    <mat:button type="outlined" href="${createLink(action: backAction)}"
                textCode="default.back.link" cssClass="kds-flex-1"/>
  </g:if>
  <mat:button type="primary" htmlType="submit" textCode="default.button.continue.label"
              cssClass="kds-flex-1" disabled="${continueDisabled ? 'true' : 'false'}"/>
</div>


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
  <g:render template="/merchant/onboardingActions"/>
</g:form>


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
      <mat:fieldLocked id="bankingDisplay" labelCode="merchant.onboarding.banking.label"
                       value="${message(code: 'merchant.onboarding.banking.business')}" group="false"/>
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
  <g:render template="/merchant/onboardingActions" model="[backAction: 'selectBank']"/>
</g:form>


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
  <g:render template="/merchant/onboardingActions" model="[backAction: 'selectAccount']"/>
</g:form>


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
  <g:render template="/merchant/onboardingActions" model="[backAction: 'selectPlan']"/>
</g:form>


<%-- =====================================================================================
     companyInfo.gsp — paso 4 de 5, pantalla 2/3: datos de la empresa y del firmante.
     Nombre y RUT vienen del acceso bancario: bloqueados.
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
      <mat:fieldLocked id="companyName" labelCode="merchant.onboarding.company.name.label"
                       value="${company.name}" group="false"/>
    </div>
    <div class="kds-col-sm-12 kds-col-md-6">
      <mat:fieldLocked id="companyRut" labelCode="merchant.onboarding.company.rut.label"
                       value="${company.rut}" group="false"/>
    </div>
  </div>
  <p class="kds-section-note kds-neutral">
    <i class="material-symbols-outlined" aria-hidden="true">lock</i>
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
  <mat:textField name="businessActivity" bean="${onboarding}" value="${onboarding?.businessActivity}"
                 labelCode="merchant.onboarding.company.activity.label" required="true"/>
  <mat:textField name="address" bean="${onboarding}" value="${onboarding?.address}"
                 labelCode="merchant.onboarding.company.address.label" required="true"/>
  <hr class="divider"/>
  <h3 class="kds-m-0 kds-text-label"><g:message code="merchant.onboarding.signer.title"/></h3>
  <div class="kds-grid">
    <div class="kds-col-sm-12 kds-col-md-6">
      <mat:textField name="legalRepresentative" bean="${onboarding}" value="${onboarding?.legalRepresentative}"
                     labelCode="merchant.onboarding.signer.name.label" required="true"/>
    </div>
    <div class="kds-col-sm-12 kds-col-md-6">
      <mat:textField name="legalRepresentativeRut" bean="${onboarding}" value="${onboarding?.legalRepresentativeRut}"
                     labelCode="merchant.onboarding.signer.rut.label" required="true"/>
    </div>
  </div>
  <g:render template="/merchant/onboardingActions" model="[backAction: 'businessInfo']"/>
</g:form>


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
  <g:render template="/merchant/onboardingActions" model="[backAction: 'companyInfo']"/>
</g:form>
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
     validation.gsp — tras contactsSubmit: validación automática (modal no cerrable).
     El servidor pinta el estado inicial; el script consulta el avance y, al terminar,
     habilita "Continuar a la firma" (el modal NO se cierra solo).
     ===================================================================================== --%>
<div class="kds-bottom-sheet-scrim kds-bottom-sheet-scrim--dialog open">
  <div class="kds-bottom-sheet kds-bottom-sheet--dialog kds-bottom-sheet--center" role="dialog"
       aria-modal="true" aria-labelledby="validating-title" aria-describedby="validating-desc">
    <div class="kds-bottom-sheet-icon" id="validating-icon">
      <progress class="circle indeterminate" aria-label="${message(code: 'default.loading.label')}"></progress>
    </div>
    <h2 class="kds-bottom-sheet-title" id="validating-title">
      <g:message code="merchant.onboarding.validating.title"/>
    </h2>
    <p class="kds-bottom-sheet-description" id="validating-desc">
      <g:message code="merchant.onboarding.validating.description" args="${[company.name]}"/>
    </p>
    <div class="kds-bottom-sheet-body">
      <ul class="kds-progress-checklist" id="validation-steps" aria-live="polite">
        <g:each in="${validationSteps}" var="step">
          <g:if test="${step.status == 'active'}">
            <li class="kds-progress-checklist-item kds-progress-checklist-item--active" aria-current="step"
                data-step="${step.key}">
          </g:if>
          <g:else>
            <li class="kds-progress-checklist-item kds-progress-checklist-item--${step.status}" data-step="${step.key}">
          </g:else>
            <span class="kds-progress-checklist-mark" aria-hidden="true">
              <g:if test="${step.status == 'done'}"><i class="material-symbols-outlined">check</i></g:if>
              <g:elseif test="${step.status == 'active'}"><span class="kds-dots-loader"><span></span><span></span><span></span></span></g:elseif>
              <g:else><span class="kds-progress-checklist-dot"></span></g:else>
            </span>
            <span class="kds-progress-checklist-label"><g:message code="${step.labelCode}"/></span>
            <span class="kds-progress-checklist-status">: <g:message code="validation.status.${step.status}"/></span>
          </li>
        </g:each>
      </ul>
    </div>
    <p class="kds-bottom-sheet-hint" id="validating-hint">
      <g:message code="merchant.onboarding.validating.doNotClose"/>
    </p>
    <div class="kds-bottom-sheet-actions">
      <%-- Deshabilitado hasta que TODOS los pasos están listos (o hasta un error, que lo vuelve
           "Revisar mis datos"). Sin href: mat:button ignora disabled cuando renderiza un <a>. --%>
      <mat:button type="primary" id="validating-finish" textCode="merchant.onboarding.validating.wait"
                  cssClass="kds-btn-block" disabled="true"/>
    </div>
  </div>
</div>
<kh:script>
  (function () {
    // validationStatus responde [{key, status}] con status: pending | active | done | error
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
    var finish = document.getElementById('validating-finish');

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

    // Ends the validation: result icon and texts, no hint, and the button as the only way out.
    function finishWith(ok, title, description, label, href) {
      document.getElementById('validating-icon').innerHTML = ok
        ? '<i class="material-symbols-outlined kds-color-success" aria-hidden="true">check_circle</i>'
        : '<i class="material-symbols-outlined kds-color-error" aria-hidden="true">error</i>';
      document.getElementById('validating-title').textContent = title;
      document.getElementById('validating-desc').textContent = description;
      var hint = document.getElementById('validating-hint');
      if (hint) hint.remove();
      finish.disabled = false;
      finish.textContent = label;
      finish.addEventListener('click', function () { window.location.href = href; });
      finish.focus();
    }

    function done() {
      finishWith(true,
        '${message(code: 'merchant.onboarding.validated.title').encodeAsJavaScript()}',
        '${message(code: 'merchant.onboarding.validated.description').encodeAsJavaScript()}',
        '${message(code: 'merchant.onboarding.validated.continue').encodeAsJavaScript()}',
        '${createLink(action: 'contract')}');
    }

    // A failed step or a failed request (e.g. an expired session) never leaves the user stuck.
    function failed() {
      finishWith(false,
        '${message(code: 'merchant.onboarding.validationError.title').encodeAsJavaScript()}',
        '${message(code: 'merchant.onboarding.validationError.description').encodeAsJavaScript()}',
        '${message(code: 'merchant.onboarding.validationError.review').encodeAsJavaScript()}',
        '${createLink(action: 'companyInfo')}');
    }

    (function poll() {
      fetch('${createLink(action: 'validationStatus')}', { headers: { Accept: 'application/json' } })
        .then(function (r) {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          return r.json();
        })
        .then(function (steps) {
          render(steps);
          if (steps.some(function (s) { return s.status === 'error'; })) failed();
          else if (steps.every(function (s) { return s.status === 'done'; })) done();
          else setTimeout(poll, 1200);
        })
        .catch(failed);
    })();
  })();
</kh:script>


<%-- =====================================================================================
     contract.gsp — paso 5 de 5: firmante + contrato. khipu-beercss.js habilita el checkbox
     al llegar al final; "Rechazar condiciones" deja al usuario en la pantalla con un aviso.
     ===================================================================================== --%>
<g:form controller="merchant" action="contractSubmit"
        class="kds-card-elevated kds-max-w-md kds-flex kds-flex-col kds-gap-2">
  <g:render template="/merchant/onboardingHeader" model="[
      title: message(code: 'merchant.onboarding.legal.title'),
      steps: CONFIG_STEPS, current: 4]"/>
  <mat:alert type="success" descriptionCode="merchant.onboarding.contract.validated"/>
  <h2 class="kds-m-0 kds-color-primary kds-fw-medium"><g:message code="merchant.onboarding.contract.subtitle"/></h2>
  <h3 class="kds-m-0 kds-text-label"><g:message code="merchant.onboarding.signer.title"/></h3>
  <div class="kds-grid">
    <div class="kds-col-sm-12 kds-col-md-6">
      <mat:fieldLocked id="signerName" labelCode="merchant.onboarding.signer.name.label"
                       value="${onboarding.legalRepresentative}" group="false"/>
    </div>
    <div class="kds-col-sm-12 kds-col-md-6">
      <mat:fieldLocked id="signerRut" labelCode="merchant.onboarding.signer.rut.label"
                       value="${onboarding.legalRepresentativeRut}" group="false"/>
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
</g:form>
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
