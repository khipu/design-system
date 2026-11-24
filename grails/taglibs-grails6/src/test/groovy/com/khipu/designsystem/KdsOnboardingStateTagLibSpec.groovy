package com.khipu.designsystem

import grails.testing.web.taglib.TagLibUnitTest
import spock.lang.Specification

class KdsOnboardingStateTagLibSpec extends Specification implements TagLibUnitTest<KdsOnboardingStateTagLib> {

    def setup() {
        mockTagLib(KdsStatusBlockTagLib)
        mockTagLib(KdsButtonTagLib)
    }

    void 'a known case renders its status, icon and actions'() {
        given:
        def stateCase = OnboardingStateCase.RISK_PENDING

        expect:
        def html = applyTemplate('<kds:onboardingState case="${stateCase}"/>', [stateCase: stateCase])
        html.contains('data-status="info"')
        html.contains('hourglass_top')
        html.contains('kds-btn-stack')
        html.contains('kds-btn-outlined')
        html.contains('href="/test/drafts"')
    }

    void 'a case with two actions renders both, in order, with the right variants'() {
        given:
        def stateCase = OnboardingStateCase.IDENTIFIER_RESTRICTED

        when:
        def html = applyTemplate('<kds:onboardingState case="${stateCase}"/>', [stateCase: stateCase])
        def identityIndex = html.indexOf('href="/test/identity"')
        def supportIndex = html.indexOf('href="/test/support"')

        then:
        html.contains('data-status="error"')
        identityIndex > -1
        supportIndex > identityIndex
        html.contains('kds-btn-outlined')
    }

    void 'an explicit attr overrides the case default'() {
        given:
        def stateCase = OnboardingStateCase.RISK_PENDING

        expect:
        applyTemplate(
            '<kds:onboardingState case="${stateCase}" icon="custom_icon"/>',
            [stateCase: stateCase]
        ).contains('custom_icon')
    }

    void 'a malicious key with no matching message code does not leak into the title unescaped'() {
        given:
        def payload = '"><script>alert(1)</script>'

        expect:
        !applyTemplate('<kds:onboardingState status="info" key="${payload}"/>', [payload: payload]).contains('<script>')
    }

    void 'can be assembled by hand, with no case at all'() {
        expect:
        def html = applyTemplate(
            '<kds:onboardingState status="success" icon="check_circle" title="Listo" description="Todo en orden" actions="${actions}"/>',
            [actions: [[gspAction: 'home', i18n: 'default.understood']]]
        )
        html.contains('data-status="success"')
        html.contains('<h2 class="kds-status-block-title">Listo</h2>')
        html.contains('href="/test/home"')
    }

    void 'DRAFTS_EMPTY renders its text-variant action as kds-btn-text'() {
        given:
        def stateCase = OnboardingStateCase.DRAFTS_EMPTY

        expect:
        def html = applyTemplate('<kds:onboardingState case="${stateCase}"/>', [stateCase: stateCase])
        html.contains('data-status="info"')
        html.contains('inbox')
        html.contains('href="/test/start"')
        html.contains('href="/test/support"')
        html.contains('kds-btn kds-btn-text kds-btn-block')
    }

    void 'descriptionArgs are passed to the message and escaped'() {
        given:
        messageSource.addMessage('onboarding.state.riskByEmail.description', Locale.ENGLISH, 'Te avisaremos a {0}')
        def payload = '<script>alert(1)</script>'

        expect:
        def html = applyTemplate(
            '<kds:onboardingState status="info" title="Aviso" key="riskByEmail" descriptionArgs="${args}"/>',
            [args: [payload]]
        )
        html.contains('Te avisaremos a')
        html.contains('&lt;script&gt;')
        !html.contains('<script>')
    }

    void 'an explicit empty actions list drops the case actions entirely'() {
        given:
        def stateCase = OnboardingStateCase.RISK_PENDING

        expect:
        !applyTemplate(
            '<kds:onboardingState case="${stateCase}" actions="${actions}"/>',
            [stateCase: stateCase, actions: []]
        ).contains('kds-btn-stack')
    }

    void 'requires a case or an explicit status'() {
        when:
        applyTemplate('<kds:onboardingState title="Listo"/>')

        then:
        thrown(Throwable)
    }

    void 'requires a case/key or an explicit title'() {
        when:
        applyTemplate('<kds:onboardingState status="info"/>')

        then:
        thrown(Throwable)
    }
}
