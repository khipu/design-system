package com.khipu.designsystem

/**
 * Port of `KdsProgressChecklist.tsx`: a list of steps that advance
 * pending -> active -> done (or error). The polling that drives `status`
 * (`validationStatus`) is payment's own view JS, not this taglib.
 */
class KdsProgressChecklistTagLib {
    static namespace = 'kds'

    def progressChecklist = { attrs ->
        List<Map> steps = attrs.remove('steps') ?: []
        def cssClass = attrs.remove('cssClass')

        def classes = ['kds-progress-checklist']
        if (cssClass) classes << cssClass.toString().encodeAsHTML()

        out << "<ul class=\"${classes.join(' ')}\" aria-live=\"polite\">"
        steps.each { step -> out << renderStep(step) }
        out << '</ul>'
    }

    private String renderStep(Map step) {
        String status = step.status?.toString() ?: 'pending'
        String label = step.label?.toString() ?:
            (step.labelCode ? message(code: step.labelCode.toString(), default: step.labelCode.toString().encodeAsHTML()) : '')
        // Grails treats message()'s return as already HTML-safe, so a later
        // .encodeAsHTML() call on it is a no-op (prevents double-encoding legitimate
        // translated text) - any tainted value used as `default:` must be escaped
        // BEFORE this call, not after.
        String statusText = message(code: "validation.status.${status}", default: status.encodeAsHTML())
        String ariaCurrent = status == 'active' ? ' aria-current="step"' : ''

        def sb = new StringBuilder()
        sb << "<li class=\"kds-progress-checklist-item kds-progress-checklist-item--${status.encodeAsHTML()}\"${ariaCurrent}>"
        sb << '<span class="kds-progress-checklist-mark" aria-hidden="true">'
        switch (status) {
            case 'done':
                sb << '<i class="material-symbols-outlined">check</i>'
                break
            case 'error':
                sb << '<i class="material-symbols-outlined">error</i>'
                break
            case 'active':
                sb << '<span class="kds-dots-loader"><span></span><span></span><span></span></span>'
                break
            case 'pending':
                sb << '<span class="kds-progress-checklist-dot"></span>'
                break
            // An unrecognized status renders an empty mark rather than failing.
        }
        sb << '</span>'
        sb << "<span class=\"kds-progress-checklist-label\">${label.encodeAsHTML()}</span>"
        sb << "<span class=\"kds-progress-checklist-status\">: ${statusText.encodeAsHTML()}</span>"
        sb << '</li>'
        sb.toString()
    }
}
