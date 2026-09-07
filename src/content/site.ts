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
    // slogan：两行大字，sloganAccent 段粉色高亮
    sloganLead: 'La vie n\'est',
    sloganAccent: 'pas ailleurs',
    subtitle: '真的要偷看我的网站吗？那...那就看吧',
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
