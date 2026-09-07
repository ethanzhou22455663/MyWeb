// ============================================
// 全站图片唯一入口 ★ 所有图片路径都在这登记，别手写字符串 ★
//
// 用法三步：
//   1. 把图放进 public/images/ 下对应分类文件夹（skills / games / anime / life）
//   2. 在这里加一行：名字: '/images/分类/文件名'
//   3. 内容文件里：import { img } from './images'，然后 img.games.eldenRing
//
// 好处：路径只写一次；改文件名只改这一处；编辑器自动补全；拼错会报错
// ============================================

export const img = {
  // ---- 站点头像（首屏 Hero 用）----
  avatar: '/images/avatar.jpg',

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

  // ---- Galgame 精选海报 ----
  galgames: {
    atri:         '/images/games/atri.jpg',
    sanobaWitch:  '/images/games/sanoba-witch.jpg',
    tsukiOtome:   '/images/games/tsuki-ni-yorisou-otome-no-sahou.jpg',
    amakano3:     '/images/games/amakano-3.jpg',
    amakano2:     '/images/games/amakano-2.jpg',
    yosugaNoSora: '/images/games/yosuga-no-sora.jpg',
    makingLovers: '/images/games/making-lovers.jpg',
    sugarStyle:   '/images/games/sugar-style.jpg',
    limeLight:    '/images/games/limelight-lemonade-jam.jpg',
    cafeStella:   '/images/games/cafe-stella-and-the-deaths-butterfly.jpg',
  },

  // ---- 精选动漫海报（B 站番剧封面，scripts/anime-poster.mjs 下载）----
  anime: {
    bocchiTheRock:        '/images/anime/bocchi-the-rock.jpg',
    loveLive:             '/images/anime/love-live.png',
    sakuraQuest:          '/images/anime/sakura-quest.jpg',
    kOn:                  '/images/anime/k-on.jpg',
    yamaNoSusume:         '/images/anime/yama-no-susume.jpg',
    yuruCamp:             '/images/anime/yuru-camp.png',
    hibikeEuphonium:      '/images/anime/hibike-euphonium.png',
    lycorisRecoil:        '/images/anime/lycoris-recoil.png',
    wanderingWitchElaina: '/images/anime/wandering-witch-elaina.png',
    minamiKe:             '/images/anime/minami-ke.png',
    nonNonBiyori:         '/images/anime/non-non-biyori.png',
    locodol:              '/images/anime/locodol.jpg',
    schoolLive:           '/images/anime/school-live.jpg',
    uraraMeirochou:       '/images/anime/urara-meirochou.jpg',
    newGame:              '/images/anime/new-game.jpg',
    tonariNoKyuuketsuki:  '/images/anime/tonari-no-kyuuketsuki-san.png',
    blendS:               '/images/anime/blend-s.jpg',
    shiroiSunaAquatope:   '/images/anime/shiroi-suna-no-aquatope.png',
    cautiousHero:         '/images/anime/cautious-hero.jpg',
    machikadoMazoku:      '/images/anime/machikado-mazoku.jpg',
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
