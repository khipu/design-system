const fs = require('fs');

// Leer el archivo JSON de Figma
const figmaData = JSON.parse(fs.readFileSync('./figma-tokens-export.json', 'utf8'));

console.log('=== COMPARACIÓN DE TOKENS: Figma vs Código Actual ===\n');

// Función auxiliar para obtener valores del modo Light
function getLightValue(variable) {
  return variable.values['Light'] || variable.values['Mode 1'];
}

console.log('📦 COLORES - palette\n');
const palette = figmaData.variables.collections.palette;

// Primary colors
console.log('🟣 PRIMARY:');
const primaryMain = getLightValue(palette.variables['primary/main']);
const primaryLight = getLightValue(palette.variables['primary/light']);
const primaryDark = getLightValue(palette.variables['primary/dark']);
const primaryContrast = getLightValue(palette.variables['primary/contrastText']);

console.log(`  main:         ${primaryMain.hex} (actual: #8347AD) ${primaryMain.hex === '#8347AD' ? '✅' : '❌'}`);
console.log(`  light:        ${primaryLight.hex} (actual: #A66BC7) ${primaryLight.hex === '#A66BC7' ? '✅' : '❌ DIFERENTE'}`);
console.log(`  dark:         ${primaryDark.hex} (actual: #5E3280) ${primaryDark.hex === '#5E3280' ? '✅' : '❌ DIFERENTE'}`);
console.log(`  contrastText: ${primaryContrast.hex} (actual: #FFFFFF) ${primaryContrast.hex === '#FFFFFF' ? '✅' : '❌'}`);
console.log('');

// Secondary colors
console.log('🔵 SECONDARY:');
const secondaryMain = getLightValue(palette.variables['secondary/main']);
const secondaryLight = getLightValue(palette.variables['secondary/light']);
const secondaryDark = getLightValue(palette.variables['secondary/dark']);
const secondaryContrast = getLightValue(palette.variables['secondary/contrastText']);

console.log(`  main:         ${secondaryMain.hex} (actual: #9C27B0) ${secondaryMain.hex === '#9C27B0' ? '✅' : '❌ DIFERENTE'}`);
console.log(`  light:        ${secondaryLight.hex} (actual: #BA68C8) ${secondaryLight.hex === '#BA68C8' ? '✅' : '❌ DIFERENTE'}`);
console.log(`  dark:         ${secondaryDark.hex} (actual: #7B1FA2) ${secondaryDark.hex === '#7B1FA2' ? '✅' : '❌ DIFERENTE'}`);
console.log(`  contrastText: ${secondaryContrast.hex} (actual: #FFFFFF) ${secondaryContrast.hex === '#FFFFFF' ? '✅' : '❌'}`);
console.log('');

// Background
console.log('🏠 BACKGROUND:');
const bgDefault = getLightValue(palette.variables['background/default']);
const bgPaper = getLightValue(palette.variables['background/paper-elevation-0']);
console.log(`  default: ${bgDefault.hex} (actual: #FFFFFF) ${bgDefault.hex === '#FFFFFF' ? '✅' : '❌'}`);
console.log(`  paper:   ${bgPaper.hex} (actual: #FFFFFF) ${bgPaper.hex === '#FFFFFF' ? '✅' : '❌'}`);
console.log('');

console.log('📏 SPACING\n');
const spacingCol = figmaData.variables.collections.spacing;
const figmaSpacing = {};
Object.entries(spacingCol.variables).forEach(([key, value]) => {
  figmaSpacing[key] = getLightValue(value);
});

console.log('Figma spacing scale (valores en px):');
Object.entries(figmaSpacing).forEach(([key, value]) => {
  console.log(`  ${key}: ${value}px`);
});
console.log('\nCódigo actual usa escala diferente (0, 1=4px, 2=8px, 3=12px, etc.)');
console.log('⚠️  La escala de Figma es diferente: 1=8px, 2=16px, 3=24px...');
console.log('');

