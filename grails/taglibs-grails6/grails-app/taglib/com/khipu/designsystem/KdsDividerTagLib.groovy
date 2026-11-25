package com.khipu.designsystem

/**
 * Port of `KdsDivider.tsx`. `null`/`''`/a real Boolean (`true` or `false`,
 * e.g. from `label="${cond ? 'o' : false}"`) all render the plain `<hr>`,
 * same as React does for a falsy/boolean `label` - so a conditional label
 * expression is safe without an extra check from the caller.
 */
class KdsDividerTagLib {
    static namespace = 'kds'

    def divider = { attrs ->
        def labelAttr = attrs.remove('label')
        String labelCode = attrs.remove('labelCode')
        boolean dashed = attrs.remove('dashed')?.toString() == 'true'
        def cssClass = attrs.remove('cssClass')

        String label = resolveLabel(labelAttr, labelCode)

        def classes = []
        if (label) {
            classes << 'kds-divider-text'
            if (cssClass) classes << cssClass.toString().encodeAsHTML()
            out << "<div class=\"${classes.join(' ')}\"><span>${label.encodeAsHTML()}</span></div>"
        } else {
            classes << (dashed ? 'kds-hr-dashed' : 'kds-hr')
            if (cssClass) classes << cssClass.toString().encodeAsHTML()
            out << "<hr class=\"${classes.join(' ')}\"/>"
        }
    }

    private String resolveLabel(labelAttr, String labelCode) {
        if (labelAttr instanceof Boolean) return null
        if (labelAttr != null) {
            String s = labelAttr.toString()
            return s == '' ? null : s
        }
        return labelCode ? message(code: labelCode, default: labelCode.encodeAsHTML()) : null
    }
}
