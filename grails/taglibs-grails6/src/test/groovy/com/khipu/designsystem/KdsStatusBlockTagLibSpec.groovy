package com.khipu.designsystem

import grails.testing.web.taglib.TagLibUnitTest
import spock.lang.Specification

class KdsStatusBlockTagLibSpec extends Specification implements TagLibUnitTest<KdsStatusBlockTagLib> {

    void 'renders the icon, title and description with data-status'() {
        expect:
        def html = applyTemplate(
            '<kds:statusBlock status="info" icon="hourglass_top" title="Esperando" description="Ya volvemos"/>'
        )
        html.contains('class="kds-status-block"')
        html.contains('data-status="info"')
        html.contains('<i class="material-symbols-outlined">hourglass_top</i>')
        html.contains('<h2 class="kds-status-block-title">Esperando</h2>')
        html.contains('<p class="kds-status-block-description">Ya volvemos</p>')
    }

    void 'omits the icon element content and the description paragraph when absent'() {
        expect:
        def html = applyTemplate('<kds:statusBlock status="error" title="Error"/>')
        html.contains('<div class="kds-status-block-icon"></div>')
        !html.contains('kds-status-block-description')
    }

    void 'appends cssClass to the class list'() {
        expect:
        applyTemplate('<kds:statusBlock status="info" title="A" cssClass="kds-mt-2"/>')
            .contains('class="kds-status-block kds-mt-2"')
    }

    void 'escapes title, description, icon, status and cssClass'() {
        given:
        def payload = '"><script>alert(1)</script>'

        expect:
        def html = applyTemplate(
            '<kds:statusBlock status="${payload}" icon="${payload}" title="${payload}" description="${payload}" cssClass="${payload}"/>',
            [payload: payload]
        )
        !html.contains('<script>')
    }
}
