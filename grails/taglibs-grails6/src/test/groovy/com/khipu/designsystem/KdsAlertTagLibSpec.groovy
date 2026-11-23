package com.khipu.designsystem

import grails.testing.web.taglib.TagLibUnitTest
import spock.lang.Specification
import spock.lang.Unroll

class KdsAlertTagLibSpec extends Specification implements TagLibUnitTest<KdsAlertTagLib> {

    @Unroll
    void 'renders the severity class and its default icon (#severity -> #icon)'() {
        expect:
        def html = applyTemplate("<kds:alert severity=\"${severity}\">Texto</kds:alert>")
        html.contains("kds-alert kds-${severity}")
        html.contains("<i class=\"material-symbols-outlined\">${icon}</i>")

        where:
        severity  | icon
        'success' | 'check_circle'
        'info'    | 'info'
        'warning' | 'warning'
        'error'   | 'error'
    }

    void 'defaults role to status'() {
        expect:
        applyTemplate('<kds:alert severity="info">Texto</kds:alert>').contains('role="status"')
    }

    void 'role can be overridden'() {
        expect:
        applyTemplate('<kds:alert severity="error" role="alert">Texto</kds:alert>').contains('role="alert"')
    }

    void 'a custom icon overrides the severity default'() {
        expect:
        applyTemplate('<kds:alert severity="info" icon="custom_icon">Texto</kds:alert>')
            .contains('<i class="material-symbols-outlined">custom_icon</i>')
    }

    void 'icon="false" hides the icon entirely'() {
        expect:
        !applyTemplate('<kds:alert severity="info" icon="false">Texto</kds:alert>').contains('kds-alert-icon')
    }

    void 'renders lead in strong, followed by the body text'() {
        expect:
        applyTemplate('<kds:alert severity="warning" lead="Order changed.">Review the pending steps.</kds:alert>')
            .contains('<p class="kds-alert-description"><strong>Order changed.</strong> Review the pending steps.</p>')
    }

    void 'no close button unless closable is requested'() {
        expect:
        !applyTemplate('<kds:alert severity="info">Texto</kds:alert>').contains('kds-alert-close')
    }

    void 'closable renders the close button'() {
        expect:
        applyTemplate('<kds:alert severity="info" closable="true">Texto</kds:alert>').contains('kds-alert-close')
    }

    void 'escapes lead and body text'() {
        given:
        def payload = '<script>alert(1)</script>'

        expect:
        !applyTemplate(
            '<kds:alert severity="info" lead="${payload}">${payload}</kds:alert>',
            [payload: payload]
        ).contains('<script>')
    }

    void 'escapes cssClass'() {
        given:
        def payload = '"><script>alert(1)</script>'

        expect:
        !applyTemplate('<kds:alert severity="info" cssClass="${payload}">Texto</kds:alert>', [payload: payload]).contains('<script>')
    }
}
