package com.khipu.designsystem

import grails.testing.web.taglib.TagLibUnitTest
import spock.lang.Specification

class KdsCardTagLibSpec extends Specification implements TagLibUnitTest<KdsCardTagLib> {

    void 'defaults to the elevated variant'() {
        expect:
        applyTemplate('<kds:card>x</kds:card>') == '<article class="kds-card-elevated">x</article>'
    }

    void 'variant=outlined renders kds-card-outlined'() {
        expect:
        applyTemplate('<kds:card variant="outlined">x</kds:card>') == '<article class="kds-card-outlined">x</article>'
    }

    void 'dimmed adds kds-card-dimmed'() {
        expect:
        applyTemplate('<kds:card dimmed="true">x</kds:card>').contains('kds-card-elevated kds-card-dimmed')
    }

    void 'covers the FlowCard shape: elevated + extra layout classes via cssClass'() {
        expect:
        applyTemplate('<kds:card cssClass="kds-max-w-md kds-flex kds-flex-col kds-gap-2">x</kds:card>') ==
            '<article class="kds-card-elevated kds-max-w-md kds-flex kds-flex-col kds-gap-2">x</article>'
    }

    void 'cardHeader, cardBody and cardFooter render their own class'() {
        expect:
        applyTemplate('<kds:cardHeader>H</kds:cardHeader>') == '<div class="kds-card-header">H</div>'
        applyTemplate('<kds:cardBody>B</kds:cardBody>') == '<div class="kds-card-body">B</div>'
        applyTemplate('<kds:cardFooter>F</kds:cardFooter>') == '<div class="kds-card-footer">F</div>'
    }

    void 'the body is not escaped - markup (e.g. nested tags) passes through untouched'() {
        expect:
        applyTemplate('<kds:card><h3 class="kds-card-title">T</h3></kds:card>') ==
            '<article class="kds-card-elevated"><h3 class="kds-card-title">T</h3></article>'
    }

    void 'escapes cssClass on kds:card and the section tags'() {
        given:
        def payload = '"><script>alert(1)</script>'

        expect:
        !applyTemplate('<kds:card cssClass="${payload}">x</kds:card>', [payload: payload]).contains('<script>')
        !applyTemplate('<kds:cardBody cssClass="${payload}">x</kds:cardBody>', [payload: payload]).contains('<script>')
    }
}
