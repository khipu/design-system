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
