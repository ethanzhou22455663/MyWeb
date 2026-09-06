import { useState } from 'react';
import { useUnlock } from '../../context/UnlockContext';

/**
 * 密码解锁弹层（modal）
 * - 由「输入密码解锁」按钮触发
 * - 输错只提示「密码错误」，不提示具体哪错（防枚举）
 * - 正确 → 解锁 + 关闭
 */
export default function UnlockDialog({ onClose }: { onClose: () => void }) {
  const { unlock } = useUnlock();
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const submit = () => {
    if (!value) return;
    if (unlock(value)) {
      onClose();
    } else {
      setError(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-[min(90vw,380px)] rounded-3xl border border-white/10 bg-surface p-8 shadow-[0_0_80px_rgb(var(--c-accent)/0.15)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 锁图标 */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-2xl">
          🔒
        </div>
        <h3 className="mt-4 text-center text-xl font-semibold text-white">
          输入密码解锁
        </h3>
        <p className="mt-1 text-center text-sm text-muted">
          此板块已锁定，输入密码后查看
        </p>

        {/* 密码框 */}
        <input
          type="password"
          value={value}
          autoFocus
          onChange={(e) => {
            setValue(e.target.value);
            setError(false);
          }}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="密码"
          className="mt-6 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted/50 outline-none transition-colors focus:border-accent/60"
        />
        {error && (
          <p className="mt-2 text-sm text-accent">密码错误</p>
        )}

        {/* 按钮 */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-white/10 py-3 text-sm text-muted transition-colors hover:border-white/30 hover:text-white"
          >
            取消
          </button>
          <button
            onClick={submit}
            className="flex-1 rounded-xl bg-accent py-3 text-sm font-semibold text-black transition-all hover:shadow-[0_0_30px_rgb(var(--c-accent)/0.4)]"
          >
            解锁
          </button>
        </div>
      </div>
    </div>
  );
}
