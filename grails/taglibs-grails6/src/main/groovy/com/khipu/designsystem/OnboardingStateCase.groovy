package com.khipu.designsystem

/**
 * Pre-configured cases for `kds:onboardingState`, one per state screen from the
 * "Estados del alta" story set (KTUF-498/531) that renders as `KdsStatusBlock` +
 * `.kds-btn-stack` — 9 of the 14 screens in `OnboardingStates.stories.tsx`.
 * Each case fixes the `KdsStatusType` (`status`), the Material Symbols icon, and
 * the follow-up actions shown in `.kds-btn-stack`; the i18n message codes are
 * derived from `key` as `onboarding.state.<key>.title` / `.description`.
 *
 * `kds:onboardingState` also accepts every one of these as an explicit attr
 * (`status`, `icon`, `actions`) to override a case's defaults, or to assemble
 * a state screen by hand without a `case` at all.
 */
enum OnboardingStateCase {
    RISK_PENDING('riskPending', 'info', 'hourglass_top', [
        [gspAction: 'drafts', i18n: 'onboarding.drafts.view', variant: 'outlined'],
    ]),
    RISK_BY_EMAIL('riskByEmail', 'info', 'mail', [
        [gspAction: 'drafts', i18n: 'default.understood'],
    ]),
    DRAFT_GONE('draftGone', 'warn', 'event_busy', [
        [gspAction: 'start', i18n: 'onboarding.draft.new'],
        [gspAction: 'drafts', i18n: 'onboarding.drafts.view', variant: 'outlined'],
    ]),
    FLOW_UNAVAILABLE('flowUnavailable', 'warn', 'remove_shopping_cart', [
        [gspAction: 'start', i18n: 'onboarding.products.view'],
        [gspAction: 'drafts', i18n: 'onboarding.drafts.view', variant: 'outlined'],
    ]),
    IDENTIFIER_RESTRICTED('identifierRestricted', 'error', 'gpp_bad', [
        [gspAction: 'identity', i18n: 'onboarding.identity.retry'],
        [gspAction: 'support', i18n: 'default.contactSupport', variant: 'outlined'],
    ]),
    SIGNER_INCOMPLETE('signerIncomplete', 'warn', 'person_off', [
        [gspAction: 'identity', i18n: 'onboarding.identity.retry'],
        [gspAction: 'drafts', i18n: 'onboarding.drafts.view', variant: 'outlined'],
    ]),
    MERCHANT_BLOCKED('merchantBlocked', 'error', 'support_agent', [
        [gspAction: 'support', i18n: 'default.contactSupport'],
    ]),
    COLLECT_PENDING('collectPending', 'info', 'pending_actions', [
        [gspAction: 'account', i18n: 'onboarding.account.go'],
    ]),
    DRAFTS_EMPTY('draftsEmpty', 'info', 'inbox', [
        [gspAction: 'start', i18n: 'onboarding.draft.new'],
        [gspAction: 'support', i18n: 'onboarding.drafts.notListed', variant: 'text'],
    ])

    /** Suffix of the i18n message codes: `onboarding.state.<key>.title`/`.description`. */
    final String key
    /** `KdsStatusType`: success|pending|warn|error|info. */
    final String status
    /** Material Symbols icon name. */
    final String icon
    /** `[{gspAction, i18n, variant: 'primary'(default)|'outlined'|'text'}, ...]`, rendered in `.kds-btn-stack`. */
    final List<Map> actions

    OnboardingStateCase(String key, String status, String icon, List<Map> actions) {
        this.key = key
        this.status = status
        this.icon = icon
        this.actions = actions
    }
}
