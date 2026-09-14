---
name: khipu-brand-presentations
metadata:
  category: Brand
description: >-
  Crea y revisa presentaciones corporativas de Khipu en Google Slides, Keynote o
  PowerPoint. Úsala al estructurar un mazo, elegir qué plantilla de slide
  corresponde a un contenido, definir jerarquía tipográfica o layout, redactar
  títulos y bullets de diapositiva, o revisar un mazo existente contra los
  lineamientos. Cubre las once plantillas definidas, el lienzo 16:9 con sus
  márgenes, la huincha lateral y la numeración. No la uses para copy de interfaz
  (usa khipu-brand-voice) ni para decisiones de color, tipografía o logotipo
  fuera del contexto de slides (usa khipu-brand-visual).
---

# Presentaciones corporativas — Khipu

Once plantillas de slide sobre un lienzo 16:9, con la identidad de Khipu
aplicada. La plantilla de referencia vive en el design system y estas reglas
son las que implementa.

## Cómo usar esta habilidad

1. Define qué necesita cada slide del mazo y **asígnale una de las once
   plantillas** de abajo. Si ninguna calza, revisa si el contenido está
   sobrecargado antes de inventar una plantilla nueva.
2. Aplica el lienzo, la tipografía y el color de las tablas.
3. Redacta títulos y bullets con las reglas de redacción para slides.
4. Pasa el checklist antes de entregar.

## Lienzo

| Aspecto | Valor |
|---------|-------|
| Formato | 16:9 — nunca 4:3 |
| Resolución | 1920 × 1080 px; mínimo 1280 × 720 |
| Márgenes | 90 arriba y abajo · 128 izquierda · 110 derecha |

El margen izquierdo es mayor porque la **huincha** —banda vertical de 21px en
degradado púrpura `#8347AD` (65 %) → cian `#3CB4E5` (100 %)— ocupa el borde.
Va en todas las slides de contenido; **no va** en portada, cierre ni imagen a
sangre, donde el fondo ya cubre el lienzo.

Los 128px son el eje sobre el que se alinea **todo**: logo, títulos, cuerpo y
pie.

## Tipografía

| Rol | Tamaño | Peso |
|-----|--------|------|
| Título de portada | 62 pt | Bold |
| Título de divisor | 96 pt | Bold |
| Título de slide | 38 pt | SemiBold |
| Subtítulo | 24 pt | Medium |
| Cuerpo | 21 pt | Regular |
| Fecha de portada | 17 pt | Medium |
| Nota al pie | 14 pt | Regular |

Public Sans, máximo 3 pesos por vista. Los cuerpos grandes llevan interlínea
más ajustada e interletrado ligeramente negativo.

## Las once plantillas

| # | Plantilla | Cuándo usarla |
|---|-----------|---------------|
| 1 | **Portada** | Apertura. Fondo púrpura con halo radial cian abajo a la izquierda, logotipo blanco, filete sobre el título |
| 1b | **Portada con fotografía** | Alternativa cuando hay una imagen que aporta. Corte diagonal en sección áurea: marca 61,8 % / foto 38,2 %, con velo púrpura sobre la imagen |
| 2 | **Índice** | Sumario, o marcador de avance repetido antes de cada bloque. La sección en curso va destacada |
| 3 | **Divisor de sección** | Corte entre bloques. Sólo tipografía a 96 pt sobre fondo `#F7EDFF`, con la palabra clave en púrpura |
| 4 | **Contenido estándar** | La slide por defecto: título más hasta seis bullets de una línea |
| 5 | **Texto + imagen** | Dos columnas al 50 %, imagen a la derecha en 4:3 |
| 6 | **Tres columnas** | Tres ideas en paralelo, con textos de largo parejo |
| 7 | **Cuatro columnas con cifras** | Datos destacados: cifra grande en púrpura más descripción |
| 8 | **Datos y gráficos** | Púrpura como serie principal, púrpura dark y cian como secundarias |
| 9 | **Tabla y estados** | Comparaciones; los semánticos sólo donde el dato tiene estado |
| 10 | **Imagen a pantalla completa** | Sin logo, huincha ni pie. Velo inferior sólo si hay que atribuir |
| 11 | **Cierre** | El fondo de la portada espejado a la derecha, con CTA y contacto |

