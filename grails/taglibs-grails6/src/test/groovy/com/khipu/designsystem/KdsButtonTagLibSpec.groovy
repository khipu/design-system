package com.khipu.designsystem

import grails.testing.web.taglib.TagLibUnitTest
import spock.lang.Specification

class KdsButtonTagLibSpec extends Specification implements TagLibUnitTest<KdsButtonTagLib> {

    void 'renders a button element by default'() {
        expect:
        applyTemplate('<kds:button variant="contained" color="primary">Pagar</kds:button>') ==
            '<button type="button" class="kds-button kds-button-contained kds-button-primary kds-button-medium" >Pagar</button>'
    }

    void 'renders an anchor element when href is set'() {
        expect:
        applyTemplate('<kds:button variant="contained" color="primary" href="/start">Continuar</kds:button>') ==
            '<a href="/start" class="kds-button kds-button-contained kds-button-primary kds-button-medium" >Continuar</a>'
    }

    void 'appends cssClass to the class list'() {
        expect:
        applyTemplate('<kds:button cssClass="kds-flex-1">Pagar</kds:button>').contains('class="kds-button kds-button-contained kds-button-primary kds-button-medium kds-flex-1"')
    }

    void 'marks the anchor aria-disabled when disabled'() {
        expect:
        applyTemplate('<kds:button href="/start" disabled="true">Continuar</kds:button>').contains('aria-disabled="true"')
    }
}
