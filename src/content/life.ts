// ============================================
// 生活组数据 ★ 全是占位，改这里就行 ★
// 对应七个平级板块：Profile 个人资料 / Hobbies 爱好 / Companions 伙伴 / Anime 追番 / Games 游戏 / Album 相册 / Notes 随心记
// 图片字段都可选：路径从 images.ts 取（import { img } 后填 img.xxx.yyy）
//
// 这七个板块默认锁定（全局密码一次解锁，密码在 access.ts 改）；
// 想改回公开：把 App.tsx 里对应的 PrivateGate 换成直接渲染即可
// ============================================

import { img } from './images';

// ---- 爱好：名称 + 英文 + 一句话介绍（大字索引列表样式，无卡片无图标）----
export interface Hobby {
  name: string;
  en: string; // 跟在中文名右侧的英文小字
  description: string;
}

export const hobbies: Hobby[] = [
  { name: '游戏', en: 'Gaming', description: 'Galgame、独立游戏、叙事、魂类、3A' },
  { name: '动漫', en: 'Anime', description: '从大学开始看过上百部，轻百合、日常、萌系' },
  { name: '语言', en: 'Languages', description: '英语、法语、日语' },
  { name: '健身', en: 'Fitness', description: '坚持十多年自重健身' },
  { name: '游泳', en: 'Swimming', description: '放空大脑，缓解焦虑' },
  { name: '画画', en: 'Drawing', description: '想画出游戏素材' },
  { name: '编程', en: 'Coding', description: '用unity编程还是比较简单的' },
];

// ---- 伙伴 ----
// media: 每张卡的竖版图片/视频，填了就显示，不填只显示头像
//   - type: 'image' 图片（默认）/ 'video' 视频；video 切到会自动静音播一遍就停，controls 可开声音
//   - src: 路径（图片/视频都放 public/media/ 后填 'media/xxx.mp4' 之类）
//   - 素材原图在 resources/companions/<拼音>/，视频建议 ffmpeg CRF26 转码 +faststart 再入库
export interface CompanionMedia {
  src?: string; // 不填则该项显示粉色序号占位
  type?: 'image' | 'video';
  caption?: string; // 图下小字，可删
}

export interface Companion {
  name: string;
  breed: string;
  description?: string;
  image?: string; // 头部圆形头像
  media?: CompanionMedia[]; // 下方竖版画廊（左右切换）
}

export const companions: Companion[] = [
  {
    name: '小王子',
    breed: '仓鼠',
    description: '2024.12.29 - 2025.11.16',
    image: img.life.companionXiaowangzi,
    media: [
      { src: 'media/companions/xiaowangzi-1.mp4', type: 'video' },
      { src: 'media/companions/xiaowangzi-2.mp4', type: 'video' },
      { src: 'media/companions/xiaowangzi-3.mp4', type: 'video' },
      { src: 'media/companions/xiaowangzi-4.mp4', type: 'video' }, // 49 秒纪念视频
    ],
  },
  {
    name: '伏地魔',
    breed: '仓鼠',
    description: '2025.10.6 - ',
    image: img.life.companionFudimo,
    media: [
      { src: 'media/companions/fudimo-1.jpg' },
      { src: 'media/companions/fudimo-2.jpg' },
      { src: 'media/companions/fudimo-3.jpg' },
      { src: 'media/companions/fudimo-4.mp4', type: 'video' },
    ],
  },
];

// ---- 追番 ----
// bestPicks: 卡片列表上方的一排竖版精选海报（宽 2:3），每行 5 张共 4 行
export interface Anime {
  title: string;
  tag?: string;          // 右侧徽章：动漫类型，如 音乐 / 奇幻
  cover?: string;
}

