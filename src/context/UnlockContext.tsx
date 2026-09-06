import { createContext, useCallback, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { isValidPassword } from '../content/access';

// ============================================
// 全局解锁状态 ★ 解锁逻辑只在这一个文件 ★
// 解锁状态存 localStorage，刷新保持
// ============================================

const STORAGE_KEY = 'pf_unlocked';

interface UnlockContextValue {
  unlocked: boolean;
  /** 校验密码，成功则解锁并返回 true */
  unlock: (password: string) => boolean;
}

const UnlockContext = createContext<UnlockContextValue>({
  unlocked: false,
  unlock: () => false,
});

export function UnlockProvider({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState<boolean>(
    () => localStorage.getItem(STORAGE_KEY) === '1'
  );

  const unlock = useCallback((password: string): boolean => {
    if (isValidPassword(password)) {
      setUnlocked(true);
      localStorage.setItem(STORAGE_KEY, '1');
      return true;
    }
    return false;
  }, []);

  return (
    <UnlockContext.Provider value={{ unlocked, unlock }}>
      {children}
    </UnlockContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUnlock(): UnlockContextValue {
  return useContext(UnlockContext);
}