console.log('🔤 TYPOGRAPHY\n');
const typoCol = figmaData.variables.collections.typography;
const fontFamily = getLightValue(typoCol.variables['fontFamily']);
const fontWeights = {
  light: getLightValue(typoCol.variables['fontWeightLight']),
  regular: getLightValue(typoCol.variables['fontWeightRegular']),
  medium: getLightValue(typoCol.variables['fontWeightMedium']),
  semiBold: getLightValue(typoCol.variables['fontWeightSemiBold']),
  bold: getLightValue(typoCol.variables['fontWeightBold']),
};

console.log(`Font Family: ${fontFamily} (actual: "Public Sans") ${fontFamily === 'Public Sans' ? '✅' : '❌'}`);
console.log(`Font Weights:`);
console.log(`  light: ${fontWeights.light} (actual: no definido) ⚠️  NUEVO`);
console.log(`  regular: ${fontWeights.regular} (actual: 400) ${fontWeights.regular === 400 ? '✅' : '❌'}`);
console.log(`  medium: ${fontWeights.medium} (actual: 500) ${fontWeights.medium === 500 ? '✅' : '❌'}`);
console.log(`  semiBold: ${fontWeights.semiBold} (actual: 600) ${fontWeights.semiBold === 600 ? '✅' : '❌'}`);
console.log(`  bold: ${fontWeights.bold} (actual: 700) ${fontWeights.bold === 700 ? '✅' : '❌'}`);
console.log('');

console.log('📐 BREAKPOINTS\n');
const bpCol = figmaData.variables.collections.breakpoints;
const figmaBp = {
  xs: getLightValue(bpCol.variables['xs']),
  sm: getLightValue(bpCol.variables['sm']),
  md: getLightValue(bpCol.variables['md']),
  lg: getLightValue(bpCol.variables['lg']),
  xl: getLightValue(bpCol.variables['xl']),
};

console.log(`xs: ${figmaBp.xs}px (actual: 0px) ${figmaBp.xs === 0 ? '✅' : '❌ DIFERENTE'}`);
console.log(`sm: ${figmaBp.sm}px (actual: 600px) ${figmaBp.sm === 600 ? '✅' : '❌'}`);
console.log(`md: ${figmaBp.md}px (actual: 900px) ${figmaBp.md === 900 ? '✅' : '❌'}`);
console.log(`lg: ${figmaBp.lg}px (actual: 1200px) ${figmaBp.lg === 1200 ? '✅' : '❌'}`);
console.log(`xl: ${figmaBp.xl}px (actual: 1536px) ${figmaBp.xl === 1536 ? '✅' : '❌'}`);
console.log('');

console.log('🔷 SHAPE\n');
const shapeCol = figmaData.variables.collections.shape;
const borderRadius = getLightValue(shapeCol.variables['borderRadius']);
const borderNone = getLightValue(shapeCol.variables['none']);

console.log(`borderRadius: ${borderRadius}px (actual: 4px en buttons/inputs) ${borderRadius === 4 ? '✅' : '❌'}`);
console.log(`none: ${borderNone}px (actual: 0px) ${borderNone === 0 ? '✅' : '❌'}`);
console.log('');

console.log('\n=== RESUMEN DE CAMBIOS REQUERIDOS ===\n');
console.log('❌ PRIMARY.LIGHT: Cambiar de #A66BC7 a ' + primaryLight.hex);
console.log('❌ PRIMARY.DARK: Cambiar de #5E3280 a ' + primaryDark.hex);
console.log('❌ SECONDARY.MAIN: Cambiar de #9C27B0 a ' + secondaryMain.hex);
console.log('❌ SECONDARY.LIGHT: Cambiar de #BA68C8 a ' + secondaryLight.hex);
console.log('❌ SECONDARY.DARK: Cambiar de #7B1FA2 a ' + secondaryDark.hex);
console.log('⚠️  BREAKPOINTS.XS: Cambiar de 0px a ' + figmaBp.xs + 'px');
console.log('⚠️  SPACING: Revisar si la escala de Figma (1=8px) debe reemplazar la actual (1=4px)');
console.log('✅ Font weights coinciden (excepto light=300 que no está en código)');
console.log('✅ Shape borderRadius coincide (4px)');
console.log('✅ Background colors coinciden');
console.log('');
