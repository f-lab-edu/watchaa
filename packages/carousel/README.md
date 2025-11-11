# movii-carousel

[한국어](./README.ko.md) | English

A customizable, lightweight React carousel component with support for single and multiple slides, auto-play, infinite loop, and more.

## Features

- 🎠 **Single & Multi-slide views** - Display one or multiple slides at once
- ♾️ **Infinite loop** - Seamless infinite scrolling
- ⏱️ **Auto-play mode** - Automatic slide transitions with customizable intervals
- 📱 **Responsive** - Adapts to container size
- 🎨 **Fully customizable** - Custom buttons, pagination, and progress bar
- 🎯 **TypeScript support** - Full type safety
- 📦 **Zero dependencies** - Lightweight and fast
- ♿ **Accessible** - ARIA labels and keyboard navigation support
- 🎨 **Tailwind CSS optimized** - Built with Tailwind CSS utilities

## Installation

```bash
npm install movii-carousel
# or
yarn add movii-carousel
# or
pnpm add movii-carousel
```

### VS Code Setup (Recommended)

For the best development experience with Tailwind CSS IntelliSense, add this to your `.vscode/settings.json`:

```json
{
  "tailwindCSS.classAttributes": [".*[cC]lass.*"]
}
```

This enables Tailwind CSS autocomplete for all class-related props (e.g., `className`, `containerClassName`, `dotClassName`, etc.).

## Basic Usage

```tsx
import { Carousel } from 'movii-carousel';
import 'movii-carousel/carousel.css';

function App() {
  return (
    <Carousel.Root>
      <Carousel.Content>
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </Carousel.Content>
      <Carousel.PrevButton />
      <Carousel.NextButton />
      <Carousel.Pagination />
    </Carousel.Root>
  );
}
```

## API Reference

### Carousel.Root

The root component that wraps the entire carousel.

#### Props

| Prop            | Type                                  | Default    | Description                                                    |
| --------------- | ------------------------------------- | ---------- | -------------------------------------------------------------- |
| `mode`          | `'auto' \| 'manual'`                  | `'manual'` | Slide transition mode                                          |
| `loop`          | `boolean`                             | `false`    | Enable infinite loop (automatically `true` in auto mode)       |
| `autoInterval`  | `number`                              | `5000`     | Auto slide interval in milliseconds (only in auto mode)        |
| `initialIndex`  | `number`                              | `0`        | Initial slide index                                            |
| `slidesPerView` | `number`                              | `1`        | Number of slides visible per view                              |
| `spaceBetween`  | `number`                              | `0`        | Space between slides in pixels (only when `slidesPerView > 1`) |
| `onSlideChange` | `(index: number \| number[]) => void` | -          | Callback when slide changes                                    |

### Carousel.Content

Container for carousel slides. Each child element becomes a slide.

#### Props

Extends `HTMLDivElement` props (`className`, `style`, etc.)

### Carousel.PrevButton

Button to navigate to the previous slide.

#### Props

Extends `HTMLButtonElement` props. Automatically disabled at the first slide when `loop={false}`.

### Carousel.NextButton

Button to navigate to the next slide.

#### Props

Extends `HTMLButtonElement` props. Automatically disabled at the last slide when `loop={false}`.

### Carousel.Pagination

Displays pagination dots for navigation.

> **Note:** Cannot be used when `slidesPerView > 1`

#### Props

| Prop                 | Type                                              | Description                    |
| -------------------- | ------------------------------------------------- | ------------------------------ |
| `containerClassName` | `string`                                          | Custom class for container     |
| `dotClassName`       | `string`                                          | Custom class for inactive dots |
| `activeDotClassName` | `string`                                          | Custom class for active dot    |
| `renderDot`          | `(index: number, isActive: boolean) => ReactNode` | Custom dot renderer            |

### Carousel.ProgressBar

Displays a progress bar indicating current position.

> **Note:** Cannot be used when `slidesPerView > 1`

#### Props

| Prop            | Type     | Description                    |
| --------------- | -------- | ------------------------------ |
| `className`     | `string` | Custom class for container     |
| `fillClassName` | `string` | Custom class for progress fill |

