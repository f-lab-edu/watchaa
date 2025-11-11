# @dnym/carousel

[English](./README.md) | 한국어

단일 및 다중 슬라이드 표시, 자동 재생, 무한 루프 등을 지원하는 커스터마이징 가능한 경량 React 캐러셀 컴포넌트입니다.

## 주요 기능

- 🎠 **단일 & 다중 슬라이드 뷰** - 한 번에 하나 또는 여러 슬라이드 표시
- ♾️ **무한 루프** - 끊김 없는 무한 스크롤
- ⏱️ **자동 재생 모드** - 커스터마이징 가능한 간격으로 자동 슬라이드 전환
- 📱 **반응형** - 컨테이너 크기에 맞춰 조정
- 🎨 **완전한 커스터마이징** - 커스텀 버튼, 페이지네이션, 프로그레스 바
- 🎯 **TypeScript 지원** - 완전한 타입 안정성
- 📦 **제로 디펜던시** - 경량 및 빠른 성능
- ♿ **접근성** - ARIA 레이블 및 키보드 내비게이션 지원
- 🎨 **Tailwind CSS 최적화** - Tailwind CSS 유틸리티로 구축

## 설치

```bash
npm install @dnym/carousel
# or
yarn add @dnym/carousel
# or
pnpm add @dnym/carousel
```

### VS Code 설정 (권장)

Tailwind CSS IntelliSense를 사용하여 최상의 개발 경험을 위해 `.vscode/settings.json`에 다음을 추가하세요:

```json
{
  "tailwindCSS.classAttributes": [".*[cC]lass.*"]
}
```

이렇게 하면 모든 클래스 관련 props(예: `className`, `containerClassName`, `dotClassName` 등)에서 Tailwind CSS 자동완성이 활성화됩니다.

## 기본 사용법

```tsx
import { Carousel } from '@dnym/carousel';
import '@dnym/carousel/carousel.css';

function App() {
  return (
    <Carousel.Root>
      <Carousel.Content>
        <div>슬라이드 1</div>
        <div>슬라이드 2</div>
        <div>슬라이드 3</div>
      </Carousel.Content>
      <Carousel.PrevButton />
      <Carousel.NextButton />
      <Carousel.Pagination />
    </Carousel.Root>
  );
}
```

## API 레퍼런스

### Carousel.Root

전체 캐러셀을 감싸는 루트 컴포넌트입니다.

#### Props

| Prop            | Type                                  | Default    | Description                                        |
| --------------- | ------------------------------------- | ---------- | -------------------------------------------------- |
| `mode`          | `'auto' \| 'manual'`                  | `'manual'` | 슬라이드 전환 모드                                 |
| `loop`          | `boolean`                             | `false`    | 무한 루프 활성화 (auto 모드에서는 자동으로 `true`) |
| `autoInterval`  | `number`                              | `5000`     | 자동 슬라이드 간격(밀리초, auto 모드에서만 작동)   |
| `initialIndex`  | `number`                              | `0`        | 초기 슬라이드 인덱스                               |
| `slidesPerView` | `number`                              | `1`        | 한 번에 표시할 슬라이드 개수                       |
| `spaceBetween`  | `number`                              | `0`        | 슬라이드 간 간격(픽셀, `slidesPerView > 1`일 때만) |
| `onSlideChange` | `(index: number \| number[]) => void` | -          | 슬라이드 변경 시 호출되는 콜백                     |

### Carousel.Content

캐러셀 슬라이드의 컨테이너입니다. 각 자식 요소가 하나의 슬라이드가 됩니다.

#### Props

`HTMLDivElement`의 props를 확장합니다 (`className`, `style` 등)

### Carousel.PrevButton

이전 슬라이드로 이동하는 버튼입니다.

#### Props

`HTMLButtonElement`의 props를 확장합니다. `loop={false}`일 때 첫 번째 슬라이드에서 자동으로 비활성화됩니다.

### Carousel.NextButton

다음 슬라이드로 이동하는 버튼입니다.

#### Props

`HTMLButtonElement`의 props를 확장합니다. `loop={false}`일 때 마지막 슬라이드에서 자동으로 비활성화됩니다.

### Carousel.Pagination

내비게이션을 위한 페이지네이션 점을 표시합니다.

> **참고:** `slidesPerView > 1`일 때는 사용할 수 없습니다

#### Props

| Prop                 | Type                                              | Description             |
| -------------------- | ------------------------------------------------- | ----------------------- |
| `containerClassName` | `string`                                          | 컨테이너 커스텀 클래스  |
| `dotClassName`       | `string`                                          | 비활성 점 커스텀 클래스 |
| `activeDotClassName` | `string`                                          | 활성 점 커스텀 클래스   |
| `renderDot`          | `(index: number, isActive: boolean) => ReactNode` | 커스텀 점 렌더러        |

### Carousel.ProgressBar

현재 위치를 나타내는 프로그레스 바를 표시합니다.

> **참고:** `slidesPerView > 1`일 때는 사용할 수 없습니다

#### Props

