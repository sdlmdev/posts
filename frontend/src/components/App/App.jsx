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
import PopupWithPost from '../PopupWithPost/PopupWithPost';
import { POPUP_CLOSE_TIME } from '../../utils/constants';

function App() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});

  const handleOpenPost = (post) => {
    setIsOpenPopup(!isOpenPopup);
    setSelectedPost(post);
  };

  const handleClosePost = () => {
    setIsOpenPopup(!isOpenPopup);
    setTimeout(() => {
      setSelectedPost({});
    }, POPUP_CLOSE_TIME);
  };

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
      const postData = await deletePost(post._id);
      const newPostList = posts.filter((i) => i._id !== post._id);

      setPosts(newPostList);

      return postData;
    } catch (err) {
      console.log(err);

      return false;
    }
  };

  useEffect(() => {
    getPostList();
    setIsLoggedIn(true); // !!!
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
                handleOpenPost={handleOpenPost}
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
        <PopupWithPost
          isOpenPopup={isOpenPopup}
          handleClosePost={handleClosePost}
          selectedPost={selectedPost}
          handleDeletePost={handleDeletePost}
        />
      </main>
    </div>
  );
}

export default App;
