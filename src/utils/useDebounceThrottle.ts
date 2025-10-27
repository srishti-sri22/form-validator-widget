import { useRef, useCallback } from 'react';

export const useDebounce = (fn: (...args: unknown[]) => void, wait = 300) => {
  const t = useRef<number | null>(null);
  return useCallback((...args: unknown[]) => {
    if (t.current) window.clearTimeout(t.current);
    t.current = window.setTimeout(() => fn(...args), wait);
  }, [fn, wait]);
};

export const useThrottle = (
  fn: (values: Record<string, unknown>) => void | Promise<void>,
  wait = 1000
) => {
  const last = useRef<number>(0);

  return useCallback(
    async (values: Record<string, unknown>) => {
      const now = Date.now();
      if (now - last.current < wait) return;
      last.current = now;
      await fn(values);
    },
    [fn, wait]
  );
};
