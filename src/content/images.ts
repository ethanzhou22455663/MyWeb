// ============================================
// 全站图片唯一入口 ★ 所有图片路径都在这登记，别手写字符串 ★
//
// 用法三步：
//   1. 把图放进 public/images/ 下对应分类文件夹（skills / games / anime / life / drawings）
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
    drawing:    '/images/skills/drawing.jpg',
    fitness:    '/images/skills/fitness.jpg',
  },

  // ---- 作品封面（截图原图在 resources/unity/ 和 resources/网页工具/）----
  works: {
    hamsterRoom:    '/images/works/hamster-room.png',
    awkwardDialogue: '/images/works/awkward-dialogue.png',
    pixelKnight:    '/images/works/pixel-knight.png',
    hollowKnightFangame: '/images/works/hollow-knight-fangame.png',
    dailyWord:      '/images/works/daily-word.png',
    autodate:       '/images/works/autodate.jpg',
    personaMetrics: '/images/works/persona-metrics.jpg',
    vowelChart:     '/images/works/vowel-chart.jpg',
    docReview:      '/images/works/doc-review.png',
    aiDate:         '/images/works/ai-date.png',
    aiTutor:        '/images/works/ai-tutor.png',
    sketchPlayer:     '/images/works/sketch-player.png',
    ownYourPlaylist:  '/images/works/own-your-playlist.png',
  },

  // ---- 绘画作品（原图在 resources/临摹/ 和 resources/原创/，已改英文名归置到此）----
  drawings: {
    // 临摹
    furina: '/images/drawings/copies/furina.jpg',
    lineDog: '/images/drawings/copies/line-dog.jpg',
    missBarbara: '/images/drawings/copies/miss-barbara.jpg',
    untitled: '/images/drawings/copies/untitled.jpg',
    // 原创
    airplane: '/images/drawings/originals/airplane.jpg',
    cityInSnow: '/images/drawings/originals/city-in-snow.jpg',
    flyingHamster: '/images/drawings/originals/flying-hamster.jpg',
    goat: '/images/drawings/originals/goat.jpg',
    hamsterTribe: '/images/drawings/originals/hamster-tribe.jpg',
    hamstersInTheSky: '/images/drawings/originals/hamsters-in-the-sky.jpg',
    kingOfStrength: '/images/drawings/originals/king-of-strength.jpg',
    moonlitNight: '/images/drawings/originals/moonlit-night.jpg',
    painting: '/images/drawings/originals/painting.jpg',
    redDeadRedemption: '/images/drawings/originals/red-dead-redemption.jpg',
    summerField: '/images/drawings/originals/summer-field.jpg',
    winterField: '/images/drawings/originals/winter-field.jpg',
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
    bangDream:            '/images/anime/bang-dream.jpg',
    sakuraQuest:          '/images/anime/sakura-quest.jpg',
    himoutoUmaruChan:     '/images/anime/himouto-umaruchan.jpg',
    yamaNoSusume:         '/images/anime/yama-no-susume.jpg',
    yuruCamp:             '/images/anime/yuru-camp.png',
    hibikeEuphonium:      '/images/anime/hibike-euphonium.png',
    lycorisRecoil:        '/images/anime/lycoris-recoil.png',
    wanderingWitchElaina: '/images/anime/wandering-witch-elaina.png',
    minamiKe:             '/images/anime/minami-ke.png',
    nonNonBiyori:         '/images/anime/non-non-biyori.png',
    locodol:              '/images/anime/locodol.jpg',
    mygo:                 '/images/anime/mygo.png',
    uraraMeirochou:       '/images/anime/urara-meirochou.jpg',
    newGame:              '/images/anime/new-game.jpg',
    loveLab:              '/images/anime/love-lab.jpg',
    onePunchMan:          '/images/anime/one-punch-man.jpg',
    tonariNoKyuuketsuki:  '/images/anime/tonari-no-kyuuketsuki-san.png',
    cautiousHero:         '/images/anime/cautious-hero.jpg',
    machikadoMazoku:      '/images/anime/machikado-mazoku.jpg',
  },

  // ---- 生活照片（Album 相册在用；也留给 Pets 宠物占位）----
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
