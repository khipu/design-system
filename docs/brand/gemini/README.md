# Habilidades de marca para Gemini Enterprise

Tres paquetes de habilidad listos para registrar en el **Skill Registry** de
Gemini Enterprise Agent Platform. Los tres se derivan de
[`../COMUNICACION_Y_PRESENTACIONES.md`](../COMUNICACION_Y_PRESENTACIONES.md),
que sigue siendo la fuente de verdad.

## Por qué tres y no una

La plataforma usa *progressive disclosure*: el agente no carga todas las
habilidades a la vez, sino que ve sus descripciones y carga el paquete completo
cuando detecta que aplica. Una habilidad monolítica de marca obligaría a cargar
las reglas de presentaciones aunque el usuario sólo esté escribiendo un mensaje
de error.

Por eso cada descripción dice explícitamente **cuándo usar y cuándo no**, y
deriva hacia su hermana:

| Habilidad | Se activa cuando |
|-----------|------------------|
| `khipu-brand-voice` | Se redacta o revisa copy de interfaz, mensajes, microcopy |
| `khipu-brand-visual` | Se aplica color, tipografía o logotipo; se valida contraste |
| `khipu-brand-presentations` | Se arma o revisa una presentación corporativa |

## Estructura de cada paquete

```
khipu-brand-voice/
├── SKILL.md                    frontmatter + instrucciones
└── references/
    └── voz-y-redaccion.md      material de consulta

khipu-brand-visual/
├── SKILL.md
├── references/
│   └── identidad-visual.md
└── assets/
    ├── khipu-logotipo-blanco.svg
    └── khipu-logotipo-gris.svg

khipu-brand-presentations/
├── SKILL.md
├── references/
│   └── presentaciones.md
└── assets/
    ├── plantilla-presentacion.html
    ├── khipu-logotipo-blanco.svg
    └── khipu-logotipo-gris.svg
```

Cada paquete es autocontenido: la plantilla de presentación referencia los
logos que viajan con ella, no los de otro paquete.

## Cómo registrarlas

Desde el directorio de cada habilidad:

```bash
cd khipu-brand-voice
zip -r ../khipu-brand-voice.zip SKILL.md references/ assets/
```

Luego súbelo al Skill Registry con el SDK o la API REST, usando como
`SKILL_ID` el mismo valor del campo `name` del frontmatter. El SDK también
acepta la ruta del directorio sin comprimir.

Consulta [Create and manage skills](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/skill-registry/create-manage)
para el comando exacto de tu entorno.

## Límites de la plataforma

| | Límite | Mayor de los tres |
|---|--------|-------------------|
| `name` | 64 caracteres | 25 |
| `description` | 1.024 caracteres | 530 |
| Instrucciones | 500.000 caracteres | 6.273 |
| Paquete comprimido | 10 MB | muy por debajo |

El `name` debe ir en minúsculas con guiones, empezar por letra y no usar el
prefijo `gcp-`, reservado para las habilidades integradas.

## Cómo probarlas

Estos prompts deberían activar cada habilidad sin nombrarla:

**voice** — *"Revisa estos mensajes de error de nuestro checkout"* ·
*"¿Cómo nombramos el botón que devuelve al comercio?"*

**visual** — *"¿Qué color uso para un estado de advertencia en texto?"* ·
*"Valida si esta paleta cumple WCAG AA"*

**presentations** — *"Arma la estructura de una presentación de 10 slides sobre
pagos automáticos"* · *"Revisa este mazo contra los lineamientos de marca"*

Un caso útil para verificar la derivación cruzada: *"Necesito el copy de la
portada de una presentación"* debería activar ambas, voice y presentations.

## Mantención

Cuando cambie una definición de marca, se actualiza primero
`../COMUNICACION_Y_PRESENTACIONES.md` y desde ahí se regeneran los
`references/`. Las instrucciones de cada `SKILL.md` son un resumen operativo
escrito a mano: revísalas también, porque no se regeneran solas.

Dos colores que estas habilidades usan no provienen de `src/tokens/index.ts` y
viven sólo en la plantilla de presentación: `#F7EDFF` (superficie de sección) y
`#8C8C8C` (gris del pie).
