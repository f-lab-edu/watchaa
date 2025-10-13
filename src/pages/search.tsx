import AsyncBoundary from '@/components/async-boundary';
import { useMultiSearch } from '@/features/search/hooks/queries/use-multi-search';
import { useSearchParams } from 'react-router-dom';

const SearchResults = ({ query }: { query: string }) => {
  const { data } = useMultiSearch({ query, language: 'ko', include_adult: true });

  console.log(data);

  return <div>hello</div>;
};

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  if (!query) {
    return null;
  }

  return (
    <div className="p-2">
      <AsyncBoundary>
        <SearchResults query={query} />
      </AsyncBoundary>
    </div>
  );
};

export default Search;
