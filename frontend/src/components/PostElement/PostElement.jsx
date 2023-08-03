import React from 'react';
import './PostElement.css';

function PostElement({ post }) {
  return (
    <article className="post">
      <div className="post__content">
        <strong className="post__title">{post.title}</strong>
        <p className="post__text">{post.body}</p>
      </div>
      <button className="post__delete-button" type="button">Удалить</button>
    </article>
  );
}

export default PostElement;
