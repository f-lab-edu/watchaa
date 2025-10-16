import AsyncBoundary from '@/components/async-boundary';
import { TMDB_API_POSTER_BASE_URL } from '@/constants';
import { useTrendingQuery } from '@/features/trending/hooks/queries/use-trending-query';
import { TrendingMediaType, TrendingMediaTypeMap, TrendingResult } from '@/features/trending/types';
import { cn } from '@/utils/cn';
import { typedEntries } from '@/utils/object';
import { ComponentProps, memo, useEffect, useRef, useState } from 'react';
import { FallbackProps } from 'react-error-boundary';
import { Link } from 'react-router-dom';

const TabButton = ({
  children,
  isActive,
  ...props
}: ComponentProps<'button'> & {
  isActive: boolean;
}) => {
  return (
    <button
      {...props}
      className={cn(
        'py-2 px-4 bg-[var(--color-background)] border-[var(--color-background70)] border-2 rounded-3xl text-sm text-[var(--color-tertiary-text)] hover:text-[var(--color-tertiary-text)] hover:border-[var(--color-tertiary-text)]',
        isActive &&
          'bg-[var(--color-primary-text)] border-[var(--color-primary-text)] text-[var(--color-background)] hover:bg-[var(--color-primary-text)] hover:border-[var(--color-primary-text)] hover:text-[var(--color-background)]',
      )}
    >
      {children}
    </button>
  );
};

const Tabs = ({
  mediaType,
  setMediaType,
}: {
  mediaType: TrendingMediaType;
  setMediaType: (type: TrendingMediaType) => void;
}) => {
  return (
    <ul className="flex gap-2 items-center py-[10px]">
      {typedEntries(TrendingMediaTypeMap).map(([key, value]) => {
        return (
          <li key={key}>
            <TabButton isActive={mediaType === key} onClick={() => setMediaType(key)}>
              {value}
            </TabButton>
          </li>
        );
      })}
    </ul>
  );
};

const getTransformedKeywordsData = (data: Paging<TrendingResult>) => {
  return (
    data?.results.slice(0, 10).map((result) => {
      const commonProperties = { id: result.id, mediaType: result.mediaType };

      switch (result.mediaType) {
        case 'movie': {
          return {
            ...commonProperties,
            title: result.title,
            imagePath: result.backdropPath,
          };
        }
        case 'tv': {
          return {
            ...commonProperties,
            title: result.name,
            imagePath: result.backdropPath,
          };
        }
        case 'person': {
          return {
            ...commonProperties,
            title: result.name,
            imagePath: result.profilePath,
          };
        }
        default:
          return null;
      }
    }) ?? []
  );
};

