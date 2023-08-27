import React from 'react';
import './PopupWithConfirmation.css';
import MyIconButton from '../UI/MyIconButton/MyIconButton';

function PopupWithConfirmation({
  isDeletion,
  deletePost,
  selectedPost,
  handleCloseConfirmation,
  handleClosePost,
}) {
  const handleDeletePost = async () => {
    try {
      const post = await deletePost(selectedPost);

      if (post) {
        handleClosePost();
        handleCloseConfirmation();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`popup confirmation-popup ${isDeletion
      ? 'confirmation-popup_opened'
      : ''}`}
    >
      <div className="confirmation-popup__container">
        <MyIconButton
          onClick={handleCloseConfirmation}
          className="confirmation-popup__button-close"
        />
        <strong className="confirmation-popup__title">
          Вы уверены?
        </strong>
        <button
          type="button"
          className="confirmation-popup__button"
          onClick={handleDeletePost}
        >
          Да
        </button>
      </div>
    </div>
  );
}

export default PopupWithConfirmation;
