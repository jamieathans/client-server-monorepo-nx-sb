/* Used for React <= 18 */
import { useCallback, useInsertionEffect, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function useEffectEventShim<T extends Function>(callback: T): T {
  const ref = useRef(callback);

  useInsertionEffect(() => {
    ref.current = callback;
  }, [callback]);

  return useCallback((...args: unknown[]) => {
    return ref.current(...args);
  }, []) as unknown as T;
}
