/**
 * 여러 클래스명을 결합합니다. falsy 값은 무시됩니다.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
