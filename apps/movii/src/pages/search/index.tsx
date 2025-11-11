import { useSearchParams } from 'react-router-dom';

import SearchMain from '@/pages/search/components/search-main';
import SearchResults from '@/pages/search/components/search-results';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  if (!query) {
    return <SearchMain />;
  }

  return (
    <div className="p-2 max-w-[1680px] mx-auto">
      <SearchResults />
    </div>
  );
};

export default Search;
