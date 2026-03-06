package com.khipu.designsystem

class KdsCheckboxTagLib {
    static namespace = 'kds'

    def checkbox = { attrs, body ->
        def name = attrs.remove('name') ?: ''
        def label = attrs.remove('label') ?: ''
        def checked = attrs.remove('checked') == 'true'
        def disabled = attrs.remove('disabled') == 'true'
        def required = attrs.remove('required') == 'true'
        def value = attrs.remove('value') ?: 'true'

        def classes = "kds-checkbox"
        if (disabled) classes += " kds-checkbox-disabled"
        def attrsString = attrs.collect { k, v -> "${k}=\"${v}\"" }.join(' ')

        out << "<label class=\"kds-checkbox-label\">"
        out << "<input type=\"checkbox\" name=\"${name}\" value=\"${value}\" class=\"${classes}\" ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''} ${required ? 'required' : ''} ${attrsString}/>"
        out << "<span class=\"kds-checkbox-text\">${label ?: body()}</span>"
        out << "</label>"
    }
}
