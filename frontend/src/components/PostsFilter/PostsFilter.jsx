import React from 'react';
import MySelect from '../UI/MySelect/MySelect';
import MyInput from '../UI/MyInput/MyInput';
import './PostsFilter.css';

function PostsFilter({ filter, setFilter }) {
  const handleSearchChange = (e) => {
    setFilter({ ...filter, query: e.target.value });
  };

  const getSortingMethod = (method) => {
    setFilter({ ...filter, method });
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
