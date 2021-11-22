import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LogIn from './components/LogIn';
import CreateNewBlog from './components/CreateNewBlog';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from './reducers/blogReducer';

const App = () => {
  const blogs = useSelector(({ blogs }) => blogs);
  const userData = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);

  const handleUpdateLike = async (blog) => {
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };
    try {
      const response = await blogService.updateLike(blog.id, updatedBlog);
      const updatedBlogs = blogs.map((el) => {
        if (el.id === blog.id) {
          return { ...el, likes: response.likes };
        } else return el;
      });
      const sortedBlogs = blogService.sortBlogs(updatedBlogs);
      setBlogs(sortedBlogs);
    } catch (error) {
      console.log(error.response.data.error);
    }
  };
  return (
    <>
      <LogIn>
        <CreateNewBlog />
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </LogIn>
    </>
  );
};

export default App;
