package com.khipu.designsystem

import grails.testing.web.taglib.TagLibUnitTest
import spock.lang.Specification

class KdsBankRowTagLibSpec extends Specification implements TagLibUnitTest<KdsBankRowTagLib> {

    void 'renders an anchor with title, meta and chevron_right, no logo'() {
        expect:
        def html = applyTemplate('<kds:bankRow href="/onboarding/resume/1" title="Acme SpA" meta="Paso 2 de 3"/>')
        html.startsWith('<a class="kds-bank-row" href="/onboarding/resume/1">')
        html.contains('<span>Acme SpA</span>')
        html.contains('<span class="kds-text-body-small kds-text-secondary">Paso 2 de 3</span>')
        html.contains('chevron_right')
        !html.contains('kds-bank-row-logo')
    }

    void 'meta is optional'() {
        expect:
        !applyTemplate('<kds:bankRow href="/a" title="Acme SpA"/>').contains('kds-text-secondary')
    }

    void 'escapes href, title, meta and cssClass'() {
        given:
        def payload = '"><script>alert(1)</script>'

        expect:
        !applyTemplate(
            '<kds:bankRow href="${payload}" title="${payload}" meta="${payload}" cssClass="${payload}"/>',
            [payload: payload]
        ).contains('<script>')
    }
}
