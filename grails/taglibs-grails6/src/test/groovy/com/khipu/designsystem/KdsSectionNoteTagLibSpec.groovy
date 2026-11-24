package com.khipu.designsystem

import grails.testing.web.taglib.TagLibUnitTest
import spock.lang.Specification

class KdsSectionNoteTagLibSpec extends Specification implements TagLibUnitTest<KdsSectionNoteTagLib> {

    void 'renders the icon hidden from assistive tech and the text in a span'() {
        expect:
        def html = applyTemplate('<kds:sectionNote icon="verified" tone="neutral">Datos verificados</kds:sectionNote>')
        html.contains('class="kds-section-note kds-neutral"')
        html.contains('<i class="material-symbols-outlined" aria-hidden="true">verified</i>')
        html.contains('<span>Datos verificados</span>')
    }

    void 'defaults the icon to info'() {
        expect:
        applyTemplate('<kds:sectionNote>Texto</kds:sectionNote>').contains('>info</i>')
    }

    void 'textCode resolves the message instead of the body'() {
        expect:
        applyTemplate('<kds:sectionNote textCode="some.missing.code"/>').contains('<span>some.missing.code</span>')
    }

    void 'escapes icon, tone, text and cssClass'() {
        given:
        def payload = '"><script>alert(1)</script>'

        expect:
        !applyTemplate(
            '<kds:sectionNote icon="${payload}" tone="${payload}" cssClass="${payload}">${payload}</kds:sectionNote>',
            [payload: payload]
        ).contains('<script>')
    }
}
