import React, { useState, useEffect } from 'react';
import PostList from '../PostList/PostList';
import getPosts from '../../utils/Api';
import PostForm from '../PostForm/PostForm';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);

  const getPostList = async () => {
    try {
      const postList = await getPosts();
      console.log(postList);
      setPosts(postList);
    } catch (err) {
      console.log(err);
      setPosts([]);
    }
  };

  useEffect(() => {
    getPostList();
  }, []);

  return (
    <div className="page">
      <main className="main">
        <PostForm />
        <PostList posts={posts} />
      </main>
    </div>
  );
}

export default App;
