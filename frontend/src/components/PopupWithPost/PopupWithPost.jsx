import React, { useEffect, useState } from 'react';
import './PopupWithPost.css';
import { POST_DESCR_OVERFLOW_BORDER } from '../../utils/constants';
import MyIconButton from '../UI/MyIconButton/MyIconButton';

function PopupWithPost({
  handleClosePost,
  selectedPost,
  isOpenPopup,
  showDeletionConfirmation,
}) {
  const [isTextOverflow, setIsTextOverflow] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
  });

  useEffect(() => {
    if (selectedPost.description
      && (selectedPost.description.length > POST_DESCR_OVERFLOW_BORDER)) {
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
    <div className={`popup post-popup ${isOpenPopup ? 'post-popup_opened' : ''}`}>
      <article className="post-popup__element">
        <div className="post-popup__buttons">
          <MyIconButton
            className="post-popup__button_delete"
            onClick={showDeletionConfirmation}
            aria-label="delete"
          />
          <MyIconButton
            onClick={handleClosePost}
            className="post-popup__button_close"
            aria-label="close"
          />
        </div>
        <strong
          className={`post-popup__title ${windowSize.width < 550
            ? 'post-popup__text_overflow'
            : ''}`}
        >
          {selectedPost.title}
        </strong>
        <p
          className={`post-popup__text ${isTextOverflow
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
