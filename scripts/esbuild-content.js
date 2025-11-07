// scripts/esbuild-content.js
const esbuild = require('esbuild');
const path = require('path');

esbuild.build({
  entryPoints: [path.resolve(__dirname, '../src/contentScript.js')],
  bundle: true,
  minify: true,
  outfile: path.resolve(__dirname, '../build/contentScript.bundle.js'),
  platform: 'browser',
  target: ['chrome100']
}).then(() => {
  console.log('✅ contentScript.bundle.js built successfully');
}).catch(() => process.exit(1));
