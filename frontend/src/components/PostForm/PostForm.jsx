import React, { useEffect, useState } from 'react';
import './PostForm.css';
import MyButton from '../UI/MyButton/MyButton';
import MyInput from '../UI/MyInput/MyInput';
import { MAX_POST_TITLE_LENGTH } from '../../utils/constants';

function PostForm({ createNewPost }) {
  const [isButtonInactive, setIsButtonInactive] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleInputChange = (e) => {
    if (e.target.name === 'title') {
      setTitle(e.target.value);
    }

    if (e.target.name === 'description') {
      setDescription(e.target.value);
    }
  };

  const addNewPost = (e) => {
    e.preventDefault();

    const newPost = {
      title,
      description,
    };

    createNewPost(newPost);
    setTitle('');
    setDescription('');
  };

  useEffect(() => {
    if (title.length === 0 || description.length === 0) {
      setIsButtonInactive(true);
    } else {
      setIsButtonInactive(false);
    }
  }, [title, description]);

  return (
    <section className="form-create">
      <form className="post-form" name="create-post" onSubmit={addNewPost}>
        <MyInput
          placeholder="Введите название поста"
          type="text"
          className="post-form__title"
          value={title}
          name="title"
          onChange={handleInputChange}
          maxLength={MAX_POST_TITLE_LENGTH}
        />
        <MyInput
          placeholder="Введите описание поста"
          className="post-form__description"
          value={description}
          name="description"
          onChange={handleInputChange}
          longText
        />
        <MyButton
          disabled={isButtonInactive}
          text="Создать"
          className="post-form__button"
        />
      </form>
    </section>
  );
}

export default PostForm;
