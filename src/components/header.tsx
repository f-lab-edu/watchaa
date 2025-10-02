import { LogoIcon } from './icons/logo';
import { SearchIcon } from './icons/search';

const Header = () => {
  return (
    <div className="px-5 py-3 h-[72px] flex justify-between items-center bg-[var(--color-background)]">
      <LogoIcon className="w-[88px] h-[26px]" />
      <SearchIcon className="size-6 text-white" />
    </div>
  );
};

export default Header;
