#!/usr/bin/env node
/**
 * Khipu BeerCSS Development Server
 *
 * - Serves the demo app at http://localhost:3000
 * - Watches for changes in customizations and rebuilds automatically
 * - Enables live development of BeerCSS components
 *
 * Usage:
 *   node src/beercss/scripts/dev-server.js
 *   npm run beercss:dev
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const { build } = require('./build.js');

const ROOT_DIR = path.join(__dirname, '../../..');
const DEMO_DIR = path.join(__dirname, '../demo');
const CUSTOMIZATIONS_DIR = path.join(__dirname, '../customizations');
const PORT = 3000;

// MIME types
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.woff2': 'font/woff2'
};

/**
 * Simple HTTP server
 */
function createServer() {
    return http.createServer((req, res) => {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

        let filePath = req.url === '/' ? '/index.html' : req.url;

        // Serve from demo directory or root directory
        if (filePath.startsWith('/dist/')) {
            filePath = path.join(ROOT_DIR, filePath);
        } else {
            filePath = path.join(DEMO_DIR, filePath);
        }

        const ext = path.extname(filePath);
        const contentType = MIME_TYPES[ext] || 'text/plain';

        fs.readFile(filePath, (err, content) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end('<h1>404 Not Found</h1>', 'utf-8');
                } else {
                    res.writeHead(500);
                    res.end(`Server Error: ${err.code}`, 'utf-8');
                }
            } else {
                res.writeHead(200, {
                    'Content-Type': contentType,
                    'Cache-Control': 'no-cache'
                });
                res.end(content, 'utf-8');
            }
        });
    });
}

/**
 * Watch for changes in customizations
 */
function watchCustomizations() {
    console.log('\n👀 Watching for changes in customizations...\n');

    let buildTimeout;

    fs.watch(CUSTOMIZATIONS_DIR, { recursive: true }, (eventType, filename) => {
        if (filename && (filename.endsWith('.css') || filename.endsWith('.js'))) {
            console.log(`\n📝 Change detected: ${filename}`);
            console.log('🔨 Rebuilding bundle...\n');

            // Debounce builds
            clearTimeout(buildTimeout);
            buildTimeout = setTimeout(async () => {
                try {
                    await build();
                    console.log('\n✅ Bundle rebuilt successfully!');
                    console.log('🔄 Refresh your browser to see changes.\n');
                } catch (error) {
                    console.error('\n❌ Build failed:', error.message);
                    console.error('Fix the error and save again.\n');
                }
            }, 300);
        }
    });
}

/**
 * Main function
 */
async function main() {
    console.log('🎨 Khipu BeerCSS Development Server\n');
    console.log('====================================\n');

    // Initial build
    console.log('🔨 Building initial bundle...\n');
    try {
        await build();
        console.log('\n✅ Initial build complete!\n');
    } catch (error) {
        console.error('❌ Initial build failed:', error.message);
        process.exit(1);
    }

    // Start server
    const server = createServer();
    server.listen(PORT, () => {
        console.log('🚀 Development server running!\n');
        console.log(`   Local:   http://localhost:${PORT}`);
        console.log(`   Network: http://127.0.0.1:${PORT}\n`);
        console.log('📦 Serving:');
        console.log(`   • Demo app: ${DEMO_DIR}`);
        console.log(`   • Bundle:   ${ROOT_DIR}/dist/beercss/\n`);
        console.log('💡 Tips:');
        console.log('   • Edit files in src/beercss/customizations/');
        console.log('   • Bundle rebuilds automatically');
        console.log('   • Refresh browser to see changes');
        console.log('   • Press Ctrl+C to stop\n');
    });

    // Watch for changes
    watchCustomizations();

    // Handle shutdown
    process.on('SIGINT', () => {
        console.log('\n\n👋 Shutting down development server...');
        server.close(() => {
            console.log('✅ Server stopped.\n');
            process.exit(0);
        });
    });
}

// Run server
if (require.main === module) {
    main();
}

module.exports = { createServer, watchCustomizations };
