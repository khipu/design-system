#!/usr/bin/env node
/**
 * Khipu BeerCSS Bundle Builder
 *
 * This script builds a combined BeerCSS bundle with Khipu customizations:
 * 1. Reads BeerCSS from node_modules
 * 2. Reads Material Dynamic Colors from node_modules
 * 3. Combines with Khipu customizations (tokens, components, init)
 * 4. Minifies CSS with cssnano and JS with terser
 * 5. Outputs to dist/beercss/
 *
 * Usage:
 *   node src/beercss/scripts/build.js
 *   npm run beercss:build
 */

const fs = require('fs');
const path = require('path');
const { minify: terserMinify } = require('terser');
const postcss = require('postcss');
const cssnano = require('cssnano');

// Paths
const ROOT_DIR = path.join(__dirname, '../../..');
const CUSTOMIZATIONS_DIR = path.join(__dirname, '../customizations');
const OUTPUT_DIR = path.join(ROOT_DIR, 'dist/beercss');

// BeerCSS package paths
const BEERCSS_DIR = path.join(ROOT_DIR, 'node_modules/beercss/dist/cdn');
const MATERIAL_COLORS_DIR = path.join(ROOT_DIR, 'node_modules/material-dynamic-colors/dist/cdn');

/**
 * Ensure directory exists
 */
function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

/**
 * Read file content
 */
function readFile(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        console.error(`❌ Error reading ${filePath}:`, error.message);
        process.exit(1);
    }
}

/**
 * Write file content
 */