export const animeBestPicks: Anime[] = [
  { title: '孤独摇滚！', cover: img.anime.bocchiTheRock },
  { title: 'BanG Dream!', cover: img.anime.bangDream },
  { title: '樱花任务', cover: img.anime.sakuraQuest },
  { title: '干物妹！小埋', cover: img.anime.himoutoUmaruChan },
  { title: '前进吧！登山少女', cover: img.anime.yamaNoSusume },
  { title: '摇曳露营△', cover: img.anime.yuruCamp },
  { title: '吹响吧！上低音号', cover: img.anime.hibikeEuphonium },
  { title: '莉可莉丝', cover: img.anime.lycorisRecoil },
  { title: '魔女之旅', cover: img.anime.wanderingWitchElaina },
  { title: '南家三姐妹', cover: img.anime.minamiKe },
  { title: '悠哉日常大王', cover: img.anime.nonNonBiyori },
  { title: '普通女高中生要做当地偶像', cover: img.anime.locodol },
  { title: '迷途之子！！！！！', cover: img.anime.mygo },
  { title: 'Urara 迷路帖', cover: img.anime.uraraMeirochou },
  { title: 'NEW GAME!', cover: img.anime.newGame },
  { title: '恋爱研究所', cover: img.anime.loveLab },
  { title: '一拳超人', cover: img.anime.onePunchMan },
  { title: '邻家索菲', cover: img.anime.tonariNoKyuuketsuki },
  { title: '这个勇者明明超强却过分慎重', cover: img.anime.cautiousHero },
  { title: '街角魔族', cover: img.anime.machikadoMazoku },
];

export const animeList: Anime[] = [
  { title: 'Love Live!', tag: '音乐·偶像' },
  { title: '轻音少女', tag: '音乐·日常' },
  { title: '白沙的水族馆', tag: '日常·治愈' },
  { title: '属性咖啡厅', tag: '日常·喜剧' },
  { title: '学园孤岛', tag: '校园·丧尸' },
  { title: '碧蓝之海', tag: '喜剧·潜水' },
  { title: '越狱兔', tag: '喜剧·短篇' },
  { title: '间谍过家家', tag: '喜剧·动作' },
  { title: '魔法少女 俺', tag: '魔法·喜剧' },
  { title: '言叶之庭', tag: '恋爱·治愈' },
  { title: '因为太怕痛就全点防御力了', tag: '游戏·奇幻' },
  { title: '辉夜大小姐想让我告白', tag: '恋爱·喜剧' },
  { title: '女孩的钓鱼慢话', tag: '日常·治愈' },
  { title: '三者三叶', tag: '日常·喜剧' },
  { title: '不正经的魔术讲师与禁忌教典', tag: '魔法·校园' },
  { title: '少女编号', tag: '职场·喜剧' },
  { title: 'ENDRO~!', tag: '奇幻·日常' },
  { title: '放学后海堤日记', tag: '日常·钓鱼' },
  { title: 'Comic Girls', tag: '日常·职场' },
  { title: '柑橘味香气 Citrus', tag: '百合·恋爱' },
  { title: '埃罗芒阿老师', tag: '恋爱·喜剧' },
  { title: '珈百璃的堕落', tag: '日常·喜剧' },
];

// ---- 游戏 ----
// bestPicks: 卡片列表上方的一排竖版精选海报（宽 2:3）
export interface Game {
  title: string;
  tag?: string;          // 右侧徽章：游戏 / galgame 类型，如 魂类 / 纯爱
  cover?: string;
}

export const gameBestPicks: Game[] = [
  { title: '荒野大镖客', cover: img.games.redDeadRedemption2 },
  { title: '空洞骑士', cover: img.games.hollowKnight },
  { title: '丝之歌', cover: img.games.silksong },
  { title: '艾尔登法环', cover: img.games.eldenRing },
  { title: '只狼', cover: img.games.sekiro },
];

