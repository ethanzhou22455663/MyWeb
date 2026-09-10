// ============================================
// 游戏海报一键下载 ★ 从 Steam CDN 拉 2:3 竖版海报 ★
//
// 用法（在仓库根目录运行）：
//   node scripts/game-poster.mjs 只狼              ← 中文别名（查表，见下）
//   node scripts/game-poster.mjs 1174180           ← Steam appid（商店页 URL 里 /app/ 后面那串数字）
//   node scripts/game-poster.mjs "Baldur's Gate 3" ← 英文名（走 storesearch，部分网络不通）
//   node scripts/game-poster.mjs <任意> --force    ← 覆盖已存在的文件
//
// 下载成功后图在 public/images/games/，
// 记得到 src/content/images.ts 的 games 里登记一行（脚本会打印出来）
// ============================================

import { mkdir, writeFile, access } from 'node:fs/promises';
import { createInterface } from 'node:readline/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// ---- 中文别名表：常加的游戏在这登记，名字 → appid + 文件名 ----
// storesearch 接口在部分网络（如本机）不通，别名表保证中文名永远可用
const ALIASES = {
  '荒野大镖客': { appid: 1174180, slug: 'red-dead-redemption-2' },
  '荒野大镖客2': { appid: 1174180, slug: 'red-dead-redemption-2' },
  '空洞骑士': { appid: 367520, slug: 'hollow-knight' },
  '丝之歌': { appid: 1030300, slug: 'hollow-knight-silksong' },
  '艾尔登法环': { appid: 1245620, slug: 'elden-ring' },
  '只狼': { appid: 814380, slug: 'sekiro' },
};

// Steam 竖版海报的两个 CDN 源（library 600x900，2x = 1200x1800，正好 2:3）
const CDN_HOSTS = [
  'https://steamcdn-a.akamaihd.net',
  'https://cdn.cloudflare.steamstatic.com',
];
const POSTER_VARIANTS = ['library_600x900_2x.jpg', 'library_600x900.jpg'];

const OUT_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../public/images/games'
);

// ---------- 工具 ----------

// "Hollow Knight: Silksong" → "hollow-knight-silksong"
function slugify(name) {
  return name
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[『』「」]/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

// 按 appid 从 CDN 下载竖版海报；两个 host × 两种尺寸都试一遍
async function downloadPoster(appid, dest) {
  for (const host of CDN_HOSTS) {
    for (const variant of POSTER_VARIANTS) {
      const url = `${host}/steam/apps/${appid}/${variant}`;
      try {
        const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
        if (!res.ok) continue;
        const buf = Buffer.from(await res.arrayBuffer());
        // 校验是真 JPEG：魔数 FF D8 且够大（错误页一般只有几 KB）
        if (buf.length < 20_000 || buf[0] !== 0xff || buf[1] !== 0xd8) continue;
        await writeFile(dest, buf);
        return { ok: true, url, kb: Math.round(buf.length / 1024) };
      } catch {
        // 这个源不通就换下一个
      }
    }
  }
  return { ok: false };
}

// 按名字走 storesearch 找 appid（需要能访问 store.steampowered.com）
async function searchByName(name) {
  const url = `https://store.steampowered.com/api/storesearch/?term=${encodeURIComponent(
    name
  )}&cc=us&l=en`;
  const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`storesearch 返回 ${res.status}`);
  const data = await res.json();
  return (data.items ?? []).map((it) => ({ appid: it.id, name: it.name }));
}

// ---------- 主流程 ----------

const input = process.argv[2];
const force = process.argv.includes('--force');

if (!input) {
  console.log('用法：node scripts/game-poster.mjs <中文别名 | Steam appid | 英文名> [--force]');
  process.exit(1);
}

let appid;
let slug;

// 1) 纯数字 = appid
if (/^\d+$/.test(input)) {
  appid = input;
  slug = `steam-${appid}`; // 拿不到英文名，先按 appid 命名，下载后建议手动改名
}
// 2) 中文别名表
else if (ALIASES[input]) {
  ({ appid, slug } = ALIASES[input]);
}
// 3) 英文名 → storesearch
else {
  let results;
  try {
    results = await searchByName(input);
  } catch {
    console.error(`✗ 按名字搜索需要访问 store.steampowered.com，当前网络不通。`);
    console.error(`  请改成传 Steam appid：打开游戏商店页，URL 是 store.steampowered.com/app/<数字>/，`);
    console.error(`  那个数字就是 appid。也可以在脚本顶部的 ALIASES 里加一条中文别名。`);
    process.exit(1);
  }
  if (results.length === 0) {
    console.error(`✗ Steam 上没找到 "${input}"，换个关键词或直接用 appid`);
    process.exit(1);
  }
  // 多个结果时给编号选择；只有一个直接用它
  let picked = results[0];
  if (results.length > 1) {
    console.log(`找到 ${results.length} 个结果：`);
    results.slice(0, 8).forEach((r, i) => console.log(`  ${i + 1}. ${r.name} (appid ${r.appid})`));
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    const ans = await rl.question(`选一个编号 [1]: `);
    rl.close();
    picked = results[(parseInt(ans, 10) || 1) - 1] ?? results[0];
  }
  appid = String(picked.appid);
  slug = slugify(picked.name);
}

const dest = path.join(OUT_DIR, `${slug}.jpg`);

if ((await exists(dest)) && !force) {
  console.error(`✗ 已存在 ${path.relative(process.cwd(), dest)}（要覆盖加 --force）`);
  console.error(`  别忘了在 src/content/images.ts 的 games 里登记：`);
  console.error(`    ${slug}: 'images/games/${slug}.jpg',`);
  process.exit(1);
}

console.log(`下载 appid ${appid} 的竖版海报…`);
const result = await downloadPoster(appid, dest);

if (!result.ok) {
  console.error(`✗ appid ${appid} 在 Steam CDN 上没有竖版海报（library capsule 缺失）`);
  console.error(`  老游戏或 DLC 可能没有，请手动找图放进 ${path.relative(process.cwd(), OUT_DIR)}/`);
  process.exit(1);
}

console.log(`✓ 已保存 ${path.relative(process.cwd(), dest)}（${result.kb} KB）`);
console.log(`  到 src/content/images.ts 的 games 里登记这一行：`);
console.log(`    ${slug}: 'images/games/${slug}.jpg',`);
