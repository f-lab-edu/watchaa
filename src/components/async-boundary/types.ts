import { ComponentProps, ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export type ErrorBoundaryProps = ComponentProps<typeof ErrorBoundary>;

export type AsyncBoundaryProps = Readonly<
  Omit<ErrorBoundaryProps, 'fallback' | 'FallbackComponent' | 'fallbackRender'> & {
    children: ReactNode;
    pendingFallback?: ComponentProps<typeof Suspense>['fallback'];
    rejectedFallback?: ReactNode;
    rejectedFallbackComponent?: ErrorBoundaryProps['FallbackComponent'];
    rejectedFallbackRender?: ErrorBoundaryProps['fallbackRender'];
  }
>;
