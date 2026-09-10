// 一键部署到 GitHub Pages：build → 把 dist 推到 gh-pages 分支
// 用法：npm run deploy:gh
// 说明：直连推送优先（绕开本机 Clash 代理的 schannel 握手问题），失败再走代理配置；内容无变化时跳过。
import { execSync } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function sh(cmd, opts = {}) {
  console.log(`> ${cmd}`);
  execSync(cmd, { stdio: 'inherit', shell: true, ...opts });
}

// 1. 构建
console.log('—— 构建 ——');
sh('npm run build', { cwd: root });

const dist = join(root, 'dist');
if (!existsSync(dist)) throw new Error('dist 不存在，构建失败');

// 2. 复制 dist 到临时目录（dist 本身在 .gitignore 里，不能在里面开 git）
//    注意：不用 node 的 cpSync——本机环境（疑杀软介入）下它会让进程无声退出，改用 cmd 的 xcopy
const tmp = mkdtempSync(join(tmpdir(), 'gh-deploy-'));
sh(`xcopy "${dist}" "${tmp}\\" /e /i /q /y`, { cwd: root });

// 3. 造一个只含 dist 内容的孤儿分支提交
sh('git init -q -b gh-pages', { cwd: tmp });
sh('git add -A', { cwd: tmp });
let changed = true;
try {
  sh('git diff --cached --quiet', { cwd: tmp }); // 退出码 0 = 无变化
  changed = false;
} catch {}
if (!changed) {
  console.log('内容与线上一致，无需部署。');
  rmSync(tmp, { recursive: true, force: true });
  process.exit(0);
}
const stamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
sh(`git commit -q -m "部署 dist（${stamp}）"`, { cwd: tmp });
const origin = execSync('git config --get remote.origin.url', { cwd: root, shell: true }).toString().trim();
sh(`git remote add origin ${origin}`, { cwd: tmp });

// 4. 推送：直连优先，失败再走全局代理（Clash 7897）
console.log('—— 推送 gh-pages ——');
try {
  sh('git -c http.proxy= -c https.proxy= push -f origin gh-pages', { cwd: tmp });
} catch {
  console.log('直连失败，改走代理重试……');
  sh('git push -f origin gh-pages', { cwd: tmp });
}

rmSync(tmp, { recursive: true, force: true });
console.log('✅ 部署完成：https://ethanzhou22455663.github.io/MyWeb/');
