import React from 'react';
import PostForm from '../../components/PostForm/PostForm';
import PostList from '../../components/PostList/PostList';

function Posts({
  isLoggedIn,
  createNewPost,
  posts,
  isLoading,
  handleOpenPost,
  showDeletionConfirmation,
  setSelectedPost,
}) {
  return (
    <>
      {isLoggedIn && (
      <PostForm
        createNewPost={createNewPost}
      />
      )}
      <PostList
        posts={posts}
        isLoading={isLoading}
        handleOpenPost={handleOpenPost}
        showDeletionConfirmation={showDeletionConfirmation}
        setSelectedPost={setSelectedPost}
      />
    </>
  );
}

export default Posts;
