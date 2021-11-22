import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Togglable from './Togglable';
import blogService from '../services/blogs';
import { showNotification } from '../reducers/notificationReducer';
import { createNewBlog } from '../reducers/blogReducer';

const CreateNewBlog = () => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });

  const userData = useSelector(({ user }) => user);
  const dispatch = useDispatch();
  const blogFormRef = useRef();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await blogService.createNewBlog(newBlog, userData.token);
      dispatch(createNewBlog(response));
      dispatch(
        showNotification(
          {
            style: 'success',
            message: `a new blog ${response.title} by ${response.author} added`,
          },
          3
        )
      );
    } catch (error) {
      dispatch(
        showNotification(
          { style: 'error', message: error.response.data.error },
          3
        )
      );
    }
    setNewBlog({
      title: '',
      author: '',
      url: '',
    });
    blogFormRef.current.toggleVisibility();
  };

  const cancelAddBlog = () => blogFormRef.current.toggleVisibility();

  const handleOnCancel = async (e) => {
    e.preventDefault();
    cancelAddBlog();
  };

  const handleOnChange = (e) => {
    setNewBlog((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <Togglable showLabel="create new blog" ref={blogFormRef}>
      <div id="createForm">
        <h2>create new</h2>
        <form onSubmit={handleOnSubmit}>
          title
          <input id="title" name="title" onChange={handleOnChange}></input>
          <br />
          author
          <input id="author" name="author" onChange={handleOnChange}></input>
          <br />
          url
          <input id="url" name="url" onChange={handleOnChange}></input>
          <br />
          <button type="submit">submit</button>
          <button onClick={handleOnCancel}>cancel</button>
        </form>
      </div>
    </Togglable>
  );
};

export default CreateNewBlog;
