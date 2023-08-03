import React, { useEffect, useState } from 'react';
import './PostForm.css';
import MyButton from '../UI/MyButton/MyButton';
import MyInput from '../UI/MyInput/MyInput';

function PostForm() {
  const [isButtonStatus, setIsButtonStatus] = useState(false);

  useEffect(() => {
    setIsButtonStatus(false);
  }, []);

  return (
    <form className="post-form">
      <MyInput placeholder="Введите название поста" type="text" className="post-form__input" />
      <MyInput placeholder="Введите описание поста" type="text" className="post-form__input" />
      <MyButton disabled={isButtonStatus} text="Создать" className="post-form__button" />
    </form>
  );
}

export default PostForm;
