package com.khipu.designsystem

import grails.testing.web.taglib.TagLibUnitTest
import spock.lang.Specification
import spock.lang.Unroll

class KdsRecapListTagLibSpec extends Specification implements TagLibUnitTest<KdsRecapListTagLib> {

    @Unroll
    void 'class combination #layout/#boxed -> #expectedClass'() {
        given:
        def items = [[label: 'A', value: 'B']]

        expect:
        def html = applyTemplate(
            '<kds:recapList items="${items}" layout="${layout}" boxed="${boxed}"/>',
            [items: items, layout: layout, boxed: boxed]
        )
        html.startsWith("<ul class=\"${expectedClass}\">")

        where:
        layout     | boxed   | expectedClass
        'inline'   | 'false' | 'kds-recap-list'
        'columns'  | 'false' | 'kds-recap-list kds-recap-list--columns'
        'inline'   | 'true'  | 'kds-recap-list kds-recap-list--boxed'
        'columns'  | 'true'  | 'kds-recap-list kds-recap-list--columns kds-recap-list--boxed'
    }

    void 'renders label and value'() {
        expect:
        def items = [[label: 'RUT', value: '11.111.111-1']]
        applyTemplate('<kds:recapList items="${items}"/>', [items: items])
            .contains('<span class="kds-key">RUT</span><span class="kds-value">11.111.111-1</span>')
    }

    void 'a placeholder renders with the placeholder class when there is no value'() {
        expect:
        def items = [[label: 'Dirección', placeholder: 'No informado']]
        applyTemplate('<kds:recapList items="${items}"/>', [items: items])
            .contains('<span class="kds-value placeholder">No informado</span>')
    }

    void 'with neither value nor placeholder, renders a dash'() {
        expect:
        def items = [[label: 'Giro']]
        applyTemplate('<kds:recapList items="${items}"/>', [items: items])
            .contains('<span class="kds-value">-</span>')
    }

    void 'an empty items list renders an empty ul'() {
        expect:
        applyTemplate('<kds:recapList items="${items}"/>', [items: []]) == '<ul class="kds-recap-list"></ul>'
    }

    void 'escapes label and value, including a script payload'() {
        given:
        def payload = '<script>alert(1)</script>'
        def items = [[label: payload, value: payload]]

        expect:
        !applyTemplate('<kds:recapList items="${items}"/>', [items: items]).contains('<script>')
    }

    void 'labelCode and placeholderCode resolve their messages'() {
        given:
        messageSource.addMessage('recap.label', Locale.ENGLISH, 'Teléfono')
        messageSource.addMessage('recap.empty', Locale.ENGLISH, 'No informado')
        def items = [[labelCode: 'recap.label', placeholderCode: 'recap.empty']]

        expect:
        applyTemplate('<kds:recapList items="${items}"/>', [items: items])
            .contains('<span class="kds-key">Teléfono</span><span class="kds-value placeholder">No informado</span>')
    }

    void 'a missing labelCode / placeholderCode falls back to the code itself, escaped'() {
        given:
        def code = 'missing.<b>code</b>'
        def items = [[labelCode: code, placeholderCode: code]]

        expect:
        def html = applyTemplate('<kds:recapList items="${items}"/>', [items: items])
        html.contains('missing.&lt;b&gt;code&lt;/b&gt;')
        !html.contains('<b>')
    }

    @Unroll
    void 'boxed as a real Boolean (#boxed) -> #expectedClass'() {
        given:
        def items = [[label: 'A', value: 'B']]

        expect:
        applyTemplate('<kds:recapList items="${items}" boxed="${boxed}"/>', [items: items, boxed: boxed])
            .startsWith("<ul class=\"${expectedClass}\">")

        where:
        boxed | expectedClass
        true  | 'kds-recap-list kds-recap-list--boxed'
        false | 'kds-recap-list'
    }
}
