// ============================================
// 全站图片唯一入口 ★ 所有图片路径都在这登记，别手写字符串 ★
//
// 用法三步：
//   1. 把图放进 public/images/ 下对应分类文件夹（skills / games / life）
//   2. 在这里加一行：名字: '/images/分类/文件名'
//   3. 内容文件里：import { img } from './images'，然后 img.games.eldenRing
//
// 好处：路径只写一次；改文件名只改这一处；编辑器自动补全；拼错会报错
// ============================================

export const img = {
  // ---- 技能卡 ----
  skills: {
    english:    '/images/skills/english.jpg',
    french:     '/images/skills/french.png',
    japanese:   '/images/skills/japanese.png',
    unity:      '/images/skills/unity.jpg',
    typescript: '/images/skills/typescript.png',
    vibeCoding: '/images/skills/vibe-coding.png',
    linux:      '/images/skills/linux.jpg',
    aigc:       '/images/skills/aigc.png',
  },

  // ---- 精选游戏海报 ----
  games: {
    redDeadRedemption2: '/images/games/red-dead-redemption-2.jpg',
    hollowKnight:       '/images/games/hollow-knight.jpg',
    silksong:           '/images/games/hollow-knight-silksong.jpg',
    eldenRing:          '/images/games/elden-ring.jpg',
    sekiro:             '/images/games/sekiro.jpg',
  },

  // ---- 生活照片（仓鼠 / 毕业 / 校园 / 旅行，暂未使用）----
  life: {
    hamster1:    '/images/life/hamster-1.jpg',
    hamster2:    '/images/life/hamster-2.jpg',
    hamster3:    '/images/life/hamster-3.jpg',
    hamster4:    '/images/life/hamster-4.jpg',
    hamsterGame1: '/images/life/hamster-game-1.jpg',
    hamsterGame2: '/images/life/hamster-game-2.jpg',
    graduation:  '/images/life/graduation.png',
    hkbuCampus:  '/images/life/hkbu-campus.png',
    travel1:     '/images/life/travel-1.png',
    travel2:     '/images/life/travel-2.png',
  },
} as const;
