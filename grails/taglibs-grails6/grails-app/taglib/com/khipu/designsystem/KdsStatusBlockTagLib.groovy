package com.khipu.designsystem

class KdsStatusBlockTagLib {
    static namespace = 'kds'

    def statusBlock = { attrs ->
        def status = attrs.remove('status')
        def icon = attrs.remove('icon')
        def title = attrs.remove('title')
        def description = attrs.remove('description')
        def cssClass = attrs.remove('cssClass')

        def classes = ['kds-status-block']
        if (cssClass) classes << cssClass.toString().encodeAsHTML()

        out << "<div class=\"${classes.join(' ')}\" data-status=\"${status?.toString()?.encodeAsHTML()}\">"
        out << '<div class="kds-status-block-icon">'
        if (icon) out << "<i class=\"material-symbols-outlined\">${icon.toString().encodeAsHTML()}</i>"
        out << '</div>'
        out << '<div>'
        out << "<h2 class=\"kds-status-block-title\">${title?.toString()?.encodeAsHTML()}</h2>"
        if (description) out << "<p class=\"kds-status-block-description\">${description.toString().encodeAsHTML()}</p>"
        out << '</div>'
        out << '</div>'
    }
}
