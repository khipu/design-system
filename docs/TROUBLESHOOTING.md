# Troubleshooting & File Synchronization

Guía de solución de problemas comunes y sincronización de archivos del Sistema de Diseño Khipu.

---

## ⚠️ Troubleshooting Común

### Errores de TypeScript sobre imports inexistentes

**Síntoma:** `Cannot find module 'colorsByMode'` o similar en archivos `.stories.tsx`

**Causa:** Código experimental que referencia tokens o tipos que no existen en `src/tokens/index.ts`

**Solución:**
```bash
# 1. Verificar qué está exportado realmente
grep "export" src/tokens/index.ts

# 2. Remover imports inexistentes
# Ejemplo: cambiar
# import { colors, colorsByMode } from '../../tokens';
# por
# import { colors } from '../../tokens';

# 3. Verificar
npm run typecheck
```

**Ejemplo real:**
```typescript
// ❌ Error
import { colors, colorsByMode, ThemeMode } from '../../tokens';

// ✅ Correcto (solo imports que existen)
import { colors } from '../../tokens';
```

---

### Conflictos de merge en archivos de tokens

**Síntoma:** Git marca conflictos en `src/tokens/index.ts` o `src/tokens/css-variables.css`

**Estrategia recomendada:**

1. **Identificar el cambio principal:**
```bash
git log --oneline --graph feature-branch master -- src/tokens/
```

2. **Si hay cambios de diseño sustanciales:**
```bash
# Mantener la versión con cambios de diseño más recientes
git checkout --theirs src/tokens/index.ts  # O --ours según corresponda
git add src/tokens/index.ts

# Regenerar archivos derivados
npm run tokens:generate
git add src/tokens/css-variables.css android/designsystem/src/main/java/com/khipu/designsystem/tokens/KdsTokens.kt
```

3. **Verificar consistencia:**
```bash
npm run typecheck
npm run build
```

---

### Storybook no muestra componentes correctamente

**Síntoma:** Componentes se renderizan sin estilos o con estilos incorrectos

**Causas comunes:**

1. **Falta ThemeProvider:**
```typescript
// ❌ Sin provider
export const MyStory = () => <KdsButton>Click</KdsButton>;

// ✅ Con provider (en .storybook/preview.tsx)
import { KhipuThemeProvider } from '../src/theme';

export const decorators = [
  (Story) => (
    <KhipuThemeProvider>
      <Story />
    </KhipuThemeProvider>
  ),
];
```

2. **Caché de Storybook desactualizado:**
```bash
rm -rf node_modules/.cache/storybook
npm run storybook
```

3. **Build desactualizado:**
```bash
npm run build
npm run storybook
```

---

### Errores de autenticación con git (SSH)

**Síntoma:** `Permission denied (publickey)` al hacer push/pull

**Solución temporal - usar HTTPS:**
```bash
# Cambiar a HTTPS
git remote set-url origin https://bitbucket.org/khipu/design-system.git

# Hacer operación
git push origin master

# Volver a SSH (opcional)
git remote set-url origin git@bitbucket.org:khipu/design-system.git
```

**Nota:** En entornos donde no hay acceso directo a credenciales (como Claude Code), ejecuta estos comandos en tu terminal local.

---

### Build falla con errores de tipos en componentes Kds

**Síntoma:** `Property 'X' does not exist on type 'KdsButtonProps'`

**Causa:** Después del renombrado de componentes (commit 9213d43), asegúrate de usar los nombres correctos:

```typescript
// ❌ Nombres antiguos
import { Button, TextField, Card } from '@khipu/design-system';

// ✅ Nombres nuevos con prefijo Kds
import { KdsButton, KdsTextField, KdsCard } from '@khipu/design-system';
```

**Solución rápida:**
```bash
# Buscar imports antiguos
grep -r "import.*Button.*from.*@khipu" src/

# Actualizar nombres
# En tu editor, buscar y reemplazar:
# Button → KdsButton
# TextField → KdsTextField
# Card → KdsCard
# Typography → KdsTypography
# Checkbox → KdsCheckbox
# Modal → KdsModal
# Spinner → KdsSpinner
# LogoHeader → KdsLogoHeader
# Alert → KdsAlert

# Verificar
npm run typecheck
```

---

## 🔄 Sincronización de Archivos

Algunos archivos en el proyecto se mantienen manualmente sincronizados. Si modificas uno, considera si necesitas actualizar los otros:

### 1. Guías de Marca (Voz y Tono)

| Archivo | Propósito | Audiencia | Cuándo actualizar |
|---------|-----------|-----------|-------------------|
| `BRAND_GUIDE_FOR_AI.md` | Guía de marca para agentes IA | LLMs (Claude, etc.) | Al cambiar voz/tono o agregar anti-patrones |
| `src/stories/brand/05-VoiceAndTone.stories.mdx` | Documentación visual de marca | Diseñadores/Devs humanos | Al cambiar ejemplos de copy o microcopy |

**Elementos que deben estar sincronizados:**
- Ejemplos de microcopy (botones, errores, labels)
- Guías de redacción (✅ Recomendado / ❌ Evitar)
- Valores de marca (cercana, clara, confiable, directa)

