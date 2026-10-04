import { useEffect, useState } from 'react';

export function useApi<T>(load: () => Promise<T>, initial: T, deps: unknown[] = []) {
  const [data, setData] = useState<T>(initial);
  useEffect(() => {
    let live = true;
    load().then((d) => live && setData(d)).catch(() => { });
    return () => { live = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return data;
}