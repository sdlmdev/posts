import React, { useState, useEffect } from 'react';
import './PostList.css';
import PostElement from '../PostElement/PostElement';

function PostList({ posts }) {
  const [isPostsStatus, setIsPostsStatus] = useState(false);

  useEffect(() => {
    if (posts.length === 0 || posts === undefined) {
      setIsPostsStatus(true);
    } else {
      setIsPostsStatus(false);
    }
  }, [posts]);

  return (
    <section className={`post-collection ${isPostsStatus ? 'post-collection_error' : ''}`}>
      { posts.length > 0 ? posts.map((post) => <PostElement post={post} key={post.id} />) : 'Постов пока нет' }
    </section>
  );
}

export default PostList;
