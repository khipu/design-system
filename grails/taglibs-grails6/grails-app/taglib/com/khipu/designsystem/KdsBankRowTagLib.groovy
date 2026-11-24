package com.khipu.designsystem

/**
 * Link variant of `KdsBankRow` (KTUF-529): a navigational row, not the
 * selectable button the React component also renders — no logo, always
 * `chevron_right`. Used for "your drafts in progress" (PR #10, story 11),
 * each row linking back to the draft's next pending screen.
 *
 * Wrap several in a plain `<div class="kds-bank-list">` — without
 * `role="list"`, since these are links, not list items.
 */
class KdsBankRowTagLib {
    static namespace = 'kds'

    def bankRow = { attrs ->
        String href = attrs.remove('href')
        String title = attrs.remove('title')
        String meta = attrs.remove('meta')
        def cssClass = attrs.remove('cssClass')

        def classes = ['kds-bank-row']
        if (cssClass) classes << cssClass.toString().encodeAsHTML()

        out << "<a class=\"${classes.join(' ')}\" href=\"${href?.toString()?.encodeAsHTML()}\">"
        out << '<span class="kds-bank-row-name">'
        out << '<span class="kds-flex kds-flex-col">'
        out << "<span>${title?.toString()?.encodeAsHTML()}</span>"
        if (meta) out << "<span class=\"kds-text-body-small kds-text-secondary\">${meta.toString().encodeAsHTML()}</span>"
        out << '</span>'
        out << '</span>'
        out << '<i class="material-symbols-outlined" aria-hidden="true">chevron_right</i>'
        out << '</a>'
    }
}
