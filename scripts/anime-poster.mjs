// ============================================
// 动漫竖版海报一键下载 ★ 优先 B 站番剧封面，失败回退 AniList ★
//
// 用法（在仓库根目录运行）：
//   node scripts/anime-poster.mjs            ← 拉下面 TITLES 表里的全部
//   node scripts/anime-poster.mjs 孤独摇滚    ← 只拉某一个（按关键词匹配）
//   node scripts/anime-poster.mjs 孤独摇滚 --force  ← 覆盖已存在的文件
//
// 下载成功后图在 public/images/anime/，
// 记得到 src/content/images.ts 的 anime 里登记（脚本会打印出来）
// ============================================

import { mkdir, writeFile, access, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// ---- 番剧表：B 站搜索关键词 → 文件名 ----
const TITLES = [
  { kw: '孤独摇滚', slug: 'bocchi-the-rock' },
  { kw: 'BanG Dream', slug: 'bang-dream' },
  { kw: '樱花任务', slug: 'sakura-quest' },
  { kw: '干物妹小埋', slug: 'himouto-umaruchan' },
  { kw: '前进吧！登山少女', slug: 'yama-no-susume' },
  { kw: '摇曳露营', slug: 'yuru-camp' },
  { kw: '吹响吧！上低音号', slug: 'hibike-euphonium' },
  { kw: '莉可莉丝', slug: 'lycoris-recoil' },
  { kw: '魔女之旅', slug: 'wandering-witch-elaina' },
  { kw: '南家三姐妹', slug: 'minami-ke' },
  { kw: '悠哉日常大王', slug: 'non-non-biyori' },
  { kw: '普通女高中生要做当地偶像', slug: 'locodol' },
  { kw: '迷途之子', slug: 'mygo' },
  { kw: 'Urara迷路帖', slug: 'urara-meirochou' },
  { kw: 'NEW GAME', slug: 'new-game' },
  { kw: '恋爱研究所', slug: 'love-lab' },
  { kw: '一拳超人', slug: 'one-punch-man' },
  { kw: '邻家索菲', slug: 'tonari-no-kyuuketsuki-san' },
  { kw: '这个勇者明明超强却过分慎重', slug: 'cautious-hero' },
  { kw: '街角魔族', slug: 'machikado-mazoku' },
];

const OUT_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../public/images/anime'
);

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';

// ---------- 找图源 ----------

// B 站番剧搜索：返回封面 URL（协议相对路径）
// 风控会偶发抽风（-412），失败就等一会儿重试
async function bilibiliCover(kw, attempts = 4) {
  const url = `https://api.bilibili.com/x/web-interface/search/type?search_type=media_bangumi&keyword=${encodeURIComponent(kw)}`;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': UA, Referer: 'https://search.bilibili.com' },
        signal: AbortSignal.timeout(15000),
      });
      const data = await res.json();
      if (data.code === 0) {
        const first = data?.data?.result?.[0];
        if (first?.cover) {
          return first.cover.startsWith('//') ? `https:${first.cover}` : first.cover;
        }
        return null; // 真没结果，重试无意义
      }
      // 风控/限流：指数退避后重试
      await new Promise((r) => setTimeout(r, 1500 * (i + 1)));
    } catch {
      await new Promise((r) => setTimeout(r, 1500 * (i + 1)));
    }
  }
  return null;
}

// AniList 回退：coverImage.extraLarge 是高清 2:3 竖图
async function anilistCover(kw) {
  const query = `query ($search: String) {
    Media(search: $search, type: ANIME) { coverImage { extraLarge } }
  }`;
  const res = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'User-Agent': UA },
    body: JSON.stringify({ query, variables: { search: kw } }),
    signal: AbortSignal.timeout(15000),
  });
  const json = await res.json();
  return json?.data?.Media?.coverImage?.extraLarge ?? null;
}

// ---------- 下载 ----------

async function download(url, slug) {
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, Referer: 'https://www.bilibili.com' },
    signal: AbortSignal.timeout(30000),
  });
  if (!res.ok) return null;
  const buf = Buffer.from(await res.arrayBuffer());
  // 校验是真图片：JPEG / PNG / WebP 魔数，且不是错误小页
  const isImg =
    (buf[0] === 0xff && buf[1] === 0xd8) ||
    (buf[0] === 0x89 && buf[1] === 0x50) ||
    buf.toString('ascii', 0, 4) === 'RIFF';
  if (buf.length < 15000 || !isImg) return null;

  const ext = (url.match(/\.(jpg|jpeg|png|webp)/i)?.[1] ?? 'jpg')
    .toLowerCase()
    .replace('jpeg', 'jpg');
  const file = path.join(OUT_DIR, `${slug}.${ext}`);
  await writeFile(file, buf);
  return { file, kb: Math.round(buf.length / 1024) };
}

async function existsAnyExt(slug) {
  try {
    const files = await readdir(OUT_DIR);
    return files.some((f) => f.startsWith(`${slug}.`));
  } catch {
    return false;
  }
}

// ---------- 主流程 ----------

const arg = process.argv[2];
const force = process.argv.includes('--force');

const targets = arg
  ? TITLES.filter((t) => t.kw.includes(arg) || t.slug.includes(arg))
  : TITLES;

if (targets.length === 0) {
  console.error(`✗ 表里没有 "${arg}"，去脚本顶部 TITLES 加一条`);
  process.exit(1);
}

await mkdir(OUT_DIR, { recursive: true });

for (const { kw, slug } of targets) {
  if (!force && (await existsAnyExt(slug))) {
    console.log(`– 已存在 ${slug}（跳过，要覆盖加 --force）`);
    continue;
  }

  let cover = null;
  let src = null;
  try {
    cover = await bilibiliCover(kw);
    if (cover) src = 'B站';
  } catch {
    // B 站不通
  }
  if (!cover) {
    try {
      cover = await anilistCover(kw);
      if (cover) src = 'AniList';
    } catch {
      // AniList 也不通
    }
  }
  if (!cover) {
    console.error(`✗ ${kw}：两个源都没找到，请手动找图放进 public/images/anime/`);
    continue;
  }

  const result = await download(cover, slug);
  if (!result) {
    console.error(`✗ ${kw}：封面下载失败（${src}），请手动找图`);
    continue;
  }

  const rel = path.relative(process.cwd(), result.file);
  console.log(`✓ ${kw} → ${rel}（${result.kb} KB，${src}）`);
  console.log(`    到 src/content/images.ts 的 anime 里登记这一行：`);
  console.log(`    ${slug}: '/images/anime/${path.basename(result.file)}',`);

  // 每部之间歇一下，别连着打触发风控
  await new Promise((r) => setTimeout(r, 800));
}
