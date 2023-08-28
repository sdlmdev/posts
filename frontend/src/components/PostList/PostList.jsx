import React, { useEffect, useState } from 'react';
import './PostList.css';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import PostElement from '../PostElement/PostElement';
import PostsFilter from '../PostsFilter/PostsFilter';
import { useSearchedPosts } from '../../hooks/usePost';
import MyLoader from '../UI/MyLoader/MyLoader';
import usePagination from '../../hooks/usePagination';
import { getPages } from '../../utils/utils';
import { MIN_POSTS_LENGTH } from '../../utils/constants';

function PostList({
  posts,
  isLoading,
  handleOpenPost,
  showDeletionConfirmation,
  setSelectedPost,
}) {
  const [filter, setFilter] = useState({ method: '', query: '' });
  const [currentPageNumber, setCurrentPageNumber] = useState(0);
  const [postsLength, setPostsLength] = useState(10);

  const handleChangePage = (e) => {
    setCurrentPageNumber(e.target.innerText - 1);
  };

  const pagesWithPosts = getPages(posts, postsLength);

  const sortedAndSearchedPosts = useSearchedPosts(
    pagesWithPosts[currentPageNumber] || [],
    filter.method,
    filter.query,
  );

  const pageNumbers = usePagination(pagesWithPosts.length);

  useEffect(() => {
    if ((postsLength === posts.length) || (postsLength > pagesWithPosts.length)) {
      setCurrentPageNumber(0);
    }
  }, [postsLength]);

  return (
    <section className="post-collection">
      <PostsFilter
        filter={filter}
        setFilter={setFilter}
        setPostsLength={setPostsLength}
        postsLength={postsLength}
        posts={posts}
      />
      {isLoading && <MyLoader />}
      {sortedAndSearchedPosts.length > 0 && !isLoading
        ? (
          <TransitionGroup className={`post-collection__container ${postsLength === MIN_POSTS_LENGTH
            ? 'post-collection__small-container'
            : ''}`}
          >
            {sortedAndSearchedPosts.map((post) => (
              <CSSTransition
                key={post._id}
                timeout={500}
                classNames="post-animation"
              >
                <PostElement
                  post={post}
                  handleOpenPost={handleOpenPost}
                  showDeletionConfirmation={showDeletionConfirmation}
                  setSelectedPost={setSelectedPost}
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
      {(postsLength < posts.length) && (
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
      )}
    </section>
  );
}

export default PostList;
