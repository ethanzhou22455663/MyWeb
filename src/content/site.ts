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
    { label: '简介', href: '#demographics' },
    { label: '历程', href: '#timeline' },
    { label: '技能', href: '#skills' },
    { label: '作品', href: '#works' },
    { label: '生活', href: '#profile' },
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
  // href 即点击跳转目标：邮箱走 mailto，外链走完整 https
  contact: [
    { label: '邮箱', value: 'ethanzhou22455663@outlook.com', href: 'mailto:ethanzhou22455663@outlook.com' },
    { label: 'B站', value: 'b23.tv/4xUF4TO', href: 'https://b23.tv/4xUF4TO' },
    { label: '小红书', value: 'xhslink.cn/o/AgqsSYS862j', href: 'https://xhslink.cn/o/AgqsSYS862j' },
  ],

  // ---- 页脚 ----
  footer: {
    note: '© 2026 你的名字. All rights reserved.',
  },
};
