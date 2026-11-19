# Khipu Design System - Grails

Taglibs de Khipu Design System para apps Grails/GSP. El único módulo real es
[`taglibs-grails6/`](taglibs-grails6) — apunta a Grails 6.2.3, que es lo que corre `payment`.

## Artifact

```
com.khipu:design-system-grails-taglibs
```

Se publica al repositorio Nexus `design-system` (el mismo donde se publica el AAR de Android),
no a `releases`/`snapshots`. El jar trae el CSS/JS de BeerCSS empaquetado en `META-INF/assets/`,
que `asset-pipeline` detecta solo con tener la dependencia en el classpath — no hace falta
ningún `<link>` ni `<script>` aparte.

## Uso en un proyecto Grails 6

```groovy
// build.gradle
repositories {
    maven { url 'https://dev.khipu.com/nexus/content/repositories/design-system' }
}

dependencies {
    implementation 'com.khipu:design-system-grails-taglibs:<version>'
}
```

```gsp
<kds:button type="primary" href="${g.createLink(...)}">Continuar</kds:button>
```

El `type` sigue la misma convención que el `.kds-btn`/`.kds-btn-primary`/`.kds-btn-outlined`
ya usado en el resto del design system.

## Build y publicación

Ver [`taglibs-grails6/build.gradle`](taglibs-grails6/build.gradle). El publish real corre en
CI (`.github/workflows/publish.yml`, job `publish-grails`) al pushear un tag `v*` — usa las
credenciales de deploy de CI (`secrets.KHIPU_REPO_USERNAME`/`KHIPU_REPO_PASSWORD`), nunca una
credencial local ni hardcodeada.

```bash
cd grails/taglibs-grails6
npm run build --prefix ../..   # genera dist/beercss/, el módulo lo empaqueta en el jar
./gradlew publishToMavenLocal  # para probar local
```
