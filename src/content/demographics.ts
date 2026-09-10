// ============================================
// 简介数据 ★ 全部占位，日常只改这个文件 ★
// 字段随意加 / 删 / 改：fields 数组加一项就多一行
// 头像默认用首屏同一张，想单独换：把图放进 public/images/ 后在 images.ts 登记
// ============================================

import { img } from './images';
import { site } from './site';

export interface DemographicsField {
  label: string;   // 中文名
  en: string;      // 英文小字（标签感）
  value: string;   // 内容
}

export const demographics = {
  // 小头像：证件照式方框，默认复用首屏头像
  avatar: img.avatar,
  name: site.name,
  tagline: '体验孤独、贫瘠和荒谬的人生',

  // 编号：右上角的装饰性编号
  fileNo: 'NO. 2026-0917',

  // 社会信息：一行一条，细线分隔
  fields: [
    { label: '性别',     en: 'SEX',        value: '男' },
    { label: '出生年份', en: 'BIRTH',       value: '1999 年' },
    { label: '婚育状况', en: 'MARITAL',    value: '未婚 · 无子女' },
    { label: '现居',     en: 'BASE',       value: '宁波' },
    { label: '职业',     en: 'OCCUPATION', value: '网站运营' },
    { label: '信仰',     en: 'RELIGION',       value: '无神论' },
  ] as DemographicsField[],

  // 简介：一段话
  bio: '白天写代码，晚上也写代码。喜欢做小而完整的工具，相信把一件事做到 80 分好过把十件事做到 60 分。正在学法语和画画，目标是不靠字幕看懂法国电影。（占位简介，改这里）',
};
