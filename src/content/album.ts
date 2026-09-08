// ============================================
// 相册数据 ★ 改相册内容只动这个文件 ★
// 按「主题」分组，每组一行：左边主题大字 + 标题/简介，右边四张照片
// - 条目随意加 / 删 / 改顺序
// - title / description 可留空（整个字段删掉就不显示）
// - photos 可留空（整个字段删掉就只显示文字）；photo.caption 也可留空
// 照片路径从 images.ts 取（import { img } 后填 img.xxx.yyy）
// ============================================

import { img } from './images';

export interface AlbumPhoto {
  src: string;
  caption?: string; // 照片下方的小字
}

export interface AlbumItem {
  topic: string; // 主题大字（如 毕业 / 宠物 / 旅行）
  title?: string;
  description?: string;
  photos?: AlbumPhoto[];
}

export const album: AlbumItem[] = [
  {
    topic: '毕业',
    title: '本科四年（占位）',
    description: '一句话说明（占位，可删）',
    photos: [
      { src: img.life.graduation, caption: '毕业照（占位）' },
      { src: img.life.hkbuCampus, caption: '校园（占位）' },
      { src: img.life.travel1, caption: '毕业旅行（占位）' },
      { src: img.life.travel2, caption: '毕业旅行（占位）' },
    ],
  },
  {
    topic: '宠物',
    title: '麻酱和皮蛋（占位）',
    photos: [
      { src: img.life.hamster1, caption: '麻酱（占位）' },
      { src: img.life.hamster2, caption: '皮蛋（占位）' },
      { src: img.life.hamster3, caption: '仓鼠（占位）' },
      { src: img.life.hamster4, caption: '仓鼠（占位）' },
    ],
  },
  {
    topic: '游戏',
    title: '仓鼠小屋（占位）',
    photos: [
      { src: img.life.hamsterGame1, caption: '游戏截图（占位）' },
      { src: img.life.hamsterGame2, caption: '游戏截图（占位）' },
      { src: img.life.hamster1, caption: '麻酱（占位）' },
      { src: img.life.hamster2, caption: '皮蛋（占位）' },
    ],
  },
  {
    topic: '日常',
    title: '杂七杂八（占位）',
    photos: [
      { src: img.life.travel1, caption: '旅行（占位）' },
      { src: img.life.travel2, caption: '旅行（占位）' },
      { src: img.life.hamster3, caption: '仓鼠（占位）' },
      { src: img.life.hamster4, caption: '仓鼠（占位）' },
    ],
  },
];
