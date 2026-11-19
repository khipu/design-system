package com.khipu.designsystem

class KdsStepperTagLib {
    static namespace = 'kds'

    private static final Map<String, String> DEFAULT_STATUS_LABELS = [
        completed: 'completado',
        skipped: 'omitido',
        optional: 'Opcional',
    ]

    def stepper = { attrs ->
        List steps = attrs.remove('steps') ?: []
        def current = attrs.remove('current')
        boolean numbered = attrs.remove('numbered') == 'true'
        boolean primary = attrs.remove('color') == 'primary'
        boolean currentLabelOnly = attrs.remove('currentLabelOnly') == 'true'
        Map statusLabels = DEFAULT_STATUS_LABELS + (Map) (attrs.remove('statusLabels') ?: [:])
        def cssClass = attrs.remove('cssClass')

        def classes = ['kds-stepper']
        if (numbered) classes << 'kds-stepper--numbered'
        if (primary) classes << 'kds-stepper--primary'
        if (currentLabelOnly) classes << 'kds-stepper--current-label'
        if (cssClass) classes << cssClass

        out << "<div class=\"${classes.join(' ')}\">"
        steps.eachWithIndex { step, i ->
            out << renderStep(step, i, current, numbered, statusLabels)
        }
        out << '</div>'
    }

    private String deriveStatus(int index, current) {
        if (current == null) return 'pending'
        int cur = current as int
        if (index < cur) return 'completed'
        return index == cur ? 'current' : 'pending'
    }

    /**
     * Same-site check for step links: relative paths, or http(s) URLs on the request's own
     * origin. Mirrors isSameSiteHref from the React KdsStepper (KdsStepper.tsx): strips
     * tab/newline/CR first (so "java\tscript:" and "\njavascript:" normalize to
     * "javascript:" before the scheme check, same as a browser's URL parser), and
     * backslash-to-slash (so "/\\evil.example" resolves as the network-path reference
     * "//evil.example" instead of a same-origin path).
     */
    private String sameSiteHref(String href) {
        if (!href?.trim()) return null
        def cleaned = href.replaceAll(/[\t\n\r]/, '').replace('\\', '/').trim()
        if (!cleaned) return null
        try {
            def base = new URI("${request.scheme}://${request.serverName}:${request.serverPort}/")
            def resolved = base.resolve(new URI(cleaned))
            def scheme = resolved.scheme?.toLowerCase()
            if (scheme != 'http' && scheme != 'https') return null
            if (!resolved.host?.equalsIgnoreCase(base.host)) return null
            if (effectivePort(resolved) != effectivePort(base)) return null
            return href.trim()
        } catch (Exception ignored) {
            return null
        }
    }

    // java.net.URI leaves an unspecified port as -1 instead of filling in the scheme's
    // default (80/443), unlike the WHATWG URL used by isSameSiteHref in KdsStepper.tsx,
    // which normalizes it away from `origin`; without this, a same-origin absolute URL
    // that omits an explicit default port would be rejected as cross-origin.
    private int effectivePort(URI uri) {
        if (uri.port != -1) return uri.port
        return uri.scheme?.toLowerCase() == 'https' ? 443 : 80
    }

    private String renderStep(step, int index, current, boolean numbered, Map statusLabels) {
        String label = (step.label ?: '').toString()
        String status = step.status != null ? step.status.toString().toLowerCase() : deriveStatus(index, current)
        boolean optional = step.optional == true || step.optional == 'true' ||
            step.requirement?.toString() == 'OPTIONAL'
        boolean done = status == 'completed' || status == 'skipped'
        String href = done ? sameSiteHref(step.href?.toString()) : null
        boolean interactive = done && href != null
        String statusText = done ? statusLabels[status] : null

        def stepClasses = ['kds-step']
        if (status == 'completed') stepClasses << 'completed'
        if (status == 'current') stepClasses << 'current'
        if (status == 'skipped') stepClasses << 'skipped'
        if (interactive) stepClasses << 'kds-step--interactive'
        String ariaCurrent = status == 'current' ? ' aria-current="step"' : ''
        String indicatorContent = numbered ? String.valueOf(index + 1) : ''

        def sb = new StringBuilder()
        sb << "<div class=\"${stepClasses.join(' ')}\"${ariaCurrent}>"
        sb << "<div class=\"kds-step-indicator\">${indicatorContent}</div>"
        sb << "<div class=\"kds-step-label\"${interactive ? ' aria-hidden="true"' : ''}>"
        sb << label.encodeAsHTML()
        if (optional) sb << "<span class=\"kds-step-optional\">${statusLabels.optional.encodeAsHTML()}</span>"
        if (!interactive && statusText) sb << "<span class=\"kds-step-status\">, ${statusText.encodeAsHTML()}</span>"
        sb << '</div>'
        if (interactive) {
            sb << "<a class=\"kds-step-link\" href=\"${href.encodeAsHTML()}\">"
            sb << '<span class="kds-sr-only">'
            sb << label.encodeAsHTML()
            if (optional) sb << ", ${statusLabels.optional.encodeAsHTML()}"
            if (statusText) sb << ", ${statusText.encodeAsHTML()}"
            sb << '</span></a>'
        }
        sb << '</div>'
        sb.toString()
    }
}