function writeFile(filePath, content) {
    try {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Written: ${path.basename(filePath)}`);
    } catch (error) {
        console.error(`❌ Error writing ${filePath}:`, error.message);
        process.exit(1);
    }
}

/**
 * Build CSS bundle
 */
async function buildCSS() {
    console.log('\n📦 Building CSS bundle...');

    // Read source files
    const beerCSS = readFile(path.join(BEERCSS_DIR, 'beer.min.css'));
    const khipuTokens = readFile(path.join(CUSTOMIZATIONS_DIR, 'khipu-tokens.css'));
    const khipuComponents = readFile(path.join(CUSTOMIZATIONS_DIR, 'khipu-components.css'));

    // Remove @import from khipuTokens (we'll include tokens directly)
    const khipuTokensCleaned = khipuTokens.replace(/@import\s+url\([^)]+\);?\s*/g, '');

    // Combine CSS in order: BeerCSS base → Khipu tokens & mappings → Khipu components
    const combinedCSS = `/* Khipu BeerCSS Bundle - Combined CSS */\n\n` +
        `/* BeerCSS v4.0.1 */\n${beerCSS}\n\n` +
        `/* Khipu Design System Tokens & BeerCSS Variable Mappings */\n${khipuTokensCleaned}\n\n` +
        `/* Khipu Custom Components */\n${khipuComponents}\n`;

    // Write non-minified version
    const cssPath = path.join(OUTPUT_DIR, 'khipu-beercss.css');
    writeFile(cssPath, combinedCSS);

    // Minify CSS with cssnano
    console.log('🔧 Minifying CSS...');
    const minifiedResult = await postcss([cssnano({
        preset: ['default', {
            discardComments: { removeAll: true }
        }]
    })]).process(combinedCSS, { from: undefined });

    const minifiedCSS = minifiedResult.css;
    const minCSSPath = path.join(OUTPUT_DIR, 'khipu-beercss.min.css');
    writeFile(minCSSPath, minifiedCSS);

    console.log(`   Original size: ${(combinedCSS.length / 1024).toFixed(2)} KB`);
    console.log(`   Minified size: ${(minifiedCSS.length / 1024).toFixed(2)} KB`);
    console.log(`   Saved: ${((1 - minifiedCSS.length / combinedCSS.length) * 100).toFixed(1)}%`);
}

/**
 * Build JS bundle
 */
async function buildJS() {
    console.log('\n📦 Building JS bundle...');

    // Read source files - use non-minified beer.js and minify all together
    let beerJS = readFile(path.join(BEERCSS_DIR, 'beer.js'));
    let materialColorsJS = readFile(path.join(MATERIAL_COLORS_DIR, 'material-dynamic-colors.min.js'));
    const khipuInitJS = readFile(path.join(CUSTOMIZATIONS_DIR, 'khipu-init.js'));
    const khipuOnboardingJS = readFile(path.join(CUSTOMIZATIONS_DIR, 'khipu-onboarding.js'));

    // Remove ES6 export statements from CDN files (they're meant for modules, but we're using regular script tag)
    beerJS = beerJS.replace(/export\s*\{[^}]*\};?/g, '');
    beerJS = beerJS.replace(/export\s+default\s+[^;]+;?/g, '');
    materialColorsJS = materialColorsJS.replace(/export\s*\{[^}]*\};?/g, '');
    materialColorsJS = materialColorsJS.replace(/export\s+default\s+[^;]+;?/g, '');

    // Combine JS in order: BeerCSS → Material Colors → Khipu init → Khipu onboarding
    const combinedJS = `/* Khipu BeerCSS Bundle - Combined JavaScript */\n\n` +
        `/* BeerCSS v4.0.1 */\n${beerJS}\n\n` +
        `/* Material Dynamic Colors v1.1.2 */\n${materialColorsJS}\n\n` +
        `/* Khipu Initialization */\n${khipuInitJS}\n\n` +
        `/* Khipu Onboarding Controller */\n${khipuOnboardingJS}\n`;

    // Write non-minified version
    const jsPath = path.join(OUTPUT_DIR, 'khipu-beercss.js');
    writeFile(jsPath, combinedJS);

    // Minify JS with terser
    console.log('🔧 Minifying JavaScript...');
    const minifiedResult = await terserMinify(combinedJS, {
        compress: {
            dead_code: true,
            drop_console: false,
            drop_debugger: true,
            keep_classnames: true,
            keep_fnames: false,
            passes: 1
        },
        mangle: {
            keep_classnames: true,
            keep_fnames: false
        },
        format: {
            comments: false
        },
        ecma: 2015
    });

    if (minifiedResult.error) {
        console.error('❌ Error minifying JS:', minifiedResult.error);
        process.exit(1);
    }

    const minifiedJS = minifiedResult.code;
    const minJSPath = path.join(OUTPUT_DIR, 'khipu-beercss.min.js');
    writeFile(minJSPath, minifiedJS);

    console.log(`   Original size: ${(combinedJS.length / 1024).toFixed(2)} KB`);
    console.log(`   Minified size: ${(minifiedJS.length / 1024).toFixed(2)} KB`);
    console.log(`   Saved: ${((1 - minifiedJS.length / combinedJS.length) * 100).toFixed(1)}%`);
}

/**
 * Generate metadata file
 */
function generateMetadata() {
    console.log('\n📝 Generating metadata...');

    const packageJson = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf8'));

    const metadata = {
        name: '@khipu/design-system/beercss',
        version: packageJson.version,
        description: 'Khipu BeerCSS bundle with Material Design 3 and Khipu customizations',
        buildDate: new Date().toISOString(),
        includes: {
            'beercss': '4.0.1',
            'material-dynamic-colors': '1.1.2',
            'khipu-tokens': 'latest',
            'khipu-components': 'latest',
            'khipu-init': 'latest'
        },
        files: {
            css: 'khipu-beercss.min.css',
            cssUnminified: 'khipu-beercss.css',
            js: 'khipu-beercss.min.js',
            jsUnminified: 'khipu-beercss.js'
        },
        cdn: {
            css: `https://cdn.jsdelivr.net/npm/@khipu/design-system@${packageJson.version}/dist/beercss/khipu-beercss.min.css`,
            js: `https://cdn.jsdelivr.net/npm/@khipu/design-system@${packageJson.version}/dist/beercss/khipu-beercss.min.js`
        }
    };

    const metadataPath = path.join(OUTPUT_DIR, 'metadata.json');
    writeFile(metadataPath, JSON.stringify(metadata, null, 2));
}

/**
 * Main build function
 */
async function build() {
    console.log('🎨 Khipu BeerCSS Bundle Builder\n');
    console.log('================================');

    // Ensure output directory exists
    ensureDir(OUTPUT_DIR);

    // Check if BeerCSS is installed
    if (!fs.existsSync(BEERCSS_DIR)) {
        console.error('❌ Error: BeerCSS not found in node_modules.');
        console.error('   Run: npm install beercss material-dynamic-colors');
        process.exit(1);
    }

    try {
        // Build CSS and JS bundles
        await buildCSS();
        await buildJS();
        generateMetadata();

        console.log('\n✅ Build complete!\n');
        console.log('📦 Output directory:', OUTPUT_DIR);
        console.log('\n💡 Next steps:');
        console.log('   1. Test locally: npm run dev');
        console.log('   2. Publish: npm publish');
        console.log('   3. Use via CDN in payment app\n');

    } catch (error) {
        console.error('\n❌ Build failed:', error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

// Run build
if (require.main === module) {
    build();
}

module.exports = { build };
