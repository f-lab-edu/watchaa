import AsyncBoundary from '@/components/async-boundary';
import { Outlet } from 'react-router-dom';
import Header from './header';

const Layout = () => {
  return (
    <AsyncBoundary>
      <Header />
      <Outlet />
    </AsyncBoundary>
  );
};

export default Layout;
