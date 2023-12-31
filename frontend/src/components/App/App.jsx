import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  getPosts,
  createPost,
  deleteThisPost,
} from '../../utils/Api';
import './App.css';
import Posts from '../../pages/Posts/Posts';
import NotFound from '../../pages/NotFound/NotFound';
import PopupWithPost from '../PopupWithPost/PopupWithPost';
import { POPUP_CLOSE_TIME } from '../../utils/constants';
import PopupWithConfirmation from '../PopupWithConfirmation/PopupWithConfirmation';
import Footer from '../Footer/Footer';

function App() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [isDeletion, setIsDeletion] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});

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

  const deletePost = async (post) => {
    try {
      const postData = await deleteThisPost(post._id);
      const newPostList = posts.filter((i) => i._id !== post._id);

      setPosts(newPostList);

      return postData;
    } catch (err) {
      console.log(err);

      return false;
    }
  };

  const handleOpenPost = (post) => {
    setIsOpenPopup(true);
    setSelectedPost(post);
  };

  const clearSelectedPost = () => {
    setTimeout(() => {
      setSelectedPost({});
    }, POPUP_CLOSE_TIME);
  };

  const handleClosePost = () => {
    setIsOpenPopup(false);
    clearSelectedPost();
  };

  const handleCloseConfirmation = () => {
    setIsDeletion(false);
  };

  const showDeletionConfirmation = () => {
    setIsDeletion(true);
  };

  useEffect(() => {
    getPostList();
    setIsLoggedIn(true); // !!!
  }, []);

  useEffect(() => {
    const handleClosePopup = (e) => {
      switch (true) {
        case isDeletion && isOpenPopup && (e.target.classList.contains('popup') || e.key === 'Escape'):
          handleCloseConfirmation();
          break;
        case isDeletion && !isOpenPopup && (e.target.classList.contains('popup') || e.key === 'Escape'):
          handleCloseConfirmation();
          clearSelectedPost();
          break;
        case !isDeletion && isOpenPopup && (e.target.classList.contains('popup') || e.key === 'Escape'):
          handleClosePost();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleClosePopup);
    document.addEventListener('mousedown', handleClosePopup);

    return () => {
      document.removeEventListener('keydown', handleClosePopup);
      document.removeEventListener('mousedown', handleClosePopup);
    };
  }, [isDeletion, isOpenPopup]);

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
                isLoading={isLoading}
                handleOpenPost={handleOpenPost}
                showDeletionConfirmation={showDeletionConfirmation}
                setSelectedPost={setSelectedPost}
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
      <Footer />
      <PopupWithPost
        isOpenPopup={isOpenPopup}
        handleClosePost={handleClosePost}
        selectedPost={selectedPost}
        deletePost={deletePost}
        showDeletionConfirmation={showDeletionConfirmation}
      />
      <PopupWithConfirmation
        isDeletion={isDeletion}
        deletePost={deletePost}
        selectedPost={selectedPost}
        handleCloseConfirmation={handleCloseConfirmation}
        handleClosePost={handleClosePost}
      />
    </div>
  );
}

export default App;
