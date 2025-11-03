import { Suspense } from 'react';

import { AsyncBoundaryProps } from '@/components/async-boundary/types';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

/**
 * @see https://www.npmjs.com/package/react-error-boundary
 */
const AsyncBoundary = ({
  children,
  pendingFallback = <></>,
  ...errorBoundaryProps
}: AsyncBoundaryProps) => {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary onReset={reset} {...errorBoundaryProps}>
      <Suspense fallback={pendingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default AsyncBoundary;
