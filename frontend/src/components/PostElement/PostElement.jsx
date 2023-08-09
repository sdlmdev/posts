import React from 'react';
import './PostElement.css';

function PostElement({ post, deleteThisPost }) {
  const handleDeleteThisPost = () => {
    deleteThisPost(post);
  };

  return (
    <article className="post">
      <div className="post__content">
        <strong className="post__title">{post.title}</strong>
        <p className="post__text">{post.description}</p>
      </div>
      <button className="post__delete-button" type="button" onClick={handleDeleteThisPost}>Удалить</button>
    </article>
  );
}

export default PostElement;
