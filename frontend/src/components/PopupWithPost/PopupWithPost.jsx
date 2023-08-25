import React, { useEffect, useState } from 'react';
import './PopupWithPost.css';
import { OVERFLOW_BORDER } from '../../utils/constants';

function PopupWithPost({
  handleClosePost,
  selectedPost,
  handleDeletePost,
  isOpenPopup,
}) {
  const [isTextOverflow, setIsTextOverflow] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
  });

  const onDeletePost = async () => {
    try {
      const post = await handleDeletePost(selectedPost);

      if (post) {
        handleClosePost();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (selectedPost.description && (selectedPost.description.length > OVERFLOW_BORDER)) {
      setIsTextOverflow(true);
    } else {
      setIsTextOverflow(false);
    }
  }, [selectedPost]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`post-popup ${isOpenPopup ? 'post-popup_opened' : ''}`}>
      <article className="post-popup__element">
        <div className="post-popup__buttons">
          <button
            className="post-popup__button  post-popup__button_delete"
            type="button"
            onClick={onDeletePost}
            aria-label="delete"
          />
          <button
            className="post-popup__button post-popup__button_close"
            type="button"
            onClick={handleClosePost}
            aria-label="close"
          />
        </div>
        <strong
          className={`post-popup__title
          ${windowSize.width < 550
            ? 'post-popup__text_overflow'
            : ''}`}
        >
          {selectedPost.title}
        </strong>
        <p
          className={`post-popup__text
          ${isTextOverflow
            ? 'post-popup__text_overflow'
            : ''}`}
        >
          {selectedPost.description}
        </p>
      </article>
    </div>
  );
}

export default PopupWithPost;
