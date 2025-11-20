import { useEffect, useState, CSSProperties, useRef } from 'react';

import { sign } from './api';
import { SIGN_API_ENDPOINT } from './constants';
import { useResizeObserver } from './hooks';
import { ImageProps } from './types';
import { computeSizes, getCandidateWidths, parseMaxWidthFromSizes } from './utils';

const OptimizedImage: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  quality = 80,
  format = 'webp',
  fill,
  placeholder = 'empty',
  objectFit = 'cover',
  loading = 'lazy',
  priority = false,
  sizes,
  className,
  style,
  ...props
}) => {
  // lazy loading용 IntersectionObserver
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [isVisible, setIsVisible] = useState(priority ? true : false);

  useEffect(() => {
    if (priority) {
      setIsVisible(true);
      return;
    }
    if (!imgRef.current) {
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '200px' },
    );

    io.observe(imgRef.current);
    return () => io.disconnect();
  }, [priority]);

  // fill 모드에서 실제 렌더 width 측정
  const { ref: resizeRef, size } = useResizeObserver<HTMLImageElement>(120);
  const baseWidth = fill ? (size?.width ?? 0) : width;

  const [srcSet, setSrcSet] = useState<string | null>(null);
  const [baseSrc, setBaseSrc] = useState<string | null>(null);
  const [tinySigned, setTinySigned] = useState<string | null>(null);

  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // sizes 자동 계산
  const computedSizes = computeSizes({
    sizesProp: sizes,
    fill,
    width,
    measuredWidth: size?.width ?? null,
  });

  // width-based srcset + blur tiny 이미지 생성
  useEffect(() => {
    if (!isVisible || !baseWidth) {
      return;
    }

    let cancelled = false;

    const run = async () => {
      try {
        setError(false);

        const maxWidthFromSizes = parseMaxWidthFromSizes(computedSizes);
        const candidateWidths = getCandidateWidths(maxWidthFromSizes, baseWidth);

        const urlPromises = candidateWidths.map((w) =>
          sign(SIGN_API_ENDPOINT, src, w, quality, format),
        );

        const tinyPromise =
          placeholder === 'blur'
            ? sign(SIGN_API_ENDPOINT, src, 20, 30, format)
            : Promise.resolve<string | null>(null);

        const [urls, tiny] = await Promise.all([Promise.all(urlPromises), tinyPromise]);

        if (cancelled) {
          return;
        }

        const srcsetString = urls.map((u, i) => `${u} ${candidateWidths[i]}w`).join(', ');

        // 기본 src는 가장 작은 width를 사용 (브라우저가 srcset 지원 시 크게 의미 없음)
        const firstUrl = urls[0] ?? null;

        setSrcSet(srcsetString || null);
        setBaseSrc(firstUrl);
        setTinySigned(tiny);
      } catch {
        if (!cancelled) {
          setError(true);
        }
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [isVisible, src, baseWidth, quality, format, placeholder, computedSizes]);

  // blur placeholder 스타일
  const blurStyle =
    placeholder === 'blur' && tinySigned && !loaded && !error
      ? {
          filter: 'blur(20px)',
          backgroundImage: `url(${tinySigned})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }
      : {};

  // error 시 원본 이미지로 fallback
  if (error) {
    return (
      <img
        {...props}
        ref={fill ? resizeRef : undefined}
        src={src}
        alt={alt}
        className={className}
        loading={priority ? 'eager' : loading}
        style={{
          ...style,
          objectFit,
          width: fill ? '100%' : width,
          height: fill ? '100%' : height,
          aspectRatio: fill ? undefined : width && height ? `${width} / ${height}` : undefined,
        }}
      />
    );
  }

  // 실제 img 렌더링
  return (
    <img
      {...props}
      ref={(el) => {
        imgRef.current = el;
        if (fill) {
          resizeRef(el);
        }
      }}
      src={
        isVisible
          ? baseSrc || (placeholder === 'blur' ? (tinySigned ?? undefined) : undefined)
          : undefined
      }
      srcSet={isVisible && srcSet ? srcSet : undefined}
      sizes={computedSizes}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : loading}
      style={{
        ...style,
        objectFit,
        width: fill ? '100%' : width,
        height: fill ? '100%' : height,
        aspectRatio: fill ? undefined : width && height ? `${width} / ${height}` : undefined,
        transition: 'filter 0.3s ease, opacity 0.3s ease',
        ...(blurStyle as CSSProperties),
      }}
      onLoad={(e) => {
        props.onLoad?.(e);
        setLoaded(true);
      }}
    />
  );
};

const Image: React.FC<ImageProps> = (props) => {
  const { src, alt, width, height, fill, style, className, ...rest } = props;
  if (process.env.NODE_ENV === 'development') {
    return (
      <img
        src={src}
        alt={alt}
        style={{
          ...style,
          width: fill ? '100%' : width,
          height: fill ? '100%' : height,
          aspectRatio: fill ? undefined : width && height ? `${width} / ${height}` : undefined,
        }}
        className={className}
        {...rest}
      />
    );
  }

  return <OptimizedImage {...props} />;
};

export default Image;
