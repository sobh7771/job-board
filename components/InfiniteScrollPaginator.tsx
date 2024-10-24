'use client';

import { FC, useEffect } from 'react';

const InfiniteScrollPaginator: FC<{
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetching: boolean;
}> = ({ fetchNextPage, hasNextPage, isFetching }) => {
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        hasNextPage &&
        !isFetching
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetchNextPage, hasNextPage, isFetching]);

  return null;
};

export default InfiniteScrollPaginator;
