// ============================================
// 相册数据 ★ 改相册内容只动这个文件 ★
// 按「主题」分组，每组一行：左边主题大字 + 标题/简介，右边四张照片
// - 条目随意加 / 删 / 改顺序
// - title / description 可留空（整个字段删掉就不显示）
// - photos 可留空（整个字段删掉就只显示文字）；photo.caption 也可留空
// 照片路径从 images.ts 取（import { img } 后填 img.album.xxx）
// ============================================

import { img } from './images';

export interface AlbumPhoto {
  src: string;
  caption?: string; // 照片下方的小字
}

export interface AlbumItem {
  topic: string; // 主题大字（如 日本 / 摩洛哥 / 香港）
  title?: string;
  description?: string;
  photos?: AlbumPhoto[];
}

export const album: AlbumItem[] = [
  {
    topic: '日本',
    photos: [
      { src: img.album.riben1 },
      { src: img.album.riben2 },
      { src: img.album.riben3 },
      { src: img.album.riben4 },
    ],
  },
  {
    topic: '摩洛哥',
    photos: [
      { src: img.album.moluoge1 },
      { src: img.album.moluoge2 },
      { src: img.album.moluoge3 },
      { src: img.album.moluoge4 },
    ],
  },
  {
    topic: '金华',
    photos: [
      { src: img.album.jinhua1 },
      { src: img.album.jinhua2 },
      { src: img.album.jinhua3 },
      { src: img.album.jinhua4 },
    ],
  },
  {
    topic: '香港',
    photos: [
      { src: img.album.xianggang1 },
      { src: img.album.xianggang2 },
      { src: img.album.xianggang3 },
      { src: img.album.xianggang4 },
    ],
  },
  {
    topic: '宁波',
    photos: [
      { src: img.album.ningbo1 },
      { src: img.album.ningbo2 },
      { src: img.album.ningbo3 },
      { src: img.album.ningbo4 },
    ],
  },
  {
    topic: '杭州',
    photos: [
      { src: img.album.hangzhou1 },
      { src: img.album.hangzhou2 },
      { src: img.album.hangzhou3 },
      { src: img.album.hangzhou4 },
    ],
  },
];
