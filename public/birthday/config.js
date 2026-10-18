// ════════════════════════════════════════════════════════
//  ★★★  生日页面的所有文字都在这个文件里改，改完刷新就生效  ★★★
//      其它文件一律不用动！
// ════════════════════════════════════════════════════════
window.BIRTHDAY_CONFIG = {

  // ---- 寿星 ----
  name: '徐昕悦',                  // 寿星名字
  nickname: '徐老师',              // 昵称（提示语里会用到）

  // ---- 标题区 ----
  titleLine: '生日快乐！',
  birthdayText: '· 10 · 26 ·',     // 页面顶部的小日期牌（不显示年份）
  subtitle: 'HAPPY BIRTHDAY',

  // ---- 蛋糕上方的一句话祝福 ----
  wish: '希望你天天开心幸福，身体健康，工作压力小，吃到更多好吃的！生日快乐！',

  // ---- 吹蜡烛 ----
  candles: {
    count: 5,                      // 蜡烛数量
    blowBtn: '🕯️ 点我开始吹蜡烛',
    hintBlow: '对着麦克风吹一口气，一次吹灭一支蜡烛～',
    hintTap: '不方便开麦？直接用手指点蜡烛也能吹灭哦',
    micDenied: '拿不到麦克风权限也没关系，点蜡烛一样可以吹灭！',
    skip: '跳过吹蜡烛，直接看祝福 →',   // 第一屏的小字跳过按钮
  },

  // ---- 吹灭蜡烛后的横幅 ----
  celebrateBanner: '🎉 全部吹灭啦！愿望一定实现！',

  // ---- 祝福信（打字机逐字显示；\n 表示换行）----
  letter: [
    '亲爱的徐老师：',
    '　　今天是 10 月 26 日，是属于你的日子。',
    '　　希望你天天开心幸福，身体健康，工作压力小，吃到更多好吃的！愿所有的好运都往你身上跑，所有的烦恼都绕着你走。',
    '　　新的一岁，继续做全世界最可爱的徐老师。',
    '　　生日快乐！🎉',
    '',
    '　　　　　　　　　　—— 为师就是这么低调',
  ].join('\n'),
  letterSkip: '直接看完整封信 →',

  // ---- 抽签运势 ----
  fortune: {
    sectionTitle: '抽取来年运势',
    sectionSub: '诚心一抽，好运连连',
    buttonLabel: '戳我抽签 · 看看这一年的运势',
    redrawLabel: '再抽一次',
    shakeText: '摇签筒中…',
    resultTitle: '🏆 天选之签 ·《大吉大利签》',
    resultNote: '本签由「专哄徐老师开心委员会」权威认证：灵验无比，心诚则灵。',
    // dimensions：运势维度，想加就往数组里加一行（icon 对应 assets/icon-名字.webp）
    // value 是右侧的文案，随便写；进度条永远拉满
    dimensions: [
      { name: '财运',     icon: 'coin',            desc: '财神爷今年追着你跑',     value: '10 / 10' },
      { name: '事业运',   icon: 'rocket',          desc: '升职加薪，顺风顺水',     value: '10 / 10' },
      { name: '健康运',   icon: 'heartbeat',       desc: '吃嘛嘛香，身体倍儿棒',   value: '10 / 10' },
      { name: '桃花运',   icon: 'in-love',         desc: '可爱的人可爱到发光',     value: '10 / 10' },
      { name: '快乐指数', icon: 'smiley',          desc: '天天咧嘴笑到脸酸',       value: '10 / 10' },
      { name: '颜值指数', icon: 'star',            desc: '继续美丽，无可挑剔',     value: '10 / 10' },
      { name: '食欲运',   icon: 'birthday-cake',   desc: '好吃的全都被你撞见',     value: '10 / 10' },
      { name: '睡眠质量', icon: 'crescent-moon',   desc: '一觉到天亮，梦都是甜的', value: '10 / 10' },
      { name: '旅行运',   icon: 'airplane',        desc: '说走就走，处处是风景',   value: '10 / 10' },
      { name: '贵人运',   icon: 'handshake',       desc: '关键时刻总有人罩着你',   value: '10 / 10' },
      { name: '幸存值',   icon: 'shield',          desc: '所有糟心事都绕道走',     value: '10 / 10' },
      { name: '锦鲤指数', icon: 'four-leaf-clover',desc: '转发这条锦鲤都没你灵',   value: '10 / 10' },
    ],
    // 每次抽签随机挑一句开场白
    flavorLines: [
      '签筒轻轻一晃，好运已经就位。',
      '上上签！双手接好～',
      '紫气东来，福气东来，全来了。',
      '这一签，看着就喜庆。',
    ],
  },

  // ---- 背景音乐（合成版生日歌）----
  music: {
    onTitle: '放一首生日歌',
    offTitle: '安静一会儿',
  },

  // ---- 抽奖小商店（货架全可见，抽到的打包成生日礼物）----
  shop: {
    sectionTitle: '🎈 徐老师专属小卖部',
    sectionSub: '代币随便抽，抽到的全部打包带走～',
    startTokens: 10,                       // 初始抽奖代币（重置也是回到这个数）
    tokensLabel: '抽奖代币',
    poolTitle: '奖品一览 · 全都看得见，童叟无欺',
    draw1Label: '抽一次 ×1',
    draw5Label: '五连抽 ×5',
    resultClose: '收下啦！',
    resultTip: '点到什么拿什么，可以重复，欧气全开～',
    bagTitle: '🛍️ 购物袋',
    bagEmpty: '还没抽到东西，先抽一发试试手气？',
    resetLabel: '重置代币',
    resetText: '确定要清空购物袋、代币重新数到 10 吗？',
    checkoutLabel: '结账 · 打包成生日礼物',
    checkoutEmpty: '购物袋还空着呢，先去抽点好东西～',
    checkoutTitle: '🎁 本次生日礼物清单',
    checkoutClose: '继续抽',

    // 稀有度档位：weight 是权重，越大越容易抽到；想改概率改这里
    rarities: [
      { key: 'N',   label: '常见',     weight: 50 },
      { key: 'R',   label: '稀有',     weight: 30 },
      { key: 'SR',  label: '史诗',     weight: 15 },
      { key: 'SSR', label: '镇店之宝', weight: 5  },
    ],

    // 奖品池：icon 对应 assets/icon-名字.webp；rarity 对应上面的 key
    // 想加奖品就加一行，想换图就往 assets/ 丢一张同名图，之后自己随便更新
    items: [
      { name: '草莓蛋糕 ×1',      icon: 'birthday-cake',  rarity: 'N',   desc: '刚出炉，草莓加倍' },
      { name: '奶茶一杯',         icon: 'bubble-tea',     rarity: 'N',   desc: '全糖去冰，快乐标配' },
      { name: '游戏吧唧',         icon: 'medal',          rarity: 'N',   desc: '限定款，别处买不到' },
      { name: '可爱贴纸包',       icon: 'party-popper',   rarity: 'N',   desc: '贴满笔记本和手机壳' },
      { name: '可爱抱枕',         icon: 'pillow',         rarity: 'R',   desc: '抱着睡觉超安心' },
      { name: '美貌 +100',        icon: 'makeup',         rarity: 'R',   desc: '用了都说好看' },
      { name: '睡眠质量 +100',    icon: 'crescent-moon',  rarity: 'R',   desc: '一夜无梦到天亮' },
      { name: '事业成长加速器',   icon: 'growth',         rarity: 'SR',  desc: '新的一岁，升级打怪' },
      { name: '快乐永动机',       icon: 'smiley',         rarity: 'SR',  desc: '24 小时不停咧嘴' },
      { name: '幸运光环',         icon: 'four-leaf-clover', rarity: 'SR', desc: '走到哪儿都顺便' },
      { name: '5070Ti 显卡',      icon: 'gpu',            rarity: 'SSR', desc: '3A 大作随便跑（电脑自理）' },
    ],
  },

  // ---- 调试 ----
  debug: {
    // URL 加 ?celebrate=1 可跳过吹蜡烛，直接看庆祝+信+抽签（自查用）
    forceCelebrateParam: 'celebrate',
  },
};
