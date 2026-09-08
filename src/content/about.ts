// ============================================
// 个人档案数据 ★ 值全是占位，改这里就行 ★
// fields: 档案字段，渲染成右侧的巨型数据字
// bio: 简介大字段落；name / tagline: 左栏相框下的名字和签名
// 字段随意增删，双栏排，奇数条时末行只占左格
// ============================================

export interface ProfileField {
  label: string; // 小字标签：性别 / 出生年份 / 婚育状况…
  value: string; // 巨型字内容（占位值，换成自己的）
}

export const profileFields: ProfileField[] = [
  { label: '性别',     value: '男' },
  { label: '出生年份', value: '19XX' },
  { label: '所在地',   value: '某城市' },
  { label: '职业',     value: '独立开发' },
  { label: '婚育状况', value: '未婚未育' },
  { label: 'MBTI',     value: 'INTP' },
  { label: '宠物',     value: '麻酱 & 皮蛋' },
];

export const profileBio =
  '一个喜欢做工具的人。脑子里冒出来的想法，会想办法做成能点开、能玩、能用的东西——网页应用、独立游戏、AI 实验。相信小而完整，胜过大而平庸。（占位简介，随时改）';

// 左栏相框下的名字和一句话签名（占位）
export const profileName = '名字（占位）';
export const profileTagline = '一句话签名（占位）';