**Proceso de actualización:**
```bash
# 1. Edita la fuente de verdad (BRAND_GUIDE_FOR_AI.md)
vim BRAND_GUIDE_FOR_AI.md

# 2. Actualiza la versión visual en Storybook
vim src/stories/brand/05-VoiceAndTone.stories.mdx

# 3. Verifica visualmente en Storybook
npm run storybook
# Navega a: Brand → Voz y Tono

# 4. Commit ambos archivos juntos
git add BRAND_GUIDE_FOR_AI.md src/stories/brand/05-VoiceAndTone.stories.mdx
git commit -m "docs: update voice and tone guidelines

- Add new microcopy examples
- Update brand values
- Sync BRAND_GUIDE_FOR_AI.md with Storybook docs"
```

---

### 2. Tokens de Diseño

| Archivo | Propósito | Generado/Manual | Cuándo actualizar |
|---------|-----------|-----------------|-------------------|
| `src/tokens/index.ts` | **Fuente de verdad** de tokens | Manual | Al cambiar valores de diseño |
| `src/tokens/tokens.json` | JSON para consumo externo | Auto-generado | Ejecutar `npm run tokens:generate` |
| `src/tokens/css-variables.css` | Variables CSS para web | Auto-generado | Ejecutar `npm run tokens:generate` |
| `android/.../KdsTokens.kt` | Tokens para Android | Auto-generado | Ejecutar `npm run tokens:generate` |

**Flujo de actualización:**
```bash
# 1. SOLO edita el archivo fuente
vim src/tokens/index.ts

# 2. Regenera automáticamente los derivados
npm run tokens:generate

# 3. Verifica que todo compiló correctamente
npm run typecheck
npm run build

# 4. Commit TODOS los archivos generados juntos
git add src/tokens/
git add android/designsystem/src/main/java/com/khipu/designsystem/tokens/KdsTokens.kt
git commit -m "feat(tokens): update color values from Figma

- Update primary purple from #8347AD to #XXXXXX
- Auto-generate JSON, CSS, and Kotlin files
- Verified with typecheck and build"
```

**⚠️ NUNCA edites manualmente:**
- `src/tokens/tokens.json`
- `src/tokens/css-variables.css`
- `android/.../KdsTokens.kt`

Estos archivos se sobrescribirán la próxima vez que ejecutes `npm run tokens:generate`.

---

### 3. Documentación de Uso de Colores

| Archivo | Propósito | Audiencia |
|---------|-----------|-----------|
| `src/stories/brand/03-Colors.stories.mdx` | Guía visual de uso de colores | Diseñadores/Devs |
| `src/tokens/index.ts` | Valores reales de colores | Sistema |
| `src/theme/index.ts` | Aplicación de colores en tema MUI | Sistema |

**Cuándo sincronizar:**
Si cambias la paleta de colores (ej: agregar nuevo color semántico), debes actualizar:
1. `src/tokens/index.ts` (agregar token)
2. `src/theme/index.ts` (mapear a tema MUI)
3. `src/stories/brand/03-Colors.stories.mdx` (documentar uso)

---

### 4. Nombres de Componentes (Post-refactor Kds)

**Estado actual:** Todos los componentes React tienen prefijo `Kds` (commit 9213d43)

| Nombre antiguo | Nombre nuevo | Migrado |
|----------------|--------------|---------|
| `Button` | `KdsButton` | ✅ |
| `TextField` | `KdsTextField` | ✅ |
| `Card` | `KdsCard` | ✅ |
| `Typography` | `KdsTypography` | ✅ |
| `Checkbox` | `KdsCheckbox` | ✅ |
| `Modal` | `KdsModal` | ✅ |
| `Spinner` | `KdsSpinner` | ✅ |
| `LogoHeader` | `KdsLogoHeader` | ✅ |
| `Alert` | `KdsAlert` | ✅ |

**Archivos que referencian nombres de componentes:**
- `CLAUDE.md` - ✅ Actualizado
- `README.md` - Verificar
- `src/**/*.stories.tsx` - Verificar
- `src/examples/**/*.tsx` - Verificar
- Documentación en `docs/` - Verificar

**Búsqueda rápida:**
```bash
# Encontrar referencias a nombres antiguos
grep -r "import.*\<Button\>.*from.*@khipu" --include="*.tsx" --include="*.ts" src/
grep -r "<Button" --include="*.tsx" --include="*.mdx" src/

# Reemplazar en masa (con cuidado)
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' 's/\<Button\>/KdsButton/g' {} +
```

---

## Referencias

- **Tokens:** Ver [`TOKENS_GUIDE.md`](TOKENS_GUIDE.md)
- **Build troubleshooting:** Ver [`BUILD_PUBLISHING.md`](BUILD_PUBLISHING.md)
- **Patrones de componentes:** Ver [`COMPONENT_PATTERNS.md`](COMPONENT_PATTERNS.md)
- **Anti-patrones:** Ver [`development/PAINFUL_PATTERNS.md`](development/PAINFUL_PATTERNS.md)
