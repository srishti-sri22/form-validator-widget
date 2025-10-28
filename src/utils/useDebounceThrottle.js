import { useRef, useCallback } from 'react';
export const useDebounce = (fn, wait = 300) => {
    const t = useRef(null);
    return useCallback((...args) => {
        if (t.current)
            window.clearTimeout(t.current);
        t.current = window.setTimeout(() => fn(...args), wait);
    }, [fn, wait]);
};
export const useThrottle = (fn, wait = 1000) => {
    const last = useRef(0);
    return useCallback(async (values) => {
        const now = Date.now();
        if (now - last.current < wait)
            return;
        last.current = now;
        await fn(values);
    }, [fn, wait]);
};
