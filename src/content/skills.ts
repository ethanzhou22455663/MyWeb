// ============================================
// 个人能力数据 ★ 加技能只往数组里加一项 ★
// - monogram: 没配图片时显示的文字图标（1-2 个字符最好看）
// - image: 可选，图片路径（把图放 public/images/ 后填 '/images/xxx.png'）
//   填了 image 就用图片，不填用 monogram
// ============================================

export interface Skill {
  name: string;
  description: string;
  monogram: string;
  image?: string;
}

export const skills: Skill[] = [
  { name: '英语', monogram: 'EN', description: '工作语言，读写流利（占位）' },
  { name: '法语', monogram: 'FR', description: '日常交流，持续学习中（占位）' },
  { name: '日语', monogram: 'JP', description: '能听能读，兴趣驱动（占位）' },
  { name: 'Unity 开发', monogram: 'U', description: '独立交付完整 2D / 3D 项目（占位）' },
  { name: 'TypeScript', monogram: 'TS', description: '类型安全的工程实践（占位）' },
  { name: '绘画', monogram: '绘', description: '板绘与速写，偶尔接稿（占位）' },
  { name: 'Vibe Coding', monogram: 'VC', description: '与 AI 结对，快速验证想法（占位）' },
  { name: 'Linux', monogram: 'Li', description: '日常主力系统，熟命令行（占位）' },
  { name: 'AIGC 内容创作', monogram: 'AI', description: 'AI 绘画 / 视频工作流（占位）' },
];