## Logotipo según el tipo de slide

| Slides | Logotipo |
|--------|----------|
| Portada, índice, divisor, cierre | Arriba a la izquierda, 230 px |
| Interiores | Al pie, 96 px, en gris, junto al nombre de la presentación |
| Imagen a sangre | Sin logotipo |

## Numeración

El folio es un elemento gráfico, no una nota al pie:

```
────  03 /11
```

Regla de 64 × 2 px · página en curso a 26 pt Bold en púrpura, con dos dígitos
(`03`, no `3`) · total a 18 pt Medium en gris `#8C8C8C`. Ambas cifras con
numeración tabular.

## Paleta para slides

| Rol | HEX |
|-----|-----|
| Púrpura main | `#8347AD` |
| Púrpura dark | `#5B3179` |
| Superficie de sección | `#F7EDFF` |
| Marcador de índice | `#F3E5FF` |
| Cian | `#3CB4E5` |
| Gris de texto | `#333333` |
| Gris medio | `#666666` |
| Gris tenue (logo del pie, total de páginas) | `#8C8C8C` |

Los semánticos se usan **sólo cuando el dato tiene carga de estado** — un
resultado positivo, una alerta, un riesgo. Nunca como colores decorativos para
diferenciar series.

## Redacción para slides

| ✅ | ❌ |
|----|----|
| Títulos accionables: "Aumenta tus ventas con Khipu" | Genéricos: "Beneficios" |
| Bullets de una línea | Párrafos dentro de bullets |
| Números concretos: "50 % más rápido" | Vagos: "Mucho más rápido" |
| "Tu negocio merece pagos simples" | "Su empresa requiere soluciones de pago" |

**Densidad:** máximo 6 líneas y 5-6 bullets por slide, una idea principal por
diapositiva, mínimo 16 pt de cuerpo.

**Puntuación:** sin punto en títulos, bullets ni CTAs; con punto en frases
completas del cuerpo y notas al pie.

## Errores frecuentes al generar presentaciones

| ❌ | ✅ | Por qué |
|----|----|---------|
| Formato 4:3 | Siempre 16:9 | Estándar de proyección |
| Fondo púrpura en todas las slides | Púrpura en portada, cierre y acentos | Evita saturación |
| 8-10 bullets por slide | Máximo 5-6 | Sobrecarga cognitiva |
| Bullets de 2-3 líneas | Una línea | La presentación no es un documento |
| Mezclar varias tipografías | Sólo Public Sans | Consistencia |
| Semánticos para diferenciar series | Púrpura, púrpura dark y cian | El color comunica estado |

## Si hace falta una plantilla nueva

Verifica primero que no exista: casi toda necesidad cabe en las once. Si de
verdad falta, debe respetar el lienzo y su eje de 128 px, usar la escala
tipográfica existente sin inventar tamaños, llevar huincha si es slide de
contenido, tomar los colores de la paleta, y documentarse con una línea que
diga qué resuelve y cuándo usarla.

## Checklist antes de entregar

- [ ] ¿Formato 16:9 con los márgenes correctos?
- [ ] ¿Todo alineado al eje de 128 px?
- [ ] ¿La huincha está donde corresponde y ausente donde no?
- [ ] ¿Cada slide usa una de las once plantillas?
- [ ] ¿Public Sans con la escala definida y máximo 3 pesos?
- [ ] ¿El logotipo va según el tipo de slide?
- [ ] ¿Máximo 6 líneas y 5-6 bullets por slide?
- [ ] ¿Títulos accionables en vez de genéricos?
- [ ] ¿Cité las fuentes de los datos?

## Directorio de referencia

- `references/presentaciones.md` — sección completa con las once plantillas
  detalladas, el criterio de alineación óptica del logotipo, la construcción de
  los fondos radiales, el corte áureo de la portada con fotografía y las
  instrucciones para incorporar slides nuevas.
