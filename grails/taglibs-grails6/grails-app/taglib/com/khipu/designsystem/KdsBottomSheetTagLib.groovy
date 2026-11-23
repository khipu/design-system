package com.khipu.designsystem

/**
 * Bottom-sheet dialog (PR #10, stories 13/14: confirm cancel, confirm an
 * invalidating change). Hidden by default; the `khipu-init.js` bundle
 * (`Khipu.initSheets`) opens/closes it — this taglib only emits the
 * `data-open-sheet`/`data-close-sheet`/`data-sheet-dismissible` attributes
 * for it to act on, no JS of its own. The trigger button elsewhere on the
 * page needs `data-open-sheet="<id>"`; a close button inside needs
 * `data-close-sheet`.
 *
 * The body (optional extra content + the actions row) is written directly
 * by the caller — same as `kds:button`'s body, it is NOT escaped, since it
 * carries markup (e.g. `kds:button`/`g:form` calls for the actions).
 */
class KdsBottomSheetTagLib {
    static namespace = 'kds'

    def bottomSheet = { attrs, body ->
        String id = attrs.remove('id')
        String title = attrs.remove('title')
        String description = attrs.remove('description')
        boolean dismissible = (attrs.remove('dismissible') ?: 'true').toString() != 'false'
        def cssClass = attrs.remove('cssClass')
        String titleId = "${id}-title"

        def scrimClasses = ['kds-bottom-sheet-scrim', 'kds-bottom-sheet-scrim--dialog', 'open']
        if (cssClass) scrimClasses << cssClass.toString().encodeAsHTML()

        out << "<div class=\"${scrimClasses.join(' ')}\" id=\"${id?.toString()?.encodeAsHTML()}\" hidden"
        if (!dismissible) out << ' data-sheet-dismissible="false"'
        out << '>'
        out << "<div class=\"kds-bottom-sheet kds-bottom-sheet--dialog\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"${titleId.encodeAsHTML()}\">"
        out << "<h2 class=\"kds-bottom-sheet-title\" id=\"${titleId.encodeAsHTML()}\">${title?.toString()?.encodeAsHTML()}</h2>"
        if (description) out << "<p class=\"kds-bottom-sheet-description\">${description.toString().encodeAsHTML()}</p>"
        out << body()
        out << '</div>'
        out << '</div>'
    }
}
