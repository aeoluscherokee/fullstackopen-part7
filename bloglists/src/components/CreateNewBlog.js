import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Togglable from './Togglable';
import blogService from '../services/blogs';
import { showNotification } from '../reducers/notificationReducer';
import { createNewBlog } from '../reducers/blogReducer';
import { useField } from './../hooks';

const CreateNewBlog = () => {
  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  const userData = useSelector(({ user }) => user);
  const dispatch = useDispatch();
  const blogFormRef = useRef();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const newBlog = {
        title: title.value,
        author: author.value,
        url: url.value,
      };
      const response = await blogService.createNewBlog(newBlog, userData.token);
      dispatch(createNewBlog(response));
      title.onReset();
      author.onReset();
      url.onReset();
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
    blogFormRef.current.toggleVisibility();
  };

  const handleOnCancel = async (e) => {
    e.preventDefault();
    blogFormRef.current.toggleVisibility();
  };

  return (
    <Togglable showLabel="create new blog" ref={blogFormRef}>
      <div id="createForm">
        <h2>create new</h2>
        <form onSubmit={handleOnSubmit}>
          title
          <input id="title" name="title" {...title}></input>
          <br />
          author
          <input id="author" name="author" {...author}></input>
          <br />
          url
          <input id="url" name="url" {...url}></input>
          <br />
          <button type="submit">submit</button>
          <button onClick={handleOnCancel}>cancel</button>
        </form>
      </div>
    </Togglable>
  );
};

export default CreateNewBlog;
