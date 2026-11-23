package com.khipu.designsystem

import grails.testing.web.taglib.TagLibUnitTest
import spock.lang.Specification

class KdsBottomSheetTagLibSpec extends Specification implements TagLibUnitTest<KdsBottomSheetTagLib> {

    void 'aria-labelledby points at the title id, hidden by default'() {
        expect:
        def html = applyTemplate('<kds:bottomSheet id="cancel-draft-sheet" title="Cancelar esta alta?">actions</kds:bottomSheet>')
        html.contains('id="cancel-draft-sheet"')
        html.contains('hidden')
        html.contains('aria-labelledby="cancel-draft-sheet-title"')
        html.contains('id="cancel-draft-sheet-title"')
        html.contains('role="dialog"')
        html.contains('aria-modal="true"')
    }

    void 'dismissible defaults to true (no data-sheet-dismissible attr)'() {
        expect:
        !applyTemplate('<kds:bottomSheet id="s" title="T">x</kds:bottomSheet>').contains('data-sheet-dismissible')
    }

    void 'dismissible=false adds data-sheet-dismissible=false'() {
        expect:
        applyTemplate('<kds:bottomSheet id="s" title="T" dismissible="false">x</kds:bottomSheet>')
            .contains('data-sheet-dismissible="false"')
    }

    void 'renders the body (actions) inside the dialog, in order'() {
        expect:
        def html = applyTemplate(
            '<kds:bottomSheet id="s" title="T"><button data-close-sheet>A</button><button type="submit">B</button></kds:bottomSheet>'
        )
        html.indexOf('>A<') < html.indexOf('>B<')
        html.contains('data-close-sheet')
    }

    void 'description is optional'() {
        expect:
        !applyTemplate('<kds:bottomSheet id="s" title="T">x</kds:bottomSheet>').contains('kds-bottom-sheet-description')
    }

    void 'escapes id, title, description and cssClass'() {
        given:
        def payload = '"><script>alert(1)</script>'

        expect:
        !applyTemplate(
            '<kds:bottomSheet id="${payload}" title="${payload}" description="${payload}" cssClass="${payload}">x</kds:bottomSheet>',
            [payload: payload]
        ).contains('<script>')
    }

    void 'bottomSheetBody and bottomSheetActions render as siblings, body before actions'() {
        expect:
        def html = applyTemplate('<kds:bottomSheet id="rectify-sheet" title="T"><kds:bottomSheetBody><ul><li>Paso</li></ul></kds:bottomSheetBody><kds:bottomSheetActions><button type="submit">Confirmar</button></kds:bottomSheetActions></kds:bottomSheet>')
        html.contains('<div class="kds-bottom-sheet-body"><ul><li>Paso</li></ul></div>')
        html.contains('<div class="kds-bottom-sheet-actions"><button type="submit">Confirmar</button></div>')
        !html.contains('kds-bottom-sheet-actions"><div class="kds-bottom-sheet-body"')
        !html.contains('kds-bottom-sheet-body"><div class="kds-bottom-sheet-actions"')
        html.indexOf('kds-bottom-sheet-body') < html.indexOf('kds-bottom-sheet-actions')
    }

    void 'bottomSheetActions alone (no body) matches the cancel-dialog shape'() {
        expect:
        def html = applyTemplate('<kds:bottomSheet id="cancel-draft-sheet" title="T"><kds:bottomSheetActions><button>Confirmar</button></kds:bottomSheetActions></kds:bottomSheet>')
        !html.contains('kds-bottom-sheet-body')
        html.contains('<div class="kds-bottom-sheet-actions">')
    }
}
