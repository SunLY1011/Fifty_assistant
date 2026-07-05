process.env.NODE_ENV = 'production';

const path = require('path');
const fs = require('fs');

process.chdir(__dirname);

const logFile = path.join(__dirname, 'build_output.txt');
const logStream = fs.createWriteStream(logFile, { flags: 'w' });

const origLog = console.log;
console.log = (...args) => {
  const msg = args.map(a => (typeof a === 'string' ? a : JSON.stringify(a))).join(' ');
  logStream.write(msg + '\n');
  origLog.apply(console, args);
};

console.log('=== PWA Build Start ===');
console.log('CWD:', process.cwd());
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log();

const Service = require(path.join(__dirname, 'node_modules', '@vue', 'cli-service', 'lib', 'Service'));
const service = new Service(process.cwd());

(async () => {
  try {
    await service.run('build', {}, []);

    console.log('\n=== Build Done, checking outputs ===\n');

    const distPath = path.join(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      const files = fs.readdirSync(distPath);
      console.log('dist/ files:');
      files.forEach(f => {
        const fp = path.join(distPath, f);
        const stat = fs.statSync(fp);
        const prefix = stat.isDirectory() ? '[DIR] ' : '      ';
        console.log('  ' + prefix + f + ' (' + (stat.size / 1024).toFixed(1) + ' KB)');
      });
      console.log();

      const manifestPath = path.join(distPath, 'manifest.json');
      if (fs.existsSync(manifestPath)) {
        console.log('[OK] manifest.json generated');
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
        console.log('    name:', manifest.name);
        console.log('    short_name:', manifest.short_name);
        console.log('    start_url:', manifest.start_url);
        console.log('    display:', manifest.display);
        console.log('    theme_color:', manifest.theme_color);
        console.log('    background_color:', manifest.background_color);
        console.log('    icons count:', (manifest.icons || []).length);
        console.log('    manifest content:');
        console.log(fs.readFileSync(manifestPath, 'utf-8'));
      } else {
        console.log('[MISSING] manifest.json');
      }

      const swPath = path.join(distPath, 'service-worker.js');
      if (fs.existsSync(swPath)) {
        const swContent = fs.readFileSync(swPath, 'utf-8');
        console.log('[OK] service-worker.js generated (' + swContent.length + ' bytes)');
      } else {
        console.log('[MISSING] service-worker.js');
      }

      const precacheFiles = files.filter(f => f.startsWith('precache-manifest'));
      if (precacheFiles.length > 0) {
        console.log('[OK] precache-manifest: ' + precacheFiles[0]);
      } else {
        console.log('[MISSING] precache-manifest');
      }

      const indexPath = path.join(distPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        const html = fs.readFileSync(indexPath, 'utf-8');
        console.log('[OK] index.html generated');
        console.log('    has theme-color:', html.includes('theme-color'));
        console.log('    has manifest link:', html.includes('manifest'));
      }

      console.log('\n========== BUILD SUCCESS ==========');
    } else {
      console.log('[ERROR] dist/ directory not found');
      process.exit(1);
    }
  } catch (err) {
    console.error('\n[ERROR] Build failed:');
    console.error(err.message);
    if (err.stack) console.error(err.stack);
  } finally {
    logStream.end();
    process.exit(0);
  }
})();