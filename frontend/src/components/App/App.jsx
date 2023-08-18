import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  getPosts,
  createPost,
  deletePost,
} from '../../utils/Api';
import './App.css';
import Posts from '../../pages/Posts/Posts';
import NotFound from '../../pages/NotFound/NotFound';

function App() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getPostList = async () => {
    setIsloading(true);
    try {
      const postList = await getPosts();

      setPosts(postList.reverse());
    } catch (err) {
      console.log(err);
    } finally {
      setIsloading(false);
    }
  };

  const createNewPost = async (data) => {
    try {
      const newPosts = await createPost(data);

      setPosts([newPosts, ...posts]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePost = async (post) => {
    try {
      await deletePost(post._id);

      const newPostList = posts.filter((i) => i._id !== post._id);

      setPosts(newPostList);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPostList();
    setIsLoggedIn(true);
  }, []);

  return (
    <div className="page">
      <main>
        <Routes>
          <Route
            path="/"
            element={(
              <Posts
                isLoggedIn={isLoggedIn}
                createNewPost={createNewPost}
                posts={posts}
                setPosts={setPosts}
                handleDeletePost={handleDeletePost}
                isLoading={isLoading}
              />
            )}
          />
          <Route
            path="/*"
            element={(
              <NotFound />
            )}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
