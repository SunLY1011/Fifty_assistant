const fs = require('fs');
const path = require('path');

process.chdir(__dirname);

const result = {
  cwd: process.cwd(),
  nodeVersion: process.version,
  hasVueCliService: fs.existsSync(path.join(__dirname, 'node_modules', '@vue', 'cli-service')),
  hasServiceWorkerPlugin: fs.existsSync(path.join(__dirname, 'node_modules', '@vue', 'cli-plugin-pwa')),
  hasRegisterServiceWorker: fs.existsSync(path.join(__dirname, 'node_modules', 'register-service-worker'))
};

const output = JSON.stringify(result, null, 2);
console.log(output);

fs.writeFileSync(path.join(__dirname, 'test_result.json'), output, 'utf-8');

console.log('\nTest done, wrote test_result.json');