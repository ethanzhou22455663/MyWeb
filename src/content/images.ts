// ============================================
// 全站图片唯一入口 ★ 所有图片路径都在这登记，别手写字符串 ★
//
// 用法三步：
//   1. 把图放进 public/images/ 下对应分类文件夹（skills / games / anime / life / drawings）
//   2. 在这里加一行：名字: 'images/分类/文件名'
//   3. 内容文件里：import { img } from './images'，然后 img.games.eldenRing
//
// 好处：路径只写一次；改文件名只改这一处；编辑器自动补全；拼错会报错
// ============================================

export const img = {
  // ---- 站点头像（首屏 Hero 用）----
  avatar: 'images/avatar.webp',

  // ---- 私密锁头像（PrivateGate 用，原图 resources/private.jpg）----
  private: 'images/private.webp',

  // ---- 技能卡 ----
  skills: {
    english:    'images/skills/english.webp',
    french:     'images/skills/french.webp',
    japanese:   'images/skills/japanese.webp',
    unity:      'images/skills/unity.webp',
    typescript: 'images/skills/typescript.webp',
    vibeCoding: 'images/skills/vibe-coding.webp',
    linux:      'images/skills/linux.webp',
    aigc:       'images/skills/aigc.webp',
    drawing:    'images/skills/drawing.webp',
    fitness:    'images/skills/fitness.webp',
  },

  // ---- 作品封面（截图原图在 resources/unity/、resources/网页工具/、resources/ai绘画/）----
  works: {
    hamsterRoom:    'images/works/hamster-room.webp',
    awkwardDialogue: 'images/works/awkward-dialogue.webp',
    pixelKnight:    'images/works/pixel-knight.webp',
    hollowKnightFangame: 'images/works/hollow-knight-fangame.webp',
    dailyWord:      'images/works/daily-word.webp',
    autodate:       'images/works/autodate.webp',
    personaMetrics: 'images/works/persona-metrics.webp',
    vowelChart:     'images/works/vowel-chart.webp',
    docReview:      'images/works/doc-review.webp',
    aiDate:         'images/works/ai-date.webp',
    aiTutor:        'images/works/ai-tutor.webp',
    sketchPlayer:     'images/works/sketch-player.webp',
    ownYourPlaylist:  'images/works/own-your-playlist.webp',
    aiAmusementPark:  'images/works/ai-amusement-park.webp',
    aiWindowLight:    'images/works/ai-window-light.webp',
    sekiroGalgame:    'images/works/sekiro-galgame.webp', // B站视频封面（BV1c29SBCEZi，API 直取）
    sekiroNotGalgame: 'images/works/bili-BV1VjoCBDEpx.webp', // 为什么说只狼不算真正的galgame？
    ganyuSevenArrows: 'images/works/bili-BV1ro4y1J7U2.webp', // 甘雨一回合七发霜华矢
    wandererChoice:   'images/works/bili-BV1VdJQzvEua.webp', // 漫游者先喝酒还是先上刀
    skyboundHamster:  'images/works/bili-BV19qWszqE1f.webp', // Unity PPT「Skybound」飞行仓鼠
    bocchiSpeech:     'images/works/bili-BV114y6BAENH.webp', // 波奇总统胜选演说
    ryoProtest:       'images/works/bili-BV1BxyCB8Ezj.webp', // 山田凉闯国会抗议
    bocchiImpeached:  'images/works/bili-BV1idyWBME47.webp', // 波奇总统被弹劾下台
    ryoPresident:     'images/works/bili-BV1yGyaB6Ehz.webp', // 山田凉当选总统
    bocchiNijika:     'images/works/bili-BV1CSS4BqEcs.webp', // 总统夫妇秀恩爱
    kitaIntern1:      'images/works/bili-BV1acmnBFER7.webp', // 白宫实习生喜多
    kitaIntern2:      'images/works/bili-BV1b9meBcExw.webp', // 冒失实习生喜多
    bocchiShawshank:  'images/works/bili-BV1rC1TBKELP.webp', // 波申克的救赎
    bocchiTitanic1:   'images/works/bili-BV1NqyZBJE94.webp', // 波奇主演泰坦尼克号
    bocchiTitanic2:   'images/works/bili-BV1YD1vBNEPx.webp', // 泰坦尼克号第二集
    bocchiTitanic3:   'images/works/bili-BV1Tm14BNE3z.webp', // 泰坦尼克号第三集
  },

  // ---- 绘画作品（原图在 resources/临摹/ 和 resources/原创/，已改英文名归置到此）----
  drawings: {
    // 临摹
    furina: 'images/drawings/copies/furina.webp',
    lineDog: 'images/drawings/copies/line-dog.webp',
    missBarbara: 'images/drawings/copies/miss-barbara.webp',
    untitled: 'images/drawings/copies/untitled.webp',
    // 原创
    airplane: 'images/drawings/originals/airplane.webp',
    cityInSnow: 'images/drawings/originals/city-in-snow.webp',
    flyingHamster: 'images/drawings/originals/flying-hamster.webp',
    goat: 'images/drawings/originals/goat.webp',
    hamsterTribe: 'images/drawings/originals/hamster-tribe.webp',
    hamstersInTheSky: 'images/drawings/originals/hamsters-in-the-sky.webp',
    kingOfStrength: 'images/drawings/originals/king-of-strength.webp',
    moonlitNight: 'images/drawings/originals/moonlit-night.webp',
    painting: 'images/drawings/originals/painting.webp',
    redDeadRedemption: 'images/drawings/originals/red-dead-redemption.webp',
    summerField: 'images/drawings/originals/summer-field.webp',
    winterField: 'images/drawings/originals/winter-field.webp',
  },

  // ---- 关注卡片（Subscribe 用；头像 resources/bzhan.jpg、resources/xiaohongshu.jpg，平台标志 resources/b.jpg、red.jpg）----
  subscribe: {
    avatarBilibili: 'images/subscribe/avatar-bilibili.webp',       // B站频道头像（灰发魔女，288=96px 整数倍）
    avatarXiaohongshu: 'images/subscribe/avatar-xiaohongshu.webp', // 小红书频道头像（粉毛 chibi，同 resources/private.jpg）
    bilibili: 'images/subscribe/bilibili.webp',       // B站标志（官方粉，正好贴站点粉）
    xiaohongshu: 'images/subscribe/xiaohongshu.webp', // 小红书标志（官方红）
  },

  // ---- 精选游戏海报 ----
  games: {
    redDeadRedemption2: 'images/games/red-dead-redemption-2.webp',
    hollowKnight:       'images/games/hollow-knight.webp',
    silksong:           'images/games/hollow-knight-silksong.webp',
    eldenRing:          'images/games/elden-ring.webp',
    sekiro:             'images/games/sekiro.webp',
  },

  // ---- Galgame 精选海报 ----
  galgames: {
    atri:         'images/games/atri.webp',
    sanobaWitch:  'images/games/sanoba-witch.webp',
    tsukiOtome:   'images/games/tsuki-ni-yorisou-otome-no-sahou.webp',
    amakano3:     'images/games/amakano-3.webp',
    amakano2:     'images/games/amakano-2.webp',
    yosugaNoSora: 'images/games/yosuga-no-sora.webp',
    makingLovers: 'images/games/making-lovers.webp',
    sugarStyle:   'images/games/sugar-style.webp',
    limeLight:    'images/games/limelight-lemonade-jam.webp',
    cafeStella:   'images/games/cafe-stella-and-the-deaths-butterfly.webp',
  },

  // ---- 精选动漫海报（B 站番剧封面，scripts/anime-poster.mjs 下载）----
  anime: {
    bocchiTheRock:        'images/anime/bocchi-the-rock.webp',
    bangDream:            'images/anime/bang-dream.webp',
    sakuraQuest:          'images/anime/sakura-quest.webp',
    himoutoUmaruChan:     'images/anime/himouto-umaruchan.webp',
    yamaNoSusume:         'images/anime/yama-no-susume.webp',
    yuruCamp:             'images/anime/yuru-camp.webp',
    hibikeEuphonium:      'images/anime/hibike-euphonium.webp',
    lycorisRecoil:        'images/anime/lycoris-recoil.webp',
    wanderingWitchElaina: 'images/anime/wandering-witch-elaina.webp',
    minamiKe:             'images/anime/minami-ke.webp',
    nonNonBiyori:         'images/anime/non-non-biyori.webp',
    locodol:              'images/anime/locodol.webp',
    mygo:                 'images/anime/mygo.webp',
    uraraMeirochou:       'images/anime/urara-meirochou.webp',
    newGame:              'images/anime/new-game.webp',
    loveLab:              'images/anime/love-lab.webp',
    onePunchMan:          'images/anime/one-punch-man.webp',
    tonariNoKyuuketsuki:  'images/anime/tonari-no-kyuuketsuki-san.webp',
    cautiousHero:         'images/anime/cautious-hero.webp',
    machikadoMazoku:      'images/anime/machikado-mazoku.webp',
  },

  // ---- 相册（原图 resources/album/，每城一组 4 张；Album 板块专用）----
  album: {
    riben1:    'images/album/riben-1.webp',
    riben2:    'images/album/riben-2.webp',
    riben3:    'images/album/riben-3.webp',
    riben4:    'images/album/riben-4.webp',
    moluoge1:  'images/album/moluoge-1.webp',
    moluoge2:  'images/album/moluoge-2.webp',
    moluoge3:  'images/album/moluoge-3.webp',
    moluoge4:  'images/album/moluoge-4.webp',
    jinhua1:   'images/album/jinhua-1.webp',
    jinhua2:   'images/album/jinhua-2.webp',
    jinhua3:   'images/album/jinhua-3.webp',
    jinhua4:   'images/album/jinhua-4.webp',
    xianggang1: 'images/album/xianggang-1.webp',
    xianggang2: 'images/album/xianggang-2.webp',
    xianggang3: 'images/album/xianggang-3.webp',
    xianggang4: 'images/album/xianggang-4.webp',
    ningbo1:   'images/album/ningbo-1.webp',
    ningbo2:   'images/album/ningbo-2.webp',
    ningbo3:   'images/album/ningbo-3.webp',
    ningbo4:   'images/album/ningbo-4.webp',
    hangzhou1: 'images/album/hangzhou-1.webp',
    hangzhou2: 'images/album/hangzhou-2.webp',
    hangzhou3: 'images/album/hangzhou-3.webp',
    hangzhou4: 'images/album/hangzhou-4.webp',
  },

  // ---- 生活照片（Companions 伙伴头像在这取）----
  life: {
    companionXiaowangzi: 'images/life/companion-xiaowangzi.webp', // 小王子头像（288=144px 整数倍）
    companionFudimo:     'images/life/companion-fudimo.webp',     // 伏地魔头像（288=144px 整数倍）
  },
} as const;
