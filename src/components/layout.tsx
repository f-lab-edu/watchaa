import AsyncBoundary from '@/components/async-boundary';
import Button from '@/components/button';
import { FallbackProps } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import Header from './header';

const RejectedFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-96 gap-2">
      <p className="text-[var(--color-background100)]">에러가 발생했습니다: {error.message}</p>
      <Button onClick={resetErrorBoundary} className="mt-4 px-4 py-2 text-white rounded">
        다시 시도
      </Button>
    </div>
  );
};

const Layout = () => {
  return (
    <>
      <Header />
      <AsyncBoundary rejectedFallbackComponent={RejectedFallback}>
        <Outlet />
      </AsyncBoundary>
    </>
  );
};

export default Layout;
