package com.khipu.designsystem

/**
 * Single-paragraph alert: `<strong>lead</strong> text`, instead of a separate
 * `kds-alert-title` + description (that combination adds an extra 16px gap in
 * BeerCSS between them — KTUF-502). Default `role="status"`, not React
 * KdsAlert's `role="alert"`: this taglib targets persistent, already-on-page
 * notices (e.g. "the step order changed"), which should announce politely,
 * not interrupt like a just-appeared alert.
 */
class KdsAlertTagLib {
    static namespace = 'kds'

    private static final Map<String, String> DEFAULT_ICONS = [
        success: 'check_circle',
        info: 'info',
        warning: 'warning',
        error: 'error',
    ]

    def alert = { attrs, body ->
        String severity = attrs.remove('severity')
        String leadCode = attrs.remove('leadCode')
        // message()'s return is treated as already HTML-safe (a later .encodeAsHTML() on it
        // is a no-op), so the fallback must be pre-escaped, not relied on being escaped later.
        String lead = attrs.remove('lead') ?: (leadCode ? message(code: leadCode, default: leadCode.encodeAsHTML()) : null)
        String textCode = attrs.remove('textCode')
        String role = (attrs.remove('role') ?: 'status').toString()
        def iconAttr = attrs.remove('icon')
        boolean closable = attrs.remove('closable')?.toString() == 'true'
        def cssClass = attrs.remove('cssClass')

        String icon
        if (iconAttr?.toString() == 'false') {
            icon = null
        } else if (iconAttr) {
            icon = iconAttr.toString()
        } else {
            icon = DEFAULT_ICONS[severity]
        }

        String text = textCode ? message(code: textCode, default: textCode.encodeAsHTML()) : body()?.toString()

        def classes = ['kds-alert', "kds-${severity.encodeAsHTML()}"]
        if (cssClass) classes << cssClass.toString().encodeAsHTML()

        out << "<div class=\"${classes.join(' ')}\" role=\"${role.encodeAsHTML()}\">"
        if (icon) {
            out << "<div class=\"kds-alert-icon\"><i class=\"material-symbols-outlined\">${icon.encodeAsHTML()}</i></div>"
        }
        out << '<div class="kds-alert-content">'
        out << '<p class="kds-alert-description">'
        if (lead) out << "<strong>${lead.toString().encodeAsHTML()}</strong> "
        if (text) out << text.encodeAsHTML()
        out << '</p>'
        out << '</div>'
        if (closable) {
            out << '<button type="button" class="kds-alert-close" aria-label="Cerrar">'
            out << '<i class="material-symbols-outlined">close</i>'
            out << '</button>'
        }
        out << '</div>'
    }
}
