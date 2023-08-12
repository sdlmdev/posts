import React, { useState, useEffect } from 'react';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import './PostList.css';
import PostElement from '../PostElement/PostElement';
import PostsFilter from '../PostsFilter/PostsFilter';
import { useSearchedPosts } from '../../hooks/usePost';

function PostList({ posts, handleDeletePost }) {
  const [isPostLengthStatus, setIsPostLengthStatus] = useState(false);
  const [filter, setFilter] = useState({ method: '', query: '' });

  const sortedAndSearchedPosts = useSearchedPosts(posts, filter.method, filter.query);

  const getNotFoundError = () => {
    if (sortedAndSearchedPosts.length === 0) {
      setIsPostLengthStatus(false);
    } else {
      setIsPostLengthStatus(true);
    }
  };

  useEffect(() => {
    getNotFoundError();
  }, [sortedAndSearchedPosts]);

  return (
    <section className="post-collection">
      <PostsFilter
        filter={filter}
        setFilter={setFilter}
      />
      {isPostLengthStatus
        ? (
          <TransitionGroup>
            {sortedAndSearchedPosts.map((post) => (
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
