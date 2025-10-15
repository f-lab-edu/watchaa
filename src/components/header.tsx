import DeleteIcon from '@/components/icons/delete';
import { SearchIcon } from '@/components/icons/search';
import { debounce } from 'radash';
import { memo, useCallback, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { LogoIcon } from './icons/logo';

type SearchFormData = {
  query: string;
};

const SearchBarButton = memo(() => {
  const navigate = useNavigate();
  const handleSearchButtonClick = useCallback(() => {
    navigate('/search');
  }, [navigate]);

  return (
    <button
      onClick={handleSearchButtonClick}
      className="w-[286px] bg-[var(--color-background50)] flex items-center gap-2 py-2 px-3 rounded-lg"
    >
      <SearchIcon className="fill-[var(--color-tertiary-text)] size-5" />
      <span className="text-[var(--color-gray50)] text-[15px] text-left flex-1">
        콘텐츠, 태그, 인물, 리스트 검색
      </span>
    </button>
  );
});
SearchBarButton.displayName = 'SearchBarButton';

const SearchBarInput = memo(() => {
  const navigate = useNavigate();
  const deleteButtonRef = useRef<HTMLButtonElement>(null);

  const { register, handleSubmit, setValue } = useForm<SearchFormData>({
    defaultValues: {
      query: '',
    },
  });

  const onSubmit = useCallback(
    (data: SearchFormData) => {
      const value = data.query.trim();
      if (value) {
        navigate(`/search?query=${encodeURIComponent(value)}`);
      } else {
        navigate('/search');
      }
    },
    [navigate],
  );

  const debouncedNavigate = useMemo(
    () =>
      debounce({ delay: 1000 }, (value: string) => {
        onSubmit({ query: value });
      }),
    [onSubmit],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (deleteButtonRef.current) {
        deleteButtonRef.current.style.visibility = value.length > 0 ? 'visible' : 'hidden';
      }

      debouncedNavigate(value);
    },
    [debouncedNavigate],
  );

  const inputFocusRef = useRef<HTMLInputElement>(null);

  const { ref: registerRef, ...queryRegister } = register('query', {
    onChange: handleInputChange,
  });

  const combinedInputRef = useCallback(
    (node: HTMLInputElement | null) => {
      registerRef(node);
      inputFocusRef.current = node;
      if (node) {
        node.focus();
      }
    },
    [registerRef],
  );

  const handleClearQuery = useCallback(() => {
    setValue('query', '');

    if (deleteButtonRef.current) {
      deleteButtonRef.current.style.visibility = 'hidden';
    }

    debouncedNavigate('');
  }, [setValue, debouncedNavigate]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[286px]">
      <label className="bg-[var(--color-background50)] flex items-center gap-2 py-2 px-3 rounded-lg">
        <SearchIcon className="fill-[var(--color-tertiary-text)] size-5 shrink-0" />
        <input
          {...queryRegister}
          ref={combinedInputRef}
          className="text-[var(--color-primary-text)] placeholder:text-[var(--color-gray50)] text-[15px] w-full outline-none bg-transparent caret-[var(--color-primary10)] "
          placeholder="콘텐츠, 태그, 인물, 리스트 검색"
          type="search"
          autoComplete="off"
        />
        <button
          ref={deleteButtonRef}
          type="button"
          onClick={handleClearQuery}
          className="invisible"
        >
          <DeleteIcon className="fill-[var(--color-tertiary-text)] size-5" />
        </button>
      </label>
    </form>
  );
});
SearchBarInput.displayName = 'SearchBarInput';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="px-10 py-3 h-[72px] flex justify-between items-center bg-[var(--color-background)]">
      <button onClick={() => navigate('/')}>
        <LogoIcon className="w-[88px] h-[26px]" />
      </button>
      {location.pathname === '/search' ? <SearchBarInput /> : <SearchBarButton />}
    </div>
  );
};

export default memo(Header);
