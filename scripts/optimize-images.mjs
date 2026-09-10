// 批量图片优化：public/images 下的 png/jpg/jpeg → 按分类上限宽度缩放 + 转 WebP q80
// 同时把 src/content/images.ts 里的路径后缀同步成 .webp
// 可复跑：已存在的 .webp 自动跳过；原图永远留在 resources/原图-public/ 可还原
// 用法：node scripts/optimize-images.mjs
import { readdirSync, statSync, existsSync, unlinkSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname, relative, extname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const imagesDir = join(root, 'public', 'images');

// 分类宽度上限（px）：按显示尺寸留 2x 余量，只缩不放大
const CATEGORY_CAPS = {
  anime: 640, // 一排 5 张的海报条
  games: 640,
  skills: 800, // 技能卡
  works: 1280, // 4 列卡片 + 悬停放大
  album: 1280, // 相册网格
  drawings: 1920, // 可能点开看大图，放宽
  life: 512,
  subscribe: 256, // 平台角标
};
const ROOT_CAPS = { avatar: 512, private: 256 };

// 读图片实际宽度（PNG/JPEG 文件头，免 ffprobe 调用）
function widthOf(file) {
  const b = readFileSync(file);
  if (b[0] === 0x89 && b[1] === 0x50) return b.readUInt32BE(16); // PNG
  if (b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i < b.length) {
      const marker = b[i + 1];
      if (b[i] === 0xff && marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return b.readUInt16BE(i + 7);
      }
      i += 2 + b.readUInt16BE(i + 2);
    }
  }
  return null;
}

function* walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

const files = [...walk(imagesDir)].filter((f) => /\.(png|jpe?g)$/i.test(f));
let before = 0;
let after = 0;
let converted = 0;
const failed = [];

for (const file of files) {
  const rel = relative(imagesDir, file).replace(/\\/g, '/');
  const ext = extname(file).toLowerCase();
  const webp = file.slice(0, -ext.length) + '.webp';
  if (existsSync(webp)) continue; // 复跑跳过

  const parts = rel.split('/');
  let cap;
  if (parts.length === 1) {
    const stem = parts[0].replace(/\.[^.]+$/, '');
    cap = ROOT_CAPS[stem] ?? 512;
  } else {
    cap = CATEGORY_CAPS[parts[0]] ?? 1280;
  }

  const args = ['-hide_banner', '-loglevel', 'error', '-y', '-i', file];
  const w = widthOf(file);
  if (w !== null && w > cap) args.push('-vf', `scale=${cap}:-2`);
  args.push('-c:v', 'libwebp', '-quality', '80', webp);

  const size = statSync(file).size;
  before += size;
  try {
    execFileSync('ffmpeg', args);
    const newSize = statSync(webp).size;
    after += newSize;
    unlinkSync(file);
    converted++;
    console.log(`✓ ${rel}  ${(size / 1024).toFixed(0)}KB → ${(newSize / 1024).toFixed(0)}KB`);
  } catch (err) {
    failed.push(rel);
    console.error(`✗ ${rel}  ${String(err.stderr).slice(0, 200)}`);
  }
}

// images.ts 是全站图片唯一入口：路径后缀统一改成 .webp
const imagesTs = join(root, 'src', 'content', 'images.ts');
const src = readFileSync(imagesTs, 'utf8').replace(
  /(images\/[A-Za-z0-9_\-/]+)\.(png|jpe?g)/g,
  '$1.webp',
);
writeFileSync(imagesTs, src);

console.log(`\n转换 ${converted}/${files.length}，失败 ${failed.length}`);
console.log(`本批体积 ${(before / 1048576).toFixed(1)}MB → ${(after / 1048576).toFixed(1)}MB`);
if (failed.length) console.log('失败：', failed.join(', '));
