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
import usePagination from '../../hooks/usePagination';
import { getPages } from '../../utils/utils';
import { PAGE_POSTS_LENGTH } from '../../utils/constants';

function PostList({
  posts,
  handleDeletePost,
  isLoading,
}) {
  const [filter, setFilter] = useState({ method: '', query: '' });
  const [currentPageNumber, setCurrentPageNumber] = useState(0);

  const handleChangePage = (e) => {
    setCurrentPageNumber(e.target.innerText - 1);
  };

  const pagesWithPosts = getPages(posts, PAGE_POSTS_LENGTH);

  const sortedAndSearchedPosts = useSearchedPosts(
    pagesWithPosts[currentPageNumber] || [],
    filter.method,
    filter.query,
  );

  const pageNumbers = usePagination(pagesWithPosts.length);

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
      <div className="post-collection__page">
        {pageNumbers.map((i) => (
          <button
            className={`post-collection__page_button
              ${currentPageNumber + 1 === i ? 'post-collection__page_button-active' : ''}`}
            onClick={handleChangePage}
            key={i}
            type="button"
          >
            {i}
          </button>
        ))}
      </div>
    </section>
  );
}

export default PostList;
