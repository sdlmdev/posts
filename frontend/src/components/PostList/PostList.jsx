import React, { useState } from 'react';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import './PostList.css';
import PostElement from '../PostElement/PostElement';
import PostsFilter from '../PostsFilter/PostsFilter';
import { useSearchedPosts } from '../../hooks/usePost';
import MyLoader from '../UI/MyLoader/MyLoader';

function PostList({ posts, handleDeletePost, isLoading }) {
  const [filter, setFilter] = useState({ method: '', query: '' });

  const sortedAndSearchedPosts = useSearchedPosts(posts, filter.method, filter.query);

  return (
    <section className="post-collection">
      <PostsFilter
        filter={filter}
        setFilter={setFilter}
      />
      {isLoading && <MyLoader />}
      {sortedAndSearchedPosts.length > 0 && !isLoading
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
        : !isLoading && sortedAndSearchedPosts.length === 0 && (
          <p className="post-collection_error">
            Посты не найдены
          </p>
        )}
    </section>
  );
}

export default PostList;
