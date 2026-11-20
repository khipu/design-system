package com.khipu.designsystem

/**
 * Composes `kds:statusBlock` + a `.kds-btn-stack` of `kds:button`s for one of the
 * "Estados del alta" state screens (KTUF-498/531).
 *
 * Two ways to use it:
 *   - `<kds:onboardingState case="${OnboardingStateCase.RISK_PENDING}"/>` — status, icon,
 *     actions and i18n message codes all come from the case.
 *   - By hand, with no `case` at all: `status`, `icon`, `title`/`description` (or `key`,
 *     to resolve `onboarding.state.<key>.title`/`.description` instead) and `actions` as
 *     explicit attrs — for a state screen that isn't one of the known cases.
 * Any explicit attr overrides what the `case` would have provided, so a known case can
 * also be used as a starting point and adjusted (e.g. a one-off extra action). Pass an
 * explicit `actions="${[]}"` to drop a case's actions entirely.
 *
 * Consumer contract (not enforced by this taglib — fails silently if unmet):
 *   - `createLink(action: ...)` is called with no `controller:`, so it resolves against
 *     whatever controller renders the GSP this tag is used from. That controller needs
 *     an action per `gspAction` used by whichever case(s) are rendered. For the 8 cases
 *     this taglib covers, across all of them: `drafts`, `start`, `identity`, `support`,
 *     `account`.
 *   - Message codes must exist in the consuming app's i18n bundle: `onboarding.state.<key>
 *     .title` / `.description` for every `OnboardingStateCase.key` used (riskPending,
 *     riskByEmail, draftGone, flowUnavailable, identifierRestricted, signerIncomplete,
 *     merchantBlocked, collectPending), plus each action's own `i18n` code (see each case's
 *     `actions` in `OnboardingStateCase`). A missing code is NOT an error: Grails' default
 *     `message()` behavior prints the code itself in the page (e.g. literally
 *     "onboarding.state.riskPending.title"), so a missing translation ships silently.
 */
class KdsOnboardingStateTagLib {
    static namespace = 'kds'

    def onboardingState = { attrs ->
        OnboardingStateCase stateCase = attrs.remove('case')
        String key = attrs.remove('key') ?: stateCase?.key
        String status = attrs.remove('status') ?: stateCase?.status
        String icon = attrs.remove('icon') ?: stateCase?.icon
        List<Map> actions = attrs.containsKey('actions') ? attrs.remove('actions') : (stateCase?.actions ?: [])
        String title = attrs.remove('title') ?: (key ? message(code: "onboarding.state.${key}.title") : null)
        String description = attrs.remove('description') ?:
            (key ? message(code: "onboarding.state.${key}.description", default: '') : null)
        def cssClass = attrs.remove('cssClass')

        if (!status) {
            throw new IllegalArgumentException('kds:onboardingState requires either a "case" or an explicit "status"')
        }
        if (!title) {
            throw new IllegalArgumentException(
                'kds:onboardingState requires either a "case"/"key" (to resolve the i18n title) or an explicit "title"'
            )
        }

        out << kds.statusBlock(status: status, icon: icon, title: title, description: description, cssClass: cssClass)

        if (actions) {
            out << '<div class="kds-btn-stack">'
            actions.each { action ->
                out << kds.button(
                    type: action.variant ?: 'primary',
                    href: createLink(action: action.gspAction),
                    cssClass: 'kds-btn-block'
                ) { message(code: action.i18n) }
            }
            out << '</div>'
        }
    }
}
