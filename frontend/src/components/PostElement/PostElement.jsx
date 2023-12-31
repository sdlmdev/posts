import React from 'react';
import './PostElement.css';

function PostElement({
  post,
  handleOpenPost,
  showDeletionConfirmation,
  setSelectedPost,
}) {
  const onDeletePost = () => {
    showDeletionConfirmation();
    setSelectedPost(post);
  };

  const onOpenClick = () => {
    handleOpenPost(post);
  };

  return (
    <article className="post">
      <div className="post__content">
        <strong className="post__title">{post.title}</strong>
        <p className="post__text">{post.description}</p>
      </div>
      <div className="post__button-container">
        <button
          className="post__button"
          type="button"
          onClick={onOpenClick}
        >
          Открыть
        </button>
        <button
          className="post__button"
          type="button"
          onClick={onDeletePost}
        >
          Удалить
        </button>
      </div>
    </article>
  );
}

export default PostElement;
