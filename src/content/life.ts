// ============================================
// 生活板块数据 ★ 全是占位，改这里就行 ★
// 四个子块：爱好 / 宠物 / 追番 / 游戏
// 图片字段都可选：路径从 images.ts 取（import { img } 后填 img.xxx.yyy）
//
// 此板块默认锁定（全局密码一次解锁所有私密板块，密码在 access.ts 改）；
// 想改回公开：把 App.tsx 里的 Life 直接渲染、去掉 PrivateGate 即可
// ============================================

import { img } from './images';

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
// bestPicks: 卡片列表上方的一排竖版精选海报（宽 2:3）
export interface Anime {
  title: string;
  progress: string;      // 例如 "第二季 · 第8集"
  status: '追更中' | '已完结' | '想看';
  cover?: string;
}

export const animeBestPicks: Anime[] = [
  { title: '精选番 A', progress: '', status: '想看' },   // cover 留空 = 竖版占位符
  { title: '精选番 B', progress: '', status: '想看' },
  { title: '精选番 C', progress: '', status: '想看' },
  { title: '精选番 D', progress: '', status: '想看' },
];

export const animeList: Anime[] = [
  { title: '孤独摇滚！', progress: '第二季 · 第 8 集', status: '追更中' },
  { title: '葬送的芙莉莲', progress: '全 28 集', status: '已完结' },
  { title: 'GIRLS BAND CRY', progress: '全 13 集', status: '已完结' },
  { title: '迷宫饭', progress: '第 1 季 · 第 5 集', status: '追更中' },
  { title: '地。-关于地球的运动-', progress: '还没开始', status: '想看' },
];

// ---- 游戏 ----
// bestPicks: 卡片列表上方的一排竖版精选海报（宽 2:3）
export interface Game {
  title: string;
  platform: string;      // 例如 "PC / Steam"
  status: '在玩' | '通关' | '搁置';
  cover?: string;
}

export const gameBestPicks: Game[] = [
  { title: '荒野大镖客', platform: '', status: '在玩', cover: img.games.redDeadRedemption2 },
  { title: '空洞骑士', platform: '', status: '在玩', cover: img.games.hollowKnight },
  { title: '丝之歌', platform: '', status: '在玩', cover: img.games.silksong },
  { title: '艾尔登法环', platform: '', status: '通关', cover: img.games.eldenRing },
  { title: '只狼', platform: '', status: '通关', cover: img.games.sekiro },
];

// Galgame 精选海报：游戏区主海报下面，两排各 5 张
export const galBestPicks: Game[] = [
  { title: 'ATRI', platform: '', status: '通关', cover: img.galgames.atri },
  { title: '魔女的夜宴', platform: '', status: '通关', cover: img.galgames.sanobaWitch },
  { title: '近月少女的礼仪', platform: '', status: '通关', cover: img.galgames.tsukiOtome },
  { title: '甜蜜女友3', platform: '', status: '在玩', cover: img.galgames.amakano3 },
  { title: '甜蜜女友2', platform: '', status: '通关', cover: img.galgames.amakano2 },
  { title: '缘之空', platform: '', status: '通关', cover: img.galgames.yosugaNoSora },
  { title: 'Making＊Lovers', platform: '', status: '通关', cover: img.galgames.makingLovers },
  { title: 'Sugar Style', platform: '', status: '通关', cover: img.galgames.sugarStyle },
  { title: 'LimeLight Lemonade Jam', platform: '', status: '在玩', cover: img.galgames.limeLight },
  { title: '星光咖啡馆与死神之蝶', platform: '', status: '通关', cover: img.galgames.cafeStella },
];

// 玩过的游戏清单：主海报与 Galgame 之间的条目表格（和底部 Galgame 清单同款样式）
export const gameCollection: Game[] = [
  { title: '黑暗之魂3', platform: 'PC', status: '通关' },
  { title: '孤山独影', platform: 'PC', status: '在玩' },
  { title: '隐形守护者', platform: 'PC', status: '通关' },
  { title: 'GTA V', platform: 'PC', status: '通关' },
  { title: '双影奇境', platform: 'PC', status: '通关' },
  { title: '双人成行', platform: 'PC', status: '通关' },
  { title: '奥日与萤火意志', platform: 'PC', status: '通关' },
  { title: '奥日与黑暗森林', platform: 'PC', status: '通关' },
  { title: '极限竞速：地平线4', platform: 'Xbox', status: '通关' },
  { title: '哈迪斯', platform: 'Switch', status: '在玩' },
  { title: 'Neva', platform: 'PC', status: '在玩' },
  { title: '底特律：变人', platform: 'PC', status: '通关' },
  { title: '最后生还者1', platform: 'PS5', status: '通关' },
  { title: 'Ender Lilies', platform: 'PC', status: '通关' },
  { title: '行尸走肉', platform: 'PC', status: '通关' },
  { title: '植物大战僵尸1', platform: 'PC', status: '通关' },
];

// 条目列表：Galgame 清单（显示在海报区下方，cover 留空 = 首字占位）
export const gameList: Game[] = [  { title: '美少女万华镜', platform: 'PC', status: '通关' },
  { title: '完蛋！我被美女包围了', platform: 'Steam', status: '通关' },
  { title: '完蛋！我被美女包围了2', platform: 'Steam', status: '在玩' },
  { title: '美女请别影响我学习', platform: 'Steam', status: '通关' },
  { title: '美女请别影响我成仙', platform: 'Steam', status: '在玩' },
  { title: 'Trouble Days', platform: 'Switch', status: '通关' },
  { title: '一生推不如一生恋', platform: 'PC', status: '通关' },
  { title: 'Fox Hime Zero', platform: 'Steam', status: '在玩' },
  { title: 'Summer Pockets', platform: 'Switch', status: '通关' },
  { title: '千恋万花', platform: 'PC', status: '通关' },
];
