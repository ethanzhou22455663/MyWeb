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

import { img } from './images';

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
      { title: '仓鼠小屋', status: '开发中', description: '布置仓鼠的温暖小屋：壁炉、跑轮、日历，窗外还有小飞机', image: img.works.hamsterRoom },
      { title: '尴尬对话', status: '上线', description: '对话二选一：无视尴尬的气氛继续，或无法忍受当场退出', image: img.works.awkwardDialogue },
      { title: '像素骑士', status: '开发中', description: '月夜城堡像素横版动作：剑盾、骷髅与血条', image: img.works.pixelKnight },
      { title: '空洞骑士同人', status: '开发中', description: 'Unity 复刻幽暗洞穴：小骑士与黄蜂女的平台跳跃', image: img.works.hollowKnightFangame },
    ],
  },
  {
    id: 'web',
    name: '网页应用',
    items: [
      { title: 'Daily Word', status: '上线', description: '每日单词卡片：梗图配释义，点开即背', image: img.works.dailyWord },
      { title: 'AutoDate', status: '上线', description: '两个 AI 化身替你聊天约会，结果可截图分享', image: img.works.autodate },
      { title: '人格画像', status: '上线', description: '热度 / 坚定度 / 混沌度 / 存在感，四维人格可视化', image: img.works.personaMetrics },
      { title: '元音分布图', status: '上线', description: '英语元音 F1/F2 共振峰分布，附 hid / head / had 对照例词', image: img.works.vowelChart },
      { title: '文书评审', status: '开发中', description: 'Supabase Auth 账号系统，登录后进入文书评审界面', image: img.works.docReview },
      { title: 'AI 恋人', status: '上线', description: 'AI 生成约会场景：摩天轮座舱里的双人夜景', image: img.works.aiDate },
      { title: 'AI 课堂', status: '上线', description: '聊天式 AI 教学：课前思考、学习/答题，这节课讲内存存储形式', image: img.works.aiTutor },
    ],
  },
  {
    id: 'desktop',
    name: '桌面应用',
    items: [
      { title: '速写播放器', status: '上线', description: '手绘风本地播放器：正在播放、进度条与音量控制', image: img.works.sketchPlayer },
      { title: 'Own Your Playlist', status: '上线', description: '本地音乐资料库：歌曲 / 专辑 / 歌手管理，搜索与批量编辑', image: img.works.ownYourPlaylist },
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
