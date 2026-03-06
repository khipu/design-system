package com.khipu.designsystem

class KdsButtonTagLib {
    static namespace = 'kds'

    def button = { attrs, body ->
        def variant = attrs.remove('variant') ?: 'contained'
        def color = attrs.remove('color') ?: 'primary'
        def size = attrs.remove('size') ?: 'medium'
        def disabled = attrs.remove('disabled') == 'true'
        def type = attrs.remove('type') ?: 'button'
        def startIcon = attrs.remove('startIcon')
        def endIcon = attrs.remove('endIcon')

        def classes = "kds-button kds-button-${variant} kds-button-${color} kds-button-${size}"
        if (disabled) classes += " kds-button-disabled"

        def attrsString = attrs.collect { k, v -> "${k}=\"${v}\"" }.join(' ')

        out << "<button type=\"${type}\" class=\"${classes}\" ${disabled ? 'disabled' : ''} ${attrsString}>"
        if (startIcon) out << "<span class=\"kds-button-icon-start\">${startIcon}</span>"
        out << body()
        if (endIcon) out << "<span class=\"kds-button-icon-end\">${endIcon}</span>"
        out << "</button>"
    }
}
