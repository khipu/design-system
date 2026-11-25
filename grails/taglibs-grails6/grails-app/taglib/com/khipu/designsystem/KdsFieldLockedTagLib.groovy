package com.khipu.designsystem

/**
 * Port of the read-only variant of `KdsTextField.tsx` (`readOnly` ->
 * `.field.locked` with a lock icon). Payment's existing `mat:fieldLocked`
 * has two gaps this fixes: it doesn't escape `id`/`name`, and it sets
 * `tabindex="-1"` on the input - `.field.locked`'s CSS keeps a visible focus
 * indicator specifically because a locked field must stay reachable by Tab
 * (it's still something the user has to read, not a disabled control).
 *
 * `name` is omitted by default: verified data (SII/bank identity) shouldn't
 * travel in the form at all, so a controller can't be tricked into
 * accepting it from a hand-crafted POST. Pass `name` explicitly only for a
 * field that genuinely needs to submit.
 */
class KdsFieldLockedTagLib {
    static namespace = 'kds'

    def fieldLocked = { attrs ->
        String label = attrs.remove('label')?.toString() ?:
            (attrs.remove('labelCode') ?: '').with { it ? message(code: it.toString(), default: it.toString().encodeAsHTML()) : '' }
        // Derived from the label, same as KdsTextField.tsx's fallback id - deterministic,
        // no shared mutable state (a static counter would leak across requests/threads).
        String id = attrs.remove('id')?.toString() ?: "kds-field-${label.toLowerCase().replaceAll(/\s+/, '-')}"
        String value = attrs.remove('value')?.toString() ?: ''
        boolean group = attrs.remove('group')?.toString() == 'true'
        String name = attrs.remove('name')?.toString()
        def cssClass = attrs.remove('cssClass')

        def classes = ['field', 'label', 'border', 'locked']
        if (group) classes << 'kds-field-group'
        if (cssClass) classes << cssClass.toString().encodeAsHTML()

        String idEsc = id.encodeAsHTML()

        out << "<div class=\"${classes.join(' ')}\">"
        out << "<input type=\"text\" id=\"${idEsc}\""
        if (name) out << " name=\"${name.encodeAsHTML()}\""
        out << " value=\"${value.encodeAsHTML()}\" readonly aria-readonly=\"true\">"
        out << "<label for=\"${idEsc}\" class=\"active\">${label.encodeAsHTML()}</label>"
        out << '<i class="material-symbols-outlined" aria-hidden="true">lock</i>'
        out << '</div>'
    }
}
