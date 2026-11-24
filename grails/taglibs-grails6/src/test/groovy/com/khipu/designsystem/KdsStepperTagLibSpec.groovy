package com.khipu.designsystem

import grails.testing.web.taglib.TagLibUnitTest
import spock.lang.Specification
import spock.lang.Unroll

class KdsStepperTagLibSpec extends Specification implements TagLibUnitTest<KdsStepperTagLib> {

    void 'renders one kds-step per step and wraps them in kds-stepper'() {
        given:
        def steps = [[label: 'A'], [label: 'B'], [label: 'C']]

        expect:
        def html = applyTemplate('<kds:stepper steps="${steps}" current="1"/>', [steps: steps])
        html.startsWith('<div class="kds-stepper">')
        (html =~ /class="kds-step[" ]/).findAll().size() == 3
    }

    void 'derives completed/current/pending from current when status is not explicit'() {
        given:
        def steps = [[label: 'A'], [label: 'B'], [label: 'C']]

        when:
        def html = applyTemplate('<kds:stepper steps="${steps}" current="1"/>', [steps: steps])
        def aIndex = html.indexOf('>A<')
        def bIndex = html.indexOf('>B<')
        def cIndex = html.indexOf('>C<')
        def completedIndex = html.indexOf('kds-step completed')
        def currentIndex = html.indexOf('kds-step current')

        then:
        completedIndex > -1 && completedIndex < bIndex
        currentIndex > aIndex && currentIndex < cIndex
        html.contains('aria-current="step"')
        html.count('kds-step completed') == 1
        html.count('kds-step current') == 1
    }

    void 'an explicit status wins and allows non-linear progress'() {
        given:
        def steps = [
            [label: 'Perfil', status: 'completed'],
            [label: 'Verificación', status: 'current'],
            [label: 'Información comercial', status: 'completed'],
            [label: 'Plan', status: 'skipped'],
        ]

        when:
        def html = applyTemplate('<kds:stepper steps="${steps}"/>', [steps: steps])

        then:
        html.contains('kds-step completed')
        html.contains('kds-step current')
        html.contains('kds-step skipped')
        html.contains('<span class="kds-step-status">, omitido</span>')
    }

    void 'shows the optional mark under the label'() {
        given:
        def steps = [[label: 'Contactos', optional: true]]

        expect:
        applyTemplate('<kds:stepper steps="${steps}" current="0"/>', [steps: steps])
            .contains('<span class="kds-step-optional">Opcional</span>')
    }

    void 'numbered shows the 1-based number inside each indicator'() {
        given:
        def steps = [[label: 'A'], [label: 'B']]

        expect:
        def html = applyTemplate('<kds:stepper steps="${steps}" current="0" numbered="true"/>', [steps: steps])
        html.contains('kds-stepper--numbered')
        html.contains('<div class="kds-step-indicator">1</div>')
        html.contains('<div class="kds-step-indicator">2</div>')
    }

    void 'numbered accepts a real boolean, not just the string "true"'() {
        given:
        def steps = [[label: 'A']]

        expect:
        applyTemplate('<kds:stepper steps="${steps}" current="0" numbered="${numbered}"/>', [steps: steps, numbered: true])
            .contains('kds-stepper--numbered')
    }

    void 'color=primary adds the primary modifier'() {
        given:
        def steps = [[label: 'A']]

        expect:
        applyTemplate('<kds:stepper steps="${steps}" current="0" color="primary"/>', [steps: steps])
            .contains('kds-stepper--primary')
    }

    void 'currentLabelOnly adds the modifier'() {
        given:
        def steps = [[label: 'A']]

        expect:
        applyTemplate('<kds:stepper steps="${steps}" current="0" currentLabelOnly="true"/>', [steps: steps])
            .contains('kds-stepper--current-label')
    }

    void 'a completed step with a same-site href is a link named by its label and status'() {
        given:
        def steps = [[label: 'Perfil del comercio', href: '/onboarding/perfil'], [label: 'Verificación']]

        when:
        def html = applyTemplate('<kds:stepper steps="${steps}" current="1"/>', [steps: steps])

        then:
        html.contains('kds-step--interactive')
        html.contains('<a class="kds-step-link" href="/onboarding/perfil">')
        html.contains('<span class="kds-sr-only">Perfil del comercio, completado</span>')
        html.contains('aria-hidden="true"')
    }

    void 'the current and pending steps are never links even with an href'() {
        given:
        def steps = [[label: 'Perfil', href: '/a'], [label: 'Plan', href: '/b']]

        expect:
        !applyTemplate('<kds:stepper steps="${steps}" current="0"/>', [steps: steps]).contains('kds-step-link')
    }

    void 'names a linked optional step with its optional mark'() {
        given:
        def steps = [[label: 'Contactos', optional: true, href: '/c'], [label: 'Plan']]

        expect:
        applyTemplate('<kds:stepper steps="${steps}" current="1"/>', [steps: steps])
            .contains('<span class="kds-sr-only">Contactos, Opcional, completado</span>')
    }

    void 'a skipped step can link back too'() {
        given:
        def steps = [[label: 'Plan', status: 'skipped', href: '/p']]

        expect:
        applyTemplate('<kds:stepper steps="${steps}"/>', [steps: steps])
            .contains('<span class="kds-sr-only">Plan, omitido</span>')
    }

    void 'statusLabels translates the texts'() {
        given:
        def steps = [[label: 'Profile', status: 'skipped', optional: true]]
        def labels = [skipped: 'skipped', optional: 'Optional']

        when:
        def html = applyTemplate(
            '<kds:stepper steps="${steps}" statusLabels="${labels}"/>',
            [steps: steps, labels: labels]
        )

        then:
        html.contains('<span class="kds-step-optional">Optional</span>')
        html.contains('<span class="kds-step-status">, skipped</span>')
    }

    @Unroll
    void 'accepts a same-site href (#href)'() {
        given:
        def steps = [[label: 'Perfil', href: href], [label: 'Plan']]

        expect:
        applyTemplate('<kds:stepper steps="${steps}" current="1"/>', [steps: steps]).contains('kds-step-link')

        where:
        href << ['/onboarding/perfil', 'perfil', '../perfil', '?step=1', '#perfil']
    }

    void 'accepts an absolute URL on the current origin'() {
        given:
        def origin = "${request.scheme}://${request.serverName}:${request.serverPort}"
        def steps = [[label: 'Perfil', href: "${origin}/onboarding/perfil"], [label: 'Plan']]

        expect:
        applyTemplate('<kds:stepper steps="${steps}" current="1"/>', [steps: steps]).contains('kds-step-link')
    }

    @Unroll
    void 'does not render a link for a non same-site href (#href)'() {
        given:
        def steps = [[label: 'Perfil', href: href], [label: 'Plan']]

        when:
        def html = applyTemplate('<kds:stepper steps="${steps}" current="1"/>', [steps: steps])

        then:
        !html.contains('kds-step-link')
        !html.contains('kds-step--interactive')
        html.contains('<span class="kds-step-status">, completado</span>')

        where:
        href << [
            'javascript:alert(1)',
            ' JavaScript:alert(1)',
            'data:text/html,<b>x</b>',
            '//evil.example/onboarding',
            '/\\evil.example/onboarding',
            'https://evil.example/onboarding',
            'java\tscript:alert(1)',
            '\njavascript:alert(1)',
            '',
            '   ',
        ]
    }

    void 'escapes the label to prevent XSS'() {
        given:
        def steps = [[label: '<script>alert(1)</script>', href: '/"><img src=x onerror=alert(1)>']]

        when:
        def html = applyTemplate('<kds:stepper steps="${steps}" current="1"/>', [steps: steps])

        then:
        // The malicious href is itself invalid URI syntax, so sameSiteHref rejects it and no
        // link is rendered at all (covered by the non-same-site-href cases below) — this case
        // only exercises label escaping. See 'escapes a valid href that needs escaping' for an
        // href that actually reaches encodeAsHTML().
        !html.contains('<script>')
        !html.contains('<img ')
    }

    void 'escapes a valid href that needs escaping'() {
        given:
        def steps = [[label: 'Perfil', href: '?a=1&b=2']]

        when:
        def html = applyTemplate('<kds:stepper steps="${steps}" current="1"/>', [steps: steps])

        then:
        html.contains('href="?a=1&amp;b=2"')
    }

    void 'escapes cssClass'() {
        given:
        def steps = [[label: 'A']]
        def payload = '"><script>alert(1)</script>'

        when:
        def html = applyTemplate(
            '<kds:stepper steps="${steps}" current="0" cssClass="${payload}"/>',
            [steps: steps, payload: payload]
        )

        then:
        !html.contains('<script>')
    }
}
