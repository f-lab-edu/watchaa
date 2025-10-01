import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <header className="p-4 bg-gray-200 flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </header>
      <Outlet />
    </>
  );
};

export default Layout;
