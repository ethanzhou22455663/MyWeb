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
      { title: '芙宁娜', image: img.drawings.furina },
      { title: '芭芭拉小姐', image: img.drawings.missBarbara },
      { title: '线条小狗', image: img.drawings.lineDog },
      { title: '未命名作品', image: img.drawings.untitled },
    ],
  },
  {
    id: 'original-art',
    name: '原创绘画',
    items: [
      { title: '小飞机', image: img.drawings.airplane },
      { title: '雪中之城', image: img.drawings.cityInSnow },
      { title: '飞天仓鼠', image: img.drawings.flyingHamster },
      { title: '山羊', image: img.drawings.goat },
      { title: '仓鼠部落', image: img.drawings.hamsterTribe },
      { title: '天空中的仓鼠', image: img.drawings.hamstersInTheSky },
      { title: '月夜', image: img.drawings.moonlitNight },
      { title: '大力王', image: img.drawings.kingOfStrength },
      { title: '仓鼠', image: img.drawings.painting },
      { title: '荒野大镖客', image: img.drawings.redDeadRedemption },
      { title: '夏日田野', image: img.drawings.summerField },
      { title: '冬日田野', image: img.drawings.winterField },
    ],
  },
  {
    id: 'ai-image',
    name: 'AI 图片',
    items: [
      { title: '游乐园手风琴', image: img.works.aiAmusementPark },
      { title: '窗边午后', image: img.works.aiWindowLight },
    ],
  },
  {
    id: 'ai-video',
    name: 'AI 动画',
    items: [
      {
        title: '后藤独波奇当上美国总统后发表胜选演说',
        description: 'Sora 2 生成 · 孤独摇滚二创',
        image: img.works.bocchiSpeech,
        link: 'https://www.bilibili.com/video/BV114y6BAENH',
      },
      {
        title: 'Sora2 山田凉勇闯国会，抗议后藤独当美国总统',
        description: 'Sora 2 生成 · 孤独摇滚二创',
        image: img.works.ryoProtest,
        link: 'https://www.bilibili.com/video/BV1BxyCB8Ezj',
      },
      {
        title: '遭遇山田凉抗议后，波奇总统被弹劾下台',
        description: 'Sora 2 生成 · 孤独摇滚二创',
        image: img.works.bocchiImpeached,
        link: 'https://www.bilibili.com/video/BV1idyWBME47',
      },
      {
        title: '波奇总统下台后，山田凉当选美国总统',
        description: 'Sora 2 生成 · 孤独摇滚二创',
        image: img.works.ryoPresident,
        link: 'https://www.bilibili.com/video/BV1yGyaB6Ehz',
      },
      {
        title: '美国总统波奇和第一夫人虹夏公开秀恩爱',
        description: 'Sora 2 生成 · 孤独摇滚二创',
        image: img.works.bocchiNijika,
        link: 'https://www.bilibili.com/video/BV1CSS4BqEcs',
      },
      {
        title: '白宫实习生喜多想和波奇总统好好相处',
        description: 'Sora 2 生成 · 孤独摇滚二创',
        image: img.works.kitaIntern1,
        link: 'https://www.bilibili.com/video/BV1acmnBFER7',
      },
      {
        title: '冒失的白宫实习生喜多让波奇总统脸红了',
        description: 'Sora 2 生成 · 孤独摇滚二创',
        image: img.works.kitaIntern2,
        link: 'https://www.bilibili.com/video/BV1b9meBcExw',
      },
      {
        title: '《波申克的救赎》 前总统波奇靠小锤子越狱',
        description: 'Sora 2 生成 · 肖申克的救赎 parody',
        image: img.works.bocchiShawshank,
        link: 'https://www.bilibili.com/video/BV1rC1TBKELP',
      },
      {
        title: '波奇主演泰坦尼克号：你跳的话，我也跳',
        description: 'Sora 2 生成 · 泰坦尼克号 parody',
        image: img.works.bocchiTitanic1,
        link: 'https://www.bilibili.com/video/BV1NqyZBJE94',
      },
      {
        title: '波奇主演泰坦尼克号第二集 扭曲的喜多',
        description: 'Sora 2 生成 · 泰坦尼克号 parody',
        image: img.works.bocchiTitanic2,
        link: 'https://www.bilibili.com/video/BV1YD1vBNEPx',
      },
      {
        title: '波奇主演泰坦尼克号第三集 波喜心永恒',
        description: 'Sora 2 生成 · 泰坦尼克号 parody',
        image: img.works.bocchiTitanic3,
        link: 'https://www.bilibili.com/video/BV1Tm14BNE3z',
      },
    ],
  },
  {
    id: 'game-video',
    name: '游戏视频',
    items: [
      {
        title: '为什么说只狼就是真正的galgame？',
        description: '好感度条都放在最明显的位置了（B 站视频）',
        image: img.works.sekiroGalgame,
        link: 'https://www.bilibili.com/video/BV1c29SBCEZi',
      },
      {
        title: '为什么说只狼不算真正的galgame？',
        description: '姊妹篇：这次论证「不算」（B 站视频）',
        image: img.works.sekiroNotGalgame,
        link: 'https://www.bilibili.com/video/BV1VjoCBDEpx',
      },
      {
        title: '甘雨一回合七发霜霜霜霜霜霜霜华矢',
        description: '原神甘雨：一轮爆发七连霜华矢（B 站视频）',
        image: img.works.ganyuSevenArrows,
        link: 'https://www.bilibili.com/video/BV1ro4y1J7U2',
      },
      {
        title: '漫游者到底是先喝酒还是先上刀，真的太难了',
        description: '世纪难题：先喝酒还是先上刀（B 站视频）',
        image: img.works.wandererChoice,
        link: 'https://www.bilibili.com/video/BV1VdJQzvEua',
      },
      {
        title: 'Unity制作PPT“Skybound”一只热爱飞行的仓鼠的故事',
        description: '用 Unity 做飞行仓鼠的「PPT」演示（B 站视频）',
        image: img.works.skyboundHamster,
        link: 'https://www.bilibili.com/video/BV19qWszqE1f',
      },
    ],
  },
];
