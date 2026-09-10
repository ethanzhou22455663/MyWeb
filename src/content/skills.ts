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
  { name: '英语', description: '雅思8.5分，发音标准，写作好', image: img.skills.english },
  { name: '法语', description: '法语本科，DALF C1，专八优秀', image: img.skills.french },
  { name: '日语', description: '日常交流，理解番剧、游戏、新闻等日语', image: img.skills.japanese },
  { name: 'Unity 开发', description: '熟悉2D项目开发、动画状态机、C#编程', image: img.skills.unity },
  { name: 'TypeScript', description: 'eletron和网页应用开发', image: img.skills.typescript },
  { name: '绘画', description: '喜欢极简风格的板绘', image: img.skills.drawing },
  { name: '健身', description: '坚持健身超过十年', image: img.skills.fitness },
  { name: 'Vibe Coding', description: '使用claude code快速开发或学习编程', image: img.skills.vibeCoding },
  { name: 'Linux', description: '主力开发系统，熟悉日常操作', image: img.skills.linux },
  { name: 'AIGC 内容创作', description: '搭建本地AI 绘画 / 视频工作流进行创作', image: img.skills.aigc },
];
