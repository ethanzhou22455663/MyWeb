// ============================================
// 履历数据 ★ 终端板块内容，只动这个文件 ★
// 按「日志文件」分组，每组 = 一个 $ cat xxx.log 命令 + 若干条目
// - 组随意加 / 删 / 改（教育 / 工作 / 证书…）
// - detail 可留空（整个字段删掉就不显示 └── 续行）
// ============================================

export interface ResumeEntry {
  period: string; // 时间段，如 '2021 — 2025'
  title: string; // 一行标题，如 '香港浸会大学 · 计算机科学'
  detail?: string; // └── 续行上的小字补充
}

export interface ResumeGroup {
  file: string; // 日志文件名，渲染成 $ cat {file}
  entries: ResumeEntry[];
}

export const resume: ResumeGroup[] = [
  {
    file: 'education.log',
    entries: [
      { period: '2021 — 2025', title: '香港浸会大学（占位）', detail: '计算机科学 本科（占位）' },
      { period: '2018 — 2021', title: '某某中学（占位）', detail: '理科（占位）' },
    ],
  },
  {
    file: 'work.log',
    entries: [
      { period: '2025 — 至今', title: '某某公司（占位）', detail: '全栈开发（占位）' },
      { period: '2024 暑期', title: '某某公司实习（占位）', detail: '前端实习（占位）' },
    ],
  },
  {
    file: 'certs.log',
    entries: [
      { period: '2024', title: 'CET-6（占位）', detail: '英语六级（占位）' },
      { period: '2023', title: '软件设计师（占位）', detail: '软考中级（占位）' },
    ],
  },
];
