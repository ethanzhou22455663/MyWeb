#!/usr/bin/env node
// ============================================
// 随心记快速追加 ★ npm run note ★
// 用法：
//   npm run note -- "一句话"     直接追加（适合单句）
//   npm run note                交互模式：逐行输入，单独一行 . 结束
//                               （支持直接粘贴多行；Ctrl+D 也可结束）
// 日期自动取今天（本地时区），插入到 notes.ts 数组顶部（页面是新→旧）
// 换行 / 空行 / 缩进全部原样保留：JSON.stringify 保真转义，pre-wrap 原样渲染
// ============================================

import { readFileSync, writeFileSync } from 'node:fs';
import readline from 'node:readline';

const FILE = new URL('../src/content/notes.ts', import.meta.url);

// ---- 取正文：命令参数优先，否则进交互模式 ----
let text = process.argv[2];

if (text === undefined) {
  console.log('逐行输入，Enter 换行、空行直接回车；单独一行 . 结束：');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '❯ ',
  });
  const lines = [];
  rl.prompt();
  for await (const line of rl) {
    if (line === '.') break;
    lines.push(line); // 不 trim：前导空格 / 缩进原样保留
    rl.prompt();
  }
  // 只去掉首尾多余的空行，中间的空行保留
  while (lines.length && lines[0].trim() === '') lines.shift();
  while (lines.length && lines[lines.length - 1].trim() === '') lines.pop();
  text = lines.join('\n');
}

if (!text || !text.trim()) {
  console.error('✗ 空内容，未追加');
  process.exit(1);
}

// ---- 今天：本地时区 YYYY-MM-DD ----
const d = new Date();
const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

// ---- 拼条目：JSON.stringify 保真（换行→\n，引号 / emoji 都安全）----
const entry = [
  '  {',
  `    date: '${date}',`,
  `    text: ${JSON.stringify(text)},`,
  '  },',
];

// ---- 插到数组顶部（export const notes 那行之后），行尾风格跟随原文件 ----
const raw = readFileSync(FILE, 'utf8');
const eol = raw.includes('\r\n') ? '\r\n' : '\n';
const arr = raw.split(/\r?\n/);
const idx = arr.findIndex((l) => /^export const notes[^=]*= \[$/.test(l));
if (idx === -1) {
  console.error('✗ 在 notes.ts 里没找到 notes 数组（文件结构被改过？）');
  process.exit(1);
}
arr.splice(idx + 1, 0, ...entry);
writeFileSync(FILE, arr.join(eol), 'utf8');

console.log(`✓ 已追加 ${date} 的便签（${text.split('\n').length} 行），刷新页面查看`);
