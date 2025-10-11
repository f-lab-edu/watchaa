import {
  Children,
  ComponentProps,
  createContext,
  isValidElement,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { cn } from './utils';

type CarouselMode = 'auto' | 'manual';

type ConfigurableCarouselProps = {
  /**
   * 자동 슬라이드 전환 모드 여부 (default: 'auto')
   */
  mode: CarouselMode;
  /**
   * 무한 루프 여부 (default: true)
   */
  loop: boolean;
  /**
   * 자동 슬라이드 전환 간격 (밀리초, default: 5000), auto mode에서만 유효한 값
   */
  autoInterval: number;
  /**
   * 초기 슬라이드 인덱스 (default: 0)
   */
  initialIndex: number;
  /**
   * 슬라이드 변경 시 호출되는 콜백 함수 (활성 슬라이드 인덱스 전달)
   */
  onSlideChange: (index: number) => void;
};

type CarouselRootProps = ComponentProps<'div'> & Partial<ConfigurableCarouselProps>;

type CarouselContentProps = ComponentProps<'div'> & {
  children: ReactNode;
  className?: string;
};

type CarouselState = Pick<ConfigurableCarouselProps, 'mode' | 'loop' | 'autoInterval'> & {
  /**
   * 슬라이드의 실제 인덱스 (복제 슬라이드 포함)
   */
  currentSlideIndex: number;
  /**
   * 현재 활성화된 슬라이드 인덱스 (유저가 보는 순서)
   */
  activeSlideIndex: number;
  /**
   * 전체 슬라이드 아이템 개수
   */
  totalItemLength: number;
  /**
   * 슬라이드 전환 중 여부
   */
  isTransitioning: boolean;
};

type CarouselActions = {
  /**
   * 특정 인덱스의 슬라이드로 이동
   */
  goToSlide: (index: number) => void;
  /**
   * 이전 슬라이드로 이동
   */
  goToPrev: () => void;
  /**
   * 다음 슬라이드로 이동
   */
  goToNext: () => void;
  /**
   * 슬라이드 전환이 끝났을 때 호출
   */
  handleTransitionEnd: () => void;
};

const CarouselStateContext = createContext<CarouselState | null>(null);
const CarouselActionsContext = createContext<CarouselActions | null>(null);

const useCarouselState = () => {
  const context = useContext(CarouselStateContext);
  if (!context) {
    throw new Error('Carousel components must be used within Carousel.Root');
  }
  return context;
};

const useCarouselActions = () => {
  const context = useContext(CarouselActionsContext);
  if (!context) {
    throw new Error('Carousel components must be used within Carousel.Root');
  }
  return context;
};

const CarouselRoot = ({
  mode = 'auto',
  loop = true,
  autoInterval = 5000,
  initialIndex = 0,
  onSlideChange,
  children,
  className,
  ...props
}: CarouselRootProps) => {
  // loop가 활성화된 경우 복제 슬라이드 고려
  const [currentSlideIndex, setCurrentSlideIndex] = useState(() => (loop ? initialIndex + 1 : initialIndex));
  const [isTransitioning, setIsTransitioning] = useState(false);

  const totalItemLength = useMemo(() => {
    let count = 0;
    Children.forEach(children, (child) => {
      if (isValidElement(child) && child.type === CarouselContent) {
        const contentChild = child as ReactElement<CarouselContentProps>;
        count = Children.count(contentChild.props.children);
      }
    });

    return count;
  }, [children]);

  // 활성 슬라이드 인덱스 계산 (UI 표시용)
  const activeSlideIndex = useMemo(() => {
    // loop가 비활성화되었거나 아이템이 1개 이하인 경우 실제 인덱스 반환
    if (!loop || totalItemLength <= 1) {
      return currentSlideIndex;
    }
    // loop가 활성화된 경우 복제 슬라이드를 제외한 인덱스 계산
    return (currentSlideIndex - 1 + totalItemLength) % totalItemLength;
  }, [currentSlideIndex, loop, totalItemLength]);

  const goToSlide = useCallback(
    (index: number) => {
      // 유효하지 않은 인덱스거나 transition 중이면 무시
      if (index < 0 || index >= totalItemLength || isTransitioning) {
        return;
      }

      setIsTransitioning(true);
      // loop가 활성화된 경우 활성 슬라이드 인덱스를 복제 슬라이드 고려한 인덱스로 변환
      const targetIndex = loop ? index + 1 : index;
      setCurrentSlideIndex(targetIndex);
      onSlideChange?.(index);
    },
    [totalItemLength, onSlideChange, isTransitioning, loop],
  );

  const goToNext = useCallback(() => {
    if (isTransitioning) {
      return;
    }

    setIsTransitioning(true);
    setCurrentSlideIndex((prev) => prev + 1);

    const targetIndex = activeSlideIndex === totalItemLength - 1 ? 0 : activeSlideIndex + 1;
    onSlideChange?.(targetIndex);
  }, [isTransitioning, activeSlideIndex, totalItemLength, onSlideChange]);

  const goToPrev = useCallback(() => {
    if (isTransitioning) {
      return;
    }

    setIsTransitioning(true);
    setCurrentSlideIndex((prev) => prev - 1);

    const targetIndex = activeSlideIndex === 0 ? totalItemLength - 1 : activeSlideIndex - 1;
    onSlideChange?.(targetIndex);
  }, [isTransitioning, activeSlideIndex, totalItemLength, onSlideChange]);

  const handleTransitionEnd = useCallback(() => {
    if (loop && totalItemLength > 1) {
      if (currentSlideIndex >= totalItemLength + 1) {
        // 마지막 복제 슬라이드에서 첫 번째 실제 슬라이드로 점프
        setCurrentSlideIndex(1);
      } else if (currentSlideIndex <= 0) {
        // 첫 번째 복제 슬라이드에서 마지막 실제 슬라이드로 점프
        setCurrentSlideIndex(totalItemLength);
      }
    }
    setIsTransitioning(false);
  }, [loop, totalItemLength, currentSlideIndex]);

  const actions: CarouselActions = useMemo(
    () => ({
      goToSlide,
      goToPrev,
      goToNext,
      handleTransitionEnd,
    }),
    [goToSlide, goToPrev, goToNext, handleTransitionEnd],
  );

  const state: CarouselState = useMemo(
    () => ({
      currentSlideIndex,
      activeSlideIndex,
      totalItemLength,
      mode,
      loop,
      autoInterval,
      isTransitioning,
    }),
    [currentSlideIndex, activeSlideIndex, totalItemLength, mode, loop, autoInterval, isTransitioning],
  );

  // auto mode일 때 자동 슬라이드 전환
  useEffect(() => {
    if (mode !== 'auto' || totalItemLength <= 1) return;

    let startTime = Date.now();
    let animationId: number;

    const checkForSlideChange = () => {
      const now = Date.now();
      const elapsed = now - startTime;

      // 지정된 간격이 지났으면 다음 슬라이드로 이동
      if (elapsed >= autoInterval) {
        setIsTransitioning(true);
        setCurrentSlideIndex((prev) => prev + 1);

        const targetIndex = activeSlideIndex === totalItemLength - 1 ? 0 : activeSlideIndex + 1;
        onSlideChange?.(targetIndex);
        startTime = now; // 타이머 리셋
      }

      animationId = requestAnimationFrame(checkForSlideChange);
    };

    animationId = requestAnimationFrame(checkForSlideChange);
    return () => cancelAnimationFrame(animationId);
  }, [mode, totalItemLength, autoInterval, onSlideChange, loop, activeSlideIndex]);

  return (
    <CarouselStateContext.Provider value={state}>
      <CarouselActionsContext.Provider value={actions}>
        <div {...props} className={cn('relative', className)}>
          {children}
        </div>
      </CarouselActionsContext.Provider>
    </CarouselStateContext.Provider>
  );
};

const CarouselContent = ({ children, className, ...props }: CarouselContentProps) => {
  const { currentSlideIndex, loop, isTransitioning } = useCarouselState();
  const { handleTransitionEnd } = useCarouselActions();
  const totalItemLength = Children.count(children);
  const childrenArray = Children.toArray(children);

  // 무한 루프를 위한 복제 슬라이드 생성
  const slides =
    loop && totalItemLength > 1
      ? [childrenArray[totalItemLength - 1], ...childrenArray, childrenArray[0]]
      : childrenArray;

  const totalSlidesLength = slides.length;

  return (
    <div {...props} className={cn('overflow-hidden w-full', className)}>
      <ul
        style={{
          display: 'flex',
          transition: isTransitioning ? 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
          transform: `translateX(-${currentSlideIndex * (100 / totalSlidesLength)}%)`,
          width: `${totalSlidesLength * 100}%`,
          overflow: 'hidden',
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {slides.map((slide, index) => (
          <li
            key={`slide-${index}`}
            style={{
              width: `${100 / totalSlidesLength}%`,
              flexShrink: 0,
            }}
          >
            {slide}
          </li>
        ))}
      </ul>
    </div>
  );
};

const CarouselPrevButton = ({ children, className, disabled, ...props }: ComponentProps<'button'>) => {
  const { activeSlideIndex, loop } = useCarouselState();
  const { goToPrev } = useCarouselActions();

  // loop가 false이고 첫 번째 슬라이드라면 disabled
  const isDisabled = disabled || (!loop && activeSlideIndex === 0);

  return (
    <button
      type="button"
      className={cn(
        'absolute left-4 top-1/2 -translate-y-1/2 z-20 size-10 transition-colors flex items-center justify-center',
        className,
      )}
      disabled={isDisabled}
      onClick={goToPrev}
      aria-label="Previous slide"
      {...props}
    >
      {children || (
        <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      )}
    </button>
  );
};

const CarouselNextButton = ({ children, className, disabled, ...props }: ComponentProps<'button'>) => {
  const { activeSlideIndex, totalItemLength, loop } = useCarouselState();
  const { goToNext } = useCarouselActions();

  const maxIndex = Math.max(0, totalItemLength - 1);
  // loop가 false이고 마지막 슬라이드라면 disabled
  const isDisabled = disabled || (!loop && activeSlideIndex >= maxIndex);

  return (
    <button
      type="button"
      className={cn(
        'absolute right-4 top-1/2 -translate-y-1/2 z-20 size-10 transition-colors flex items-center justify-center',
        className,
      )}
      onClick={goToNext}
      disabled={isDisabled}
      aria-label="Next slide"
      {...props}
    >
      {children || (
        <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      )}
    </button>
  );
};

type CarouselPaginationProps = {
  containerClassName?: string;
  dotClassName?: string;
  activeDotClassName?: string;
  renderDot?: (index: number, isActive: boolean) => ReactNode;
};

const CarouselPagination = ({
  containerClassName,
  dotClassName,
  activeDotClassName,
  renderDot,
}: CarouselPaginationProps) => {
  const { activeSlideIndex, totalItemLength } = useCarouselState();
  const { goToSlide } = useCarouselActions();

  return (
    <div className={cn('flex justify-center gap-2', containerClassName)}>
      {Array.from({ length: totalItemLength }, (_, index) => {
        const isActive = index === activeSlideIndex;
        const ariaLabel = `Go to slide ${index + 1}`;

        if (renderDot) {
          return (
            <button key={index} type="button" onClick={() => goToSlide(index)} aria-label={ariaLabel}>
              {renderDot(index, isActive)}
            </button>
          );
        }

        return (
          <button
            key={index}
            type="button"
            className={cn(
              'size-2 transition-colors cursor-pointer rounded-full',
              isActive
                ? cn('bg-white', activeDotClassName)
                : cn('rounded-full bg-[var(--color-disabled-text)]', dotClassName),
            )}
            onClick={() => goToSlide(index)}
            aria-label={ariaLabel}
          />
        );
      })}
    </div>
  );
};

type CarouselProgressBarProps = {
  className?: string;
  fillClassName?: string;
};

const CarouselProgressBar = ({ className, fillClassName }: CarouselProgressBarProps) => {
  const { mode, isTransitioning, autoInterval, totalItemLength, activeSlideIndex } = useCarouselState();
  const progressRef = useRef<HTMLDivElement>(null);

  // auto mode에서 progress 계산
  useEffect(() => {
    if (mode !== 'auto' || totalItemLength <= 1 || !progressRef.current) return;

    const startTime = Date.now();
    let animationId: number;

    const updateProgress = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const newProgress = Math.min(elapsed / autoInterval, 1);

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${newProgress})`;
      }

      animationId = requestAnimationFrame(updateProgress);
    };

    animationId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationId);
  }, [mode, autoInterval, totalItemLength, activeSlideIndex]);

  // manual mode에서 progress 계산
  useEffect(() => {
    if (mode === 'manual' && progressRef.current) {
      const newProgress = totalItemLength > 0 ? (activeSlideIndex + 1) / totalItemLength : 0;
      progressRef.current.style.transform = `scaleX(${newProgress})`;
    }
  }, [mode, totalItemLength, activeSlideIndex]);

  return (
    <div className={cn('absolute top-0 left-0 w-full h-[2px] bg-[var(--color-white-opacity20)] z-10', className)}>
      <div
        ref={progressRef}
        className={cn('h-full bg-red-500', fillClassName)}
        style={{
          width: '100%',
          transformOrigin: 'left center',
          transform: 'scaleX(0)',
          transition:
            mode === 'manual' && isTransitioning ? 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
        }}
      />
    </div>
  );
};

export const Carousel = {
  Root: CarouselRoot,
  Content: CarouselContent,
  PrevButton: CarouselPrevButton,
  NextButton: CarouselNextButton,
  Pagination: CarouselPagination,
  ProgressBar: CarouselProgressBar,
};

export {
  CarouselContentProps,
  CarouselPaginationProps,
  CarouselProgressBarProps,
  CarouselRootProps,
  useCarouselActions,
  useCarouselState,
};
