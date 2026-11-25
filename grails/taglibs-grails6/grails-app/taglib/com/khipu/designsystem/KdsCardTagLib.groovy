package com.khipu.designsystem

/**
 * Port of `KdsCard.tsx`: `<article class="kds-card-elevated|kds-card-outlined">`.
 * The onboarding flow's "FlowCard" wrapper
 * (`kds-card-elevated kds-max-w-md kds-flex kds-flex-col kds-gap-2`) is just this,
 * `variant="elevated"` (the default) plus the extra layout classes via `cssClass` -
 * no new variant/class invented for it.
 *
 * The body is NOT escaped (same as `kds:button`/`kds:bottomSheet`): it carries markup,
 * typically `kds:cardHeader`/`kds:cardBody`/`kds:cardFooter` or other `kds:*` tags.
 */
class KdsCardTagLib {
    static namespace = 'kds'

    def card = { attrs, body ->
        String variant = (attrs.remove('variant') ?: 'elevated').toString()
        boolean dimmed = attrs.remove('dimmed')?.toString() == 'true'
        def cssClass = attrs.remove('cssClass')

        def classes = [variant == 'elevated' ? 'kds-card-elevated' : 'kds-card-outlined']
        if (dimmed) classes << 'kds-card-dimmed'
        if (cssClass) classes << cssClass.toString().encodeAsHTML()

        out << "<article class=\"${classes.join(' ')}\">"
        out << body()
        out << '</article>'
    }

    def cardHeader = { attrs, body -> out << section('kds-card-header', attrs, body) }

    def cardBody = { attrs, body -> out << section('kds-card-body', attrs, body) }

    def cardFooter = { attrs, body -> out << section('kds-card-footer', attrs, body) }

    private String section(String baseClass, Map attrs, Closure body) {
        def cssClass = attrs.remove('cssClass')
        def classes = [baseClass]
        if (cssClass) classes << cssClass.toString().encodeAsHTML()
        "<div class=\"${classes.join(' ')}\">${body()}</div>"
    }
}
