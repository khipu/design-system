# Storybook MCP Integration

Este documento describe la integración del Model Context Protocol (MCP) con Storybook 10 en el proyecto.

## 📋 Resumen

Desde la versión 10, Storybook incluye soporte nativo para MCP a través del addon `@storybook/addon-mcp`. Esto permite a los agentes de IA (como Claude Code) acceder directamente a la documentación de componentes, obtener URLs de stories y recibir instrucciones para escribir stories.

## 🎯 Beneficios

- **Acceso directo a componentes**: Los agentes pueden consultar la documentación de componentes sin salir del contexto
- **URLs de preview**: Obtener enlaces directos a stories para verificación visual
- **Instrucciones contextuales**: Guías automáticas para escribir stories siguiendo las convenciones del proyecto
- **Sin dependencias externas**: El servidor MCP corre directamente en Storybook (no requiere `storybook-mcp` externo)

## 🔧 Configuración

### Requisitos

- **Storybook**: v10.2.16+
- **Addon**: `@storybook/addon-mcp` v0.3.4+
- **Storybook corriendo**: El servidor MCP solo está disponible cuando Storybook está activo

### Instalación

El addon ya está instalado y configurado:

```bash
npm install --save-dev @storybook/addon-mcp
```

Configuración en `.storybook/main.ts`:

```typescript
const config: StorybookConfig = {
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-mcp',  // ✅ Addon MCP
  ],
  // ...
};
```

### Configuración MCP

El proyecto incluye dos configuraciones de servidor MCP:

**1. Producción (Predeterminado):**
```json
{
  "storybook": {
    "transport": "http",
    "url": "https://design.khipu.com/mcp",
    "description": "Production Storybook MCP server - Always available"
  }
}
```

**2. Local (Desarrollo):**
```json
{
  "storybook-local": {
    "transport": "http",
    "url": "http://localhost:6006/mcp",
    "description": "Local development MCP server (requires npm run storybook)"
  }
}
```

**Nota:** El servidor de producción estará disponible después de desplegar Storybook 10 a GitHub Pages.

## 🚀 Uso

### 1. Iniciar Storybook

```bash
npm run storybook
# Storybook estará disponible en http://localhost:6006
# MCP endpoint: http://localhost:6006/mcp
```

### 2. Verificar Endpoint MCP

```bash
curl -X POST http://localhost:6006/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"tools/list","id":1}'
```

Respuesta esperada:
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "protocolVersion": "2024-11-05",
    "serverInfo": {
      "name": "@storybook/addon-mcp",
      "version": "0.3.4"
    },
    "capabilities": {
      "tools": { "listChanged": true },
      "resources": { "listChanged": true }
    }
  }
}
```

### 3. Herramientas Disponibles

#### `preview-stories`
Obtiene URLs de preview para visualizar stories en el navegador.

**Uso desde Claude Code:**
```
"Muéstrame el preview del KdsButton Primary"
"Dame la URL de la story de TextField con error"
```

**Parámetros:**
- Por `storyId`: Cuando conoces el ID de la story
- Por `absoluteStoryPath` + `exportName`: Cuando trabajas con un archivo específico
- `props` (opcional): Props personalizadas para el preview
- `globals` (opcional): Configuración global (theme, locale, etc.)

#### `get-storybook-story-instructions`
Obtiene instrucciones para escribir stories correctamente.

**Uso desde Claude Code:**
```
"Antes de crear la story, dame las instrucciones"
"Cómo debo escribir stories para este proyecto?"
```

**Proporciona:**
- Estructura correcta de stories para Storybook 10
- Imports requeridos (`Meta`, `StoryObj`)
- Utilidades de testing (`storybook/test`)
- Convenciones de naming
- Patrones de play functions
- Estrategias de mocking

## 📚 Ejemplos de Uso con Claude Code

### Obtener Preview de un Componente

```
Usuario: "Muéstrame el preview del botón primary"

Claude Code:
1. Usa la herramienta mcp__storybook__preview-stories
2. Obtiene URL: http://localhost:6006/?path=/story/core-kdsbutton--primary
3. Responde con el link
```

### Crear una Nueva Story

```
Usuario: "Crea una story para KdsTextField con validación de email"

Claude Code:
1. Llama a get-storybook-story-instructions
2. Sigue las instrucciones obtenidas
3. Crea el archivo .stories.tsx con estructura correcta
4. Incluye imports apropiados y play functions
```

### Verificar Componente Existente

```
Usuario: "Qué variants tiene el KdsButton?"

Claude Code:
1. Consulta documentación via MCP
2. Lista variants: contained, outlined, text
3. Puede proporcionar URLs de cada variant
```

## 🔄 Comparación: Local vs Producción

| Aspecto | Local | Producción |
|---------|-------|------------|
| **Requiere Storybook corriendo** | ✅ Sí (npm run storybook) | ❌ No (siempre disponible) |
| **URL** | http://localhost:6006/mcp | https://design.khipu.com/mcp |
| **Datos** | Componentes locales (WIP) | Componentes publicados estables |
| **Velocidad** | ⚡ Instantánea | 🌐 Rápida (CDN) |
| **Disponibilidad** | Solo con servidor local | ✅ 24/7 |
| **Uso recomendado** | Desarrollo activo, testing | Integración CI/CD, consultas generales |

**Ambos servidores usan el mismo addon nativo `@storybook/addon-mcp` - sin dependencias externas.**

## 🐛 Troubleshooting

### El endpoint /mcp no responde

**Problema:** `curl http://localhost:6006/mcp` retorna error

**Solución:**
1. Verificar que Storybook esté corriendo: `lsof -i :6006`
2. Verificar que el addon esté instalado: `npm list @storybook/addon-mcp`
3. Verificar configuración en `.storybook/main.ts`
4. Reiniciar Storybook: `pkill -f storybook && npm run storybook`

### Claude Code no detecta el servidor MCP

**Problema:** Claude no puede usar las herramientas MCP

**Solución:**
1. Verificar que `.mcp.json` esté en la raíz del proyecto
2. Reiniciar Claude Code para recargar configuración
3. Verificar que Storybook esté corriendo
4. Probar manualmente con curl para validar el endpoint

### Errores "Story not found"

**Problema:** El MCP no encuentra una story específica

**Solución:**
1. Verificar que la story esté exportada correctamente
2. Rebuild Storybook: `npm run build-storybook`
3. Verificar el story ID en el navegador (URL path)
4. Usar `withStoryIds=true` en list-all-documentation

## 📖 Referencias

- [Storybook 10 Migration Guide](https://storybook.js.org/docs/releases/migration-guide)
- [@storybook/addon-mcp - npm](https://www.npmjs.com/package/@storybook/addon-mcp)
- [Storybook Addon MCP - Official Docs](https://storybook.js.org/addons/@storybook/addon-mcp)
- [Model Context Protocol](https://github.com/modelcontextprotocol)

## 🔄 Historial de Cambios

### v0.2.0 - 2026-03-09

- ✅ Actualizado Storybook de 7.6.20 a 10.2.16
- ✅ Instalado @storybook/addon-mcp v0.3.4
- ✅ Configurado endpoint nativo en http://localhost:6006/mcp
- ✅ Actualizado .mcp.json con servidor local y producción
- ✅ Migrado archivos .stories.mdx a .mdx
- ✅ Actualizado imports de theming para ESM
- 📝 Documentado integración MCP completa
