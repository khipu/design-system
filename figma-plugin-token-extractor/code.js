// Khipu Token Extractor Plugin
// Extrae todas las variables de Figma y las convierte a formato JSON
// Mostrar la UI
figma.showUI(__html__, { width: 600, height: 800 });
// Función para convertir RGB a hex
function rgbToHex(r, g, b) {
    const toHex = (n) => {
        const hex = Math.round(n * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}
// Función para extraer variables de color
async function extractColorVariables() {
    const collections = await figma.variables.getLocalVariableCollectionsAsync();
    const tokens = {
        metadata: {
            extractedAt: new Date().toISOString(),
            figmaFile: figma.root.name,
            totalCollections: collections.length,
        },
        collections: {},
    };
    for (const collection of collections) {
        const collectionData = {
            name: collection.name,
            modes: {},
            variables: {},
        };
        // Obtener información de modos
        collection.modes.forEach((mode) => {
            collectionData.modes[mode.modeId] = mode.name;
        });
        // Obtener todas las variables de esta colección
        const variables = await figma.variables.getLocalVariablesAsync();
        const collectionVariables = variables.filter((v) => v.variableCollectionId === collection.id);
        for (const variable of collectionVariables) {
            const variableData = {
                name: variable.name,
                resolvedType: variable.resolvedType,
                values: {},
            };
            // Extraer valores para cada modo
            for (const mode of collection.modes) {
                const value = variable.valuesByMode[mode.modeId];
                if (variable.resolvedType === 'COLOR' && typeof value === 'object' && 'r' in value) {
                    // Convertir color RGB a hex
                    const color = value;
                    variableData.values[mode.name] = {
                        hex: rgbToHex(color.r, color.g, color.b),
                        rgba: {
                            r: Math.round(color.r * 255),
                            g: Math.round(color.g * 255),
                            b: Math.round(color.b * 255),
                            a: color.a,
                        },
                        opacity: color.a,
                    };
                }
                else if (typeof value === 'number') {
                    // Valores numéricos (spacing, sizing, etc.)
                    variableData.values[mode.name] = value;
                }
                else if (typeof value === 'string') {
                    // Strings
                    variableData.values[mode.name] = value;
                }
                else if (typeof value === 'object' && 'type' in value && value.type === 'VARIABLE_ALIAS') {
                    // Referencias a otras variables
                    const aliasedVariable = await figma.variables.getVariableByIdAsync(value.id);
                    variableData.values[mode.name] = {
                        type: 'alias',
                        aliasTo: (aliasedVariable === null || aliasedVariable === void 0 ? void 0 : aliasedVariable.name) || 'Unknown',
                    };
                }
                else {
                    variableData.values[mode.name] = value;
                }
            }
            collectionData.variables[variable.name] = variableData;
        }
        tokens.collections[collection.name] = collectionData;
    }
    return tokens;
}
// Función para extraer estilos de color (fallback si no hay variables)
function extractColorStyles() {
    const styles = figma.getLocalPaintStyles();
    const colorStyles = {
        metadata: {
            extractedAt: new Date().toISOString(),
            figmaFile: figma.root.name,
            totalStyles: styles.length,
        },
        styles: {},
    };
    styles.forEach((style) => {
        const paints = style.paints;
        if (paints.length > 0 && paints[0].type === 'SOLID') {
            const color = paints[0].color;
            colorStyles.styles[style.name] = {
                hex: rgbToHex(color.r, color.g, color.b),
                rgba: {
                    r: Math.round(color.r * 255),
                    g: Math.round(color.g * 255),
                    b: Math.round(color.b * 255),
                    a: paints[0].opacity || 1,
                },
            };
        }
    });
    return colorStyles;
}
// Ejecutar extracción inmediatamente
(async () => {
    try {
        console.log('Iniciando extracción de tokens...');
        const variables = await extractColorVariables();
        console.log('Variables extraídas:', Object.keys(variables.collections).length, 'colecciones');
        const styles = extractColorStyles();
        console.log('Estilos extraídos:', Object.keys(styles.styles).length, 'estilos');
        const result = {
            variables,
            styles,
            summary: {
                totalCollections: Object.keys(variables.collections).length,
                totalVariables: Object.values(variables.collections).reduce((sum, col) => sum + Object.keys(col.variables).length, 0),
                totalStyles: Object.keys(styles.styles).length,
            },
        };
        console.log('Enviando datos a la UI...', result.summary);
        // Enviar datos a la UI
        figma.ui.postMessage({
            type: 'tokens-extracted',
            data: result,
        });
    }
    catch (error) {
        console.error('Error al extraer tokens:', error);
        figma.ui.postMessage({
            type: 'error',
            message: (error === null || error === void 0 ? void 0 : error.message) || 'Error desconocido',
        });
    }
})();
// Escuchar mensajes de la UI
figma.ui.onmessage = (msg) => {
    if (msg.type === 'close-plugin') {
        figma.closePlugin();
    }
};
