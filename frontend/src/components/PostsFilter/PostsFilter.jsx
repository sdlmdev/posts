import React from 'react';
import MySelect from '../UI/MySelect/MySelect';
import MyInput from '../UI/MyInput/MyInput';
import './PostsFilter.css';

function PostsFilter({
  filter,
  setFilter,
  setPostsLength,
  postsLength,
  posts,
}) {
  const handleSearchChange = (e) => {
    setFilter({ ...filter, query: e.target.value });
  };

  const getSortingMethod = (method) => {
    setFilter({ ...filter, method });
  };

  const handleChangePostsLength = (value) => {
    setPostsLength(+value);
  };

  return (
    <div className="post-collection__options">
      <MySelect
        value={filter.method}
        onChange={getSortingMethod}
        defaultValue="Сортировка"
        options={[
          { value: 'title', name: 'По названию' },
          { value: 'description', name: 'По описанию' },
          { value: '', name: 'По умолчанию' },
        ]}
      />
      <MySelect
        className="post-collection__select"
        value={postsLength}
        onChange={handleChangePostsLength}
        defaultValue="Количество постов"
        options={[
          { value: 5, name: '5' },
          { value: 10, name: '10' },
          { value: 15, name: '15' },
          { value: posts.length, name: 'Все' },
        ]}
      />
      <MyInput
        value={filter.query}
        onChange={handleSearchChange}
        placeholder="Введите текст для поиска"
        className="post-collection__input"
      />
    </div>
  );
}

export default PostsFilter;
