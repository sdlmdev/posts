import React, { useState, useEffect, useMemo } from 'react';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
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
        ? (
          <TransitionGroup>
            {searchedPosts.map((post) => (
              <CSSTransition
                key={post._id}
                timeout={500}
                classNames="post-animation"
              >
                <PostElement
                  post={post}
                  deleteThisPost={handleDeletePost}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )
        : (
          <p className={!isPostLengthStatus ? 'post-collection_error' : ''}>
            Постов пока нет
          </p>
        )}
    </section>
  );
}

export default PostList;
