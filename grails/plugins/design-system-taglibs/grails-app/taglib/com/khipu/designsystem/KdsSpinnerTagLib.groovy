package com.khipu.designsystem

class KdsSpinnerTagLib {
    static namespace = 'kds'

    def spinner = { attrs, body ->
        def size = attrs.remove('size') ?: 'medium'
        def color = attrs.remove('color') ?: 'primary'
        def label = attrs.remove('label') ?: 'Cargando...'

        def classes = "kds-spinner kds-spinner-${size} kds-spinner-${color}"
        def attrsString = attrs.collect { k, v -> "${k}=\"${v}\"" }.join(' ')

        out << "<div class=\"kds-spinner-wrapper\" role=\"progressbar\" aria-label=\"${label}\" ${attrsString}>"
        out << "<div class=\"${classes}\"></div>"
        out << "</div>"
    }
}
