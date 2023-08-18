import React from 'react';
import PostForm from '../../components/PostForm/PostForm';
import PostList from '../../components/PostList/PostList';

function Posts({
  isLoggedIn,
  createNewPost,
  posts,
  setPosts,
  handleDeletePost,
  isLoading,
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
        setPosts={setPosts}
        handleDeletePost={handleDeletePost}
        isLoading={isLoading}
      />
    </>
  );
}

export default Posts;
