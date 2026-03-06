package com.khipu.designsystem

class KdsTabsTagLib {
    static namespace = 'kds'

    def tabs = { attrs, body ->
        out << "<div class=\"kds-tabs\">${body()}</div>"
    }

    def tab = { attrs, body ->
        def label = attrs.remove('label') ?: ''
        def value = attrs.remove('value') ?: ''
        def selected = attrs.remove('selected') == 'true'
        def disabled = attrs.remove('disabled') == 'true'

        def classes = "kds-tab"
        if (selected) classes += " kds-tab-selected"
        if (disabled) classes += " kds-tab-disabled"

        out << "<div class=\"${classes}\" data-value=\"${value}\">"
        out << "<button class=\"kds-tab-button\" ${disabled ? 'disabled' : ''}>${label}</button>"
        if (body) out << "<div class=\"kds-tab-panel\">${body()}</div>"
        out << "</div>"
    }
}
