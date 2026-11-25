package com.khipu.designsystem

import grails.testing.web.taglib.TagLibUnitTest
import spock.lang.Specification
import spock.lang.Unroll

class KdsChipTagLibSpec extends Specification implements TagLibUnitTest<KdsChipTagLib> {

    @Unroll
    void 'renders the color class (#color)'() {
        expect:
        applyTemplate("<kds:chip color=\"${color}\">Texto</kds:chip>").contains("class=\"kds-badge ${color}\"")

        where:
        color << ['primary', 'success', 'error', 'warning', 'info', 'neutral']
    }

    void 'with an icon'() {
        expect:
        applyTemplate('<kds:chip color="neutral" icon="verified">Verificado</kds:chip>')
            .contains('<i class="material-symbols-outlined">verified</i><span>Verificado</span>')
    }

    void 'without an icon'() {
        expect:
        !applyTemplate('<kds:chip color="neutral">Fijo</kds:chip>').contains('material-symbols-outlined')
    }

    void 'textCode resolves the message instead of the body'() {
        expect:
        applyTemplate('<kds:chip color="neutral" textCode="some.missing.code"/>')
            .contains('<span>some.missing.code</span>')
    }

    void 'without text nor body renders an empty label span'() {
        expect:
        applyTemplate('<kds:chip color="neutral"/>') == '<span class="kds-badge neutral"><span></span></span>'
    }

    void 'the body is escaped: markup inside the tag is shown as text, not rendered'() {
        expect:
        def html = applyTemplate('<kds:chip color="neutral"><b>Fijo</b></kds:chip>')
        html.contains('<span>&lt;b&gt;Fijo&lt;/b&gt;</span>')
        !html.contains('<b>')
    }

    void 'escapes color, icon, text and cssClass'() {
        given:
        def payload = '"><script>alert(1)</script>'

        expect:
        !applyTemplate(
            '<kds:chip color="${payload}" icon="${payload}" cssClass="${payload}">${payload}</kds:chip>',
            [payload: payload]
        ).contains('<script>')
    }
}
