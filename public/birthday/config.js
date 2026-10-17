// ════════════════════════════════════════════════════════
//  ★★★  生日页面的所有文字都在这个文件里改，改完刷新就生效  ★★★
//      其它文件一律不用动！
// ════════════════════════════════════════════════════════
window.BIRTHDAY_CONFIG = {

  // ---- 寿星 ----
  name: '徐昕悦',                  // 寿星名字
  nickname: '徐老师',              // 昵称（提示语里会用到）

  // ---- 标题区 ----
  titleLine: '徐昕悦，生日快乐呀！',
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

  // ---- 抽签运势：不管怎么抽，全部拉满（整蛊向，图个开心）----
  fortune: {
    sectionTitle: '抽取来年运势',
    sectionSub: '传说中的天选之签，据说怎么抽都是好签',
    buttonLabel: '戳我抽签 · 看看这一年的运势',
    redrawLabel: '再抽一次（还是全满）',
    shakeText: '摇签筒中…',
    resultTitle: '🏆 天选之签 ·《大吉大利签》',
    resultNote: '本签由「专哄徐老师开心委员会」权威认证：逢抽必满，童叟无欺。',
    // dimensions：运势维度，想加就往数组里加一行（icon 对应 assets/icon-名字.webp）
    // value 是右侧的文案，随便写；进度条永远拉满
    dimensions: [
      { name: '财运',     icon: 'coin',            desc: '财神爷今年追着你跑',     value: 'S 级 · 满级' },
      { name: '事业运',   icon: 'rocket',          desc: '升职加薪，顺风顺水',     value: 'S 级 · 满级' },
      { name: '健康运',   icon: 'heartbeat',       desc: '吃嘛嘛香，身体倍儿棒',   value: '100 / 100' },
      { name: '桃花运',   icon: 'in-love',         desc: '可爱的人可爱到发光',     value: 'S 级 · 满级' },
      { name: '快乐指数', icon: 'smiley',          desc: '天天咧嘴笑到脸酸',       value: '100 / 100' },
      { name: '颜值指数', icon: 'star',            desc: '继续美丽，无可挑剔',     value: 'MAX' },
      { name: '食欲运',   icon: 'birthday-cake',   desc: '好吃的全都被你撞见',     value: 'S 级 · 满级' },
      { name: '睡眠质量', icon: 'crescent-moon',   desc: '一觉到天亮，梦都是甜的', value: '100 / 100' },
      { name: '旅行运',   icon: 'airplane',        desc: '说走就走，处处是风景',   value: 'S 级 · 满级' },
      { name: '贵人运',   icon: 'handshake',       desc: '关键时刻总有人罩着你',   value: 'S 级 · 满级' },
      { name: '幸存值',   icon: 'shield',          desc: '所有糟心事都绕道走',     value: '999 / 999' },
      { name: '锦鲤指数', icon: 'four-leaf-clover',desc: '转发这条锦鲤都没你灵',   value: 'MAX' },
    ],
    // 每次抽签随机挑一句开场白，制造「好像不太一样」的错觉（结果永远全满）
    flavorLines: [
      '签筒说：不用摇了，全是满的。',
      '又抽一次？行吧——还是全满。',
      '天机不可泄露……好吧：全部满分。',
      '这签我掐指一算：满！',
    ],
  },

  // ---- 背景音乐（合成版生日歌）----
  music: {
    onTitle: '放一首生日歌',
    offTitle: '安静一会儿',
  },

  // ---- 调试 ----
  debug: {
    // URL 加 ?celebrate=1 可跳过吹蜡烛，直接看庆祝+信+抽签（自查用）
    forceCelebrateParam: 'celebrate',
  },
};
