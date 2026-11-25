package com.khipu.designsystem

/**
 * Port of `KdsRecapList.tsx`: label/value rows, e.g. the onboarding review
 * summary. `layout="columns"` for long values (label at 38%, value next to
 * it); `boxed` frames the whole list (same surface as `.kds-summary-panel`),
 * for a highlighted fact like the risk cap or a case number.
 */
class KdsRecapListTagLib {
    static namespace = 'kds'

    def recapList = { attrs ->
        List<Map> items = attrs.remove('items') ?: []
        String layout = (attrs.remove('layout') ?: 'inline').toString()
        boolean boxed = attrs.remove('boxed')?.toString() == 'true'
        def cssClass = attrs.remove('cssClass')

        def classes = ['kds-recap-list']
        if (layout == 'columns') classes << 'kds-recap-list--columns'
        if (boxed) classes << 'kds-recap-list--boxed'
        if (cssClass) classes << cssClass.toString().encodeAsHTML()

        out << "<ul class=\"${classes.join(' ')}\">"
        items.each { item -> out << renderItem(item) }
        out << '</ul>'
    }

    private String renderItem(Map item) {
        String label = item.label?.toString() ?: (item.labelCode ? message(code: item.labelCode.toString(), default: item.labelCode.toString().encodeAsHTML()) : '')
        String value = item.value?.toString()
        String placeholder = item.placeholder?.toString() ?: (item.placeholderCode ? message(code: item.placeholderCode.toString(), default: item.placeholderCode.toString().encodeAsHTML()) : null)

        String valueClass = (!value && placeholder) ? 'kds-value placeholder' : 'kds-value'
        String valueText = value ?: placeholder ?: '-'

        "<li><span class=\"kds-key\">${label.encodeAsHTML()}</span><span class=\"${valueClass}\">${valueText.encodeAsHTML()}</span></li>"
    }
}
