package com.khipu.designsystem

import grails.testing.web.taglib.TagLibUnitTest
import spock.lang.Specification

class KdsProgressChecklistTagLibSpec extends Specification implements TagLibUnitTest<KdsProgressChecklistTagLib> {

    void 'renders the right mark per status'() {
        given:
        def steps = [
            [key: 'a', label: 'A', status: 'done'],
            [key: 'b', label: 'B', status: 'active'],
            [key: 'c', label: 'C', status: 'pending'],
            [key: 'd', label: 'D', status: 'error'],
        ]

        expect:
        def html = applyTemplate('<kds:progressChecklist steps="${steps}"/>', [steps: steps])
        html.contains('<i class="material-symbols-outlined">check</i>')
        html.contains('<span class="kds-dots-loader"><span></span><span></span><span></span></span>')
        html.contains('<span class="kds-progress-checklist-dot"></span>')
        html.contains('<i class="material-symbols-outlined">error</i>')
    }

    void 'aria-current=step only on the active item'() {
        given:
        def steps = [
            [key: 'a', label: 'A', status: 'done'],
            [key: 'b', label: 'B', status: 'active'],
            [key: 'c', label: 'C', status: 'pending'],
        ]

        when:
        def html = applyTemplate('<kds:progressChecklist steps="${steps}"/>', [steps: steps])

        then:
        (html =~ /aria-current="step"/).findAll().size() == 1
        html.contains('kds-progress-checklist-item--active" aria-current="step"')
    }

    void 'an unknown status does not break rendering'() {
        given:
        def steps = [[key: 'a', label: 'A', status: 'weird']]

        expect:
        def html = applyTemplate('<kds:progressChecklist steps="${steps}"/>', [steps: steps])
        html.contains('kds-progress-checklist-item--weird')
        html.contains('<span class="kds-progress-checklist-mark" aria-hidden="true"></span>')
    }

    void 'labelCode resolves the message when label is absent'() {
        given:
        def steps = [[key: 'a', labelCode: 'some.missing.code', status: 'pending']]

        expect:
        applyTemplate('<kds:progressChecklist steps="${steps}"/>', [steps: steps])
            .contains('<span class="kds-progress-checklist-label">some.missing.code</span>')
    }

    void 'escapes key, label and status'() {
        given:
        def payload = '"><script>alert(1)</script>'
        def steps = [[key: payload, label: payload, status: payload]]

        expect:
        !applyTemplate('<kds:progressChecklist steps="${steps}"/>', [steps: steps]).contains('<script>')
    }
}
