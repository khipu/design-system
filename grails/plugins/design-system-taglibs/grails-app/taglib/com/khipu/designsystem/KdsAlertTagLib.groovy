package com.khipu.designsystem

class KdsAlertTagLib {
    static namespace = 'kds'

    def alert = { attrs, body ->
        def severity = attrs.remove('severity') ?: 'info'
        def variant = attrs.remove('variant') ?: 'standard'
        def classes = "kds-alert kds-alert-${severity} kds-alert-${variant}"
        def attrsString = attrs.collect { k, v -> "${k}=\"${v}\"" }.join(' ')
        out << "<div class=\"${classes}\" role=\"alert\" ${attrsString}>${body()}</div>"
    }
}
