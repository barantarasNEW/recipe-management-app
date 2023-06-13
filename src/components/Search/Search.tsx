import { ChangeEvent, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/getSearchWith';
import './Search.scss';

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: e.target.value || null })
    );
  };

  const onClickCancel = () => {
    setSearchParams(
      getSearchWith(searchParams, { query: null })
    );

    inputRef.current?.focus();
  };

  return (
    <div className="search">
      <input
        ref={inputRef}
        type="text"
        className="search__input"
        value={query}
        placeholder="Search..."
        onChange={onChange}
      />

      {!!query.length && (
        <button className="search__btn" onClick={onClickCancel}>
          <img
            className="search__icon"
            src="./assets/icons/cancel.svg"
            alt="icon"
          />
        </button>
      )}
    </div>
  );
};

export default Search;