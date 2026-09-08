// ============================================
// 个人能力数据 ★ 加技能只往数组里加一项 ★
// - image: 技能图，从 images.ts 取（import { img } 后填 img.skills.xxx），必填
// ============================================

import { img } from './images';

export interface Skill {
  name: string;
  description: string;
  image: string;
}

export const skills: Skill[] = [
  { name: '英语', description: '工作语言，读写流利（占位）', image: img.skills.english },
  { name: '法语', description: '日常交流，持续学习中（占位）', image: img.skills.french },
  { name: '日语', description: '能听能读，兴趣驱动（占位）', image: img.skills.japanese },
  { name: 'Unity 开发', description: '独立交付完整 2D / 3D 项目（占位）', image: img.skills.unity },
  { name: 'TypeScript', description: '类型安全的工程实践（占位）', image: img.skills.typescript },
  { name: '绘画', description: '板绘与速写，偶尔接稿（占位）', image: img.skills.drawing },
  { name: '健身', description: '力量训练，每周坚持三次（占位）', image: img.skills.fitness },
  { name: 'Vibe Coding', description: '与 AI 结对，快速验证想法（占位）', image: img.skills.vibeCoding },
  { name: 'Linux', description: '日常主力系统，熟命令行（占位）', image: img.skills.linux },
  { name: 'AIGC 内容创作', description: 'AI 绘画 / 视频工作流（占位）', image: img.skills.aigc },
];
