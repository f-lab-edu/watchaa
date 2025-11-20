import crypto from 'node:crypto';

const allowedImageHosts = ['https://image.tmdb.org/t/p/original'];

// 커스텀 도메인을 쓰는 경우 추가 가능
const allowedOrigins = ['https://d3s8fkj1w5lpg3.cloudfront.net'];

// HMAC 서명용
const HMAC_SALT = '68075fcc527acb99d284d0bdfe7dc141e4dc80fd708179cbd96471ea6d5c2a89';

/**
 * - 특정 문자열(payload)에 대해 "SECRET 키로 서명된 해시값"을 만드는 함수
 * - width/quality/url이 중간에 변조되지 않도록 보장하는 용도
 * @param {string} value
 * @returns {string}
 */
const hmacSign = (value) => crypto.createHmac('sha256', HMAC_SALT).update(value).digest('hex');

/**
 * - base64 URL-safe 인코딩
 * - 외부 URL을 그대로 쓸 경우 &, ? 등으로 인해 쿼리 파라미터 파싱이 꼬일 수 있어서 안전하게 인코딩 처리
 * - 1. 문자열 → Buffer: 문자 하나 하나를 숫자(바이트)로 바꿔서 컴퓨터가 이해할 수 있게 함.
 *    - e.g, 'https://images.com/a.jpg' → [104, 116, 116, 112, ...]
 * - 2. Buffer → base64url 인코딩: 6비트 단위로 쪼개서 미리 정해진 문자 집합으로 치환.
 *    - e.g, [104, 116, 116, 112, ...] → 'aHR0cHM6Ly9pbWFnZXMuY29tL2EuanBn'
 * @param {string} str
 * @returns {string}
 */
const encode = (str) => Buffer.from(str).toString('base64url');

export const handler = async (event) => {
  const origin = event.headers.origin;
  const body = JSON.parse(event.body || '{}');

  // 1) 요청 Origin 검증
  // 다른 사이트에서 무작위로 sign API를 악용하지 못하게 하기 위함
  if (!allowedOrigins.includes(origin)) {
    return {
      statusCode: 403,
      body: 'Forbidden origin',
    };
  }

  // 2) 이미지 출처 검증
  const imageUrl = body.url;
  if (!imageUrl) {
    return { statusCode: 400, body: 'Missing url' };
  }

  // 외부 이미지를 무작위로 다운로드하면 Lambda가 DDOS를 당할 수 있어서 이미지 출처를 화이트리스트로 제한
  const parsed = new URL(imageUrl);
  if (!allowedImageHosts.includes(parsed.host)) {
    return { statusCode: 403, body: 'Image host not allowed' };
  }

  // 3) width/quality/format 검증 (악성 요청 방지)
  // e.g, width=9999999, quality=10000000와 같은 무리한 요청 방지
  const width = Math.min(Number(body.width || 0), 3840);
  if (!width || width < 16) {
    return { statusCode: 400, body: 'Invalid width' };
  }

  const quality = Math.min(Number(body.quality || 80), 100);
  const format = body.format || 'webp';

  // 4) signed URL 생성 → payload + signature
  const encodedUrl = encode(imageUrl);
  const payload = `w=${width}&q=${quality}&f=${format}&u=${encodedUrl}`;
  const sig = hmacSign(payload);

  const signedUrl = `/img/${payload}&sig=${sig}`;

  return {
    statusCode: 200,
    headers: {
      'access-control-allow-origin': origin,
      'access-control-allow-methods': 'POST, OPTIONS',
      'access-control-allow-headers': 'content-type',
    },
    body: JSON.stringify({ signedUrl }),
  };
};
