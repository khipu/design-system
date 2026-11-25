package com.khipu.designsystem

import grails.testing.web.taglib.TagLibUnitTest
import spock.lang.Specification

class KdsFieldLockedTagLibSpec extends Specification implements TagLibUnitTest<KdsFieldLockedTagLib> {

    void 'renders the full markup: field/label/border/locked, readonly input, label, lock icon'() {
        expect:
        def html = applyTemplate('<kds:fieldLocked id="rut" label="RUT" value="11.111.111-1"/>')
        html.contains('class="field label border locked"')
        html.contains('<input type="text" id="rut" value="11.111.111-1" readonly aria-readonly="true">')
        html.contains('<label for="rut" class="active">RUT</label>')
        html.contains('<i class="material-symbols-outlined" aria-hidden="true">lock</i>')
    }

    void 'no name by default'() {
        expect:
        !applyTemplate('<kds:fieldLocked id="rut" label="RUT" value="X"/>').contains('name=')
    }

    void 'name is included only when explicitly passed'() {
        expect:
        applyTemplate('<kds:fieldLocked id="rut" label="RUT" value="X" name="rut"/>').contains('name="rut"')
    }

    void 'no tabindex="-1" (stays reachable by Tab)'() {
        expect:
        !applyTemplate('<kds:fieldLocked id="rut" label="RUT" value="X"/>').contains('tabindex')
    }

    void 'id defaults to a slug of the label when omitted'() {
        expect:
        def html = applyTemplate('<kds:fieldLocked label="Company Name" value="X"/>')
        html.contains('id="kds-field-company-name"')
        html.contains('for="kds-field-company-name"')
    }

    void 'group adds kds-field-group'() {
        expect:
        applyTemplate('<kds:fieldLocked id="a" label="A" value="X" group="true"/>')
            .contains('class="field label border locked kds-field-group"')
    }

    void 'labelCode resolves the message when label is absent'() {
        expect:
        applyTemplate('<kds:fieldLocked id="a" labelCode="some.missing.code" value="X"/>')
            .contains('<label for="a" class="active">some.missing.code</label>')
    }

    void 'escapes id, name, label and value'() {
        given:
        def payload = '"><script>alert(1)</script>'

        expect:
        !applyTemplate(
            '<kds:fieldLocked id="${payload}" label="${payload}" value="${payload}" name="${payload}"/>',
            [payload: payload]
        ).contains('<script>')
    }
}
