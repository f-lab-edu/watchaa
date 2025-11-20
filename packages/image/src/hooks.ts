import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook to observe the size of an HTML element with debounce.
 * @param debounceMs Debounce time in milliseconds to limit the frequency of size updates.
 * @returns An object containing a ref callback to attach to the element and the current size of the element.
 */
export const useResizeObserver = <T extends HTMLElement>(debounceMs = 500) => {
  const [element, setElement] = useState<T | null>(null);
  const [size, setSize] = useState<{ width: number; height: number } | null>(
    null
  );

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!element) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      const newWidth = entry.contentRect.width;
      const newHeight = entry.contentRect.height;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setSize({ width: newWidth, height: newHeight });
        timeoutRef.current = null;
      }, debounceMs);
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [element, debounceMs]);

  return { ref: setElement, size };
};