## Examples

### Auto-play Carousel

```tsx
<Carousel.Root mode="auto" autoInterval={3000}>
  <Carousel.Content>
    <div>Slide 1</div>
    <div>Slide 2</div>
    <div>Slide 3</div>
  </Carousel.Content>
  <Carousel.ProgressBar />
</Carousel.Root>
```

### Infinite Loop

```tsx
<Carousel.Root loop={true}>
  <Carousel.Content>
    <div>Slide 1</div>
    <div>Slide 2</div>
    <div>Slide 3</div>
  </Carousel.Content>
  <Carousel.PrevButton />
  <Carousel.NextButton />
  <Carousel.Pagination />
</Carousel.Root>
```

### Multiple Slides

```tsx
<Carousel.Root slidesPerView={3} spaceBetween={16}>
  <Carousel.Content>
    <div>Slide 1</div>
    <div>Slide 2</div>
    <div>Slide 3</div>
    <div>Slide 4</div>
    <div>Slide 5</div>
  </Carousel.Content>
  <Carousel.PrevButton />
  <Carousel.NextButton />
</Carousel.Root>
```

### Custom Buttons

```tsx
<Carousel.Root>
  <Carousel.Content>
    <div>Slide 1</div>
    <div>Slide 2</div>
    <div>Slide 3</div>
  </Carousel.Content>
  <Carousel.PrevButton className="custom-prev">
    <span>←</span>
  </Carousel.PrevButton>
  <Carousel.NextButton className="custom-next">
    <span>→</span>
  </Carousel.NextButton>
</Carousel.Root>
```

### Custom Pagination

```tsx
<Carousel.Root>
  <Carousel.Content>
    <div>Slide 1</div>
    <div>Slide 2</div>
    <div>Slide 3</div>
  </Carousel.Content>
  <Carousel.Pagination
    renderDot={(index, isActive) => (
      <span style={{ opacity: isActive ? 1 : 0.5 }}>{index + 1}</span>
    )}
  />
</Carousel.Root>
```

## Styling

The carousel comes with minimal default styles. You can customize it using:

1. **CSS classes** - Override default classes
2. **Inline styles** - Pass `style` or `className` props
3. **Custom components** - Use `renderDot` for pagination

### Default CSS Classes

- `.carousel-root` - Root container
- `.carousel-content` - Content wrapper
- `.carousel-content-multi` - Content wrapper (multi-slide)
- `.carousel-button` - Navigation buttons
- `.carousel-button-prev` - Previous button
- `.carousel-button-next` - Next button
- `.carousel-button-icon` - Button icon SVG
- `.carousel-pagination` - Pagination container
- `.carousel-pagination-dot` - Pagination dot
- `.carousel-pagination-dot-active` - Active pagination dot
- `.carousel-progress-bar` - Progress bar container
- `.carousel-progress-bar-fill` - Progress bar fill

## Hooks

### useCarouselState

Access carousel state from child components.

```tsx
import { useCarouselState } from 'movii-carousel';

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

  return <div>Current slide: {activeSlideIndex + 1}</div>;
}
```

### useCarouselActions

Access carousel actions from child components.

```tsx
import { useCarouselActions } from 'movii-carousel';

function CustomControls() {
  const { goToSlide, goToPrev, goToNext } = useCarouselActions();

  return (
    <div>
      <button onClick={goToPrev}>Prev</button>
      <button onClick={() => goToSlide(0)}>First</button>
      <button onClick={goToNext}>Next</button>
    </div>
  );
}
```

## TypeScript

This package is written in TypeScript and includes type definitions.

```tsx
import type { CarouselRootProps } from 'movii-carousel';

const props: CarouselRootProps = {
  mode: 'auto',
  loop: true,
  autoInterval: 3000,
};
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT © [Moon-Sangho](https://github.com/Moon-Sangho)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Repository

[https://github.com/f-lab-edu/movii](https://github.com/f-lab-edu/movii/tree/main/packages/carousel)
