package com.khipu.designsystem

class KdsTypographyTagLib {
    static namespace = 'kds'

    def typography = { attrs, body ->
        def variant = attrs.remove('variant') ?: 'body1'
        def color = attrs.remove('color') ?: 'primary'
        def classes = "kds-typography kds-typography-${variant} kds-typography-${color}"
        def attrsString = attrs.collect { k, v -> "${k}=\"${v}\"" }.join(' ')

        def tagMap = [
            h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', h5: 'h5', h6: 'h6',
            body1: 'p', body2: 'p', caption: 'span', overline: 'span'
        ]
        def tag = tagMap[variant] ?: 'span'

        out << "<${tag} class=\"${classes}\" ${attrsString}>${body()}</${tag}>"
    }
}
