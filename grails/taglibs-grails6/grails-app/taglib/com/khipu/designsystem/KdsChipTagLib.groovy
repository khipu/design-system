package com.khipu.designsystem

/**
 * Port of `KdsChip.tsx` (badge). No `onDelete`/close-button support here -
 * none of the current onboarding use cases need it, and it would need a
 * client-side handler this taglib can't provide.
 */
class KdsChipTagLib {
    static namespace = 'kds'

    def chip = { attrs, body ->
        String color = attrs.remove('color')
        String icon = attrs.remove('icon')
        String textCode = attrs.remove('textCode')
        def cssClass = attrs.remove('cssClass')

        String text = textCode ? message(code: textCode, default: textCode.encodeAsHTML()) : body()?.toString()

        def classes = ['kds-badge']
        if (color) classes << color.encodeAsHTML()
        if (cssClass) classes << cssClass.toString().encodeAsHTML()

        out << "<span class=\"${classes.join(' ')}\">"
        if (icon) out << "<i class=\"material-symbols-outlined\">${icon.encodeAsHTML()}</i>"
        out << "<span>${text?.encodeAsHTML() ?: ''}</span>"
        out << '</span>'
    }
}
