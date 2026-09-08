// ============================================
// 发展历程数据 ★ 改时间线内容只动这个文件 ★
// - 条目随意加 / 删 / 改顺序
// - description 可留空（整个字段删掉就不显示）
// - photos 可留空（整个字段删掉就只显示文字）；photo.caption 也可留空
// 照片路径从 images.ts 取（import { img } 后填 img.xxx.yyy）
// ============================================

import { img } from './images';

export interface TimelinePhoto {
  src: string;
  caption?: string; // 拍立得白框底部的小字
}

export interface TimelineItem {
  year: string;
  title: string;
  description?: string;
  photos?: TimelinePhoto[];
}

export const timeline: TimelineItem[] = [
  {
    year: '2021',
    title: '起点（占位）',
    description: '一句话说明这一年发生的事（占位，可删）',
    photos: [
      { src: img.life.graduation, caption: '毕业照（占位）' },
      { src: img.life.hkbuCampus, caption: '校园（占位）' },
      { src: img.life.graduation, caption: '毕业照（占位）' },
    ],
  },
  {
    year: '2023',
    title: '重要节点（占位）',
    description: '一句话（占位）',
    photos: [
      { src: img.life.travel1, caption: '旅行（占位）' },
      { src: img.life.travel2, caption: '旅行（占位）' },
      { src: img.life.travel1, caption: '旅行（占位）' },
    ],
  },
  {
    year: '2025',
    title: '转折（占位）',
    description: '一句话（占位）',
    photos: [
      { src: img.life.hamster1, caption: '麻酱（占位）' },
      { src: img.life.hamster2, caption: '皮蛋（占位）' },
      { src: img.life.hamster1, caption: '麻酱（占位）' },
    ],
  },
  {
    year: '2026',
    title: '现在（占位）',
    photos: [
      { src: img.life.hamsterGame1, caption: '仓鼠小屋（占位）' },
      { src: img.life.hamsterGame2, caption: '游戏截图（占位）' },
      { src: img.life.hamsterGame1, caption: '仓鼠小屋（占位）' },
    ],
  },
];