// Galgame 精选海报：游戏区主海报下面，两排各 5 张
export const galBestPicks: Game[] = [
  { title: 'ATRI', cover: img.galgames.atri },
  { title: '魔女的夜宴', cover: img.galgames.sanobaWitch },
  { title: '近月少女的礼仪', cover: img.galgames.tsukiOtome },
  { title: '甜蜜女友3', cover: img.galgames.amakano3 },
  { title: '甜蜜女友2', cover: img.galgames.amakano2 },
  { title: '缘之空', cover: img.galgames.yosugaNoSora },
  { title: 'Making＊Lovers', cover: img.galgames.makingLovers },
  { title: 'Sugar Style', cover: img.galgames.sugarStyle },
  { title: 'LimeLight Lemonade Jam', cover: img.galgames.limeLight },
  { title: '星光咖啡馆与死神之蝶', cover: img.galgames.cafeStella },
];

// 玩过的游戏清单：主海报与 Galgame 之间的条目表格（和底部 Galgame 清单同款样式）
export const gameCollection: Game[] = [
  { title: '黑暗之魂3', tag: '魂类' },
  { title: '孤山独影', tag: '开放世界' },
  { title: '隐形守护者', tag: '互动影像' },
  { title: 'GTA V', tag: '开放世界' },
  { title: '双影奇境', tag: '双人合作' },
  { title: '双人成行', tag: '双人合作' },
  { title: '奥日与萤火意志', tag: '银河恶魔城' },
  { title: '奥日与黑暗森林', tag: '银河恶魔城' },
  { title: '极限竞速：地平线4', tag: '竞速' },
  { title: '哈迪斯', tag: '肉鸽·动作' },
  { title: 'Neva', tag: '平台·治愈' },
  { title: '底特律：变人', tag: '互动电影' },
  { title: '最后生还者1', tag: '动作冒险' },
  { title: 'Ender Lilies', tag: '银河恶魔城' },
  { title: '行尸走肉', tag: '剧情冒险' },
  { title: '植物大战僵尸1', tag: '塔防' },
];

// 条目列表：Galgame 清单（徽章用 galgame 的类型：纯爱 / 泣系 / 真人影视…）
export const gameList: Game[] = [
  { title: '美少女万华镜', tag: '纯爱' },
  { title: '完蛋！我被美女包围了', tag: '真人影视' },
  { title: '完蛋！我被美女包围了2', tag: '真人影视' },
  { title: '美女请别影响我学习', tag: '真人影视' },
  { title: '美女请别影响我成仙', tag: '真人影视' },
  { title: 'Trouble Days', tag: '纯爱·日常' },
  { title: '一生推不如一生恋', tag: '百合·喜剧' },
  { title: 'Fox Hime Zero', tag: '纯爱·兽耳' },
  { title: 'Summer Pockets', tag: '泣系·全龄' },
  { title: '千恋万花', tag: '萌系·纯爱' },
];

// ---- Profile（交友软件风）----
// 左：大卡（竖版照片 + 名字/年龄/位置叠加在照片底部）；右：快速资料速览格
// photo 留空显示粉色首字占位；facts 加一项就多一格
export interface ProfileFact {
  label: string;  // 中文标签
  en: string;     // 英文小字（装饰）
  value: string;  // 内容
}

export const profile = {
  photo: '', // 大卡照片：填 images.ts 里的路径；留空显示粉色首字占位
  name: '为师就是这么低调',
  age: '27',
  location: '宁波',
  status: '离线', // 在线状态：在线 / 离线 / 勿扰 等
  facts: [
    { label: '身高', en: 'HEIGHT', value: '177 cm' },
    { label: '体重', en: 'WEIGHT', value: '61-65 kg' },
    { label: '颜色', en: 'COLOUR', value: '白色/粉色' },
    { label: '吸烟', en: 'SMOKING', value: '不吸' },
    { label: '饮酒', en: 'DRINKING', value: '米酒还行' },
    { label: '运动', en: 'WORKOUT', value: '每周 1 次' },
    { label: '风格', en: 'COURTSHIP', value: '草食系' },
    { label: '性向', en: 'ORIENTATION', value: '女' },
  ] as ProfileFact[],
};
