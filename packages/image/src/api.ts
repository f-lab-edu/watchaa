// 메모이제이션 캐시
const signCache = new Map<string, Promise<string>>();

const MIN_WIDTH = 16;
const MAX_WIDTH = 3840; // Next.js 기준

export async function sign(
  endpoint: string,
  src: string,
  width: number,
  quality: number,
  format: string,
): Promise<string> {
  // 최소/최대 width 보정
  const safeWidth = Math.max(MIN_WIDTH, Math.min(Math.round(width), MAX_WIDTH));

  const key = `${src}|${safeWidth}|${quality}|${format}`;
  if (signCache.has(key)) {
    return signCache.get(key)!;
  }

  // API 요청 준비
  const promise = fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url: src,
      width: safeWidth,
      quality,
      format,
    }),
  })
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(`Failed to sign: ${src} w=${safeWidth}`);
      }
      const data = await res.json();
      if (!data.signedUrl) {
        throw new Error('Missing signedUrl from response');
      }
      return data.signedUrl;
    })
    .catch((err) => {
      // 실패 시 캐시 삭제
      signCache.delete(key);
      throw err;
    });

  // 캐싱
  signCache.set(key, promise);
  return promise;
}
