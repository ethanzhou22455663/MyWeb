// ============================================
// 站点资料中心 ★ 日常修改只动这个文件 ★
// 组件里不写死任何文案，全部从这里读取
// ============================================

export interface NavLink {
  label: string;
  href: string;
}

export const site = {
  // ---- 基本信息 ----
  name: '你的名字',
  role: '你的身份 / 一句话介绍（占位，待替换）',

  // ---- 顶部导航 ----
  nav: [
    { label: '历程', href: '#timeline' },
    { label: '技能', href: '#skills' },
    { label: '作品', href: '#works' },
    { label: '生活', href: '#life' },
    { label: '关于', href: '#about' },
    { label: '联系', href: '#contact' },
  ] as NavLink[],

  // ---- 首屏 ----
  hero: {
    titleTop: 'HELLO',
    titleBottom: 'WORLD',
    subtitle: '这里写一句话介绍你自己，说明你是做什么的、擅长什么（占位文案，后续替换）',
    ctaPrimary: '查看作品',
    ctaSecondary: '联系我',
  },

  // ---- 联系方式（全站只此一份）----
  contact: {
    email: 'you@example.com',
    wechat: 'your-wechat-id',
    phone: '000-0000-0000',
  },

  // ---- 页脚 ----
  footer: {
    note: '© 2026 你的名字. All rights reserved.',
  },
};
