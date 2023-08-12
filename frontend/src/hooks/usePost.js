import { useMemo } from 'react';

export const useSortedPosts = (posts, method) => {
  const sortedPosts = useMemo(() => {
    if (method) {
      return [...posts].sort(
        (a, b) => a[method].localeCompare(b[method]),
      );
    }
    return posts;
  }, [posts, method]);

  return sortedPosts;
};

export const useSearchedPosts = (posts, method, query) => {
  const sortedPosts = useSortedPosts(posts, method);
  const searchedPosts = useMemo(() => sortedPosts.filter(
    (i) => i.title.toLowerCase().includes(query.toLowerCase()),
  ), [query, sortedPosts]);

  return searchedPosts;
};
