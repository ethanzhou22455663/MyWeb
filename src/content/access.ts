// ============================================
// 访问密码 ★ 改密码就改这一行 ★
// 只用一个全局密码：解锁一次，所有私密板块全部解锁
// ============================================

export const PASSWORD = 'mima'; // ← 改成你想要的

export function isValidPassword(password: string): boolean {
  return password === PASSWORD;
}
