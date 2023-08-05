import React, { useState, useEffect } from 'react';
import PostList from '../PostList/PostList';
import {
  getPosts,
  createPost,
} from '../../utils/Api';
import PostForm from '../PostForm/PostForm';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);

  const getPostList = async () => {
    try {
      const postList = await getPosts();

      setPosts(postList);
    } catch (err) {
      console.log(err);
      setPosts([]);
    }
  };

  const createNewPost = async (data) => {
    try {
      const newPosts = await createPost(data);

      setPosts([...posts, newPosts]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPostList();
  }, []);

  return (
    <div className="page">
      <main>
        <PostForm
          createNewPost={createNewPost}
        />
        <PostList
          posts={posts}
        />
      </main>
    </div>
  );
}

export default App;
