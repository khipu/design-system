package com.khipu.designsystem

class KdsButtonTagLib {
    static namespace = 'kds'

    def button = { attrs, body ->
        def variant = attrs.remove('variant') ?: 'contained'
        def color = attrs.remove('color') ?: 'primary'
        def size = attrs.remove('size') ?: 'medium'
        def disabled = attrs.remove('disabled') == 'true'
        def type = attrs.remove('type') ?: 'button'
        def href = attrs.remove('href')
        def cssClass = attrs.remove('cssClass')

        def classes = "kds-button kds-button-${variant} kds-button-${color} kds-button-${size}"
        if (disabled) classes += ' kds-button-disabled'
        if (cssClass) classes += " ${cssClass}"

        def attrsString = attrs.collect { k, v -> "${k}=\"${v}\"" }.join(' ')

        if (href) {
            out << "<a href=\"${href}\" class=\"${classes}\"${disabled ? ' aria-disabled="true"' : ''} ${attrsString}>"
            out << body()
            out << '</a>'
        } else {
            out << "<button type=\"${type}\" class=\"${classes}\"${disabled ? ' disabled' : ''} ${attrsString}>"
            out << body()
            out << '</button>'
        }
    }
}
