// ============================================
// 站点资料中心 ★ 日常修改只动这个文件 ★
// 组件里不写死任何文案，全部从这里读取
// ============================================

import { img } from './images';

export interface NavLink {
  label: string;
  href: string;
}

export const site = {
  // ---- 基本信息 ----
  name: '你的名字',

  // ---- 顶部导航 ----
  nav: [
    { label: '简介', href: '#demographics' },
    { label: '历程', href: '#timeline' },
    { label: '技能', href: '#skills' },
    { label: '作品', href: '#works' },
    { label: '生活', href: '#profile' },
    { label: '关注', href: '#subscribe' },
  ] as NavLink[],

  // ---- 首屏 ----
  hero: {
    // slogan：两行大字，sloganAccent 段粉色高亮
    sloganLead: 'La vie n\'est',
    sloganAccent: 'pas ailleurs',
    subtitle: '真的要偷看我的网站吗？那...那就看吧',
  },

  // ---- 订阅方式（全站只此一份；网页端叫「关注」）----
  // channel/avatar = 频道名与头像；badge = 平台标志角标
  // href 即点击跳转目标，外链走完整 https；description = 频道简介
  subscribe: [
    {
      label: 'B站',
      en: 'BILIBILI',
      channel: '为师就是这么低调',
      avatar: img.subscribe.avatarBilibili,
      badge: img.subscribe.bilibili,
      value: 'b23.tv/4xUF4TO',
      href: 'https://b23.tv/4xUF4TO',
      description: '游戏实况、绘画过程和瞎搞的各种东西（简介占位）',
    },
    {
      label: '小红书',
      en: 'REDNOTE',
      channel: '为师就是这么低调',
      avatar: img.subscribe.avatarXiaohongshu,
      badge: img.subscribe.xiaohongshu,
      value: 'xhslink.cn/o/AgqsSYS862j',
      href: 'https://xhslink.cn/o/AgqsSYS862j',
      description: '日常碎片、画画打卡和碎碎念（简介占位）',
    },
  ],

  // ---- 页脚 ----
  footer: {
    note: '© 2026 你的名字. All rights reserved.',
  },
};
