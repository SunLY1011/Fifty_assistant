const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');

process.chdir(__dirname);

console.log('Current dir:', process.cwd());
console.log('Starting PWA build...\n');

const binPath = path.join(__dirname, 'node_modules', 'node.exe');
const cliPath = path.join(__dirname, 'node_modules', '@vue', 'cli-service', 'bin', 'vue-cli-service.js');

let nodeBin = process.execPath;
if (!nodeBin || !fs.existsSync(nodeBin)) {
  nodeBin = 'node';
}

console.log('Node path:', nodeBin);
console.log('CLI path:', cliPath);
console.log();

const child = execFile(nodeBin, [cliPath, 'build'], {
  cwd: __dirname,
  maxBuffer: 50 * 1024 * 1024
});

child.stdout.on('data', (data) => {
  process.stdout.write(data);
});

child.stderr.on('data', (data) => {
  process.stderr.write(data);
});

child.on('close', (code) => {
  console.log('\n--- Build exit code:', code, '---\n');

  const distPath = path.join(__dirname, 'dist');
  if (fs.existsSync(distPath)) {
    const files = fs.readdirSync(distPath);
    console.log('==========================================');
    console.log('  dist/ files:');
    files.forEach(f => console.log('  - ' + f));
    console.log('==========================================');

    const manifestPath = path.join(distPath, 'manifest.json');
    if (fs.existsSync(manifestPath)) {
      console.log('\n[OK] manifest.json generated');
      try {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
        console.log('  name:', manifest.name);
        console.log('  start_url:', manifest.start_url);
        console.log('  display:', manifest.display);
        console.log('  theme_color:', manifest.theme_color);
        console.log('  icons:', (manifest.icons || []).length);
      } catch (e) {
        console.log('  (parse error:', e.message, ')');
      }
    } else {
      console.log('[MISSING] manifest.json');
    }

    const swPath = path.join(distPath, 'service-worker.js');
    if (fs.existsSync(swPath)) {
      console.log('[OK] service-worker.js generated');
    } else {
      console.log('[MISSING] service-worker.js');
    }

    const precacheFiles = files.filter(f => f.startsWith('precache-manifest'));
    if (precacheFiles.length > 0) {
      console.log('[OK] precache-manifest:', precacheFiles[0]);
    } else {
      console.log('[MISSING] precache-manifest');
    }
  } else {
    console.log('dist/ directory NOT FOUND');
  }

  process.exit(code);
});