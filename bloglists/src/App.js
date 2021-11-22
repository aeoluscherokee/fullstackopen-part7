import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import userService from './services/users';
import Notification from './components/Notification';
import LogIn from './components/LogIn';
import CreateNewBlog from './components/CreateNewBlog';
import Togglable from './components/Togglable';
import { useDispatch } from 'react-redux';
import { showNotification } from './reducers/notificationReducer';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [userData, setUserData] = useState({
    token: '',
    username: '',
    name: '',
  });
  const blogFormRef = useRef();

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll();
      const sortedBlogs = blogService.sortBlogs(blogs);
      setBlogs(sortedBlogs);
    };
    getBlogs();
  }, []);

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userService.logIn(loginData);
      setUserData(response);
      setLoginData({ username: '', password: '' });
    } catch (error) {
      dispatch(
        showNotification(
          { style: 'error', message: error.response.data.error },
          3
        )
      );
      setLoginData({ username: '', password: '' });
    }
  };
  const addBlog = async (newBlog) => {
    try {
      const response = await blogService.createNewBlog(newBlog, userData.token);
      const updatedBlogs = [...blogs, response];
      const sortedBlogs = blogService.sortBlogs(updatedBlogs);
      setBlogs(sortedBlogs);
      dispatch(
        showNotification(
          {
            style: 'success',
            message: `a new blog ${response.title} by ${response.author} added`,
          },
          3
        )
      );
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      dispatch(
        showNotification(
          { style: 'error', message: error.response.data.error },
          3
        )
      );
    }
  };
  const cancelAddBlog = () => blogFormRef.current.toggleVisibility();

  const handleOnChange = (e) => {
    setLoginData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
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
              message: `a blog ${title}is not existed`,
            },
            3
          )
        );
      }
    } else return;
  };

  const handleLogout = () => {
    setUserData({});
  };
  return (
    <div>
      {userData.username ? (
        <div>
          <h2>blogs</h2>
          <div>
            <Notification notification={notification} />
          </div>
          <p>
            {userData.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable showLabel="create new blog" ref={blogFormRef}>
            <CreateNewBlog addBlog={addBlog} cancelAddBlog={cancelAddBlog} />
          </Togglable>

          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateLike={handleUpdateLike}
              deleteBlog={handleDelete}
              user={userData}
            />
          ))}
        </div>
      ) : (
        <LogIn
          handleSubmit={handleSubmit}
          handleOnChange={handleOnChange}
          loginData={loginData}
        />
      )}
    </div>
  );
};

export default App;
