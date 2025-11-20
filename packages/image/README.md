# Image Optimization Package

Next.js `next/image` 기능을 **S3 + CloudFront + Lambda@Edge** 기반으로 재구현한 이미지 최적화 패키지입니다.

이 패키지는 아래 3가지로 구성됩니다:

1. **React Image Component** — Next/Image 와 동일한 API (`fill`, `width`, `height`, `priority`, `placeholder`, `sizes`, `srcSet` 자동 생성 등)
2. **Lambda Sign Function** — 이미지 파라미터(url, w, q, format) 검증 및 HMAC 서명(sign) 생성
3. **Lambda Resize Function** — CloudFront Origin Request 단계에서 Sharp 변환 수행 + Edge 캐싱 처리

---

# 🎯 Motivation

Next.js가 아닌 **순수 React + S3 + CloudFront** 프로젝트에서도  
완전한 이미지 최적화를 제공하고 싶다는 요구에서 출발했습니다.

이 패키지는 다음 기능을 제공합니다:

- width-based 자동 srcSet 생성 (1x / 2x / 3x)
- Responsive `sizes` 자동 생성
- `fill` 모드 지원 (ResizeObserver 기반 동적 width 계산)
- Lazy Loading (IntersectionObserver)
- `priority` 이미지 처리
- blurred placeholder (low-quality preview)
- 외부 이미지 허용 (unsplash, github assets 등)
- CloudFront Edge 캐싱 (빌드 없이 즉시 이미지 최적화)
- Lambda@Edge 기반 origin-level Sharp 변환

---

# 🏛 Architecture

```txt
React App
  ↓ POST /img-sign
CloudFront (Viewer Request)
  ↓
Lambda@Edge (sign)
  ↓ JSON { signedUrl }

Image Component
  ↓ GET /img/<signed-path>?w=750&q=80&sig=...
CloudFront (Origin Request)
  ↓
Lambda@Edge (img-resize)
  ↓ Sharp transform
  ↓ Return optimized image
Edge Cache 저장
  ↓
Browser 표시
```

# 📦 Installation

모노레포 내부 프로젝트의 package.json에 다음과 같이 `@movii/image`를 추가합니다.

```
  "dependencies": {
    ...
    "@movii/image": "workspace:*",
	}
```

# 🖼 React Image Component Usage

## Basic

```tsx
import { Image } from '@your-scope/image-optimizer';

export function Hero() {
  return (
    <Image
      src="https://image.tmdb.org/t/p/original/photo-12345"
      alt="Sample"
      width={800}
      height={600}
      placeholder="blur"
      priority
    />
  );
}
```

## Fill

```tsx
<div style={{ position: 'relative', width: '100%', height: 300 }}>
  <Image
    src="https://image.tmdb.org/t/p/original/photo-12345"
    alt="Sample"
    fill
    objectFit="cover"
  />
</div>
```

# 🔐 Signing API

서명은 HMAC 기반 파라미터 변조 방지 기능입니다.

- React → /img-sign (POST)

```js
fetch('/img-sign', {
  method: 'POST',
  body: JSON.stringify({
    url,
    width,
    quality,
    format,
  }),
});
```

- Lambda(Sign) 응답:

```json
{
  "signedUrl": "/img/w=750&q=80&f=webp&url=...&sig=abcdef123456"
}
```

> signed URL은 resize Lambda가 파라미터 변조 여부를 검증하는 기준이 됩니다.

# 🛠 Lambda Functions (Sign + Resize)

패키지에는 다음 두 개의 함수가 포함됩니다:

```bash
/lambda/sign/index.mjs
/lambda/resize/index.mjs
```

## Sign Lambda Responsibilities

- 허용된 이미지 도메인 화이트리스트 검사
- width, quality, format 파라미터 검증
- 변조 방지용 HMAC signature 생성
- signed URL 생성

## Resize Lambda Responsibilities

- CloudFront Origin Request 단계에서 실행
- signed URL 검증
- Sharp 기반 이미지 리사이즈 / 포맷 변환
- CloudFront Edge 캐시에 최종 이미지 저장
- 최적화된 바이너리(webp/png/jpeg) 반환

# ☁️ CloudFront Behavior Setup

## 1. /img-sign Behavior

| 항목                   | 값                                           |
| ---------------------- | -------------------------------------------- |
| Path Pattern           | `/img-sign`                                  |
| Viewer Protocol Policy | Redirect HTTP → HTTPS                        |
| Allowed HTTP Methods   | GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE |
| Cache Policy           | CachingDisabled                              |
| Origin Request Policy  | AllViewerExceptHostHeader                    |
| Lambda@Edge            | **Viewer Request → signLambda(version)**     |

## 2. /img/\* Behavior

| 항목                   | 값                                         |
| ---------------------- | ------------------------------------------ |
| Path Pattern           | `/img/*`                                   |
| Viewer Protocol Policy | Redirect HTTP → HTTPS                      |
| Allowed HTTP Methods   | GET, HEAD                                  |
| Cache Policy           | CachingOptimized                           |
| Origin Request Policy  | AllViewerExceptHostHeader                  |
| Lambda@Edge            | **Origin Request → resizeLambda(version)** |

# 🚀 Deployment Guide (Manual)

## Manual Deployment Steps

### 1. Lambda 코드 zip 생성

```bash
cd packages/image/src/lambda/sign
pnpm zip

cd packages/image/src/resize
pnpm zip
```

### 2. Lambda 업로드

- Region: us-east-1
- Architecture: x86_64
- No environment variables allowed (Lambda@Edge constraint)

### 3. Publish new version

각 함수에 대해 “버전 게시” 필요.

### 4. CloudFront Behavior 연결

- sign: Viewer Request
- resize: Origin Request에 연결.
