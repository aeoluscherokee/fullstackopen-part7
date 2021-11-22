import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LogIn from './components/LogIn';
import CreateNewBlog from './components/CreateNewBlog';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from './reducers/notificationReducer';
import { getAllBlogs, createNewBlog } from './reducers/blogReducer';

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

  const handleDelete = async (id, token, title) => {
    if (window.confirm(`Do you want to delete ${title}?`)) {
      try {
        await blogService.deleteBlog(id, token);
        const updatedBlogs = blogs.filter((blog) => blog.id !== id);
        setBlogs(updatedBlogs);
        dispatch(
          showNotification(
            {
              style: 'success',
              message: `a blog ${title} has been deleted`,
            },
            3
          )
        );
      } catch (error) {
        const updatedBlogs = blogs.filter((blog) => blog.id !== id);
        setBlogs(updatedBlogs);

        dispatch(
          showNotification(
            {
              style: 'error',
              message: `a blog ${title} is not existed`,
            },
            3
          )
        );
      }
    } else return;
  };

  return (
    <>
      <LogIn>
        <CreateNewBlog />
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateLike={handleUpdateLike}
            deleteBlog={handleDelete}
            user={userData}
          />
        ))}
      </LogIn>
    </>
  );
};

export default App;
