import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CreateNewBlog = ({ addBlog, cancelAddBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    addBlog(newBlog);
    setNewBlog({
      title: '',
      author: '',
      url: '',
    });
  };

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
    <div id='createForm'>
      <h2>create new</h2>
      <form onSubmit={handleOnSubmit}>
        title
        <input id='title' name="title" onChange={handleOnChange}></input>
        <br />
        author
        <input id='author' name="author" onChange={handleOnChange}></input>
        <br />
        url
        <input id='url' name="url" onChange={handleOnChange}></input>
        <br />
        <button type="submit">submit</button>
        <button onClick={handleOnCancel}>cancel</button>
      </form>
    </div>
  );
};

CreateNewBlog.propTypes = {
  addBlog: PropTypes.func.isRequired,
  cancelAddBlog: PropTypes.func.isRequired,
};

export default CreateNewBlog;
