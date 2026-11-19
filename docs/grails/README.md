# Grails/GSP Design System

El módulo real es [`grails/taglibs-grails6/`](../../grails/taglibs-grails6) — ver
[`grails/README.md`](../../grails/README.md) para cómo usarlo y publicarlo.

Todo lo demás en esta carpeta (`GRAILS_IMPLEMENTATION_PLAN.md`, `TAGLIB_REFERENCE.md`) es
planificación/documentación de un intento anterior sobre Grails 2.5.4 y AWS CodeArtifact que
nunca llegó a usarse — `payment` corre Grails 6.2.3 sin CodeArtifact. `TAGLIB_REFERENCE.md` en
particular documenta componentes y una API (`variant`/`color`) que no existen en el módulo real
(que hoy solo tiene `kds:button` con un atributo `type`, igual que `mat:button`).

[`BEERCSS_ONBOARDING_USAGE.md`](BEERCSS_ONBOARDING_USAGE.md) y
[`BEERCSS_FLOATING_LABELS.md`](BEERCSS_FLOATING_LABELS.md) sí describen el mecanismo que `payment`
usa de verdad hoy (el bundle BeerCSS vía `MaterialTagLib`).
