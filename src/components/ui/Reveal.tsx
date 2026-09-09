import { createElement, useEffect, useRef, useState } from 'react';
import type { CSSProperties, ElementType, ReactNode } from 'react';

/**
 * 入场动画包裹组件 ★ 全站统一动画系统的唯一入口 ★
 *
 * 用法：把重复元素的标签换成它（它直接变成那个元素，不套多余层级）：
 *   <Reveal as="a" href={...} variant="up" delay={i * 70} className="原类名">
 *
 * - variant='up'   上浮 + 淡入（默认）；variant='fade' 只淡入（发丝线网格等不能位移的地方）
 * - delay          毫秒，做子项交错：delay={i * 70}
 * - 进视口触发一次（IntersectionObserver 共享单例），之后永久可见
 * - 系统开"减少动态效果"时由 index.css 强制立即可见，这里无需处理
 * - 元素上原有的 transition-* 悬浮类保留不动：入场是 animation，与悬浮 transition 互不影响
 *
 * 想改全站动效手感：改 index.css 的 --ease-out-expo / .6s，别改这里。
 */
type RevealProps = {
  as?: ElementType;
  className?: string;
  delay?: number; // ms，交错用
  variant?: 'up' | 'fade';
  children?: ReactNode;
} & Record<string, unknown>; // 透传 href / target / rel 等

// 共享单例观察器：所有 Reveal 共用一个 IntersectionObserver，回调存 Map
const ioCallbacks = new Map<Element, () => void>();
let io: IntersectionObserver | null = null;
if (typeof IntersectionObserver !== 'undefined') {
  io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        ioCallbacks.get(entry.target)?.();
        ioCallbacks.delete(entry.target);
        io?.unobserve(entry.target);
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -8% 0px' } // 到底部前 8% 就触发，带点提前量
  );
}

export default function Reveal({
  as: Tag = 'div',
  className = '',
  delay = 0,
  variant = 'up',
  children,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    if (!io) {
      setVisible(true); // 极老浏览器兜底：直接显示
      return;
    }
    ioCallbacks.set(el, () => setVisible(true));
    io.observe(el);
    return () => {
      ioCallbacks.delete(el);
      io?.unobserve(el);
    };
  }, [visible]);

  const style = { '--reveal-delay': `${delay}ms` } as CSSProperties;
  const cls =
    `${variant === 'fade' ? 'reveal-fade' : 'reveal'}` +
    `${visible ? ' is-visible' : ''}` +
    `${className ? ' ' + className : ''}`;

  return createElement(Tag, { ...rest, ref, className: cls, style }, children);
}
