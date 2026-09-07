// ============================================
// 生活板块数据 ★ 全是占位，改这里就行 ★
// 四个子块：爱好 / 宠物 / 追番 / 游戏
// 图片字段都可选：路径从 images.ts 取（import { img } 后填 img.xxx.yyy）
//
// 此板块默认锁定（全局密码一次解锁所有私密板块，密码在 access.ts 改）；
// 想改回公开：把 App.tsx 里的 Life 直接渲染、去掉 PrivateGate 即可
// ============================================

import { img } from './images';

// ---- 爱好：名称 + 英文 + 一句话介绍（大字索引列表样式，无卡片无图标）----
export interface Hobby {
  name: string;
  en: string; // 跟在中文名右侧的英文小字
  description: string;
}

export const hobbies: Hobby[] = [
  { name: '游戏', en: 'Gaming', description: 'Galgame、独立游戏、3A 都玩，成分复杂（占位）' },
  { name: '动漫', en: 'Anime', description: '追新番也补老番，季度必看（占位）' },
  { name: '语言', en: 'Languages', description: '英语、法语、日语，为了看懂原版（占位）' },
  { name: '健身', en: 'Fitness', description: '力量训练，努力坚持每周三次（占位）' },
  { name: '游泳', en: 'Swimming', description: '最放松的有氧，泡在水里思路最清晰（占位）' },
  { name: '画画', en: 'Drawing', description: '从临摹开始练，目标是画出原创（占位）' },
  { name: '编程', en: 'Coding', description: '白天写代码，晚上也写代码（占位）' },
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
  progress: string;      // 例如 "第二季 · 第8集"（列表已不显示，留档备用）
  tag?: string;          // 右侧徽章：动漫类型，如 音乐 / 奇幻
  cover?: string;
}

export const animeBestPicks: Anime[] = [
  { title: '精选番 A', progress: '' },   // cover 留空 = 竖版占位符
  { title: '精选番 B', progress: '' },
  { title: '精选番 C', progress: '' },
  { title: '精选番 D', progress: '' },
];

export const animeList: Anime[] = [
  { title: '孤独摇滚！', progress: '第二季 · 第 8 集', tag: '音乐·日常' },
  { title: '葬送的芙莉莲', progress: '全 28 集', tag: '奇幻·冒险' },
  { title: 'GIRLS BAND CRY', progress: '全 13 集', tag: '音乐·原创' },
  { title: '迷宫饭', progress: '第 1 季 · 第 5 集', tag: '奇幻·美食' },
  { title: '地。-关于地球的运动-', progress: '还没开始', tag: '历史·群像' },
];

// ---- 游戏 ----
// bestPicks: 卡片列表上方的一排竖版精选海报（宽 2:3）
export interface Game {
  title: string;
  platform: string;      // 例如 "PC / Steam"（列表已不显示，留档备用）
  tag?: string;          // 右侧徽章：游戏 / galgame 类型，如 魂类 / 纯爱
  cover?: string;
}

export const gameBestPicks: Game[] = [
  { title: '荒野大镖客', platform: '', cover: img.games.redDeadRedemption2 },
  { title: '空洞骑士', platform: '', cover: img.games.hollowKnight },
  { title: '丝之歌', platform: '', cover: img.games.silksong },
  { title: '艾尔登法环', platform: '', cover: img.games.eldenRing },
  { title: '只狼', platform: '', cover: img.games.sekiro },
];

// Galgame 精选海报：游戏区主海报下面，两排各 5 张
export const galBestPicks: Game[] = [
  { title: 'ATRI', platform: '', cover: img.galgames.atri },
  { title: '魔女的夜宴', platform: '', cover: img.galgames.sanobaWitch },
  { title: '近月少女的礼仪', platform: '', cover: img.galgames.tsukiOtome },
  { title: '甜蜜女友3', platform: '', cover: img.galgames.amakano3 },
  { title: '甜蜜女友2', platform: '', cover: img.galgames.amakano2 },
  { title: '缘之空', platform: '', cover: img.galgames.yosugaNoSora },
  { title: 'Making＊Lovers', platform: '', cover: img.galgames.makingLovers },
  { title: 'Sugar Style', platform: '', cover: img.galgames.sugarStyle },
  { title: 'LimeLight Lemonade Jam', platform: '', cover: img.galgames.limeLight },
  { title: '星光咖啡馆与死神之蝶', platform: '', cover: img.galgames.cafeStella },
];

// 玩过的游戏清单：主海报与 Galgame 之间的条目表格（和底部 Galgame 清单同款样式）
export const gameCollection: Game[] = [
  { title: '黑暗之魂3', platform: 'PC', tag: '魂类' },
  { title: '孤山独影', platform: 'PC', tag: '开放世界' },
  { title: '隐形守护者', platform: 'PC', tag: '互动影像' },
  { title: 'GTA V', platform: 'PC', tag: '开放世界' },
  { title: '双影奇境', platform: 'PC', tag: '双人合作' },
  { title: '双人成行', platform: 'PC', tag: '双人合作' },
  { title: '奥日与萤火意志', platform: 'PC', tag: '银河恶魔城' },
  { title: '奥日与黑暗森林', platform: 'PC', tag: '银河恶魔城' },
  { title: '极限竞速：地平线4', platform: 'Xbox', tag: '竞速' },
  { title: '哈迪斯', platform: 'Switch', tag: '肉鸽·动作' },
  { title: 'Neva', platform: 'PC', tag: '平台·治愈' },
  { title: '底特律：变人', platform: 'PC', tag: '互动电影' },
  { title: '最后生还者1', platform: 'PS5', tag: '动作冒险' },
  { title: 'Ender Lilies', platform: 'PC', tag: '银河恶魔城' },
  { title: '行尸走肉', platform: 'PC', tag: '剧情冒险' },
  { title: '植物大战僵尸1', platform: 'PC', tag: '塔防' },
];

// 条目列表：Galgame 清单（徽章用 galgame 的类型：纯爱 / 泣系 / 真人影视…）
export const gameList: Game[] = [
  { title: '美少女万华镜', platform: 'Steam', tag: '纯爱' },
  { title: '完蛋！我被美女包围了', platform: 'Steam', tag: '真人影视' },
  { title: '完蛋！我被美女包围了2', platform: 'Steam', tag: '真人影视' },
  { title: '美女请别影响我学习', platform: 'Steam', tag: '真人影视' },
  { title: '美女请别影响我成仙', platform: 'Steam', tag: '真人影视' },
  { title: 'Trouble Days', platform: 'Switch', tag: '纯爱·日常' },
  { title: '一生推不如一生恋', platform: 'PC', tag: '百合·喜剧' },
  { title: 'Fox Hime Zero', platform: 'Steam', tag: '纯爱·兽耳' },
  { title: 'Summer Pockets', platform: 'Switch', tag: '泣系·全龄' },
  { title: '千恋万花', platform: 'PC', tag: '萌系·纯爱' },
];
