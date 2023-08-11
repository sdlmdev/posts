import React, { useState, useEffect } from 'react';
import './PostList.css';
import PostElement from '../PostElement/PostElement';
import MySelect from '../UI/MySelect/MySelect';
import MyInput from '../UI/MyInput/MyInput';

function PostList({ posts, handleDeletePost, setPosts }) {
  const [isPostLengthStatus, setIsPostLengthStatus] = useState(false);
  const [selectedSortingMethod, setSelectedSortingMethod] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const sortingPosts = (method) => {
    setSelectedSortingMethod(method);
    setPosts(
      [...posts].sort((a, b) => a[method].localeCompare(b[method])),
    );
  };

  useEffect(() => {
    if (posts.length === 0) {
      setIsPostLengthStatus(false);
    } else {
      setIsPostLengthStatus(true);
    }
  }, [posts]);

  return (
    <section className={`post-collection ${!isPostLengthStatus ? 'post-collection_error' : ''}`}>
      <div className="post-collection__options">
        <MySelect
          value={selectedSortingMethod}
          onChange={sortingPosts}
          defaultValue="Сортировка"
          options={[
            { value: 'title', name: 'По названию' },
            { value: 'description', name: 'По описанию' },
          ]}
        />
        <MyInput
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Введите текст для поиска"
        />
      </div>
      {isPostLengthStatus
        ? posts.map((post) => (
          <PostElement
            post={post}
            key={post._id}
            deleteThisPost={handleDeletePost}
          />
        ))
        : 'Постов пока нет'}
    </section>
  );
}

export default PostList;
