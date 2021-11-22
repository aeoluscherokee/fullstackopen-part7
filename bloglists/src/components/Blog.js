import React, { useState } from 'react';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import PropTypes from 'prop-types';

const Blog = ({ blog, updateLike, deleteBlog, user }) => {
  const [showDetails, setShowDetails] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  const buttonLabel = showDetails ? 'hide' : 'view';
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
              <LikeButton blog={blog} updateLike={updateLike} />
            </p>
            <p>{blog.user.name}</p>
            {user.name === blog.user.name ? (
              <DeleteButton
                id={blog.id}
                token={user.token}
                deleteBlog={deleteBlog}
                title={blog.title}
              />
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  updateLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
