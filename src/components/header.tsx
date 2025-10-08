import { useNavigate } from 'react-router-dom';
import { LogoIcon } from './icons/logo';
import { SearchIcon } from './icons/search';

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="px-5 py-3 h-[72px] flex justify-between items-center bg-[var(--color-background)]">
      <button onClick={() => navigate('/')}>
        <LogoIcon className="w-[88px] h-[26px]" />
      </button>
      <button
        onClick={() => {
          navigate('/search');
        }}
      >
        <SearchIcon className="size-6 text-white" />
      </button>
    </div>
  );
};

export default Header;
