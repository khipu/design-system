package com.khipu.designsystem

class KdsTextFieldTagLib {
    static namespace = 'kds'

    def textField = { attrs, body ->
        def name = attrs.remove('name') ?: ''
        def label = attrs.remove('label') ?: ''
        def variant = attrs.remove('variant') ?: 'outlined'
        def type = attrs.remove('type') ?: 'text'
        def value = attrs.remove('value') ?: ''
        def placeholder = attrs.remove('placeholder') ?: ''
        def required = attrs.remove('required') == 'true'
        def disabled = attrs.remove('disabled') == 'true'
        def error = attrs.remove('error') == 'true'
        def helperText = attrs.remove('helperText') ?: ''
        def fullWidth = attrs.remove('fullWidth') == 'true'

        def classes = "kds-textfield kds-textfield-${variant}"
        if (error) classes += " kds-textfield-error"
        if (disabled) classes += " kds-textfield-disabled"
        if (fullWidth) classes += " kds-textfield-fullwidth"

        def attrsString = attrs.collect { k, v -> "${k}=\"${v}\"" }.join(' ')

        out << "<div class=\"kds-textfield-wrapper\">"
        if (label) out << "<label class=\"kds-textfield-label\" for=\"${name}\">${label}${required ? ' *' : ''}</label>"
        out << "<input type=\"${type}\" name=\"${name}\" id=\"${name}\" class=\"${classes}\" value=\"${value}\" placeholder=\"${placeholder}\" ${required ? 'required' : ''} ${disabled ? 'disabled' : ''} ${attrsString}/>"
        if (helperText) out << "<span class=\"kds-textfield-helper ${error ? 'kds-textfield-helper-error' : ''}\">${helperText}</span>"
        out << "</div>"
    }
}
