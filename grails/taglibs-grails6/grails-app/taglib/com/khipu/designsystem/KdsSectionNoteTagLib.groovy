package com.khipu.designsystem

class KdsSectionNoteTagLib {
    static namespace = 'kds'

    def sectionNote = { attrs, body ->
        String icon = (attrs.remove('icon') ?: 'info').toString()
        String tone = attrs.remove('tone')
        String textCode = attrs.remove('textCode')
        def cssClass = attrs.remove('cssClass')

        // message()'s return is treated as already HTML-safe (a later .encodeAsHTML() on it
        // is a no-op), so the fallback must be pre-escaped, not relied on being escaped later.
        String text = textCode ? message(code: textCode, default: textCode.encodeAsHTML()) : body()?.toString()

        def classes = ['kds-section-note']
        if (tone) classes << "kds-${tone.encodeAsHTML()}"
        if (cssClass) classes << cssClass.toString().encodeAsHTML()

        out << "<p class=\"${classes.join(' ')}\">"
        out << "<i class=\"material-symbols-outlined\" aria-hidden=\"true\">${icon.encodeAsHTML()}</i>"
        out << "<span>${text?.encodeAsHTML() ?: ''}</span>"
        out << '</p>'
    }
}
