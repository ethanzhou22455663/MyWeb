// ============================================
// 发展历程数据 ★ 终端板块内容，只动这个文件 ★
// 按「日志文件」分组，每组 = 一个 $ cat xxx.log 命令 + 若干条目
// - 组随意加 / 删 / 改（教育 / 工作 / 证书…）
// - description 可留空（整个字段删掉就不显示 └── 续行）
// ============================================

export interface TimelineEntry {
  period: string; // 时间段，如 '2021 — 2025'
  title: string; // 一行标题，如 '香港浸会大学 · 计算机科学'
  description?: string; // └── 续行上的小字补充
}

export interface TimelineGroup {
  file: string; // 日志文件名，渲染成 $ cat {file}
  entries: TimelineEntry[];
}

export const timeline: TimelineGroup[] = [
  {
    file: 'education.log',
    entries: [
      { period: '2022 — 2023', title: '', description: '语言学 硕士' },
      { period: '2017 — 2021', title: '', description: '法语 本科' },
    ],
  },
  {
    file: 'work.log',
    entries: [
      { period: '2026', title: '', description: '网站运营' },
      { period: '2025', title: '', description: '法语翻译' },
      { period: '2024', title: '', description: '英语教师' },
    ],
  },
  {
    file: 'certs.log',
    entries: [
      { period: '2026', title: '', description: '英语笔译二级' },
      { period: '2026', title: '', description: '法语口译三级' },
      { period: '2026', title: '', description: '雅思8.5' },
      { period: '2024', title: '', description: '高中英语教师资格证' },
      { period: '2021', title: '', description: '法语C1 专八优秀' },
    ],
  },
];
