package com.khipu.designsystem

class KdsCardTagLib {
    static namespace = 'kds'

    def card = { attrs, body ->
        def variant = attrs.remove('variant') ?: 'elevation'
        def selected = attrs.remove('selected') == 'true'
        def classes = "kds-card kds-card-${variant}"
        if (selected) classes += " kds-card-selected"
        def attrsString = attrs.collect { k, v -> "${k}=\"${v}\"" }.join(' ')
        out << "<div class=\"${classes}\" ${attrsString}>${body()}</div>"
    }

    def cardHeader = { attrs, body ->
        def title = attrs.remove('title') ?: ''
        def subtitle = attrs.remove('subtitle') ?: ''
        out << "<div class=\"kds-card-header\">"
        if (body) {
            out << body()
        } else {
            if (title) out << "<h3 class=\"kds-card-title\">${title}</h3>"
            if (subtitle) out << "<p class=\"kds-card-subtitle\">${subtitle}</p>"
        }
        out << "</div>"
    }

    def cardContent = { attrs, body ->
        out << "<div class=\"kds-card-content\">${body()}</div>"
    }

    def cardActions = { attrs, body ->
        out << "<div class=\"kds-card-actions\">${body()}</div>"
    }
}
