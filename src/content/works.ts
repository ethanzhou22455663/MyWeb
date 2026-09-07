// ============================================
// 作品集数据 ★ 日常维护只动这个文件 ★
//
// 结构：分类 → 作品条目
// - 加分类：往 workCategories 加一个对象
// - 加作品：往对应分类的 items 里加一项（数量不限）
// - image: 可选，图片从 images.ts 取（import { img } 后填 img.xxx.yyy）
//   视频类（AI动画/游戏视频）现在也用封面图，真要内嵌播放器再说
// - link: 可选，点击卡片跳转的链接（游戏试玩 / 工具地址 / B站视频页等）
// - status: 可选，标题右侧的小标签（开发中 / 上线 / 停更 等），粉色胶囊样式
// - description 可整个删掉，不显示
// ============================================

export interface WorkItem {
  image?: string;
  title: string;
  status?: string;
  description?: string;
  link?: string;
}

export interface WorkCategory {
  id: string;
  name: string;
  items: WorkItem[];
}

export const workCategories: WorkCategory[] = [
  {
    id: 'unity',
    name: 'Unity 游戏',
    items: [
      { title: '游戏作品 A（占位）', status: '开发中', description: '一句话介绍玩法或亮点（占位）' },
      { title: '游戏作品 B（占位）', status: '上线' },
    ],
  },
  {
    id: 'web',
    name: '网页工具',
    items: [
      { title: '工具 A（占位）', description: '解决什么问题（占位）' },
      { title: '工具 B（占位）' },
    ],
  },
  {
    id: 'desktop',
    name: '桌面应用',
    items: [
      { title: '应用 A（占位）', description: '一句话介绍（占位）' },
      { title: '应用 B（占位）' },
    ],
  },
  {
    id: 'study-art',
    name: '临摹绘画',
    items: [
      { title: '临摹 A（占位）', description: '原作出处 / 心得（占位）' },
      { title: '临摹 B（占位）' },
      { title: '临摹 C（占位）' },
    ],
  },
  {
    id: 'original-art',
    name: '原创绘画',
    items: [
      { title: '原创 A（占位）', description: '创作思路一句话（占位）' },
      { title: '原创 B（占位）' },
      { title: '原创 C（占位）' },
    ],
  },
  {
    id: 'ai-image',
    name: 'AI 图片',
    items: [
      { title: 'AI 图 A（占位）', description: '用的什么工作流（占位）' },
      { title: 'AI 图 B（占位）' },
    ],
  },
  {
    id: 'ai-video',
    name: 'AI 动画',
    items: [{ title: 'AI 动画 A（占位）', description: '工具链 + 主题（占位）' }],
  },
  {
    id: 'game-video',
    name: '游戏视频',
    items: [{ title: '视频 A（占位）', description: '剪辑 / 实况 / 攻略（占位）' }],
  },
];
