import React, { useState, useEffect, useMemo } from 'react';
import './PostList.css';
import PostElement from '../PostElement/PostElement';
import PostsFilter from '../PostsFilter/PostsFilter';

function PostList({ posts, handleDeletePost }) {
  const [isPostLengthStatus, setIsPostLengthStatus] = useState(false);
  const [filter, setFilter] = useState({ method: '', query: '' });

  const sortedPosts = useMemo(() => {
    if (filter.method) {
      return [...posts].sort(
        (a, b) => a[filter.method].localeCompare(b[filter.method]),
      );
    }
    return posts;
  }, [posts, filter.method]);

  const searchedPosts = useMemo(() => sortedPosts.filter(
    (i) => i.title.toLowerCase().includes(filter.query.toLowerCase()),
  ), [filter.query, sortedPosts]);

  const getNotFoundError = () => {
    if (sortedPosts.length === 0 || searchedPosts.length === 0) {
      setIsPostLengthStatus(false);
    } else {
      setIsPostLengthStatus(true);
    }
  };

  useEffect(() => {
    getNotFoundError();
  }, [sortedPosts, searchedPosts]);

  return (
    <section className="post-collection">
      <PostsFilter
        filter={filter}
        setFilter={setFilter}
      />
      {isPostLengthStatus
        ? searchedPosts.map((post) => (
          <PostElement
            post={post}
            key={post._id}
            deleteThisPost={handleDeletePost}
          />
        ))
        : (
          <p className={!isPostLengthStatus ? 'post-collection_error' : ''}>
            Постов пока нет
          </p>
        )}
    </section>
  );
}

export default PostList;
