import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Togglable from './Togglable';

const CreateNewBlog = ({ addBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });
  const blogFormRef = useRef();
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    addBlog(newBlog);
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

CreateNewBlog.propTypes = {
  addBlog: PropTypes.func.isRequired,
  cancelAddBlog: PropTypes.func.isRequired,
};

export default CreateNewBlog;
