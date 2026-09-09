// B站视频封面批量入库 ★ 用法: node scripts/bili-cover.mjs <b23短码|短链|BV号> ... ★
// 流程: b23.tv 短链解析出 BV 号 → 公开 API 取 title + pic 封面 → 封面存 public/images/works/bili-<BV>.jpg
// 每行输出一个 JSON：{ bv, title, file } 或 { input, error }，供 images.ts / works.ts 登记用
import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

const outDir = new URL('../public/images/works/', import.meta.url);
const UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' };

// b23.tv 短码 / 短链 → BV 号；本来就是 BV 号则原样返回
async function resolveBv(input) {
  let s = input.trim();
  if (/^BV[0-9A-Za-z]+/.test(s)) return s;
  if (!/^https?:\/\//i.test(s)) s = 'https://b23.tv/' + s;
  const res = await fetch(s, { redirect: 'manual', headers: UA });
  const loc = res.headers.get('location') || '';
  const m = loc.match(/\/video\/(BV[0-9A-Za-z]+)/);
  if (!m) throw new Error('短链解析失败（Location: ' + loc + '）');
  return m[1];
}

for (const input of process.argv.slice(2)) {
  try {
    const bv = await resolveBv(input);
    const api = await fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${bv}`, { headers: UA });
    const j = await api.json();
    if (j.code !== 0 || !j.data) throw new Error('API code ' + j.code);
    const { title, pic } = j.data;
    const url = pic.startsWith('//') ? 'https:' + pic : pic;
    const file = `bili-${bv}.jpg`;
    const img = await fetch(url, { headers: { ...UA, Referer: 'https://www.bilibili.com' } });
    if (!img.ok) throw new Error('封面下载失败 HTTP ' + img.status);
    await pipeline(img.body, createWriteStream(new URL(file, outDir)));
    console.log(JSON.stringify({ bv, title, file }));
    await new Promise((r) => setTimeout(r, 400)); // 礼貌间隔，防 API 风控
  } catch (e) {
    console.log(JSON.stringify({ input, error: String(e.message || e) }));
  }
}
