// ============================================
// 生活板块数据 ★ 全是占位，改这里就行 ★
// 四个子块：爱好 / 宠物 / 追番 / 游戏
// 图片字段都可选：填 public/images/ 下的路径就显示真图
//
// 此板块默认锁定（全局密码一次解锁所有私密板块，密码在 access.ts 改）；
// 想改回公开：把 App.tsx 里的 Life 直接渲染、去掉 PrivateGate 即可
// ============================================

// ---- 爱好：纯文字标签 ----
export const hobbies: string[] = [
  '公路骑行',
  '胶片摄影',
  '机械键盘',
  '徒步',
  '手冲咖啡',
  '乐高积木',
];

// ---- 宠物 ----
// media: 每张卡的竖版图片/视频，填了就显示，不填只显示头像
//   - type: 'image' 图片（默认）/ 'video' 视频，video 会显示 ▶ 播放控件
//   - src: 路径（图片/视频都放 public/media/ 后填 '/media/xxx.mp4' 之类）
export interface PetMedia {
  src?: string; // 不填则该项显示粉色序号占位
  type?: 'image' | 'video';
  caption?: string; // 图下小字，可删
}

export interface Pet {
  name: string;
  breed: string;
  description?: string;
  image?: string; // 头部圆形头像
  media?: PetMedia[]; // 下方竖版画廊（左右切换）
}

export const pets: Pet[] = [
  {
    name: '麻酱',
    breed: '布偶猫',
    description: '家里的话痨，永远饿（占位）',
    media: [{}, {}, {}], // 占位：3 张竖版图，之后换成真实 src
  },
  {
    name: '皮蛋',
    breed: '柴犬',
    description: '精力过剩，见猫就怂（占位）',
    media: [{}, {}, {}],
  },
];

// ---- 追番 ----
export interface Anime {
  title: string;
  progress: string;      // 例如 "第二季 · 第8集"
  status: '追更中' | '已完结' | '想看';
  cover?: string;
}

export const animeList: Anime[] = [
  { title: '孤独摇滚！', progress: '第二季 · 第 8 集', status: '追更中' },
  { title: '葬送的芙莉莲', progress: '全 28 集', status: '已完结' },
  { title: 'GIRLS BAND CRY', progress: '全 13 集', status: '已完结' },
  { title: '迷宫饭', progress: '第 1 季 · 第 5 集', status: '追更中' },
  { title: '地。-关于地球的运动-', progress: '还没开始', status: '想看' },
];

// ---- 游戏 ----
export interface Game {
  title: string;
  platform: string;      // 例如 "PC / Steam"
  status: '在玩' | '通关' | '搁置';
  cover?: string;
}

export const gameList: Game[] = [
  { title: '艾尔登法环', platform: 'PC', status: '通关' },
  { title: '空洞骑士', platform: 'PC', status: '在玩' },
  { title: '怪物猎人：荒野', platform: 'PC', status: '在玩' },
  { title: '塞尔达传说：王国之泪', platform: 'Switch', status: '搁置' },
];
