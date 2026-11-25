package com.khipu.designsystem

import grails.testing.web.taglib.TagLibUnitTest
import spock.lang.Specification

class KdsDividerTagLibSpec extends Specification implements TagLibUnitTest<KdsDividerTagLib> {

    void 'no label renders a plain hr'() {
        expect:
        applyTemplate('<kds:divider/>') == '<hr class="kds-hr"/>'
    }

    void 'dashed renders kds-hr-dashed'() {
        expect:
        applyTemplate('<kds:divider dashed="true"/>') == '<hr class="kds-hr-dashed"/>'
    }

    void 'a label renders the text divider, ignoring dashed'() {
        expect:
        applyTemplate('<kds:divider label="o" dashed="true"/>') ==
            '<div class="kds-divider-text"><span>o</span></div>'
    }

    void 'labelCode resolves the message'() {
        expect:
        applyTemplate('<kds:divider labelCode="some.missing.code"/>')
            .contains('<span>some.missing.code</span>')
    }

    void 'an empty string label falls back to the plain hr'() {
        expect:
        applyTemplate('<kds:divider label=""/>') == '<hr class="kds-hr"/>'
    }

    void 'a real boolean false falls back to the plain hr, like label={cond && \'o\'}'() {
        expect:
        applyTemplate('<kds:divider label="${flag}"/>', [flag: false]) == '<hr class="kds-hr"/>'
    }

    void 'a real boolean true also falls back to the plain hr'() {
        expect:
        applyTemplate('<kds:divider label="${flag}"/>', [flag: true]) == '<hr class="kds-hr"/>'
    }

    void 'escapes the label text'() {
        given:
        def payload = '<script>alert(1)</script>'

        expect:
        !applyTemplate('<kds:divider label="${payload}"/>', [payload: payload]).contains('<script>')
    }

    void 'escapes cssClass on both outputs'() {
        given:
        def payload = '"><script>alert(1)</script>'

        expect:
        !applyTemplate('<kds:divider cssClass="${payload}"/>', [payload: payload]).contains('<script>')
        !applyTemplate('<kds:divider label="x" cssClass="${payload}"/>', [payload: payload]).contains('<script>')
    }
}
