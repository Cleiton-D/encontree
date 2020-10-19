import { useCallback, useEffect } from 'react';

export default function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T>,
  cb: () => void,
): void {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const eventTarget = event.target as Node;

      if (ref.current && !ref.current.contains(eventTarget)) {
        cb();
      }
    },
    [ref, cb],
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [handleClickOutside]);
}
