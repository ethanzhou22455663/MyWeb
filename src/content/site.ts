// ============================================
// 站点资料中心 ★ 日常修改只动这个文件 ★
// 组件里不写死任何文案，全部从这里读取
// ============================================

import { img } from './images';

export interface NavLink {
  label: string;
  href: string;
  // 有 children 的项渲染成下拉菜单（如「生活」），本身不再直接跳转
  children?: NavLink[];
}

export const site = {
  // ---- 基本信息 ----
  name: '为师就是这么低调',

  // ---- 顶部导航 ----
  nav: [
    { label: '简介', href: '#demographics' },
    { label: '历程', href: '#timeline' },
    { label: '技能', href: '#skills' },
    { label: '作品', href: '#works' },
    { label: '生活', href: '#profile', children: [
      { label: '个人资料', href: '#profile' },
      { label: '爱好', href: '#hobbies' },
      { label: '伙伴', href: '#companions' },
      { label: '追番', href: '#anime' },
      { label: '游戏', href: '#games' },
      { label: '相册', href: '#album' },
      { label: '随心记', href: '#notes' },
    ] },
    { label: '关注', href: '#subscribe' },
  ] as NavLink[],

  // ---- 首屏 ----
  hero: {
    // slogan：三行衬线斜体排版——小号引导（宽字距）/ 白色主题 / 粉色收尾
    sloganEyebrow: 'Il faut',
    sloganMain: 's’imaginer',
    sloganAccent: 'heureux.',
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
    note: '© 2026 为师就是这么低调. All rights reserved.',
  },
};
