import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBlog } from '../reducers/blogReducer';
import { showNotification } from '../reducers/notificationReducer';
import blogService from '../services/blogs';
import LikeButton from './LikeButton';

const Blog = ({ blog }) => {
  const userData = useSelector(({ user }) => user);
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  const buttonLabel = showDetails ? 'hide' : 'view';

  const handleDelete = async (e) => {
    e.preventDefault();
    if (window.confirm(`Do you want to delete ${blog.title}?`)) {
      try {
        await blogService.deleteBlog(blog.id, userData.token);
        dispatch(deleteBlog(blog.id));
        dispatch(
          showNotification(
            {
              style: 'success',
              message: `a blog ${blog.title} has been deleted`,
            },
            3
          )
        );
      } catch (error) {
        dispatch(
          showNotification(
            {
              style: 'error',
              message: `a blog ${blog.title} is not existed`,
            },
            3
          )
        );
      }
    } else return;
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setShowDetails(!showDetails)}>
          {buttonLabel}
        </button>
        {showDetails ? (
          <div>
            <p>{blog.url}</p>
            <p>
              likes <span className="likeEl">{blog.likes}</span>
              <LikeButton blog={blog} />
            </p>
            <p>{blog.user.name}</p>
            {userData.name === blog.user.name ? (
              <button onClick={handleDelete}>remove</button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Blog;
