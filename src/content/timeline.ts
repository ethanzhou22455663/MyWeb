// ============================================
// 发展历程数据 ★ 改时间线内容只动这个文件 ★
// - 条目随意加 / 删 / 改顺序
// - description 可留空（整个字段删掉就不显示）
// ============================================

export interface TimelineItem {
  year: string;
  title: string;
  description?: string;
}

export const timeline: TimelineItem[] = [
  { year: '2021', title: '起点（占位）', description: '一句话说明这一年发生的事（占位，可删）' },
  { year: '2023', title: '重要节点（占位）' },
  { year: '2025', title: '转折（占位）', description: '一句话（占位）' },
  { year: '2026', title: '现在（占位）' },
];
