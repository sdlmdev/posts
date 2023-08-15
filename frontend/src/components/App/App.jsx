import React, { useState, useEffect } from 'react';
import PostList from '../PostList/PostList';
import PostForm from '../PostForm/PostForm';
import {
  getPosts,
  createPost,
  deletePost,
} from '../../utils/Api';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsloading] = useState(false);

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
  }, []);

  return (
    <div className="page">
      <main>
        <PostForm
          createNewPost={createNewPost}
        />
        <PostList
          posts={posts}
          setPosts={setPosts}
          handleDeletePost={handleDeletePost}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}

export default App;