const useHighlightedIndex = (mediaType: TrendingMediaType, dataLength: number) => {
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 자동 highlight
  useEffect(() => {
    if (!dataLength || isPaused) {
      return;
    }
    timerRef.current = setInterval(() => {
      setHighlightedIndex((prev) => (prev + 1) % dataLength);
    }, 3000);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [dataLength, isPaused]);

  // hover 시 highlight 멈춤 및 인덱스 고정
  useEffect(() => {
    if (hoveredIndex !== null) {
      setIsPaused(true);
      setHighlightedIndex(hoveredIndex);
    } else {
      setIsPaused(false);
    }
  }, [hoveredIndex]);

  // mediaType 변경 시 highlight 인덱스 초기화
  useEffect(() => {
    setHighlightedIndex(0);
  }, [mediaType]);

  return {
    highlightedIndex,
    setHoveredIndex,
  };
};

const PopularSearchKeywords = ({ mediaType }: { mediaType: TrendingMediaType }) => {
  const { data } = useTrendingQuery({ mediaType, timeWindow: 'day', language: 'ko' });

  const results = getTransformedKeywordsData(data);
  const { highlightedIndex, setHoveredIndex } = useHighlightedIndex(mediaType, results.length);

  if (!results.length) {
    return <div className="text-[var(--color-background100)]">데이터가 없습니다.</div>;
  }

  return (
    <>
      <div>
        <ul className="grid grid-rows-5 grid-flow-col gap-4 max-w-[720px] mt-5 auto-cols-fr shrink-0">
          {results.map((result, idx) => (
            <li key={result?.id}>
              <Link
                to={(() => {
                  if (!result?.mediaType) {
                    return '#';
                  }

                  return (
                    {
                      movie: `/contents/${result.id}`,
                      tv: `#`,
                      person: `/people/${result.id}`,
                    }[result.mediaType] || '#'
                  );
                })()}
                onClick={() => {
                  if (result?.mediaType === 'tv') {
                    alert('준비중입니다.');
                  }
                }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={cn(
                  'text-lg text-[var(--color-tertiary-text)] transition-all motion-reduce:transition-none',
                  idx === highlightedIndex && 'font-[var(--font-weight-bold)] text-xl text-white',
                )}
              >
                <span className="text-[var(--color-primary10)] pr-4 w-7 inline-block">
                  {idx + 1}
                </span>
                {result?.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-[26px] text-[var(--color-disabled-text)] text-[11px]">
          {/* 2025. 10. 16. 형태에서 모든 공백 제거 & 끝에 오는 마침표(.) 제거 -> 2025.10.16 */}
          {new Date().toLocaleDateString().replace(/\s+/g, '').replace(/\.$/, '')} 00:00 기준
        </div>
      </div>
      <div className="absolute right-0 top-0 h-[103%] -z-10">
        <img
          src={
            results[highlightedIndex]?.imagePath
              ? `${TMDB_API_POSTER_BASE_URL}/${results[highlightedIndex]?.imagePath}`
              : ''
          }
          alt={results[highlightedIndex]?.title}
          loading="lazy"
          className="size-full object-cover"
        />
        <div className="absolute top-0 h-[20%] w-full bg-gradient-to-b from-black to-transparent" />
        <div className="absolute left-0 top-0 bottom-0 size-full bg-gradient-to-r from-black to-transparent" />
        <div className="absolute bottom-0 h-[20%] w-full bg-gradient-to-t from-black to-transparent" />
      </div>
    </>
  );
};

const PopularSearchKeywordsLoading = () => (
  <ul className="grid grid-rows-5 grid-flow-col gap-4 max-w-[720px] mt-5 auto-cols-fr shrink-0">
    {Array.from({ length: 10 }).map((_, idx) => (
      <li key={idx}>
        <div className="flex items-center">
          <span className="text-[var(--color-primary10)] pr-4 w-7 inline-block">{idx + 1}</span>
          <span className="h-5 w-32 bg-[var(--color-background70)] rounded animate-pulse block" />
        </div>
      </li>
    ))}
  </ul>
);

const PopularSearchKeywordsError = ({ error, resetErrorBoundary }: FallbackProps) => (
  <div className="flex flex-col items-center justify-center py-10">
    <div className="text-[var(--color-error)] font-bold mb-2">
      데이터를 불러오는 중 오류가 발생했습니다.
    </div>
    <div className="text-xs text-[var(--color-tertiary-text)] mb-4">{error.message}</div>
    <button
      className="px-4 py-2 rounded bg-[var(--color-primary10)] text-white font-semibold"
      onClick={resetErrorBoundary}
    >
      다시 시도
    </button>
  </div>
);

const PopularSearchKeywordsSection = () => {
  const [mediaType, setMediaType] = useState<TrendingMediaType>('all');

  return (
    <>
      <div className="relative">
        <h2 className="text-[var(--color-primary-text)] font-[var(--font-weight-bold)] text-xl mb-[5px]">
          인기 검색어 TOP 10
        </h2>
        <Tabs mediaType={mediaType} setMediaType={setMediaType} />
        <AsyncBoundary
          pendingFallback={<PopularSearchKeywordsLoading />}
          rejectedFallbackComponent={PopularSearchKeywordsError}
        >
          <PopularSearchKeywords mediaType={mediaType} />
        </AsyncBoundary>
      </div>
    </>
  );
};

export default memo(PopularSearchKeywordsSection);
