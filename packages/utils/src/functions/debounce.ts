type DebouncedFunction<T extends (...args: any[]) => any> = {
  (...args: Parameters<T>): void;
  cancel: () => void;
};

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate: boolean = false
): DebouncedFunction<T> {
  let timeout: ReturnType<typeof setTimeout> | null;

  const debounced = function (this: any, ...args: Parameters<T>) {
    const context = this;

    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);

    if (callNow) {
      func.apply(context, args);
    }
  } as DebouncedFunction<T>;

  debounced.cancel = function () {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
}