| Prop            | Type     | Description                      |
| --------------- | -------- | -------------------------------- |
| `className`     | `string` | 컨테이너 커스텀 클래스           |
| `fillClassName` | `string` | 프로그레스 바 채움 커스텀 클래스 |

## 예제

### 자동 재생 캐러셀

```tsx
<Carousel.Root mode="auto" autoInterval={3000}>
  <Carousel.Content>
    <div>슬라이드 1</div>
    <div>슬라이드 2</div>
    <div>슬라이드 3</div>
  </Carousel.Content>
  <Carousel.ProgressBar />
</Carousel.Root>
```

### 무한 루프

```tsx
<Carousel.Root loop={true}>
  <Carousel.Content>
    <div>슬라이드 1</div>
    <div>슬라이드 2</div>
    <div>슬라이드 3</div>
  </Carousel.Content>
  <Carousel.PrevButton />
  <Carousel.NextButton />
  <Carousel.Pagination />
</Carousel.Root>
```

### 다중 슬라이드

```tsx
<Carousel.Root slidesPerView={3} spaceBetween={16}>
  <Carousel.Content>
    <div>슬라이드 1</div>
    <div>슬라이드 2</div>
    <div>슬라이드 3</div>
    <div>슬라이드 4</div>
    <div>슬라이드 5</div>
  </Carousel.Content>
  <Carousel.PrevButton />
  <Carousel.NextButton />
</Carousel.Root>
```

### 커스텀 버튼

```tsx
<Carousel.Root>
  <Carousel.Content>
    <div>슬라이드 1</div>
    <div>슬라이드 2</div>
    <div>슬라이드 3</div>
  </Carousel.Content>
  <Carousel.PrevButton className="custom-prev">
    <span>←</span>
  </Carousel.PrevButton>
  <Carousel.NextButton className="custom-next">
    <span>→</span>
  </Carousel.NextButton>
</Carousel.Root>
```

### 커스텀 페이지네이션

```tsx
<Carousel.Root>
  <Carousel.Content>
    <div>슬라이드 1</div>
    <div>슬라이드 2</div>
    <div>슬라이드 3</div>
  </Carousel.Content>
  <Carousel.Pagination
    renderDot={(index, isActive) => (
      <span style={{ opacity: isActive ? 1 : 0.5 }}>{index + 1}</span>
    )}
  />
</Carousel.Root>
```

## 스타일링

캐러셀은 최소한의 기본 스타일을 제공합니다. 다음 방법으로 커스터마이징할 수 있습니다:

1. **CSS 클래스** - 기본 클래스 오버라이드
2. **인라인 스타일** - `style` 또는 `className` props 전달
3. **커스텀 컴포넌트** - 페이지네이션에 `renderDot` 사용

### 기본 CSS 클래스

- `.carousel-root` - 루트 컨테이너
- `.carousel-content` - 콘텐츠 래퍼
- `.carousel-content-multi` - 콘텐츠 래퍼(다중 슬라이드)
- `.carousel-button` - 내비게이션 버튼
- `.carousel-button-prev` - 이전 버튼
- `.carousel-button-next` - 다음 버튼
- `.carousel-button-icon` - 버튼 아이콘 SVG
- `.carousel-pagination` - 페이지네이션 컨테이너
- `.carousel-pagination-dot` - 페이지네이션 점
- `.carousel-pagination-dot-active` - 활성 페이지네이션 점
- `.carousel-progress-bar` - 프로그레스 바 컨테이너
- `.carousel-progress-bar-fill` - 프로그레스 바 채움

## 훅(Hooks)

### useCarouselState

자식 컴포넌트에서 캐러셀 상태에 접근합니다.

```tsx
import { useCarouselState } from '@dnym/carousel';

function CustomComponent() {
  const {
    currentSlideIndex,
    activeSlideIndex,
    totalItemLength,
    mode,
    loop,
    autoInterval,
    isTransitioning,
    slidesPerView,
    spaceBetween,
  } = useCarouselState();

  return <div>현재 슬라이드: {activeSlideIndex + 1}</div>;
}
```

### useCarouselActions

자식 컴포넌트에서 캐러셀 액션에 접근합니다.

```tsx
import { useCarouselActions } from '@dnym/carousel';

function CustomControls() {
  const { goToSlide, goToPrev, goToNext } = useCarouselActions();

  return (
    <div>
      <button onClick={goToPrev}>이전</button>
      <button onClick={() => goToSlide(0)}>처음</button>
      <button onClick={goToNext}>다음</button>
    </div>
  );
}
```

## TypeScript

이 패키지는 TypeScript로 작성되었으며 타입 정의를 포함합니다.

```tsx
import type { CarouselRootProps } from '@dnym/carousel';

const props: CarouselRootProps = {
  mode: 'auto',
  loop: true,
  autoInterval: 3000,
};
```

## 브라우저 지원

- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)

## 라이선스

MIT © [Moon-Sangho](https://github.com/Moon-Sangho)

## 기여하기

기여를 환영합니다! Pull Request를 자유롭게 제출해주세요.

## 저장소

[https://github.com/f-lab-edu/watchaa](https://github.com/f-lab-edu/watchaa/tree/main/packages/carousel)
