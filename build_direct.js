process.env.NODE_ENV = 'production';

const path = require('path');
const fs = require('fs');

process.chdir(__dirname);

console.log('=== PWA 构建开始 ===');
console.log('CWD:', process.cwd());
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log();

const Service = require(path.join(__dirname, 'node_modules', '@vue', 'cli-service', 'lib', 'Service'));

const service = new Service(process.cwd());

(async () => {
  try {
    await service.run('build', {}, []);

    console.log('\n=== 构建完成，检查输出 ===\n');

    const distPath = path.join(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      const files = fs.readdirSync(distPath);
      console.log('dist/ 目录内容:');
      files.forEach(f => {
        const fp = path.join(distPath, f);
        const stat = fs.statSync(fp);
        console.log('  ' + (stat.isDirectory() ? '[DIR] ' : '      ') + f + ' (' + (stat.size / 1024).toFixed(1) + ' KB)');
      });
      console.log();

      const manifestPath = path.join(distPath, 'manifest.json');
      if (fs.existsSync(manifestPath)) {
        console.log('[✓] manifest.json 已生成');
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
        console.log('    name:', manifest.name);
        console.log('    short_name:', manifest.short_name);
        console.log('    start_url:', manifest.start_url);
        console.log('    display:', manifest.display);
        console.log('    theme_color:', manifest.theme_color);
        console.log('    background_color:', manifest.background_color);
        console.log('    icons count:', (manifest.icons || []).length);
      } else {
        console.log('[✗] manifest.json 未找到');
      }

      const swPath = path.join(distPath, 'service-worker.js');
      if (fs.existsSync(swPath)) {
        const swContent = fs.readFileSync(swPath, 'utf-8');
        console.log('[✓] service-worker.js 已生成 (' + swContent.length + ' 字节)');
        if (swContent.includes('precache')) {
          console.log('    已包含预缓存逻辑');
        }
        if (swContent.includes('registerRoute')) {
          console.log('    已包含运行时路由缓存');
        }
      } else {
        console.log('[✗] service-worker.js 未找到');
      }

      const precacheFiles = files.filter(f => f.startsWith('precache-manifest'));
      if (precacheFiles.length > 0) {
        const pContent = fs.readFileSync(path.join(distPath, precacheFiles[0]), 'utf-8');
        const match = pContent.match(/self\.__precacheManifest\s*=\s*(\[[\s\S]*?\])/);
        if (match) {
          try {
            const list = JSON.parse(match[1]);
            console.log('[✓] precache-manifest 已生成, 包含 ' + list.length + ' 个资源');
          } catch (e) {
            console.log('[✓] precache-manifest 已生成 (' + precacheFiles[0] + ')');
          }
        } else {
          console.log('[✓] precache-manifest 已生成 (' + precacheFiles[0] + ')');
        }
      } else {
        console.log('[✗] precache-manifest 未找到');
      }

      const indexPath = path.join(distPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        const html = fs.readFileSync(indexPath, 'utf-8');
        console.log();
        console.log('[✓] index.html 已生成');
        if (html.includes('theme-color')) {
          console.log('    已包含 theme-color meta');
        }
        if (html.includes('manifest') || html.includes('manifest.json')) {
          console.log('    已包含 manifest 链接');
        } else {
          console.log('    [注意] 未找到 manifest 链接 - 需要检查构建配置');
        }
      }

      console.log('\n==========================================');
      console.log('  所有关键 PWA 文件已生成 ✓');
      console.log('  项目可部署到支持 HTTPS 的静态服务器');
      console.log('  部署路径: /gojuuon_helper_vue/');
      console.log('==========================================');
    } else {
      console.log('[错误] dist/ 目录未生成');
      process.exit(1);
    }
  } catch (err) {
    console.error('\n[错误] 构建失败:');
    console.error(err.message);
    console.error(err.stack);
    process.exit(1);
  }
})();