import { Suspense } from 'react';

import { AsyncBoundaryProps } from '@/components/async-boundary/types';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

const AsyncBoundary = ({
  children,
  pendingFallback = <></>,
  rejectedFallback = <></>,
  rejectedFallbackComponent,
  rejectedFallbackRender,
  ...errorBoundaryProps
}: AsyncBoundaryProps) => {
  const { reset } = useQueryErrorResetBoundary();

  /**
   * @see https://www.npmjs.com/package/react-error-boundary
   */
  const errorBoundaryFallbackProps = rejectedFallbackRender
    ? { fallbackRender: rejectedFallbackRender }
    : rejectedFallbackComponent
      ? { FallbackComponent: rejectedFallbackComponent }
      : { fallback: rejectedFallback };

  return (
    <ErrorBoundary onReset={reset} {...errorBoundaryProps} {...errorBoundaryFallbackProps}>
      <Suspense fallback={pendingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default AsyncBoundary;
