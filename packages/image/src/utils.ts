import { CANDIDATE_WIDTHS } from './constants';

// sizes 문자열에서 "XXXpx" 중 첫 번째 값을 뽑아서 max width로 사용
export const parseMaxWidthFromSizes = (sizes: string | undefined): number | null => {
  if (!sizes) {
    return null;
  }
  const match = sizes.match(/(\d+)px/);
  return match ? parseInt(match[1], 10) : null;
};

// maxWidth 기준으로 실제 사용할 width 후보 필터링
export const getCandidateWidths = (maxWidth: number | null, baseWidth?: number): number[] => {
  if (!maxWidth && baseWidth) {
    maxWidth = baseWidth;
  }

  if (!maxWidth) {
    return CANDIDATE_WIDTHS;
  }

  const upper = maxWidth * 1.2; // 약간 여유
  let candidates = CANDIDATE_WIDTHS.filter((w) => w <= upper);

  if (!candidates.length) {
    candidates = [Math.round(maxWidth)];
  }

  return candidates;
};

// fill / fixed / 사용자 sizes를 기반으로 최종 sizes 문자열 계산
export const computeSizes = (opts: {
  sizesProp?: string;
  fill?: boolean;
  width?: number;
  measuredWidth?: number | null;
}): string | undefined => {
  const { sizesProp, fill, width, measuredWidth } = opts;

  if (sizesProp) {
    return sizesProp;
  }

  if (fill) {
    if (measuredWidth && measuredWidth > 0) {
      return `${Math.round(measuredWidth)}px`;
    }
    return '100vw';
  }

  if (width) {
    return `(max-width: ${width}px) 100vw, ${width}px`;
  }

  return undefined;
};
