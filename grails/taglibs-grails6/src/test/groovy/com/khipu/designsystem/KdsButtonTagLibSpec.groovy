package com.khipu.designsystem

import grails.testing.web.taglib.TagLibUnitTest
import spock.lang.Specification

class KdsButtonTagLibSpec extends Specification implements TagLibUnitTest<KdsButtonTagLib> {

    void 'renders a button element with the kds-btn family by default'() {
        expect:
        applyTemplate('<kds:button type="primary">Pagar</kds:button>') ==
            '<button type="button" class="kds-btn kds-btn-primary" >Pagar</button>'
    }

    void 'renders an anchor element when href is set'() {
        expect:
        applyTemplate('<kds:button type="outlined" href="/start">Continuar</kds:button>') ==
            '<a href="/start" class="kds-btn kds-btn-outlined" >Continuar</a>'
    }

    void 'appends a size modifier class'() {
        expect:
        applyTemplate('<kds:button type="primary" size="sm">Pagar</kds:button>').contains('class="kds-btn kds-btn-primary kds-btn-sm"')
    }

    void 'appends cssClass to the class list'() {
        expect:
        applyTemplate('<kds:button type="primary" cssClass="kds-flex-1">Pagar</kds:button>').contains('class="kds-btn kds-btn-primary kds-flex-1"')
    }

    void 'marks the anchor aria-disabled when disabled'() {
        expect:
        applyTemplate('<kds:button type="primary" href="/start" disabled="true">Continuar</kds:button>').contains('aria-disabled="true"')
    }
}
