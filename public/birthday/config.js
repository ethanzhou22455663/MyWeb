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
  from: '为师就是这么低调',          // 页尾落款

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
    sectionTitle: '🎈 生日小卖部',
    sectionSub: '代币随便抽，抽到的全部打包带走～',
    startTokens: 10,                       // 初始抽奖代币（重置也是回到这个数）
    tokensLabel: '抽奖代币',
    poolTitle: '奖品一览 · 全都看得见，童叟无欺',
    draw1Label: '抽一次 ×1',
    draw5Label: '五连抽 ×5',
    resultClose: '收下啦！',
    resultTip: '件件不重复，抽到什么拿什么～',
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
      { key: 'N',  label: '普通', weight: 38 },
      { key: 'R',  label: '稀有', weight: 33 },
      { key: 'SR', label: '史诗', weight: 29 },
    ],

    // 保底：第 at 次抽取固定获得 name（该奖品不进随机池，只能在这一抽掉落）；删掉本行可关闭
    guaranteed: { at: 5, name: '生日礼物盲盒' },

    // 奖品池：icon 对应 assets/icon-名字.webp；rarity 对应上面的 key
    // 想加奖品就加一行，想换图就往 assets/ 丢一张同名图，之后自己随便更新
    items: [
      // 普通
      { name: '草莓蛋糕 ×1',    icon: 'birthday-cake', rarity: 'N',  desc: '刚出炉，草莓加倍' },
      { name: '白雾红尘奶茶',   icon: 'bubble-tea',    rarity: 'N',  desc: '全糖去冰，快乐标配' },
      { name: '桃胶木薯牛奶',   icon: 'milk',          rarity: 'N',  desc: '满满胶质，喝出好气色' },
      { name: '游戏吧唧',       icon: 'medal',         rarity: 'N',  desc: '限定款，别处买不到' },
      // 稀有
      { name: '板栗南瓜',       icon: 'pumpkin',       rarity: 'R',  desc: '粉粉糯糯，蒸着吃最甜' },
      { name: '寿司拼盘',       icon: 'sushi',         rarity: 'R',  desc: '三文鱼管够' },
      { name: '洋葱奶酪',       icon: 'cheese',        rarity: 'R',  desc: '咸香拉丝，风味绝了' },
      { name: '美貌 +100',      icon: 'makeup',        rarity: 'R',  desc: '用了都说好看' },
      { name: '睡眠质量 +100',  icon: 'crescent-moon', rarity: 'R',  desc: '一夜无梦到天亮' },
      { name: '玫瑰花一束',     icon: 'flowers',       rarity: 'R',  desc: '家里放一周都香' },
      // 史诗
      { name: '事业成长加速器', icon: 'growth',        rarity: 'SR', desc: '新的一岁，升级打怪' },
      { name: '快乐永动机',     icon: 'smiley',        rarity: 'SR', desc: '24 小时不停咧嘴' },
      { name: 'iPhone 18 Pro 勃艮第红', icon: 'iphone', rarity: 'SR', desc: '新款该换就换' },
      { name: '苏州大闸蟹',     icon: 'crab',          rarity: 'SR', desc: '秋天的仪式感，鲜掉眉毛' },
      { name: '5070Ti 显卡',    icon: 'gpu',           rarity: 'SR', desc: '3A 大作随便跑（电脑自理）' },
      { name: '缅因猫一只',     icon: 'cat',           rarity: 'SR', desc: '撸猫自由，实现！' },
      { name: '威海自由行',     icon: 'airplane',      rarity: 'SR', desc: '海边小城看天鹅，说走就走' },
      { name: '三亚自由行',     icon: 'airplane',      rarity: 'SR', desc: '冬天也能下海，阳光管够' },
      { name: '香港自由行',     icon: 'airplane',      rarity: 'SR', desc: '茶餐厅和太平山，一次集齐' },
      { name: '生日礼物盲盒',   icon: 'gift',          rarity: 'SR', desc: '本奖品请联系为师兑换', receiptSuffix: '本奖品请联系为师兑换' },
    ],
  },

  // ---- 调试 ----
  debug: {
    // URL 加 ?celebrate=1 可跳过吹蜡烛，直接看庆祝+信+抽签（自查用）
    forceCelebrateParam: 'celebrate',
  },
};
